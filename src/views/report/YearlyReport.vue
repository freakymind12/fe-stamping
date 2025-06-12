<template>
  <div>
    <FilterYearlyReport />
    <ChartYearly />
  </div>
</template>

<script setup>
import { useMachineStore } from '@/stores/master/machine'
import { useProductionStore } from '@/stores/report/production'
import { onMounted } from 'vue'
import FilterYearlyReport from './components/FilterYearlyReport.vue'
import ChartYearly from './components/ChartYearly.vue'

const productionStore = useProductionStore()
const machineStore = useMachineStore()

onMounted(async () => {
  await machineStore.get()
  productionStore.yearlyProduction.machine =
    machineStore.machines[0]?.id_machine

})
</script>
