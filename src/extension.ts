import * as vscode from "vscode";
import { appendStyle } from "./utils/ui";
import { loadConfigJSON } from "./utils/workspace";

export function activate(context: vscode.ExtensionContext) {
  const data: Record<string, any> = {};
  const updateStyle = (editor?: vscode.TextEditor) => {
    editor = editor ?? vscode.window.activeTextEditor;
    appendStyle(editor, data);
  };

  loadConfigJSON(data, updateStyle);
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(updateStyle),
    vscode.workspace.onDidChangeTextDocument(() => updateStyle())
  );
}

export function deactivate() {}
