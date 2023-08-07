import * as vscode from "vscode";
import * as path from "path";
import { getConfiguration } from "./workspace";

/**
 * 生成提示文字
 */
export function genHoverMessage(obj: Record<string, any>) {
  const entries = Object.entries(obj);
  const str = entries.map(([key, val]) => `\`${key}\`：${val}`).join("\n\n");
  return new vscode.MarkdownString(str);
}

/**
 * 给关键词添加样式
 */
export function appendStyle(
  editor: vscode.TextEditor | undefined,
  data: Record<string, any>
) {
  if (!editor) {
    return;
  }

  const document = editor.document;
  const extname = path.extname(document.fileName);
  const includes = getConfiguration("includes");
  if (!includes.includes(extname)) {
    return;
  }

  const decorations: vscode.DecorationOptions[] = [];
  const text = document.getText();
  Object.keys(data).forEach((key) => {
    const regex = new RegExp(`(["'\`])${key}\\1`, "g");
    let match;
    while ((match = regex.exec(text))) {
      const startPos = document.positionAt(match.index + 1);
      const endPos = document.positionAt(match.index + match[0].length - 1);
      const range = new vscode.Range(startPos, endPos);
      const hoverMessage = genHoverMessage(data[key]);
      decorations.push({ range, hoverMessage });
    }
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
