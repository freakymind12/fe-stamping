<template>
  <a-form layout="vertical" :model="form" @finish="handleAction(props.mode)">
    <a-row :gutter="[16, 16]" :wrap="true">
      <a-col :span="6">
        <a-form-item
          label="ID PCA"
          name="id_pca"
          :rules="[
            {
              required: true,
              message: 'Please input ID PCA',
              trigger: 'blur',
            },
          ]"
        >
          <a-input
            placeholder="ID PCA"
            v-model:value="form.id_pca"
            :disabled="mode == 'delete'"
          />
        </a-form-item>
      </a-col>
      <a-col :span="9">
        <a-form-item
          label="Machine"
          name="id_machine"
          :rules="[
            {
              required: true,
              message: 'Please select machine',
              trigger: 'blur',
            },
          ]"
        >
          <a-select
            show-search
            placeholder="Machine"
            :filterOption="filterOption"
            v-model:value="form.id_machine"
            :options="machineStore.machineOptions"
            :disabled="mode == 'delete'"
          />
        </a-form-item>
      </a-col>
      <a-col :span="9">
        <a-form-item
          label="Kanagata"
          name="id_kanagata"
          :rules="[
            {
              required: true,
              message: 'Please select kanagata',
              trigger: 'blur',
            },
          ]"
        >
          <a-select
            show-search
            placeholder="Kanagata"
            :filterOption="filterOption"
            v-model:value="form.id_kanagata"
            :options="kanagataStore.kanagataOptions"
            :disabled="mode == 'delete'"
          />
        </a-form-item>
      </a-col>
      <a-col :span="15">
        <a-form-item
          label="Product"
          name="id_product"
          :rules="[
            {
              required: true,
              message: 'Please select product',
              trigger: 'blur',
            },
          ]"
        >
          <a-select
            show-search
            placeholder="Product"
            :filterOption="filterOption"
            v-model:value="form.id_product"
            :options="productStore.productOptions"
            :disabled="mode == 'delete'"
          />
        </a-form-item>
      </a-col>
      <a-col :span="9">
        <a-form-item
          label="Speed"
          name="speed"
          :rules="[
            {
              required: true,
              message: 'Please input speed data from this PCA',
              trigger: 'blur',
            },
            {
              type: 'number',
              min: 1,
              message: 'Speed must be greater than 0',
              trigger: 'blur',
            },
          ]"
        >
          <a-input-number
            style="width: 100%"
            placeholder="Speed"
            v-model:value="form.speed"
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
import { useKanagataStore } from '@/stores/master/kanagata'
import { useMachineStore } from '@/stores/master/machine'
import { useProductStore } from '@/stores/master/product'
import { usePcaStore } from '@/stores/master/pca'
import { filterOption } from '@/utils/filterSelectOptions'

const pcaStore = usePcaStore()
const machineStore = useMachineStore()
const productStore = useProductStore()
const kanagataStore = useKanagataStore()
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
  id_pca: props.data?.id_pca || null,
  id_machine: props.data?.id_machine || null,
  id_product: props.data?.id_product || null,
  id_kanagata: props.data?.id_kanagata || null,
  speed: props.data?.speed || 0,
})

const resetForm = data => {
  form.value = {
    id_pca: data?.id_pca || null,
    id_machine: data?.id_machine || null,
    id_product: data?.id_product || null,
    id_kanagata: data?.id_kanagata || null,
    speed: data?.speed || 0,
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
    pcaStore.add(form.value)
    resetForm()
  }

  if (mode == 'edit') {
    pcaStore.update(props.data.id_pca, form.value)
    resetForm()
  }

  if (mode == 'delete') {
    pcaStore.delete(props.data.id_pca)
    resetForm()
  }
  emit('close')
}
</script>
