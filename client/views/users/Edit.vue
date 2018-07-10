<template>
    <div >
        <div v-if="!usersLoading" class="column is-10 is-offset-1">
            <label class="label">Pesquisa por Nome/Email</label>

            <input v-model="searchtext" class="input" style="width: 50%" type="text" placeholder="Pesquise um usuário">
            <button @click="searchUsers()" class="button is-primary">Buscar</button>

            <!-- <a class="button is-primary is-loading">Loading</a> -->

            <br /><br />

            <div class="box">
                <p v-for="user in filteredUsers" >
                    <collapse>
                        <collapse-item :title="user.name + '  -  ' + user.email">
                            <div class="field">
                                <label class="label"><i class="fa fa-user"></i> Nome </label>
                                <div class="control has-icons-left has-icons-right">
                                    <input v-model="user.name" class="input" type="text" placeholder="Nome do usuário">
                                </div>
                                <!-- <p class="help is-success">This username is available</p> -->

                                <label class="label"><i class="fa fa-envelope"></i>  E-mail</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input v-model="user.email" class="input" type="text" placeholder="E-mail do usuário">
                                </div>

                                <label class="label"><i class="fa fa-phone"></i>  Telefone</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input v-model="user.phone" style="width: 50%" class="input" type="text" placeholder="Telefone do usuário">
                                </div><br />
                                <div class="control has-icons-left has-icons-right">
                                    <label class="label"> Eficiência:
                                        <input v-model="user.efficiency" class="input" style="width: 13%" type="text" placeholder="Eficiência do usuário">
                                            &nbsp&nbsp&nbsp User Level:
                                        <input v-model="user.user_level" class="input" style="width: 13%" type="text" placeholder="Nível de acesso do usuário">
                                            &nbsp&nbsp&nbsp Dias restantes:
                                        <input v-model="user.remaining_days" class="input" style="width: 13%" type="text" placeholder="Dias restantes do usuário">
                                    </label>
                                </div>
                                <a @click="updateUser(user)" style="align: center" class="button is-primary">Editar Usuário</a>

                            </div>
                        </collapse-item>
                    </collapse>
                </p>
            </div>

        </div>
        <div v-else style="align: center;">
            <i class="fa fa-spinner fa-pulse fa-3x fa-fw" aria-hidden="true"> </i>Indexando todos os usuários...
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse'
import ScaleLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
    components: {
        ScaleLoader,
        Collapse,
        CollapseItem
    },

    props: ['api', 'scope'],

    data() {
        return {
            users: null,
            filteredUsers: [],
            iduser: null,
            searchtext: null,
            usersLoading: true
        }
    },

    mounted() {

        this.users = JSON.parse(window.sessionStorage.getItem(this.scope))

        if(this.users == null) {

            axios.get(this.api + 'admin/users').then( (response) => {
                window.sessionStorage.setItem(this.scope, JSON.stringify(response.data.data));
                this.users        = JSON.parse(window.sessionStorage.getItem(this.scope))
                this.usersLoading = false
            })

        } else {
            this.usersLoading = false
        }
    },

    methods: {
        searchUsers() {
            let scope = this

            if(this.searchtext != '') {
                let regexSearch = new RegExp(this.searchtext, 'i');

                if(this.users != null) {
                    scope.filteredUsers = this.users.filter( function(user) {
                        if(user.name != null && user.email != null)
                        return user.name.match(regexSearch) || user.email.match(regexSearch)
                    })
                    console.log(scope.filteredUsers)
                }
            }
        },

        updateUser(user) {
            const scope = this

            let payload = {
                'userId': user.id,
                'data': {
                    'name': user.name,
                    'email': user.email,
                    'phone':user.phone,
                    'user_level': user.user_level,
                    'efficiency': user.efficiency,
                    'remaining_days': user.remaining_days
                }
            }
            axios.post(this.api + 'user/update', payload).then(response => {
                window.sessionStorage.setItem(scope.scope, JSON.stringify(scope.filteredUsers));

                this.$notify({
                    title: 'Edit',
                    message: 'Usuário editado com sucesso !',
                    type: 'success'
                });

            }).catch(err => {
                this.$notify({
                    title: 'Edit',
                    message: 'Não foi possível editar o usuário... tente novamente!',
                    type: 'error'
                });
            })
        }
    }
}

</script>
