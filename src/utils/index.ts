import * as vscode from "vscode";

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
  const encodeQuoteKey = key.replace(/"/g, "\\$&");
  const position = text.indexOf(`"${encodeQuoteKey}"`) + 1;
  const documentPosition = document.positionAt(position);
  const range = new vscode.Range(documentPosition, documentPosition);
  await window.showTextDocument(document, {
    selection: range,
  });
  window.activeTextEditor?.revealRange(range);
}
