<template>
  <a-form layout="vertical" :model="form" @finish="handleAction(props.mode)">
    <a-row :gutter="[16, 16]" :wrap="true">
      <a-col :span="12">
        <a-form-item
          label="ID Machine"
          name="id_machine"
          :rules="[
            {
              required: true,
              message: 'Please input ID Machine',
              trigger: 'blur',
            },
          ]"
        >
          <a-input
            placeholder="ID Machine"
            v-model:value="form.id_machine"
            :disabled="mode == 'delete'"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Shift"
          name="shift"
          :rules="[
            {
              required: true,
              message: 'Please input total shift',
              trigger: 'blur',
            },
          ]"
        >
          <a-select ref="select" v-model:value="form.shift">
            <a-select-option value="short">Short</a-select-option>
            <a-select-option value="long">Long</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item
          label="IP Address"
          name="address"
          :rules="[
            {
              required: true,
              message: 'Please input IP Address',
              trigger: 'blur',
            },
          ]"
        >
          <a-input
            placeholder="IP Address"
            v-model:value="form.address"
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
import { useMachineStore } from '@/stores/master/machine'

const machineStore = useMachineStore()
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
  id_machine: props.data?.id_machine || null,
  shift: props.data?.shift || 'short',
  address: props.data?.address || null,
})

const resetForm = data => {
  form.value = {
    id_machine: data?.id_machine || null,
    shift: data?.shift || 'short',
    address: data?.address || null,
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
    machineStore.add(form.value)
    resetForm()
  }

  if (mode == 'edit') {
    machineStore.update(props.data.id_machine, form.value)
    resetForm()
  }

  if (mode == 'delete') {
    machineStore.delete(props.data.id_machine)
    resetForm()
  }
  emit('close')
}
</script>
