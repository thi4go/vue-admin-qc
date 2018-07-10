<template>
    <div>

        <div class="columns is-vcentered">
            <div class="column is-6 is-offset-3">
                <div class="box">

                    <article >
                        <h1 class="title has-text-centered">Questão Objetiva - Legislativo</h1>

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

                            <label class="label">Alternativas*: </label>
                            <p class="control">
                                <ul>
                                    <li>
                                        <input style="margin-right: 20px" type="radio" v-model="question.alternative_answer" value="a">
                                        <input style="width: 70%" v-model="question.alternatives.a" class="input" type="text" placeholder="1ª alternativa"></textarea>
                                    </li>

                                    <li>
                                        <input style="margin-right: 20px" type="radio" v-model="question.alternative_answer" value="b">
                                        <input style="width: 70%" v-model="question.alternatives.b" class="input" type="text" placeholder="2ª alternativa"></textarea><br />

                                    </li>

                                    <li>
                                        <input style="margin-right: 20px" type="radio" v-model="question.alternative_answer" value="c">
                                        <input style="width: 70%" v-model="question.alternatives.c" class="input" type="text" placeholder="3ª alternativa"></textarea><br />
                                    </li>

                                    <li>
                                        <input style="margin-right: 20px" type="radio" v-model="question.alternative_answer" value="d">
                                        <input style="width: 70%" v-model="question.alternatives.d" class="input" type="text" placeholder="4ª alternativa"></textarea><br />

                                    </li>
                                    <li>
                                        <input style="margin-right: 20px" type="radio" v-model="question.alternative_answer" value="e">
                                        <input style="width: 70%" v-model="question.alternatives.e" class="input" type="text" placeholder="5ª alternativa"></textarea><br />

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
                                    <button @click="registerQuestionOnAPI()" class="button is-primary">Cadastrar</button>
                                    <button class="button is-link">Cancel</button>
                                </p>
                            </div>
                            <div v-else>
                                <a class="button is-primary is-loading">Loading</a>
                            </div>

                        </div>
                    </article>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios'

export default {

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

            subjects: [],
            topics: [],
            institutions: [],
            jurys: [],
            tests: [],
        }
    },

    mounted () {
        this.getSubjects()
        this.getInstitutions()
        this.getJurys()
        this.getTests()
    },


    methods: {

        registerQuestionOnAPI: function() {
            this.sendingQuestion = true;

            axios.post('https://apilegislativo.maquinadeaprovacao.com/api/admin/register-question-five-alternatives', this.question).then( (response) => {
                console.log(response)
                this.sendingQuestion = false;
                window.location.reload();
            });
        },

        getSubjects: function() {
            axios.get('https://apilegislativo.maquinadeaprovacao.com/api/subject/').then((response) => {
                this.subjects = response.data
                console.log(this.subjects)
            });
        },

        getTopics: function() {
            axios.get('https://apilegislativo.maquinadeaprovacao.com/api/topic/by-subject/'+this.question.subject_idsubject).then((response) => {
                this.topics = response.data.topic
                console.log(this.topics)
            });
        },

        getInstitutions: function() {
            axios.get('https://apilegislativo.maquinadeaprovacao.com/api/institution/get-institutions/').then(response => {
                this.institutions = response.data.data
            });
        },

        getJurys: function() {
            axios.get('https://apilegislativo.maquinadeaprovacao.com/api/jury/get-jurys/').then(response => {
                this.jurys = response.data.data
            });
        },

        getTests: function() {
            axios.get('https://apilegislativo.maquinadeaprovacao.com/api/test/get-tests/').then(response => {
                this.tests = response.data.data
            });
        }
    }
}
</script>
