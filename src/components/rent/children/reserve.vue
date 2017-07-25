<template>
  <div id="reserve">

    <house-resource-list></house-resource-list>

  </div>
</template>
<script>
  import find_house from './find_house_input.vue'
  import house_resource from './houser_resource.vue'
  export default{
    name:'reserve',
    mounted(){

    },
    data(){
        return{

        }
    },
    components:{
        'house-resource-list':house_resource,
    }
  }
</script>
