<template>
  <div>
    <FilterMonthlyReport />
    <a-row :gutter="[16, 16]" :wrap="true">
      <a-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="12"
        :xl="8"
        v-for="(item, index) in pieChartConfig"
        :key="index"
      >
        <BasePieChart
          :chart-title="item.title"
          :unit="item.unit"
          :series-data="
            formatData(productionStore.monthlyProduction.data, item.key)
          "
          :total-data="productionStore.monthlyProduction.total?.[item.key]"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMachineStore } from '@/stores/master/machine'
import { useProductionStore } from '@/stores/report/production'
import FilterMonthlyReport from './components/FilterMonthlyReport.vue'
import BasePieChart from '@/components/BasePieChart.vue'
const productionStore = useProductionStore()
const machineStore = useMachineStore()

onMounted(async () => {
  await machineStore.get()
  productionStore.monthlyProduction.machine =
    machineStore.machines[0]?.id_machine
  // console.log(productionStore.monthlyProduction.machine)
})

const pieChartConfig = [
  { key: 'ok', title: 'Output', unit: 'Pin' },
  { key: 'rip', title: 'In Process Reject', unit: 'Pin' },
  { key: 'stop_time', title: 'Stop Time', unit: 'Min' },
  { key: 'sales', title: 'Sales', unit: 'IDR' },
  { key: 'dandori_time', title: 'Dandori Time', unit: 'Min' },
  { key: 'kadoritsu', title: 'Kadoritsu', unit: '%' },
  { key: 'reject_setting', title: 'Reject Setting', unit: 'Pin' },
  { key: 'dummy', title: 'Dummy', unit: 'Pin' },
  { key: 'production_time', title: 'Production Time', unit: 'Pin' },
]

const formatData = (data, key) => {
  if (!Array.isArray(data)) {
    return []
  }
  return data.map(entry => ({
    value: parseInt(entry[key]),
    name: entry.name,
  }))
}
</script>
