<template>
  <a-form layout="vertical" :model="form" @finish="handleAction(props.mode)">
    <a-row :gutter="[8, 8]" :wrap="true">
      <a-col :span="24">
        <a-form-item label="Reset Code" name="code" :rules="[
          {
            required: true,
            message: 'Please input reset code',
            trigger: 'blur',
          },
        ]">
          <a-input-number style="width:100%" placeholder="Reset Code" v-model:value="form.code"
            :disabled="mode != 'add'" />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="Part Name" name="name" :rules="[
          {
            required: true,
            message: 'Please input kanagata part name',
            trigger: 'blur',
          },
          {
            pattern: /^[a-z]+(_[a-z]+)*$/,
            message: 'Only lowercase letters and underscores allowed (e.g., part_name_example)',
            trigger: 'blur',

          }
        ]">
          <a-input style="width: 100%" placeholder="Kanagata Part Name" v-model:value="form.name"
            :disabled="mode == 'delete'" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-alert message="If you submit it will delete the above data from the database" type="warning" show-icon
      v-if="props.mode == 'delete'" style="margin-bottom: 1rem" />
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
import { useKanagataResetCodeStore } from '@/stores/master/kanagata_reset_code'

const kanagataResetCodeStore = useKanagataResetCodeStore()
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
  code: props.data?.code || null,
  name: props.data?.name || 0,
})

const resetForm = data => {
  form.value = {
    code: data?.code || null,
    name: data?.name || null,
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
    kanagataResetCodeStore.add(form.value)
    resetForm()
  }

  if (mode == 'edit') {
    kanagataResetCodeStore.update(props.data.code, form.value)
    resetForm()
  }

  if (mode == 'delete') {
    kanagataResetCodeStore.delete(props.data.code)
    resetForm()
  }
  emit('close')
}
</script>
