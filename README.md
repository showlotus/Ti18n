# Ti18n

一个国际化字段提示插件，对国际化配置文件中提供的国际化字段进行特殊标注，鼠标移入时，弹出悬浮框，可查看对应的国际化语言。点击悬浮框中的关键词，可跳转至关键词所在文件及位置。

![demo](https://github.com/showlotus/Ti18n/raw/master/docs-res/demo.gif)

## 配置文件格式

支持两种不同风格：[展开式](#展开式)、[嵌套式](#嵌套式)，三种不同格式（`.json`、`.js`、`.ts`）的国际化配置文件。其中 `.js` 和 `.ts` 格式的配置文件就是使用 `export default` 导出配置的对象。特殊的，如需要将导出对象下的某个属性作为配置提供给插件解析，则可以在 `export default` 语句上方添加注释：

```js
// @Ti18n prop=...
```

比如，配置文件如下：

```js
export default {
  message: {
    zh_CN: {
      'T.name': '姓名',
      'T.age': '年龄',
      'T.gender': '性别',
    },
    en_US: {
      'T.name': 'Name',
      'T.age': 'Age',
      'T.gender': 'Gender',
    },
  },
}
```

现在想将 `message` 属性对应的值作为配置提供给插件，则可以添加注释：

```js
// @Ti18n prop=message
export default {
  message: {
    /* ... */
  },
}
```

如果属性层级很深，还支持使用链式操作符。

```js
// @Ti18n prop=a.b.c
export default {
  a: {
    b: {
      c: {
        /* ... */
      },
    },
  },
}
```

### 展开式

- 各语言都配置在目标字段下，以 `json` 为例。

  ```json
  {
    "T.name": {
      "zh_CN": "姓名",
      "en_US": "Name"
    },
    "T.age": {
      "zh_CN": "年龄",
      "en_US": "Age"
    },
    "T.gender": {
      "zh_CN": "性别",
      "en_US": "Gender"
    }
  }
  ```

- 各语言都配置在对应的语言字段下，以 `json` 为例。

  ```json
  {
    "zh_CN": {
      "T.name": "姓名",
      "T.age": "年龄",
      "T.gender": "性别"
    },
    "en_US": {
      "T.name": "Name",
      "T.age": "Age",
      "T.gender": "Gender"
    }
  }
  ```

- 各语言分别配置在不同的文件中，以 `json` 为例。

  - `zh_CN.json`

    ```json
    {
      "T.name": "姓名",
      "T.age": "年龄",
      "T.gender": "性别"
    }
    ```

  - `en_US.json`

    ```json
    {
      "T.name": "Name",
      "T.age": "Age",
      "T.gender": "Gender"
    }
    ```

### 嵌套式

- 各语言都配置在目标字段下，以 `json` 为例。

  ```json
  {
    "T": {
      "name": {
        "zh_CN": "姓名",
        "en_US": "Name"
      },
      "age": {
        "zh_CN": "年龄",
        "en_US": "Age"
      },
      "gender": {
        "zh_CN": "性别",
        "en_US": "Gender"
      }
    }
  }
  ```

- 各语言都配置在对应的语言字段下，以 `json` 为例。

  ```json
  {
    "zh_CN": {
      "T": {
        "name": "姓名",
        "age": "年龄",
        "gender": "性别"
      }
    },
    "en_US": {
      "T": {
        "name": "Name",
        "age": "Age",
        "gender": "Gender"
      }
    }
  }
  ```

- 各语言分别配置在不同的文件中，以 `json` 为例。

  - `zh_CN.json`

    ```json
    {
      "T": {
        "name": "姓名",
        "age": "年龄",
        "gender": "性别"
      }
    }
    ```

  - `en_US.json`

    ```json
    {
      "T": {
        "name": "Name",
        "age": "Age",
        "gender": "Gender"
      }
    }
    ```

## 配置项

默认配置：

```json
{
  "ti18n.enable": true,
  "ti18n.configDirs": ["i18n", "locale"],
  "ti18n.extnames": [".js", ".jsx", ".ts", ".tsx", ".vue"],
  "ti18n.exclude": [],
  "ti18n.shortcutLanguages": [],
  "ti18n.shortcutLanguageMaxLength": 10
}
```

### enable

Type: `boolean`

Default: `true`

启用或禁用插件。

### configDirs

Type: `Array<string>`

Default: `["i18n", "locale"]`

存放国际化配置的文件夹名，会识别当前文件夹下的所有 `.json`、`.js`、`.ts` 格式的文件。

### customLanguages

Type: `Array<string>`

Default: `[]`

自定义的语言列表。针对配置文件类型为 **各语言都配置在对应的语言字段下** 时，会先根据插件内部的国际化语言列表：`zh_CN, zh_TW, zh_HK, en_HK, en_US, en_GB, en_WW, en_CA, en_AU, en_IE, en_FI, fi_FI, en_DK, da_DK, en_IL, he_IL, en_ZA, en_IN, en_NO, en_SG, en_NZ, en_ID, en_PH, en_TH, en_MY, en_XA, ko_KR, ja_JP, nl_NL, nl_BE, pt_PT, pt_BR, fr_FR, fr_LU, fr_CH, fr_BE, fr_CA, es_LA, es_ES, es_AR, es_US, es_MX, es_CO, es_PR, de_DE, de_AT, de_CH, ru_RU, it_IT, el_GR, no_NO, hu_HU, tr_TR, cs_CZ, sl_SL, pl_PL, sv_SE, es_CL` 进行处理，如果要使用的语言不在上述列表中，请自行添加。

比如，需要使用新语言 `zh_HENAN`，配置文件为：

```json
{
  "zh_CN": {
    "T.comfortable": "舒服",
    "T.good": "好",
    "T.deliberately": "故意的"
  },
  "zh_HENAN": {
    "T.comfortable": "展劲",
    "T.good": "俏巴",
    "T.deliberately": "巴巴滴"
  }
}
```

则需要在 `.vscode/settings.json` 中配置：

```json
{
  "ti18n.customLanguages": ["zh_HENAN"]
}
```

### extnames

Type: `Array<string>`

Default: `[".js", ".jsx", ".ts", ".tsx", ".vue"]`

需要对哪些格式的文件生效。

### exclude

Type: `Array<string>`

Default: `[]`

忽略的文件夹或文件。

### shortcutLanguages

Type: `Array<string>`

Default: `[]`

可展示的快捷语言类型，默认不展示。如果想更直观地看到当前国际化字段对应的值，可以设置该属性。

默认展示效果如下：

![unset shortcutLanguages](https://github.com/showlotus/Ti18n/raw/master/docs-res/unset-shortcut-languages.png)

设置如下配置：

```json
{
  "ti18n.shortcutLanguages": ["zh_CN", "en_US"]
}
```

展示效果如下：

![set shortcutLanguages](https://github.com/showlotus/Ti18n/raw/master/docs-res/set-shortcut-languages.png)

点击后，可以快速跳转到对应配置文件所在的位置。

### shortcutLanguageMaxLength

Type: `number`

Default: `10`

Minimum value: `3`

快捷语言提示的最大文本长度。
