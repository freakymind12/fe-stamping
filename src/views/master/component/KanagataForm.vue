<template>
  <a-form layout="vertical" :model="form" @finish="handleAction(props.mode)">
    <a-row :gutter="[16, 16]" :wrap="true">
      <a-col :span="12">
        <a-form-item
          label="ID Kanagata"
          name="id_kanagata"
          :rules="[
            {
              required: true,
              message: 'Please input ID Kanagata',
              trigger: 'blur',
            },
          ]"
        >
          <a-input
            placeholder="ID Kanagata"
            v-model:value="form.id_kanagata"
            :disabled="mode == 'delete'"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Cavity"
          name="cavity"
          :rules="[
            {
              required: true,
              message: 'Please input total cavity',
              trigger: 'blur',
            },
            {
              type: 'number',
              min: 1,
              message: 'Cavity must be greater than 0',
              trigger: 'blur',
            },
          ]"
        >
          <a-input-number
            style="width: 100%"
            placeholder="Cavity"
            v-model:value="form.cavity"
            :disabled="mode == 'delete'"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Actual Shot"
          name="actual_shot"
          :rules="[
            {
              required: true,
              message: 'Please input actual shot',
              trigger: 'blur',
            },
          ]"
        >
          <a-input-number
            style="width: 100%"
            placeholder="Actual Shot"
            v-model:value="form.actual_shot"
            :disabled="mode == 'delete'"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Limit Shot"
          name="limit_shot"
          :rules="[
            {
              required: true,
              message: 'Please input limit shot',
              trigger: 'blur',
            },
          ]"
        >
          <a-input-number
            style="width: 100%"
            placeholder="Limit Shot"
            v-model:value="form.limit_shot"
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
  id_kanagata: props.data?.id_kanagata || null,
  cavity: props.data?.cavity || 0,
  actual_shot: props.data?.actual_shot || 0,
  limit_shot: props.data?.limit_shot || 0,
})

const resetForm = data => {
  form.value = {
    id_kanagata: data?.id_kanagata || null,
    cavity: data?.cavity || 0,
    actual_shot: data?.actual_shot || 0,
    limit_shot: data?.limit_shot || 0,
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
    kanagataStore.add(form.value)
    resetForm()
  }

  if (mode == 'edit') {
    kanagataStore.update(props.data.id_kanagata, form.value)
    resetForm()
  }

  if (mode == 'delete') {
    kanagataStore.delete(props.data.id_kanagata)
    resetForm()
  }
  emit('close')
}
</script>
