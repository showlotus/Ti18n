import * as vscode from "vscode";
import { source } from "./data";
import { getConfigJSON } from ".";

/**
 * 读取当前文件夹下的所有 i18n 文件夹下的 JSON 文件
 */
export function loadConfigJSON(callback: Function) {
  const { workspaceFolders } = vscode.workspace;
  if (!workspaceFolders) {
    return;
  }

  const currentFolder = workspaceFolders[0].uri;
  const path = currentFolder.path;
  getConfigJSON(path).forEach(filePath => {
    console.log(filePath);
    loadFile(filePath, callback);
  });
}

/**
 * 读取插件的配置信息
 */
export function getConfiguration<T extends ConfigurationKeys>(name: T): Configuration[T] {
  const config = vscode.workspace.getConfiguration("turboui-i18n");
  return config.get(name)!;
}

/**
 * 加载 JSON 文件，并更新数据源
 */
function loadFile(filePath: string, callback: Function) {
  const { fs } = vscode.workspace;
  fs.readFile(vscode.Uri.file(filePath)).then(content => {
    const fileContent = Buffer.from(content).toString();
    const fileContentObj = JSON.parse(fileContent);
    if (!Object.keys(fileContentObj).length) {
      return;
    }
    source.updateJson(fileContentObj);
    source.updateTokens(fileContent, filePath);
    callback();
  });
}
