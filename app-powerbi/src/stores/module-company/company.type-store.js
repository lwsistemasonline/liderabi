import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'
import { useAuthStore } from 'src/stores/module-auth/auth-store'

export const useCompanyTypeStore = defineStore('companyTypeStore', {
    state: () => ({
        companyTypes: [],
        companyType: {
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
                const response = await api.get('/company-types', { headers: { 'Authorization': `Bearer ${token}` } })

                if (response.status === 200) {

                    this.companyTypes = response.data

                    return true
                } else {
                    Notify.create({
                        message: 'Erro ao buscar tipos de empresa',
                        color: 'red',
                        icon: 'close',
                        timeout: 3000,
                        position: 'center',
                    })
                    throw new Error('Erro ao buscar tipos de empresa')
                }
            } catch (error) {
                Notify.create({
                    message: 'Erro ao buscar tipos de empresa',
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
                const response = await api.get(`/company-types/${id}`, {
                    params: {
                        input: JSON.stringify({ id: String(id) })
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    this.companyType = response.data
                    return response.data
                } else {
                    Notify.create({
                        message: 'Erro ao buscar tipo de empresa',
                        color: 'red',
                        icon: 'close',
                        timeout: 3000,
                        position: 'center',
                    })
                    return false
                }
            } catch (error) {
                Notify.create({
                    message: 'Erro ao buscar tipo de empresa',
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

            const response = await api.post('/company-types', { 'name': this.companyType.name }, { headers: { 'Authorization': `Bearer ${token}` } })

            if (response.status === 201) {
                this.companyType = response.data

                Notify.create({
                    message: 'Tipo de empresa criado com sucesso',
                    color: 'green',
                    icon: 'check',
                    timeout: 3000,
                    position: 'center',
                })

            } else {
                Notify.create({
                    message: 'Erro ao criar tipo de empresa',
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

            const response = await api.put(`/company-types/${id}`, { 'name': this.companyType.name }, { headers: { 'Authorization': `Bearer ${token}` } })

            if (response.status === 200) {
                this.companyType = response.data
                Notify.create({
                    message: 'Tipo de empresa atualizado com sucesso',
                    color: 'green',
                    icon: 'check',
                    timeout: 3000,
                    position: 'center',
                })
            } else {
                Notify.create({
                    message: 'Erro ao atualizar tipo de empresa',
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

            const response = await api.delete(`/company-types/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })

            if (response.status === 200) {
                Notify.create({
                    message: 'Tipo de empresa deletado com sucesso',
                    color: 'red',
                    icon: 'check',
                    timeout: 3000,
                    position: 'center',
                })
            } else {
                Notify.create({
                    message: 'Erro ao deletar tipo de empresa',
                    color: 'red',
                    icon: 'close',
                    timeout: 3000,
                    position: 'center',
                })
            }
        },

        clear() {
            this.companyTypes = []
            this.companyType = {
                id: undefined,
                name: undefined,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: undefined,
            }
        }
    }
})

