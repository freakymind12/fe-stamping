import { defineStore } from 'pinia'
import api from '@/axios/interceptor'

export const useStopCauseStore = defineStore('stop_cause', {
  state: () => ({
    stop_causes: [],
  }),
  actions: {
    async get() {
      try {
        const response = await api.get('/problem')
        if (response.status === 200) {
          this.stop_causes = response.data.data
        }
      } catch (error) {
        console.error('Fetching stop cause data failed', error)
      }
    },
  },
  getters: {
    findStopCauseById: state => id_problem => {
      return state.stop_causes.find(
        stop_cause => stop_cause.id_problem === id_problem,
      )
    },
  },
})
