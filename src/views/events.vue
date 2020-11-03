<template>
<div>
     <base-header type="gradient-primary" class="pb-6 pb-8 pt-5 pt-md-8">
          <!-- Card stats -->
          <div class="row justify-content-center">
               <div class="col-xl-3 col-lg-6" title="View all Users">
               <stats-card title="Total Registered Users"
                              type="gradient-primary"
                              sub-title="32,000"
                              icon="ni ni-single-02"
                              class="mb-4 mb-xl-0"
               >
               </stats-card>
               </div>
               <div class="col-xl-3 col-lg-6">
               <stats-card title="Total Events"
                              type="gradient-primary"
                              :sub-title="totalEvents"
                              icon="ni ni-building"
                              class="mb-4 mb-xl-0"
               >
               </stats-card>
               </div>
               <div class="col-xl-3 col-lg-6" @click="createEvent">
               <stats-card title="Add New Event"
                              type="gradient-primary"
                              icon="ni ni-fat-add"
                              class="mb-4 mb-xl-0"
               >
               </stats-card>
               </div>
          </div>
     </base-header>
     <div class="container-fluid">
            <!--Event Card-->
              <div class="row row-cols-1 row-cols-md-2 justify-content-center">
                <template v-for="event in returnedEvents">
                    <div class="col-sm-10 col-md-5 mb-4" :key="event.id">
                   <theCard gradient='blue' :shadow='shadow' :hover='shadow' class="mt-3 pt-3">
                      <template v-slot:header>
                        <h1 class="lead">{{event.name}}</h1>
                      </template>
                       <template>
                        <h3><strong>Venue: </strong>{{event.venue}}</h3>
                        <h3><strong>Description: </strong>{{event.description}} </h3>
                         <h3><strong>Time: </strong>{{formatter(event.time)}} </h3>
                          <h3><strong>Capacity: </strong>{{event.capacity}}</h3>
                          <div v-show="event.photo_url">
                            <button class="btn border bg-gradient-primary text-light" @click="showEventPic(event.photo_url)">Photo</button>
                          </div>
                      </template>
                       <template v-slot:footer>
                        <div class="row justify-content-between">
                            <button class="col btn border bg-gradient-warning text-light" @click="deleteEvent(event)">Delete</button>
                            <button class="col btn border bg-gradient-info text-light" @click="updateEvent(event)">Edit</button>
                        </div>
                      </template>
                   </theCard>
                </div>
                </template>
            </div>
            <!--Event Card-->
        </div>
        <!-- Modals start -->
        <!-- Loading modal start -->
         <baseModal :show='isLoading' v-on:close="closing" class="text-center" gradient="secondary">
          <template>
            <img src="../assets/loader.gif">
          </template>
        </baseModal>
        <!-- Loading Modal end -->
        <!-- Picture Modal start-->
         <baseModal :show='pictureShow' v-on:close="closing" class="text-center" gradient="secondary">
          <template>
            <theCard gradient="transparent" shadow='true' hover='true' :class="{'mt-3':true , 'pt-3': true}">
              <template>
                <img :src="pictureUrl" class="card-img-top">
            </template>
              </theCard>
          </template>
        </baseModal>
        <!-- Picture Modal end -->
        <!-- Delete modal start -->
        <baseModal :show='show' v-on:close="closing" class="text-center" gradient="secondary">
          <template v-slot:header>
             <h2 class="text-center mx-auto">Are you sure? View the details below</h2>    
          </template>
          <template>
            <h1 class="lead">{{selectedEventDetails.name}}</h1>
             <h3><strong>Venue: </strong>{{selectedEventDetails.location}} </h3>
              <h3><strong>Description: </strong>{{selectedEventDetails.description}} </h3>
              <h3 ><strong>Time: </strong>{{selectedEventDetails.time}} </h3>
              <h3><strong>Capacity: </strong>{{selectedEventDetails.capacity}} </h3>  
          </template>
          <template v-slot:footer>
               <button class="btn border bg-gradient-warning text-light" @click="deleteSingleEvent(selectedEventDetails.id)">Delete Event</button>
                <button class="btn border bg-gradient-info text-light" @click="closing">Go Back</button>
            </template>
        </baseModal>
        <!-- Delete Modal End -->
         <!-- Edit modal start -->
        <baseModal :show='editShow' v-on:close="closing" class="text-center" gradient="dark">
          <template v-slot:header>
            <div class="row justify-content-center ml-4"><h2 class="w-100 text-center mx-auto text-warning">You can update event details </h2><small class="w-100 text-light">Simply click to edit fields</small></div>
          </template>
          <template  >
            <div class="text-light">
                 <base-input class="input-group-alternative mb-3"
                              :placeholder="selectedEventDetails.name" required
                              addon-left-icon="ni ni-caps-small"
                              v-model="oldEventDetails.name">
                  </base-input>
                  <base-input class="input-group-alternative mb-3"
                              :placeholder="selectedEventDetails.location"
                              addon-left-icon="ni ni-square-pin"
                              v-model="oldEventDetails.location">
                  </base-input>
                  <base-input class="input-group-alternative mb-3"
                              :placeholder="selectedEventDetails.description" required
                              addon-left-icon="ni ni-align-left-2"
                              v-model="oldEventDetails.description">
                  </base-input>
                  <base-input class="input-group-alternative mb-3"
                              :placeholder="selectedEventDetails.time" required
                              addon-left-icon="ni ni-watch-time"
                              v-model="oldEventDetails.time">
                  </base-input>
                <base-input class="input-group-alternative mb-3"
                              :placeholder="selectedEventDetails.capacity"
                              addon-left-icon="ni ni-single-02"
                              v-model="oldEventDetails.capacity">
                  </base-input>
                  <base-input class="input-group-alternative mb-3"
                              :placeholder="selectedEventDetails.photo"
                              addon-left-icon="ni ni-camera-compact"
                              v-model="oldEventDetails.photo_url">
                  </base-input>
            </div>
          </template>
          <template v-slot:footer>
               <button class="btn border bg-gradient-warning text-light" @click="updateSingleEvent(selectedEventDetails.id)">Update Event</button>
                <button class="btn border bg-gradient-info text-light" @click="closing">Go Back</button>
            </template>
        </baseModal>
        <!-- Edit Modal End -->
         <!-- Create modal start -->
        <baseModal :show='createShow' v-on:close="closing" class="text-center" gradient="primary">
          <template v-slot:header>
            <div class="row justify-content-center ml-4"><h1 class="w-100 text-center mx-auto text-success">Create new event </h1></div>
          </template>
          <template >
            <div class="text-light">
              <form role="form">
                  <base-input class="input-group-alternative mb-3"
                              placeholder="Event Name" required
                              addon-left-icon="ni ni-caps-small"
                              v-model="newEventDetails.name">
                  </base-input>
                   <base-input class="input-group-alternative mb-3"
                              placeholder="Event Location"
                              addon-left-icon="ni ni-square-pin"
                              v-model="newEventDetails.location">
                  </base-input>
                   <base-input class="input-group-alternative mb-3"
                              placeholder="Event Description" required
                              addon-left-icon="ni ni-align-left-2"
                              v-model="newEventDetails.description">
                  </base-input>
                  <base-input class="input-group-alternative mb-3"
                              placeholder="Event Time" required
                              addon-left-icon="ni ni-watch-time"
                              v-model="newEventDetails.time">
                  </base-input>
                  <base-input class="input-group-alternative mb-3"
                              placeholder="Event Capacity"
                              addon-left-icon="ni ni-single-02"
                              v-model="newEventDetails.capacity">
                  </base-input>
                  <base-input class="input-group-alternative mb-3"
                              placeholder="Available Seats"
                              addon-left-icon="ni ni-tag"
                              readonly
                              v-model="newEventDetails.seats">
                  </base-input>
                  <base-input class="input-group-alternative mb-3"
                              placeholder="Link to Image"
                              addon-left-icon="ni ni-camera-compact"
                              v-model="newEventDetails.photo">
                  </base-input>
              </form>
            </div>
          </template>
          <template v-slot:footer>
               <button class="btn border bg-gradient-success text-light" @click="createSingleEvent()">Create New Event</button>
                <button class="btn border bg-gradient-warning text-light" @click="closing">Discard</button>
            </template>
        </baseModal>
        <!-- Create Modal End -->
        <!-- Modals end -->
 
