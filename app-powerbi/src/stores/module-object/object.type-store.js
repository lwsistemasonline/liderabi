import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'
import { useAuthStore } from 'src/stores/module-auth/auth-store'

export const useObjectTypeStore = defineStore('objectTypeStore', {
    state: () => ({
        objectTypes: [],
        objectType: {
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
                const response = await api.get('/type-objects', { headers: { 'Authorization': `Bearer ${token}` } })

                if (response.status === 200) {

                    this.objectTypes = response.data

                    return true
                } else {
                    Notify.create({
                        message: 'Erro ao buscar tipos de objeto',
                        color: 'red',
                        icon: 'close',
                        timeout: 3000,
                        position: 'center',
                    })
                    throw new Error('Erro ao buscar tipos de objeto')
                }
            } catch (error) {
                Notify.create({
                    message: 'Erro ao buscar tipos de objeto',
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
                const response = await api.get(`/type-objects/${id}`, {
                    params: {
                        input: JSON.stringify({ id: String(id) })
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    this.objectType = response.data
                    return response.data
                } else {
                    Notify.create({
                        message: 'Erro ao buscar tipo de objeto',
                        color: 'red',
                        icon: 'close',
                        timeout: 3000,
                        position: 'center',
                    })
                    return false
                }
            } catch (error) {
                Notify.create({
                    message: 'Erro ao buscar tipo de objeto',
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

            const response = await api.post('/type-objects', { 'name': this.objectType.name }, { headers: { 'Authorization': `Bearer ${token}` } })

            if (response.status === 201) {
                this.objectType = response.data

                Notify.create({
                    message: 'Tipo de objeto criado com sucesso',
                    color: 'green',
                    icon: 'check',
                    timeout: 3000,
                    position: 'center',
                })

            } else {
                Notify.create({
                    message: 'Erro ao criar tipo de objeto',
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

            const response = await api.put(`/type-objects/${id}`, { 'name': this.objectType.name }, { headers: { 'Authorization': `Bearer ${token}` } })

            if (response.status === 200) {
                this.objectType = response.data
                Notify.create({
                    message: 'Tipo de objeto atualizado com sucesso',
                    color: 'green',
                    icon: 'check',
                    timeout: 3000,
                    position: 'center',
                })
            } else {
                Notify.create({
                    message: 'Erro ao atualizar tipo de objeto',
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

            const response = await api.delete(`/type-objects/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })

            if (response.status === 200) {
                Notify.create({
                    message: 'Tipo de objeto deletado com sucesso',
                    color: 'red',
                    icon: 'check',
                    timeout: 3000,
                    position: 'center',
                })
            } else {
                Notify.create({
                    message: 'Erro ao deletar tipo de objeto',
                    color: 'red',
                    icon: 'close',
                    timeout: 3000,
                    position: 'center',
                })
            }
        },

        clear() {
            this.objectTypes = []
            this.objectType = {
                id: undefined,
                name: undefined,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: undefined,
            }
        }
    }
})

