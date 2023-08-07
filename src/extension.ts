import * as vscode from "vscode";
import { appendStyle } from "./utils/ui";
import { loadConfigJSON } from "./utils/workspace";

export function activate(context: vscode.ExtensionContext) {
  const updateStyle = (editor?: vscode.TextEditor) => {
    editor = editor ?? vscode.window.activeTextEditor;
    appendStyle(editor);
  };

  loadConfigJSON(updateStyle);
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(updateStyle),
    vscode.workspace.onDidChangeTextDocument(() => updateStyle())
  );
}

export function deactivate() {}
