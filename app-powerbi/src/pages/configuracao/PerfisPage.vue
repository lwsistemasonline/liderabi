<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="row items-center justify-between">
          <div class="text-h6">Perfis</div>
          <q-btn
            flat
            round
            dense
            icon="close"
            @click="close"
          />
        </div>
        <div class="text-subtitle2 text-grey">Gerenciamento de perfis de acesso</div>
      </q-card-section>
      <q-card-section>
        <p>Conteúdo da página de Perfis será implementado aqui.</p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function close () {
  router.back()
}
</script>

