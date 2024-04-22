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

- [ ] 支持 `JS` 格式的配置文件

  增加一个 _AST_ 工具，解析 `JS` 格式的文件就好了
