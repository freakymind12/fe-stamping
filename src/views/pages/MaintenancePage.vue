<template>
  <a-flex justify="center" align="center" style="height: 80vh" vertical>
    <a-image
      src="/src/assets/images/maintenance.png"
      :preview="false"
      :width="500"
    />
    <BaseCountdown title="This page is under construction, will be ready in" />
  </a-flex>
</template>

<script setup>
import BaseCountdown from '@/components/BaseCountdown.vue'
</script>
