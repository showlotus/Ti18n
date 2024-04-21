# Turbo-i18n

> 参考资料：
>
> - https://liiked.github.io/VS-Code-Extension-Doc-ZH/#/language-extensions/syntax-highlight-guide?id=%e8%af%ad%e6%b3%95%e6%b3%a8%e5%85%a5
> - https://code.visualstudio.com/api/references/vscode-api#DecorationRenderOptions
> - https://github1s.com/oderwat/vscode-indent-rainbow/blob/HEAD/src/extension.ts
> - https://github1s.com/aaron-bond/better-comments/blob/HEAD/src/extension.ts
> - https://icodex.me/docs/engineer/vscode%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91/vscode%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%912

## Debug

插件如果运行失败，可在这里查看错误日志

![error-log](./res/error-log.png)

## Todo

- 允许用户自定义配置，可提供哪些配置项给用户
- 默认打开哪些文件时激活插件
- 自动激活优化，禁用组件时，移除注册的事件
- 下划线颜色优化，能否与当前代码颜色相同

## Record

- 配置文件更改后，记得重新加载窗口

## 图标设计

- Turboui
  - 字体：Garamond
  - 字号：27px
- i18n
  - 字体：Georgia
  - 字号：12px

## 支持多种格式的配置文件

目前只支持 `.json` 格式的配置文件，其他格式的待定...

- [x] `**/*.json`

  ```json
  {
    "x.xx.xxx": {
      "zh_CN": "O(∩_∩)O",
      "en_US": "(●'◡'●)"
    }
  }
  ```

- [x] `**/*/zh_CN.json` 和 `**/*/en_US.json`

  `**/*/zh_CN.json`

  ```json
  {
    "x.xx.xxx": "O(∩_∩)O"
  }
  ```

  `**/*/en_US.json`

  ```json
  {
    "x.xx.xxx": "(●'◡'●)"
  }
  ```

- [x] `**/*.json`

  ```json
  {
    "zh_CN": {
      "x.xx.xxx": "O(∩_∩)O"
    },
    "en_US": {
      "x.xx.xxx": "(●'◡'●)"
    }
  }
  ```

- [ ] `**/xx/*.js`

  ```js
  export default {
    zh_CN: {
      'x.xx.xxx': 'O(∩_∩)O',
    },
    en_US: {
      'x.xx.xxx': "(●'◡'●)",
    },
  }
  ```

- [ ] `**/*/zh_CN/index.js` 或 `**/*/en_US/index.js`

  ```js
  export default {
    'x.xx.xxx': 'O(∩_∩)O',
    'xxx.xx.x': "(●'◡'●)",
  }
  ```

- [ ] `**/*.vue` use `vue-i18n`

  ```js
  export default {
    i18n: {
      messages: {
        zh_CN: {
          'x.xx.xxx': 'O(∩_∩)O',
        },
        en_US: {
          'x.xx.xxx': "(●'◡'●)",
        },
      },
    },
  }
  ```

### 解析策略
