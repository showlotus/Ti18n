import { PubSub } from './PubSub'
import { StoreData } from './Store'

export class Render extends PubSub {
  data: StoreData
  constructor() {
    super()
    this.data = {}
  }

  update(data: StoreData) {
    // 每次更新后，在内部缓存 data
    if (!data) {
      data = this.data
    } else {
      this.data = data
    }
    console.log('Render ~ ~ ~', data)
  }
}
