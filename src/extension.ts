import vscode from 'vscode'
import { appendStyle } from './utils/ui'
import { getConfiguration, loadConfigJSON } from './utils/workspace'
import { openDocumentRevealTokenRange } from './utils'
import { CodelensProvider } from './codelens/CodelensProvider'
import { Parser } from './modules/Parser'
import { Store } from './modules/Store'
import { Render } from './modules/Render'
import { Workspace } from './modules/Workspace'

export function activate(context: vscode.ExtensionContext) {
  const enable = getConfiguration('enable')
  if (!enable) {
    return
  }
  console.clear()

  const store = new Store()
  const parser = new Parser()
  const render = new Render()
  const workspace = new Workspace(context, store)
  parser.addSub(store)
  store.addSub(render)
  workspace.addSub(render)

  return

  const codelensProvider = new CodelensProvider()
  vscode.languages.registerCodeLensProvider('*', codelensProvider)

  // const { commands, window, workspace } = vscode
  // const updateStyle = (editor?: vscode.TextEditor) => {
  //   editor = editor ?? window.activeTextEditor
  //   appendStyle(editor)
  // }

  // loadConfigJSON(updateStyle)
  // context.subscriptions.push(
  //   window.onDidChangeActiveTextEditor(updateStyle),
  //   workspace.onDidChangeTextDocument(() => updateStyle()),
  //   commands.registerCommand(
  //     'Ti18n.openTokenRange',
  //     openDocumentRevealTokenRange,
  //   ),
  // )
}

export function deactivate() {}
