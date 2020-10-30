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
                <div class="col-sm-10 col-md-5 mb-4">
                   <theCard gradient='blue' :shadow='shadow' :hover='shadow' class="mt-3 pt-3">
                      <template v-slot:header>
                        <h1 class="lead">Midweek Communion Service</h1>
                      </template>
                       <template>
                        <h3><strong>Venue: </strong>Church Auditorium </h3>
                        <h3><strong>Description: </strong>Null </h3>
                         <h3><strong>Time: </strong>9am </h3>
                          <h3><strong>Capacity: </strong>5,000</h3>
                      </template>
                       <template v-slot:footer>
                        <div class="row justify-content-between">
                            <button class="col btn border bg-gradient-warning text-light" @click="deleteEvent(id)">Delete</button>
                            <button class="col btn border bg-gradient-info text-light" @click="updateEvent(id)">Edit</button>
                        </div>
                      </template>
                   </theCard>
                </div>
                 <div class="col-sm-10 col-md-5 mb-4">
                    <theCard gradient='blue' :shadow='shadow' :hover='shadow' class="mt-3 pt-3">
                      <template v-slot:header>
                        <h1 class="lead">Midweek Communion Service</h1>
                      </template>
                       <template>
                        <h3><strong>Venue: </strong>Church Auditorium </h3>
                        <h3><strong>Description: </strong>Null </h3>
                        <h3 ><strong>Time: </strong>9am </h3>
                        <h3><strong>Capacity: </strong>5,000</h3>
                      </template>
                       <template v-slot:footer>
                        <div class="row justify-content-between">
                            <button class="btn col border bg-gradient-warning text-light" @click="deleteEvent(id)">Delete</button>
                             <button class="btn col border bg-gradient-info text-light" @click="updateEvent(id)">Edit</button>
                        </div>
                      </template>
                   </theCard>
                </div>
            </div>
            <!--Event Card-->
        </div>
        <!-- Modals start -->
        <!-- Delete modal start -->
        <baseModal :show='show' v-on:close="closing" class="text-center" gradient="secondary">
          <template v-slot:header>
             <h2 class="text-center mx-auto">Are you sure? View the details below</h2>    
          </template>
          <template>
            <h1 class="lead">Midweek Communion Service</h1>
             <h3><strong>Venue: </strong>Church Auditorium </h3>
              <h3><strong>Description: </strong>Null </h3>
              <h3 ><strong>Time: </strong>9am </h3>
              <h3><strong>Capacity: </strong>5,000</h3>  
          </template>
          <template v-slot:footer>
               <button class="btn border bg-gradient-warning text-light" @click="deleteSingleEvent(id)">Delete Event</button>
                <button class="btn border bg-gradient-info text-light" @click="closing">Go Back</button>
            </template>
        </baseModal>
        <!-- Delete Modal End -->
         <!-- Edit modal start -->
        <baseModal :show='editShow' v-on:close="closing" class="text-center" gradient="dark">
          <template v-slot:header>
            <div class="row justify-content-center ml-4"><h2 class="w-100 text-center mx-auto text-warning">You can update event details </h2><small class="w-100 text-light">Simply click to edit fields</small></div>
          </template>
          <template >
            <div class="text-light">
                <h3 class="text-light">Event Title :</h3>
                <h1 class="text-primary eventTitle" contenteditable>Midweek Communion Service</h1>
               <h3 class="text-light">Venue: </h3>
               <h1 class="text-primary eventLocation" contenteditable>Church Auditorium </h1>
               <h3 class="text-light">Description: </h3>
               <h1 class="text-primary eventDescription" contenteditable>Null </h1>
                <h3 class="text-light">Time: </h3>
               <h1 class="text-primary eventTime" contenteditable>9am </h1>
               <h3 class="text-light">Capacity: </h3>
               <h1 class="text-primary eventCapacity" contenteditable>5,000 </h1>
            </div>
          </template>
          <template v-slot:footer>
               <button class="btn border bg-gradient-warning text-light" @click="updateSingleEvent(id)">Update Event</button>
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
  export default {
    name: 'events-page',
     components: {
      theCard, baseModal
    },
    data() {
      return {
        show: false,
        editShow: false,
        returnedEvents: [],
        createShow: false,
        shadow: true,
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
       deleteEvent () {
         this.show = !this.show
        console.log('Delete')
       },
       fetchEvents () {
          let val =  sessionStorage.getItem('accessToken')
        console.log({val})
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
       updateSingleEvent () {
         let name = document.querySelector('.eventTitle').innerHTML
         let location = document.querySelector('.eventLocation').innerHTML
         let description = document.querySelector('.eventDescription').innerHTML
         let time = document.querySelector('.eventTime').innerHTML
         let capacity = document.querySelector('.eventCapacity').innerHTML
         console.log({name, location, description, time, capacity})
       },
       createEvent () {
         this.createShow = true
       },
      updateEvent () {
        this.editShow = !this.editShow
        console.log('Update')
      },
      closing () {
        this.show = false
        this.editShow= false
        this.createShow = false
      },
      deleteSingleEvent () {

      }
    },
    mounted :function ()  {
     
    }
  }
</script>
<style>
</style>
