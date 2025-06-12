<template>
  <div>
    <FilterPlan @add-item="handleAdd" />
    <CalendarPlan @edit-plan="handleEdit" @delete-plan="handleDelete($event)" />

    <Teleport to="body">
      <BaseModal
        :visible="modal.visible"
        @close="handleClose"
        :modal-title="modal.title"
      >
        <template #body>
          <PlanForm
            :data="modal.data"
            :mode="modal.mode"
            @close="handleClose"
          />
        </template>
      </BaseModal>
    </Teleport>
  </div>
</template>

<script setup>
import { useMachineStore } from '@/stores/master/machine'
import { usePlanStore } from '@/stores/report/plan'
import { usePcaStore } from '@/stores/master/pca'
import { onMounted, ref } from 'vue'
import CalendarPlan from './components/CalendarPlan.vue'
import FilterPlan from './components/FilterPlan.vue'
import BaseModal from '@/components/BaseModal.vue'
import PlanForm from './components/PlanForm.vue'

const planStore = usePlanStore()
const machineStore = useMachineStore()
const pcaStore = usePcaStore()

const modal = ref({
  title: '',
  data: null,
  mode: '',
  visible: false,
})

const handleClose = () => {
  modal.value.visible = false
  modal.value.mode = null
}

const handleAdd = () => {
  modal.value.visible = !modal.value.visible
  modal.value.data = null
  modal.value.title = 'Add Data'
  modal.value.mode = 'add'
}

const handleEdit = item => {
  modal.value.visible = !modal.value.visible
  modal.value.title = 'Edit Data'
  modal.value.data = item
  modal.value.mode = 'edit'
}

const handleDelete = item => {
  modal.value.visible = !modal.value.visible
  modal.value.title = 'Delete Data'
  modal.value.data = item
  modal.value.mode = 'delete'
}

onMounted(async () => {
  await machineStore.get()
  await pcaStore.get()
  planStore.query.id_machine = machineStore.machines[0]?.id_machine
})
</script>
