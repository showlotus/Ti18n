// @Ti18n prop=prop1.prop2.messages
export default {
  prop1: {
    prop2: {
      messages: {
        Nested: {
          'TS.WithProp': {
            message: {
              one: {
                zh_CN: 'TS 默认导出（嵌套式）使用 Prop 消息 1',
                en_US: 'TS Export Default Nested With Prop Message One',
              },
            },
            'message.two': {
              zh_CN: 'TS 默认导出（嵌套式）使用 Prop 消息 2',
              en_US: 'TS Export Default Nested With Prop Message Two',
            },
          },
        },
        'Nested.TS.WithProp.message.three': {
          zh_CN: 'TS 默认导出（嵌套式）使用 Prop 消息 3',
          en_US: 'TS Export Default Nested With Prop Message Three',
        },
      },
    },
  },
}
