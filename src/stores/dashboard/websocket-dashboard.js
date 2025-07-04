import { message } from 'ant-design-vue'
import { defineStore } from 'pinia'

export const useWsDashboardStore = defineStore('ws_dashboard', {
  state: () => ({
    socket: null,
    data: [],
    isConnected: false,
    shot: null,
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
        message.success('Success connected to data stream for dashboard')
        console.log('WebSocket connected.')
      }

      this.socket.onmessage = event => {
        const message = JSON.parse(event.data)
        this.data = message
        this.shot = this.formatShotData(message)
      }

      this.socket.onclose = () => {
        this.isConnected = false
        this.reset()
        console.log('Websocket closed')
      }

      this.socket.onerror = () => {
        console.log('Websocket Error')
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

    formatShotData(data) {
      const mapName = {
        punch_cutting_shot: 'Punch Cutting',
        die_cutting_shot: 'Die Cutting',
        punch_bending_shot: 'Punch Bending',
        die_bending_shot: 'Die Bending',
        punch_bending_adj_shot: 'Punch Bending Adj',
        die_bending_adj_shot: 'Die Bending Adj',
        menuchi_shot: 'Menuchi',
        tsubushi_shot: 'Tsubushi',
        jig_cutting_shot: 'Jig Cutting',
        machine_shot: 'Machine',
        kanagata_shot: 'Kanagata',
      }

      const result = {}

      for (const line in data) {
        const lineData = data[line].shot
        const formattedLine = []

        for (const key in mapName) {
          const name = mapName[key]
          const value = lineData?.[key] ?? 0
          const alarm1 = lineData?.[`${key}_alarm1`] ?? 0
          const alarm2 = lineData?.[`${key}_alarm2`] ?? 0
          const percentage =
            alarm2 > 0 ? +((value / alarm2) * 100).toFixed(2) : 0

          formattedLine.push([name, value, alarm1, alarm2, percentage])
        }

        result[line.replace(/_/g, ' ').toUpperCase()] = formattedLine
      }

      return result
    },
  },

  getters: {},
})
