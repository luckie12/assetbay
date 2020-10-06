<template>
    <div style="padding: 50px;">
        <b-row>
            <b-col class="card">
                <h1 class="text-center">User management</h1>
                <b-table
                        id="my-table"
                        :items="users"
                        :per-page="perPage"
                        :current-page="currentPage"
                        :fields="fields"
                        small
                        striped
                        hover
                        head-variant="light"
                        table-variant="light"
                >
                    <template v-slot:cell(admin)="row">
                        <div v-if="row.item.admin">
                            <b-icon icon="check" style="width:25px; height:25px;"></b-icon>
                        </div>
                        <div v-else>
                            <b-icon icon="x" style="width:25px; height:25px;"></b-icon>
                        </div>
                    </template>
                    <template v-slot:cell(actions)="row">
                        <b-button-group>
                            <b-dropdown size="md" id="dropdown-1" text="Promote" :disabled="row.item.banned || user.user_id === row.item.user_id">
                                <b-dropdown-item @click="promote('user', row.item.user_id)">User</b-dropdown-item>
                                <b-dropdown-item @click="promote('admin', row.item.user_id)">Admin</b-dropdown-item>
                            </b-dropdown>
                            <b-button size="md" :disabled="row.item.banned || user.user_id === row.item.user_id" variant="danger" @click="ban(row.item.user_id)"><b-icon icon="hammer"></b-icon> Ban</b-button>
                            <b-button size="md" variant="warning" v-if="row.item.banned" @click="unban(row.item.user_id)">Unban</b-button>
                        </b-button-group>
                    </template>
                    <template v-slot:cell(banned)="row">
                        <div v-if="row.item.banned">
                            This user is banned
                        </div>
                        <div v-else>
                        </div>
                    </template>
                </b-table>
                <b-pagination
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        aria-controls="my-table"
                ></b-pagination>

                <h1 class="text-center">Denied assets</h1>
                <assets-overview :assets="assets" v-if="assets.length > 0"></assets-overview>
                <div v-else class="text-center">
                    <b-alert variant="danger" show>
                        No denied assets available to show
                    </b-alert>
                </div>
                <h1 class="text-center">Overall statistics</h1>
                <line-chart style="width:100%;" :chart-data="datacollection"></line-chart>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import { db } from '../../firebase'
    import AssetsOverview from '../../components/AssetsOverview'
    import LineChart from "../../components/LineChart";

    export default {
        components:{
            AssetsOverview,
            LineChart
        },
        data() {
            return {
                perPage: 100,
                currentPage: 1,
                //fields: ['email', 'user_id', 'admin', 'actions', 'banned'],
                fields: [
                    {key: 'email', sortable: true},
                    {key: 'user_id', sortable: false},
                    {key: 'admin', sortable: true},
                    {key: 'actions', sortable: false},
                    {key: 'banned', sortable: false}
                ],
                users: [],
                assets: [],
                dataCollection: null,
                months: {
                    jan: 0,
                    feb: 0,
                    mar: 0,
                    apr: 0,
                    may: 0,
                    jun: 0,
                    jul: 0,
                    aug: 0,
                    sep: 0,
                    okt: 0,
                    nov: 0,
                    dec: 0
                }
            }
        },
        computed: {
            rows() {
                return this.users.length
            },
            userCollection(){
                return db.collection('users')
            },
            assetsCollection() {
                return db.collection('pending').where('denied', '==', true)
            },
            user(){
                return this.$store.getters.user
            }
        },
        firestore(){
            return {
                users: this.userCollection,
                assets: this.assetsCollection
            }
        },
        created() {
            this.fillData()
        },
        methods: {
            promote(role, uid){
                //Call to DB
                if(role === 'user'){
                    db.collection('users').doc(uid).update({
                        admin: false
                    })
                }else if (role === 'admin'){
                    db.collection('users').doc(uid).update({
                        admin: true
                    })
                }
            },
            ban(uid){
                console.log(uid)
                db.collection('users').doc(uid).update({
                    banned: true
                })
            },
            unban(uid){
                console.log(uid)
                db.collection('users').doc(uid).update({
                    banned: false
                })
            },
            fillData () {

                /*
                const userRef = db.collection('users')
                userRef.get()
                .then((docSnap) => {
                    if(!docSnap.empty){
                        docSnap.forEach(doc => {
                            console.log(doc.id, '=>', doc.data());
                            const month = new Date(doc.data().created_at).getMonth()
                            if(month === 6){
                                // Jul
                                console.log('im jul')
                                this.months.jul += 1
                                console.log(this.months.jul)
                            }
                        });
                    }
                })
                 */


                //new Date(4294181).getMonth()
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
                            label: '# Total Users registered in 2020',
                            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            backgroundColor: '#badc58'
                        },
                        {
                            label: '# New Assets in 2020',
                            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            backgroundColor: '#7ed6df'
                        }
                    ]
                }
            }
        }
    }
</script>