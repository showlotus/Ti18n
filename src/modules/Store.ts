import { PubSub } from './PubSub'

export interface StoreData {
  [K: string]: StoreToken
}

export interface StoreToken {
  [K: string]: StoreTokenValue
}

export interface StoreTokenValue {
  value: string | number | boolean | null
  url: string
}

export class Store extends PubSub {
  static data: StoreData
  constructor() {
    super()
    Store.data = {}
  }

  update(data: StoreData | StoreData[]) {
    if (Array.isArray(data)) {
      data.forEach(val => {
        Object.assign(Store.data, val)
      })
    } else {
      Object.assign(Store.data, data)
    }

    this.notify(Store.data)
  }
}
