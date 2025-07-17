<template>
  <div style="width: 50%;">
    <a-table size="small" :pagination="false" :columns="columns" :data-source="data" bordered>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex == 'state'">
          <a-tag :color="record.color">{{ record.state }}</a-tag>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
const columns = [
  {
    title: 'Color State',
    dataIndex: 'state',
    width: 100
  },
  {
    title: 'Description',
    dataIndex: 'description',
    width: 400
  }
];
const data = [
  {
    state: 'Normal',
    color: '#2eb85c',
    description: 'Shot counter part bellow reminder target'
  },
  {
    state: 'Alarm Reminder',
    color: '#ffb200',
    description: 'Shot counter part reminder is reached'
  },
  {
    state: 'Not Used',
    color: '#5a5c69',
    description: 'Shot counter part not used on kanagata'
  },
  {
    state: 'Force Stop',
    color: '#f56c6c',
    description: 'Shot counter part for force stop machine is reached'
  },
];
</script>

<style scoped></style>
