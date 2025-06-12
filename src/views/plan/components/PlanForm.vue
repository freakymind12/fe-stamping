<template>
  <a-form layout="vertical" :model="form" @finish="handleAction(props.mode)">
    <a-row :gutter="[16, 0]" :wrap="true">
      <a-col :span="24">
        <a-form-item label="PCA Data" name="id_pca" :rules="[
          {
            required: true,
            message: 'Required',
            trigger: 'blur',
          },
        ]">
          <a-select show-search :filterOption="filterOption" v-model:value="form.id_pca" :options="pcaStore.pcaOptions"
            :disabled="mode !== 'add'" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="Quantity Plan" name="qty" :rules="[
          {
            required: true,
            message: 'Required',
            trigger: ['blur', 'change'],
          },
          {
            type: 'number',
            min: 0,
            message: 'Must be greater than 0',
            trigger: ['change', 'blur'],
          },
        ]">
          <a-input-number :min="0" v-model:value="form.qty" style="width: 100%" :disabled="mode === 'delete'"
            :formatter="value => formatThousandSeparator(value, '.')"
            :parser="value => parseThousandSeparator(value, '.')" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="Shift" name="shift" :rules="[
          {
            required: true,
            message: 'Required',
            trigger: ['blur', 'change'],
          },
        ]">
          <a-select v-model:value="form.shift" :options="[
            {
              value: 1,
              label: 'S1',
            },
            {
              value: 2,
              label: 'S2',
            },
          ]" :disabled="mode !== 'add'" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="Start Time" name="start"
          :rules="[{ required: true, message: 'Required', trigger: 'change' }]">
          <a-date-picker :show-time="{ format: 'HH:mm' }" format="YYYY-MM-DD HH:mm" placeholder="Select Date"
            v-model:value="form.start" :disabled="mode !== 'add'" style="width: 100%" :disabled-date="disabledDate" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="End Time" name="end" :rules="[{ required: true, message: 'Required', trigger: 'change' }]">
          <a-date-picker :show-time="{ format: 'HH:mm' }" format="YYYY-MM-DD HH:mm" placeholder="Select Date"
            v-model:value="form.end" :disabled="mode !== 'add'" style="width: 100%" :disabled-date="disabledDate" />
        </a-form-item>
      </a-col>
    </a-row>

    <a-alert type="error" message="Be carefull this will delete your plan production data on database" banner
      style="margin-bottom: 16px" v-if="mode == 'delete' && !isTimePassed" />

    <a-alert type="error" message="You can't delete the plan because the production planning time has passed" banner
      style="margin-bottom: 16px" v-if="mode == 'delete' && isTimePassed" />
    <a-form-item>
      <a-flex justify="flex-end">
        <a-space :size="10">
          <a-button type="primary" :disabled="mode == 'delete' && isTimePassed" html-type="submit">Submit</a-button>
        </a-space>
      </a-flex>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { usePcaStore } from '@/stores/master/pca'
import { usePlanStore } from '@/stores/report/plan'
import { filterOption } from '@/utils/filterSelectOptions'
import { computed, ref, watch } from 'vue'
import dayjs from 'dayjs'
import {
  formatThousandSeparator,
  parseThousandSeparator,
} from '@/utils/formatterInputNumber'

const planStore = usePlanStore()
const pcaStore = usePcaStore()
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
  qty: props.data?.qty || 0,
  shift: props.data?.shift || null,
  start: props.data?.start ? dayjs(props.data?.start) : null,
  end: props.data?.end ? dayjs(props.data?.end) : null,
})

const resetForm = data => {
  form.value = {
    id_pca: data?.id_pca || null,
    qty: data?.qty || null,
    shift: data?.shift || null,
    start: data?.start ? dayjs(data?.start) : null,
    end: data?.end ? dayjs(data?.end) : null,
  }
}

const isTimePassed = computed(() => {
  if (!form.value.start) return false
  return dayjs().isAfter(form.value.start)
})

const disabledDate = (current) => {
  // Disable semua tanggal sebelum hari ini
  return current && current.isBefore(dayjs(), 'day');
};

watch(
  () => props.mode,
  () => {
    resetForm(props.data)
  },
)

watch(
  () => form.value.shift,
  newShift => {
    if (newShift === 1 && props.mode === 'add') {
      form.value.start = dayjs().hour(7).minute(0).second(0)
      form.value.end = dayjs().hour(19).minute(0).second(0)
    }
    if (newShift === 2 && props.mode === 'add') {
      form.value.start = dayjs().hour(19).minute(0).second(0)
      form.value.end = dayjs().hour(7).minute(0).second(0).add(1, 'day')
    }
  },
)

const handleAction = mode => {
  if (mode === 'add') {
    planStore.add({
      ...form.value,
      start: dayjs(form.value.start).format('YYYY-MM-DD HH:mm:ss'),
      end: dayjs(form.value.end).format('YYYY-MM-DD HH:mm:ss'),
    })
    resetForm()
  }

  if (mode === 'edit') {
    planStore.update(props.data.id_plan, {
      ...form.value,
      start: dayjs(form.value.start).format('YYYY-MM-DD HH:mm:ss'),
      end: dayjs(form.value.end).format('YYYY-MM-DD HH:mm:ss'),
    })
    resetForm()
  }

  if (mode === 'delete') {
    planStore.delete(props.data.id_plan)
    resetForm()
  }

  emit('close', false)
}
</script>
