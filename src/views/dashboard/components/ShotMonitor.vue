<template>
  <a-card size="small">
    <a-flex justify="space-between" wrap="wrap" class="mb-small">
      <span class="bold x-large">Shot Monitor</span>
      <a-select class="selector" show-search placeholder="ID Machine" v-model:value="machineShotStore.filter.id_machine"
        :options="machineStore.machineOptions"></a-select>
    </a-flex>
    <a-flex vertical gap="small" class="shot-monitor">
      <a-card size="small" :hoverable="true" v-for="(data, index) in filteredMachines" :key="index"
        :class="cardClass(data)">
        <a-flex vertical :gap="5">
          <a-flex justify="space-between" wrap="wrap" align="center">
            <span class="bold large">{{ data[0] }}</span>
            <a-space :size="5">
              <span class="small">Kanagata : </span>
              <a-tag color="black" class="bold">{{ kanagataId }}</a-tag>
            </a-space>
          </a-flex>
          <a-descriptions bordered size="small" :column="{ xxl: 2, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }">
            <a-descriptions-item :contentStyle="{ fontSize: 'small', fontWeight: 'bold' }">
              <template #label>
                <a-tag color="black" class="bold">Actual</a-tag>
              </template>
              {{ data[1].toLocaleString('id-ID') }}
            </a-descriptions-item>
            <a-descriptions-item :contentStyle="{ fontSize: 'small', fontWeight: 'bold' }">
              <template #label>
                <a-tag color="black" class="bold">Percentage</a-tag>
              </template>
              <a-progress style="width: 70px;" stroke-color="black" :stroke-width="12" trailColor="grey"
                :percent="Number(data[4].toFixed(1))">
              </a-progress>
            </a-descriptions-item>
            <a-descriptions-item :contentStyle="{ fontSize: 'small', fontWeight: 'bold' }">
              <template #label>
                <a-tag color="black" class="bold">Reminder</a-tag>
              </template>
              {{ data[2].toLocaleString('id-ID') }}
            </a-descriptions-item>
            <a-descriptions-item :contentStyle="{ fontSize: 'small', fontWeight: 'bold' }">
              <template #label>
                <a-tag color="black" class="bold">Force Stop</a-tag>
              </template>
              {{ data[3].toLocaleString('id-ID') }}
            </a-descriptions-item>
          </a-descriptions>
        </a-flex>
      </a-card>
      <a-empty v-if="filteredMachines.length === 0" style="padding-top:40%" description="There is no data for this machine"/>
    </a-flex>
  </a-card>
</template>

<script setup>
import { useMachineShotMonitorStore } from '@/stores/dashboard/machine-shot-monitor'
import { useWsDashboardStore } from '@/stores/dashboard/websocket-dashboard'
import { useMachineStore } from '@/stores/master/machine'
import { usePcaStore } from '@/stores/master/pca'
import { computed } from 'vue'

const pcaStore = usePcaStore()
const machineShotStore = useMachineShotMonitorStore()
const wsStore = useWsDashboardStore()
const machineStore = useMachineStore()

const filteredMachines = computed(() => {
  const id = machineShotStore.filter.id_machine
  const shotData = wsStore.shot || {}
  return id && shotData[id] ? shotData[id] : []
})

const kanagataId = computed(() => {
  const rawId = machineShotStore.filter.id_machine

  const id = rawId
    ?.split(' ')
    .map((word, index, arr) => {
      // Biarkan kata terakhir tetap seperti aslinya jika didahului oleh 'line'
      if (index === arr.length - 1 && arr[index - 1]?.toLowerCase() === 'line') {
        return word
      }
      return word.toLowerCase()
    })
    .join('_') || ''

  const id_pca_raw = String(wsStore.data?.[id]?.production?.pca || '')
  const sliced = id_pca_raw.length === 4
    ? [id_pca_raw.slice(0, 2), id_pca_raw.slice(2, 4)]
    : [id_pca_raw]

  const dataPca = pcaStore.findPcaById(Number(sliced[0]))
  return dataPca?.id_kanagata || 'Unknown'
})

const cardClass = (data) => {
  return {
    run: data[1] < data[2],
    setting: data[1] > data[2] && data[1] < data[3],
    dark: data[2] === 0 || data[3] === 0,
  }
}
</script>

<style scoped>
.shot-monitor {
  height: 700px;
  overflow-y: auto;
  padding-right: 5px;
}

.dark {
  background-color: #9db2bf;
}

.selector {
  width: 200px;
}
</style>
