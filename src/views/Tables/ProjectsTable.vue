<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            {{title}}
          </h3>
        </div>
        <div class="col text-right">
          <base-button type="primary" size="sm" @click="showForm">Add User</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="tableData">
        <template slot="columns" v-for="item in heads">
          <th :key="item">{{item}}</th>
        </template>

        <template slot-scope="{row}">
       
          <td >
            {{row.first_name}}  {{row.last_name}}
          </td>
          <td>
              {{row.email}}
          </td>
          <td>
             {{row.phone}}
          </td>
          <td>
           {{row.address}}
           </td>
          <!-- <td class="text-right">
            <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>
                <a class="dropdown-item" @click="updateUser(row)">Update Details</a>
              </template>
            </base-dropdown>
          </td> -->

        </template>

      </base-table>
    </div>
     <baseModal :show='formVisible' v-on:close="closing" class="text-center" gradient="secondary">
          <template>
                <div class="mx-4 px-4" id="responseAlerts">
        <div class="alert alert-primary text-dark mx-4" role="alert" v-show="registrationSuccessful" id="registrationSuccessful">
            <p class="top-text p-4 my-4">User registration was successful!!</p>
          </div>
        <div class="alert alert-warning text-dark mx-4" role="alert" v-show="conflictError" id="registrationError">
            <h4 class="alert-heading top-text">Sorry, User with that email already exists.</h4>
            <p class="top-text">Please check the details and try again</p>
          </div>
          <div class="alert alert-danger text-dark mx-4" role="alert" v-show="registrationError">
            <h4 class="alert-heading top-text">Sorry, an error occured!</h4>
            <p class="top-text">Please check the details and try again</p>
          </div>
    </div>
             <div id='registrationForm py-4' >
        <form class="text-center">
        <div class="form-row justify-content-center">
          <div class="form-group col-md-5 w-xs-100">
            <label for="firstName">First Name</label>
            <input type="text" class="form-control" id="firstName" placeholder="Isaac" v-model="registerDetails.firstName" required>
          </div>
          <div class="form-group col-md-5 w-xs-100">
            <label for="lastName">Last Name</label>
            <input type="text" class="form-control" id="lastName" placeholder="Ajayi" v-model="registerDetails.lastName" required>
          </div>
        </div>
        <div class="form-row justify-content-center">
          <div class="form-group col-md-5">
            <label for="passwordOne">Password</label>
            <input type="password" class="form-control" id="passwordOne" placeholder="******" v-model="registerDetails.passwordOne" required @keyup="passwordCheck(registerDetails.passwordOne, registerDetails.passwordConfirm)">
          </div>
          <div class="form-group col-md-5">
            <label for="passwordTwo">Confirm Password</label>
            <input type="password" class="form-control" id="passwordTwo" required placeholder="******" v-model="registerDetails.passwordConfirm" @keyup="passwordCheck(registerDetails.passwordOne, registerDetails.passwordConfirm)">
            <small class="text-danger"  v-show="passwordMatch">Both passwords need to match</small>
          </div>
        </div>
        <div class="form-row  justify-content-center">
          <div class="form-group col-md-5">
            <label for="phoneNumber">Phone Number</label>
            <input type="tel" class="form-control" id="phoneNumber" required placeholder="+234 012 345 6789" v-model="registerDetails.phoneNumber">
            <small class="text-light">Please provide dailing code</small>
          </div>
          <div class="form-group col-md-5">
            <label for="userMail">Email</label>
            <input type="email" :class="{'form-control': true,'border-danger': mailCheck}" id="userMail" placeholder="myMailAddress@mail.com" v-model="registerDetails.email" required @keyup="emailCheck(registerDetails.email)">
            <small class="text-danger" v-show="mailCheck">Please provide a valid email address</small>
          </div>
        </div>
        <div class="form-row justify-content-center">
          <div class="form-group col-md-8">
          <label for="inputAddress">Address</label>
          <textarea class="form-control" id="inputAddress" placeholder="No. 14 Blecher St" v-model="registerDetails.address"></textarea>
          </div>
        </div>
        <p class="alert alert-danger" v-show="allFields">All fields are required</p>
        <button type="submit" class="btn btn-primary" @click.prevent="confirmDetails">Register User</button>
      </form>
          </div>
          </template>
     </baseModal>
