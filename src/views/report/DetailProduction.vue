<template>
  <div>
    <FilterDetailProduction />
    <BaseTable
      :download-menu="true"
      :action-table="authStore.user.role === 'admin' ? true : false"
      :add-menu="authStore.user.role === 'admin' ? true : false"
      :page-size="20"
      table-title="Detail Production"
      :show-page-size="false"
      height="520px"
      :cols="cols"
      :data="productionStore.rawProduction.data"
      @edit-item="handleEdit"
      @delete-item="handleDelete"
      @add-item="handleAdd"
    >
      <template #ok="{ value }">
        {{ value.ok.toLocaleString('id-ID') }}
      </template>
      <template #ng="{ value }">
        {{ value.ng.toLocaleString('id-ID') }}
      </template>
      <template #reject_setting="{ value }">
        {{ value.reject_setting.toLocaleString('id-ID') }}
      </template>
      <template #dummy="{ value }">
        {{ value.dummy.toLocaleString('id-ID') }}
      </template>
      <template #production_time="{ value }">
        {{ value.production_time.toLocaleString('id-ID') }}
      </template>
      <template #stop_time="{ value }">
        {{ value.stop_time.toLocaleString('id-ID') }}
      </template>
      <template #dandori_time="{ value }">
        {{ value.dandori_time.toLocaleString('id-ID') }}
      </template>
      <template #qty_plan="{ value }">
        {{ value.qty_plan ? value.qty_plan.toLocaleString('id-ID') : 0 }}
      </template>
      <template #kadoritsu="{ value }">
        {{ value.kadoritsu ? value.kadoritsu.toLocaleString('id-ID') : 0 }}
      </template>
    </BaseTable>
    <Teleport to="body">
      <BaseModal
        :width="600"
        :visible="modal.visible"
        @close="handleClose"
        :modal-title="modal.title"
      >
        <template #body>
          <ProductionForm
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
import { onMounted, ref } from 'vue'
import { useMachineStore } from '@/stores/master/machine'
import { useProductionStore } from '@/stores/report/production'
import { usePcaStore } from '@/stores/master/pca'
import { useAuthStore } from '@/stores/auth'
import FilterDetailProduction from './components/FilterDetailProduction.vue'
import BaseTable from '@/components/BaseTable.vue'
import BaseModal from '@/components/BaseModal.vue'
import ProductionForm from './components/ProductionForm.vue'

const productionStore = useProductionStore()
const machineStore = useMachineStore()
const pcaStore = usePcaStore()
const authStore = useAuthStore()

const modal = ref({
  title: '',
  data: null,
  mode: null,
  visible: false,
})

const cols = ref([
  {
    field: 'date',
    title: 'Date',
    sort: true,
    minWidth: '130px',
  },
  {
    field: 'id_machine',
    title: 'Machine',
    sort: true,
  },
  {
    field: 'id_kanagata',
    title: 'Kanagata',
    sort: true,
  },
  {
    field: 'id_product',
    title: 'DP',
    sort: true,
    minWidth: '150px',
  },
  {
    field: 'name',
    title: 'Product Name',
    sort: true,
  },
  {
    field: 'shift',
    title: 'Shift',
    sort: true,
  },
  {
    field: 'qty_plan',
    title: 'Output Plan',
    sort: true,
  },
  {
    field: 'ok',
    title: 'Good Product',
    sort: true,
  },
  {
    field: 'ng',
    title: 'IPR',
    sort: true,
  },
  {
    field: 'reject_setting',
    title: 'Reject Setting',
    sort: true,
  },
  {
    field: 'dummy',
    title: 'Dummy',
    sort: true,
  },
  {
    field: 'production_time',
    title: 'Production Time',
    sort: true,
  },
  {
    field: 'stop_time',
    title: 'Stop Time',
    sort: true,
  },
  {
    field: 'dandori_time',
    title: 'Dandori Time',
    sort: true,
  },
  {
    field: 'kadoritsu',
    title: 'Kadoritsu',
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

onMounted(async () => {
  await machineStore.get()
  await pcaStore.get()

  productionStore.rawProduction.machine = machineStore.machines[0]?.id_machine
})
</script>
