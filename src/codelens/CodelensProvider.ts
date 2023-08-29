import * as vscode from "vscode";
import { checkIsTargetDocument, getTokenRanges } from "../utils";

/**
 * CodelensProvider
 */
export class CodelensProvider implements vscode.CodeLensProvider {
  private onDidChangeCodeLensesEmitter: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();

  get onDidChangeCodeLenses(): vscode.Event<void> {
    return this.onDidChangeCodeLensesEmitter.event;
  }

  public refresh(): void {
    this.onDidChangeCodeLensesEmitter.fire();
  }

  public provideCodeLenses(
    document: vscode.TextDocument,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.CodeLens[]> {
    if (!checkIsTargetDocument(document)) {
      return;
    }

    const codeLens: vscode.CodeLens[] = [];
    getTokenRanges(document, (key: string, value: object, range: vscode.Range) => {
      codeLens.push(
        new vscode.CodeLens(range, {
          title: key,
          tooltip: JSON.stringify(value),
          command: "test.ttttt",
          arguments: [],
        })
      );
    });

    return codeLens;
  }
}
