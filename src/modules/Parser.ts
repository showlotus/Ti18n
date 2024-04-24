import * as vscode from 'vscode'
import * as path from 'path'
import * as fg from 'fast-glob'
import jsonParser from 'json-to-ast'
import * as t from '@babel/types'
import * as babelParser from '@babel/parser'
import {
  isLanguageObj,
  isLanguageProp,
  isObject,
  isUnderLanguage,
} from '../utils'
import { Store } from './Store'
import { getConfiguration } from '../utils/workspace'

export interface ConfigDataType {
  [K: string]: any | string | number | boolean | ConfigDataType
}

export class Parser {
  store: Store
  constructor(store: Store) {
    this.store = store
    this.init()
  }

  async init() {
    const configs = await this.getI18nConfig()
    Promise.all(configs.map(this.parseConfig)).then(res => {
      for (const { data, filePath } of res) {
        console.log(this.transformConfig(data, filePath))
      }
      // console.log(res)
    })
  }

  transformConfig(data: ConfigDataType, filePath: string) {
    const obj = {} as any
    const props = [] as any[]

    function traverseConfig(data: ConfigDataType) {
      Object.keys(data).forEach(key => {
        props.push(key)
        if (isLanguageObj(data[key])) {
          const prop = props.join('.')
          obj[prop] = data[key]
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
          obj[prop][language] = data[key]
        }
        props.pop()
      })
    }

    traverseConfig(data)
    return obj
  }

  traverseConfig(
    data: ConfigDataType,
    props: string[],
    result: Record<string, any>,
  ) {
    Object.keys(data).forEach(key => {
      props.push(key)
      if (isLanguageObj(data[key])) {
        const prop = props.join('.')
        result[prop] = data[key]
        return
      } else if (isObject(data[key])) {
        this.traverseConfig(data[key], props, result)
      } else {
      }
      props.pop()
    })
  }

  formatConfig(data: ConfigDataType) {}

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

  parseJsonConfig(content: string): ConfigDataType {
    return JSON.parse(content || '{}')
  }

  parseJsConfig(content: string): ConfigDataType {
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
