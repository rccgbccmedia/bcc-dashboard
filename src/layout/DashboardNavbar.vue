<template>
    <base-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand>
        <ul class="navbar-nav align-items-center d-none d-md-flex ml-4 pl-4">
            <li class="nav-item dropdown">
                <base-dropdown class="nav-link pr-0">
                    <div class="media align-items-center" slot="title">
                <span class="">
                 <i class="ni ni-circle-08"></i>
                </span>
                        <div class="media-body ml-2 d-none d-lg-block">
                            <span class="mb-0 text-sm  font-weight-bold">Hey Admin</span>
                        </div>
                    </div>

                    <template>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-user-run"></i>
                            <span>Logout</span>
                        </router-link>
                    </template>
                </base-dropdown>
            </li>
        </ul>
    </base-nav>
</template>
<script>
  export default {
    data() {
      return {
        activeNotifications: false,
        showMenu: false
      };
    },
    methods: {
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      }
    }
  };
</script>
