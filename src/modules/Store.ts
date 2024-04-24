export class Store {
  data: Record<string, Record<string, string>>
  tokens: Record<string, Record<string, string>>
  constructor() {
    this.data = {}
    this.tokens = {}
  }

  getData() {
    return this.data
  }
}
