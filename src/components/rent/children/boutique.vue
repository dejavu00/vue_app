<template>
  <div id="boutique">
    <h1 class="text-center" style="font-size: 1.2rem">
      <fault-component></fault-component>
    </h1>
  </div>
</template>
<script>
  import fault from '../../fault.vue'
  export default{
    name:'boutique',
    components:{
        'fault-component':fault
    }
  }
</script>
