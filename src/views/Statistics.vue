<template>
    <div style="padding:50px;">
        <b-row>
            <line-chart style="width:100%;" :chart-data="datacollection"></line-chart>
        </b-row>
    </div>
</template>

<script>
    import LineChart from "../components/LineChart";

    export default {
        components:{
            LineChart
        },
       data() {
           return {
               datacollection: null
           }
       },
        created() {
            this.fillData()
            this.datacollection.datasets[0].data = [0, 0, 55, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        methods:{
            fillData () {
                // Get data from database, duh
                this.datacollection = {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
                    datasets: [
                        {
                            label: '# Total Sales in 2020',
                            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            backgroundColor: '#ff7979'
                        },
                        {
                            label: '# Total Ratings received in 2020',
                            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            backgroundColor: '#badc58'
                        }
                    ]
                }
            }
        }
    }
</script>
