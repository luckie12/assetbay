<template>
    <div>
        <b-row class="block align-items-center d-flex  m-5" v-for="(o, index) in groupedAssets" :key="index">
            <b-col v-for="(x, index) in o" :key="index" class="col-lg-3">
                <div class="card">
                    <img :src="x.asset_image" alt="Avatar" style="width:100%; height:200px;">
                    <div class="container" style="padding:20px;">
                        <p id="creator">{{x.user_id}}</p>
                        <h4 id="asset_title"><b>{{x.asset_title}}</b></h4>
                        <b-form-rating inline no-border readonly color="#000" style="padding:0px !important; position: relative; left:0; bottom: 0;" :value="x.rating"></b-form-rating>
                        <b-button variant="primary" style="float:right; font-size:20px; font-family: ROBB;" :to="'asset/'+x.asset_id"><span>&euro;14,95</span></b-button>
                    </div>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import _ from 'lodash'
    export default {
        props: ['assets'],
        data() {
            return {
                value: 5
            }
        },
        computed:{
            groupedAssets() {
                return _.chunk(this.$props.assets, 4)
            }
        }
    }
</script>

<style scoped>
    #asset_title{
        font-family: ROBB;
    }
    #creator{
        font-family: ROBMI;
    }

    .card {
        /* Add shadows to create the "card" effect */
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        width:100%;
    }

    /* On mouse-over, add a deeper shadow */
    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    /* Add some padding inside the card container */
    .container {
        padding: 2px 16px;
    }
</style>

