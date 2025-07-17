<template>
  <div>
    <a-row :gutter="[16, 16]">
      <a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <ShotMonitor />
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <HistoryMaintenance />
      </a-col>
      <a-tooltip title="Reading Guide" placement="left">
        <div class="float-button" @click="handleOpen()">
          <QuestionCircleOutlined />
        </div>
      </a-tooltip>
      <Teleport to="body">
        <BaseModal :centered="true" :visible="modal.visible" @close="handleClose" :modal-title="modal.title"
          :width="1000">
          <template #body>
            <a-flex justify="center" vertical gap="large" align="center">
              <a-image :width="750" :src="CardImage" alt="Card Identification" :preview="false" />
              <TableReadingGuideShot />
            </a-flex>
          </template>
        </BaseModal>
      </Teleport>
    </a-row>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useWsDashboardStore } from '@/stores/dashboard/websocket-dashboard';
import { useMachineShotMonitorStore } from '@/stores/dashboard/machine-shot-monitor';
import { useMachineStore } from '@/stores/master/machine';
import { usePcaStore } from '@/stores/master/pca';
import { useKanagataResetCodeStore } from '@/stores/master/kanagata_reset_code';
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import BaseModal from '@/components/BaseModal.vue';
import ShotMonitor from './components/ShotMonitor.vue';
import HistoryMaintenance from './components/HistoryMaintenance.vue';
import CardImage from '@/assets/images/card_shoot_kanagata.png'
import TableReadingGuideShot from './components/TableReadingGuideShot.vue';

const kanagataResetCodeStore = useKanagataResetCodeStore()
const pcaStore = usePcaStore()
const machineStore = useMachineStore()
const machineShotStore = useMachineShotMonitorStore()
const wsStore = useWsDashboardStore()

const modal = ref({
  title: 'Reading Guide',
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

onMounted(async () => {
  await machineStore.get()
  await pcaStore.get()
  await kanagataResetCodeStore.get()
  machineShotStore.filter.id_machine = machineStore.machines[0]?.id_machine
  machineShotStore.filter.part = kanagataResetCodeStore.data[0]?.name
  wsStore.connect('ws://192.168.148.125:5003/polling-data')
})

onUnmounted(() => {
  wsStore.disconnected()
})
</script>

<style scoped>
.float-button {
  position: fixed;
  bottom: 2%;
  right: 30px;
  background-color: #264D8E;
  color: #fff;
  padding: 10px 15px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s;
  font-size: 20px;
  /* Animasi pulse */
  animation: pulse 1.5s infinite;
}

.float-button:hover {
  opacity: 1;
}
</style>
