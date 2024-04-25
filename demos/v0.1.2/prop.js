const zh = {}
const zh1 = 'xx'

// @Ti18n prop=messages.zh_CN
export default {
  messages: {
    zh_CN: {
      'MT.name': '姓名',
      'MT.age': '年龄',
      'MT.gender': '性别',
      a() {},
      b: null,
      c: undefined,
      ...zh,
      zh1,
      zh2: zh1,
      ...{},
      zh3: Symbol('11'),
      zh4: new Date(),
      zh5: new RegExp(),
      zh6: new String(),
      zh7: new Number(),
      zh8: new Boolean(),
      zh9: () => {},
    },
    en_US: {
      'MT.name': 'Name',
      'MT.age': 'Age',
      'MT.gender': 'Gender',
    },
  },
}
