<template>
  <q-page class="q-pa-md">
    <q-card v-if="ModeSearch">
      <q-card-section>
        <div class="row items-center justify-between">
          <div class="text-h6">Nível</div>
          <q-btn flat round dense icon="close" @click="close" />
        </div>
        <div class="text-subtitle2 text-grey">Manutenção de níveis</div>
      </q-card-section>
      <q-card-section>
        <q-table :rows="levelStore.levels" :columns="columns" row-key="id" :pagination="{ rowsPerPage: 10 }"
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
          <div class="text-h6">Nível</div>
          <q-btn flat round dense icon="close" @click="changeMode" />
        </div>
        <div class="text-subtitle2 text-grey">Edição de nível</div>
      </q-card-section>
      <q-card-section>
        <q-form>
          <div class="row">
            <q-input v-model="levelStore.level.name" label="Nome" outlined dense stack-label capitalize class="col-12"
              required />
          </div>

          <div class="row full-width q-mt-md">
            <div class="col-4">
              <div class="row full-width">
                <span class="row items-center full-width text-subtitle2 text-grey">Criado em</span>
                <span class="row items-center full-width text-subtitle2 text-grey">{{
                  formatDateBrazil(levelStore.level.createdAt)
                  }}</span>
              </div>
            </div>
            <div class="col-4">
              <div class="row full-width">
                <span class="row items-center full-width text-subtitle2 text-grey">Atualizado em</span>
                <span class="row items-center full-width text-subtitle2 text-grey">{{
                  formatDateBrazil(levelStore.level.updatedAt)
                  }}</span>
              </div>
            </div>
            <div class="col-4" v-if="levelStore.level.deletedAt">
              <div class="row full-width">
                <span class="row items-center full-width text-subtitle2 text-grey">Excluído em</span>
                <span class="row items-center full-width text-subtitle2 text-grey">{{
                  formatDateBrazil(levelStore.level.deletedAt)
                  }}</span>
              </div>
            </div>
          </div>

          <div class="row full-width q-mt-lg">
            <div class="col-8">
              <q-btn dense label="Salvar" color="accent" no-caps style="width: 100px" @click="saveLevel" />
              <q-btn dense label="Novo" color="secondary" no-caps style="width: 100px" @click="newLevel"
                class="q-ml-md" />
            </div>
            <div class="col-4" v-if="!levelStore.level.deletedAt">
              <q-btn dense label="Excluir" color="negative" no-caps style="width: 100px" @click="deleteLevel"
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
import { useLevelStore } from 'src/stores/module-level/level-store'
import { formatDateBrazil } from 'src/utils/formatDateBrazil'
//import { Notify } from 'quasar'

const levelStore = useLevelStore()
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
  levelStore.clear()
  router.back()
}

async function changeMode() {
  ModeSearch.value = !ModeSearch.value

  await levelStore.getAll()
}

async function editRow(row) {
  await levelStore.getById(row.id)

  changeMode()
}

async function deleteRow(row) {
  await levelStore.delete(row.id)

  await levelStore.getAll()
}

async function deleteLevel() {
  await levelStore.delete(levelStore.level.id)

  changeMode()

  levelStore.clear()

  await levelStore.getAll()

}

async function saveLevel() {
  if (levelStore.level.id === undefined) {
    await levelStore.create()
  } else {
    await levelStore.update()
  }
}

async function newLevel() {
  levelStore.clear()
}

onMounted(async () => {
  loading.value = true
  try {
    await levelStore.getAll()
  } finally {
    loading.value = false
  }
})

</script>
