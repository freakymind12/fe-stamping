<template>
  <a-flex justify="space-between" align="center" wrap="wrap" gap="small" class="filter-wrapper">
    <span class="x-large bold">Summary Fiscal Year</span>
    <a-space direction="vertical" :size="2">
      <span class="bold">Fiscal Year</span>
      <a-date-picker v-model:value="productionStore.summaryReport.year" picker="year" :allowClear="false" />
    </a-space>
  </a-flex>
</template>

<script setup>
import { useProductionStore } from '@/stores/report/production'
import { watch } from 'vue'

const productionStore = useProductionStore()

watch(
  () => productionStore.summaryReport.year,
  async () => {
    await productionStore.getSummaryReport()
    await productionStore.getSalesAndRejectCostSummary()
  },
  { immediate: true }
)
</script>

<style scoped>
.filter-wrapper {
  margin-bottom: 1rem;
}
</style>