<template>
  <div>
    <a-row :gutter="[16, 16]">
      <a-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <MasterPca />
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <MasterKanagata />
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <MasterMachine />
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <MasterProduct />
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <MasterKanagataResetCode />
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import MasterKanagata from './MasterKanagata.vue'
import MasterMachine from './MasterMachine.vue'
import MasterProduct from './MasterProduct.vue'
import MasterPca from './MasterPca.vue'
import MasterKanagataResetCode from './MasterKanagataResetCode.vue'
</script>
