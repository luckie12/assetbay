<template>
  <div id="app">
      <div class="menu" v-if="!['NotFound'].includes($route.name)" style="background: white;">
        <b-row>
           <b-col>
               <img src="@/assets/images/assetbay_dark.png" alt="Logo" style=" margin:30px !important; width:200px;">
           </b-col>
           <b-col>
               <div style="float: right; padding-top:50px;">
                   <a href="" v-if="!this.$store.getters.user">Sell Your Creativity</a>
                   <router-link to="/dashboard" v-else>Dashboard</router-link>
                   <a href="" @click.prevent="$bvModal.show('bv-modal-example')" v-if="!this.$store.getters.user">Log In</a>
                   <a href="" @click.prevent="logout()" v-else>Log Out</a>
               </div>
           </b-col>
        </b-row>
      </div>
      <router-view/>
      <div class="footer" style="padding:50px;" v-if="!['NotFound'].includes($route.name)">
          <b-row>
              <b-col>
                  <img src="@/assets/images/assetbay_light.png" alt="" style="width:200px;" class="pt-2 pb-2">
              </b-col>
              <b-col>
                  <div style="float:right; color: white;" class="pt-4">
                      <router-link to="/">Home</router-link> | <router-link to="/dashboard">Dashboard</router-link> | <router-link to="/about">About</router-link> | <router-link to="/faq">FAQ</router-link> | <router-link to="/contact">Contact</router-link>
                  </div>
              </b-col>
          </b-row>
          <div class="hl"></div>
          <b-row>
              <b-col class="text-center pt-4" style="color:white;">
                  Copyright © BruteNet {{new Date().getFullYear()}}
              </b-col>
          </b-row>
      </div>

      <b-modal id="bv-modal-example" hide-footer>
          <template v-slot:modal-title>
              Login to <code>AssetBay</code>
          </template>
          <div class="d-block text-center">
              <div v-if="user">
                  Logged in as {{ user.email }}
                  <b-button class="mt-3" block @click="logout()">Logout</b-button>
              </div>
              <div v-else>
                  not logged in!
                  <h1>Sign In</h1>
                  <input type="email" v-model="email"><br>
                  <input type="password" v-model="password"><br>
                  <b-button class="mt-3" @click="login()">Login</b-button>
                  <h1>Sign in Anonymously</h1>
                  <b-button class="mt-3" block @click="auth.signInAnonymously()">Login</b-button>
                  <br>
                  <h3>Register new user!</h3>
                  <input type="email" v-model="email"><br>
                  <input type="password" v-model="password"><br>
                  <b-button class="mt-3" @click="register()">Register</b-button>
              </div>
          </div>
          <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
      </b-modal>
  </div>
</template>

<script>
    import { auth, db } from './firebase'

  export default {
    data() {
      return {
          auth,
          name: '',
          email: '',
          password: '',
          isLoggedIn: false,
          currentUser: false
      }
    },
      methods:{
        logout() {
            auth.signOut()
                .then(() => {
                    this.$store.dispatch('logout')
                    this.$router.go('/')
                })
        },
        login() {
            this.$store.dispatch('signIn', {email: this.email, password: this.password})
        },
          register(){
              this.$store.dispatch('signUp', {email: this.email, password: this.password})
          },
          showModal() {
              this.$refs['my-modal'].show()
          },
          hideModal() {
              this.$refs['my-modal'].hide()
          },
          log(){
              console.log(this.auth)
          }
      },
      computed:{
        user(){
            return this.$store.getters.user
        }
      },
      firestore(){
      },
      created() {
          auth.onAuthStateChanged(function (user) {
              if (user) {
                  console.log('I HAVE CHANGED')
                  console.log(user.uid)
                  // Check if user exists in database if so, do nothing
                  /*
                  db.collection('users').doc(`${user.uid}`).set({
                      email: user.email,
                      admin: false,
                      user_id: user.uid
                  })
                  */
                  const userRef = db.collection('users').doc(`${user.uid}`)
                  userRef.get()
                  .then((docSnap) => {
                      if(!docSnap.exists)
                          db.collection('users').doc(`${user.uid}`).set({
                              email: user.email,
                              admin: false,
                              user_id: user.uid,
                              created_at: new Date().getTime()
                          })
                  })
              } else {
                  console.log('No user is signed in 2.')
              }
          })
      }
  }
</script>

<style>
    body{
        background:#F6F6F6 !important;
    }
  .menu{
    width:100%;
    /*height:100px;*/
    margin:0;
  }
  .menu a{
      margin: 50px !important;
      font-family: MPM;
      list-style-type: none;
      text-decoration: none;
      color:black;
  }
  .footer{
      background: url('assets/images/bg.png');
      height:200px;
  }
  .footer a{
      color:white;
  }
  .footer a:hover{
      text-decoration: none;
      color:white;
  }
    .menu a:hover{
        text-decoration: none;
        color:black;
    }
  .hl{
      width:99%;
      height:2px;
      background: white;

  }

    @font-face{
      font-family: MPB;
        src:url('assets/fonts/MavenPro-Black.ttf')
    }
  @font-face{
      font-family: MPBO;
      src:url('assets/fonts/MavenPro-Bold.ttf')
  }
  @font-face{
      font-family: MPM;
      src:url('assets/fonts/MavenPro-Medium.ttf')
  }
    @font-face {
        font-family: ROBLI;
        src: url("assets/fonts/Roboto-LightItalic.ttf");
    }
  @font-face {
      font-family: ROBREG;
      src: url("assets/fonts/Roboto-Regular.ttf");
  }
    @font-face {
        font-family: ROBB;
        src: url("assets/fonts/Roboto-Bold.ttf");
    }
    @font-face {
        font-family: ROBMI;
        src: url("assets/fonts/Roboto-MediumItalic.ttf");
    }
    @font-face {
        font-family: ROBLI;
        src: url("assets/fonts/Roboto-LightItalic.ttf");
    }
</style>
