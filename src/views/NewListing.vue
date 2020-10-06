<template>
    <div style="padding:50px;">
        <div class="card m-auto" style="width:50%;">
            <b-form style="padding:50px;" @submit.prevent="addListing()">
                <b-form-group
                        id="input-group-1"
                        label="Asset Title"
                        label-for="input-1"
                        description="Asset Titles will be shortened when exceeding the 30 character mark"
                >
                    <b-form-input
                            id="input-1"
                            type="text"
                            v-model="asset.asset_title"
                            required
                            placeholder="Enter asset title"
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                        id="input-group-2"
                        label="Asset Description"
                        label-for="input-2"
                        description="Max 300 chars."
                >
                    <b-form-textarea
                            id="textarea"
                            v-model="asset.asset_description"
                            placeholder="Enter something..."
                            rows="3"
                            max-rows="6"
                    ></b-form-textarea>
                </b-form-group>

                <b-form-group>
                    <b-form-file
                            v-model="asset.asset_image"
                            placeholder="Choose a file or drop it here..."
                            drop-placeholder="Drop file here..."
                    ></b-form-file>
                </b-form-group>

                <b-form-group
                        id="input-group-3"
                        label="Asset Price"
                        label-for="input-2"
                        description="Put a price for your asset"
                >
                    <b-form-input min="0" type="number" v-model="asset.asset_price" placeholder="Enter a price" :disabled="asset.is_free">
                    </b-form-input>
                    This will be yours: $
                    {{asset.asset_price - (0.05 * asset.asset_price)}}
                </b-form-group>

                <b-form-group>
                    <b-form-checkbox
                            id="checkbox-1"
                            v-model="asset.is_free"
                            name="checkbox-1"
                            :value=true
                            :unchecked-value=false
                    >
                        Free Asset
                    </b-form-checkbox>
                </b-form-group>

                <b-form-group>
                    <b-form-checkbox
                            id="checkbox-2"
                            v-model="asset.allow_overpay"
                            name="checkbox-2"
                            :value=true
                            :unchecked-value=false
                    >
                        Allow over paying
                    </b-form-checkbox>
                </b-form-group>

                <b-form-group>
                    <b-button type="submit" block variant="primary">Add listing</b-button>
                    <b-button type="reset" block variant="danger">Reset</b-button>
                </b-form-group>

            </b-form>
        </div>
    </div>
</template>

<script>
    import { storage, auth, db } from '../firebase'
    export default {
        name: 'newlisting',
        data () {
            return {
                asset: {
                    asset_title: '',
                    asset_description: '',
                    asset_image: null,
                    asset_price: 0,
                    allow_overpay: false,
                    asset_rating: 0,
                    is_free: false
                },
            }
        },
        computed: {
            pendingCollection() {
                //return db.doc(`pending/${auth.currentUser.uid}`)
                return db.collection(`pending`)
            }
        },
        methods: {
            async addListing(){
                let imageUrl = null

                const { id: listingId } = this.pendingCollection.doc()

                const storageRef = storage.ref("listings").child(auth.currentUser.uid).child(this.asset.asset_image.name)
                await storageRef.put(this.asset.asset_image).then(() => {
                    alert('Uploaded!')
                    this.$router.push('/dashboard')
                }, err => alert(err.message))

                imageUrl = await storageRef.getDownloadURL()

                await this.pendingCollection.doc(listingId).set({
                    user_id: auth.currentUser.uid,
                    asset_id: listingId,
                    asset_title: this.asset.asset_title,
                    asset_description:  this.asset.asset_description,
                    asset_image: imageUrl,
                    asset_price: this.asset.is_free ? this.asset.asset_price : 0,
                    allow_overpay: this.asset.allow_overpay,
                    asset_rating: this.asset.asset_rating,
                    is_free: this.asset.is_free,
                    pending: true,
                    denied: false
                })
            }
        }
    }
</script>