</div>
</template>
<script>
 import theCard from '../components/Card'
  import baseModal from '../components/Modal'
  import axios from 'axios'
  import moment from 'moment'
  export default {
    name: 'events-page',
     components: {
      theCard, baseModal
    },
    data() {
      return {
        show: false,
        editShow: false,
        pictureShow: false,
        pictureUrl: '',
        returnedEvents: [],
        selectedEventDetails: {
          id: '',
          name: '',
          location: '',
          description: '',
          time: '',
          capacity: '',
          seats: '',
          photo: ''
        },
        isLoading: false,
        createShow: false,
        shadow: true,
        oldEventDetails: {
           name: '',
          location: '',
          description: '',
          time: '',
          capacity: '',
          seats: '',
          photo_url: ''
        },
        newEventDetails: {
          name: '',
          location: '',
          description: '',
          time: '',
          capacity: '',
          seats: '',
          photo: ''
        }
      }
    },
    computed: {
      totalEvents: function() {
        let list = this.returnedEvents.length
        return list
      }
    },
    methods : {
       formatter(date) {
         let theDate = date.split('T')
         console.log(theDate)
      return moment().format(theDate[0])
    },
       deleteEvent (event) {
         this.show = !this.show
        this.localEventUpdate(event)
        console.log('Delete')
       },
       fetchEvents () {
        this.isLoading = true
        axios.get('https://bcc-backend.herokuapp.com/events/all/',
          {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${sessionStorage.getItem('accessToken')}`
        }
        }).then((result) => {
          console.log(result)
          this.returnedEvents = result.data
        }).catch((err)=>{
          console.log(err)
        }).finally(()=>{
           this.isLoading = false
        })
       },
       createSingleEvent () {
           if(this.newEventDetails.name!=='' && this.newEventDetails.time!=='' && this.newEventDetails.description!==''){
             console.log(sessionStorage.getItem('accessToken'))
            axios.post('https://bcc-backend.herokuapp.com/events/create/',
            {
              'name': this.newEventDetails.name,
              'venue': this.newEventDetails.venue,
              'time': this.newEventDetails.time,
              'capacity': this.newEventDetails.capacity,
              'seats': this.newEventDetails.seats,
              'description': this.newEventDetails.description,
              'photo_url': this.newEventDetails.photo
            },
          {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        }
        }).then((val)=>{
          console.log(val)
        }).catch((err)=>{
          console.log(err)
        })
        } else {
           console.log('Go away')
        }
       },
       updateSingleEvent (id) {
         this.isLoading = true
         let updateDetails = {
           
        } 
        for(let kel in this.oldEventDetails){
          if(this.oldEventDetails[kel]){
            updateDetails[kel] = this.oldEventDetails[kel]
          }
        }
         axios.put(`https://bcc-backend.herokuapp.com/events/update/${id}/`,
            updateDetails,
          {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        }
        }).then((val)=>{
          console.log(val)
        }).catch((err)=>{
          console.log(err)
        }).finally(()=>{
          this.isLoading = false
        })
       },
       createEvent () {
         this.createShow = true
       },
       localEventUpdate (event) {
            this.selectedEventDetails.id = event.id
            this.selectedEventDetails.name = event.name
            this.selectedEventDetails.location = event.venue
            this.selectedEventDetails.description = event.description
            this.selectedEventDetails.time = event.time
            this.selectedEventDetails.capacity = event.capacity
             this.selectedEventDetails.photo = event.photo_url
       },
      updateEvent (event) {
        this.localEventUpdate(event)
        this.editShow = !this.editShow
        console.log('Update')
      },
      showEventPic (url) {
        this.pictureShow = true
        this.pictureUrl = url
      },
      closing () {
        this.show = false
        this.editShow= false
        this.createShow = false
         this.pictureShow = false
      },
      deleteSingleEvent (id) {
        this.isLoading = true
        console.log(sessionStorage.getItem('accessToken'))
        axios.get(`https://bcc-backend.herokuapp.com/events/delete/${id}/`,
          {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        }
        }).then((val)=>{
          console.log(val)
        }).catch((err)=>{
          console.log(err)
        }).finally(()=>{
          this.isLoading = false
        })
      }
    },
   beforeRouteEnter (to, from, next) {
         next( vm => {
             vm.fetchEvents()
         })
    },
    mounted :function ()  {
    }
  }
</script>
<style>
.modal.show{
  background-color:aliceblue;
}
</style>
