import * as vscode from "vscode";
const jsonParse = require("json-to-ast");

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
