<template>
    <div>

        <div>
            <div class="column is-10 is-offset-1">
                <h2 class="title has-text-centered"> Questões Objetivas</h2><br />
                <a @click="toggleBool" class="button is-info pull-left">Cadastrar Questão</a><br /><br /><br />

                <div class="box">

                    <div v-if="showQuestionForm" >
                        <h1 class="title has-text-centered">Cadastro</h1>

                        <div class="block">

                            <label class="label">Disciplina*:</label>
                            <p class="control">
                                <span class="select">
                                    <select v-model="question.subject_idsubject" v-on:change="getTopics">
                                        <option v-for="subject in subjects" v-bind:value="subject.idsubject">
                                            {{ subject.subject_name }}
                                        </option>
                                    </select>
                                </span>
                            </p>

                            <label class="label">Assunto*:</label>
                            <p class="control">
                                <span class="select">
                                    <select v-model="question.topic_idtopic" placeholder="Selecione o Assunto">
                                        <option v-for="topic in topics" v-bind:value="topic.idtopic">
                                            {{ topic.topic_name }}
                                        </option>
                                    </select>
                                </span>
                            </p>

                            <label class="label">Instituição*:</label>
                            <p class="control">
                                <span class="select">
                                    <select v-on:change="getInstitutions" v-model="question.institution_idinstitution" placeholder="Selecione o Assunto">
                                        <option v-for="institution in institutions" v-bind:value="institution.idinstitution">
                                            {{ institution.name }}
                                        </option>
                                    </select>
                                </span>
                            </p>

                            <label class="label">Banca*:</label>
                            <p class="control">
                                <span class="select">
                                    <select v-on:change="getJurys" v-model="question.jury_idjury" placeholder="Selecione o Assunto">
                                        <option v-for="jury in jurys" v-bind:value="jury.idjury">
                                            {{ jury.name }}
                                        </option>
                                    </select>
                                </span>
                            </p>

                            <label class="label">Cargo*:</label>
                            <span class="select">
                                <select v-on:change="getTests" v-model="question.test_idtest" placeholder="Selecione o Assunto">
                                    <option v-for="test in tests" v-bind:value="test.idtest">
                                        {{ test.name }}
                                    </option>
                                </select>
                            </span>
                        </p>


                        <br>

                        <label class="label">Estatística - parâmetro b *:</label>
                        <p class="control">
                            <input v-model="question.statistic_b" style="width:30%" class="input" type="text" placeholder="b da questão"></textarea>
                        </p>
                        <br>

                        <label class="label">Ano*:</label></label>
                        <p class="control">
                            <input v-model="question.year" style="width:30%" class="input" type="text" placeholder="ano da questão"></textarea>
                        </p>
                        <br>

                        <label class="label">Enunciado*:</label>
                        <p class="control">
                            <textarea v-model="question.enunciation" class="textarea" rows="2" placeholder="enunciado da questão"></textarea>
                        </p>
                        <br>

                        <label class="label">Alternativas*: <p class="pull-right">Marque a alternativa correta</p></label>
                        <p class="control">
                            <ul>
                                <li>
                                    <input style="width: 70%" v-model="question.alternatives.a" class="input" type="text" placeholder="1ª alternativa">
                                    <input class="pull-right" style="margin-right: 70px" type="radio" v-model="question.alternative_answer" value="a">
                                </li><br />

                                <li>
                                    <input style="width: 70%" v-model="question.alternatives.b" class="input" type="text" placeholder="2ª alternativa">
                                    <input class="pull-right" style="margin-right: 70px" type="radio" v-model="question.alternative_answer" value="b"><br />

                                </li><br />

                                <li>
                                    <input style="width: 70%" v-model="question.alternatives.c" class="input" type="text" placeholder="3ª alternativa">
                                    <input class="pull-right" style="margin-right: 70px" type="radio" v-model="question.alternative_answer" value="c"><br />
                                </li><br />

                                <li>
                                    <input style="width: 70%" v-model="question.alternatives.d" class="input" type="text" placeholder="4ª alternativa">
                                    <input class="pull-right" style="margin-right: 70px" type="radio" v-model="question.alternative_answer" value="d"><br />

                                </li><br />
                                <li>
                                    <input style="width: 70%" v-model="question.alternatives.e" class="input" type="text" placeholder="5ª alternativa">
                                    <input class="pull-right" style="margin-right: 70px" type="radio" v-model="question.alternative_answer" value="e"><br />
                                </li>
                            </ul>

                        </p>
                        <br>

                        <label class="label">Texto Associado:</label>
                        <p class="control">
                            <textarea v-model="question.textassociated" class="textarea" rows="1" placeholder="texto referente a questão"></textarea>
                        </p>
                        <br>

                        <label class="label">Comentário:</label>
                        <p class="control">
                            <textarea v-model="question.bestcomment" class="textarea" rows="2" placeholder="comentário construtivo pra mostrar na resolução da questão"></textarea>
                        </p>


                        <br /><br />
                        <div v-if="!sendingQuestion">
                            <p class="control">
                                <button @click="registerQuestionOnAPI()" class="button is-success">Cadastrar</button>
                                <button @click="toggleBool" class="button is-danger is-outlined pull-right">Cancel</button>
                            </p>
                        </div>
                        <div v-else>
                            <a class="button is-primary is-loading">Loading</a>
                        </div>

                    </div>
                </div>

                <div v-else>
                    <h2 class="title">Dados</h2>
                    <br />

                    total de questões: {{this.totalQuestions}}<br /><br />

                </div>
            </div>

        </div>
    </div>
