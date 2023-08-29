import * as vscode from "vscode";
import { checkIsTargetDocument, encodeSpecialCharacter, getTokenRanges } from "../utils";
import { source } from "../utils/data";
import { getConfiguration } from "../utils/workspace";

/**
 * CodelensProvider
 */
export class CodelensProvider implements vscode.CodeLensProvider {
  public provideCodeLenses(
    document: vscode.TextDocument,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.CodeLens[]> {
    if (!checkIsTargetDocument(document)) {
      return;
    }

    const shortcutLanguages = getConfiguration("shortcutLanguages");
    const shortcutLanguageMaxLength = getConfiguration("shortcutLanguageMaxLength");

    const textOverflow = (str: string) => {
      if (str.length <= shortcutLanguageMaxLength) {
        return str;
      }
      return str.slice(0, shortcutLanguageMaxLength) + "...";
    };

    const codeLens: vscode.CodeLens[] = [];
    getTokenRanges(document, (token: string, value: any, range: vscode.Range) => {
      const { file } = source.getTokens().get(token);
      const keys = Object.keys(value).filter(v => shortcutLanguages.includes(v));
      for (const key of keys) {
        const val = value[key];
        codeLens.push(
          new vscode.CodeLens(range, {
            title: textOverflow(val),
            tooltip: encodeSpecialCharacter(val),
            command: "Turboui-i18n.openTokenRange",
            arguments: [{ token, file, key }],
          })
        );
      }
    });

    return codeLens;
  }
}
