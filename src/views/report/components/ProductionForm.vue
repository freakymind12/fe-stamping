<template>
  <a-form layout="vertical" :model="form" @finish="handleAction(props.mode)">
    <a-row :gutter="[16, 0]" :wrap="true">
      <a-col :span="24">
        <a-form-item
          label="PCA Data"
          name="id_pca"
          :rules="[
            {
              required: true,
              message: 'Required',
              trigger: 'change',
            },
          ]"
        >
          <a-select
            show-search
            :filterOption="filterOption"
            v-model:value="form.id_pca"
            :options="pcaStore.pcaOptions"
            :disabled="mode !== 'add'"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item
          label="Plan Data"
          name="id_plan"
          :rules="[
            {
              required: true,
              message: 'Required',
              trigger: 'change',
            },
          ]"
        >
          <a-select
            v-model:value="form.id_plan"
            show-search
            :filterOption="filterOption"
            :disabled="mode !== 'add' || !form.id_pca"
            :options="planStore.planOptions"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Good Product"
          name="ok"
          :rules="[
            {
              required: true,
              message: 'Required',
              trigger: 'change',
            },
            {
              type: 'number',
              message: 'Must be number',
              trigger: 'change',
            },
          ]"
        >
          <a-input-number
            :min="0"
            v-model:value="form.ok"
            style="width: 100%"
            :formatter="value => formatThousandSeparator(value, '.')"
            :parser="value => parseThousandSeparator(value, '.')"
            :disabled="mode !== 'add'"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="In Process Reject"
          name="ng"
          :rules="[{ required: true, message: 'Required', trigger: 'change' }]"
        >
          <a-input-number
            v-model:value="form.ng"
            style="width: 100%"
            :formatter="value => formatThousandSeparator(value, '.')"
            :parser="value => parseThousandSeparator(value, '.')"
            :min="0"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Reject Setting"
          name="reject_setting"
          :rules="[{ required: true, message: 'Required', trigger: 'change' }]"
        >
          <a-input-number
            v-model:value="form.reject_setting"
            style="width: 100%"
            :formatter="value => formatThousandSeparator(value, '.')"
            :parser="value => parseThousandSeparator(value, '.')"
            :disabled="mode !== 'add'"
            :min="0"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Dummy"
          name="dummy"
          :rules="[{ required: true, message: 'Required', trigger: 'change' }]"
        >
          <a-input-number
            v-model:value="form.dummy"
            style="width: 100%"
            :formatter="value => formatThousandSeparator(value, '.')"
            :parser="value => parseThousandSeparator(value, '.')"
            :disabled="mode !== 'add'"
            :min="0"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="Stop Time"
          name="stop_time"
          :rules="[
            {
              required: true,
              message: 'Required',
              trigger: 'change',
            },
          ]"
        >
          <a-input-number
            :min="0"
            v-model:value="form.stop_time"
            style="width: 100%"
            :formatter="value => formatThousandSeparator(value, '.')"
            :parser="value => parseThousandSeparator(value, '.')"
            :disabled="true"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="Production Time"
          name="production_time"
          :rules="[
            {
              required: true,
              message: 'Required',
              trigger: 'change',
            },
          ]"
        >
          <a-input-number
            v-model:value="form.production_time"
            style="width: 100%"
            :formatter="value => formatThousandSeparator(value, '.')"
            :parser="value => parseThousandSeparator(value, '.')"
            :disabled="true"
            :min="0"
          ></a-input-number>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item
          label="Dandori Time"
          name="dandori_time"
          :rules="[
            {
              required: true,
              message: 'Required',
              trigger: 'change',
            },
          ]"
        >
          <a-input-number
            v-model:value="form.dandori_time"
            style="width: 100%"
            :formatter="value => formatThousandSeparator(value, '.')"
            :parser="value => parseThousandSeparator(value, '.')"
            :disabled="true"
            :min="0"
          ></a-input-number>
        </a-form-item>
      </a-col>
    </a-row>

    <a-flex justify="flex-end">
      <a-space :size="10">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-space>
    </a-flex>
  </a-form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useProductionStore } from '@/stores/report/production'
import { usePcaStore } from '@/stores/master/pca'
import { usePlanStore } from '@/stores/report/plan'
import { filterOption } from '@/utils/filterSelectOptions'
import {
  parseThousandSeparator,
  formatThousandSeparator,
} from '@/utils/formatterInputNumber'

const pcaStore = usePcaStore()
const planStore = usePlanStore()
const productionStore = useProductionStore()
const emit = defineEmits(['close'])
const props = defineProps({
  mode: {
    type: String,
    default: '',
  },
  data: {
    type: Object,
    default: () => ({}),
  },
})

const form = ref({
  id_pca: props.data?.id_pca || null,
  id_plan: props.data?.id_plan || null,
  ok: props.data?.ok || 0,
  stop_time: props.data?.stop_time || 0,
  ng: props.data?.ng || 0,
  reject_setting: props.data?.reject_setting || 0,
  dummy: props.data?.dummy || 0,
  production_time: props.data?.production_time || 0,
  dandori_time: props.data?.dandori_time || 0,
})

const resetForm = data => {
  form.value = {
    id_pca: data?.id_pca || null,
    id_plan: data?.id_plan || null,
    ok: data?.ok || 0,
    stop_time: data?.stop_time || 0,
    ng: data?.ng || 0,
    reject_setting: data?.reject_setting || 0,
    dummy: data?.dummy || 0,
    production_time: data?.production_time || 0,
    dandori_time: data?.dandori_time || 0,
  }
}

watch(
  () => props.data,
  newData => {
    resetForm(newData)
  },
)

watch(
  () => form.value.id_pca,
  async newValue => {
    if (newValue && props.mode === 'add') {
      await planStore.getAllPlans({
        id_pca: form.value.id_pca,
        mode: 'unlinked',
      })
      form.value.id_plan = null
    }
  },
)

watch(
  () => props.mode,
  async newValue => {
    if (newValue == 'edit' || newValue == 'delete') {
      await planStore.getAllPlans({ id_plan: form.value.id_plan })
      resetForm(props.data)
    }
  },
)

watch(
  () => [form.value.ok, form.value.reject_setting],
  ([ok, reject_setting]) => {
    if (ok > 0) {
      const pcaData = pcaStore.findPcaById(form.value.id_pca)
      // console.log(pcaData?.speed)
      form.value.production_time = Number(
        (ok / (pcaData.speed * pcaData.cavity)).toFixed(0),
      )
    }
    if (reject_setting > 0) {
      const pcaData = pcaStore.findPcaById(form.value.id_pca)
      form.value.dandori_time = Number(
        (reject_setting / pcaData.speed).toFixed(0),
      )
    }
    // kalkulasi stop time dilakukan hardcode untuk 2 shift system
    form.value.stop_time =
      720 - form.value.production_time - form.value.dandori_time
  },
)

const handleAction = async mode => {
  if (mode === 'add') {
    const planData = planStore.findPlanById(form.value.id_plan)
    const payload = { ...form.value, shift: planData.shift, date: planData.end }
    await productionStore.add(payload)
    resetForm()
  }

  if (mode === 'edit') {
    await productionStore.update(props.data.id_production, {
      ng: form.value.ng,
    })
    resetForm()
  }

  if (mode === 'delete') {
    productionStore.delete(props.data.id_production)
    resetForm()
  }
  emit('close')
}
</script>
