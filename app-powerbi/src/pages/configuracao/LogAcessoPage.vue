<template>
  <q-page class="q-pa-md">
    <!-- Search Card -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="row items-center justify-between">
          <div class="text-h6">Log de Acesso</div>
          <q-btn flat round dense icon="close" @click="close" />
        </div>
        <div class="text-subtitle2 text-grey">Histórico de acessos ao sistema</div>
      </q-card-section>
      <q-card-section>
        <q-form>
          <div class="row q-gutter-md">
            <q-input v-model="filter.dateStart" label="Data Inicial" outlined dense stack-label type="date"
              :rules="[val => !!val || 'Data inicial é obrigatória']" class="col-12 col-md-4" style="width: 160px;">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="filter.dateStart" mask="YYYY-MM-DD">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Fechar" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input v-model="filter.dateEnd" label="Data Final" outlined dense stack-label type="date"
              :rules="[val => !!val || 'Data final é obrigatória']" class="col-12 col-md-4" style="width: 160px;">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="filter.dateEnd" mask="YYYY-MM-DD">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Fechar" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input v-model="filter.ip_address" label="IP" outlined dense stack-label class="col-12 col-md-6"
              type="text" style="width: 140px;" />
            <q-select v-model="filter.userId" label="Usuário" outlined dense stack-label type="number"
              :options="usersStore.users" option-value="id" option-label="name" style="width: 200px;" />
            <q-select v-model="filter.companyId" label="Empresa" outlined dense stack-label type="number"
              :options="companyStore.companies" option-value="id" option-label="name" style="width: 300px;" />
          </div>
          <div class="row q-mt-md">
            <q-btn dense label="Buscar" color="primary" no-caps icon="search" @click="searchLogs" :loading="loading"
              style="width: 100px;" />
            <q-btn dense label="Limpar" color="secondary" no-caps icon="clear" class="q-ml-md" @click="clearSearch"
              style="width: 100px;" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <!-- Results Card -->
    <q-card>
      <q-card-section>
        <div class="text-h6">Resultados da Busca</div>
        <div class="text-subtitle2 text-grey">Lista de logs de acesso encontrados</div>
      </q-card-section>
      <q-card-section>
        <q-table :rows="usersLogsStore.userLogs" :columns="columns" row-key="id" :pagination="{ rowsPerPage: 10 }"
          :loading="loading" flat bordered>
          <template v-slot:body-cell-dateLog="props">
            <q-td :props="props">
              {{ props.value ? formatDateBrazil(props.value) : '-' }}
            </q-td>
          </template>
          <template v-slot:body-cell-createdAt="props">
            <q-td :props="props">
              {{ props.value ? formatDateBrazil(props.value) : '-' }}
            </q-td>
          </template>
          <template v-slot:body-cell-updatedAt="props">
            <q-td :props="props">
              {{ props.value ? formatDateBrazil(props.value) : '-' }}
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCompanyStore } from 'src/stores/module-company/company-store'
import { useUsersLogsStore } from 'src/stores/module-users/users.logs-store'
import { useUsersStore } from 'src/stores/module-users/users-store'
import { formatDateBrazil } from 'src/utils/formatDateBrazil'
import { Notify } from 'quasar'

const router = useRouter()
const usersLogsStore = useUsersLogsStore()
const usersStore = useUsersStore()
const companyStore = useCompanyStore()
const loading = ref(false)

const filter = ref({
  dateStart: '',
  dateEnd: '',
  ip_address: '',
  userId: '',
  companyId: '',
})

const columns = ref([
  {
    name: 'name',
    label: 'Nome',
    field: 'name',
    align: 'left',
    sortable: true
  },
  {
    name: 'user',
    label: 'Usuário',
    field: 'user',
    align: 'left',
    sortable: true
  },
  {
    name: 'dateLog',
    label: 'Data do Log',
    field: 'dateLog',
    align: 'left',
    sortable: true
  },
  {
    name: 'userId',
    label: 'ID do Usuário',
    field: 'userId',
    align: 'left',
    sortable: true
  },
  {
    name: 'companyId',
    label: 'ID da Empresa',
    field: 'companyId',
    align: 'left',
    sortable: true
  },
  {
    name: 'createdAt',
    label: 'Data de Criação',
    field: 'createdAt',
    align: 'left',
    sortable: true
  },
  {
    name: 'updatedAt',
    label: 'Data de Atualização',
    field: 'updatedAt',
    align: 'left',
    sortable: true
  }
])

function close() {
  usersLogsStore.clear()
  usersLogsStore.clearSearchFilters()
  usersStore.clear()
  companyStore.clear()

  router.back()
}

async function searchLogs() {
  loading.value = true
  try {

    if (filter.value.dateStart != '' && filter.value.dateEnd != '') {
      await usersLogsStore.findAll(filter.value)
    } else {
      Notify.create({
        message: 'Data inicial e final são obrigatórias',
        color: 'red',
        icon: 'close',
        timeout: 3000,
        position: 'center',
      })
    }
  } catch (error) {
    console.error('Erro ao buscar logs:', error)
  } finally {
    loading.value = false
  }
}

function clearSearch() {
  filter.value = {
    dateStart: '',
    dateEnd: '',
    ip_address: '',
    userId: '',
    companyId: '',
  }
}

onMounted(async () => {
  await usersStore.getAll()
  await companyStore.getAll()
})

</script>
