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
        v-model:value="productionStore.dailyProduction.machine"
        :options="machineStore.machineOptions"
      />
    </a-space>
    <a-space direction="vertical" :size="2">
      <span class="bold">Date Range</span>
      <a-range-picker
        v-model:value="productionStore.dailyProduction.dateRange"
        :allowClear="false"
      />
    </a-space>
  </a-flex>
</template>

<script setup>
import { useMachineStore } from '@/stores/master/machine'
import { useProductionStore } from '@/stores/report/production'
import { message } from 'ant-design-vue'
import { watch } from 'vue'
import dayjs from 'dayjs'
const productionStore = useProductionStore()
const machineStore = useMachineStore()

watch(
  [
    () => productionStore.dailyProduction.machine,
    () => productionStore.dailyProduction.dateRange,
  ],
  async ([newMachine, newDateRange]) => {
    if (newMachine && newDateRange && newDateRange.length === 2) {
      const startDate = dayjs(newDateRange[0])
      const endDate = dayjs(newDateRange[1])
      const diffDays = endDate.diff(startDate, 'day')

      if (diffDays >= 3) {
        await productionStore.getTrendProduction()
        message.success('Successfully get trend data')
      } else {
        message.info('Minimum date range is 4 days')
      }
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
