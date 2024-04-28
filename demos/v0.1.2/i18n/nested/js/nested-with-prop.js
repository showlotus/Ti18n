// @Ti18n prop=prop1.prop2.messages
export default {
  prop1: {
    prop2: {
      messages: {
        Nested: {
          'JS.WithProp': {
            message: {
              one: {
                zh_CN: 'JS 默认导出（嵌套式）使用 Prop 消息 1',
                en_US: 'JS Export Default Nested With Prop Message One',
              },
            },
            'message.two': {
              zh_CN: 'JS 默认导出（嵌套式）使用 Prop 消息 2',
              en_US: 'JS Export Default Nested With Prop Message Two',
            },
          },
        },
        'Nested.JS.WithProp.message.three': {
          zh_CN: 'JS 默认导出（嵌套式）使用 Prop 消息 3',
          en_US: 'JS Export Default Nested With Prop Message Three',
        },
      },
    },
  },
}
