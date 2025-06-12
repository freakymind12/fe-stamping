import { defineStore } from 'pinia'
import api from '@/axios/interceptor'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'

export const usePlanStore = defineStore('plan', {
  state: () => ({
    plans: [],
    query: {
      id_machine: null,
      id_pca: null,
    },
  }),
  actions: {
    async getAllPlans(filters = {}) {
      try {
        const queryParams = new URLSearchParams(
          Object.entries(filters).reduce((acc, [key, value]) => {
            if (value) acc.append(key, value)
            return acc
          }, new URLSearchParams()),
        )

        const response = await api.get(`/plan?${queryParams}`)
        if (response.status === 200) {
          this.plans = response.data.data
        }
      } catch (error) {
        console.error('Error fetching plans:', error)
      }
    },

    async add(data) {
      try {
        const response = await api.post('/plan', data)
        if (response.status === 200) {
          message.success('Plan added successfully')
          this.getAllPlans({ id_machine: this.query.id_machine })
        }
      } catch (error) {
        console.error('Error adding plan:', error)
      }
    },

    async update(id, data) {
      try {
        const response = await api.patch(`/plan/${id}`, data)
        if (response.status === 200) {
          message.success('Plan updated successfully')
          this.getAllPlans({ id_machine: this.query.id_machine })
        }
      } catch (error) {
        console.error('Error updating plan:', error)
      }
    },

    async delete(id) {
      try {
        const response = await api.delete(`/plan/${id}`)
        if (response.status === 200) {
          message.success('Plan deleted successfully')
          this.getAllPlans({ id_machine: this.query.id_machine })
        }
      } catch (error) {
        console.error('Error deleting plan:', error)
        message.error(error.response.data.message)
      }
    },
  },
  getters: {
    planOptions: state =>
      state.plans
        .slice()
        .sort((a, b) => dayjs(b.start) - dayjs(a.start))
        .map(item => ({
          value: item.id_plan,
          label: `${item.id_plan} / S${item.shift} / ${item.start.split(' ')[0]} / ${item.qty.toLocaleString('id-ID')}`,
        })),

    findPlanById: state => id_plan => {
      return state.plans.find(plan => plan.id_plan === id_plan)
    },

    eventFormat: state => {
      return state.plans.map(item => ({
        id: item.id_plan,
        title:
          state.query.id_machine === 'all'
            ? `${item.id_machine}`
            : `${item.name}`,
        topic: `[${item.id_product}] - ${item.name} `,
        description: `Qty: ${item.qty.toLocaleString('id-ID')} pin / Plan time : ${item.time_plan} min / Shift : ${item.shift}`,
        time: { start: item.start, end: item.end },
        isEditable: true,
        disableDnD: ['month', 'week', 'day'],
        colorScheme: 'shift' + item.shift,
      }))
    },
  },
})
