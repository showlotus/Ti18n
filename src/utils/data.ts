import * as vscode from "vscode";

class OriginData {
  /**
   * 配置文件中的 JSON 数据
   */
  private json: Record<string, any>;
  /**
   * 每个关键词对应的 JSON 文件
   */
  private tokens: Record<string, any>;

  constructor() {
    this.json = {};
    this.tokens = {};
  }

  /**
   * 获取 JSON
   */
  getJson() {
    return this.json;
  }

  /**
   * 更新 JSON
   */
  updateJson(data: any) {
    Object.assign(this.json, data);
  }

  /**
   * 更新 tokens
   */
  updateTokens(content: string, file: string) {
    console.log(content, file);
  }

  /**
   * 通过关键词打开对应的文件，定位到关键词对应的文档片段位置
   */
  async openDocumentRevealTokenRange(key: string) {
    const { window, workspace } = vscode;
    const file = vscode.Uri.file("/d:/Code/Turboui-i18n/src/test-files/2.js");
    const document = await workspace.openTextDocument(file);
    const lineNumber = 499; // 索引从 0 开始
    const range = new vscode.Range(lineNumber, 0, lineNumber, 0);
    await window.showTextDocument(document, {
      selection: range,
    });
    window.activeTextEditor?.revealRange(range);
  }
}

export const originData = new OriginData();
