import { defineStore } from 'pinia'
import api from '@/axios/interceptor'
import dayjs from 'dayjs'

export const useLogMaintenanceStore = defineStore('log-maintenance', {
  state: () => ({
    data: JSON.parse(localStorage.getItem('kanagata-last-maintenance')) || [],
    history: [],
  }),
  actions: {
    async getLastMaintenance(id_machine) {
      try {
        const response = await api.get('/maintenance/latest', {
          params: { id_machine },
        })

        if (response.status === 200) {
          const newData = response.data.data
          const updatedData = [...this.data] // Copy existing data

          // Loop data baru, update atau tambahkan ke dalam store
          newData.forEach(newItem => {
            const existingIndex = updatedData.findIndex(
              item =>
                item.id_machine === newItem.id_machine &&
                item.part === newItem.part,
            )

            if (existingIndex !== -1) {
              // Jika sudah ada, perbarui data
              updatedData[existingIndex] = newItem
            } else {
              // Jika belum ada, tambahkan data baru
              updatedData.push(newItem)
            }
          })

          // Simpan ke state dan localStorage
          this.data = updatedData
          localStorage.setItem(
            'kanagata-last-maintenance',
            JSON.stringify(this.data),
          )
        }
      } catch (error) {
        console.error('Error fetching latest maintenance:', error)
      }
    },

    async getHistoryMaintenance(filters = {}) {
      try {
        const queryParams = new URLSearchParams(
          Object.entries(filters).reduce((acc, [key, value]) => {
            if (value) acc.append(key, value)
            return acc
          }, new URLSearchParams()),
        )

        const response = await api.get(`/maintenance/history?${queryParams}`)
        if (response.status === 200) {
          this.history = response.data.data
          console.log(this.history)
        }
      } catch (error) {
        console.error(`Error fetching history maintenance: ${error}`)
      }
    },
  },

  getters: {
    // Getter hanya mengembalikan created_at berdasarkan id_machine dan part
    getLastMaintenanceDate: state => (id_machine, part) => {
      const maintenance = state.data.find(
        item => item.id_machine === id_machine && item.part === part,
      )
      return maintenance
        ? dayjs(maintenance.created_at).format('YYYY-MM-DD HH:mm:ss')
        : null
    },

    chartSeries: (state) => {
      const sorted = [...state.history].sort((a, b) => dayjs(a.created_at).isAfter(dayjs(b.created_at)) ? 1 : -1)
      return {
        shot: sorted.map(item => item.shot),
        date: sorted.map(item => dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss'))
      }
    }
  },
})
