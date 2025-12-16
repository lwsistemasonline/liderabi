import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'
import { useAuthStore } from 'src/stores/module-auth/auth-store'

export const useLevelStore = defineStore('levelStore', {
    state: () => ({
        levels: [],
        level: {
            id: undefined,
            name: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            deletedAt: undefined,
        }
    }),

    getters: {
    },

    actions: {

        async getAll() {
            const authStore = useAuthStore()
            const token = authStore.token

            try {
                const response = await api.get('/levels', { headers: { 'Authorization': `Bearer ${token}` } })

                if (response.status === 200) {

                    this.levels = response.data

                    return true
                } else {
                    Notify.create({
                        message: 'Erro ao buscar níveis',
                        color: 'red',
                        icon: 'close',
                        timeout: 3000,
                        position: 'center',
                    })
                    throw new Error('Erro ao buscar níveis')
                }
            } catch (error) {
                Notify.create({
                    message: 'Erro ao buscar níveis',
                    color: 'red',
                    icon: 'close',
                    timeout: 3000,
                    position: 'center',
                })
                throw error
            }
        },

        async getById(id) {
            const authStore = useAuthStore()
            const token = authStore.token

            try {
                const response = await api.get(`/levels/${id}`, {
                    params: {
                        input: JSON.stringify({ id: String(id) })
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    this.level = response.data
                    return response.data
                } else {
                    Notify.create({
                        message: 'Erro ao buscar nível',
                        color: 'red',
                        icon: 'close',
                        timeout: 3000,
                        position: 'center',
                    })
                    return false
                }
            } catch (error) {
                Notify.create({
                    message: 'Erro ao buscar nível',
                    color: 'red',
                    icon: 'close',
                    timeout: 3000,
                    position: 'center',
                })
                throw error
            }
        },

        async create() {
            const authStore = useAuthStore()
            const token = authStore.token

            const response = await api.post('/levels', { 'name': this.level.name }, { headers: { 'Authorization': `Bearer ${token}` } })

            if (response.status === 201) {
                this.level = response.data

                Notify.create({
                    message: 'Nível criado com sucesso',
                    color: 'green',
                    icon: 'check',
                    timeout: 3000,
                    position: 'center',
                })

            } else {
                Notify.create({
                    message: 'Erro ao criar nível',
                    color: 'red',
                    icon: 'close',
                    timeout: 3000,
                    position: 'center',
                })

            }
        },

        async update(id) {
            const authStore = useAuthStore()
            const token = authStore.token

            const response = await api.put(`/levels/${id}`, { 'name': this.level.name }, { headers: { 'Authorization': `Bearer ${token}` } })

            if (response.status === 200) {
                this.level = response.data
                Notify.create({
                    message: 'Nível atualizado com sucesso',
                    color: 'green',
                    icon: 'check',
                    timeout: 3000,
                    position: 'center',
                })
            } else {
                Notify.create({
                    message: 'Erro ao atualizar nível',
                    color: 'red',
                    icon: 'close',
                    timeout: 3000,
                    position: 'center',
                })
            }
        },

        async delete(id) {
            const authStore = useAuthStore()
            const token = authStore.token

            const response = await api.delete(`/levels/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })

            if (response.status === 200) {
                Notify.create({
                    message: 'Nível deletado com sucesso',
                    color: 'red',
                    icon: 'check',
                    timeout: 3000,
                    position: 'center',
                })
            } else {
                Notify.create({
                    message: 'Erro ao deletar nível',
                    color: 'red',
                    icon: 'close',
                    timeout: 3000,
                    position: 'center',
                })
            }
        },

        clear() {
            this.levels = []
            this.level = {
                id: undefined,
                name: undefined,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: undefined,
            }
        }
    }
})
