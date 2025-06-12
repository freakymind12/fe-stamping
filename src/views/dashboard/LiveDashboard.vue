<template>
  <a-row :gutter="[16, 16]">
    <a-col
      :xs="{ span: 24 }"
      :lg="{ span: 12 }"
      v-for="(data, index) in wsStore.data"
      :key="index"
    >
      <a-card
        size="small"
        class="machine-card"
        :hoverable="true"
        :class="{
          off: data[1] === 'Disconnected',
          run: data[2] === 'RUN',
          stop: data[2] === 'STOP',
          setting: data[2] === 'SETTING',
        }"
      >
        <!-- Machine Name -->
        <a-flex justify="space-between" wrap="wrap" align="center">
          <span class="bold machine-name">{{ data[0] }}</span>
          <a-space :size="5">
            <span class="bold large">Kanagata: </span>
            <span
              v-for="(kanagata, index) in data[5]"
              :key="index"
              class="bold large"
              >{{ kanagata }}</span
            >
          </a-space>
          <a-space :size="5">
            <SettingOutlined :spin="true" v-if="data[1] === 'Connected'" />
            <LoadingOutlined v-else />
            <span class="bold large">{{ data[1] }}</span>
          </a-space>
        </a-flex>
        <!-- Product Name  -->
        <a-flex justify="space-between" wrap="wrap" align="center">
          <a-space
            direction="vertical"
            :size="0"
            v-for="(product, index) in data[4]"
            :key="index"
          >
            <span class="large">Product [{{ index + 1 }}]</span>
            <span class="bold large">{{ product }}</span>
          </a-space>
        </a-flex>
        <!-- Status, Kadoritsu, Speed, Output -->
        <a-flex justify="space-between" wrap="wrap" align="center">
          <a-space :size="0" direction="vertical" class="large">
            <span>Status Line</span>
            <span class="bold">{{ data[2] }}</span>
          </a-space>
          <a-space
            :size="0"
            direction="vertical"
            class="large"
            v-if="data[2] !== 'RUN'"
          >
            <span>Stop Cause</span>
            <span class="bold">{{ data[3] }}</span>
          </a-space>
          <a-space :size="0" direction="vertical" class="large" v-else>
            <span>Speed Machine</span>
            <span class="bold">{{ data[14].toLocaleString() }} SPM</span>
          </a-space>
          <a-space :size="0" direction="vertical" class="large">
            <span>Output / Target</span>
            <span class="bold"
              >{{ data[6][0].toLocaleString() }} /
              {{ data[7][0].toLocaleString() }} pins
            </span>
          </a-space>
          <a-space :size="0" direction="vertical" class="large">
            <span>Reject Setting</span>
            <span class="bold">{{ data[12].toLocaleString() }} pins</span>
          </a-space>
          <a-space :size="0" direction="vertical" class="large">
            <span>Dummy</span>
            <span class="bold">{{ data[16].toLocaleString() }} pins</span>
          </a-space>
        </a-flex>
        <!-- Reject Setting, Dandori Time, Stop Time, Production Time -->
        <a-flex justify="space-between" wrap="wrap" align="center">
          <a-space :size="0" direction="vertical" class="large">
            <span>Kadoritsu</span>
            <span class="bold">{{ data[11] }} %</span>
          </a-space>
          <a-space :size="0" direction="vertical" class="large">
            <span>Production Time</span>
            <span class="bold">{{ data[10].toLocaleString() }} min</span>
          </a-space>
          <a-space :size="0" direction="vertical" class="large">
            <span>Dandori Time</span>
            <span class="bold">{{ data[15].toLocaleString() }} min</span>
          </a-space>
          <a-space :size="0" direction="vertical" class="large">
            <span>Stop Time</span>
            <span class="bold">{{ data[9].toLocaleString() }} min</span>
          </a-space>
        </a-flex>
        <!-- Alarm -->
        <a-flex wrap="wrap" align="center">
          <span class="large" v-if="data[13].length > 0"
            >Alarms [
            <a-tag
              class="bold"
              v-for="(alarm, index) in data[13]"
              :key="index"
              color="#183B4E"
              >{{ alarm }}</a-tag
            >]
          </span>
        </a-flex>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
import { useWebsocketStore } from '@/stores/dashboard/websocket-machine'
import { onMounted, onUnmounted } from 'vue'
import { SettingOutlined, LoadingOutlined } from '@ant-design/icons-vue'
const wsStore = useWebsocketStore()
onMounted(() => {
  wsStore.connect('ws://192.168.148.125:1881/stamping_live')
})

onUnmounted(() => {
  wsStore.disconnected()
})
</script>

<style scoped>
.machine-name {
  font-size: xx-large;
}

.machine-card {
  color: white;
}
</style>
