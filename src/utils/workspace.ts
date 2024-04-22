import * as vscode from 'vscode'
import * as path from 'path'
import { source } from './data'
import { getI18nConfig, isLanguageProp } from '.'
import { ConfigFileType, Configuration, ConfigurationKeys } from '../types'

/**
 * 读取当前文件夹下的所有指定文件夹中的配置文件
 */
export function loadConfigJSON(callback: (editor?: vscode.TextEditor) => void) {
  const { workspaceFolders } = vscode.workspace
  if (!workspaceFolders) {
    return
  }

  const currentFolder = workspaceFolders[0].uri
  const folderPath = currentFolder.fsPath
  getI18nConfig(folderPath).then(files => {
    files.forEach(filePath => {
      loadFile(filePath, callback)
    })
  })
}

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
 * 加载配置文件，并更新数据源
 */
function loadFile(filePath: string, callback: Function) {
  const { fs } = vscode.workspace
  fs.readFile(vscode.Uri.file(filePath)).then(content => {
    const extname = path.extname(filePath).slice(1) as 'js' | 'json'
    // 根据不同类型的配置文件，执行不同的解析策略
    const ops = {
      js: parseJsConfigData,
      json: parseJsonConfigData,
    }

    console.log(extname, filePath)

    const fileContent = Buffer.from(content).toString()
    // 解析后的结果为一个对象格式
    const fileContentObj = ops[extname](fileContent, filePath)

    callback()
  })
}

/**
 * 是否是单语言配置文件
 * @param jsonObj
 * @returns
 */
function isSingleLanguageConfig(jsonObj: Record<string, any>) {
  return Object.values(jsonObj).every(val => typeof val === 'string')
}

/**
 * 解析 js 格式的配置文件
 * @param content
 */
function parseJsConfigData(content: string, filePath: string) {}

/**
 * 解析 json 格式的配置文件
 * @param content
 */
function parseJsonConfigData(content: string, filePath: string) {
  const obj = JSON.parse(content)
  if (!Object.keys(obj).length) {
    return {}
  }

  const [firstKey] = Object.keys(obj)
  if (isSingleLanguageConfig(obj)) {
    // 将文件名用作当前语言
    const language = path.parse(filePath).name
    const newJson = {} as any
    Object.keys(obj).forEach(token => {
      if (!newJson[token]) {
        newJson[token] = {}
      }
      newJson[token][language] = obj[token]
      source.updateToken(token, {
        filePath,
        fileType: ConfigFileType.MULTI_FILE,
        language,
      })
    })
    source.updateData(newJson)
  } else if (isLanguageProp(firstKey)) {
    const newJson = {} as any
    const [tokens] = Object.values(obj) as any[]
    const languages = Object.keys(obj)
    Object.keys(tokens).forEach(token => {
      languages.forEach(language => {
        if (!newJson[token]) {
          newJson[token] = {}
        }
        newJson[token][language] = obj?.[language]?.[token] || ''
        source.updateToken(token, {
          language,
          filePath,
          fileType: ConfigFileType.SINGLE_FILE_IN_MULTI_PROP,
        })
      })
    })

    source.updateData(newJson)
  } else {
    source.updateData(obj)
    Object.keys(obj).forEach(token => {
      Object.keys(obj[token]).forEach(language => {
        source.updateToken(token, {
          filePath,
          fileType: ConfigFileType.SINGLE_FILE_IN_SINGLE_PROP,
          language,
        })
      })
    })
  }
}
