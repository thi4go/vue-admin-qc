<template>
	<div class="container">

        <br /><br />
        <div class="tile is-ancestor">
          <div class="tile is-parent is-12">
            <article class="tile is-child box">
              <h1 class="title">Estatísticas</h1>
              <div class="block is-flex">
                <collapse>

                  <collapse-item title="Reais por mês">
                              <div v-if="!chartLoading" class="tile is-parent is-12">

                                  <article class="tile is-8 is-child box">
                                      <h4 class="title" style="color: #a3a5a7">R$ por mês</h4>
                                      <chart :type="'line'" :data="seriesData" :options="options"></chart>
                                  </article>

                                  &nbsp&nbsp&nbsp

                                  <article class="tile is-4 is-child box">
									  <p class="control">
						                <span class="select">
						                  <select @change="calculateTotals">
						                    <option>Total dos mêses</option>
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
									  <h4 class="title" style="color: #a3a5a7">total</h4>

									  <div class="table-responsive">
										  <table class="table is-bordered is-striped is-narrow">
							                <thead>
							                  <tr>
							                    <th>Plataforma</th>
							                    <th>Valor</th>
							                  </tr>
							                </thead>
							                <tfoot>
							                  <tr>
							                    <th>Total</th>
												<th>R$ {{this.total.all}}</th>
							                  </tr>
							                </tfoot>
							                <tbody>
							                  <tr>
							                    <td class="is-icon">
							                      OAB
							                    </td>
							                    <td>
							                      R$ {{this.total.oab}}
							                    </td>
							                  </tr>
											  <tr>
							                    <td class="is-icon">
							                      Eng. Civil
							                    </td>
							                    <td>
							                      R$ {{this.total.civil}}
							                    </td>
							                  </tr>
											  <tr>
							                    <td class="is-icon">
							                      Legislativo
							                    </td>
							                    <td>
							                      R$ {{this.total.leg}}
							                    </td>
							                  </tr>
											  <tr>
							                    <td class="is-icon">
							                      Diplomacia
							                    </td>
							                    <td>
							                      R$ {{this.total.dipl}}
							                    </td>
							                  </tr>
											  <tr>
							                    <td class="is-icon">
							                      Controle
							                    </td>
							                    <td>
							                      R$ {{this.total.contrl}}
							                    </td>
							                  </tr>
											  <tr>
							                    <td class="is-icon">
							                      Tribunais
							                    </td>
							                    <td>
							                      R$ {{this.total.trib}}
							                    </td>
							                  </tr>
							                </tbody>
							              </table>
									  </div>
                                  </article>

                              </div>
                              <div v-else style="align: center;">
                                  <i class="fa fa-spinner fa-pulse fa-3x fa-fw" aria-hidden="true"></i>
                              </div>

                  </collapse-item>

                  <collapse-item title="Vendas por mês">

                  </collapse-item>

                </collapse>
              </div>
            </article>
          </div>
      </div>

        <br /><br />
        <div class="tile is-ancestor">


            <div class="tile is-ancestor">
                <div class="tile is-parent">
                    <div v-if="!loading"  class="tile is-child box">
                        <tabs type="boxed" :is-fullwidth="true" alignment="centered" size="large">

                            <tab-pane label="Exame da OAB" icon="fa fa-gavel">
                                <transaction-table :transactions="transactionData.oab" />
                            </tab-pane>

                            <tab-pane label="Engenharia Civil" icon="fa fa-building">
                                <transaction-table :transactions="transactionData.civil" />
                            </tab-pane>

                            <tab-pane label="Legislativo" icon="fa fa-university">
                                <transaction-table :transactions="transactionData.legislativo" />
                            </tab-pane>

							<tab-pane label="Diplomacia" icon="fa fa-handshake-o">
                                <transaction-table :transactions="transactionData.diplomacia" />
                            </tab-pane>

                            <tab-pane label="Controle" icon="fa fa-usd">
                                <transaction-table :transactions="transactionData.controle" />
                            </tab-pane>

                            <tab-pane label="Tribunais" icon="fa fa-gavel">
                                <transaction-table :transactions="transactionData.tribunais" />
                            </tab-pane>

                        </tabs>
                    </div>
                    <div v-else style="text-align: center;">
                        <i class="fa fa-spinner fa-pulse fa-3x fa-fw" aria-hidden="true"></i>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import Chart from 'vue-bulma-chartjs'
import axios from 'axios'
import TransactionTable from '../components/TransactionTable'
import { Tabs, TabPane } from 'vue-bulma-tabs'
import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse'


