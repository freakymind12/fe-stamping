<template>
  <a-row :gutter="[16, 16]" :wrap="true">
    <a-col :xs="24" :md="24" :sm="24" :lg="8">
      <BaseEchart
        title="Good Product"
        x-axis-name="Date"
        :series-data="[shift1.ok, shift2.ok]"
        :series-color="['#51829B', '#F0A04B']"
        :series-name="['Shift 1', 'Shift 2']"
        :x-axis-data="date_range"
        :show-label-series="true"
      />
    </a-col>
    <a-col :xs="24" :md="24" :sm="24" :lg="8">
      <BaseEchart
        title="In Process Reject"
        x-axis-name="Date"
        :series-data="[shift1.ng, shift2.ng]"
        :series-color="['#51829B', '#F0A04B']"
        :series-name="['Shift 1', 'Shift 2']"
        :x-axis-data="date_range"
        :show-label-series="true"
      />
    </a-col>

    <a-col :xs="24" :md="24" :sm="24" :lg="8">
      <BaseEchart
        title="Dummy"
        x-axis-name="Date"
        :series-data="[shift1.dummy, shift2.dummy]"
        :series-color="['#51829B', '#F0A04B']"
        :series-name="['Shift 1', 'Shift 2']"
        :x-axis-data="date_range"
        :show-label-series="true"
      />
    </a-col>
    <a-col :xs="24" :md="24" :sm="24" :lg="8">
      <BaseEchart
        title="Reject Setting"
        x-axis-name="Date"
        :series-data="[shift1.reject_setting, shift2.reject_setting]"
        :series-color="['#51829B', '#F0A04B']"
        :series-name="['Shift 1', 'Shift 2']"
        :x-axis-data="date_range"
        :show-label-series="true"
      />
    </a-col>
    <a-col :xs="24" :md="24" :sm="24" :lg="8">
      <BaseEchart
        title="Kadoritsu"
        x-axis-name="Date"
        :series-data="[shift1.kadoritsu, shift2.kadoritsu]"
        :series-color="['#51829B', '#F0A04B']"
        :series-name="['Shift 1', 'Shift 2']"
        :x-axis-data="date_range"
        :show-label-series="true"
      />
    </a-col>
    <a-col :xs="24" :md="24" :sm="24" :lg="8">
      <BaseEchart
        title="Bekidoritsu"
        x-axis-name="Date"
        :series-data="[shift1.bekidoritsu, shift2.bekidoritsu]"
        :series-color="['#51829B', '#F0A04B']"
        :series-name="['Shift 1', 'Shift 2']"
        :x-axis-data="date_range"
        :show-label-series="true"
      />
    </a-col>
    <a-col :xs="24" :md="24" :sm="24" :lg="8">
      <BaseEchart
        title="Stop Time"
        x-axis-name="Date"
        :series-data="[shift1.stop_time, shift2.stop_time]"
        :series-color="['#51829B', '#F0A04B']"
        :series-name="['Shift 1', 'Shift 2']"
        :x-axis-data="date_range"
        :show-label-series="true"
      />
    </a-col>
    <a-col :xs="24" :md="24" :sm="24" :lg="8">
      <BaseEchart
        title="Production Time"
        x-axis-name="Date"
        :series-data="[shift1.production_time, shift2.production_time]"
        :series-color="['#51829B', '#F0A04B']"
        :series-name="['Shift 1', 'Shift 2']"
        :x-axis-data="date_range"
        :show-label-series="true"
      />
    </a-col>
    <a-col :xs="24" :md="24" :sm="24" :lg="8">
      <BaseEchart
        title="Dandori Time"
        x-axis-name="Date"
        :series-data="[shift1.dandori_time, shift2.dandori_time]"
        :series-color="['#51829B', '#F0A04B']"
        :series-name="['Shift 1', 'Shift 2']"
        :x-axis-data="date_range"
        :show-label-series="true"
      />
    </a-col>
  </a-row>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useProductionStore } from '@/stores/report/production'
import BaseEchart from '@/components/BaseEchart.vue'

const productionStore = useProductionStore()
const shift1 = ref({})
const shift2 = ref({})
const date_range = ref([])

watchEffect(() => {
  if (productionStore.dailyProduction?.data) {
    shift1.value = productionStore.dailyProduction.data.shift1 || {}
    shift2.value = productionStore.dailyProduction.data.shift2 || {}
    date_range.value = productionStore.dailyProduction.data.date_range || []
  }
})
</script>
