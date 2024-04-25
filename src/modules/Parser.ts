import * as vscode from 'vscode'
import * as path from 'path'
import * as fg from 'fast-glob'
import * as t from '@babel/types'
import * as babelParser from '@babel/parser'
import {
  getConfiguration,
  isLanguageObj,
  isLanguageProp,
  isObject,
} from '../utils'
import { StoreData } from './Store'
import { PubSub } from './PubSub'

export interface ConfigData {
  [K: string]: any | string | number | boolean | ConfigData
}

export class Parser extends PubSub {
  static configs: string[]
  constructor() {
    super()
    Parser.configs = []
    this.init()
  }

  async init() {
    Parser.configs = await this.getI18nConfig()
    Promise.all(Parser.configs.map(this.parseConfig))
      .then(res => {
        return res.map(({ data, filePath }) =>
          this.transformConfig(data, filePath),
        )
      })
      .then(data => {
        this.notify(data)
      })
  }

  transformConfig(data: ConfigData, filePath: string) {
    const obj = {} as any
    const props = [] as any[]

    function traverseConfig(data: ConfigData) {
      Object.keys(data).forEach(key => {
        props.push(key)
        if (isLanguageObj(data[key])) {
          const prop = props.join('.')
          obj[prop] ??= {}
          Object.keys(data[key]).forEach(lang => {
            obj[prop][lang] = { value: data[key][lang], url: filePath }
          })
        } else if (isObject(data[key])) {
          traverseConfig(data[key])
        } else {
          let prop = ''
          let language = ''
          if (isLanguageProp(props[0])) {
            language = props[0]
            prop = props.slice(1).join('.')
          } else {
            language = path.parse(filePath).name
            prop = props.join('.')
          }
          obj[prop] ??= {}
          obj[prop][language] = { value: data[key], url: filePath }
        }
        props.pop()
      })
    }

    traverseConfig(data)
    return obj as StoreData
  }

  /**
   * 解析配置文件
   * @param filePath 文件路径
   */
  parseConfig = async (filePath: string) => {
    const uri = vscode.Uri.file(filePath)
    const buffer = await vscode.workspace.fs.readFile(uri)
    const content = Buffer.from(buffer).toString()
    const extname = path.extname(filePath).slice(1)
    if (extname === 'json') {
      return { data: this.parseJsonConfig(content), filePath }
    } else {
      return { data: this.parseJsConfig(content), filePath }
    }
  }

  parseJsonConfig(content: string): ConfigData {
    return JSON.parse(content || '{}')
  }

  parseJsConfig(content: string): ConfigData {
    const ast = babelParser.parse(content, { sourceType: 'module' })
    const body = ast.program.body
    const exportDefaultNode = body.find(v =>
      t.isExportDefaultDeclaration(v),
    ) as t.ExportDefaultDeclaration
    if (!exportDefaultNode) {
      return {}
    }

    const { start, end } = exportDefaultNode.declaration
    let obj = JSON.parse(
      JSON.stringify(
        new Function(
          `return ${content.slice(start as number, end as number)}`,
        )(),
      ),
    )

    const leadingComment = exportDefaultNode.leadingComments?.at(-1)
    let prop: string | undefined = ''
    if (
      !leadingComment ||
      !leadingComment.value ||
      !(prop = this.isDefCustomProp(leadingComment.value))
    ) {
      return obj
    }

    const props = prop
      .split('.')
      .map(v => v.trim())
      .filter(Boolean)
    for (const key of props) {
      if (!obj[key]) {
        return obj
      } else {
        obj = obj[key]
      }
    }
    return obj
  }

  /**
   * 注释中定义了自定义属性
   * @param comment
   * @returns
   */
  isDefCustomProp(comment: string) {
    return comment.match(/^\s*@Ti18n\s+prop=([a-zA-Z0-9\.\$_]+)\s*$/i)?.[1]
  }

  /**
   * 获取配置文件
   */
  async getI18nConfig() {
    const { workspaceFolders } = vscode.workspace
    const configDirs = getConfiguration('configDirs')
    if (!workspaceFolders || !configDirs.length) {
      return []
    }

    const folderPath = workspaceFolders[0].uri.fsPath
    const configTypes = ['.json', '.js', '.ts']
    const configFiles = configDirs
      .map(dir => configTypes.map(ext => `${dir}/**/*${ext}`))
      .flat()
    const res = await fg.glob(configFiles, {
      cwd: folderPath,
      ignore: ['**/node_modules/**'],
      absolute: true,
    })
    return res
  }
}
