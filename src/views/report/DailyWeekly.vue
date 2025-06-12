<template>
  <div>
    <FilterDailyWeekly />
    <WidgetDailyWeekly />
    <ChartDailyWeekly />
  </div>
</template>

<script setup>
import { useMachineStore } from '@/stores/master/machine'
import { useProductionStore } from '@/stores/report/production'
import FilterDailyWeekly from './components/FilterDailyWeekly.vue'
import WidgetDailyWeekly from './components/WidgetDailyWeekly.vue'
import ChartDailyWeekly from './components/ChartDailyWeekly.vue'
import { onMounted } from 'vue'

const productionStore = useProductionStore()
const machineStore = useMachineStore()

onMounted(async () => {
  await machineStore.get()
  productionStore.dailyProduction.machine = machineStore.machines[0]?.id_machine
})
</script>
