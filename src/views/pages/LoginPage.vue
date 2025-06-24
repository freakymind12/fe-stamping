<template>
  <a-flex justify="center" align="center" class="register-container">
    <a-card class="register-card" :bordered="false">
      <a-flex justify="flex-end" wrap="wrap" style="margin-bottom: 1rem">
        <TranslateGoogle />
      </a-flex>
      <a-flex justify="center" align="center" gap="small" vertical>
        <a-flex
          justify="center"
          align="center"
          gap="large"
          class="logo-img"
          wrap="wrap"
        >
          <a-image :src="hrs" :width="100" :preview="false" />
          <h2 :class="{ 'logo-name': true, 'intro-active': isActive }">
            STAMPING<br />
            IOT PORTAL
          </h2>
        </a-flex>
        <p style="font-size: 1rem; color: gray; margin-bottom: 0px">
          Login with your account
        </p>
      </a-flex>
      <a-form :model="form" @finish="loginUser" layout="vertical">
        <a-form-item
          label="Email"
          name="email"
          :rules="[
            {
              type: 'email',
              required: true,
              message: 'Please input your email!',
              trigger: 'blur',
            },
          ]"
        >
          <a-input v-model:value="form.email" placeholder="Email" />
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[
            {
              required: true,
              message: 'Please input your password!',
              trigger: 'blur',
            },
          ]"
        >
          <a-input-password
            v-model:value="form.password"
            placeholder="Password"
          />
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            block
            :loading="iconLoading"
          >
            Login
          </a-button>
        </a-form-item>
      </a-form>
      <p align="center" style="color: gray">
        Don't have an account ?
        <router-link to="/register" class="ant-link"> Sign up</router-link>
      </p>
    </a-card>
  </a-flex>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import hrs from '@/assets/images/hrs.png'
import TranslateGoogle from '@/components/TranslateGoogle.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const form = ref({
  email: '',
  password: '',
})
const iconLoading = ref(false)
const loginUser = () => {
  iconLoading.value = {
    delay: 500,
  }
  setTimeout(() => {
    iconLoading.value = false
    authStore.login(form.value.email, form.value.password)
  }, 2000)
}

// Variable untuk mengatur status animasi
const isActive = ref(false)

onMounted(() => {
  // Set `isActive` menjadi true setelah mount untuk memicu animasi
  setTimeout(() => {
    isActive.value = true
  }, 100)
})

onUnmounted(() => {
  isActive.value = false
})
</script>

<style scoped>
.register-container {
  height: 100dvh;
  background: #f0f2f5 url('@/assets/images/auth-background.jpg') no-repeat
    center center;
  background-size: cover;
}

.register-card {
  padding: 5px;
  border-radius: 8px;
  width: 30%;
  background: rgba(255, 255, 255, 0.5); /* Warna transparan */
  backdrop-filter: blur(10px); /* Efek blur */
  box-shadow:
    0px 5px 15px rgba(0, 0, 0, 0.2),
    0px 10px 30px rgba(0, 0, 0, 0.15);
}

.register-card .ant-card-body {
  padding: 0;
}

.a-button {
  width: 100%;
}

.ant-link {
  color: #000000;
  text-decoration: none;
  font-weight: 600;
}
.ant-link:hover {
  text-decoration: underline; /* Underline on hover */
}

.logo-name {
  margin-bottom: 0px;
  font-weight: 800;
  opacity: 0; /* Start with hidden */
  transform: scale(0.8); /* Mulai dengan ukuran lebih kecil */
  transition:
    opacity 0.8s ease-out,
    transform 0.8s ease-out;
}

.logo-name.intro-active {
  opacity: 1; /* Setelah kelas ditambahkan, elemen terlihat */
  transform: scale(1); /* Kembali ke ukuran normal */
}

.logo-img:hover {
  cursor: pointer;
}
</style>
