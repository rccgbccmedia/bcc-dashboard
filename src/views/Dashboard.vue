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
                                sub-title="26"
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
                    <projects-table type="dark" title="All Regsitered Users"></projects-table>
                </div>
            </div>
            <!--End tables-->
        </div>

    </div>
</template>
<script>
  // Charts
  import ProjectsTable from './Tables/ProjectsTable'
  export default {
    components: {
      ProjectsTable
    },
    data() {
      return {
      
      };
    },
    methods: {

    },
    mounted() {
     
    }
  };
</script>
<style></style>
