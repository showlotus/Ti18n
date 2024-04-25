import vscode from 'vscode'
import { appendStyle } from './utils/ui'
import { getConfiguration, loadConfigJSON } from './utils/workspace'
import { openDocumentRevealTokenRange } from './utils'
import { CodelensProvider } from './codelens/CodelensProvider'
import { Parser } from './modules/Parser'
import { Store } from './modules/Store'
import { Render } from './modules/Render'

export function activate(context: vscode.ExtensionContext) {
  const enable = getConfiguration('enable')
  if (!enable) {
    return
  }
  console.clear()

  const render = new Render()
  const store = new Store()
  const parser = new Parser()
  parser.addSub(store)
  store.addSub(render)

  return

  const codelensProvider = new CodelensProvider()
  vscode.languages.registerCodeLensProvider('*', codelensProvider)

  const { commands, window, workspace } = vscode
  const updateStyle = (editor?: vscode.TextEditor) => {
    editor = editor ?? window.activeTextEditor
    appendStyle(editor)
  }

  loadConfigJSON(updateStyle)
  context.subscriptions.push(
    window.onDidChangeActiveTextEditor(updateStyle),
    workspace.onDidChangeTextDocument(() => updateStyle()),
    commands.registerCommand(
      'Ti18n.openTokenRange',
      openDocumentRevealTokenRange,
    ),
  )
}

export function deactivate() {}
