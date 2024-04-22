/**
 * 解析当前配置文件，
 */

/**
 * 嵌套式是展开式的特殊形式，之前是将第一个属性的值作为语言的值
 * 而现在，需要判断值类型是否为对象，如果是，则继续向下解析
 * 直到值类型为 “语言对象” 时，即 { zh: '', en: '' }
 *
 * 无论哪种格式，最后都需要转成展开式的风格，然后再进行配置数据的更新
 * 先定义一个空对象 obj 用以记录转换后的属性值
 * 格式一：递归处理配置对象下的每个属性，每处理一个属性，就记录到属性列表 props 中
 * 直到属性值 value 为 “语言对象” 时，遍历 “语言对象” 下的所有语言 lang1, lang2...
 * 即当前 token = props.join('.')
 * 更新 obj -> obj[token] = { lang1: value1, lang2: value2, ... }
 * 更新 tokens -> tokens[token] = { lang1: { filePath, fileType }, lang2: { filePath, fileType }, ... }
 * 最后，执行一次 props.pop()
 *
 * 格式二：递归处理配置对象下的每个属性，每处理一个属性，就记录到属性列表 props 中
 * 直到属性值 value 为 string 类型时，生成链式属性 targetProp = props.join('.')
 * 如果前缀以语言开头，即 isLanguage(props[0]) === true，则获取当前语言 language = props[0]
 * 更新 obj -> obj[props.slice(1).join('.')] = { [language]: value }
 * 如果前缀不以语言开头（格式三），获取当前文件名作为语言，即 language = fileName
 * 然后更新 obj -> obj -> obj[props.join('.')] = { [language]: value }
 * 更新 tokens -> tokens[token] = { lang1: { filePath, fileType }, lang2: { filePath, fileType }, ... }
 * 最后，执行一次 props.pop()
 *
 * 如何定位 token 在源文件中的位置？根据不同类型的文件，执行不同的定位逻辑？
 *
 */

enum ConfigType {}

// 判断是否是模式一
export function isModeOne() {}
// 解析 json 配置文件
export function parseJsonConfigWithModeOne() {}
// 定位 token 在 json 配置文件中的位置
export function locationJsonConfigWithModeOne() {}

const parser = {}
export default parser
