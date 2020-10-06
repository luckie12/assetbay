<template>
    <div style="padding:50px;" v-if="pendingAssets.length > 0" >
        <b-row class="block align-items-center d-flex" v-for="(o, index) in groupedAssets" :key="index">
            <b-col v-for="(x, index) in o" :key="index" class="col-lg-3">
                <div class="card">
                    <img :src="x.asset_image" alt="Avatar" style="width:100%; height:200px;">
                    <div class="container" style="padding:20px;">
                        <b-button class="button" variant="primary" v-if="!x.pending">Manage</b-button>
                        <div v-else class="button">
                            <b-button-group>
                                <b-button variant="success" @click="acceptAsset(x.asset_id)">Accept</b-button>
                                <b-button variant="danger" @click="denyAsset(x.asset_id)">Deny</b-button>
                            </b-button-group>
                        </div>
                        <h4 id="asset_title"><b>{{x.asset_title | truncate(30, '...')}}</b></h4>
                    </div>
                </div>
            </b-col>
        </b-row>
    </div>
    <div style="padding:50px;" v-else>
        <b-alert variant="primary" show>There are currently no pending products!</b-alert>
    </div>
</template>

<script>
    import { db } from '../../firebase';
    import _ from "lodash";
    export default {
        name: 'pending',
        data() {
            return {
                users: [],
                pendingAssets: []
            }
        },
        computed:{
            pendingCollection(){
                return db.collection('pending').where('pending', '==', true)
                //return db.doc(`pending/${auth.currentUser.uid}`).collection('products')
            },
            groupedAssets() {
                return _.chunk(this.pendingAssets, 4)
            }
        },
        methods:{
            acceptAsset(id){
                db.collection("pending").doc(id).update({
                    pending: false
                })
            },
            denyAsset(id){
                db.collection("pending").doc(id).update({
                    pending: false,
                    denied: true
                })
            }
        },
        firestore(){
          return {
              pendingAssets: this.pendingCollection
          }
        },
        async created() {
            const pendings = await db.collection("pending").where('pending', '==', true).get()
            for(const pending of pendings.docs){
                this.todos.push(pending.data())
                const users = await db.collection('users').where('user_id', '==', `${pending.data().user_id}`).get()
                for (const user of users.docs) {
                    this.users.push(user.data())
                    this.pendingAssets = [...this.todos, ...this.users]
                    this.pendingAssets.pop()
                }
            }

            /*
            pendings.forEach(doc => {
                this.todos.push(doc.data())
            })
            */
            /*
            const productsRef = db.collection("pending/6Xay5jSVuAOnOd15rgeXwK7MCir1/products");
            productsRef.get()
                .then((snapshot) => {
                    snapshot.docs.forEach(doc => {
                        console.log(doc.data())
                        return 'ALL OK'
                    })
                })
                .catch((error) => {
                    console.log("Error getting countries:", error);
                });
             */
            return 'NOT FOUND'
        }
    }
</script>

<style>
    .button{
        float: right;
        font-family: MPB;
        margin-bottom: 5px;
    }
</style>
