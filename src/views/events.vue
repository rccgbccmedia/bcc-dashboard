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
            <!--Tables-->
            <div class="row">
                <div class="col">
                   
                </div>
            </div>
            <!--End tables-->
        </div>
</div>
</template>
<script>
// import theCard from '../components/Card'
  export default {
    name: 'events-page',
     components: {
    //  theCard
    },
    data() {
      return {
      }
    }
  }
</script>
<style>
</style>
