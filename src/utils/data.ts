import { TokenValue, TokenParams } from '../types'

class OriginData {
  /**
   * 配置文件中的 JSON 数据
   */
  private json: Record<string, Record<string, string>>
  /**
   * 每个关键词对应的 JSON 文件
   */
  private tokens: Map<string, Record<string, TokenValue>>

  constructor() {
    this.json = {}
    this.tokens = new Map()
  }

  /**
   * 获取 JSON
   */
  getJson() {
    return this.json
  }

  /**
   * 更新 JSON
   */
  updateJson(data: Record<string, Record<string, string>>) {
    Object.keys(data).forEach(token => {
      const val = data[token]
      if (!this.json[token]) {
        this.json[token] = {}
      }
      Object.keys(val).forEach(language => {
        this.json[token][language] = val[language]
      })
    })
  }

  /**
   * 获取 tokens
   */
  getTokens() {
    return this.tokens
  }

  /**
   * 更新 tokens
   */
  updateToken(token: string, params: TokenParams) {
    const { language, filePath, fileType } = params
    if (!this.tokens.has(token)) {
      this.tokens.set(token, {})
    }
    this.tokens.get(token)![language] = { filePath, fileType }
  }
}

export const source = new OriginData()
