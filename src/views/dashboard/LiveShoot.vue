<template>
  <a-row :gutter="[16, 16]">
    <a-col
      :xs="{ span: 24 }"
      :lg="{ span: 24 }"
      v-for="(value, key) in wsStore.data"
      :key="key"
    >
      <a-card size="small">
        <span class="bold machine-name">{{ key }}</span>

        <a-row :gutter="[8, 8]" :wrap="true">
          <a-col
            :lg="8"
            :md="24"
            :sm="24"
            v-for="(data, index) in value"
            :key="index"
          >
            <a-card
              size="small"
              :class="{
                run: data[1] < data[2],
                setting: data[1] > data[2] && data[1] < data[3],
              }"
            >
              <a-flex justify="space-between" wrap="wrap" align="center">
                <span class="bold large">{{ data[0] }}</span>
                <span class="bold large" v-if="!data[2] && !data[3]"
                  >[Not Used]</span
                >
                <div style="width: 250px; padding-right: 1rem">
                  <a-progress
                    stroke-color="black"
                    trailColor="grey"
                    :percent="
                      data[3] === 0
                        ? 0
                        : parseFloat(((data[1] / data[3]) * 100).toFixed(2))
                    "
                  />
                </div>
              </a-flex>
              <a-flex justify="space-between" wrap="wrap" align="center">
                <a-space direction="vertical" :size="0">
                  <span>Actual Shoot</span>
                  <span class="bold">{{
                    data[1].toLocaleString('id-ID')
                  }}</span>
                </a-space>
                <a-space direction="vertical" :size="0">
                  <span>Target Shoot 1</span>
                  <span class="bold">{{
                    data[2].toLocaleString('id-ID')
                  }}</span>
                </a-space>
                <a-space direction="vertical" :size="0">
                  <span>Target Shoot 2</span>
                  <span class="bold">{{
                    data[3].toLocaleString('id-ID')
                  }}</span>
                </a-space>
                <a-space direction="vertical" :size="0">
                  <span>Last Maintenance</span>
                  <span class="bold">{{
                    maintenanceStore.getLastMaintenanceDate(key, data[0]) ||
                    'No Record'
                  }}</span>
                </a-space>
              </a-flex>
            </a-card>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
import { useShotKanagata } from '@/stores/dashboard/websocket-kanagata'
import { useLogMaintenanceStore } from '@/stores/report/maintenance'
import { onMounted, nextTick, onUnmounted } from 'vue'

const wsStore = useShotKanagata()
const maintenanceStore = useLogMaintenanceStore()

const fetchMaintenanceData = async () => {
  const keys = Object.keys(wsStore.data)
  if (keys.length === 0) return // Jangan lanjutkan jika data masih kosong

  for (const key of keys) {
    await maintenanceStore.getLastMaintenance(key)
  }
}

const waitForWsData = async () => {
  return new Promise(resolve => {
    const checkData = () => {
      if (Object.keys(wsStore.data).length > 0) {
        resolve() // Selesaikan Promise jika wsStore.data sudah ada isinya
      } else {
        setTimeout(checkData, 100) // Cek lagi dalam 100ms
      }
    }
    checkData()
  })
}

onMounted(async () => {
  wsStore.connect('ws://192.168.148.125:1881/stamping_maintenance')

  // Tunggu hingga wsStore.data memiliki isi sebelum menjalankan fetch
  await waitForWsData()
  await nextTick()

  fetchMaintenanceData()
})

onUnmounted(() => {
  wsStore.disconnected()
})
</script>

<style scoped>
.machine-name {
  font-size: x-large;
}
</style>
