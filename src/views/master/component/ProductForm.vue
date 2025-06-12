<template>
  <a-form layout="vertical" :model="form" @finish="handleAction(props.mode)">
    <a-row :gutter="[16, 16]" :wrap="true">
      <a-col :span="24">
        <a-form-item
          label="Product Name"
          name="name"
          :rules="[
            {
              required: true,
              message: 'Please input product name',
              trigger: 'blur',
            },
          ]"
        >
          <a-input
            placeholder="Product Name"
            v-model:value="form.name"
            :disabled="mode == 'delete'"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="DP Code"
          name="id_product"
          :rules="[
            {
              required: true,
              message: 'Please input DP Code',
              trigger: 'blur',
            },
          ]"
        >
          <a-input
            placeholder="DP Code"
            v-model:value="form.id_product"
            :disabled="mode == 'delete'"
          />
        </a-form-item>
      </a-col>

      <a-col :span="12">
        <a-form-item
          label="Price"
          name="price"
          :rules="[
            {
              required: true,
              message: 'Please input price',
              trigger: 'blur',
            },
            {
              min: 1,
              type: 'number',
              message: 'Price must be greater than 0',
              trigger: 'blur',
            },
          ]"
        >
          <a-input-number
            style="width: 100%"
            placeholder="Price"
            v-model:value="form.price"
            :disabled="mode == 'delete'"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-alert
      message="If you submit it will delete the above data from the database"
      type="warning"
      show-icon
      v-if="props.mode == 'delete'"
      style="margin-bottom: 1rem"
    />
    <a-form-item>
      <a-flex justify="flex-end">
        <a-space :size="10">
          <a-button type="primary" html-type="submit"> Submit </a-button>
        </a-space>
      </a-flex>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useProductStore } from '@/stores/master/product'

const productStore = useProductStore()
const emit = defineEmits(['close'])
const props = defineProps({
  mode: {
    type: String,
    default: 'edit',
  },
  data: {
    type: Object,
    default: () => ({}),
  },
})

const form = ref({
  id_product: props.data?.id_product || null,
  name: props.data?.name || null,
  price: props.data?.price || 0,
})

const resetForm = data => {
  form.value = {
    id_product: data?.id_product || null,
    name: data?.name || null,
    price: data?.price || 0,
  }
}

watch(
  () => props.data,
  newData => {
    resetForm(newData)
  },
)

const handleAction = mode => {
  if (mode == 'add') {
    productStore.add(form.value)
    resetForm()
  }

  if (mode == 'edit') {
    productStore.update(props.data.id_product, form.value)
    resetForm()
  }

  if (mode == 'delete') {
    productStore.delete(props.data.id_product)
    resetForm()
  }
  emit('close')
}
</script>
