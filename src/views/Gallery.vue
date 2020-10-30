<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row justify-content-center">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total Images"
                                type="gradient-green"
                                sub-title="32"
                                icon="ni ni-image"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6"  title="Add new Image">
                    <stats-card title="Add New"
                                type="gradient-green"
                                icon="ni ni-curved-next"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>
                </div>
            </div>
        </base-header>

         <div class="container-fluid">
            <!--Event Card-->
              <div class="row row-cols-1 row-cols-md-2 justify-content-center">
                <div class="col-sm-10 col-md-4 mb-4">
                   <theCard gradient="light" shadow='true' hover='true' :class="{'mt-3':true , 'pt-3': true}">
                       <template>
                         <img src="https://drive.google.com/uc?id=1H8upJ-vM3lAeEcEiB3wTRgE5ZiYH_kl-" class="card-img-top">
                      </template>
                       <template v-slot:footer>
                        <div class="row justify-content-between">
                            <button class="col-sm-4 btn btn-sm border bg-gradient-danger text-light" @click="deleteImage(id)">Delete</button>
                             <base-switch :value='val' ></base-switch>   
                        </div>
                      </template>
                   </theCard>
                </div>
                 <div class="col-sm-10 col-md-4 mb-4">
                   <theCard gradient="light" shadow='true' hover='true' :class="{'mt-3':true , 'pt-3': true}">
                       <template>
                         <img src="https://drive.google.com/uc?id=1u4YrtR6jOX1FoTvgMPuNu5CpJDr-Lrpl" class="card-img-top">
                      </template>
                       <template v-slot:footer>
                        <div class="row justify-content-between">
                            <button class="col-sm-4 btn btn-sm border bg-gradient-danger text-light" @click="deleteImage(id)">Delete</button>
                             <base-switch :value='val' ></base-switch>   
                        </div>
                      </template>
                   </theCard>
                </div>
                 <div class="col-sm-10 col-md-4 mb-4">
                   <theCard gradient="light" shadow='true' hover='true' :class="{'mt-3':true , 'pt-3': true}">
                       <template>
                         <img src="https://drive.google.com/uc?id=1u4YrtR6jOX1FoTvgMPuNu5CpJDr-Lrpl" class="card-img-top">
                      </template>
                       <template v-slot:footer class="card-img-overlay">
                        <div class="row justify-content-between">
                            <button class="col-sm-4 btn btn-sm border bg-gradient-danger text-light" @click="deleteImage(id)">Delete</button>
                             <base-switch :value='val' ></base-switch>   
                        </div>
                      </template>
                   </theCard>
                </div>
              </div>
         </div>

    </div>
</template>
<script>
  import theCard from '../components/Card'
  export default {
    name: 'gallery',
    components: {
      theCard
    },
     data() {
      return {
          val: true
      }
     },
     mounted () {
     },
     methods: {
      //  deleteImage (imageId) {

      //  }
     }
  };
</script>
<style></style>
