<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>{{ appTitle }}</q-toolbar-title>

        <!-- Dark Mode Toggle -->
        <q-btn flat dense round :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'" aria-label="Toggle dark mode"
          @click="toggleDarkMode">
          <q-tooltip>{{ $q.dark.isActive ? 'Light Mode' : 'Dark Mode' }}</q-tooltip>
        </q-btn>

        <div class="q-ml-sm">{{ appName }} v{{ appVersion }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered
      :class="['drawer-container', $q.dark.isActive ? 'bg-navy-dark' : '']">
      <div class="drawer-wrapper">
        <!-- Header Section (Logo + User Info) -->
        <div class="drawer-header">
          <div class="q-mt-md" @click="$router.push({ name: 'main' })">
            <a href="#">
              <div class="logo flex flex-center">
                <img src="../assets/Logo2025_simbolo.png" style="width: 120px; height: 120px" />
              </div>
            </a>
          </div>

          <q-separator />

          <div class="q-mx-md">
            <q-item v-ripple>
              <q-item-section>
                <q-item-label class="text-blue text-bold">{{ userName }}</q-item-label>
                <q-item-label class="text-brown" caption>{{ userMail }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-avatar rounded size="48px">
                  <img src="https://cdn.quasar.dev/img/avatar.png" />
                </q-avatar>
              </q-item-section>
            </q-item>
          </div>

          <q-separator />
        </div>

        <!-- Scrollable Menu Section -->
        <div class="drawer-menu">
          <q-list>
            <q-item-label class="flex flex-center" header> Menu de Opcoes </q-item-label>
            <MenuItem v-for="item in menuItems" :key="item.title" :item="item" />
          </q-list>
        </div>

        <!-- Footer Section (Sair Button) -->
        <div class="drawer-footer">
          <q-btn label="Sair" flat icon="logout" class="full-width btn-sair" @click="logout" />
        </div>
      </div>
    </q-drawer>

    <q-page-container class="page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar, LocalStorage } from 'quasar'
import MenuItem from 'components/MenuItem.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/module-auth/auth-store'

const $q = useQuasar()

// Environment variables
const appVersion = import.meta.env.VITE_APP_VERSION || '1.0.0'
// const appHost = import.meta.env.VITE_APP_HOST || 'localhost'
const appTitle = import.meta.env.VITE_APP_TITLE || 'Power BI Report'
const appName = import.meta.env.VITE_APP_NAME || 'Report BI'

const router = useRouter()
const authStore = useAuthStore()

const userName = ref(authStore.name)
const userMail = ref(authStore.email)

const menuItems = [
  {
    title: 'Configuração',
    icon: 'settings',
    caption: 'Configurações do sistema',
    expanded: false,
    children: [
      {
        title: 'Empresas',
        icon: 'business',
        route: 'empresas',
      },
      {
        title: 'Usuários',
        icon: 'people',
        route: 'usuarios',
      },
      {
        title: 'Perfis',
        icon: 'person',
        route: 'perfis',
      },
      {
        title: 'Log de acesso',
        icon: 'history',
        route: 'log-acesso',
      },
      {
        title: 'Auxiliares',
        icon: 'list',
        route: null,
        children: [
          {
            title: 'Nível',
            icon: 'layers',
            route: 'nivel',
          },
          {
            title: 'Grupo da Empresa',
            icon: 'group',
            route: 'grupo-empresa',
          },
          {
            title: 'Tipo de Empresa',
            icon: 'business_center',
            route: 'tipo-empresa',
          },
          {
            title: 'Tipo de objeto',
            icon: 'category',
            route: 'tipo-objeto',
          },
          {
            title: 'Tipo de Plano',
            icon: 'description',
            route: 'tipo-plano',
          },
          {
            title: 'Método de pagamento',
            icon: 'payment',
            route: 'metodo-pagamento',
          },
        ],
      },
    ],
  },
  {
    title: 'Relatórios',
    icon: 'assessment',
    caption: 'Visualizar relatórios Power BI',
    route: 'relatorios',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function toggleDarkMode() {
  $q.dark.toggle()
  // Save preference to localStorage
  LocalStorage.set('darkMode', $q.dark.isActive)
}

function logout() {

  authStore.logout()

  authStore.clear()

  if (authStore.token === undefined) {
    router.push({ name: 'login' })
  }
}

</script>

<style lang="scss" scoped>
.drawer-container {
  :deep(.q-drawer__content) {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}

.drawer-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.drawer-header {
  flex-shrink: 0;
}

.drawer-menu {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.drawer-footer {
  flex-shrink: 0;
}

.page-container {
  background-color: #e8e7e7;
}

.body--dark .page-container {
  background-color: #121826;
}

.btn-sair {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0;
  color: var(--color-gray-medium);
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: var(--color-gray-dark);
  }
}

// Dark mode styling for the button
.body--dark .btn-sair {
  border-top-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.9);
  }
}
</style>
