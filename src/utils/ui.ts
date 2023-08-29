import * as vscode from "vscode";
import { source } from "./data";
import { checkIsTargetDocument, getTokenRanges } from ".";

function genCommand(token: string, key: string, val: string) {
  const { file } = source.getTokens().get(token);
  const params = encodeURIComponent(
    JSON.stringify({
      token,
      key,
      file,
    })
  );
  const command = "Turboui-i18n.openTokenRange";
  // 格式化特殊字符（\n、\t等），保证展示结果与原文本保持一致
  val = JSON.stringify(val).replace(/(\f|\n|\r|\t|\v|\"|\\)/g, "\\$&");
  return `[${val.slice(2, -2)}](command:${command}?${params})`;
}

/**
 * 生成提示文字
 */
export function genHoverMessage(token: string, obj: Record<string, any>) {
  const entries = Object.entries(obj);
  const str = entries.map(([key, val]) => `\`${key}\`：${genCommand(token, key, val)}`).join("\n\n");
  const contents = new vscode.MarkdownString(str);
  contents.isTrusted = true;
  return contents;
}

/**
 * 给关键词添加样式
 */
export function appendStyle(editor: vscode.TextEditor | undefined) {
  if (!editor) {
    return;
  }

  const document = editor.document;
  if (!checkIsTargetDocument(document)) {
    return;
  }

  const decorations: vscode.DecorationOptions[] = [];
  getTokenRanges(document, (key: string, range: vscode.Range) => {
    const hoverMessage = genHoverMessage(key, source.getJson()[key]);
    decorations.push({ range, hoverMessage });
  });

  // 添加特殊样式的范围和样式
  editor.setDecorations(highLightStyle, decorations);
}

/**
 * 高亮样式
 */
export const highLightStyle = vscode.window.createTextEditorDecorationType({
  textDecoration: ";border-bottom: 1px dashed;",
});
