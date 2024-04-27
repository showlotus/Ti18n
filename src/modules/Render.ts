import * as vscode from 'vscode'
import * as path from 'path'
import * as jsonParse from 'json-to-ast'
import { ArrayNode, ObjectNode } from 'json-to-ast'
import * as t from '@babel/types'
import * as babelParser from '@babel/parser'
import traverse from '@babel/traverse'
import { PubSub } from './PubSub'
import { StoreData, StoreToken, StoreTokenValue } from './Store'
import {
  encodeSpecialCharacter,
  getTokenRanges,
  isDefCustomProp,
  isLanguageProp,
  isTargetDocument,
} from '../utils'
import { CodelensProvider } from './CodelensProvider'
import { ConfigExtensionType } from '../types'

export interface CommandTokenParams {
  token: string
  language: string
  url: string
}

export class Render extends PubSub {
  context: vscode.ExtensionContext
  cacheData: StoreData
  highLightStyle: vscode.TextEditorDecorationType
  constructor(context: vscode.ExtensionContext) {
    super()
    this.context = context
    this.cacheData = {}
    this.highLightStyle = vscode.window.createTextEditorDecorationType({
      textDecoration: ';border-bottom: 1px dashed;',
    })
    this.init()
  }

  init() {
    this.context.subscriptions.push(
      vscode.window.onDidChangeActiveTextEditor(() => {
        this.watchActive()
      }),
      vscode.workspace.onDidChangeTextDocument(() => {
        this.watchActive()
      }),
      vscode.commands.registerCommand('Ti18n.locateToken', this.locateToken),
      vscode.languages.registerCodeLensProvider('*', new CodelensProvider()),
    )
  }

  watchActive() {
    isTargetDocument() && this.update()
  }

  locateToken = async (params?: CommandTokenParams) => {
    if (!params) {
      return
    }

    const { token, language, url } = params
    const document = await vscode.workspace.openTextDocument(
      vscode.Uri.file(url),
    )

    const position = this.findTokenLocation(document, token, language)
    const documentPosition = document.positionAt(position)
    const range = new vscode.Range(documentPosition, documentPosition)
    vscode.window.activeTextEditor?.revealRange(range)
    await vscode.window.showTextDocument(document, {
      selection: range,
    })
  }

  findTokenLocation(
    document: vscode.TextDocument,
    token: string,
    language: string,
  ) {
    const extname = path
      .extname(document.uri.fsPath)
      .slice(1) as ConfigExtensionType
    if (extname === 'json') {
      return this.findLocationInJson(document, token, language)
    } else {
      return this.findLocationInJs(document, token, language)
    }
  }

  findLocationInJson(
    document: vscode.TextDocument,
    token: string,
    language: string,
  ) {
    const text = document.getText()
    let ast = jsonParse(text, { loc: true }) as ObjectNode | ArrayNode
    if (ast.children.every((node: any) => isLanguageProp(node.key.value))) {
      ast = (
        ast.children.find((node: any) => node.key.value === language) as any
      ).value
    }

    if (!ast.children.length) {
      return -1
    }

    let targetNode: any = null
    const traverseJsonAst = (nodes: jsonParse.PropertyNode[], prefix = '') => {
      if (targetNode) {
        return
      }

      for (const node of nodes) {
        if ((prefix ? prefix + '.' : '') + node.key.value === token) {
          targetNode = node
          return
        }

        if (node.value.type !== 'Literal' && node.value.children) {
          traverseJsonAst(
            node.value.children as jsonParse.PropertyNode[],
            (prefix ? prefix + '.' : '') + node.key.value,
          )
        }
      }
    }

    traverseJsonAst(ast.children as jsonParse.PropertyNode[])
    if (!targetNode) {
      return -1
    }

    if (targetNode.value.type !== 'Literal') {
      const children = targetNode.value.children as any[]
      targetNode = children.find(child => child.key.value === language)
    }

    if (typeof targetNode.value.value === 'string') {
      return targetNode.value.loc!.start.offset + 1
    } else {
      return targetNode.value.loc!.start.offset
    }
  }

