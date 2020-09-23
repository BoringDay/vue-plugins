// import { isObject } from '../lib/utils'

export class HashHistory {
  constructor (router, options) {
    this.router = router
    this.options = options
    this.history = []
  }

  async push (location, onComplete, onAbort) {
    try {
      location = `#${location}`
      this.history.push(location)
      window.history.pushState({}, '', location)
      onComplete && onComplete()
    } catch (e) {
      onAbort && onAbort()
    }
  }

  replace (location, onComplete, onAbort) {
    try {
      location = `#${location}`
      window.history.replaceState({}, '', location)
      this.history[this.history.length - 1] = location
      this.router.match(location)
      onComplete && onComplete()
    } catch (e) {
      onAbort && onAbort()
    }
  }

  go (n) {
    window.history.go(n)
  }
}
