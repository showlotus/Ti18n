import { PubSub } from './PubSub'

export class Render extends PubSub {
  constructor() {
    super()
  }

  update(...args: any[]) {
    console.log('Render ~ ~ ~', args)
  }
}
