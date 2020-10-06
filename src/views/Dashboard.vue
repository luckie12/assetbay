<template>
    <div style="padding:50px;">
        <b-row class="m-3">
            <b-button-group>
                <b-button variant="light" to="new"> <b-icon icon="plus"></b-icon> Sell Product</b-button>
                <b-button variant="light" to="myassets"><b-icon icon="cart4"></b-icon> Assets</b-button>
                <b-button variant="light" to="settings"><b-icon icon="asterisk"></b-icon></b-button>
                <b-button variant="light" to="stats"><b-icon icon="bar-chart-fill"></b-icon></b-button>
                <b-button v-if="user.admin" variant="danger" to="/admin/manage" style="color:white;"><b-icon icon="wrench"></b-icon> Admin</b-button>
                <b-button v-if="user.admin" :disabled="pendingProducts.length === 0" :variant="pendingProducts.length > 0 ? 'success' : 'danger'" to="/admin/pending" style="color:white; margin: 0 !important;">
                    <span v-if="pendingProducts.length > 0">Listings Pending <b-badge variant="light">{{pendingProducts.length}}</b-badge></span>
                    <span v-else>No products pending</span>
                </b-button>
            </b-button-group>
        </b-row>
        <b-row class="block align-items-center d-flex" v-for="(o, index) in groupedAssets" :key="index">
            <b-col v-for="(x, index) in o" :key="index" class="col-lg-3">
                <div class="card mt-3">
                    <img :src="x.asset_image" alt="Avatar" style="width:100%; height:200px;">
                    <div class="container" style="padding:20px;">
                        <b-button :to="'asset/'+x.asset_id" class="button" variant="primary" v-if="!x.pending && !x.denied">Manage</b-button>
                        <span class="button" variant="danger" v-else-if="x.denied" show>DENIED<br> <router-link to="/new">Why?</router-link> </span>
                        <span class="button" variant="danger" v-else show>Pending</span>
                        <h4 id="asset_title"><b>{{x.asset_title | truncate(30, '...')}}</b></h4>
                        <b-form-rating inline no-border readonly color="#000" style="padding:0px !important; position: relative; left:0; bottom: 0;" :value="x.asset_rating" v-if="!x.denied"></b-form-rating>
                    </div>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import _ from "lodash";
    import { db } from "../firebase";
    export default {
        name: 'Dashboard',
        data() {
            return {
                highlights: [
                    { creator: 'Ventuar3D', asset_title: 'Low Poly Medieval Castle Pack', asset_url: '#t', thumbnail: 'https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/4b53f1a1-5f9b-4503-87ba-0592b9d1cd44.webp', rating: 4 },
                    { creator: 'Ventuar3D', asset_title: 'Low Poly Medieval Castle Pack', asset_url: '#2', thumbnail: 'https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/ad87ded1-df4c-4cd5-a381-667f80677099.webp', rating: 3 },
                    { creator: 'Ventuar3D', asset_title: 'Low Poly Medieval Castle Pack', asset_url: '#3', thumbnail: 'https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/1fa19fc9-2530-4998-9c1b-fa3cec3902a2.webp', rating: 2 },
                    { creator: 'Ventuar3D', asset_title: 'Low Poly Medieval Castle Pack', asset_url: '#4', thumbnail: 'https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/1895cd4a-341e-4dd9-a6f9-80f4fa4d08db.webp', rating: 5 }
                ],
                listings: [],
                pendingProducts: []
            }
        },
        computed:{
            user(){
                return this.$store.getters.user
            },
            listingCollection() {
                //let uid = auth.currentUser.uid
                let uid = this.user.user_id
                return db.collection('pending').where('user_id', '==', uid)
                //return db.doc(`users/${uid}`).collection(`listings`);
            },
            groupedAssets() {
                return _.chunk(this.listings, 4)
            },
            pendingCollection(){
                return db.collection('pending').where('pending', '==', true)
                //return db.doc(`pending/products`).collection(`${this.user.uid}`)
            }
        },
        filters:{
            truncate: function(text, stop, clamp) {
                return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
            }
        },
        firestore() {
            return {
                listings: this.listingCollection,
                pendingProducts: this.pendingCollection
            };
        },
        methods:{
        }
    }
</script>

<style scoped>
    #creator{
        float: right;
        font-family: ROBLI;
        margin-bottom: 5px;
    }
    .button{
        float: right;
        font-family: MPB;
        margin-bottom: 5px;
    }
    #asset_title{
        font-family: ROBLI;
    }
    b-form-rating:focus{
        outline: 0;
    }
</style>

