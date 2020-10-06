<template>
    <div class="card">
        <img :src="highlights[0].thumbnail" alt="Avatar" style="width:100%">
        <img src="../assets/images/highlightbanner.png" alt="" style="position: absolute;">
        <div class="container" style="padding:20px;">
            <p id="creator">{{highlights[0].creator}}</p>
            <h4 id="asset_title"><b>{{highlights[0].asset_title}}</b></h4>
            <b-form-rating no-border readonly style="padding:20px;" color="#ffd000" class="pt-4" :value="highlights[0].rating"></b-form-rating>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['highlights'],
        data() {
            return {
                value: 5,
            }
        }
    }
</script>

<style scoped>
    #creator{
        float: right;
        font-family: ROBLI;
        margin-bottom: 5px;
    }
    #asset_title{
        font-family: ROBLI;
    }

    .card {
        /* Add shadows to create the "card" effect */
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        width:80%;
        float: right;
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

