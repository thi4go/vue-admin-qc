<template>
    <div class="questions">
        <transition
        mode="out-in"
        enter-active-class="fadeIn"
        leave-active-class="fadeOut"
        appear>


        <div class="tile is-ancestor">

            <div class="tile is-parent">

                <div class="tile is-child box">
                    <!-- <h1 class="title">Styles</h1> -->

                    <tabs v-on:tab-selected="changeScope" type="boxed" :is-fullwidth="true" alignment="centered" size="large">

                        <tab-pane  label="Exame da OAB" icon="fa fa-gavel">

                            <tabs v-if="scope == 'oab'" layout="left" animation="fade" :only-fade="false">
                                <tab-pane key="Criar" label="Criar" icon="fa fa-plus">
                                    <Create :api="this.api" />
                                </tab-pane>
                                <tab-pane key="Editar" label="Editar" icon="fa fa-pencil">
                                    <Edit :api="this.api"/>
                                </tab-pane>
                                <tab-pane key="Erros" label="Erros" icon="fa fa-exclamation-triangle">
                                    <reported-errors :api="this.api"/>
                                </tab-pane>
                            </tabs>

                        </tab-pane>

                        <tab-pane label="Eng. Civil" icon="fa fa-building">

                            <tabs v-if="scope == 'civil'" layout="left" animation="fade" :only-fade="false">
                                <tab-pane key="Criar" label="Criar" icon="fa fa-plus">
                                    <Create :api="this.api" />
                                </tab-pane>
                                <tab-pane key="Editar" label="Editar" icon="fa fa-pencil">
                                    <Edit :api="this.api"/>
                                </tab-pane>
                                <tab-pane key="Erros" label="Erros" icon="fa fa-exclamation-triangle">
                                    <reported-errors :api="this.api"/>
                                </tab-pane>
                            </tabs>

                        </tab-pane>

                        <tab-pane label="Legislativo" icon="fa fa-university">

                            <tabs v-if="scope == 'leg'" layout="left" animation="fade" :only-fade="false">
                                <tab-pane key="Criar" label="Criar" icon="fa fa-plus">
                                    <Create :api="this.api" />
                                </tab-pane>
                                <tab-pane key="Editar" label="Editar" icon="fa fa-pencil">
                                    <Edit :api="this.api"/>
                                </tab-pane>
                                <tab-pane key="Erros" label="Erros" icon="fa fa-exclamation-triangle">
                                    <reported-errors :api="this.api"/>
                                </tab-pane>
                            </tabs>

                        </tab-pane>

                        <tab-pane label="Diplomacia" icon="fa fa-handshake-o">

                            <tabs v-if="scope == 'dipl'" layout="left" animation="fade" :only-fade="false">
                                <tab-pane key="Criar" label="Criar" icon="fa fa-plus">
                                    <Create :api="this.api" />
                                </tab-pane>
                                <tab-pane key="Editar" label="Editar" icon="fa fa-pencil">
                                    <Edit :api="this.api"/>
                                </tab-pane>
                                <tab-pane key="Erros" label="Erros" icon="fa fa-exclamation-triangle">
                                    <reported-errors :api="this.api"/>
                                </tab-pane>
                            </tabs>

                        </tab-pane>

                        <tab-pane label="Controle" icon="fa fa-usd">

                            <tabs v-if="scope == 'ctrl'" layout="left" animation="fade" :only-fade="false">
                                <tab-pane key="Criar" label="Criar" icon="fa fa-plus">
                                    <Create :api="this.api" />
                                </tab-pane>
                                <tab-pane key="Editar" label="Editar" icon="fa fa-pencil">
                                    <Edit :api="this.api"/>
                                </tab-pane>
                                <tab-pane key="Erros" label="Erros" icon="fa fa-exclamation-triangle">
                                    <reported-errors :api="this.api"/>
                                </tab-pane>
                            </tabs>

                        </tab-pane>

                        <tab-pane label="Tribunais" icon="fa fa-gavel">

                            <tabs v-if="scope == 'trib'" layout="left" animation="fade" :only-fade="false">
                                <tab-pane key="Criar" label="Criar" icon="fa fa-plus">
                                    <Create :api="this.api" />
                                </tab-pane>
                                <tab-pane key="Editar" label="Editar" icon="fa fa-pencil">
                                    <Edit :api="this.api" />
                                </tab-pane>
                                <tab-pane key="Erros" label="Erros" icon="fa fa-exclamation-triangle">
                                    <reported-errors :api="this.api"/>
                                </tab-pane>
                            </tabs>

                        </tab-pane>


                    </tabs>

                    <br /><br />



                </div>

            </div>
        </div>


    </transition>
</div>
</template>

<script>
import axios from 'axios'
import { Tabs, TabPane } from 'vue-bulma-tabs'
import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse'
import Edit from './Edit.vue'
import Create from './Create.vue'
import ReportedErrors from './ReportedErrors.vue'

export default {
    components: {
        Tabs,
        TabPane,
        Collapse,
        CollapseItem,
        Edit,
        Create,
        ReportedErrors
    },

    data() {
        return {
            api: 'https://api.examedaoab.com/api/',
            scope: 'oab'
        }
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
        }
    }
}


</script>
