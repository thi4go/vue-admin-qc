<template>
    <div >
        <br />
        <div class="container">

        <div class="tile is-ancestor">

            <div class="tile is-parent">

                <div class="tile is-child box">
                    <!-- <h1 class="title">Styles</h1> -->

                    <tabs v-if="!chartLoading" v-on:tab-selected="changeScope" type="boxed" :is-fullwidth="true" alignment="centered" size="large">

                        <tab-pane label="Exame da OAB" icon="fa fa-gavel">
                            <users-chart
                                :fullData   = "chartData.oab"
                                :series     = "oab.series"
                                :bgColor    = "oab.bgColor"
                                :total      = "total.oab"
                                monthIndex  = "9"
                            />
                            <br />

                            <div class="box">
                                <h3 class="title" style="color: #a3a5a7">gerencie usuários</h3> <br />

                                <tabs v-if="scope == 'oab'" layout="left" animation="fade" :only-fade="false">
                                    <tab-pane key="Criar" label="Criar" icon="fa fa-plus">
                                        <Create :api="this.api" />
                                    </tab-pane>
                                    <tab-pane key="Editar" label="Editar" icon="fa fa-pencil">
                                        <Edit :api="this.api" :scope="this.scope"  />
                                    </tab-pane>
                                </tabs>
                            </div>

                        </tab-pane>

                        <tab-pane label="Engenharia Civil" icon="fa fa-building">
                            <users-chart
                                :fullData   = "chartData.civil"
                                :series     = "civil.series"
                                :bgColor    = "civil.bgColor"
                                :total      = "total.civil"
                                monthIndex  = "9"
                            />
                            <br />

                            <div class="box">
                                <h3 class="title" style="color: #a3a5a7">gerencie usuários</h3> <br />

                                <tabs v-if="scope == 'civil'" layout="left" animation="fade" :only-fade="false">
                                    <tab-pane key="Criar" label="Criar" icon="fa fa-plus">
                                        <Create :api="this.api" />
                                    </tab-pane>
                                    <tab-pane key="Editar" label="Editar" icon="fa fa-pencil">
                                        <Edit :api="this.api" :scope="this.scope"  />
                                    </tab-pane>
                                </tabs>
                            </div>                        </tab-pane>

                        <tab-pane label="Legislativo" icon="fa fa-university">
                            <users-chart
                                :fullData   = "chartData.leg"
                                :series     = "legislativo.series"
                                :bgColor    = "legislativo.bgColor"
                                :total      = "total.leg"
                                monthIndex  = "9"
                            />
                            <br />

                            <div class="box">
                                <h3 class="title" style="color: #a3a5a7">gerencie usuários</h3> <br />

                                <tabs v-if="scope == 'leg'" layout="left" animation="fade" :only-fade="false">
                                    <tab-pane key="Criar" label="Criar" icon="fa fa-plus">
                                        <Create :api="this.api" />
                                    </tab-pane>
                                    <tab-pane key="Editar" label="Editar" icon="fa fa-pencil">
                                        <Edit :api="this.api" :scope="this.scope"  />
                                    </tab-pane>
                                </tabs>
                            </div>                        </tab-pane>

                        <tab-pane label="Diplomacia" icon="fa fa-handshake-o">
                            <users-chart
                                :fullData   = "chartData.dipl"
                                :series     = "diplomacia.series"
                                :bgColor    = "diplomacia.bgColor"
                                :total      = "total.dipl"
                                monthIndex  = "9"
                            />
                            <br />

                            <div class="box">
                                <h3 class="title" style="color: #a3a5a7">gerencie usuários</h3> <br />

                                <tabs v-if="scope == 'dipl'" layout="left" animation="fade" :only-fade="false">
                                    <tab-pane key="Criar" label="Criar" icon="fa fa-plus">
                                        <Create :api="this.api" />
                                    </tab-pane>
                                    <tab-pane key="Editar" label="Editar" icon="fa fa-pencil">
                                        <Edit :api="this.api" :scope="this.scope"  />
                                    </tab-pane>
                                </tabs>
                            </div>                        </tab-pane>

                        <tab-pane label="Controle" icon="fa fa-usd">
                            <users-chart
                                :fullData   = "chartData.contrl"
                                :series     = "controle.series"
                                :bgColor    = "controle.bgColor"
                                :total      = "total.contrl"
                                monthIndex  = "9"
                            />
                            <br />

                            <div class="box">
                                <h3 class="title" style="color: #a3a5a7">gerencie usuários</h3> <br />

                                <tabs v-if="scope == 'contrl'" layout="left" animation="fade" :only-fade="false">
                                    <tab-pane key="Criar" label="Criar" icon="fa fa-plus">
                                        <Create :api="this.api" />
                                    </tab-pane>
                                    <tab-pane key="Editar" label="Editar" icon="fa fa-pencil">
                                        <Edit :api="this.api" :scope="this.scope"  />
                                    </tab-pane>
                                </tabs>
                            </div>                        </tab-pane>

                        <tab-pane label="Tribunais" icon="fa fa-gavel">
                            <users-chart
                                :fullData   = "chartData.trib"
                                :series     = "tribunais.series"
                                :bgColor    = "tribunais.bgColor"
                                :total      = "total.trib"
                                monthIndex  = "9"
                            />
                            <br />

                            <div class="box">
                                <h3 class="title" style="color: #a3a5a7">gerencie usuários</h3> <br />

                                <tabs v-if="scope == 'trib'" layout="left" animation="fade" :only-fade="false">
                                    <tab-pane key="Criar" label="Criar" icon="fa fa-plus">
                                        <Create :api="this.api" />
                                    </tab-pane>
                                    <tab-pane key="Editar" label="Editar" icon="fa fa-pencil">
                                        <Edit :api="this.api" :scope="this.scope"  />
                                    </tab-pane>
                                </tabs>
                            </div>                        </tab-pane>


                    </tabs>

                    <br /><br />



                </div>

            </div>
        </div>
    </div>

    </div>
