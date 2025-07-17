import { defineStore } from "pinia";
import api from "@/axios/interceptor";
import { message } from "ant-design-vue";

export const useKanagataResetCodeStore = defineStore('kanagata-reset-code', {
  state: () => ({
    data: [],
  }),

  actions: {
    async get() {
      try {
        const response = await api.get('/kanagata/reset-code')
        if (response.status === 200) {
          this.data = response.data.data
        }
      } catch (error) {
        console.error('Fetching kanagata reset code data failed', error)
      }
    },

    async add(data) {
      try {
        const response = await api.post('/kanagata/reset-code', data)
        if (response.status === 200) {
          message.success('Kanagata reset code added successfully')
          this.get()
        }
      } catch (error) {
        message.error(error.response.data.message)
      }
    },

    async update(id, data) {
      try {
        const response = await api.patch(`/kanagata/reset-code/${id}`, data)
        if (response.status === 200) {
          message.success('Kanagata reset code updated successfully')
          this.get()
        }
      } catch (error) {
        message.error(error.response.data.message)
      }
    },

    async delete(id) {
      try {
        const response = await api.delete(`/kanagata/reset-code/${id}`)
        if (response.status === 200) {
          message.success('Kanagata reset code deleted successfully')
          this.get()
        }
      } catch (error) {
        message.error(error.response.data.message)
      }
    },
  },

  getters: {
    kanagataPartOptions: state =>
      state.data.map(item => ({
        value: item.name,
        label: item.name
          .replace(/_/g, ' ')                     // ganti _ jadi spasi
          .replace(/\b\w/g, (char) => char.toUpperCase()) // kapital tiap awal kata
      })),
  }
})
