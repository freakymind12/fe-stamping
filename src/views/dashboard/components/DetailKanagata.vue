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
    <a-table :dataSource="maintenanceStore.history" :columns="cols" size="small" bordered :pagination="false" :scroll="{ y: 300 }">
      <template #footer>
        <span class="bold">Total : </span> {{ maintenanceStore.history.length }} Reset History
      </template>
      </a-table>
  </div>
</template>

<script setup>
import { useLogMaintenanceStore } from '@/stores/report/maintenance'
import { ref, watch } from 'vue'
import dayjs from 'dayjs'

const maintenanceStore = useLogMaintenanceStore()
const cols = ref([
  {
    title: 'Part',
    dataIndex: 'part',
    key: 'part',
    sorter: (a, b) => a.part.localeCompare(b.part)
  },
  {
    title: 'Reset Time',
    dataIndex: 'created_at',
    key: 'created_at',
    sorter: (a, b) => dayjs(a.created_at) - dayjs(b.created_at),
    defaultSortOrder: 'descend',
  }
])

const props = defineProps({
  data: {
    type: Object,
    default: () => { },
  },
})

watch(
  () => props.data,
  async newVal => {
    if (newVal && newVal.id_machine) {
      await maintenanceStore.getHistoryMaintenance(newVal)
    }
  },
  { immediate: true, deep: true },
)

</script>

<style scoped>
.timeline {
  margin-top: 5px;
  padding: 10px 0 0 0;
  max-height: 300px;
  overflow: auto;
}
</style>
