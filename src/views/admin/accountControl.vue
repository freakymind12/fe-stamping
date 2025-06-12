<template>
  <div>
    <!-- WIDGET -->
    <a-row :gutter="[16, 16]">
      <BaseWidget
        suffix="Persons"
        title="Total User"
        :value="userStore.totalUsers.total"
      >
        <template #icon> <UsergroupAddOutlined /> </template>
      </BaseWidget>
      <BaseWidget
        suffix="Persons"
        title="Admin Role"
        :value="userStore.totalUsers.admin"
      >
        <template #icon> <UserOutlined /> </template>
      </BaseWidget>
      <BaseWidget
        suffix="Persons"
        title="Staff Role"
        :value="userStore.totalUsers.staff"
      >
        <template #icon> <UserOutlined /> </template>
      </BaseWidget>
      <BaseWidget
        suffix="Persons"
        title="Viewer Role"
        :value="userStore.totalUsers.viewer"
      >
        <template #icon> <UserOutlined /> </template>
      </BaseWidget>
    </a-row>
    <!-- TABLE -->

    <BaseTable
      :download-menu="true"
      :action-table="true"
      table-title="User Account Control"
      :cols="cols"
      :data="userStore.usersList"
      @edit-item="handleEdit"
      @delete-item="handleDelete"
      class="table-admin"
    >
      <template #created_at="{ value }">
        {{ dayjs(value.created_at).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
      <template #updated_at="{ value }">
        {{ dayjs(value.updated_at).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
      <template #roles="{ value }">
        <a-tag
          class="bold"
          :color="
            value.roles == 'admin'
              ? 'green'
              : value.roles == 'staff'
                ? 'purple'
                : 'volcano'
          "
          >{{ value.roles.toUpperCase() }}</a-tag
        >
      </template>
    </BaseTable>

    <!-- MODAL FORM -->
    <BaseModal
      :visible="visible"
      @close="handleClose"
      :modal-title="modal.title"
    >
      <template #body>
        <AdminForm :data="modal.data" :mode="modal.mode" @close="handleClose" />
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { UserOutlined, UsergroupAddOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import BaseWidget from '../../components/BaseWidget.vue'
import BaseTable from '@/components/BaseTable.vue'
import AdminForm from './component/AdminForm.vue'
import dayjs from 'dayjs'

const userStore = useUserStore()
const cols = ref([
  {
    field: 'username',
    title: 'Username',
    sort: true,
  },
  {
    field: 'email',
    title: 'Email',
    sort: true,
  },
  {
    field: 'roles',
    title: 'Role',
    sort: true,
  },
  {
    field: 'updated_at',
    title: 'Updated At',
    sort: true,
  },
  {
    field: 'actions',
    title: 'Actions',
    sort: false,
  },
])
const visible = ref(false)
const modal = ref({
  title: '',
  data: null,
  mode: '',
})

const handleEdit = item => {
  visible.value = !visible.value
  modal.value.title = 'Edit Data'
  modal.value.data = item
  modal.value.mode = 'edit'
}

const handleDelete = item => {
  visible.value = !visible.value
  modal.value.title = 'Delete Data'
  modal.value.data = item
  modal.value.mode = 'delete'
}

const handleClose = () => {
  modal.value.visible = false
  modal.value.mode = null
}
onMounted(() => {
  userStore.fetchUsers()
})
</script>

<style scoped>
.table-admin {
  max-height: 100%;
}
</style>
