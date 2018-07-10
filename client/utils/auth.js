// import axios from 'axios'
import firebase from 'firebase'
import VueCookie from 'vue-cookie'

export default {

    user: {
        authenticated: false
    },

    requireAuth (to, from, next) {
        var user = JSON.parse(VueCookie.get('userSession'));

        if (user == null) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    },

    login(email, pwd) {
        firebase.auth().signInWithEmailAndPassword(email, pwd).then( response => {
            VueCookie.set('userSession', JSON.stringify(response.email), { expires: '7D' })
            window.location.assign('/')
        }).catch( err => {
            console.log(err)
        });
    },

    getSession() {
        return JSON.parse(VueCookie.get('userSession'))
    },

    checkAuth () {
        if(this.getSession() != null) return true
        else return false
    },

    logout () {
        firebase.auth().signOut().then(function() {
            VueCookie.delete('userSession')
            window.location.assign('#/login')
        }).catch(function(error) {
            console.log(error)
        });

    }
}
