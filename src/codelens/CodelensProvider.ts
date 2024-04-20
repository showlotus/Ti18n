import * as vscode from 'vscode'
import {
  checkIsTargetDocument,
  encodeSpecialCharacter,
  getTokenRanges,
} from '../utils'
import { source } from '../utils/data'
import { getConfiguration } from '../utils/workspace'

/**
 * CodelensProvider
 */
export class CodelensProvider implements vscode.CodeLensProvider {
  public provideCodeLenses(
    document: vscode.TextDocument,
    token: vscode.CancellationToken,
  ): vscode.ProviderResult<vscode.CodeLens[]> {
    if (!checkIsTargetDocument(document)) {
      return
    }

    const shortcutLanguages = getConfiguration('shortcutLanguages')
    const shortcutLanguageMaxLength = getConfiguration(
      'shortcutLanguageMaxLength',
    )

    const textOverflow = (str: string) => {
      if (str.length <= shortcutLanguageMaxLength) {
        return str
      }
      return str.slice(0, shortcutLanguageMaxLength) + '...'
    }

    const codeLens: vscode.CodeLens[] = []
    getTokenRanges(
      document,
      (token: string, value: Record<string, any>, range: vscode.Range) => {
        const tokenVal = source.getTokens().get(token)!
        const showLanguages = Object.keys(value).filter(v =>
          shortcutLanguages.includes(v),
        )
        for (const language of showLanguages) {
          const val = value[language]
          const { filePath, fileType } = tokenVal[language]
          codeLens.push(
            new vscode.CodeLens(range, {
              title: textOverflow(val),
              tooltip: encodeSpecialCharacter(val),
              command: 'Ti18n.openTokenRange',
              arguments: [{ token, language, filePath, fileType }],
            }),
          )
        }
      },
    )

    return codeLens
  }
}
