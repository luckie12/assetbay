<template>
    <div>
        <b-table
                id="my-table"
                :items="assets"
                :per-page="perPage"
                :current-page="currentPage"
                :fields="fields"
                small
                striped
                hover
                head-variant="light"
                table-variant="light"
        >

            <template v-slot:cell(actions)="row">
                <b-button-group>
                    <b-dropdown size="md" id="dropdown-1" text="Actions" :disabled="row.item.banned">
                        <b-dropdown-item @click="acceptAsset(row.item.asset_id)">Accept</b-dropdown-item>
                    </b-dropdown>
                </b-button-group>
            </template>

        </b-table>
        <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table"
        ></b-pagination>
        <p class="mt-3">Current Page: {{ currentPage }}</p>
    </div>
</template>

<script>
    import { db } from '../firebase'
    export default {
        props: ['assets'],
        data() {
            return {
                perPage: 100,
                currentPage: 1,
                fields: ['user_id', 'asset_id', 'asset_title', 'asset_description', 'actions']
            }
        },
        methods:{
            acceptAsset(id){
                db.collection('pending').doc(id).update({
                    denied: false
                })
            }
        }
    }
</script>