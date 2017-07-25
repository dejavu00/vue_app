<template>
  <div id="app" >
    <div id="screen" v-show="start" ref="screen">
      <span class="count po-a" @click="overScreen">跳过{{count}}秒</span>
      <img :src="img" alt="">
      <Button type="info" class="btn" @click="overScreen">立即体验</Button>
    </div>
    <transition :enter-active-class="transitionName">
    <keep-alive include="getAll,community,charter">
      <router-view ></router-view>
    </keep-alive>
    </transition>
    <footer-component></footer-component>
  </div>
</template>

<script>
  import './assets/fonts/iconfont.css'
  import './assets/style/main.less'
  import footer from './components/footer.vue'

export default {
  name: 'app',
  mounted(){
    let init=sessionStorage.getItem('init');
    if(init){
        return false;
    }else{
      this.startScreen();
    }

  },
  data(){
      return{
        timer:null,
           start:true,
          img:require('./assets/img/screen.jpg'),
          transitionName:'',
          num:[5,4,3,2,1],
          counts:5
      }
  },
//  watch: {
//    '$route' (to, from) {
//      const toDepth = to.name;
//      const fromDepth = from.name;
//
//      this.transitionName = toDepth > fromDepth ? 'animated  slideInLeft' : 'animated  slideInRight'
//    }
//  },
  computed:{
    count(){
        return this.counts;
    }
  },
  components:{
      'footer-component':footer
  },
  methods:{
      overScreen(){

        this.start=false;
        this.startScreen=null;
        sessionStorage.setItem('init',true);
      },
      startScreen(){

      this.$refs.screen.style.display='block';
        let i=0;
        this.timer=setInterval( ()=> {
          this.counts=this.num[i];
          i++;
          if(i>5){
            this.start=false;
            this.startScreen=null;
            clearInterval(this.timer);
            sessionStorage.setItem('init',true);
          }
        },1000)

      }
  }
}
</script>

<style scoped>
  #screen{
    display: none;
    position: fixed;
    left:0;
    top:0;
    z-index: 9999;
    background: #fff;
    width:100vw;
    height:100vh;
  }
  .btn{
    position: absolute;
    left:50%;
    bottom:10vh;
    transform: translate(-50%);
  }
  .count{
    border: 1px solid #fff;
    padding: 1vw 2vw ;
    border-radius: 10px;
    color: #fff;
    right: 10vw;
    top:10vh;
  }
</style>
