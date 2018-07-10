import * as types from '../../mutation-types'
import lazyLoading from './lazyLoading'
import registrations from './registrations'
import questions from './questions'
import auth from '../../../utils/auth'
// show: meta.label -> name
// name: component name
// meta.label: display label

const state = {
  items: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      beforeEnter: auth.requireAuth,
      meta: {
        icon: 'fa-tachometer',
        link: 'dashboard/index.vue'
      },
      component: lazyLoading('dashboard', true)
    },
    {
        name: 'Usuários',
        path: '/users',
        beforeEnter: auth.requireAuth,
        meta: {
          icon: 'fa-users',
          link: 'users/index.vue'
        },
        component: lazyLoading('users', true)
    },
    {
      name: 'Pagamentos',
      path: '/payments',
      beforeEnter: auth.requireAuth,
      meta: {
        icon: 'fa-money',
        link: 'payment/index.vue'
      },
      component: lazyLoading('payment', true)
    },

    // {
    //   name: 'Axios',
    //   path: '/axiosDemo',
    //   meta: {
    //     auth: true,
    //     icon: 'fa-rocket',
    //     link: 'axios/index.vue'
    //   },
    //   component: lazyLoading('axios', true)
    // },
    // charts,
    // uifeatures,
    // components,
    questions,
    registrations,
    // tables
  ]
}

const mutations = {
  [types.EXPAND_MENU] (state, menuItem) {
    if (menuItem.index > -1) {
      if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
        state.items[menuItem.index].meta.expanded = menuItem.expanded
      }
    } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
      menuItem.item.meta.expanded = menuItem.expanded
    }
  }
}

export default {
  state,
  mutations
}