</template>

<script>
import Chart from 'vue-bulma-chartjs'
import axios from 'axios'
import UsersChart from '../components/UsersChart'
import Edit from './Edit'
import Create from './Create'
import { Tabs, TabPane } from 'vue-bulma-tabs'
import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse'


export default {
    components: {
        Chart,
        UsersChart,
        Edit,
        Create,
        Tabs,
        TabPane,
        Collapse,
        CollapseItem
    },

    data () {
        return {
            chartData: {},
            chartLoading: true,
            monthIndex: 5,
            total: {},

            api: 'https://api.examedaoab.com/api/',
            scope: 'oab',

            // CHARTS
            civil: {
                bgColor: 'rgba(31, 200, 219, 1)',
                series: 'Civil'
            },
            legislativo: {
                bgColor: 'rgba(102, 126, 131, 1)',
                series: 'Legislativo'
            },
            oab: {
                bgColor: 'rgba(151, 205, 118, 1)',
                series: 'OAB'
            },
            diplomacia: {
                bgColor: 'rgba(182, 170, 6, 1)',
                series: 'Diplomacia'
            },
            controle: {
                bgColor: 'rgba(146, 47, 186, 1)',
                series: 'Controle'
            },
            tribunais: {
                bgColor: 'rgba(153, 158, 48, 1)',
                series: 'Tribunais'
            },
        }
    },

    mounted () {

        axios.all([
            axios.get('https://apicivil.maquinadeaprovacao.com/api/admin/users-registered-by-day'),
            axios.get('https://apilegislativo.maquinadeaprovacao.com/api/admin/users-registered-by-day'),
            axios.get('https://api.examedaoab.com/api/admin/users-registered-by-day'),
            axios.get('https://apidiplomacia.maquinadeaprovacao.com/api/admin/users-registered-by-day'),
            axios.get('https://api.concursocontrole.com.br/api/admin/users-registered-by-day'),
            axios.get('https://apitribunais.maquinadeaprovacao.com/api/admin/users-registered-by-day')
        ]).then(axios.spread( (civil, leg, oab, dipl, contrl, trib) => {
            this.chartData.civil = civil.data.data
            this.chartData.leg   = leg.data.data
            this.chartData.oab   = oab.data.data
            this.chartData.dipl  = dipl.data.data
            this.chartData.contrl = contrl.data.data
            this.chartData.trib  = trib.data.data

            this.calculateTotals()

            this.chartLoading    = false
        }));
    },

    methods: {
        changeScope(payload) {
            switch (payload) {
                case 0:
                    this.api   = 'https://api.examedaoab.com/api/';
                    this.scope = 'oab';
                    break;
                case 1:
                    this.api   = 'https://apicivil.maquinadeaprovacao.com/api/';
                    this.scope = 'civil';
                    break;
                case 2:
                    this.api   = 'https://apilegislativo.maquinadeaprovacao.com/api/';
                    this.scope = 'leg';
                    break;
                case 3:
                    this.api   = 'https://apidiplomacia.maquinadeaprovacao.com/api/';
                    this.scope = 'dipl';
                    break;
                case 4:
                    this.api   = 'https://api.concursocontrole.com.br/api/';
                    this.scope = 'ctrl';
                    break;
                case 5:
                    this.api   = 'https://apitribunais.maquinadeaprovacao.com/api/';
                    this.scope = 'trib';
                    break;
            }
        },

        calculateTotals() {
            this.total.oab = this.chartData.oab.reduce( function(sum, month) {
                for(var day in month) {
                    sum += parseInt(month[day])
                }
                return sum
            }, 0)

            this.total.civil = this.chartData.civil.reduce( function(sum, month) {
                for(var day in month) {
                    sum += parseInt(month[day])
                }
                return sum
            }, 0)

            this.total.leg = this.chartData.leg.reduce( function(sum, month) {
                for(var day in month) {
                    sum += parseInt(month[day])
                }
                return sum
            }, 0)

            this.total.dipl = this.chartData.dipl.reduce( function(sum, month) {
                for(var day in month) {
                    sum += parseInt(month[day])
                }
                return sum
            }, 0)

            this.total.contrl = this.chartData.contrl.reduce( function(sum, month) {
                for(var day in month) {
                    sum += parseInt(month[day])
                }
                return sum
            }, 0)

            this.total.trib = this.chartData.trib.reduce( function(sum, month) {
                for(var day in month) {
                    sum += parseInt(month[day])
                }
                return sum
            }, 0)
        }

    }



}
</script>

<style lang="scss" scoped>
.card+.card {
    margin-top: 20px
}
</style>
