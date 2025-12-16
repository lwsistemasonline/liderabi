<template>
  <q-page class="q-pa-md">
    <q-card v-if="ModeSearch">
      <q-card-section>
        <div class="row items-center justify-between">
          <div class="text-h6">Tipo de Empresa</div>
          <q-btn flat round dense icon="close" @click="close" />
        </div>
        <div class="text-subtitle2 text-grey">Manutenção de tipos de empresa</div>
      </q-card-section>
      <q-card-section>
        <q-table :rows="companyTypeStore.companyTypes" :columns="columns" row-key="id" :pagination="{ rowsPerPage: 10 }"
          :loading="loading" flat bordered>
          <template v-slot:body-cell-edit="props">
            <q-td :props="props">
              <div class="row items-center" style="width: 100%">
                <q-btn flat round dense icon="edit" color="primary" size="sm" @click="editRow(props.row)">
                  <q-tooltip>Editar</q-tooltip>
                </q-btn>
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-delete="props">
            <q-td :props="props">
              <q-btn flat round dense icon="delete" color="negative" size="sm" @click="deleteRow(props.row)">
                <q-tooltip>Excluir</q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <q-card v-if="!ModeSearch">
      <q-card-section>
        <div class="row items-center justify-between">
          <div class="text-h6">Tipo de Empresa</div>
          <q-btn flat round dense icon="close" @click="changeMode" />
        </div>
        <div class="text-subtitle2 text-grey">Edição de tipo de empresa</div>
      </q-card-section>
      <q-card-section>
        <q-form>
          <div class="row">
            <q-input v-model="companyTypeStore.companyType.name" label="Nome" outlined dense stack-label capitalize class="col-12"
              required />
          </div>

          <div class="row full-width q-mt-md">
            <div class="col-4">
              <div class="row full-width">
                <span class="row items-center full-width text-subtitle2 text-grey">Criado em</span>
                <span class="row items-center full-width text-subtitle2 text-grey">{{
                  formatDateBrazil(companyTypeStore.companyType.createdAt)
                  }}</span>
              </div>
            </div>
            <div class="col-4">
              <div class="row full-width">
                <span class="row items-center full-width text-subtitle2 text-grey">Atualizado em</span>
                <span class="row items-center full-width text-subtitle2 text-grey">{{
                  formatDateBrazil(companyTypeStore.companyType.updatedAt)
                  }}</span>
              </div>
            </div>
            <div class="col-4" v-if="companyTypeStore.companyType.deletedAt">
              <div class="row full-width">
                <span class="row items-center full-width text-subtitle2 text-grey">Excluído em</span>
                <span class="row items-center full-width text-subtitle2 text-grey">{{
                  formatDateBrazil(companyTypeStore.companyType.deletedAt)
                  }}</span>
              </div>
            </div>
          </div>

          <div class="row full-width q-mt-lg">
            <div class="col-8">
              <q-btn dense label="Salvar" color="accent" no-caps style="width: 100px" @click="saveCompanyType" />
              <q-btn dense label="Novo" color="secondary" no-caps style="width: 100px" @click="newCompanyType"
                class="q-ml-md" />
            </div>
            <div class="col-4" v-if="!companyTypeStore.companyType.deletedAt">
              <q-btn dense label="Excluir" color="negative" no-caps style="width: 100px" @click="deleteCompanyType"
                class="float-right" />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useCompanyTypeStore } from 'src/stores/module-company/company.type-store'
import { formatDateBrazil } from 'src/utils/formatDateBrazil'
//import { Notify } from 'quasar'

const companyTypeStore = useCompanyTypeStore()
const router = useRouter()
const loading = ref(false)
const ModeSearch = ref(true)

const columns = ref(
  [
    {
      name: 'edit',
      label: '',
      field: 'edit',
      align: 'left',
      sortable: false
    },
    {
      name: 'name',
      label: 'Nome',
      field: 'name',
      align: 'left',
      sortable: true
    },
    {
      name: 'createdAt',
      label: 'Data de Criação',
      field: 'createdAt',
      align: 'left',
      sortable: true,
      format: (val) => val ? new Date(val).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).replace(',', '') : '-'
    },
    {
      name: 'updatedAt',
      label: 'Data de Atualização',
      field: 'updatedAt',
      align: 'left',
      sortable: true,
      format: (val) => val ? new Date(val).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).replace(',', '') : '-'
    },
    {
      name: 'deletedAt',
      label: 'Data de Exclusão',
      field: 'deletedAt',
      align: 'left',
      sortable: true,
      format: (val) => val ? new Date(val).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).replace(',', '') : '-'
    },
    {
      name: 'delete',
      label: '',
      field: 'delete',
      align: 'left',
      sortable: false
    }
  ]
)

function close() {
  companyTypeStore.clear()
  router.back()
}

async function changeMode() {
  ModeSearch.value = !ModeSearch.value

  await companyTypeStore.getAll()
}

async function editRow(row) {
  await companyTypeStore.getById(row.id)

  changeMode()
}

async function deleteRow(row) {
  await companyTypeStore.delete(row.id)

  await companyTypeStore.getAll()
}

async function deleteCompanyType() {
  await companyTypeStore.delete(companyTypeStore.companyType.id)

  changeMode()

  companyTypeStore.clear()

  await companyTypeStore.getAll()

}

async function saveCompanyType() {
  if (companyTypeStore.companyType.id === undefined) {
    await companyTypeStore.create()
  } else {
    await companyTypeStore.update(companyTypeStore.companyType.id)
  }
}

async function newCompanyType() {
  companyTypeStore.clear()
}

onMounted(async () => {
  loading.value = true
  try {
    await companyTypeStore.getAll()
  } finally {
    loading.value = false
  }
})

</script>

