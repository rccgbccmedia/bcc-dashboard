<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row justify-content-center">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total Videos"
                                type="gradient-green"
                                :sub-title="totalVideos"
                                icon="ni ni-image"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6"  title="Add new Image" @click="adding = !adding">
                    <stats-card title="Add New"
                                type="gradient-green"
                                icon="ni ni-fat-add"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>
                </div>
            </div>
        </base-header>

         <div class="container-fluid">
            <!--Event Card-->
              <div class="row row-cols-1 justify-content-center mt-4">
                <template v-for="video in returnedVideos">
                <div class="col-sm-10 col-md-3 mb-4 mx-4" :key="video.id">
                  <div class="mx-4">
                      <iframe :src="formatLink(video.url)" height="250px" class="formatLink(video.url)" allow="fullscreen" allowfullscreen>
                  </iframe>
                  <div class="row justify-content-center">
                            <button class="col-sm-4 btn btn-sm border bg-gradient-danger text-light" @click="deleteVideo(video.id)">Delete</button>
                        </div>
                </div>
                  </div>
                </template>
              </div>
         </div>
  <!-- Loading modal start -->
         <baseModal :show='isLoading' v-on:close="closing" class="text-center" gradient="secondary">
          <template>
            <img src="../assets/loader.gif">
          </template>
        </baseModal>
        <!-- Loading Modal end -->
        <!-- Delete modal start -->
        <baseModal :show="deleteSuccess" v-on:close="closing" class="text-center" gradient="success">
        <div class="alert text-dark" role="alert" >
            <h4 class="alert-heading top-text">Congrats!</h4>
            <p class="top-text">Video deleted successfully!!</p>
          </div>
        </baseModal>
           <!-- Delete modal end -->
              <!-- Login modal start -->
          <baseModal :show="login" v-on:close="closing" class="text-center" gradient="danger">
         <div class="alert text-dark" role="alert">
            <h4 class="alert-heading top-text">Session Expired</h4>
            <p class="top-text">Please Login Again</p>
          </div>
          </baseModal>
             <!-- login modal end -->
            <!-- Add modal start -->
          <baseModal :show="adding" v-on:close="closing" class="text-center" gradient="success">
              <div>
                   <base-input class="input-group-alternative mb-3"
                              placeholder="Input Video Link" required
                              type="text"
                              addon-left-icon="ni ni-image"
                              v-model="theUrl">
                  </base-input>
                  <button class="btn border bg-gradient-success text-light" @click="addNewVideo()">Add Video</button>
                  <button class="btn border bg-gradient-danger text-light" @click="closing">Discard</button>
              </div>
          </baseModal>
            <!-- Add modal end -->
            <!-- Error  modal start -->
          <baseModal :show="errorOccured" v-on:close="closing" class="text-center" gradient="danger">
              <div>
                   <div class="alert text-dark" role="alert">
            <h4 class="alert-heading top-text">Sorry, an error occured</h4>
            <p class="top-text">Please Try Again</p>
          </div>
              </div>
          </baseModal>
            <!-- error modal end -->
    </div>
</template>
<script>
  // import theCard from '../components/Card'
  import baseModal from '../components/Modal'
  import axios from 'axios'
  export default {
    name: 'videos',
    components: {
      // theCard,
       baseModal
    },
     data() {
      return {
          val: true,
          errorOccured: false,
          adding: false,
          isLoading: false,
          login: false,
          deleteSuccess: false,
          returnedVideos: [],
          theUrl: ''
      }
     },
     mounted () {
     },
     methods: {
       formatLink(oldLink){
         // https://drive.google.com/uc?id=1H8upJ-vM3lAeEcEiB3wTRgE5ZiYH_kl-
         // https://www.youtube.com/watch?v=3rDdlnBzjqo&list=PLx7egWetVxP4Dbo5oUaTWzN4F_3NnxecP&index=1
         let rems = oldLink.split('=')
         let val = rems[1].split('&')
         return `https://www.youtube.com/embed/${val[0]}`
       },
       addNewVideo(){
         console.log(this.theUrl)
          axios.post('https://bcc-backend.herokuapp.com/videos/add/',
            {
              'url': this.theUrl
            },
          {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        }
        }).then((val)=>{
          console.log(val)
            this.isLoading = false
          if(val.status == 201) {
            this.adding = false
            this.addSuccess = true
            this.fetchVideos()
                this.theUrl = ''
                setTimeout(() => {
                  this.closing()
                   this.addSuccess = false
                }, 1500);
          }
        }).catch((err)=>{
          console.log({err})
            this.isLoading = false
          if(err.request.status == '401'){
            this.login = true
            setTimeout(() => {
              this.login = false
               this.$router.push('login')
            }, 1090);
          } else {
            this.errorOccured = true
            this.adding = false
             setTimeout(() => {
              this.errorOccured = false
            }, 2090);
          }
        }).finally(()=>{
          this.adding = false
        })
       },
       fetchVideos(){
         this.isLoading = true
          axios.get('https://bcc-backend.herokuapp.com/videos/all/',
            {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${sessionStorage.getItem('accessToken')}`
          }
          }).then((result) => {
            console.log(result)
            this.returnedVideos = result.data
          }).catch((err)=>{
            console.log({err})
          }).finally(()=>{
            this.isLoading = false
          })
       },
        closing () {
          this.theUrl = ''
          this.adding =  this.deleteSuccess  =  this.isLoading =  this.login = this.errorOccured = false
      },
       deleteVideo (videoId) {
           this.isLoading = true
        axios.get(`https://bcc-backend.herokuapp.com/videos/delete/${videoId}/`,
          {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        }
        }).then((val)=>{
          if(val.status == 204) {
            this.deleteSuccess = true
            this.fetchVideos()
                setTimeout(() => {
                  this.closing()
                   this.deleteSuccess = false
                }, 1500);
          }
        }).catch((err)=>{
          console.log({err})
            if(err.request.status == '401'){
            this.login = true
            setTimeout(() => {
              this.login = false
               this.$router.push('login')
            }, 1090);
          }
        }).finally(()=>{
          this.isLoading = false
        })
       }
     },
    computed: {
      totalVideos: function() {
        let count = this.returnedVideos.length
        return count
      }
    },
      beforeRouteEnter (to, from, next) {
         next( vm => {
             vm.fetchVideos()
         })
    },
  };
</script>
<style scoped>
</style>
