<template>
  <a-row :gutter="[16, 16]" :wrap="true">
    <a-col :xs="24" :md="24" :sm="24" :lg="12" :xl="6">
      <a-card size="small" hoverable class="run">
        <a-space direction="vertical" :size="2">
          <span class="title large">Good Product</span>
          <span class="bold title large">
            {{ totalDailyWeekly.ok.toLocaleString() }} pins
          </span>
        </a-space>
      </a-card>
    </a-col>
    <a-col :xs="24" :md="24" :sm="24" :lg="12" :xl="4">
      <a-card size="small" hoverable class="stop">
        <a-space direction="vertical" :size="2">
          <span class="title large">In Process Reject</span>
          <span class="bold title large">
            {{ totalDailyWeekly.ng.toLocaleString() }} pins
          </span>
        </a-space>
      </a-card>
    </a-col>
    <a-col :xs="24" :md="24" :sm="24" :lg="12" :xl="4">
      <a-card size="small" hoverable class="off">
        <a-space direction="vertical" :size="2">
          <span class="title large">Stop Time</span>
          <span class="bold title large">
            {{ totalDailyWeekly.stop_time.toLocaleString() }} min
          </span>
        </a-space>
      </a-card>
    </a-col>
    <a-col :xs="24" :md="24" :sm="24" :lg="12" :xl="4">
      <a-card size="small" hoverable class="blue">
        <a-space direction="vertical" :size="2">
          <span class="title large">Dummy</span>
          <span class="bold title large">
            {{ totalDailyWeekly.dummy.toLocaleString() }} pin
          </span>
        </a-space>
      </a-card>
    </a-col>
    <a-col :xs="24" :md="24" :sm="24" :lg="12" :xl="6">
      <a-card size="small" hoverable class="setting">
        <a-space direction="vertical" :size="2">
          <span class="title large">Reject Setting</span>
          <span class="bold title large">
            {{ totalDailyWeekly.reject_setting.toLocaleString() }} pins
          </span>
        </a-space>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
import { useProductionStore } from '@/stores/report/production'
import { storeToRefs } from 'pinia'

const productionStore = useProductionStore()
const { totalDailyWeekly } = storeToRefs(productionStore)
// console.log(totalDailyWeekly.value)
</script>

<style scoped>
.title {
  color: white;
}
</style>
