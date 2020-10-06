<template>
    <div style="padding: 50px;">
        <b-row v-if="retrievedAssets[0]">
            <b-col style="padding:0;">
                <b-row style="padding:0;">
                    <b-col style="padding:0;">
                        <b-col style="padding:0;">
                            <h1 style="float:left;">{{retrievedAssets[0].asset_title}}</h1>
                            <span style="font-family: ROBLI;float:left; padding:10px;" class="pt-3">{{retrievedAssets[0].user_id}}</span>
                            <b-button v-b-modal.modal-1 variant="primary" @click="loadPaypal()" style="float:right; position:relative; top:40px;">Pay at least <b>${{retrievedAssets[0].asset_price}}</b></b-button>
                        </b-col>
                        <div style="clear: both; padding:0;">
                            <b-form-rating inline no-border readonly color="#4692C1" style="padding:0px !important; clear:both; position: relative; left:0; bottom: 0; background:none;" value="4"></b-form-rating>
                        </div>
                        <b-col style="padding:0;">
                            <img :src="retrievedAssets[0].asset_image" alt="" style="width:80.25%; float:left;">
                        </b-col>
                        <b-col style="padding:0;">
                            <b-row>
                                <img :src="retrievedAssets[0].asset_image" class="pl-2 pb-2" alt="" style="width:100%;">
                            </b-row>
                            <b-row>
                                <img :src="retrievedAssets[0].asset_image" class="pl-2 pb-2" alt="" style="width:100%;">
                            </b-row>
                            <b-row>
                                <img :src="retrievedAssets[0].asset_image" class="pl-2 pb-2" alt="" style="width:100%;">
                            </b-row>
                            <b-row>
                                <img :src="retrievedAssets[0].asset_image" class="pl-2 pb-2" alt="" style="width:100%;">
                            </b-row>
                        </b-col>
                    </b-col>
                </b-row>
                <b-row style="padding:0;">
                    <b-col style="padding:0;">
                        <div><h1>Description</h1></div>
                        <div style="width:100%;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit elit eget turpis posuere fringilla. Vivamus ante massa, bibendum sit amet elit nec, lacinia sodales ante. Vestibulum scelerisque velit vitae lacinia feugiat. Quisque euismod arcu felis, vitae pretium erat auctor ut. Proin sapien turpis, vulputate vitae odio ut, pellentesque iaculis metus. Nunc vel nunc ipsum. Nullam elementum suscipit vulputate.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit elit eget turpis posuere fringilla. Vivamus ante massa, bibendum sit amet elit nec, lacinia sodales ante. Vestibulum scelerisque velit vitae lacinia feugiat. Quisque euismod arcu felis, vitae pretium erat auctor ut. Proin sapien turpis, vulputate vitae odio ut, pellentesque iaculis metus. Nunc vel nunc ipsum. Nullam elementum suscipit vulputate.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit elit eget turpis posuere fringilla. Vivamus ante massa, bibendum sit amet elit nec, lacinia sodales ante. Vestibulum scelerisque velit vitae lacinia feugiat. Quisque euismod arcu felis, vitae pretium erat auctor ut. Proin sapien turpis, vulputate vitae odio ut, pellentesque iaculis metus. Nunc vel nunc ipsum. Nullam elementum suscipit vulputate.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit elit eget turpis posuere fringilla. Vivamus ante massa, bibendum sit amet elit nec, lacinia sodales ante. Vestibulum scelerisque velit vitae lacinia feugiat. Quisque euismod arcu felis, vitae pretium erat auctor ut. Proin sapien turpis, vulputate vitae odio ut, pellentesque iaculis metus. Nunc vel nunc ipsum. Nullam elementum suscipit vulputate.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit elit eget turpis posuere fringilla. Vivamus ante massa, bibendum sit amet elit nec, lacinia sodales ante. Vestibulum scelerisque velit vitae lacinia feugiat. Quisque euismod arcu felis, vitae pretium erat auctor ut. Proin sapien turpis, vulputate vitae odio ut, pellentesque iaculis metus. Nunc vel nunc ipsum. Nullam elementum suscipit vulputate.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit elit eget turpis posuere fringilla. Vivamus ante massa, bibendum sit amet elit nec, lacinia sodales ante. Vestibulum scelerisque velit vitae lacinia feugiat. Quisque euismod arcu felis, vitae pretium erat auctor ut. Proin sapien turpis, vulputate vitae odio ut, pellentesque iaculis metus. Nunc vel nunc ipsum. Nullam elementum suscipit vulputate.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit elit eget turpis posuere fringilla. Vivamus ante massa, bibendum sit amet elit nec, lacinia sodales ante. Vestibulum scelerisque velit vitae lacinia feugiat. Quisque euismod arcu felis, vitae pretium erat auctor ut. Proin sapien turpis, vulputate vitae odio ut, pellentesque iaculis metus. Nunc vel nunc ipsum. Nullam elementum suscipit vulputate.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit elit eget turpis posuere fringilla. Vivamus ante massa, bibendum sit amet elit nec, lacinia sodales ante. Vestibulum scelerisque velit vitae lacinia feugiat. Quisque euismod arcu felis, vitae pretium erat auctor ut. Proin sapien turpis, vulputate vitae odio ut, pellentesque iaculis metus. Nunc vel nunc ipsum. Nullam elementum suscipit vulputate.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit elit eget turpis posuere fringilla. Vivamus ante massa, bibendum sit amet elit nec, lacinia sodales ante. Vestibulum scelerisque velit vitae lacinia feugiat. Quisque euismod arcu felis, vitae pretium erat auctor ut. Proin sapien turpis, vulputate vitae odio ut, pellentesque iaculis metus. Nunc vel nunc ipsum. Nullam elementum suscipit vulputate.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit elit eget turpis posuere fringilla. Vivamus ante massa, bibendum sit amet elit nec, lacinia sodales ante. Vestibulum scelerisque velit vitae lacinia feugiat. Quisque euismod arcu felis, vitae pretium erat auctor ut. Proin sapien turpis, vulputate vitae odio ut, pellentesque iaculis metus. Nunc vel nunc ipsum. Nullam elementum suscipit vulputate.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit elit eget turpis posuere fringilla. Vivamus ante massa, bibendum sit amet elit nec, lacinia sodales ante. Vestibulum scelerisque velit vitae lacinia feugiat. Quisque euismod arcu felis, vitae pretium erat auctor ut. Proin sapien turpis, vulputate vitae odio ut, pellentesque iaculis metus. Nunc vel nunc ipsum. Nullam elementum suscipit vulputate.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit elit eget turpis posuere fringilla. Vivamus ante massa, bibendum sit amet elit nec, lacinia sodales ante. Vestibulum scelerisque velit vitae lacinia feugiat. Quisque euismod arcu felis, vitae pretium erat auctor ut. Proin sapien turpis, vulputate vitae odio ut, pellentesque iaculis metus. Nunc vel nunc ipsum. Nullam elementum suscipit vulputate.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit elit eget turpis posuere fringilla. Vivamus ante massa, bibendum sit amet elit nec, lacinia sodales ante. Vestibulum scelerisque velit vitae lacinia feugiat. Quisque euismod arcu felis, vitae pretium erat auctor ut. Proin sapien turpis, vulputate vitae odio ut, pellentesque iaculis metus. Nunc vel nunc ipsum. Nullam elementum suscipit vulputate.</div>
                    </b-col>
                </b-row>
            </b-col>
            <b-col>
                Review stuffs
            </b-col>
        </b-row>
        <b-row v-else>
            <b-spinner variant="primary" label="Text Centered"></b-spinner>
        </b-row>
        <b-modal id="modal-1" centered :title="'About to buy: '+ retrievedAssets[0].asset_title +  ' by '+ retrievedAssets[0].user_id" ok-only ok-title="Cancel">
            <b-form-group
                    id="fieldset-1"
                    description="Pay a custom amount."
                    label="Enter custom amount"
                    label-for="input-1"
            >
                <b-input id="input-1" placeholder="Custom amount" type="number" v-model="customAmount" min="0" max="1000000"></b-input>
            </b-form-group>
            <div ref="paypal"></div>
        </b-modal>

        <b-toast id="my-toast" variant="success" solid>
            <template v-slot:toast-title>
                <div class="d-flex flex-grow-1 align-items-baseline">
                    <b-img blank blank-color="green" class="mr-2" width="12" height="12"></b-img>
                    <strong class="mr-auto">Thanks!</strong>
                    <small class="text-muted mr-2">Just now</small>
                </div>
            </template>
            Thankyou for buying this asset!
        </b-toast>

    </div>
