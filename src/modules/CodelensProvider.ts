import * as vscode from 'vscode'
import {
  encodeSpecialCharacter,
  getConfiguration,
  getTokenRanges,
  isTargetDocument,
} from '../utils'

export class CodelensProvider implements vscode.CodeLensProvider {
  public provideCodeLenses(
    document: vscode.TextDocument,
    token: vscode.CancellationToken,
  ): vscode.ProviderResult<vscode.CodeLens[]> {
    if (!isTargetDocument()) {
      return []
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
    const tokenRanges = getTokenRanges(document)
    tokenRanges.forEach(({ token, value, range }) => {
      const showLanguages = Object.keys(value).filter(v =>
        shortcutLanguages.includes(v),
      )
      for (const language of showLanguages) {
        const { value: text, url } = value[language]
        codeLens.push(
          new vscode.CodeLens(range, {
            title: textOverflow(String(text)),
            tooltip: encodeSpecialCharacter(String(text)),
            command: 'Ti18n.locateToken',
            arguments: [{ token, language, url }],
          }),
        )
      }
    })
    return codeLens
  }
}
