import { TokenValue, TokenParams } from '../types'

class SourceData {
  /**
   * 配置文件中的数据
   */
  private data: Record<string, Record<string, string>>
  /**
   * 每个关键词所在的配置文件
   */
  private tokens: Map<string, Record<string, TokenValue>>

  constructor() {
    this.data = {}
    this.tokens = new Map()
  }

  /**
   * 获取 JSON
   */
  getData() {
    return this.data
  }

  /**
   * 更新 JSON
   */
  updateData(data: Record<string, Record<string, string>>) {
    Object.keys(data).forEach(token => {
      const val = data[token]
      if (!this.data[token]) {
        this.data[token] = {}
      }
      Object.keys(val).forEach(language => {
        this.data[token][language] = val[language]
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
   * 更新 token
   */
  updateToken(token: string, params: TokenParams) {
    const { language, filePath, fileType } = params
    if (!this.tokens.has(token)) {
      this.tokens.set(token, {})
    }
    this.tokens.get(token)![language] = { filePath, fileType }
  }
}

export const source = new SourceData()
