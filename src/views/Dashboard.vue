<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row justify-content-center">
                <div class="col-xl-3 col-lg-6" title="View all Users">
                    <stats-card title="Total Registered Users"
                                type="gradient-green"
                                :sub-title="tableData.length"
                                icon="ni ni-single-02"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6"  title="View all Events">
                    <stats-card title="Total Events"
                                type="gradient-green"
                                :sub-title="totalEvents.length"
                                icon="ni ni-building"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>
                </div>
            </div>
        </base-header>

        <div class="container-fluid">
            <!--Tables-->
            <div class="row">
                <div class="col">
                    <projects-table type="dark" title="All Regsitered Users" :tableData='tableData' :heads='columns' @showSpinner="toggleSpinner" @newUser="fetchAllUserDetails"></projects-table>
                </div>
            </div>
            <!--End tables-->
        </div>
  <!-- Loading modal start -->
         <baseModal :show='isLoading' v-on:close="closing" class="text-center" gradient="secondary">
          <template>
            <img src="../assets/loader.gif">
          </template>
        </baseModal>
        <!-- Loading Modal end -->
    </div>
</template>
<script>
  // Charts
  import ProjectsTable from './Tables/ProjectsTable'
  import axios from 'axios'
   import baseModal from '../components/Modal'
  export default {
    components: {
      baseModal,
      ProjectsTable
    },
    data() {
      return {
        columns: ['Name', 'Email', 'Phone', 'Address'],
        isLoading: false,
        totalEvents: [],
         tableData: [
         
        ]
      };
    },
    methods: {
      fetchAllUserDetails () {
           this.isLoading = true
        axios.get('https://bcc-backend.herokuapp.com/all-users/',
          {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        }
        }).then((result) => {
          console.log(result)
          this.tableData = result.data
        }).catch((err)=>{
          console.log({err})
           if(err.request.status == '401'){
               this.$router.push('login')
           }
        }).finally(()=>{
           this.isLoading = false
        })
      },
      toggleSpinner(truthy){
        this.isLoading = truthy
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
          this.totalEvents = result.data
        }).catch((err)=>{
          console.log(err)
                
        }).finally(()=>{
           this.isLoading = false
        })
       }
    },
    computed: {
    
    },
    mounted() {
    this.fetchAllUserDetails()
    this.fetchEvents()
    }
  };
</script>
<style>
.modal.show{
  background-color: aliceblue;
}
</style>
