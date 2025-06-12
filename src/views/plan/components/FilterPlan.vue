<template>
  <a-flex
    justify="flex-start"
    align="flex-end"
    wrap="wrap"
    gap="small"
    class="filter-wrapper"
  >
    <a-space direction="vertical" :size="2">
      <span class="bold">Select Machine</span>
      <a-select
        class="selector"
        show-search
        placeholder="Machine"
        :options="machineStore.machineOptions"
        v-model:value="planStore.query.id_machine"
      />
    </a-space>

    <a-button type="primary" @click="emit('add-item')">Add New</a-button>
  </a-flex>
</template>

<script setup>
import { useMachineStore } from '@/stores/master/machine'
import { usePlanStore } from '@/stores/report/plan'
import { watch } from 'vue'
const planStore = usePlanStore()
const machineStore = useMachineStore()

const emit = defineEmits(['add-item'])

watch(
  () => planStore.query.id_machine,
  async newMachine => {
    if (newMachine) {
      await planStore.getAllPlans({ id_machine: planStore.query.id_machine })
    }
  },
  { immediate: true },
)
</script>

<style scoped>
.filter-wrapper {
  margin-bottom: 1rem;
}
.selector {
  width: 250px;
}
</style>
