<template>
  <a-statistic-countdown :value="deadline" :valueStyle="{ 'fontSize': '3rem', 'fontWeight': 'bold', 'textAlign': 'center' }">
    <template #title>
      <span style="font-size: x-large">{{ title }}</span>
    </template>
  </a-statistic-countdown>
</template>

<script setup>
import dayjs from 'dayjs'
defineProps({
  deadline: {
    type: Number,
    default: () => dayjs().add(1, 'day'),
  },
  title: {
    type: String,
    default: 'Title Countdown',
  },
})
</script>
