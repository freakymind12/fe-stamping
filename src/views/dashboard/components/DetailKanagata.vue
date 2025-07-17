<template>
  <div>
    <a-flex justify="flex-start" wrap="wrap" style="margin-bottom: 10px">
      <a-tag color="black" class="bold">
        {{ data.id_machine }}
      </a-tag>
      <a-tag color="black" class="bold">
        {{ data.part.toUpperCase() }}
      </a-tag>
    </a-flex>
    <BaseEchart title="Reset History" x-axis-name="Date" :series-data="[chartSeries.shot]"
      :series-color="['#51829B', '#F0A04B']" :series-name="['Shot']" :x-axis-data="chartSeries.date" :series-type="['line']"
      :show-label-series="true" />
  </div>
</template>

<script setup>
import BaseEchart from '@/components/BaseEchart.vue'
import { useLogMaintenanceStore } from '@/stores/report/maintenance'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'

const maintenanceStore = useLogMaintenanceStore()
const { chartSeries } = storeToRefs(maintenanceStore)

const props = defineProps({
  data: {
    type: Object,
    default: () => { },
  },
})

watch(
  () => [props.data?.id_machine, props.data?.part],
  async ([newIdMachine, newPart]) => {
    if (newIdMachine && newPart) {
      try {
        await maintenanceStore.getHistoryMaintenance({
          part: newPart?.toLowerCase().replace(/\s+/g, '_'),
          id_machine: newIdMachine
        });
      } catch (err) {
        console.error("Failed to get maintenance history:", err);
      }
    }
  },
  { immediate: true }
);

</script>

<style scoped>
.timeline {
  margin-top: 5px;
  padding: 10px 0 0 0;
  max-height: 300px;
  overflow: auto;
}
</style>
