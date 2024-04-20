import * as vscode from 'vscode'
import * as path from 'path'
import { source } from './data'
import { getConfigJSON, isLanguageProp } from '.'
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
  getConfigJSON(folderPath).then(files => {
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
    const fileContent = Buffer.from(content).toString()
    const fileContentObj = JSON.parse(fileContent)

    if (!Object.keys(fileContentObj).length) {
      return
    }

    const [firstKey] = Object.keys(fileContentObj)
    if (isSingleLanguageConfig(fileContentObj)) {
      // 将文件名用作当前语言
      const language = path.parse(filePath).name
      const newJson = {} as any
      Object.keys(fileContentObj).forEach(token => {
        if (!newJson[token]) {
          newJson[token] = {}
        }
        newJson[token][language] = fileContentObj[token]
        source.updateToken(token, {
          filePath,
          fileType: ConfigFileType.MULTI_FILE,
          language,
        })
      })
      source.updateJson(newJson)
    } else if (isLanguageProp(firstKey)) {
      const newJson = {} as any
      const [tokens] = Object.values(fileContentObj) as any[]
      const languages = Object.keys(fileContentObj)
      Object.keys(tokens).forEach(token => {
        languages.forEach(language => {
          if (!newJson[token]) {
            newJson[token] = {}
          }
          newJson[token][language] = fileContentObj?.[language]?.[token] || ''
          source.updateToken(token, {
            language,
            filePath,
            fileType: ConfigFileType.SINGLE_FILE_IN_MULTI_PROP,
          })
        })
      })

      source.updateJson(newJson)
    } else {
      source.updateJson(fileContentObj)
      Object.keys(fileContentObj).forEach(token => {
        Object.keys(fileContentObj[token]).forEach(language => {
          source.updateToken(token, {
            filePath,
            fileType: ConfigFileType.SINGLE_FILE_IN_SINGLE_PROP,
            language,
          })
        })
      })
    }

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
