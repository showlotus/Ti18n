import * as vscode from 'vscode'
import { getConfiguration } from './utils'
import Parser from './modules/Parser'
import Store from './modules/Store'
import Render from './modules/Render'

export function activate(context: vscode.ExtensionContext) {
  const enable = getConfiguration('enable')
  if (!enable) {
    return
  }

  console.clear()

  const store = new Store()
  const parser = new Parser()
  const render = new Render(context)
  parser.addSub(store)
  store.addSub(render)
}

export function deactivate() {}