  findLocationInJs(
    document: vscode.TextDocument,
    token: string,
    language: string,
  ) {
    const text = document.getText()
    const ast = babelParser.parse(text, { sourceType: 'module' })
    let rootNode: t.ObjectExpression | undefined
    const _this = this
    traverse(ast, {
      ExportDefaultDeclaration(path) {
        if (!t.isObjectExpression(path.node.declaration)) {
          return
        }

        rootNode = path.node.declaration as t.ObjectExpression
        const { leadingComments } = path.node
        const leadingComment = leadingComments?.at(-1)
        let prop: string | undefined = ''
        if (
          !leadingComment ||
          !leadingComment.value ||
          !(prop = isDefCustomProp(leadingComment.value))
        ) {
          return
        }

        const props = prop
          .split('.')
          .map(v => v.trim())
          .filter(Boolean)

        for (const key of props) {
          const node = _this.findNextExpressionNode(rootNode, key)
          if (!node) {
            return
          } else {
            rootNode = node
          }
        }
      },
    })

    if (!rootNode) {
      return -1
    }

    if (rootNode.properties.every((p: any) => isLanguageProp(p.key.name))) {
      rootNode = (rootNode.properties as t.ObjectProperty[]).find(
        (p: any) => p.key.name === language,
      )?.value as t.ObjectExpression
    }

    let targetNode: t.ObjectProperty | undefined
    const traverseJsAst = (nodes: t.ObjectExpression, prefix = '') => {
      if (targetNode) {
        return
      }

      const properties = nodes.properties as t.ObjectProperty[]
      const innerPrefix = prefix ? prefix + '.' : ''
      for (const property of properties) {
        if (
          (t.isStringLiteral(property.key) &&
            innerPrefix + property.key.value === token) ||
          (t.isIdentifier(property.key) &&
            innerPrefix + property.key.name === token)
        ) {
          targetNode = property
          return
        }

        if (t.isObjectExpression(property.value)) {
          const key = t.isStringLiteral(property.key)
            ? property.key.value
            : t.isIdentifier(property.key)
              ? property.key.name
              : ''
          traverseJsAst(property.value, innerPrefix + key)
        }
      }
    }
    traverseJsAst(rootNode)

    if (!targetNode) {
      return -1
    }

    if (t.isObjectExpression(targetNode.value)) {
      targetNode = this.findTargetNodeByKey(targetNode.value, language)
    }

    if (!targetNode) {
      return -1
    }

    if (t.isStringLiteral(targetNode.value)) {
      return targetNode.value.start! + 1
    } else {
      return targetNode.value.start
    }
  }

  findNextExpressionNode(node: t.ObjectExpression, key: string) {
    const properties = this.filterProperties(node.properties)
    for (const property of properties) {
      if (
        ((t.isStringLiteral(property.key) && property.key.value === key) ||
          (t.isIdentifier(property.key) && property.key.name === key)) &&
        t.isObjectExpression(property.value)
      ) {
        return property.value
      }
    }
  }

  findTargetNodeByKey(node: t.ObjectExpression, key: string) {
    const properties = this.filterProperties(node.properties)
    for (const property of properties) {
      if (
        (t.isStringLiteral(property.key) && property.key.value === key) ||
        (t.isIdentifier(property.key) && property.key.name === key)
      ) {
        return property
      }
    }
  }

  filterProperties(
    properties: Array<t.ObjectMethod | t.ObjectProperty | t.SpreadElement>,
  ) {
    return properties.filter(p => {
      if (
        t.isObjectMethod(p) ||
        t.isSpreadElement(p) ||
        p.shorthand ||
        p.computed ||
        t.isIdentifier(p.value) ||
        t.isNullLiteral(p.value)
      ) {
        return false
      }
      return true
    }) as t.ObjectProperty[]
  }

  appendStyle() {
    const editor = vscode.window.activeTextEditor
    if (!editor) {
      return
    }

    const document = editor.document
    const tokenRanges = getTokenRanges(document)
    const decorations: vscode.DecorationOptions[] = []
    tokenRanges.forEach(({ token, value, range }) => {
      const hoverMessage = this.genHoverMessage(token, value)
      decorations.push({ range, hoverMessage })
    })

    // 第一个参数 decorationType 为固定值时，再次设置时，会被替换，而不是添加一个新的样式类型
    editor.setDecorations(this.highLightStyle, decorations)
  }

  genHoverMessage(token: string, value: StoreToken) {
    const entries = Object.entries(value)
    const str = entries
      .map(([language, val]) => {
        return `\`${language}\`：${this.genCommand(token, language, val)}`
      })
      .join('\n\n')
    const contents = new vscode.MarkdownString(str)
    contents.isTrusted = true
    return contents
  }

  genCommand(token: string, language: string, tokenValue: StoreTokenValue) {
    const params = encodeURIComponent(
      JSON.stringify({
        token,
        language,
        url: tokenValue.url,
      }),
    )
    const command = 'Ti18n.locateToken'
    return `[${encodeSpecialCharacter(String(tokenValue.value))}](command:${command}?${params})`
  }

  update(data?: StoreData) {
    // 每次更新后，在内部缓存 data
    if (!data) {
      data = this.cacheData
    } else {
      this.cacheData = data
    }
    this.appendStyle()
    console.log('Render ~ ~ ~', data)
  }
}
