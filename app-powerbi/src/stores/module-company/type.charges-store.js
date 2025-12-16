import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'
import { useAuthStore } from 'src/stores/module-auth/auth-store'

export const useTypeChargesStore = defineStore('typeChargesStore', {
    state: () => ({
        typeCharges: [],
        typeCharge: {
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
                const response = await api.get('/type-charges', { headers: { 'Authorization': `Bearer ${token}` } })

                if (response.status === 200) {

                    this.typeCharges = response.data

                    return true
                } else {
                    Notify.create({
                        message: 'Erro ao buscar tipos de plano',
                        color: 'red',
                        icon: 'close',
                        timeout: 3000,
                        position: 'center',
                    })
                    throw new Error('Erro ao buscar tipos de plano')
                }
            } catch (error) {
                Notify.create({
                    message: 'Erro ao buscar tipos de plano',
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
                const response = await api.get(`/type-charges/${id}`, {
                    params: {
                        input: JSON.stringify({ id: String(id) })
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    this.typeCharge = response.data
                    return response.data
                } else {
                    Notify.create({
                        message: 'Erro ao buscar tipo de plano',
                        color: 'red',
                        icon: 'close',
                        timeout: 3000,
                        position: 'center',
                    })
                    return false
                }
            } catch (error) {
                Notify.create({
                    message: 'Erro ao buscar tipo de plano',
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

            const response = await api.post('/type-charges', { 'name': this.typeCharge.name }, { headers: { 'Authorization': `Bearer ${token}` } })

            if (response.status === 201) {
                this.typeCharge = response.data

                Notify.create({
                    message: 'Tipo de plano criado com sucesso',
                    color: 'green',
                    icon: 'check',
                    timeout: 3000,
                    position: 'center',
                })

            } else {
                Notify.create({
                    message: 'Erro ao criar tipo de plano',
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

            const response = await api.put(`/type-charges/${id}`, { 'name': this.typeCharge.name }, { headers: { 'Authorization': `Bearer ${token}` } })

            if (response.status === 200) {
                this.typeCharge = response.data
                Notify.create({
                    message: 'Tipo de plano atualizado com sucesso',
                    color: 'green',
                    icon: 'check',
                    timeout: 3000,
                    position: 'center',
                })
            } else {
                Notify.create({
                    message: 'Erro ao atualizar tipo de plano',
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

            const response = await api.delete(`/type-charges/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })

            if (response.status === 200) {
                Notify.create({
                    message: 'Tipo de plano deletado com sucesso',
                    color: 'red',
                    icon: 'check',
                    timeout: 3000,
                    position: 'center',
                })
            } else {
                Notify.create({
                    message: 'Erro ao deletar tipo de plano',
                    color: 'red',
                    icon: 'close',
                    timeout: 3000,
                    position: 'center',
                })
            }
        },

        clear() {
            this.typeCharges = []
            this.typeCharge = {
                id: undefined,
                name: undefined,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: undefined,
            }
        }
    }
})

