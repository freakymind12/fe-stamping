<template>
  <BaseTable
    :download-menu="true"
    :action-table="true"
    :add-menu="true"
    :page-size="20"
    table-title="PCA"
    :show-page-size="false"
    height="300px"
    :cols="cols"
    :data="pcaStore.pcas"
    @edit-item="handleEdit"
    @delete-item="handleDelete"
    @add-item="handleAdd"
  />

  <Teleport to="body">
    <BaseModal
      :visible="modal.visible"
      @close="handleClose"
      :modal-title="modal.title"
      :width="700"
    >
      <template #body>
        <PcaForm :data="modal.data" :mode="modal.mode" @close="handleClose" />
      </template>
    </BaseModal>
  </Teleport>
</template>

<script setup>
import BaseTable from '@/components/BaseTable.vue'
import BaseModal from '@/components/BaseModal.vue'
import PcaForm from './component/PcaForm.vue'
import { usePcaStore } from '@/stores/master/pca'
import { onMounted, ref } from 'vue'

const pcaStore = usePcaStore()

const modal = ref({
  title: '',
  data: null,
  mode: null,
  visible: false,
})
const cols = ref([
  {
    field: 'id_pca',
    title: 'ID PCA',
    sort: true,
  },
  {
    field: 'id_machine',
    title: 'Machine',
    sort: true,
  },
  {
    field: 'id_product',
    title: 'DP Code',
    sort: true,
  },
  {
    field: 'id_kanagata',
    title: 'Kanagata',
    sort: true,
  },
  {
    field: 'speed',
    title: 'SPM',
    sort: true,
  },
  {
    field: 'cavity',
    title: 'Cavity',
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
  pcaStore.get()
})
</script>
