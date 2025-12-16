import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'
import { useAuthStore } from 'src/stores/module-auth/auth-store'

export const useUsersStore = defineStore('usersStore', {
    state: () => ({
        users: [],
        user: {
            id: undefined,
            name: undefined,
            email: undefined,
            password: undefined,
            profileId: undefined,
            companyId: undefined,
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
                const response = await api.get('/users', { headers: { 'Authorization': `Bearer ${token}` } })

                if (response.status === 200) {

                    this.users = response.data

                    return true
                } else {
                    Notify.create({
                        message: 'Erro ao buscar usuários',
                        color: 'red',
                        icon: 'close',
                        timeout: 3000,
                        position: 'center',
                    })
                    throw new Error('Erro ao buscar usuários')
                }
            } catch (error) {
                Notify.create({
                    message: 'Erro ao buscar usuários',
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
                const response = await api.get(`/users/${id}`, {
                    params: {
                        input: JSON.stringify({ id: String(id) })
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    this.user = response.data
                    return response.data
                } else {
                    Notify.create({
                        message: 'Erro ao buscar usuário',
                        color: 'red',
                        icon: 'close',
                        timeout: 3000,
                        position: 'center',
                    })
                    return false
                }
            } catch (error) {
                Notify.create({
                    message: 'Erro ao buscar usuário',
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

            try {
                const response = await api.post('/users', {
                    name: this.user.name,
                    email: this.user.email,
                    password: this.user.password,
                    profileId: this.user.profileId,
                    companyId: this.user.companyId,
                }, { headers: { 'Authorization': `Bearer ${token}` } })

                if (response.status === 201) {
                    this.user = response.data

                    Notify.create({
                        message: 'Usuário criado com sucesso',
                        color: 'green',
                        icon: 'check',
                        timeout: 3000,
                        position: 'center',
                    })

                    return true
                } else {
                    Notify.create({
                        message: 'Erro ao criar usuário',
                        color: 'red',
                        icon: 'close',
                        timeout: 3000,
                        position: 'center',
                    })
                    return false
                }
            } catch (error) {
                Notify.create({
                    message: 'Erro ao criar usuário',
                    color: 'red',
                    icon: 'close',
                    timeout: 3000,
                    position: 'center',
                })
                throw error
            }
        },

        async update(id) {
            const authStore = useAuthStore()
            const token = authStore.token

            try {
                const response = await api.put(`/users/${id}`, {
                    name: this.user.name,
                    email: this.user.email,
                    password: this.user.password,
                    profileId: this.user.profileId,
                    companyId: this.user.companyId,
                }, { headers: { 'Authorization': `Bearer ${token}` } })

                if (response.status === 200) {
                    this.user = response.data
                    Notify.create({
                        message: 'Usuário atualizado com sucesso',
                        color: 'green',
                        icon: 'check',
                        timeout: 3000,
                        position: 'center',
                    })
                    return true
                } else {
                    Notify.create({
                        message: 'Erro ao atualizar usuário',
                        color: 'red',
                        icon: 'close',
                        timeout: 3000,
                        position: 'center',
                    })
                    return false
                }
            } catch (error) {
                Notify.create({
                    message: 'Erro ao atualizar usuário',
                    color: 'red',
                    icon: 'close',
                    timeout: 3000,
                    position: 'center',
                })
                throw error
            }
        },

        async softDelete(id) {
            const authStore = useAuthStore()
            const token = authStore.token

            try {
                const response = await api.delete(`/users/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })

                if (response.status === 200) {
                    Notify.create({
                        message: 'Usuário deletado com sucesso',
                        color: 'red',
                        icon: 'check',
                        timeout: 3000,
                        position: 'center',
                    })
                    return true
                } else {
                    Notify.create({
                        message: 'Erro ao deletar usuário',
                        color: 'red',
                        icon: 'close',
                        timeout: 3000,
                        position: 'center',
                    })
                    return false
                }
            } catch (error) {
                Notify.create({
                    message: 'Erro ao deletar usuário',
                    color: 'red',
                    icon: 'close',
                    timeout: 3000,
                    position: 'center',
                })
                throw error
            }
        },

        clear() {
            this.users = []
            this.user = {
                id: undefined,
                name: undefined,
                email: undefined,
                password: undefined,
                profileId: undefined,
                companyId: undefined,
                createdAt: undefined,
                updatedAt: undefined,
                deletedAt: undefined,
            }
        }
    }
})

