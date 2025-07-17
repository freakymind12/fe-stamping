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
    state: 'Running',
    color: '#2eb85c',
    description: 'Machine on state auto running production condition'
  },
  {
    state: 'Stop',
    color: '#f56c6c',
    description: 'Machine on state stop condition'
  },
  {
    state: 'Dandori',
    color: '#ffb200',
    description: 'Machine on state dandori (change model / preparation)'
  },
  {
    state: 'Idle',
    color: '#3D74B6',
    description: 'Machine on state idle (no production schedule)'
  },
];
</script>

<style scoped></style>
