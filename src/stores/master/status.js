import { defineStore } from 'pinia'
import api from '@/axios/interceptor'

export const useStatusLineStore = defineStore('status_line', {
  state: () => ({
    status_lines: [],
  }),
  actions: {
    async get() {
      try {
        const response = await api.get('/status')
        if (response.status === 200) {
          this.status_lines = response.data.data
        }
      } catch (error) {
        console.error('Fetching status line data failed', error)
      }
    },
  },
  getters: {
    findStatusById: state => id_status => {
      return state.status_lines.find(status => status.id_status === id_status)
    },
  },
})
