<template>
  <a-card size="small">
    <div class="calendar-container is-light-mode calendar-wrapper">
      <Qalendar
        :config="config"
        :events="events"
        @edit-event="emit('edit-plan', planStore.findPlanById($event))"
        @delete-event="emit('delete-plan', planStore.findPlanById($event))"
      />
    </div>
  </a-card>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Qalendar } from 'qalendar'
import { usePlanStore } from '@/stores/report/plan'

const planStore = usePlanStore()
const emit = defineEmits(['edit-plan', 'delete-plan'])

const events = computed(() => planStore.eventFormat)
const config = ref({
  // disableModes: ['day'],
  defaultMode: 'month',
  style: {
    fontFamily: 'Arial',
    colorSchemes: {
      shift1: {
        color: '#000',
        backgroundColor: 'rgb(129, 191, 218, 0.4)',
      },
      shift2: {
        color: '#000',
        backgroundColor: 'rgb(250, 218, 122, 0.4)',
      },
    },
  },
  locale: 'id-ID',
})
</script>

<style scoped>
.calendar-wrapper {
  height: 75vh;
}
</style>
