<template>
  <a-flex
    justify="flex-start"
    align="center"
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
        v-model:value="productionStore.monthlyProduction.machine"
      />
    </a-space>
    <a-space direction="vertical" :size="2">
      <span class="bold">Year Month</span>
      <a-date-picker
        picker="month"
        :allow-clear="false"
        v-model:value="productionStore.monthlyProduction.yearMonth"
      />
    </a-space>
  </a-flex>
</template>

<script setup>
import { useMachineStore } from '@/stores/master/machine'
import { useProductionStore } from '@/stores/report/production'
import { watch } from 'vue'
const productionStore = useProductionStore()
const machineStore = useMachineStore()

watch(
  [
    () => productionStore.monthlyProduction.machine,
    () => productionStore.monthlyProduction.yearMonth,
  ],
  async ([newMachine, newyearMonth]) => {
    if (newMachine && newyearMonth) {
      await productionStore.getMonthlyProduction()
      await productionStore.getTotalMonthlyProduction()
    }
  },
  { immediate: true },
)
</script>

<style scoped>
.selector {
  width: 250px;
}

.filter-wrapper {
  margin-bottom: 1rem;
}
</style>
