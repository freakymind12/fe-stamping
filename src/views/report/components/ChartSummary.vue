<template>
  <a-row :gutter="[16, 16]" :wrap="true">
    <a-col :xs="24" :md="24" :sm="24" :lg="12" :xl="8">
      <BaseEchart :series-color="['#51829B', '#F0A04B']" :x-axis-data="report.year_month" :series-data="[report.ok]"
        :series-name="['Good Product']" x-axis-name="Year - Month" title="Good Product" y-axis-name="Quantity"
        :show-label-series="true" :height="350" />
    </a-col>
    <a-col :xs="24" :md="24" :sm="24" :lg="12" :xl="8">
      <BaseEchart :series-color="['#51829B', '#F0A04B']" :x-axis-data="report.year_month" :series-data="[report.ng]"
        :series-name="['In Process Reject']" x-axis-name="Year - Month" title="In Process Reject" y-axis-name="Quantity"
        :show-label-series="true" :height="350" />
    </a-col>
    <a-col :xs="24" :md="24" :sm="24" :lg="12" :xl="8">
      <BaseEchart :series-color="['#51829B', '#F0A04B']" :x-axis-data="report.year_month"
        :series-data="[report.reject_setting]" :series-name="['Reject Setting']" x-axis-name="Year - Month"
        title="Reject Setting" y-axis-name="Quantity" :show-label-series="true" :height="350" />
    </a-col>
    <a-col :xs="24" :md="24" :sm="24" :lg="12" :xl="8">
      <BaseEchart :series-color="['#51829B', '#F0A04B']" :x-axis-data="report.year_month" :series-data="[report.dummy]"
        :series-name="['Dummy']" x-axis-name="Year - Month" title="Dummy" y-axis-name="Quantity"
        :show-label-series="true" :height="350" />
    </a-col>
    <a-col :xs="24" :md="24" :sm="24" :lg="12" :xl="8">
      <BaseEchart :series-color="['#51829B', '#F0A04B']" :x-axis-data="report.year_month"
        :series-data="[report.stop_time]" :series-name="['Stop Time']" x-axis-name="Year - Month" title="Stop Time"
        y-axis-name="Minutes" :show-label-series="true" :height="350" />
    </a-col>
    <a-col :xs="24" :md="24" :sm="24" :lg="12" :xl="8">
      <BaseEchart :series-color="['#51829B', '#F0A04B']" :x-axis-data="report.year_month"
        :series-data="[report.production_time]" :series-name="['Production Time']" x-axis-name="Year - Month"
        title="Production Time" y-axis-name="Minutes" :show-label-series="true" :height="350" />
    </a-col>
    <a-col :xs="24" :md="24" :sm="24" :lg="12" :xl="8">
      <BaseEchart :series-color="['#51829B', '#F0A04B']" :x-axis-data="report.year_month"
        :series-data="[report.dandori_time]" :series-name="['Dandori Time']" x-axis-name="Year - Month"
        title="Dandori Time" y-axis-name="Minutes" :show-label-series="true" :height="350" />
    </a-col>
    <a-col :xs="24" :md="24" :sm="24" :lg="12" :xl="8">
      <BaseEchart :series-color="['#51829B', '#F0A04B']" :x-axis-data="report.year_month"
        :series-data="[report.kadoritsu]" :series-name="['Kadoritsu']" x-axis-name="Year - Month" title="Kadoritsu"
        y-axis-name="Percentage" :show-label-series="true" :height="350" />
    </a-col>
    <a-col :xs="24" :md="24" :sm="24" :lg="12" :xl="8">
      <BaseEchart :series-color="['#51829B', '#F0A04B']" :x-axis-data="sales.year_month" :series-data="[sales.sales]"
        :series-name="['Sales (IDR)']" x-axis-name="Year - Month" title="Sales" y-axis-name="IDR"
        :show-label-series="true" :height="350" />
    </a-col>
    <a-col :xs="24" :md="24" :sm="24" :lg="12" :xl="8">
      <BaseEchart :series-color="['#51829B', '#F0A04B']" :x-axis-data="sales.year_month"
        :series-data="[sales.reject_cost]" :series-name="['Reject Cost (IDR)']" x-axis-name="Year - Month"
        title="Reject Cost" y-axis-name="IDR" :show-label-series="true" :height="350" />
    </a-col>

  </a-row>
</template>

<script setup>
import BaseEchart from '@/components/BaseEchart.vue';
import { useProductionStore } from '@/stores/report/production';
import { computed } from 'vue'

const productionStore = useProductionStore()
const report = computed(() => productionStore.formatSummaryReport)

const sales = computed(() => productionStore.formatSalesAndRejectCost)

</script>
