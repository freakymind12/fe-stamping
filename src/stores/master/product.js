import { defineStore } from 'pinia'
import api from '@/axios/interceptor'
import { message } from 'ant-design-vue'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
  }),
  actions: {
    async get() {
      try {
        const response = await api.get('/product')
        if (response.status === 200) {
          this.products = response.data.data
        }
      } catch (error) {
        console.error('Fetching product data failed', error)
      }
    },

    async add(data) {
      try {
        const response = await api.post('/product', data)
        if (response.status === 200) {
          message.success('Product added successfully')
          this.get()
        }
      } catch (error) {
        message.error(error.response.data.message)
      }
    },

    async update(id, data) {
      try {
        const response = await api.patch(`/product/${id}`, data)
        if (response.status === 200) {
          message.success('Product updated successfully')
          this.get()
        }
      } catch (error) {
        message.error(error.response.data.message)
      }
    },

    async delete(id) {
      try {
        const response = await api.delete(`/product/${id}`)
        if (response.status === 200) {
          message.success('Product deleted successfully')
          this.get()
        }
      } catch (error) {
        message.error(error.response.data.message)
      }
    },
  },
  getters: {
    productOptions: state =>
      state.products.map(item => ({
        value: item.id_product,
        label: `[${item.id_product}] - ${item.name}`,
      })),
  },
})
