export class Util<T> {
  constructor(private ref: T) {}

  setTimer(callback: (val: number) => void, startTime: number): NodeJS.Timeout {
    let total = startTime

    return setInterval(() => {
      if (total <= 0) return
      total -= 1
      callback(total)
    }, 1000)
  }
  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }
}
