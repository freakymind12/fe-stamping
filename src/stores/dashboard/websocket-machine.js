import { message } from 'ant-design-vue'
import { defineStore } from 'pinia'

export const useWebsocketStore = defineStore('websocket', {
  state: () => ({
    socket: null,
    data: [],
    isConnected: false,
  }),
  actions: {
    connect(url) {
      if (this.socket) {
        console.warn('Socket is already connected')
        return
      }
      this.socket = new WebSocket(url)

      this.socket.onopen = () => {
        this.isConnected = true
        message.success('Success connected to data stream for machine status')
        console.log('WebSocket connected.')
      }

      this.socket.onmessage = event => {
        const message = JSON.parse(event.data)
        this.data = message
      }

      this.socket.onclose = () => {
        this.isConnected = false
        this.reset()
        console.log('Websocket closed')
      }
    },

    disconnected() {
      if (this.socket) {
        this.socket.close()
        this.reset()
        console.log('WebSocket disconnected.')
      }
    },

    reset() {
      this.socket = null
      this.data = []
    },
  },
})
