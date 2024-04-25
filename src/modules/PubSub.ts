export class PubSub {
  subs: PubSub[]
  constructor() {
    this.subs = []
  }

  addSub(sub: PubSub) {
    this.subs.push(sub)
  }

  notify(...args: any[]) {
    this.subs.forEach(sub => {
      sub.update(...args)
    })
  }

  update(...args: any[]) {}
}
