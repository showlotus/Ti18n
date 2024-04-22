import * as vscode from 'vscode'
import { source } from './data'
import {
  checkIsTargetDocument,
  encodeSpecialCharacter,
  getTokenRanges,
} from '.'

function genCommand(token: string, language: string, val: string) {
  const tokenVal = source.getTokens().get(token)!
  const { filePath, fileType } = tokenVal[language]
  const params = encodeURIComponent(
    JSON.stringify({
      token,
      language,
      filePath,
      fileType,
    }),
  )
  const command = 'Ti18n.openTokenRange'
  return `[${encodeSpecialCharacter(val)}](command:${command}?${params})`
}

/**
 * 生成提示文字
 */
export function genHoverMessage(token: string, obj: Record<string, any>) {
  const entries = Object.entries(obj)
  const str = entries
    .map(([language, val]) => {
      return `\`${language}\`：${genCommand(token, language, val)}`
    })
    .join('\n\n')
  const contents = new vscode.MarkdownString(str)
  contents.isTrusted = true
  return contents
}

/**
 * 给关键词添加样式
 */
export function appendStyle(editor: vscode.TextEditor | undefined) {
  if (!editor) {
    return
  }

  const document = editor.document
  if (!checkIsTargetDocument(document)) {
    return
  }

  const decorations: vscode.DecorationOptions[] = []
  const sourceJson = source.getData()
  getTokenRanges(
    document,
    (token: string, value: object, range: vscode.Range) => {
      const hoverMessage = genHoverMessage(token, sourceJson[token])
      decorations.push({ range, hoverMessage })
    },
  )

  // 添加特殊样式的范围和样式
  editor.setDecorations(highLightStyle, decorations)
}

/**
 * 高亮样式
 */
export const highLightStyle = vscode.window.createTextEditorDecorationType({
  textDecoration: ';border-bottom: 1px dashed;',
})
