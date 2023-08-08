import * as vscode from "vscode";
import { originData } from "./data";

/**
 * 读取当前文件夹下的所有 i18n 文件夹下的 JSON 文件
 */
export function loadConfigJSON(callback: Function) {
  const dirName = getConfiguration("dirName");
  const { workspaceFolders } = vscode.workspace;
  const { fs } = vscode.workspace;
  const getJSON = (folder: string, isTargetDir = false) => {
    fs.readDirectory(vscode.Uri.file(folder)).then((files) => {
      files.forEach((file) => {
        const [fileName, fileType] = file;
        if (fileType === vscode.FileType.Directory) {
          getJSON(`${folder}/${fileName}`, fileName === dirName);
        } else if (isTargetDir && fileName.endsWith(".json")) {
          const filePath = `${folder}/${fileName}`;
          fs.readFile(vscode.Uri.file(filePath)).then((content) => {
            const fileContent = Buffer.from(content).toString();
            const fileContentObj = JSON.parse(fileContent);
            if (!Object.keys(fileContentObj).length) {
              return;
            }
            originData.updateJson(fileContentObj);
            originData.updateTokens(fileContent, filePath);
            callback();
          });
        }
      });
    });
  };

  if (workspaceFolders) {
    const currentFolder = workspaceFolders[0].uri;
    const path = currentFolder.path;
    getJSON(path);
  }
}

/**
 * 读取插件的配置信息
 */
export function getConfiguration<T extends ConfigurationKeys>(
  name: T
): Configuration[T] {
  const config = vscode.workspace.getConfiguration("turboui-i18n");
  return config.get(name)!;
}

type ConfigurationKeys = keyof Configuration;

interface Configuration {
  dirName: string;
  includes: string[];
}
