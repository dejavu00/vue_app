<template>
  <div id="landlord">
    <div>
      <img :src="imgUrl" alt="加盟图">
    </div>
  </div>
</template>
<script>
  export default{
    name:'landlord',
    data(){
        return{
            imgUrl:this.webConfig.getPath('assets/img/landlord.png')
        }
    }
  }
</script>
<style scoped>
  #landlord{
    padding-bottom:10vh;
  }
</style>
