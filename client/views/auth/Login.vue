<template>
    <div class="content has-text-centered">
        <h1 class="is-title is-bold">Login</h1>

        <div class="columns is-vcentered">
            <div class="column is-6 is-offset-3">
                <div class="box">
                    <div v-show="error" style="color:red; word-wrap:break-word;">{{ error }}</div>
                    <form v-on:submit.prevent="login">
                        <label class="label">Email</label>
                        <p class="control">
                            <input v-model="email" class="input" type="text" placeholder="Credenciais de administrador do EduQC">
                        </p>
                        <label class="label">Password</label>
                        <p class="control">
                            <input v-model="password" class="input" type="password" placeholder="Senha">
                        </p>

                        <hr>
                        <p class="control">
                            <button type="submit" @click="login()" class="button is-primary">Login</button>
                            <button class="button is-default">Cancel</button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import auth from '../../utils/auth'
import VueCookie from 'vue-cookie'

export default {

    data () {
        return {
            email: null,
            password: null,
            error: null
        }
    },

    mounted () {
        console.log(auth.getSession())
    },

    methods: {
        login() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then( response => {
                VueCookie.set('userSession', JSON.stringify(response.email), { expires: '7D' })
                window.location.assign('/')
            }).catch( err => {
                this.$notify({
                    title: 'Login',
                    message: 'Credenciais incorretas !',
                    type: 'error'
                });
            });
        }

    }

}


</script>

<style lang="scss" scoped>
.is-title {
    text-transform: capitalize;
}
</style>
