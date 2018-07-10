<template>
    <div>

        <div class="columns is-vcentered">
            <div class="column is-6 is-offset-3">
                <div class="box">

                    <article >
                        <h1 class="title has-text-centered">Concurso</h1>
                        <div class="block">

                            <label class="label">Ano:</label>
                            <p class="control">
                                <span class="select">
                                    <select v-model="contest.year">
                                        <option value="2017">2017</option>
                                        <option value="2018">2018</option>
                                        <option value="2019">2019</option>
                                    </select>
                                </span>
                            </p>

                            <label class="label">Instituição:</label>
                            <p class="control">
                                <span class="select">
                                    <select v-on:change="getInstitutions" v-model="contest.institution_idinstitution" placeholder="Selecione o Assunto">
                                        <option v-for="institution in institutions" v-bind:value="institution.idinstitution">
                                            {{ institution.name }}
                                        </option>
                                    </select>
                                </span>
                            </p>

                            <label class="label">Juri:</label>
                            <p class="control">
                                <span class="select">
                                    <select v-on:change="getJurys" v-model="contest.jury_idjury" placeholder="Selecione o Assunto">
                                        <option v-for="jury in jurys" v-bind:value="jury.idjury">
                                            {{ jury.name }}
                                        </option>
                                    </select>
                                </span>
                            </p>

                            <label class="label">Cargo:</label>
                                <span class="select">
                                    <select v-on:change="getTests" v-model="contest.test_idtest" placeholder="Selecione o Assunto">
                                        <option v-for="test in tests" v-bind:value="test.idtest">
                                            {{ test.name }}
                                        </option>
                                    </select>
                                </span>
                            </p>

                            <br>
                            <h1 class="title has-text-centered">Estatísticas</h1>

                            <label class="label">m</label>
                            <p class="control">
                                <input class="input is-4" type="text" placeholder="valor">
                            </p>

                            <label class="label">pu</label>
                            <p class="control">
                                <input class="input is-4" type="text" placeholder="valor">
                            </p>

                            <label class="label">alpha</label>
                            <p class="control">
                                <input class="input is-4" type="text" placeholder="valor">
                            </p>

                            <label class="label">beta</label>
                            <p class="control">
                                <input class="input is-4" type="text" placeholder="valor">
                            </p>

                            <label class="label">Username</label>
                            <p class="control has-icon has-icon-right">
                                <input class="input is-success" type="text" placeholder="Text input" value="bulma">
                                <span class="icon is-small">
                                    <i class="fa fa-check"></i>
                                </span>
                                <span class="help is-success">This username is available</span>
                            </p>

                            <label class="label">Email</label>
                            <p class="control has-icon has-icon-right">
                                <input class="input is-danger" type="text" placeholder="Email input" value="hello@">
                                <span class="icon is-small">
                                    <i class="fa fa-warning"></i>
                                </span>
                                <span class="help is-danger">This email is invalid</span>
                            </p>

                            <label class="label">Subject</label>
                            <p class="control">
                                <span class="select">
                                    <select>
                                        <option>Select dropdown</option>
                                        <option>With options</option>
                                    </select>
                                </span>
                            </p>

                            <label class="label">Message</label>
                            <p class="control">
                                <textarea class="textarea" placeholder="Textarea"></textarea>
                            </p>

                            <p class="control">
                                <label class="checkbox">
                                    <input type="checkbox">
                                    Remember me
                                </label>
                            </p>

                            <p class="control">
                                <label class="radio">
                                    <input type="radio" name="question">
                                    Yes
                                </label>
                                <label class="radio">
                                    <input type="radio" name="question">
                                    No
                                </label>
                            </p>

                            <p class="control">
                                <button class="button is-primary">Submit</button>
                                <button class="button is-link">Cancel</button>
                            </p>

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
            contest: {
                year: '',
                m: '',
                pu: '',
                alpha: '',
                beta: '',
                degree: '',
                total_points: '',
                total_question_number: '',
                institution_idinstitution: '',
                jury_idjury: '',
                test_idtest: ''

            },

            institutions: [],

            jurys: [],

            tests: [],

            question: {
                subject_idsubject: '',
                topic_idtopic: '',
                enunciation: '',
                bestcomment: '',
                professorcomment: '',
                alternative_answer: '',
                textassociated: '',
                test_idtest: '',
                jury_idjury: '',
                institution_idinstitution: '',
                statistic_b: '',
                a: 1,
                c: 0.25,
                alternatives: {
                    a: '',
                    b: '',
                    c: '',
                    d: ''
                },
            }
        }
    },

    mounted () {
        this.getInstitutions()
        this.getJurys()
        this.getTests()
    },

    methods: {

        getInstitutions: function() {
            console.log('called')
            axios.get('https://apicivil.maquinadeaprovacao.com/api/institution/get-institutions/').then(response => {
                this.institutions = response.data.data
                console.log(response.data.data)
            });
        },

        getJurys: function() {
            axios.get('https://apicivil.maquinadeaprovacao.com/api/jury/get-jurys/').then(response => {
                this.jurys = response.data.data
                console.log(response.data.data)
            });
        },

        getTests: function() {
            axios.get('https://apicivil.maquinadeaprovacao.com/api/test/get-tests/').then(response => {
                this.tests = response.data.data
                console.log(response.data.data)
            });
        }
    }
}
</script>
