import * as vscode from "vscode";
import * as path from "path";
const jsonParse = require("json-to-ast");
const fg = require("fast-glob");
import { getConfiguration } from "./workspace";
import { source } from "./data";

/**
 * 通过关键词打开对应的文件，定位到关键词对应的文档片段位置
 */
export async function openDocumentRevealTokenRange(params: any) {
  if (!params) {
    return;
  }

  const { token, key, file } = params;
  const { window, workspace } = vscode;
  const document = await workspace.openTextDocument(vscode.Uri.file(file));
  const text = document.getText();
  const position = findTokenLocation(text, token, key);
  const documentPosition = document.positionAt(position);
  const range = new vscode.Range(documentPosition, documentPosition);
  await window.showTextDocument(document, {
    selection: range,
  });
  window.activeTextEditor?.revealRange(range);
}

/**
 * 获取 JSON 配置文件
 */
export async function getConfigJSON(folderPath: string) {
  const configDirName = getConfiguration("configDirName");
  const res: string[] = await fg.glob([`**/${configDirName}/*.json`], {
    cwd: folderPath,
    ignore: "**/node_modules/**",
    absolute: true,
  });
  return res;
}

/**
 * 检查当前打开文档是否符合要求
 */
export function checkIsTargetDocument(document: vscode.TextDocument) {
  const extname = path.extname(document.fileName);
  const includeConfig = getConfiguration("include");
  return includeConfig.includes(extname);
}

/**
 * 获取文档的关键词 range
 */
export function getTokenRanges(document: vscode.TextDocument, callback?: Function) {
  const text = document.getText();
  const ranges: vscode.Range[] = [];
  Object.keys(source.getJson()).forEach(key => {
    const regex = new RegExp(`(["'\`])${key}\\1`, "g");
    let match;
    while ((match = regex.exec(text))) {
      const startPos = document.positionAt(match.index + 1);
      const endPos = document.positionAt(match.index + match[0].length - 1);
      const range = new vscode.Range(startPos, endPos);
      callback && callback(key, range);
      ranges.push(range);
    }
  });
  return ranges;
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
  };
  return jsonParse(jsonStr, settings);
}

/**
 * 查找 token 下对应字段的位置
 */
function findTokenLocation(jsonStr: string, token: string, key: string) {
  const children = <any[]>parseJSON(jsonStr).children;
  const targetProperty = children.find(item => item.key.value === token);
  if (!targetProperty) {
    return -1;
  }

  const valueChildren = <any[]>targetProperty.value.children;
  const targetKeyProperty = valueChildren.find(item => item.key.value === key);
  if (!targetKeyProperty) {
    return -1;
  }

  return targetKeyProperty.value.loc.start.offset + 1;
}
