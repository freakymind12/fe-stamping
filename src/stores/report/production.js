import { defineStore } from 'pinia'
import api from '@/axios/interceptor'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'
import generateFiscalMonths from '../../../utils/generateFiscalMonths'

export const useProductionStore = defineStore('production', {
  state: () => ({
    rawProduction: {
      data: [],
      machine: null,
      yearMonth: dayjs(),
    },
    dailyProduction: {
      data: {},
      machine: null,
      dateRange: [dayjs().subtract(6, 'day'), dayjs()],
    },
    monthlyProduction: {
      data: {},
      total: null,
      machine: null,
      yearMonth: dayjs(),
    },
    yearlyProduction: {
      data: {},
      machine: null,
      year: dayjs(),
    },
    summaryReport: {
      data: {},
      sales: {},
      year: dayjs()
    }
  }),
  actions: {
    // get raw production data
    async getProduction(filters = {}) {
      try {
        const queryParams = new URLSearchParams(
          Object.entries(filters).reduce((acc, [key, value]) => {
            if (value) acc.append(key, value)
            return acc
          }, new URLSearchParams()),
        )

        const response = await api.get(`/production?${queryParams}`)
        if (response.status === 200) {
          this.rawProduction.data = response.data.data
        }
      } catch (error) {
        console.error('Error fetching raw production data:', error)
      }
    },
    // get daily production trend
    async getTrendProduction(
      filters = {
        start: this.dailyProduction.dateRange[0].format('YYYY-MM-DD'),
        end: this.dailyProduction.dateRange[1].format('YYYY-MM-DD'),
        id_machine: this.dailyProduction.machine,
      },
    ) {
      try {
        const queryParams = new URLSearchParams(
          Object.entries(filters).reduce((acc, [key, value]) => {
            if (value) acc.append(key, value)
            return acc
          }, new URLSearchParams()),
        )

        const response = await api.get(`/production/trend?${queryParams}`)
        if (response.status === 200) {
          this.dailyProduction.data = response.data.data
        }
      } catch (error) {
        console.error('Error fetching trend production data:', error)
      }
    },

    // get monthly production data
    async getMonthlyProduction() {
      const filters = {
        id_machine: this.monthlyProduction.machine,
        year: dayjs(this.monthlyProduction.yearMonth).year(),
        month: dayjs(this.monthlyProduction.yearMonth).month() + 1,
        grouping: 'product',
      }
      try {
        const queryParams = new URLSearchParams(
          Object.entries(filters).reduce((acc, [key, value]) => {
            if (value) acc.append(key, value)
            return acc
          }, new URLSearchParams()),
        )

        const response = await api.get(`/production/monthly?${queryParams}`)
        if (response.status === 200) {
          this.monthlyProduction.data = response.data.data
        }
      } catch (error) {
        console.error('Error fetching monthly production data:', error)
      }
    },

    // get Fiscal Production
    async getFiscalProduction() {
      const filters = {
        year: dayjs(this.yearlyProduction.year).year(),
        id_machine: this.yearlyProduction.machine,
      }
      try {
        const queryParams = new URLSearchParams(
          Object.entries(filters).reduce((acc, [key, value]) => {
            if (value) acc.append(key, value)
            return acc
          }, new URLSearchParams()),
        )

        const response = await api.get(`/production/fiscal?${queryParams}`)
        if (response.status === 200) {
          this.yearlyProduction.data = response.data.data
        }
      } catch (error) {
        console.error(`Error fetching yearly fiscal production data`, error)
      }
    },

    // Get Summary Report
    async getSummaryReport() {
      const filters = {
        year: dayjs(this.summaryReport.year).year(),
      }
      try {
        const queryParams = new URLSearchParams(
          Object.entries(filters).reduce((acc, [key, value]) => {
            if (value) acc.append(key, value)
            return acc
          }, new URLSearchParams()),
        )
        const response = await api.get(`/production/fiscal?${queryParams}`)
        if (response.status === 200) {
          this.summaryReport.data = response.data.data
        }
      } catch (error) {
        console.error(`Error fetching summary report data`, error)
      }
    },

    async getSalesAndRejectCostSummary() {
      const filters = {
        year: dayjs(this.summaryReport.year).year()
      }
      try {
        const queryParams = new URLSearchParams(
          Object.entries(filters).reduce((acc, [key, value]) => {
            if (value) acc.append(key, value)
            return acc
          }, new URLSearchParams()),
        )
        const response = await api.get(`/production/fiscal-sales?${queryParams}`)
        if (response.status === 200) {
          this.summaryReport.sales = response.data.data
        }
      } catch (error) {
        console.error(`Error fetching summary sales data`, error)
      }
    },

    // Get Total Monthly
    async getTotalMonthlyProduction() {
      const filters = {
        id_machine: this.monthlyProduction.machine,
        year: dayjs(this.monthlyProduction.yearMonth).year(),
        month: dayjs(this.monthlyProduction.yearMonth).month() + 1,
        grouping: 'machine',
      }
      try {
        const queryParams = new URLSearchParams(
          Object.entries(filters).reduce((acc, [key, value]) => {
            if (value) acc.append(key, value)
            return acc
          }, new URLSearchParams()),
        )
        const response = await api.get(`/production/monthly?${queryParams}`)
        if (response.status === 200) {
          this.monthlyProduction.total = response.data.data[0] || []
        }
      } catch (error) {
        console.error('Error fetching total monthly production data:', error)
      }
    },

    async add(data) {
      try {
        const response = await api.post('/production', data)
        if (response.status === 200) {
          this.getProduction({
            id_machine: this.$state.rawProduction.machine,
            year: dayjs(this.$state.rawProduction.yearMonth).year(),
            month: dayjs(this.$state.rawProduction.yearMonth).month() + 1,
          })
          message.success('Production added successfully')
        }
      } catch (error) {
        console.error('Error adding production data:', error)
        message.error('Failed to add production data')
      }
    },

    async update(id, data) {
      try {
        const response = await api.patch(`/production/${id}`, data)
        if (response.status === 200) {
          this.getProduction({
            id_machine: this.$state.rawProduction.machine,
            year: dayjs(this.$state.rawProduction.yearMonth).year(),
            month: dayjs(this.$state.rawProduction.yearMonth).month() + 1,
          })
          message.success('Production updated successfully')
        }
      } catch (error) {
        console.error('Error updating production data:', error)
        message.error('Failed to update production data')
      }
    },

    async delete(id) {
      try {
        const response = await api.delete(`/production/${id}`)
        if (response.status === 200) {
          this.getProduction({
            id_machine: this.$state.rawProduction.machine,
            year: dayjs(this.$state.rawProduction.yearMonth).year(),
            month: dayjs(this.$state.rawProduction.yearMonth).month() + 1,
          })
          message.success('Production deleted successfully')
        }
      } catch (error) {
        console.error('Error deleting production data:', error)
        message.error('Failed to delete production data')
      }
    },
  },

  getters: {
    totalDailyWeekly: state => {
      const { shift1, shift2 } = state.dailyProduction.data
      if (!shift1 || !shift2)
        return {
          ok: 0,
          ng: 0,
          dummy: 0,
          reject_setting: 0,
          stop_time: 0,
        } // Jika data kosong, kembalikan objek kosong

      const total = {}

      // Loop melalui setiap properti di shift1
      Object.keys(shift1).forEach(key => {
        total[key] =
          shift1[key].reduce((sum, val) => sum + val, 0) +
          shift2[key].reduce((sum, val) => sum + val, 0)
      })

      return total
    },

    formatReportFiscal: (state) => {
      const rawData = state.yearlyProduction.data

      // Cegah error saat data belum tersedia atau bukan array
      if (!Array.isArray(rawData)) {
        return {
          year_month: [],
          ok: [],
          ng: [],
          reject_setting: [],
          dummy: [],
          production_time: [],
          dandori_time: [],
          stop_time: [],
          kadoritsu: [],
        }
      }

      const months = generateFiscalMonths(state.yearlyProduction.year.year())

      const keys = [
        'ok',
        'ng',
        'reject_setting',
        'dummy',
        'production_time',
        'dandori_time',
        'stop_time',
        'kadoritsu',
      ]

      const result = Object.fromEntries([
        ['year_month', months],
        ...keys.map(key => [key, []]),
      ])

      months.forEach((month) => {
        const [y, m] = month.split('-').map(Number)
        const data = rawData.find(d => d.year === y && d.month === m) || {}

        keys.forEach(key => {
          result[key].push(Number(data[key]) || 0)
        })
      })

      return result
    },

    formatSummaryReport: state => {
      const rawData = state.summaryReport.data

      if (!Array.isArray(rawData)) {
        return {
          year_month: [],
          ok: [],
          ng: [],
          reject_setting: [],
          dummy: [],
          production_time: [],
          dandori_time: [],
          stop_time: [],
          kadoritsu: [],
        }
      }

      const months = generateFiscalMonths(state.summaryReport.year.year())
      const keys = [
        'ok',
        'ng',
        'reject_setting',
        'dummy',
        'production_time',
        'dandori_time',
        'stop_time',
        'kadoritsu',
      ]
      const result = Object.fromEntries([
        ['year_month', months],
        ...keys.map(key => [key, []]),
      ])

      months.forEach((month) => {
        const [y, m] = month.split('-').map(Number)
        const data = rawData.find(d => d.year === y && d.month === m) || {}

        keys.forEach(key => {
          result[key].push(Number(data[key]) || 0)
        })
      })

      return result
    },

    formatSalesAndRejectCost: state => {
      const rawData = state.summaryReport.sales
      if (!Array.isArray(rawData)) {
        return {
          year_month: [],
          sales: [],
          reject_cost: [],
        }
      }
      const months = generateFiscalMonths(state.summaryReport.year.year())
      const keys = [
        'sales',
        'reject_cost',
      ]

      const result = Object.fromEntries([
        ['year_month', months],
        ...keys.map(key => [key, []]),
      ])

      months.forEach((month) => {
        const [y, m] = month.split('-').map(Number)
        const data = rawData.find(d => d.year === y && d.month === m) || {}

        keys.forEach(key => {
          result[key].push(Number(data[key]) || 0)
        })
      })

      return result
    }
  },
})
