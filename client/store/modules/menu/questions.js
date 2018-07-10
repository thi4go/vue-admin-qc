import lazyLoading from './lazyLoading'
import auth from '../../../utils/auth'

export default {
    name: 'Questões',
    path: '/questions',
    beforeEnter: auth.requireAuth,
    meta: {
        icon: 'fa-question-circle-o',
        expanded: false,
        link: 'questions/index.vue'
    },
    component: lazyLoading('questions', true)

}
