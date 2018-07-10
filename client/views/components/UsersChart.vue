<template>
    <div class="tile is-12 is-parent">

        <div class="tile is-child box is-8">
            <h4 class="title" style="color: #a3a5a7">usuários cadastrados por dia</h4> <br />

            <p class="control">
              <span class="select">
                <select v-model="monthIndex">
                  <option>Select dropdown</option>
                  <option value="1">Janeiro</option>
                  <option value="2">Fevereiro</option>
                  <option value="3">Março</option>
                  <option value="4">Abril</option>
                  <option value="5">Maio</option>
                  <option value="6">Junho</option>
                  <option value="7">Julho</option>
                  <option value="8">Agosto</option>
                  <option value="9">Setembro</option>
                  <option value="10">Outubro</option>
                  <option value="11">Novembro</option>
                  <option value="12">Dezembro</option>

                </select>
              </span>
            </p>

            <div v-if="!chartLoading" style="position: relative;">
                <chart :type="'line'" :data="data" :options="options"></chart>
            </div>
            <div v-else>

            </div>

        </div>

        &nbsp&nbsp&nbsp

        <div class="tile is-child box is-4">
            <h1 class="title" style="color: #a3a5a7">total</h1>

            <p>
                cadastrados: {{total}}
            </p>
        </div>

    </div>
</template>

<script>
import Chart from 'vue-bulma-chartjs'

export default {
    components: {Chart},

    props: ['fullData', 'series', 'bgColor', 'monthIndex', 'total'],

    data() {
        return {
            chartLoading: true,
            // monthIndex: 5,
            options: {
                tooltips: {
                    mode: 'label'
                }
            },
            data: {
                labels: [
                    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
                    '12', '13', '14', '15', '16', '17', '18', '19', '20', '21',
                    '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
                ]
            },

        }
    },

    mounted() {
        this.data.datasets = [{
            data: Object.values(this.fullData[this.monthIndex]),
            label: this.series,
            borderColor: this.bgColor.replace(/1\)$/, '.5)'),
            pointBackgroundColor: this.bgColor,
            backgroundColor: this.bgColor.replace(/1\)$/, '.5)')
        }]
        this.chartLoading = false;
    },

    watch: {
        monthIndex: function() {
            this.updateChartData();
        }
    },

    methods: {
        updateChartData() {
            this.chartLoading = true

            this.data.datasets = [{
                data: Object.values(this.fullData[this.monthIndex]),
                label: this.series,
                borderColor: this.bgColor.replace(/1\)$/, '.5)'),
                pointBackgroundColor: this.bgColor,
                backgroundColor: this.bgColor.replace(/1\)$/, '.5)')
            }]

            setTimeout( () => {
                this.chartLoading = false
            }, 10);
        },
    }
}

</script>
