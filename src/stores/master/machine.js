import { defineStore } from 'pinia'
import api from '@/axios/interceptor'
import { message } from 'ant-design-vue'

export const useMachineStore = defineStore('machine', {
  state: () => ({
    machines: [],
  }),
  actions: {
    async get() {
      try {
        const response = await api.get('/machine')
        if (response.status === 200) {
          this.machines = response.data.data
        }
      } catch (error) {
        console.error('Fetching machine data failed', error)
      }
    },
    async add(data) {
      try {
        const response = await api.post('/machine', data)
        if (response.status === 200) {
          message.success('Machine added successfully')
          this.get()
        }
      } catch (error) {
        message.error(error.response.data.message)
      }
    },
    async update(id, data) {
      try {
        const response = await api.patch(`/machine/${id}`, data)
        if (response.status === 200) {
          message.success('Machine updated successfully')
          this.get()
        }
      } catch (error) {
        message.error(error.response.data.message)
      }
    },
    async delete(id) {
      try {
        const response = await api.delete(`/machine/${id}`)
        if (response.status === 200) {
          message.success('Machine deleted successfully')
          this.get()
        }
      } catch (error) {
        message.error(error.response.data.message)
      }
    },
  },

  getters: {
    machineOptions: state =>
      state.machines
        .slice()
        .sort((a, b) =>
          a.id_machine.localeCompare(b.id_machine, undefined, {
            numeric: true,
          }),
        )
        .map(item => ({
          value: item.id_machine,
          label: `${item.id_machine}`,
        })),
  },
})
