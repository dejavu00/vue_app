<template>
   <div id="fault" class="text-center">
     <h1>404 not found</h1>
    <p>
      从前有座山，<br/>
      山里有座庙，<br/>
      庙里有台服务器，<br/>
      服务器有个页面，<br/>
      现在找不到了。<br/>
    </p>
<p> </p>
     <Button type="info" @click.native="back">返回</Button>
   </div>

</template>
<script>
  export default{
      data(){
          return{
            initImg:this.webConfig.getPath('assets/img/'),
              msg:'该功能暂未开展,请移步',
              pic:'fault.png'
          }
      },
      methods:{
          back(){
              this.$router.go(-1);
          }
      }

  }
</script>
<style scoped>

#fault{
  padding-top:20vw;
  height:100vh;
  background: #eeeeee;
}
p{
  font-family:'楷体',serif;
  line-height: 2rem;
  font-size: 1.4rem;
}
  h1{
    font-family: "Segoe Print",serif;
   flex-grow: 2;
    font-size: 1.4rem;
  }
</style>
