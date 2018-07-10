import lazyLoading from './lazyLoading'
import auth from '../../../utils/auth'

export default {
    name: 'Cadastro',
    path: '/register',
    beforeEnter: auth.requireAuth,
    meta: {
        icon: 'fa-plus-square',
        expanded: false,
        link: 'register/index.vue'
    },
    component: lazyLoading('charts', true),

    children: [

        {
            name: 'Concurso',
            path: 'contest',
            component: lazyLoading('register/Contest'),
            meta: {
                link: 'register/Contest.vue'
            }
        },
        {
            name: 'Questão Discursiva',
            path: 'discursive',
            component: lazyLoading('register/Discursive'),
            meta: {
                link: 'register/Discursive.vue'
            }
        },


    ]
}
