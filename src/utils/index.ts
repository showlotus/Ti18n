import * as vscode from 'vscode'
import * as path from 'path'
import { languages } from '../config'
import { Configuration, ConfigurationKeys } from '../types'
import Parser from '../modules/Parser'
import Store from '../modules/Store'
import { StoreToken } from '../modules/Store'

/**
 * 读取插件的配置信息
 */
export function getConfiguration<T extends ConfigurationKeys>(
  name: T,
): Configuration[T] {
  const config = vscode.workspace.getConfiguration('ti18n')
  return config.get(name)!
}

/**
 * 是否是目标文档
 */
export function isTargetDocument() {
  const editor = vscode.window.activeTextEditor
  if (!editor) {
    return false
  }

  const document = editor.document
  const extname = path.extname(document.fileName)
  const extnames = getConfiguration('extnames')
  const fsPath = document.uri.fsPath.replace(/\\/g, '/')
  // 排除配置文件，以及非配置下的目标文件
  return !Parser.configs.includes(fsPath) && extnames.includes(extname)
}

/**
 * 获取文档中所有 token 的 range
 */
export function getTokenRanges(document: vscode.TextDocument) {
  const text = document.getText()
  const ranges = [] as {
    token: string
    value: StoreToken
    range: vscode.Range
  }[]
  const data = Store.data
  Object.keys(data).forEach(token => {
    const regex = new RegExp(`(["'\`])${token}\\1`, 'g')
    let match
    while ((match = regex.exec(text))) {
      const startPos = document.positionAt(match.index + 1)
      const endPos = document.positionAt(match.index + match[0].length - 1)
      const range = new vscode.Range(startPos, endPos)
      ranges.push({ token, value: data[token], range })
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

export function isObject(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 判断是否为语言对象
 * @param data
 * @returns
 */
export function isLanguageObj(data: Record<string, any>) {
  if (!isObject(data)) {
    return false
  }

  const values = Object.values(data)
  return isUnderLanguage(data) && values.every(val => !isObject(val))
}

/**
 * 判断当前配置对象下的属性名全为语言
 * @param data
 * @returns
 */
export function isUnderLanguage(data: Record<string, any>) {
  const keys = Object.keys(data)
  return keys.every(key => isLanguageProp(key))
}

/**
 * 判断当前属性名是否为某种语言
 * @param prop 属性名
 */
export function isLanguageProp(prop: string): boolean {
  for (const [lan1, lan2] of languages) {
    const regex = new RegExp(`^${lan1}([^\s\S]${lan2})?$`, 'i')
    if (regex.test(prop)) {
      return true
    }
  }
  // 使用自定义添加的语言检查当前属性名
  const customLanguages = getConfiguration('customLanguages')
  return customLanguages.includes(prop)
}

/**
 * 注释中定义了自定义属性
 * @param comment 注释内容
 * @returns
 */
export function isDefCustomProp(comment: string) {
  return comment.match(/^\s*@Ti18n\s+prop=([a-zA-Z0-9\.\$_]+)\s*$/i)?.[1]
}
