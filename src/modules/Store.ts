import PubSub from './PubSub'

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

export default class Store extends PubSub {
  static data: StoreData
  constructor() {
    super()
    Store.data = {}
  }

  update(data: StoreData | StoreData[]) {
    if (Array.isArray(data)) {
      data.forEach(val => {
        this.assign(val)
      })
    } else {
      this.assign(data)
    }

    this.notify(Store.data)
  }

  assign(data: StoreData) {
    Object.keys(data).forEach(token => {
      if (!Store.data[token]) {
        Store.data[token] = data[token]
      } else {
        Object.assign(Store.data[token], data[token])
      }
    })
  }
}
