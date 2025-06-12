<template>
  <a-row :gutter="[16, 16]">
    <a-col
      :xs="24"
      :lg="24"
      :sm="24"
      :md="24"
      :xl="12"
      v-for="(machineData, key) in wsStore.data"
      :key="key"
    >
      <a-card
        size="small"
        class="machine-card"
        :hoverable="true"
        :class="{
          off: machineData.status.power_state === 0,
          run: machineData.status.status_line === 0,
          stop: machineData.status.status_line === 1,
          setting: machineData.status.status_line === 2,
        }"
      >
        <a-flex justify="space-between" wrap="wrap" align="center">
          <!-- Machine Name -->
          <span class="bold machine-name">{{
            key.replace(/_/g, ' ').toUpperCase()
          }}</span>
          <!-- Kanagata -->
          <a-space :size="4" class="large">
            <span>Kanagata:</span>
            <a-space :size="0" wrap>
              <a-tag
                class="bold"
                color="#18230F"
                v-for="(kanagata, index) in pcaData(
                  machineData.production.pca,
                  'id_kanagata',
                )"
                :key="index"
              >
                {{ kanagata }}
              </a-tag>
            </a-space>
          </a-space>
          <!-- Power State -->
          <a-space :size="5">
            <SettingOutlined
              :spin="true"
              v-if="machineData.status.power_state === 1"
            />
            <LoadingOutlined v-else />
            <span class="bold large">{{
              machineData.status.power_state === 1
                ? 'Connected'
                : 'Disconnected'
            }}</span>
          </a-space>
        </a-flex>

        <a-flex justify="space-between" wrap="wrap" align="center">
          <!-- Product Name -->
          <a-space
            direction="vertical"
            :size="0"
            v-for="(product, index) in pcaData(
              machineData.production.pca,
              'id_product',
            )"
            :key="index"
          >
            <span class="large">Product [{{ index + 1 }}]</span>
            <span class="bold large">{{ product }}</span>
          </a-space>
        </a-flex>

        <a-flex justify="space-between" wrap="wrap" align="center">
          <!-- Status Line -->
          <a-space :size="0" direction="vertical" class="large">
            <span>Status Line</span>
            <span class="bold">{{
              statusLineStore.findStatusById(machineData.status.status_line)
                .name
            }}</span>
          </a-space>
          <!-- Stop Cause -->
          <a-space
            :size="0"
            direction="vertical"
            class="large"
            v-if="machineData.status.status_line !== 0"
          >
            <span>Stop Cause</span>
            <span class="bold">
              {{
                stopCauseStore.findStopCauseById(
                  machineData.status.stop_condition,
                ).name
              }}</span
            >
          </a-space>
          <!-- Speed Machine -->
          <a-space :size="0" direction="vertical" class="large" v-else>
            <span>Speed Machine</span>
            <span class="bold"
              >{{ machineData.production.speed.toLocaleString() }} SPM</span
            >
          </a-space>
          <!-- Output / Target -->
          <a-space :size="0" direction="vertical" class="large">
            <span>Output / Target</span>
            <span class="bold"
              >{{
                getOutput(
                  machineData.production.output,
                  pcaData(machineData.production.pca, 'cavity'),
                ).toLocaleString()
              }}
              /
              {{
                getTargetOutput(
                  machineData.production.stop_time,
                  machineData.production.dandori_time,
                  machineData.production.production_time,
                  pcaData(machineData.production.pca, 'speed'),
                  pcaData(machineData.production.pca, 'cavity'),
                ).toLocaleString()
              }}
              pins</span
            >
          </a-space>
          <!-- Reject Setting -->
          <a-space :size="0" direction="vertical" class="large">
            <span>Reject Setting</span>
            <span class="bold">
              {{
                getOutput(
                  machineData.production.reject_setting,
                  pcaData(machineData.production.pca, 'cavity'),
                ).toLocaleString()
              }}
              pins
            </span>
          </a-space>
          <!-- Dummy-->
          <a-space :size="0" direction="vertical" class="large">
            <span>Dummy</span>
            <span class="bold">
              {{
                getOutput(
                  machineData.production.dummy,
                  pcaData(machineData.production.pca, 'cavity'),
                ).toLocaleString()
              }}
              pins
            </span>
          </a-space>
        </a-flex>

        <a-flex justify="space-between" wrap="wrap" align="center">
          <a-space :size="0" direction="vertical" class="large">
            <span>Kadoritsu</span>
            <span class="bold">
              {{
                getKadoritsu(
                  getOutput(
                    machineData.production.output,
                    pcaData(machineData.production.pca, 'cavity'),
                  ),
                  getTargetOutput(
                    machineData.production.stop_time,
                    machineData.production.dandori_time,
                    machineData.production.production_time,
                    pcaData(machineData.production.pca, 'speed'),
                    pcaData(machineData.production.pca, 'cavity'),
                  ),
                )
              }}
              %
            </span>
          </a-space>

          <a-space :size="0" direction="vertical" class="large">
            <span>Production Time</span>
            <span class="bold">
              {{ secToMin(machineData.production.production_time) }} min
            </span>
          </a-space>

          <a-space :size="0" direction="vertical" class="large">
            <span>Stop Time</span>
            <span class="bold">
              {{ secToMin(machineData.production.stop_time) }} min
            </span>
          </a-space>

          <a-space :size="0" direction="vertical" class="large">
            <span>Dandori Time</span>
            <span class="bold">
              {{ secToMin(machineData.production.dandori_time) }} min
            </span>
          </a-space>

          <a-space :size="0" direction="vertical" class="large" v-if="machineData.status.status_line != 0">
            <span>Current Stop Time</span>
            <span class="bold">
              {{ formatSecondsToTime(machineData.production.clocking) }}
            </span>
          </a-space>
        </a-flex>

        <a-flex wrap="wrap" align="center">
          <!-- Alarm -->
          <a-space :size="0" direction="vertical" class="large">
            <span>Alarms</span>
            <a-flex wrap="wrap" :gap="3">
              <a-tag
                v-for="(data, index) in getAlarm(machineData.alarm)"
                :key="index"
                class="bold"
                color="#FF5501"
              >
                {{ data }}
              </a-tag>
              <a-tag
                v-if="getAlarm(machineData.alarm).length === 0"
                color="#18230F"
                class="bold"
                >No Alarms</a-tag
              >
            </a-flex>
          </a-space>
        </a-flex>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { usePcaStore } from '@/stores/master/pca'
