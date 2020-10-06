<template>
    <div>
        <asset-card-bought :assets="assets"/>
    </div>
</template>

<script>
    import AssetCardBought from "../components/AssetCardBought";
    import {db} from "../firebase";

    export default {
        name: 'myassets',
        components:{
            AssetCardBought
        },
        data() {
            return {
                assets: []
            }
        },
        computed:{
            user(){
                return this.$store.getters.user
            },
            assetCollection(){
                let uid = this.user.user_id
                return db.collection('purchases').where('user_id', '==', uid)
            }
        },
        firestore(){
            return {
                assets: this.assetCollection
            }
        }
    }
</script>