</div>

</template>

<script>
import axios from 'axios'

export default {

    props: ['api'],

    data () {
        return {
            sendingQuestion: false,
            showQuestionForm: false,
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
                c: 0.25,
                alternatives: {
                    a: '',
                    b: '',
                    c: '',
                    d: ''
                },
            },

            subjects: [],
            topics: [],
            institutions: [],
            jurys: [],
            tests: [],
            totalQuestions: null
        }
    },

    mounted () {
        this.getSubjects()
        this.getInstitutions()
        this.getJurys()
        this.getTests()
        this.getTotalQuestions()
    },


    methods: {

        toggleBool: function() {
            this.showQuestionForm = !this.showQuestionForm;
        },

        registerQuestionOnAPI: function() {
            this.sendingQuestion = true;

            axios.post(this.api + 'admin/register-question', this.question).then( (response) => {
                this.sendingQuestion = false;
                this.showQuestionForm = false;
                this.question = {
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
                    c: 0.25,
                    alternatives: {
                        a: '',
                        b: '',
                        c: '',
                        d: ''
                    },
                    number_of_alternatives: 4
                }
                
                this.$notify({
                    title: 'Cadastro',
                    message: 'Questão cadastrada com sucesso !',
                    type: 'success'
                });
            }).catch( err => {
                this.$notify({
                    title: 'Cadastro',
                    message: 'Não foi possível cadastrar essa questão.',
                    type: 'error'
                });
            });
        },

        getSubjects: function() {
            axios.get(this.api + 'subject/').then((response) => {
                this.subjects = response.data
            });
        },

        getTopics: function() {
            axios.get(this.api + 'topic/by-subject/'+this.question.subject_idsubject).then((response) => {
                this.topics = response.data.topic
            });
        },

        getInstitutions: function() {
            axios.get(this.api + 'institutions/').then(response => {
                this.institutions = response.data
            });
        },

        getJurys: function() {
            axios.get(this.api + 'jury/').then(response => {
                this.jurys = response.data
            });
        },

        getTests: function() {
            axios.get(this.api + 'tests/').then(response => {
                this.tests = response.data
            });
        },

        getTotalQuestions: function() {
            axios.get(this.api + 'questions/count').then(response => {
                this.totalQuestions = response.data
            });
        }
    }
}
</script>
