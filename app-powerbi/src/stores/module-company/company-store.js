import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'
import { useAuthStore } from 'src/stores/module-auth/auth-store'

export const useCompanyStore = defineStore('companyStore', {
    state: () => ({
        companies: [],
        company: {
            id: '',
            name: '',
            company_group_id: '',
            parent_company_id: '',
            type_company_id: '',
            contact_data: {},
            address_data: {},
            credential_power_bi: {},
            createdAt: '',
            updatedAt: '',
            deletedAt: '',
        },

        contact: {},
        address: {},
        power_bi: {},
    }),

    getters: {
    },

    actions: {

        async getAll() {
            const authStore = useAuthStore()
            const token = authStore.token

            try {
                const response = await api.get('/companies', { headers: { 'Authorization': `Bearer ${token}` } })

                if (response.status === 200) {

                    this.companies = response.data

                    return true
                } else {
                    Notify.create({
                        message: 'Erro ao buscar empresas',
                        color: 'red',
                        icon: 'close',
                        timeout: 3000,
                        position: 'center',
                    })
                    throw new Error('Erro ao buscar empresas')
                }
            } catch (error) {
                Notify.create({
                    message: 'Erro ao buscar empresas',
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
                const response = await api.get(`/companies/${id}`, {
                    params: {
                        input: JSON.stringify({ id: String(id) })
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    this.company = response.data
                    return response.data
                } else {
                    Notify.create({
                        message: 'Erro ao buscar empresa',
                        color: 'red',
                        icon: 'close',
                        timeout: 3000,
                        position: 'center',
                    })
                    return false
                }
            } catch (error) {
                Notify.create({
                    message: 'Erro ao buscar empresa',
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

            const response = await api.post('/companies', { 'name': this.company.name }, { headers: { 'Authorization': `Bearer ${token}` } })

            if (response.status === 201) {
                this.company = response.data

                Notify.create({
                    message: 'Empresa criada com sucesso',
                    color: 'green',
                    icon: 'check',
                    timeout: 3000,
                    position: 'center',
                })

            } else {
                Notify.create({
                    message: 'Erro ao criar empresa',
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

            const response = await api.put(`/companies/${id}`, { 'name': this.company.name }, { headers: { 'Authorization': `Bearer ${token}` } })

            if (response.status === 200) {
                this.company = response.data
                Notify.create({
                    message: 'Empresa atualizada com sucesso',
                    color: 'green',
                    icon: 'check',
                    timeout: 3000,
                    position: 'center',
                })
            } else {
                Notify.create({
                    message: 'Erro ao atualizar empresa',
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

            const response = await api.delete(`/companies/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })

            if (response.status === 200) {
                Notify.create({
                    message: 'Empresa deletada com sucesso',
                    color: 'red',
                    icon: 'check',
                    timeout: 3000,
                    position: 'center',
                })
            } else {
                Notify.create({
                    message: 'Erro ao deletar empresa',
                    color: 'red',
                    icon: 'close',
                    timeout: 3000,
                    position: 'center',
                })
            }
        },

        clear() {
            this.companies = []
            this.company = {
                id: '',
                name: '',
                company_group_id: '',
                parent_company_id: '',
                type_company_id: '',
                contact_data: {},
                address_data: {},
                credential_power_bi: {},
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: '',
            }
            this.contact = {}
            this.address = {}
            this.power_bi = {}
        }
    }
})

