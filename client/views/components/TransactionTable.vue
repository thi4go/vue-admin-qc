<template>
    <div>


        <div class="tile is-parent">
            <article class="tile is-child box">
                <p class="title" align="center">
                    Transações
                </p>

                <div  class="right-box">


                    <p class="subtitle">
                        <span class="icon">
                            <i class="fa fa-filter"></i>
                        </span>
                        <b>Filtros</b>
                    </p>
                    <p>
                        <input v-model="searchText" class="input" type="text"  style="text-align:left; width: 40%;" placeholder="Pesquise um usuário">

                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp

                        <a @click="filterId = 0" :class="filterId == 0 ? 'button is-dark' : 'button'">
                            <span class="icon">
                                <i class="fa fa-globe"></i>
                            </span>
                            <span>Todas</span>
                        </a>

                        <a @click="filterId = 1" :class="filterId == 1 ? 'button is-dark' : 'button'">
                            <span class="icon">
                                <i class="fa fa-check"></i>
                            </span>
                            <span>Pagas</span>
                        </a>

                        <a @click="filterId = 2" :class="filterId == 2 ? 'button is-dark' : 'button'">
                            <span class="icon">
                                <i class="fa fa-times"></i>
                            </span>
                            <span>Canceladas</span>
                        </a>

                    </p>
                </div>

                <div  class="content table-responsive">

                    <br />
                    <table class="table is-bordered">
                        <thead>
                            <tr>
                                <th>Usuário</th>
                                <th>Valor</th>
                                <th>Método</th>
                                <th>Status</th>
                                <th>Origem</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr v-for="transaction in filterTransaction" >
                                <td>{{transaction.user.name}} <p><i>{{transaction.user.email}}</i></p></td>
                                <td>R$ {{transaction.amount}}</td>
                                <td>{{transaction.method}}</td>
                                <td>{{transaction.status}}</td>
                                <td>{{transaction.payment_origin}}</td>
                                <td>{{transaction.created_at}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </article>
        </div>

    </div>
</template>

<script>

export default {

    props: ['transactions'],

    data(){
        return {
            filterId: 0,   // 0 - todas ; 1 - pagas ; 2 - canceladas
            searchText: ''
        }
    },

    computed: {
        filterTransaction() {
            if(this.searchText != '') {
                let regexSearch = new RegExp(this.searchText, 'i');

                return this.transactions.filter( function(tr) {
                    return tr.user.name.match(regexSearch) || tr.user.email.match(regexSearch)
                })
            }
            else if(this.filterId == 0) {
                return this.transactions;
            }
            else if(this.filterId == 1) {
                return this.transactions.filter( function(tr) {
                    return tr.status == "Pago" || tr.status == "Finalizada" || tr.status == "Completa"
                })
            }
            else if(this.filterId == 2) {
                return this.transactions.filter( function(tr) {
                    return tr.status == "Cancelada"
                })
            }
        },

        filterByCancelled() {
            return this.transactions.filter( function(tr) {
                return tr.status == "Cancelado"
            })
        },

    },

    mounted() {
        console.log(this.filterByPaid)
    },

    methods: {

    }
}
</script>

<style lang="scss" scoped>
.right-box {
    text-align: right;
}
</style>
