<template>
  <div id="rent">
    <header-component></header-component>
    <keep-alive >
      <router-view ></router-view>
    </keep-alive>

  </div>
</template>
<script>
  import header from './children/header.vue'
  export default{
//    beforeRouteLeave(to,from,next){
//      this.$children[1].$children[0].roll=null;
//      next();
//      },
      mounted(){

        window.scrollTo(0,0);
      },
      data(){
          return{

          }
      },
    components:{
      'header-component':header
    }
  }
</script>
