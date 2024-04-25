import { PubSub } from './PubSub'

export interface StoreData {
  [K: string]: {
    [T: string]: {
      value: string | number | boolean | null
      url: string
    }
  }
}

export class Store extends PubSub {
  data: Record<string, Record<string, string>>
  constructor() {
    super()
    this.data = {}
  }

  update(data: StoreData | StoreData[]) {
    if (Array.isArray(data)) {
      data.forEach(val => {
        Object.assign(this.data, val)
      })
    } else {
      Object.assign(this.data, data)
    }

    this.notify(this.data)
  }
}
