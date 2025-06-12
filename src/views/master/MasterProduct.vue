<template>
  <BaseTable
    :download-menu="true"
    :action-table="true"
    :add-menu="true"
    :page-size="20"
    table-title="Product"
    :show-page-size="false"
    height="300px"
    :cols="cols"
    :data="productStore.products"
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
        <ProductForm
          :data="modal.data"
          :mode="modal.mode"
          @close="handleClose"
        />
      </template>
    </BaseModal>
  </Teleport>
</template>

<script setup>
import ProductForm from './component/ProductForm.vue'
import BaseModal from '@/components/BaseModal.vue'
import BaseTable from '@/components/BaseTable.vue'
import { useProductStore } from '@/stores/master/product'
import { onMounted, ref } from 'vue'

const productStore = useProductStore()

const modal = ref({
  title: '',
  data: null,
  mode: '',
  visible: false,
})
const cols = ref([
  {
    field: 'id_product',
    title: 'DP Code',
    sort: true,
  },
  {
    field: 'name',
    title: 'Name',
    sort: true,
  },
  {
    field: 'price',
    title: 'Price',
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
  productStore.get()
})
</script>
