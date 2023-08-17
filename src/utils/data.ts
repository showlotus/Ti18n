class OriginData {
  /**
   * 配置文件中的 JSON 数据
   */
  private json: Record<string, any>;
  /**
   * 每个关键词对应的 JSON 文件
   */
  private tokens: Map<string, any>;

  constructor() {
    this.json = {};
    this.tokens = new Map();
  }

  /**
   * 获取 JSON
   */
  getJson() {
    return this.json;
  }

  /**
   * 更新 JSON
   */
  updateJson(data: any) {
    Object.assign(this.json, data);
  }

  /**
   * 获取 tokens
   */
  getTokens() {
    return this.tokens;
  }

  /**
   * 更新 tokens
   */
  updateTokens(content: string, file: string) {
    const obj = JSON.parse(content);
    Object.keys(obj).forEach(key => {
      this.tokens.set(key, { file });
    });
  }
}

export const source = new OriginData();
