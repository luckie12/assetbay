import Vue from 'vue'
import Vuex from 'vuex'
import {auth,db} from '../firebase'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        user: null
    },
    mutations: {
        setUser (state, payload) {
            state.user = payload;
        },
    },
    getters: {
        user(state) {
            return state.user
        }
    },
    actions: {
        signUp ({commit}, payload) {
            auth.createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    let u = {
                        email: user.user.email,
                        admin: false,
                        user_id: user.user.uid,
                        banned: false
                    }
                    commit('setUser', u)
                }, err => {
                    alert(`${err.message}`)
                })
        },
        signIn({commit}, payload) {
            auth.signInWithEmailAndPassword(payload.email, payload.password)
                .then(async user => {
                    //const x = db.collection('users').where('user_id', '==', user.user.uid)
                    const cityRef = db.collection('users').doc(user.user.uid);
                    const doc = await cityRef.get();
                    if(doc.exists){
                        let u = {
                            email: user.user.email,
                            //get admin from db
                            admin: doc.data().admin,
                            user_id: user.user.uid,
                        }
                        commit('setUser', u)
                    }
                }, err => {
                    alert(`${err.message}`)
                })
            /*
            auth.onAuthStateChanged(function (user) {
                if (user) {
                    commit('setUser', user)
                } else {
                    console.log('No user is signed in 2.')
                }
            })

             */
        },
        logout({commit}){
            commit('setUser', null)
        }
    },
    plugins: [vuexLocal.plugin]
})

export default store