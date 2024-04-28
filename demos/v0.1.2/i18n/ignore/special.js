const Spread = {}
const Computed = ''

// @Ti18n prop=messages
export default {
  messages: {
    zh_CN: {
      JS: {
        Special: {
          ObjectMethod() {},
          Null: null,
          Undefined: null,
          ...Spread,
          Computed,
          CloneComputed: Computed,
          ...{},
          ArrowFunction: () => {},
          Symbol: Symbol(),
        },
      },
    },
    en_US: {},
  },
}
