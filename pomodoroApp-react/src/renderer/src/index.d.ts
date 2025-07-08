export {}

declare global {
  interface Window {
    electronAPI: {
      sendPing: (message: string) => void
    }
  }
}
