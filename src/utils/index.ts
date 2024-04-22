import * as vscode from 'vscode'
import * as path from 'path'
import * as jsonParse from 'json-to-ast'
import * as fg from 'fast-glob'
import { getConfiguration } from './workspace'
import { source } from './data'
import { languages } from '../config'
import { CommandTokenParams, ConfigFileType } from '../types'

/**
 * 通过关键词打开对应的文件，定位到关键词对应的文档片段位置
 */
export async function openDocumentRevealTokenRange(params: CommandTokenParams) {
  if (!params) {
    return
  }

  const { token, language, filePath, fileType } = params
  const { window, workspace } = vscode
  const document = await workspace.openTextDocument(vscode.Uri.file(filePath))
  const text = document.getText()
  const position = findTokenLocation(text, token, language, fileType)
  const documentPosition = document.positionAt(position)
  const range = new vscode.Range(documentPosition, documentPosition)
  await window.showTextDocument(document, {
    selection: range,
  })
  window.activeTextEditor?.revealRange(range)
}

/**
 * 获取 JSON 配置文件
 */
export async function getConfigJSON(folderPath: string) {
  const configDirs = getConfiguration('configDirs')
  if (!configDirs.length) {
    return []
  }

  const res = await fg.glob(
    configDirs.map(dir => `${dir}/**/*.json`),
    {
      cwd: folderPath,
      ignore: ['**/node_modules/**'],
      absolute: true,
    },
  )
  return res
}

/**
 * 检查当前打开文档是否符合要求
 */
export function checkIsTargetDocument(document: vscode.TextDocument) {
  const extname = path.extname(document.fileName)
  const extFiles = getConfiguration('extFiles')
  return extFiles.includes(extname)
}

/**
 * 获取文档的关键词 range
 */
export function getTokenRanges(
  document: vscode.TextDocument,
  callback?: (
    token: string,
    value: Record<string, any>,
    range: vscode.Range,
  ) => void,
) {
  const text = document.getText()
  const ranges: vscode.Range[] = []
  const sourceJson = source.getJson()
  Object.keys(sourceJson).forEach(token => {
    const regex = new RegExp(`(["'\`])${token}\\1`, 'g')
    let match
    while ((match = regex.exec(text))) {
      const startPos = document.positionAt(match.index + 1)
      const endPos = document.positionAt(match.index + match[0].length - 1)
      const range = new vscode.Range(startPos, endPos)
      callback && callback(token, sourceJson[token], range)
      ranges.push(range)
    }
  })
  return ranges
}

/**
 * 转义特殊字符，
 * 格式化特殊字符（\n、\t等），保证展示结果与原文本保持一致
 */
export function encodeSpecialCharacter(str: string) {
  return JSON.stringify(str)
    .replace(/(\f|\n|\r|\t|\v|\"|\\)/g, '\\$&')
    .slice(2, -2)
}

/**
 * 判断当前属性名是否为某种语言
 * @param prop 属性名
 */
export function isLanguageProp(prop: string): boolean {
  for (const [lan1, lan2] of languages) {
    if (
      prop === lan1 ||
      (prop.startsWith(lan1) &&
        prop.endsWith(lan2) &&
        prop.length <= lan1.length + lan2.length + 1)
    ) {
      return true
    }
  }
  // 使用自定义添加的语言检查当前属性名
  const customLanguages = getConfiguration('customLanguages')
  return customLanguages.includes(prop)
}

/**
 * 解析 JSON 返回 AST 语法树
 */
function parseJSON(jsonStr: string) {
  const settings = {
    // Appends location information. Default is <true>
    loc: true,
    // Appends source information to node’s location. Default is <null>
    // source: "data.json",
  }
  return jsonParse(jsonStr, settings) as any
}

/**
 * 查找 token 对应语言字段的位置
 */
function findTokenLocation(
  text: string,
  token: string,
  language: string,
  fileType: ConfigFileType,
) {
  const children = parseJSON(text).children as any[]
  const findTargetNode = (fromProp: string, toProp: string) => {
    let targetNode = children.find(item => item.key.value === fromProp)
    if (!targetNode) {
      return
    }

    const valueChildren = targetNode.value.children as any[]
    targetNode = valueChildren.find(item => item.key.value === toProp)
    return targetNode
  }

  let targetNode
  if (fileType === ConfigFileType.SINGLE_FILE_IN_MULTI_PROP) {
    targetNode = findTargetNode(language, token)
  } else if (fileType === ConfigFileType.SINGLE_FILE_IN_SINGLE_PROP) {
    targetNode = findTargetNode(token, language)
  } else if (fileType === ConfigFileType.MULTI_FILE) {
    targetNode = children.find(item => item.key.value === token)
  }

  if (!targetNode) {
    return -1
  }

  return targetNode.value.loc.start.offset + 1
}
