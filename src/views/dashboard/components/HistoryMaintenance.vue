<template>
  <a-card size="small">
    <a-flex justify="space-between" wrap="wrap" align="center" class="mb-small">
      <span class="bold x-large">History Reset</span>
      <a-space :size="15">
        <a-space direction="vertical" :size="0">
          <span class="bold">Kanagata</span>
          <a-select size="small" style="width: 150px" show-search placeholder="Kanagata" :options="kanagataOptions"
            v-model:value="machineShotStore.filter.id_kanagata" />
        </a-space>
        <a-space direction="vertical" :size="0">
          <span class="bold">Part</span>
          <a-select size="small" style="width: 180px" show-search placeholder="Part"
            v-model:value="machineShotStore.filter.part" :options="kanagataResetCodeStore.kanagataPartOptions" />
        </a-space>
      </a-space>
    </a-flex>
    <BaseEchart :title="null" x-axis-name="Date" :series-data="[chartSeries.shot]"
      :series-color="['#F0A04B', '#F0A04B']" :series-name="['Shot Counter Part']" :x-axis-data="chartSeries.date"
      :height="670" :toolbox="true" y-axis-name="Shot Counter" :series-type="['line']" :show-label-series="true"
      v-if="chartSeries.shot.length > 0" />
    <div style="height: 690px; display: flex; justify-content: center; align-items: center; padding: 5px;" v-else>
      <a-empty description="There is no history reset recorded for this selected filter" />
    </div>
  </a-card>
</template>

<script setup>
import { useMachineShotMonitorStore } from '@/stores/dashboard/machine-shot-monitor';
import { useKanagataResetCodeStore } from '@/stores/master/kanagata_reset_code';
import { usePcaStore } from '@/stores/master/pca';
import { useLogMaintenanceStore } from '@/stores/report/maintenance';
import { computed, watch } from 'vue';
import BaseEchart from '@/components/BaseEchart.vue';
import { storeToRefs } from 'pinia';

const pcaStore = usePcaStore()
const logMaintenanceStore = useLogMaintenanceStore()
const kanagataResetCodeStore = useKanagataResetCodeStore()
const machineShotStore = useMachineShotMonitorStore()

const { chartSeries } = storeToRefs(logMaintenanceStore)

const kanagataOptions = computed(() => {
  const pca = pcaStore.findPcaByMachine(machineShotStore.filter.id_machine)
  const unique = new Map()
  pca.forEach(item => {
    if (!unique.has(item.id_kanagata)) {
      unique.set(item.id_kanagata, {
        value: item.id_kanagata,
        label: item.id_kanagata,
      })
    }
  })
  return Array.from(unique.values())
})

watch(kanagataOptions, (newOptions) => {
  if (newOptions.length > 0) {
    machineShotStore.filter.id_kanagata = newOptions[0].value
  }
}, { immediate: true })

watch(
  () => [machineShotStore.filter.id_machine, machineShotStore.filter.id_kanagata, machineShotStore.filter.part],
  async ([newMachine, newIdKanagata, newPart]) => {
    if (newMachine && newIdKanagata, newPart) {
      await logMaintenanceStore.getHistoryMaintenance({
        id_kanagata: newIdKanagata,
        id_machine: newMachine,
        part: newPart
      })
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.selector {
  width: 200px;
}
</style>
