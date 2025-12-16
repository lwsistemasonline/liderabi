<template>
  <q-page class="login-page">
    <!-- Dark Mode Toggle Button -->
    <q-btn
      flat
      dense
      round
      :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
      class="dark-mode-toggle"
      aria-label="Toggle dark mode"
      @click="toggleDarkMode"
    >
      <q-tooltip>{{ $q.dark.isActive ? 'Light Mode' : 'Dark Mode' }}</q-tooltip>
    </q-btn>

    <div class="row full-height">
      <!-- Left Side - Image -->
      <div class="col-12 col-md-6 left-panel flex flex-center">
        <div class="logo-container">
          <img src="../assets/Logo_2025_LideraTI.png" class="logo-image" />
        </div>
      </div>

      <!-- Right Side - Login Form -->
      <div class="col-12 col-md-6 right-panel flex flex-center">
        <q-card flat class="login-card">
          <q-card-section class="text-center q-pb-lg">
            <h4 class="q-ma-none text-weight-bold">Bem-vindo</h4>
            <p class="text-grey-6 q-mt-sm">Entre com suas credenciais</p>
          </q-card-section>

          <q-card-section>
            <q-input
              label="E-mail"
              type="email"
              v-model="User.email"
              outlined
              class="q-mb-md"
              :rules="[val => !!val || 'E-mail é obrigatório']"
            >
              <template v-slot:prepend>
                <q-icon name="email" color="primary" />
              </template>
            </q-input>

            <q-input
              label="Senha"
              v-model="User.senha"
              outlined
              class="q-mb-sm"
              :type="User.IsPassword ? 'password' : 'text'"
              :rules="[val => !!val || 'Senha é obrigatória']"
            >
              <template v-slot:prepend>
                <q-icon name="lock" color="primary" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="User.IsPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="User.IsPassword = !User.IsPassword"
                />
              </template>
            </q-input>

            <div class="flex row items-center justify-between q-mt-md q-mb-lg">
              <q-checkbox v-model="User.rememberMe" label="Lembrar-me" color="primary" />
              <router-link class="forgot-link" to="/">Esqueci minha senha</router-link>
            </div>
          </q-card-section>

          <q-card-actions class="q-px-md q-pb-lg">
            <q-btn
              class="full-width"
              label="Entrar"
              color="primary"
              size="lg"
              unelevated
              @click="validateUser"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar, LocalStorage } from 'quasar'
import { useAuthStore } from 'src/stores/module-auth/auth-store'

const $q = useQuasar()
const router = useRouter()
const authStore = useAuthStore()

const User = ref({
  email: 'admin@liderati.com.br',
  senha: 'liderati@2025#',
  rememberMe: false,
  IsPassword: true,
})

function toggleDarkMode() {
  $q.dark.toggle()
  // Save preference to localStorage
  LocalStorage.set('darkMode', $q.dark.isActive)
}

async function validateUser() {
  const payload = {
    email: User.value.email.toLowerCase(),
    password: User.value.senha,
  }
  
  await authStore.login(payload.email, payload.password)

  if (authStore.token !== undefined) {
    router.push({ name: 'main' })
  } else {
    authStore.clear()
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  position: relative;
}

.dark-mode-toggle {
  position: fixed;
  top: 15px;
  right: 15px;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    transform: scale(1.1);
  }
}

.body--dark .dark-mode-toggle {
  background-color: rgba(9, 19, 54, 0.9);
  color: white;

  &:hover {
    background-color: rgba(9, 19, 54, 1);
  }
}

.full-height {
  min-height: 100vh;
}

.left-panel {
  background: linear-gradient(135deg, var(--color-navy-darkest) 0%, var(--color-navy-dark) 50%, var(--color-navy-medium) 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(4, 187, 211, 0.1) 0%, transparent 50%);
    animation: pulse 15s ease-in-out infinite;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

.logo-container {
  z-index: 1;
  text-align: center;
  padding: 2rem;
}

.logo-image {
  width: 600px;
  height: auto;
  max-width: 80%;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.right-panel {
  background-color: #f8f9fa;
  padding: 2rem;
}

.body--dark .right-panel {
  background-color: var(--color-navy-darkest);
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 1rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.body--dark .login-card {
  background: var(--color-navy-dark);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.forgot-link {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-secondary);
    text-decoration: underline;
  }
}

// Mobile adjustments
@media (max-width: 1023px) {
  .left-panel {
    min-height: 250px;
    padding: 1rem 0.5rem;
  }

  .logo-container {
    padding: 0.5rem;
  }

  .logo-image {
    width: 375px; /* Keep the width */
    max-width: 95%; /* Increase to use more space */
  }

  .right-panel {
    padding: 1.5rem;
  }
}
</style>
