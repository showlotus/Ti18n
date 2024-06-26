# DEV LOG

> 参考资料：
>
> - https://liiked.github.io/VS-Code-Extension-Doc-ZH/#/language-extensions/syntax-highlight-guide?id=%e8%af%ad%e6%b3%95%e6%b3%a8%e5%85%a5
> - https://code.visualstudio.com/api/references/vscode-api#DecorationRenderOptions
> - https://github1s.com/oderwat/vscode-indent-rainbow/blob/HEAD/src/extension.ts
> - https://github1s.com/aaron-bond/better-comments/blob/HEAD/src/extension.ts
> - https://icodex.me/docs/engineer/vscode%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91/vscode%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%912

## 04/25

- 定位 `token` 的位置，需要哪些信息：当前 `token`，对应的语言，对应的配置文件路径。
- 完成 `Parser` 解析完成后，通知 `Store` 更新。`Store` 更新后，再通知 `Render` 更新。

## 04/24

- 插件如果运行失败，可在这里查看错误日志

  ![error-log](./docs-res/error-log.png)

嵌套式是展开式的特殊形式，之前是将第一个属性的值作为语言的值。而现在，需要判断值类型是否为对象，如果是，则继续向下解析，直到值类型为 “语言对象” 时，即 `{ zh: '', en: '' }`。

无论哪种格式，最后都需要转成展开式的风格，然后再进行配置数据的更新。先定义一个空对象 obj 用以记录转换后的属性值。

- 格式一：递归处理配置对象下的每个属性，每处理一个属性，就记录到属性列表 `props` 中
  直到属性值 `value` 为 “语言对象” 时，遍历 “语言对象” 下的所有语言 `lang1`, `lang2`...
  即当前 `token = props.join('.')`
  更新 obj -> `obj[token] = { lang1: value1, lang2: value2, ... }`
  更新 tokens -> `tokens[token] = { lang1: { filePath, fileType }, lang2: { filePath, fileType }, ... }`
  最后，执行一次 `props.pop()`

- 格式二：递归处理配置对象下的每个属性，每处理一个属性，就记录到属性列表 `props` 中
  直到属性值 `value` 为 原始数据类型（`boolean | string | number | null`）时，生成链式属性 `targetProp = props.join('.')`
  如果前缀以语言开头，即 `isLanguage(props[0]) === true`，则获取当前语言 `language = props[0]`
  更新 `obj` -> `obj[props.slice(1).join('.')] = { [language]: value }`
  如果前缀不以语言开头（格式三），获取当前文件名作为语言，即 `language = fileName`
  然后更新 `obj` -> `obj[props.join('.')] = { [language]: value }`
  更新 `tokens` -> `tokens[token] = { lang1: { filePath, fileType }, lang2: { filePath, fileType }, ... }`
  最后，执行一次 `props.pop()`

针对 js 格式配置文件，一般是直接将 `export default` 导出的默认对象作为配置，而可能会有一些特殊场景
想要将导出默认对象下的某个属性作为配置，比如 _vue-i18n_ 风格的配置文件，遂提供一种的特殊语法：
需要在 `export default` 的上一行写一段特殊的注释 `// @Ti18n prop=messages`
指定将导出默认对象下的 `messages` 属性作为配置，同时支持链式操作符，还可以写成 `// @Ti18n prop=i18n.messages`
正则匹配 `"".match(/^\s*@Ti18n\s+prop=([a-zA-Z0-9\.\$_]+)\s*$/i)?.[1]`
匹配不到时，默认为当前导出对象

已知参数有：`token`，语言，源配置文件路径，如何定位 token 在源文件中的位置？根据不同类型的文件，执行不同的定位逻辑？
总结下来，一共就两种格式，【格式二】和【非格式二】，主要通过配置对象下的属性名是否全为语言来判断
如果是，则为【格式二】，否则为【非格式二】

例如，`token` 为 `T.aaa.bbb.ccc`，打开源文件，解析 _AST_
如果是【格式二】，先找到对应的语言下的配置对象 `languageObj`，
如果是【非格式二】，`languageObj` 即为配置对象

1.  首先在配置对象中查找属性名为 `T.aaa.bbb.ccc` 的属性节点
    - 如果有，则定位到节点位置，返回节点属性值的位置 <---
    - 如果无，则进行第 2 步
2.  查找属性名为 `T.aaa.bbb` 的属性节点。
    - 如果有，则定位到节点位置，再在当前节点的后代节点中查找属性名为 `ccc` 的属性
      - 如果有，则定位到节点位置，返回节点属性值的位置 <---
      - 如果无，则进行第 3 步
    - 如果无，则进行第 3 步
3.  查找属性名为 `T.aaa` 的属性节点。
    - 如果有，则定位到节点位置，再在当前节点的后代节点中查找属性名为 `bbb.ccc` 的属性
      - 如果有，则定位到节点位置，返回节点属性值的位置 <---
      - 如果无，则在当前节点的后代节点中查找属性名为 `bbb` 的属性
        - 如果有，则定位到节点位置。再在后代节点中查找属性名为 `ccc` 的属性节点
          - 如果有，则定位到节点位置，返回节点属性值的位置 <---
          - 如果无，则进行第 4 步
        - 如果无，则进行第 4 步
4.  查找属性名为 `T` 的属性节点。
    - 如果有，则定位到节点位置，再在当前节点的后代节点中查找属性名为 `aaa` 的属性。
      - 如果有，则定位到节点位置。再在后代节点中查找属性名为 `bbb` 的属性节点。
        - 如果有，则定位到节点位置。再在后代节点中查找属性名为 `ccc` 的属性节点。
          - 如果有，则定位到节点位置，返回节点属性值的位置 <---
          - 如果无，则进行第 5 步
        - 如果无，则进行第 5 步
      - 如果无，则进行第 5 步
    - 如果无，则进行第 5 步
5.  查找失败，返回 -1
