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
            <theCard gradient="transparent" shadow='true' hover='true' :class="{'mt-3':true , 'pt-3': true}">
              <template>
                fskf;sfm
            </template>
              </theCard>
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
 import baseModal from '../Tables/ProjectsTable.vue'
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
        formVisible: false
      }
    },
    methods:{
      showForm(){
        this.formVisible = true
      },
      closing(){
         this.formVisible = false
      }
    }
  }
</script>
<style>
</style>
