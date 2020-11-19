<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-body px-lg-5 py-lg-5">
                      <div class="alert bg-gradient-success text-dark" role="alert" v-show="loginSuccess" id="registrationSuccessful">
            <h4 class="alert-heading top-text">Welcome!</h4>
            <p class="top-text">Login successful</p>
          </div>
          <div class="alert bg-gradient-danger text-dark" role="alert" v-show="loginError" id="loginError">
            <h4 class="alert-heading top-text">Sorry, an error occured!</h4>
            <p class="top-text">Please check your details and try again</p>
          </div>
                        <form role="form">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="model.email">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password">
                            </base-input>

                            <!-- <base-checkbox class="custom-control-alternative">
                                <span class="text-muted">Remember me</span>
                            </base-checkbox> -->
                            <div class="text-center">
                                <base-button type="primary" class="my-4" @click="loginAdmin">Sign in</base-button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <a href="#" class="text-light"><small>Forgot password?</small></a>
                    </div>
                    <!-- <div class="col-6 text-right">
                        <router-link to="/register" class="text-light"><small>Create new account</small></router-link>
                    </div> -->
                </div>
            </div>
        </div>
</template>
<script>
import axios from 'axios'
  export default {
    name: 'login',
    data() {
      return {
        model: {
          email: '',
          password: ''
        },
        loginError: false,
        loginSuccess: false
      }
    },
    mounted () {
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('accessToken')
      sessionStorage.removeItem('refreshToken')
    },
    methods: {
      async storeSessionDetails (user, accessToken, refreshToken) {
         sessionStorage.setItem('user', JSON.stringify(user))
      sessionStorage.setItem('accessToken', accessToken)
      sessionStorage.setItem('refreshToken', refreshToken)
      let arrayStuff = []
      arrayStuff[0] = await sessionStorage.getItem('user')
      arrayStuff[1] = await sessionStorage.getItem('accessToken')
      arrayStuff[2] = await sessionStorage.getItem('refreshToken')
      console.table(arrayStuff)
      },
      loginAdmin () {
        let adminMail = this.model
        console.log(adminMail)
           axios.post('https://bcc-backend.herokuapp.com/login/', {
        'email': adminMail.email,
        'password': adminMail.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        console.log(res)
        this.loginSuccess = true
        this.storeSessionDetails(res.data.user, res.data.access_token, res.data.refresh_token)
          setTimeout(()=>{
             this.$router.push('dashboard')
          }, 3500)
      }).catch((err) => {
        console.log({err})
        this.loginError = true
      }).finally(() => {
        setTimeout(()=>{
          this.loginError = false
          this.loginSuccess = false
          this.model.email = ''
          this.model.password = ''
        }, 2500)
      })
      }
    }
  }
</script>
<style>
</style>