</template>

<script>
    import { db } from '../firebase'
    export default {
        name: 'asset',
        data () {
            return {
                retrievedAssets: [],
                paidFor: false,
                loaded: false,
                customAmount: 0
            }
        },
        computed: {
            user(){
                return this.$store.getters.user
            },
            pendingCollection(){
                return db.collection('pending').where('asset_id', '==', this.$route.params.id)
            }
        },
        firestore() {
            return {
                retrievedAssets: this.pendingCollection
            };
        },
        async mounted() {
            /*
            const script = document.createElement("script")
            script.src = "https://www.paypal.com/sdk/js?client-id=ATGBOOljgL_Q2I4xbqWHKeq--nnAoOKw2-iIGsQL107jZCpEQ13xD-83DtYKK92h3jQ_QxAGsLl5MFJF"
            script.addEventListener("load", this.setLoaded)
            document.body.appendChild(script)
             */
        },
        methods: {
            loadPaypal(){
                const script = document.createElement("script")
                script.src = "https://www.paypal.com/sdk/js?client-id=ATGBOOljgL_Q2I4xbqWHKeq--nnAoOKw2-iIGsQL107jZCpEQ13xD-83DtYKK92h3jQ_QxAGsLl5MFJF"
                script.addEventListener("load", this.setLoaded)
                document.body.appendChild(script)
            },
            setLoaded () {
                this.loaded = true
                window.paypal.Buttons({
                    style: {
                        size: 'responsive',
                        color: 'blue',
                        shape: 'pill',
                        label: 'pay',
                        layout: 'horizontal',
                        tagline: false,
                    },
                    createOrder: async (data, actions) => {
                        let actual_price = this.retrievedAssets[0].asset_price
                        const cityRef = db.collection('pending').doc(this.retrievedAssets[0].asset_id);
                        const doc = await cityRef.get();
                        if (doc.exists) {
                            console.log('Document data:', doc.data().asset_price);
                            actual_price = doc.data().asset_price
                        }
                        return actions.order.create({
                            purchase_units: [{
                                payee:{
                                    email: this.user.email
                                },
                                amount: {
                                    value: actual_price
                                }
                            }]
                        })
                    },
                    onApprove: (data, actions) => {
                        let _this = this
                        return actions.order.capture().then(function(details){
                            if(details.status === "COMPLETED") {
                                //send mail?
                                console.log(details)
                                _this.$bvToast.show('my-toast')
                                db.collection(`users/${_this.user.user_id}/purchases`).add({
                                    asset_id: _this.retrievedAssets[0].asset_id
                                })
                                //alert('Thank you for buying on AssetBay! Email sent to: ' + details.payer.email_address)
                            }
                            console.log(details)
                        })
                    }
                })
                .render(this.$refs.paypal)
            }
        }
    }
</script>

<style scoped>
    #floated-imgs img {display: block; }
    .infobox{
        position: relative;
        top:20px;
        margin-left:20px !important;
        float:left;
        letter-spacing: 2px;
        background: #E8E8E8;
        height:25px;
        width:35.5%;
        font-size: 15px;
    }
    #modal-1{
        margin: 0 auto;
    }
</style>