import { useStatusLineStore } from '@/stores/master/status'
import { useStopCauseStore } from '@/stores/master/stop_cause'
import { SettingOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { useWsDashboardStore } from '@/stores/dashboard/websocket-dashboard'

const statusLineStore = useStatusLineStore()
const pcaStore = usePcaStore()
const wsStore = useWsDashboardStore()
const stopCauseStore = useStopCauseStore()

// Fungsi untuk mendapatkan data pca berdasarkan id_pca
const pcaData = (id_pca, mode) => {
  const idStr = String(id_pca)

  // Fungsi untuk mengambil data berdasarkan mode
  const getPcaData = (id, mode) => {
    const match = pcaStore.findPcaById(Number(id)) || {}
    if (mode === 'id_product') {
      return `${match['name'] || 'Unknown'} - [${match['id_product'] || 'N/A'}]`
    }
    return match[mode] || 'N/A'
  }

  // Jika id_pca lebih dari dua karakter, pisahkan id menjadi dua karakter per id
  if (idStr.length > 2) {
    const ids = idStr.match(/.{1,2}/g) || []
    return ids.map(id => getPcaData(id, mode))
  }

  // Jika hanya ada satu id_pca, langsung ambil data berdasarkan mode
  return [getPcaData(id_pca, mode)]
}

// Fungsi untuk mendapatkan alarm berdasarkan objek alarm
const getAlarm = obj => {
  return Object.keys(obj)
    .filter(key => obj[key] === 1)
    .map(key => {
      return key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
    })
}

// Fungsi untuk mendapatkan target output
const getTargetOutput = (stop, dandori, production, speed, cavity) => {
  const totalTime =
    Number(stop / 60) + Number(dandori / 60) + Number(production / 60)

  const isUniformArray = arr =>
    Array.isArray(arr) && arr.every(val => val === arr[0])

  let s = speed
  let c = cavity

  if (isUniformArray(speed)) s = speed[0]
  if (isUniformArray(cavity)) c = cavity[0]

  const output = Math.round(totalTime * Number(s) * Number(c))
  return isNaN(output) ? 0 : output
}

// Fungsi untuk mendapatkan output
const getOutput = (output, cavity) => {
  const isUniformArray = arr =>
    Array.isArray(arr) && arr.every(val => val === arr[0])

  const c = isUniformArray(cavity) ? cavity[0] : cavity
  return output * c
}

// Fungsi untuk mendapatkan nilai kadoritsu mesin
const getKadoritsu = (output, target) => {
  const kadoritsu = (Number(output) / Number(target)) * 100
  if (isNaN(kadoritsu) || !isFinite(kadoritsu)) {
    return '0.00'
  }

  return kadoritsu.toFixed(2)
}

// Fungsi untuk mengubah detik menjadi menit
const secToMin = seconds => {
  return Number((seconds / 60).toFixed(1)).toLocaleString()
}

const formatSecondsToTime = s => {
  const [hrs, mins, secs] = [
    Math.floor(s / 3600),
    Math.floor((s % 3600) / 60),
    s % 60
  ];
  return `${hrs} hours ${mins} min ${secs} sec`;
};



onMounted(async () => {
  await pcaStore.get() // Mengambil data PCA store
  await statusLineStore.get() // Mengambil data Status Line store
  await stopCauseStore.get()
  wsStore.connect('ws://192.168.148.125:5003/polling-data')
})

onBeforeUnmount(() => {
  wsStore.disconnected()
})
</script>

<style scoped>
.machine-name {
  font-size: 2.1rem;
}

.machine-card {
  color: white;
}
</style>
