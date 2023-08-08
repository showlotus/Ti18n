import * as vscode from "vscode";
import { appendStyle } from "./utils/ui";
import { loadConfigJSON } from "./utils/workspace";

export function activate(context: vscode.ExtensionContext) {
  const { commands, window, workspace } = vscode;
  const updateStyle = (editor?: vscode.TextEditor) => {
    editor = editor ?? window.activeTextEditor;
    appendStyle(editor);
  };

  loadConfigJSON(updateStyle);

  commands.registerCommand("myExtension.Hello", async () => {
    const file = vscode.Uri.file("/d:/Code/Turboui-i18n/src/test-files/2.js");
    const document = await workspace.openTextDocument(file);
    const lineNumber = 499; // 索引从 0 开始
    const range = new vscode.Range(lineNumber, 0, lineNumber, 0);
    await window.showTextDocument(document, {
      selection: range,
    });
    window.activeTextEditor?.revealRange(range);
  });
  context.subscriptions.push(
    window.onDidChangeActiveTextEditor(updateStyle),
    workspace.onDidChangeTextDocument(() => updateStyle())
  );
}

export function deactivate() {}
