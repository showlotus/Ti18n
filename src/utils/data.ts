import * as vscode from "vscode";

class OriginData {
  /**
   * 配置文件中的 JSON 数据
   */
  private json: Record<string, any>;
  /**
   * 每个关键词对应的 JSON 文件
   */
  private tokens: Map<string, any>;

  constructor() {
    this.json = {};
    this.tokens = new Map();
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
    const obj = JSON.parse(content);
    Object.keys(obj).forEach(key => {
      this.tokens.set(key, {
        file,
        position: content.indexOf(`"${key}"`) + 1,
      });
    });
  }

  /**
   * 通过关键词打开对应的文件，定位到关键词对应的文档片段位置
   */
  async openDocumentRevealTokenRange(key: string) {
    const { file, position } = this.tokens.get(key);
    const { window, workspace } = vscode;
    const document = await workspace.openTextDocument(vscode.Uri.file(file));
    const documentPosition = document.positionAt(position);
    const range = new vscode.Range(documentPosition, documentPosition);
    await window.showTextDocument(document, {
      selection: range,
    });
    window.activeTextEditor?.revealRange(range);
  }
}

export const originData = new OriginData();
