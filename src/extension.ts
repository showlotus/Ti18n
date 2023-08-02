// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
const path = require('path');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "turbo-i18n" is now active!');

  // 定义特殊样式
  const specialStyle = vscode.window.createTextEditorDecorationType({
    borderWidth: "1px",
    borderStyle: "dashed",
    borderColor: "transparent transparent red transparent",
  });

  const editor = vscode.window.activeTextEditor;

  addStyle(editor);

  function addStyle(editor: vscode.TextEditor | undefined) {
    if (!editor) {
      return;
    }

    const { languageId } = editor.document;
    console.log(languageId);
    const document = editor.document;
    const decorations: vscode.DecorationOptions[] = [];

    const text = document.getText();
    const ranges: vscode.Range[] = [];
    const hoverMessage = new vscode.MarkdownString(`\`zh-CN\`：早上好\n\n\`en-US\`：Good morning`);

    const regex = /"hello"/g;
    let match;
    while ((match = regex.exec(text))) {
      const startPos = document.positionAt(match.index);
      const endPos = document.positionAt(match.index + match[0].length);
      const range = new vscode.Range(startPos, endPos);
      decorations.push({ range, hoverMessage });
    }

    console.log(ranges);

    // 添加特殊样式的范围和样式
    // const range = new vscode.Range(0, 0, document.lineCount, 0);
    editor.setDecorations(specialStyle, decorations);
  }

  // 获取配置文件，
  // 读取当前文件夹下的所有 i18n 文件夹下的 JSON 文件
  function getConfigJSON() {
    const DIR_NAME = 'i18n';
    const { workspaceFolders } = vscode.workspace;
    const { fs } = vscode.workspace;
    const getJSON = (folder: string, isTargetDir = false) => {
      fs.readDirectory(vscode.Uri.file(folder)).then(files => {
        files.forEach(file => {
          const [fileName, fileType] = file;
          if (fileType === vscode.FileType.Directory) {
            getJSON(`${folder}/${fileName}`, fileName === DIR_NAME);
          } else if (isTargetDir && fileName.endsWith('.json')) {
            const filePath = `${folder}/${fileName}`;
            fs.readFile(vscode.Uri.file(filePath)).then(content => {
              const fileContent = Buffer.from(content).toString();
              console.log(JSON.parse(fileContent));
            });
          }
        });
      });
    };

    if (workspaceFolders) {
      const currentFolder = workspaceFolders[0].uri;
      const path = currentFolder.path;
      getJSON(path);
    }
  }

  getConfigJSON();

  vscode.window.onDidChangeActiveTextEditor(addStyle, null, context.subscriptions);

  // vscode.languages.registerHoverProvider(["javascript"], {
  //   provideHover(document, position, token) {
  //     return {
  //       // 返回的内容按顺序换行显示在tooltip内
  //       contents: ["Hover Content", "测试"],
  //     };
  //   },
  // });

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("turbo-i18n.helloWorld", () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage("Hello World from Turbo i18n!");
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
