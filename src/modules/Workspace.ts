import * as vscode from 'vscode'
import * as path from 'path'
import { PubSub } from './PubSub'
import { Store } from './Store'
import { checkIsTargetDocument, getConfiguration } from '../utils'
import { Parser } from './Parser'

export class Workspace extends PubSub {
  context: vscode.ExtensionContext
  store: Store
  constructor(context: vscode.ExtensionContext, store: Store) {
    super()
    this.context = context
    this.store = store
    this.init()
  }

  init() {
    this.context.subscriptions.push(
      vscode.window.onDidChangeActiveTextEditor(() => {
        this.watchActive()
      }),
      vscode.workspace.onDidChangeTextDocument(() => {
        this.watchActive()
      }),
      // vscode.commands.registerCommand('Ti18n.locateToken', () => {}),
      // vscode.languages.registerCodeLensProvider('*', ),
    )
  }

  watchActive() {
    this.isTargetDocument() && this.notify()
  }

  isTargetDocument() {
    const editor = vscode.window.activeTextEditor
    if (!editor) {
      return false
    }

    const document = editor.document
    const extname = path.extname(document.fileName)
    const extnames = getConfiguration('extnames')
    // TODO 验证 Mac 系统下，路径是否正常检测
    // console.log(Parser.configs, document.uri.path)
    // 排除配置文件，以及非配置下的目标文件
    return (
      !Parser.configs.includes(document.uri.path.replace(/^\//, '')) &&
      extnames.includes(extname)
    )
  }
}
