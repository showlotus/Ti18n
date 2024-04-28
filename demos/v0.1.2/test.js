// 展开式
const expanded = [
  // json
  'Expanded.JSON.LanguageAtOuter.message.one',
  'Expanded.JSON.LanguageAtOuter.message.two',
  'Expanded.JSON.LanguageAtInner.message.one',
  'Expanded.JSON.LanguageAtInner.message.two',
  'Expanded.JSON.FileNameIsLanguage.message.one',
  'Expanded.JSON.FileNameIsLanguage.message.two',

  // js language at inner
  'Expanded.JS.message.one',
  'Expanded.JS.message.two',

  // js language at outer
  'Expanded.JS.LanguageAtOuter.message.one',
  'Expanded.JS.LanguageAtOuter.message.two',

  // js with prop
  'Expanded.JS.WithProp.message.one',
  'Expanded.JS.WithProp.message.two',

  // js fileName is language
  'Expanded.JS.FileNameIsLanguage.message.one',
  'Expanded.JS.FileNameIsLanguage.message.two',

  // js fileName is language with prop
  'Expanded.JS.FileNameIsLanguageWithProp.message.one',
  'Expanded.JS.FileNameIsLanguageWithProp.message.two',

  // ts language at inner
  'Expanded.TS.message.one',
  'Expanded.TS.message.two',

  // ts language at outer
  'Expanded.TS.LanguageAtOuter.message.one',
  'Expanded.TS.LanguageAtOuter.message.two',

  // ts with prop
  'Expanded.TS.WithProp.message.one',
  'Expanded.TS.WithProp.message.two',

  // ts fileName is language
  'Expanded.TS.FileNameIsLanguage.message.one',
  'Expanded.TS.FileNameIsLanguage.message.two',

  // ts fileName is language with prop
  'Expanded.TS.FileNameIsLanguageWithProp.message.one',
  'Expanded.TS.FileNameIsLanguageWithProp.message.two',
]

// 嵌套式
const nested = [
  // json
  'Nested.JSON.LanguageAtInner.message.one',
  'Nested.JSON.LanguageAtInner.message.two',
  'Nested.JSON.LanguageAtOuter.message.one',
  'Nested.JSON.LanguageAtOuter.message.two',
  'Nested.JSON.FileNameIsLanguage.message.one',
  'Nested.JSON.FileNameIsLanguage.message.two',

  // js
  'Nested.JS.message.one',
  'Nested.JS.message.two',
  'Nested.JS.message.three',

  // js language at outer
  'Nested.JS.LanguageAtOuter.message.one',
  'Nested.JS.LanguageAtOuter.message.two',

  // js with prop
  'Nested.JS.WithProp.message.one',
  'Nested.JS.WithProp.message.two',
  'Nested.JS.WithProp.message.three',

  // js fileName is language
  'Nested.JS.FileNameIsLanguage.message.one',
  'Nested.JS.FileNameIsLanguage.message.two',

  // js fileName is language with prop
  'Nested.JS.FileNameIsLanguageWithProp.message.one',
  'Nested.JS.FileNameIsLanguageWithProp.message.two',

  // ts
  'Nested.TS.message.one',
  'Nested.TS.message.two',
  'Nested.TS.message.three',

  // ts language at outer
  'Nested.TS.LanguageAtOuter.message.one',
  'Nested.TS.LanguageAtOuter.message.two',

  // ts with prop
  'Nested.TS.WithProp.message.one',
  'Nested.TS.WithProp.message.two',
  'Nested.TS.WithProp.message.three',

  // ts fileName is language
  'Nested.TS.FileNameIsLanguage.message.one',
  'Nested.TS.FileNameIsLanguage.message.two',

  // ts fileName is language with prop
  'Nested.TS.FileNameIsLanguageWithProp.message.one',
  'Nested.TS.FileNameIsLanguageWithProp.message.two',
]

//! 不应该生效
const ignore = [
  'JS.NoExportDefault.message',
  'JS.Special.ObjectMethod',
  'JS.Special.Null',
  'JS.Special.Undefined',
  'JS.Special.Spread',
  'JS.Special.Computed',
  'JS.Special.CloneComputed',
  'JS.Special.ArrowFunction',
  'JS.Special.Symbol',

  'TS.NoExportDefault.message',
  'TS.Special.ObjectMethod',
  'TS.Special.Null',
  'TS.Special.Undefined',
  'TS.Special.Spread',
  'TS.Special.Computed',
  'TS.Special.CloneComputed',
  'TS.Special.ArrowFunction',
  'TS.Special.Symbol',
]
