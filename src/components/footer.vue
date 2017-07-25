<template>
  <footer id="footer" v-show="isInputting">
    <div class="router text-center">
      <router-link to="/rent"  class="toRent">
     <p><i class="icon "></i></p>
        <span>租房</span>
      </router-link>
    </div>
    <div class="router text-center">
      <router-link to="/chat" class="toChat">
      <p style="padding: 5px 0">
        <Badge dot  v-if="haveMes" style="box-shadow: none!important;">
          <i class="icon iconfont icon-massage"></i>
        </Badge>
        <Badge v-else>
          <i class="icon iconfont icon-massage"></i>
        </Badge>
        </p>
        <span>消息</span>
      </router-link>
    </div>
    <div class="router text-center">
      <router-link to="/community" class="toCommunity">
        <p><i class="icon "></i></p>
        <span>社区</span>
      </router-link>
    </div>
    <div class="router text-center">
      <router-link to="/charter" class="toCharter">
      <p><i class="icon iconfont icon-shouye-copy"></i></p>
        <span>我的</span>
      </router-link>
    </div>

  </footer>
</template>
<script>
  export default{
      mounted(){
//        this.haveMes=this.$store.state.haveMes;
      },
      data(){
          return{
          }
      },
    computed:{
      haveMes(){
          return this.$store.state.haveMes;
      },
      isInputting(){
          return this.$store.state.inputting;
      }
    }
  }
</script>
<style>
  @font-face
  {
    font-family: myFirstFont;
    src: url('../assets/fonts/iconfont.ttf');

  }
  #footer{
    font-family: myFirstFont,serif;
  }
</style>
