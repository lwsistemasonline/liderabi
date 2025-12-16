const routes = [
  {
    path: '/',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      {
        name: 'login',
        path: '',
        component: () => import('pages/LoginPage.vue'),
      },
    ],
  },

  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'main',
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },
      // Configuração
      {
        name: 'empresas',
        path: 'empresas',
        component: () => import('pages/configuracao/EmpresasPage.vue'),
      },
      {
        name: 'usuarios',
        path: 'usuarios',
        component: () => import('pages/configuracao/UsuariosPage.vue'),
      },
      {
        name: 'perfis',
        path: 'perfis',
        component: () => import('pages/configuracao/PerfisPage.vue'),
      },
      {
        name: 'log-acesso',
        path: 'log-acesso',
        component: () => import('pages/configuracao/LogAcessoPage.vue'),
      },
      // Auxiliares
      {
        name: 'nivel',
        path: 'nivel',
        component: () => import('pages/configuracao/auxiliares/NivelPage.vue'),
      },
      {
        name: 'grupo-empresa',
        path: 'grupo-empresa',
        component: () => import('pages/configuracao/auxiliares/GrupoEmpresaPage.vue'),
      },
      {
        name: 'tipo-empresa',
        path: 'tipo-empresa',
        component: () => import('pages/configuracao/auxiliares/TipoEmpresaPage.vue'),
      },
      {
        name: 'tipo-objeto',
        path: 'tipo-objeto',
        component: () => import('pages/configuracao/auxiliares/TipoObjetoPage.vue'),
      },
      {
        name: 'tipo-plano',
        path: 'tipo-plano',
        component: () => import('pages/configuracao/auxiliares/TipoPlanoPage.vue'),
      },
      {
        name: 'metodo-pagamento',
        path: 'metodo-pagamento',
        component: () => import('pages/configuracao/auxiliares/MetodoPagamentoPage.vue'),
      },
      // Relatórios
      {
        name: 'relatorios',
        path: 'relatorios',
        component: () => import('pages/RelatoriosPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
