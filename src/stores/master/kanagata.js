import { defineStore } from 'pinia'
import api from '@/axios/interceptor'
import { message } from 'ant-design-vue'

export const useKanagataStore = defineStore('kanagata', {
  state: () => ({
    kanagatas: [],
  }),

  actions: {
    async get() {
      try {
        const response = await api.get('/kanagata')
        if (response.status === 200) {
          this.kanagatas = response.data.data
        }
      } catch (error) {
        console.error('Fetching kanagata data failed', error)
      }
    },

    async add(data) {
      try {
        const response = await api.post('/kanagata', data)
        if (response.status === 200) {
          message.success('Kanagata added successfully')
          this.get()
        }
      } catch (error) {
        message.error(error.response.data.message)
      }
    },

    async update(id, data) {
      try {
        const response = await api.patch(`/kanagata/${id}`, data)
        if (response.status === 200) {
          message.success('Kanagata updated successfully')
          this.get()
        }
      } catch (error) {
        message.error(error.response.data.message)
      }
    },

    async delete(id) {
      try {
        const response = await api.delete(`/kanagata/${id}`)
        if (response.status === 200) {
          message.success('Kanagata deleted successfully')
          this.get()
        }
      } catch (error) {
        message.error(error.response.data.message)
      }
    },
  },

  getters: {
    kanagataOptions: state =>
      state.kanagatas.map(item => ({
        value: item.id_kanagata,
        label: `${item.id_kanagata}`,
      })),
  },
})
