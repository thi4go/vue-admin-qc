<template>

    <div>
        <div class="column is-10 is-offset-1">



            <div class="field">
                <label class="label"><i class="fa fa-user"></i> Nome </label>
                <div class="control has-icons-left has-icons-right">
                    <input v-model="user.name" :class="success.email ? 'input is-success' : 'input'" type="text" placeholder="Nome do usuário">
                </div>
                <!-- <p class="help is-success">This username is available</p> -->

                <label class="label"><i class="fa fa-envelope"></i>  E-mail</label>
                <div class="control has-icons-left has-icons-right">
                    <input v-model="user.email" :class="success.email ? 'input is-success' : 'input'" type="text" placeholder="E-mail do usuário">
                </div>

                <label class="label"><i class="fa fa-key"></i>  Senha</label>
                <div class="control has-icons-left has-icons-right">
                    <input v-model="user.password" :class="success.email ? 'input is-success' : 'input'" type="password" placeholder="Senha do usuário">
                </div>

                <label class="label"><i class="fa fa-key"></i>  Confirmação Senha</label>
                <div class="control has-icons-left has-icons-right">
                    <input v-model="user.password_confirmation" :class="success.email ? 'input is-success' : 'input'" type="password" placeholder="Confirmação da senha do usuário">
                </div>

                <br />
                <div v-if="!sendingRequest">
                    <p class="control" align="center">
                        <button @click="registerUserOnAPI()" class="button is-success">Cadastrar</button>
                    </p>
                </div>
                <div v-else>
                    <a class="button is-primary is-loading">Loading</a>
                </div>
            </div>





        </div>
    </div>


</template>

<script>
import axios from 'axios'

export default {

    props: ['api', 'scope'],

    data() {
        return {
            user: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            sendingRequest: false,

            success: {
                email: false
            }

        }
    },

    mounted() {
        console.log(this.api)



    },

    watch: {

    },

    methods: {
        registerUserOnAPI(){
            this.sendingRequest = true

            let payload = {
                name: this.user.name,
                email: this.user.email,
                password: this.user.password,
                password_confirmation: this.user.password_confirmation
            }

            axios.post(this.api + 'register', payload).then(response=>{
                console.log(response)
                this.$notify({
                    title: 'Cadastro',
                    message: 'Usuário cadastrado com sucesso !',
                    type: 'success'
                });
                this.sendingRequest = false
                this.user.name = ''
                this.user.email = ''
                this.user.password = ''
                this.user.password_confirmation = ''
            }).catch(error => {
                this.$notify({
                    title: 'Cadastro',
                    message: 'Não foi possível cadastrar o usuário... tente novamente!',
                    type: 'error'
                });
            })
        }
    }
}

</script>
