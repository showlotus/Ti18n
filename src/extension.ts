import * as vscode from "vscode";
import { appendStyle } from "./utils/ui";
import { loadConfigJSON } from "./utils/workspace";
import { originData } from "./utils/data";

export function activate(context: vscode.ExtensionContext) {
  const { commands, window, workspace } = vscode;
  const updateStyle = (editor?: vscode.TextEditor) => {
    editor = editor ?? window.activeTextEditor;
    appendStyle(editor);
  };

  loadConfigJSON(updateStyle);

  commands.registerCommand("Turboui-i18n.openTokenRange", async () => {
    originData.openDocumentRevealTokenRange("M.Morning");
  });
  context.subscriptions.push(
    window.onDidChangeActiveTextEditor(updateStyle),
    workspace.onDidChangeTextDocument(() => updateStyle()),
  );
}

export function deactivate() {}
