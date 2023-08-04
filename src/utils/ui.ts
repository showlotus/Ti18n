import * as vscode from "vscode";

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
  config: Record<string, any>
) {
  if (!editor) {
    return;
  }

  const document = editor.document;
  const decorations: vscode.DecorationOptions[] = [];
  const text = document.getText();
  Object.keys(config).forEach((key) => {
    const regex = new RegExp(`(["'\`])${key}\\1`, "g");
    let match;
    while ((match = regex.exec(text))) {
      const startPos = document.positionAt(match.index + 1);
      const endPos = document.positionAt(match.index + match[0].length - 1);
      const range = new vscode.Range(startPos, endPos);
      const hoverMessage = genHoverMessage(config[key]);
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
  borderWidth: "0 0 1px 0",
  borderStyle: "dashed",
  borderColor: new vscode.ThemeColor("editor.foreground"), // 使用前景色
});
