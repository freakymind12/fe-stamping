import { defineStore } from 'pinia'
import api from '@/axios/interceptor'
import { message } from 'ant-design-vue'

export const usePcaStore = defineStore('pca', {
  state: () => ({
    pcas: [],
  }),
  actions: {
    async get() {
      try {
        const response = await api.get('/pca')
        if (response.status === 200) {
          this.pcas = response.data.data
        }
      } catch (error) {
        console.error('Fetching pca data failed', error)
      }
    },

    async add(data) {
      try {
        const response = await api.post('/pca', data)
        if (response.status === 200) {
          message.success('Pca added successfully')
          this.get()
        }
      } catch (error) {
        message.error(error.response.data.message)
      }
    },

    async update(id, data) {
      try {
        const response = await api.patch(`/pca/${id}`, data)
        if (response.status === 200) {
          message.success('Pca updated successfully')
          this.get()
        }
      } catch (error) {
        message.error(error.response.data.message)
      }
    },

    async delete(id) {
      try {
        const response = await api.delete(`/pca/${id}`)
        if (response.status === 200) {
          message.success('Pca deleted successfully')
          this.get()
        }
      } catch (error) {
        message.error(error.response.data.message)
      }
    },
  },
  getters: {
    pcaOptions: state =>
      state.pcas.map(item => ({
        value: item.id_pca,
        label: `${item.id_machine} - ${item.name} - [${item.id_kanagata}]`,
      })),
    findPcaById: state => id_pca => {
      return state.pcas.find(item => item.id_pca === id_pca)
    },
    findPcaByMachine: state => id_machine => {
      return state.pcas.filter(item => item.id_machine === id_machine)
    }
  },
})
