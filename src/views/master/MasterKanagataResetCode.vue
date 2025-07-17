<template>
  <BaseTable
    :download-menu="true"
    :action-table="true"
    :add-menu="true"
    :page-size="20"
    table-title="Kanagata Reset Code"
    :show-page-size="false"
    height="300px"
    :cols="cols"
    :data="kanagataResetCodeStore.data"
    @edit-item="handleEdit"
    @delete-item="handleDelete"
    @add-item="handleAdd"
  />

  <Teleport to="body">
    <BaseModal
      :visible="modal.visible"
      @close="handleClose"
      :modal-title="modal.title"
    >
      <template #body>
        <KanagataResetCodeForm
          :data="modal.data"
          :mode="modal.mode"
          @close="handleClose"
        />
      </template>
    </BaseModal>
  </Teleport>
</template>

<script setup>
import KanagataResetCodeForm from './component/KanagataResetCodeForm.vue'
import BaseModal from '@/components/BaseModal.vue'
import BaseTable from '@/components/BaseTable.vue'
import { useKanagataResetCodeStore } from '@/stores/master/kanagata_reset_code'
import { onMounted, ref } from 'vue'

const kanagataResetCodeStore = useKanagataResetCodeStore()

const modal = ref({
  title: '',
  data: null,
  mode: null,
  visible: false,
})
const cols = ref([
  {
    field: 'code',
    title: 'Reset Code',
    sort: true,
  },
  {
    field: 'name',
    title: 'Name Part',
    sort: true,
  },
  {
    field: 'actions',
    title: 'Actions',
    sort: false,
  },
])

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

onMounted(() => {
  kanagataResetCodeStore.get()
})
</script>
