<template>
    <div class="tile is-ancestor">
        <div class="column is-10 is-offset-1 tile is-parent">
            <div class="tile is-child box">
                <tabs animation="slide" alignment="centered" type="toggle" :is-fullwidth="true" size="large" >

                    <tab-pane label="Erros" v-bind:questions="questions">
                        <collapse v-for="error in questions" v-if="error.is_resolved == 0">

                            <collapse-item :title="error.created_at ? 'ID: ' + error.idquest  +  ' -- ' + error.created_at : 'ID: ' + error.idquest">
                                <b>usuário: </b>{{error.user.name}} <p class="pull-right"><b>email: </b> {{error.user.email}}</p><br /><br />
                                <b>error reportado: </b>{{error.message}}<p class="pull-right" v-if="error.created_at"><b>Data: </b> {{error.created_at}}</p> <br /><br /><br />
                                <p align="center">
                                    <a v-if="!loadingItem" class="button is-success is-outlined" @click="markResolved(error.id,1)">
                                        <span class="icon"><i class="fa fa-check"></i></span><span>Marcar como resolvido</span>
                                    </a>
                                    <a v-else class="button is-success is-outlined is-loading"></a>
                                </p>
                            </collapse-item>
                        </collapse>
                    </tab-pane>

                    <tab-pane label="Erros Resolvidos" class="is-primary">

                        <collapse v-for="error in questions" v-if="error.is_resolved == 1">

                            <collapse-item :title="error.created_at ? 'ID: ' + error.idquest  +  ' -- ' + error.created_at : 'ID: ' + error.idquest">
                                <b>usuário: </b>{{error.user.name}} <p class="pull-right"><b>email: </b> {{error.user.email}}</p><br /><br />
                                <b>error reportado: </b>{{error.message}}<p class="pull-right" v-if="error.created_at"><b>Data: </b> {{error.created_at}}</p> <br /><br /><br />
                                <p align="center">
                                    <a v-if="!loadingItem" class="button is-danger is-outlined" @click="markResolved(error.id,0)">
                                        <span class="icon"><i class="fa fa-close"></i></span><span>Marcar como não resolvido</span>
                                    </a>
                                    <a v-else class="button is-danger is-outlined is-loading"></a>
                                </p>
                            </collapse-item>
                        </collapse>
                    </tab-pane>

                </tabs>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import QuestionForm from '../components/QuestionForm'
import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse'
import { Tabs, TabPane } from 'vue-bulma-tabs'

export default {
    components: {
        QuestionForm,
        Collapse,
        CollapseItem,
        Tabs,
        TabPane
    },

    props: ['api'],

    watch: {
        api: function() {
            this.getQuestionsWithError();
        }
    },

    data () {
        return {
            sendingQuestion: false,
            question: {
                subject_idsubject: '',   //*
                topic_idtopic: '',   //*
                enunciation: '',   //*
                bestcomment: '',   //*
                professorcomment: '',
                alternative_answer: '',
                textassociated: '',
                test_idtest: '',
                jury_idjury: '',
                institution_idinstitution: '',
                year: '',
                statistic_b: '',
                a: 1,
                c: 0.2,
                alternatives: {
                    a: '',
                    b: '',
                    c: '',
                    d: '',
                    e: ''
                },
            },
            tab : 1,
            loading: true,
            loadingItem: false,
            questions: null
        }
    },

    mounted () {
        this.getQuestionsWithError();
    },

    methods: {
        getQuestionsWithError(){
            axios.get(this.api + 'admin/questions-with-error').then( response => {
                this.questions = response.data.data;
                this.questions = this.questions.slice(0).reverse();
            }).catch( err => {
                console.log(err)
            });
        },
        markResolved(id,value){
            let scope=this;
            let data = {
                is_resolved : value
            }
            axios.put(this.api+'admin/question-with-error/'+id,data).then(response=>{
                scope.loadingItem = true;
                setTimeout(function () {
                    for(let i in scope.questions){
                        if (scope.questions[i].id == id) {
                            scope.questions[i].is_resolved = value;
                        }
                    }
                    scope.loadingItem = false;
                }, 500);
            })
        },
        updateTab(value){
            this.tab = value;
        }

    }
}
</script>
