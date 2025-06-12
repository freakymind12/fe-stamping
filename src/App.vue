<template>
  <a-config-provider :theme="theme">
    <Transition name="fade" mode="in-out">
      <RouterView />
    </Transition>
  </a-config-provider>
</template>

<script setup>
const theme = {
  token: {
    fontFamily: 'Nunito, Arial',
    colorPrimary: '#1F5781',
  },
}
</script>
