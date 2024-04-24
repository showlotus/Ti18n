import * as babelParser from '@babel/parser'
import { isLanguageProp } from '.'

enum ConfigType {}

/**
 * 判断当前配置文件格式是否是：`{ zh_CN: { ... }, en_US: { ... } }` 格式
 */
function isUnderLanguage(data: Record<string, any>) {
  const keys = Object.keys(data)
  return keys.every(key => isLanguageProp(key))
}
// 解析 json 配置文件
export function parseJsonConfig() {}
// 解析 js 配置文件
export function parseJsConfig() {}
// 解析 ts 配置文件

// 定位 token 在 json 配置文件中的位置
export function locationJsonConfigWithModeOne() {}

const parser = {}
export default parser
