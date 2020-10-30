<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row justify-content-center">
                <div class="col-xl-3 col-lg-6" title="View all Users">
                    <stats-card title="Total Registered Users"
                                type="gradient-green"
                                sub-title="32,000"
                                icon="ni ni-single-02"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6"  title="View all Events">
                    <stats-card title="Total Events"
                                type="gradient-green"
                                :sub-title="totalEvents"
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
                    <projects-table type="dark" title="All Regsitered Users" :tableData='returnedEvents' :heads='columns'></projects-table>
                </div>
            </div>
            <!--End tables-->
        </div>

    </div>
</template>
<script>
  // Charts
  import ProjectsTable from './Tables/ProjectsTable'
 // import axios from 'axios'
  export default {
    components: {
      ProjectsTable
    },
    data() {
      return {
        columns: ['Name', 'Email', 'Number', 'Address', 'Password', ' '],
         tableData: [
           {
            first: 'Ade',
            last: 'Jognson',
            email: 'mail@yahoo.com',
            number: '0923218994',
            address: 'Lagos',
            password: 'happyPl'
          },
           {
            first: 'Ade',
            last: 'Johnson',
            email: 'mail@yahoo.com',
            number: '0923218994',
            address: 'Lagos',
            password: 'happyPl'
          },
             {
            first: 'Mide',
            last: 'Jognson',
            email: 'mail@yahoo.com',
            number: '0923218994',
            address: 'Lagos',
            password: 'happyPl'
          },
             {
            first: 'Loveth',
            last: 'John',
            email: 'mail@yahoo.com',
            number: '0923218994',
            address: 'Lagos',
            password: 'happyPl'
          }
        ]
      };
    },
    methods: {
      fetchAllUserDetails () {
       
      }
    },
    computed: {
    
    },
    mounted() {
    //  this.fetchAllUserDetails()
    }
  };
</script>
<style></style>
