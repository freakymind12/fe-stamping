<template>
  <div>
    <a-row :gutter="[16, 16]">
      <a-col :xs="24" v-for="(dataMachine, key) in wsStore.shot" :key="key">
        <a-card size="small">
          <span class="bold machine-name">
            {{ key }}
          </span>
          <a-row :gutter="[4, 4]" :wrap="true">
            <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6" v-for="(dataShot, index) in dataMachine" :key="index">
              <a-card size="small" :hoverable="true" :class="{
                run: dataShot[1] < dataShot[2],
                setting:
                  dataShot[1] > dataShot[2] && dataShot[1] < dataShot[3],
                dark: dataShot[2] == 0 && dataShot[3] == 0,
              }">
                <a-flex justify="space-between" wrap="wrap" align="center">
                  <span class="bold large"> {{ dataShot[0] }}</span>
                  <a-tooltip title="History Maintenance">
                    <SettingOutlined class="icon-setting" @click="
                      handleOpen({ part: dataShot[0], id_machine: key })
                      " />
                  </a-tooltip>
                </a-flex>
                <a-flex justify="center" style="padding-right: 1rem;">
                  <a-progress stroke-color="black" trailColor="grey" :percent="dataShot[4]" />
                </a-flex>

                <a-flex justify="space-between" wrap="wrap" align="center">
                  <a-space direction="vertical" :size="0">
                    <span>Actual Shoot</span>
                    <span class="bold">{{
                      dataShot[1].toLocaleString('id-ID')
                    }}</span>
                  </a-space>
                  <a-space direction="vertical" :size="0">
                    <span>Target Shot 1</span>
                    <span class="bold">{{
                      dataShot[2].toLocaleString('id-ID')
                    }}</span>
                  </a-space>
                  <a-space direction="vertical" :size="0">
                    <span>Target Shot 2</span>
                    <span class="bold">{{
                      dataShot[3].toLocaleString('id-ID')
                    }}</span>
                  </a-space>
                </a-flex>
              </a-card>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <Teleport to="body">
      <BaseModal :visible="modal.visible" @close="handleClose" :modal-title="modal.title">
        <template #body>
          <DetailKanagata :data="modal.data" />
        </template>
      </BaseModal>
    </Teleport>
  </div>
</template>

<script setup>
import { useWsDashboardStore } from '@/stores/dashboard/websocket-dashboard'
import { onMounted, onUnmounted, ref } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import DetailKanagata from './components/DetailKanagata.vue'
import { SettingOutlined } from '@ant-design/icons-vue'
const wsStore = useWsDashboardStore()

const modal = ref({
  title: 'History Maintenance (Reset Counter)',
  data: null,
  visible: false,
})

const handleClose = () => {
  modal.value.visible = false
}

const handleOpen = data => {
  modal.value.visible = true
  modal.value.data = data
}

onMounted(() => {
  wsStore.connect('ws://192.168.148.125:5003/polling-data')
})

onUnmounted(() => {
  wsStore.disconnected()
})
</script>

<style scoped>
.machine-name {
  font-size: x-large;
}

.dark {
  background-color: #9db2bf;
}

.icon-setting {
  font-size: large;
}

.icon-setting:hover {
  color: #fff;
}
</style>