<!-- 
    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination total="30"></base-pagination>
    </div> -->

  </div>
</template>
<script>
  import axios from 'axios'
 import baseModal from '../../components/Modal'
  export default {
    name: 'projects-table',
    components: {
      baseModal
    },
    props: {
      type: {
        type: String
      },
      title: String,
      tableData : {
        type: Array
      },
      heads: {
        type: Array
      }
    },
    data() {
      return {
        formVisible: false,
        allFields: false,
        registerDetails: {
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          phoneNumber: '',
          passwordOne: '',
          passwordConfirm: '',
          password: ''
        },
        mailError: false,
        registrationError: false,
        conflictError: false,
        registrationSuccessful: false,
        mailCheck: false,
        passwordMatch: false,
      }
    },
    methods:{
      showForm(){
        this.formVisible = true
      },
      confirmDetails () {
        if (this.registerDetails.email === '' || this.registerDetails.address === '' || this.registerDetails.password === '' || this.registerDetails.phoneNumber === '' || this.registerDetails.firstName === '' || this.registerDetails.lastName === '') {
          this.allFields = true
        } else {
          this.allFields = false
          this.passwordCheck(this.registerDetails.passwordOne, this.registerDetails.passwordConfirm)
          this.emailCheck(this.registerDetails.email)
          if (!this.passwordMatch) {
            console.log("We're good to go")
            this.registerUser()
          }
        }
      },
      registerUser(){
          this.$emit('showSpinner', true)
          axios.post('https://bcc-backend.herokuapp.com/register/', {
            'email': this.registerDetails.email,
            'address': this.registerDetails.address,
            'password': this.registerDetails.password,
            'first_name': this.registerDetails.firstName,
            'last_name': this.registerDetails.lastName,
            'phone': this.registerDetails.phoneNumber
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((res) => {
            console.log({res})
            this.$emit('showSpinner', false)
            if (res.status === 201) {
              this.registrationSuccessful = true
              setTimeout(() => {
                this.$emit('newUser')
                this.registrationSuccessful = false
                this.formVisible = false
              }, 3500)
            } else if (res.status === 409) {
              this.conflictError = true
              setTimeout(() => {
                this.conflictError = false
              }, 3500)
            }
            console.log(res)
          }).catch((err) => {
            console.log({err})
             this.$emit('showSpinner', false)
            this.registrationError = true
            setTimeout(() => {
              this.registrationError = false
            }, 3500)
            console.log(err)
          }).finally(() => {
            this.registerDetails.email = ''
            this.registerDetails.address = ''
            this.registerDetails.password = ''
            this.registerDetails.firstName = ''
            this.registerDetails.lastName = ''
            this.registerDetails.phoneNumber = ''
            this.registerDetails.passwordOne = ''
            this.registerDetails.passwordConfirm = ''
          })
      },
      closing(){
         this.formVisible = false
         this.registrationError = false
         this.conflictError = false
         this.allFields = false
         this.mailError = false
         this.passwordMatch = false
        this.registerDetails.email = ''
          this.registerDetails.address = ''
          this.registerDetails.password = ''
          this.registerDetails.firstName = ''
          this.registerDetails.lastName = ''
          this.registerDetails.phoneNumber = ''
          this.registerDetails.passwordOne = ''
          this.registerDetails.passwordConfirm = ''
      },
      emailCheck (mail, loginMailError) {
          // eslint-disable-next-line no-useless-escape
          if (mail.includes('@')) {
            if (loginMailError) {
              this.mailError = false
            } else {
              this.mailCheck = false
            }
          } else {
            if (loginMailError) {
              this.mailError = true
            } else {
              this.mailCheck = true
            }
          }
        },
      passwordCheck (passwordOne, passwordTwo) {
          if (passwordOne !== passwordTwo) {
            this.passwordMatch = true
          } else {
            this.passwordMatch = false
            this.registerDetails.password = this.registerDetails.passwordOne
          }
        },
    }
  }
</script>
<style>
</style>
