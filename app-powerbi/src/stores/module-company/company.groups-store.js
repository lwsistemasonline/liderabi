import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'
import { useAuthStore } from 'src/stores/module-auth/auth-store'

export const useCompanyGroupsStore = defineStore('companyGroupsStore', {
    state: () => ({
        companyGroups: [],
        companyGroup: {
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
                const response = await api.get('/company-groups', { headers: { 'Authorization': `Bearer ${token}` } })

                if (response.status === 200) {

                    this.companyGroups = response.data

                    return true
                } else {
                    Notify.create({
                        message: 'Erro ao buscar grupos de empresas',
                        color: 'red',
                        icon: 'close',
                        timeout: 3000,
                        position: 'center',
                    })
                    throw new Error('Erro ao buscar grupos de empresas')
                }
            } catch (error) {
                Notify.create({
                    message: 'Erro ao buscar grupos de empresas',
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
                const response = await api.get(`/company-groups/${id}`, {
                    params: {
                        input: JSON.stringify({ id: String(id) })
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    this.companyGroup = response.data
                    return response.data
                } else {
                    Notify.create({
                        message: 'Erro ao buscar grupo de empresa',
                        color: 'red',
                        icon: 'close',
                        timeout: 3000,
                        position: 'center',
                    })
                    return false
                }
            } catch (error) {
                Notify.create({
                    message: 'Erro ao buscar grupo de empresa',
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

            const response = await api.post('/company-groups', { 'name': this.companyGroup.name }, { headers: { 'Authorization': `Bearer ${token}` } })

            if (response.status === 201) {
                this.companyGroup = response.data

                Notify.create({
                    message: 'Grupo de empresa criado com sucesso',
                    color: 'green',
                    icon: 'check',
                    timeout: 3000,
                    position: 'center',
                })

            } else {
                Notify.create({
                    message: 'Erro ao criar grupo de empresa',
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

            const response = await api.put(`/company-groups/${id}`, { 'name': this.companyGroup.name }, { headers: { 'Authorization': `Bearer ${token}` } })

            if (response.status === 200) {
                this.companyGroup = response.data
                Notify.create({
                    message: 'Grupo de empresa atualizado com sucesso',
                    color: 'green',
                    icon: 'check',
                    timeout: 3000,
                    position: 'center',
                })
            } else {
                Notify.create({
                    message: 'Erro ao atualizar grupo de empresa',
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

            const response = await api.delete(`/company-groups/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })

            if (response.status === 200) {
                Notify.create({
                    message: 'Grupo de empresa deletado com sucesso',
                    color: 'red',
                    icon: 'check',
                    timeout: 3000,
                    position: 'center',
                })
            } else {
                Notify.create({
                    message: 'Erro ao deletar grupo de empresa',
                    color: 'red',
                    icon: 'close',
                    timeout: 3000,
                    position: 'center',
                })
            }
        },

        clear() {
            this.companyGroups = []
            this.companyGroup = {
                id: undefined,
                name: undefined,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: undefined,
            }
        }
    }
})
