<template>
  <a-modal v-model:open="localVisible" :footer="null" :width="width" :centered="centered" @cancel="handleCancel">
    <template #title>
      <span class="bold large">{{ modalTitle }}</span>
    </template>
    <slot name="body" />
  </a-modal>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  modalTitle: {
    type: String,
    default: 'Modal Title',
  },
  width: {
    type: Number,
    default: 520,
  },
  centered: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const localVisible = ref(props.visible)

// Sinkronisasi saat props.visible berubah
watch(
  () => props.visible,
  newVal => {
    localVisible.value = newVal
  },
)

// Saat user menutup modal (klik X atau klik luar modal)
const handleCancel = () => {
  localVisible.value = false
  emit('close', false)
}

// Juga emit ketika modal diubah dari dalam component
watch(localVisible, newVal => {
  if (!newVal) {
    emit('close', false)
  }
})
</script>
