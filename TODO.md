# TODO

## v0.1.2

- [ ] 支持嵌套写法

  - 格式一

    - 展开式

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

    - 嵌套式

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

  - 格式二

    - 展开式

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

    - 嵌套式

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

  - 格式三

    - 展开式

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

    - 嵌套式

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

- [ ] 支持 `vue-i18n` 格式的配置文件

  需要在 `export default` 的上方添加注释 `// @Ti18n data=messages`

  ```js
  // @Ti18n prop=messages
  export default {
    messages: {
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

  更深层的内部属性

  ```js
  // @Ti18n prop=i18n.messages
  export default {
    i18n: {
      messages: {
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
    },
  }
  ```

- [ ] `json` 中有其他项

  ```json
  {
    "$meta": {
      "locales": ["zh-CN", "en-US"]
    }
  }
  ```

- [ ] 支持 `JS` 格式的配置文件

  增加一个 _AST_ 工具，解析 `JS` 格式的文件就好了
