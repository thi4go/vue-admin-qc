<template>
    <div>
        <div class="column is-10 is-offset-1" v-if="!loadingContent">
            <h2 class="title has-text-centered"> Questões Objetivas</h2><br />
            <p class="control has-addons" >
                <input v-model="idquest" class="input" type="text" placeholder="Insira o ID da questão">
                <select  v-model="idsubject">
                    <option v-for="subject in subjects" v-bind:value="subject.idsubject">
                        {{subject.subject_name}}
                    </option>
                </select>
                <input type="text" v-model="year" class="input" placeholder="Ano: ">
                <a @click="getQuestion()" class="button is-info">Buscar</a>
                <a @click="clear()" class="button is-warning">Limpar</a>
            </p> <br />

            <div class="box">
                <div v-if="!loading">
                    <QuestionForm :api="this.api" :question="this.question" buttonText="Editar"/>
                </div>
                <div v-else>
                    <scale-loader></scale-loader>
                </div>

            </div>
            <div class="box">
                <div v-if="!loadingQuestions">
                    <p><b>Quantidade:</b> {{length}}/{{counter}}</p>
                    <collapse v-for="question in questions">

                        <collapse-item :title="'ID: '+question.idquest+' -- '+question.enunciation.substring(0,68)+'...'" v-on:click="getQuestion(question.idquest)">
                            <b>Enunciado:</b>
                            <p>{{question.enunciation}}</p>
                            <br>
                            <b>Alternativas:</b>
                            <p><b>A)</b> {{question.first_answer}}</p>
                            <p><b>B)</b> {{question.second_answer}}</p>
                            <p><b>C)</b> {{question.third_answer}}</p>
                            <p><b>D)</b> {{question.forth_answer}}</p>
                            <br>
                            <p><b>Resposta Correta:</b> {{question.correct_answer.toUpperCase()}}</p>
                            <a @click="showQuestionSubject(question.idquest)" class="button is-primary">Selecionar Questão</a>
                        </collapse-item>
                    </collapse>
                    <br>
                    <nav v-if="pages>0" class="pagination is-centered" role="navigation" aria-label="pagination">
                        <a class="pagination-previous is-primary" @click="navigateQuestions(-1)"
                        v-if="pagination > 0"
                        title="Página anterior"
                        >Anterior</a>
                        <a class="pagination-next"
                        @click="navigateQuestions(1)"
                        v-if="pages > pagination && pages > 1"
                        >Próximo</a>
                        <ul class="pagination-list">
                            <li><a class="pagination-link" aria-label="ìndice das páginas">
                                 <b>{{pagination+1}}</b>/<b>{{pages+1}}</b>
                             </a></li>
                        </ul>

                    </nav>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
import axios from 'axios'
import ScaleLoader from 'vue-spinner/src/PulseLoader.vue'
import QuestionForm from '../components/QuestionForm'
import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse'

export default {
    components: {
        QuestionForm,
        ScaleLoader,
        Collapse,
        CollapseItem
    },

    props: ['api'],

    data () {
        return {
            sendingQuestion: false,
            idquest: null,
            question: {},
            questions: [],
            loading: false,
            loadingQuestions: false,
            loadingContent: true,
            subjects: [],
            idsubject: 0,
            topics: [],
            institutions: [],
            jurys: [],
            tests: [],
            year: null,
            length: 0,
            counter: 0,
            pagination : 0,
            pages : 0
        }
    },

    mounted() {
        let scope = this;
        axios.get(this.api+'subjects/getSubjects').then(response=>{
            scope.subjects = response.data;
            scope.loadingContent=false;
        })
    },

    methods: {
        getQuestion(value) {
            if (value) {
                this.idquest = value;
            }
            let scope = this;
            scope.pagination = 0;
            if(scope.idquest){
                this.loading = true;
                scope.loadingQuestions = true;
                axios.get(scope.api + 'question/show/' + scope.idquest).then(response => {
                    scope.question = response.data.questions
                    scope.loading = false;
                })
            }else {
                scope.question = {}
                scope.loading=true;
                let data={}
                if (!scope.year) {
                    data = {
                        id: scope.idsubject,
                        startYear : 2012,
                        endYear : 2017,
                        status : 1,
                        keyword :'',
                    }
                }else{

                    data = {
                        id: scope.idsubject,
                        startYear : scope.year,
                        endYear : scope.year,
                        status : 1,
                        keyword :''
                    }
                }

                scope.loadingQuestions = true;
                axios.post(scope.api+'questions/by-subject',data).then(response=>{
                    scope.questions = response.data.questions
                    scope.length = scope.questions.length
                    axios.post(scope.api+'questions/count-by-subject',data).then(response=>{
                        // console.log(response);
                        scope.counter = response.data;
                        let aux = scope.counter/30;
                        scope.pages = Math.round(aux);
                        console.log(typeof scope.counter, scope.counter);
                        console.log(typeof scope.pages, scope.pages);
                    })
                    scope.loadingQuestions = false;
                })
            }
        },
        navigateQuestions(amt){
            let data={};
            let scope = this;
            scope.pagination += amt;
            if (!scope.year) {
                data = {
                    id: scope.idsubject,
                    startYear : 2012,
                    endYear : 2017,
                    status : 1,
                    keyword :'',
                    pagination : scope.pagination
                }
            }else{

                data = {
                    id: scope.idsubject,
                    startYear : scope.year,
                    endYear : scope.year,
                    status : 1,
                    keyword :'',
                    pagination : scope.pagination
                }
            }
            scope.loadingQuestions = true;
            axios.post(scope.api+'questions/by-subject',data).then(response=>{
                scope.questions = response.data.questions
                scope.length += (amt)*scope.questions.length
                axios.post(scope.api+'questions/count-by-subject',data).then(response=>{
                    // console.log(response);
                    scope.counter = response.data;
                })
                scope.loadingQuestions = false;
            })
        },
        showQuestionSubject(id){
            this.loading = true;
            let scope = this;
            axios.get(scope.api + 'question/show/' + id).then(response => {
                scope.question = response.data.questions
                scope.loading = false;
                scope.loadingQuestions = true;
            })
        },
        clear(){
            this.questions = [];
            this.idsubject = 0;
            this.idquest = null;
            this.year = null;
        }

    }
}
</script>
