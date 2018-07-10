<template>
    <div class="block">

        <div v-if="exists">
            <h1 class="title has-text-centered">Editar</h1>
            <p class="pull-left">
                <b>id: {{question.idquest}}</b>
            </p>
            <a class="button is-danger is-outlined pull-right">
                <span class="icon"><i class="fa fa-times"></i></span><span>Deletar</span>
            </a>

            <br /><br />

            <label class="label">Disciplina*:</label>
            <p class="control">
                <span class="select">
                    <select v-model="question.subject_idsubject" disabled v-on:change="getTopics">
                        <option v-for="subject in subjects" v-bind:value="subject.idsubject">
                            {{ subject.subject_name }}
                        </option>
                    </select>
                </span>
            </p>

            <label class="label">Assunto*:</label>
            <p class="control">
                <span class="select">
                    <select v-model="question.topic_idtopic" disabled placeholder="Selecione o Assunto">
                        <option v-for="topic in topics" v-bind:value="topic.idtopic">
                            {{ topic.topic_name }}
                        </option>
                    </select>
                </span>
            </p>

            <label class="label has-text-centered">Enunciado*:</label>
            <p class="control">
                <textarea v-model="question.enunciation" class="textarea" rows="10" style="height: auto;" placeholder="enunciado da questão"></textarea>
            </p>
            <br>

            <label class="label">Alternativas*: <p class="pull-right">Marque a alternativa correta</p></label>
            <p v-for="alternative in question.alternatives" class="control">
                <ul>
                    <li>
                        <textarea v-model="alternative.text" style="width: 90%; height: auto;" rows="4" class="input" type="text" ></textarea>
                        <input v-model="question.correct_answer" class="pull-right" checked style="margin-right: 20px;" type="radio" :value="alternative.idalternative">
                    </li>
                </ul>

            </p>
            <br>

            <label class="label has-text-centered">Comentário:</label>
            <p class="control">
                <textarea v-model="question.bestcomment" class="textarea" rows="5" placeholder="comentário construtivo pra mostrar na resolução da questão"></textarea>
            </p>
            <br />

            <label class="label has-text-centered">Texto Associado:</label>
            <p class="control">
                <textarea v-model="question.textassociated" class="textarea" rows="2" placeholder="texto referente a questão"></textarea>
            </p>
            <br>

            <br /><br />
            <div v-if="!sendingQuestion">
                <p align="center">
                    <a @click="updateQuestion" class="button is-large is-success is-outlined">{{this.buttonText}}</a>
                </p>
            </div>
            <div v-else>
                <a class="button is-success is-loading">Loading</a>
            </div>
        </div>
        <div v-else>
            <p>
                <span class="icon"><i class="fa fa-pencil"></i></span> Busque uma questão para editá-la
            </p>

        </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {

    props: {
        buttonText: {
            type: String,
            default: 'Cadastrar'
        },
        api: String,
        question: Object
    },

    data () {
        return {
            sendingQuestion: false,
            exists: false,
            subjects: [],
            topics: [],
            institutions: [],
            jurys: [],
            tests: [],
        }
    },

    mounted () {
        if(this.question.enunciation == undefined) this.exists = false
        else this.exists = true

        this.getSubjects();
    },


    methods: {
        updateQuestion: function() {
            axios.post(this.api + 'question/update/'+this.question.idquest, this.question).then( response => {
                console.log(response)
                this.$notify({
                    title: 'Edit',
                    message: 'Questão editada com sucesso !',
                    type: 'success'
                });

            }).catch( err => {
                console.log(err)
                this.$notify({
                    title: 'Edit',
                    message: 'Não foi possível editar essa questão.',
                    type: 'error'
                });

            })
        },

        getSubjects: function() {
            axios.get(this.api + 'subject/').then((response) => {
                this.subjects = response.data
            }).catch( err => {
                console.log(err)
            });
        },

        getTopics: function() {
            axios.get(this.api + 'topic/by-subject/' + this.question.subject_idsubject).then((response) => {
                this.topics = response.data.topic
            }).catch( err => {
                console.log(err)
            });
        },

    }
}
</script>

<style>
textarea { height: auto; }

</style>