export default {
    components: {
        Chart,
        TransactionTable,
        Tabs,
        TabPane,
        Collapse,
        CollapseItem
    },

    data () {
        return {
            transactionData: {},
            chartData: {},
            total: {},
            chartLoading: true,
            loading: true,

            // CHARTS
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Aug', 'Set', 'Out', 'Nov', 'Dez'],
            data: [
                [],                 // OAB
                [],                 // Civil
                [],                 // Legislativo
				[],					// Diplomacia
				[],					// Controle
				[]					// Tribunais
            ],
            options: {
                tooltips: {
                    mode: 'label'
                }
            },
            backgroundColor: [
                'rgba(151, 205, 118, 1)',
                'rgba(31, 200, 219, 1)',
                'rgba(102, 126, 131, 1)',
				'rgba(182, 170, 6, 1)',
				'rgba(146, 47, 186, 1)',
				'rgba(153, 158, 48, 1)'
            ],
            series: ['OAB', 'Civil', 'Legislativo', 'Diplomacia', 'Controle', 'Tribunais'],
			currentMonth: 0
        }
    },

    mounted () {
		this.currentMonth= new Date().getMonth() + 1;

        axios.all([
            axios.get('https://api.examedaoab.com/api/admin/transactions'),
            axios.get('https://apicivil.maquinadeaprovacao.com/api/admin/transactions'),
            axios.get('https://apilegislativo.maquinadeaprovacao.com/api/admin/transactions'),
			axios.get('https://apidiplomacia.maquinadeaprovacao.com/api/admin/transactions'),
			axios.get('https://api.concursocontrole.com.br/api/admin/transactions'),
			axios.get('https://apitribunais.maquinadeaprovacao.com/api/admin/transactions')

        ]).then(axios.spread( (oab, civil, leg, dipl, contrl, trib) => {
            this.transactionData.oab         = oab.data.reverse()
            this.transactionData.civil       = civil.data.reverse()
            this.transactionData.legislativo = leg.data.reverse()
			this.transactionData.diplomacia  = dipl.data.reverse()
			this.transactionData.controle    = contrl.data.reverse()
			this.transactionData.tribunais   = trib.data.reverse()

            this.loading                     = false
        }));

        axios.all([
            axios.get('https://api.examedaoab.com/api/admin/transactions-by-month'),
            axios.get('https://apicivil.maquinadeaprovacao.com/api/admin/transactions-by-month'),
            axios.get('https://apilegislativo.maquinadeaprovacao.com/api/admin/transactions-by-month'),
			axios.get('https://apidiplomacia.maquinadeaprovacao.com/api/admin/transactions-by-month'),
			axios.get('https://api.concursocontrole.com.br/api/admin/transactions-by-month'),
			axios.get('https://apitribunais.maquinadeaprovacao.com/api/admin/transactions-by-month')
        ]).then(axios.spread( (oab, civil, leg, dipl, contrl, trib) => {
            this.chartData.oab         = oab.data
			console.log(this.chartData.oab)
            this.chartData.civil       = civil.data
            this.chartData.legislativo = leg.data
			this.chartData.diplomacia  = dipl.data
			this.chartData.controle    = contrl.data
			this.chartData.tribunais   = trib.data

            this.chartLoading          = false

            this.calculateTotals()
        }));

    },

    computed: {

        seriesData () {

            let data = {
                labels: this.labels
            }
            data.datasets = this.series.map((e, i) => {
                return {
                    data: this.getChartData(i),
                    label: this.series[i],
                    borderColor: this.backgroundColor[i].replace(/1\)$/, '.5)'),
                    pointBackgroundColor: this.backgroundColor[i],
                    backgroundColor: this.backgroundColor[i].replace(/1\)$/, '.5)')
                }
            })
            return data
        }

    },

    methods: {

        getChartData(i) {
            if(i == 0) return this.chartData.oab.data.amount
            if(i == 1) return this.chartData.civil.data.amount
            if(i == 2) return this.chartData.legislativo.data.amount
			if(i == 3) return this.chartData.diplomacia.data.amount
			if(i == 4) return this.chartData.controle.data.amount
			if(i == 5) return this.chartData.tribunais.data.amount

        },

        calculateTotals(month) {
			let monthOffset = month+1;
			
            this.total.oab    = this.chartData.oab.data.amount.reduce( (a, b) => a+b, 0);
            this.total.civil  = this.chartData.civil.data.amount.reduce( (a, b) => a+b, 0);
            this.total.leg    = this.chartData.legislativo.data.amount.reduce( (a, b) => a+b, 0);
			this.total.dipl   = this.chartData.diplomacia.data.amount.reduce( (a, b) => a+b, 0);
			this.total.contrl = this.chartData.controle.data.amount.reduce( (a, b) => a+b, 0);
			this.total.trib   = this.chartData.tribunais.data.amount.reduce( (a, b) => a+b, 0);

			let totalArray    = Object.values(this.total)

			this.total.all    = totalArray.reduce( (a, b) => a+b, 0);
			console.log(this.total.all)
        }
    }



}
</script>

<style lang="scss" scoped>
.card+.card {
    margin-top: 20px
}
</style>
