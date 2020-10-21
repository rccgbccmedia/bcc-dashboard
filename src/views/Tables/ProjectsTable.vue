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
          <base-button type="primary" size="sm">Add User</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="tableData">
        <template slot="columns">
          <th>Name</th>
          <th>Email</th>
          <th>Number</th>
          <th>Address</th>
          <th>Password</th>
          <th></th>
        </template>

        <template slot-scope="{row}">
       
          <td >
            {{row.first}} {{row.last}}
          </td>
          <td>
              {{row.email}}
          </td>
          <td>
             {{row.number}}
          </td>
           {{row.address}}
          <td>
              {{row.password}}
          </td>

          <td class="text-right">
            <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>
                <a class="dropdown-item" href="#">Update Details</a>
                <a class="dropdown-item" href="#">Delete User</a>
              </template>
            </base-dropdown>
          </td>

        </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination total="30"></base-pagination>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'projects-table',
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
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
      }
    }
  }
</script>
<style>
</style>
