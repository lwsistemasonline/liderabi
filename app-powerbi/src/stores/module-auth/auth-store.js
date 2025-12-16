import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'

export const useAuthStore = defineStore('auth', {
  state: () => ({

    token: undefined,
    id: undefined,
    name: undefined,
    email: undefined,
    mobile: undefined,
    telegramId: undefined,
    image: undefined,
    companyName: undefined,
    cnpj: undefined,
    roleId: undefined,
    role: undefined,

  }),

  getters: {},

  actions: {
    async login(email, password) {

      try {
        const response = await api.post('/auth',
          { email: email, password: password },
          { headers: { 'Content-Type': 'application/json' } })

        if (response.status === 200) {
          this.token = response.data.token;
          this.id = response.data.userSubscription.userId;
          this.name = response.data.userSubscription.user.name;
          this.email = response.data.userSubscription.email;
          this.mobile = response.data.userSubscription.user.mobileNumber;
          this.telegramId = response.data.userSubscription.user.telegramUserId;
          this.image = response.data.userSubscription.user.image;
          this.companyName = response.data.userSubscription.company.name;
          this.cnpj = ``;
          this.roleId = response.data.userSubscription.role.id;
          this.role = response.data.userSubscription.role.name;

        } else {
          Notify.create({
            message: 'Senha ou e-mail inválidos',
            color: 'red',
            timeout: 3000,
            position: 'center',
          })
          throw new Error('Login failed')
        }
      } catch (error) {
        Notify.create({
          message: 'Erro ao fazer login',
          color: 'red',
          icon: 'close',
          timeout: 3000,
          position: 'center',
        })
        throw error
      }
    },

    async logout() {

      try {
        const response = await api.post('/auth/logout', { token: this.token, userId: this.id },
          { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` } })

        return response.status === 200
      } catch (error) {
        Notify.create({
          message: 'Erro ao deslogar',
          color: 'red',
          icon: 'close',
          timeout: 3000,
          position: 'center',
        })
        throw error
      }
    },

    clear() {
      this.token = undefined
      this.id = undefined
      this.name = undefined
      this.email = undefined
      this.mobile = undefined
      this.telegramId = undefined
      this.image = undefined
      this.companyName = undefined
      this.cnpj = undefined
      this.roleId = undefined
      this.role = undefined
    }
  }
})