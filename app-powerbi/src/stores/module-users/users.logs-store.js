import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'
import { useAuthStore } from 'src/stores/module-auth/auth-store'

export const useUsersLogsStore = defineStore('usersLogsStore', {
    state: () => ({
        userLogs: [],
        userLog: {
            id: undefined,
            name: undefined,
            user: undefined,
            dateLog: undefined,
            userId: undefined,
            companyId: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            deletedAt: undefined,
        },

    }),

    getters: {
    },

    actions: {

        async findAll(filters = {}) {
            const authStore = useAuthStore()
            const token = authStore.token

            try {
                const payload = {
                    dateStart: filters.dateStart,
                    dateEnd: filters.dateEnd,
                    userId: filters.userId,
                    companyId: filters.companyId,
                    ip_address: filters.ip_address,
                }

                const response = await api.post('/user-logs/search/filter', payload,
                    {
                        headers: { 'Authorization': `Bearer ${token}` }
                    })

                if (response.status === 200) {
                    this.userLogs = response.data
                    return true
                } else {
                    Notify.create({
                        message: 'Erro ao buscar logs de acesso',
                        color: 'red',
                        icon: 'close',
                        timeout: 3000,
                        position: 'center',
                    })
                    throw new Error('Erro ao buscar logs de acesso')
                }
            } catch (error) {
                Notify.create({
                    message: 'Erro ao buscar logs de acesso',
                    color: 'red',
                    icon: 'close',
                    timeout: 3000,
                    position: 'center',
                })
                throw error
            }
        },

        async findById(id) {
            const authStore = useAuthStore()
            const token = authStore.token

            try {
                const response = await api.get(`/users-logs/${id}`, {
                    params: {
                        input: JSON.stringify({ id: String(id) })
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    this.userLog = response.data
                    return response.data
                } else {
                    Notify.create({
                        message: 'Erro ao buscar log de acesso',
                        color: 'red',
                        icon: 'close',
                        timeout: 3000,
                        position: 'center',
                    })
                    return false
                }
            } catch (error) {
                Notify.create({
                    message: 'Erro ao buscar log de acesso',
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

            const response = await api.post('/users-logs', {
                name: this.userLog.name,
                user: this.userLog.user,
                dateLog: this.userLog.dateLog,
                userId: this.userLog.userId,
                companyId: this.userLog.companyId,
            }, { headers: { 'Authorization': `Bearer ${token}` } })

            if (response.status === 201) {
                this.userLog = response.data

                Notify.create({
                    message: 'Log de acesso criado com sucesso',
                    color: 'green',
                    icon: 'check',
                    timeout: 3000,
                    position: 'center',
                })

            } else {
                Notify.create({
                    message: 'Erro ao criar log de acesso',
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

            const response = await api.put(`/users-logs/${id}`, {
                name: this.userLog.name,
                user: this.userLog.user,
                dateLog: this.userLog.dateLog,
                userId: this.userLog.userId,
                companyId: this.userLog.companyId,
            }, { headers: { 'Authorization': `Bearer ${token}` } })

            if (response.status === 200) {
                this.userLog = response.data
                Notify.create({
                    message: 'Log de acesso atualizado com sucesso',
                    color: 'green',
                    icon: 'check',
                    timeout: 3000,
                    position: 'center',
                })
            } else {
                Notify.create({
                    message: 'Erro ao atualizar log de acesso',
                    color: 'red',
                    icon: 'close',
                    timeout: 3000,
                    position: 'center',
                })
            }
        },

        async softDelete(id) {
            const authStore = useAuthStore()
            const token = authStore.token

            const response = await api.delete(`/users-logs/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })

            if (response.status === 200) {
                Notify.create({
                    message: 'Log de acesso deletado com sucesso',
                    color: 'red',
                    icon: 'check',
                    timeout: 3000,
                    position: 'center',
                })
            } else {
                Notify.create({
                    message: 'Erro ao deletar log de acesso',
                    color: 'red',
                    icon: 'close',
                    timeout: 3000,
                    position: 'center',
                })
            }
        },

        clear() {
            this.userLogs = []
            this.userLog = {
                id: undefined,
                name: undefined,
                user: undefined,
                dateLog: undefined,
                userId: undefined,
                companyId: undefined,
                createdAt: undefined,
                updatedAt: undefined,
                deletedAt: undefined,
            }
        },

        clearSearchFilters() {
            this.searchFilters = {
                name: undefined,
                user: undefined,
                dateStart: undefined,
                dateEnd: undefined,
                userId: undefined,
                companyId: undefined,
            }
        }
    }
})

