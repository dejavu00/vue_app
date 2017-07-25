<template>
  <div id="community" ref="wrap">
    <header class="po-r" ref="head" style="width:90%;">
      <div class="message">
        <router-link to="/chat">
          <i class="icon iconfont icon-icon-test" style="font-weight: bold;font-size: 1.9rem"></i>
        </router-link>
      </div>
      <router-link to="/community/search" class="search-a">
        <input type="text" placeholder="请输入搜索内容..." id="keyInput"/>
        <div class="search po-a">
          <Icon type="ios-search-strong" size="20"></Icon>
        </div>
      </router-link>
      <div class="post">
        <router-link to="/community/post" v-if="isPost">
          <Icon type="compose"></Icon>
        </router-link>
        <a v-else @click="warningMes">
          <Icon type="compose"></Icon>
        </a>
      </div>

    </header>
    <transition enter-active-class="animated bounceInUp">
      <router-view @update="update"></router-view>
    </transition>
    <div class="content content-special">
      <latest-component :latestList="latestList"></latest-component>
    </div>
 <!--上拉按钮-->
    <div class="high-pull ani-demo-spin" ref="high">
      <Spin fix>
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>

      </Spin>
    </div>
  </div>


</template>
<script>
  import latest from './children/latest.vue'
  import forUpdate from '../../forUpdate'
  import axios from 'axios'
  export default{
      name:'community',
    mounted(){
      this.obj.val=this.$refs.wrap;
      let _this=this;
      let high=this.$refs.high;
      forUpdate( this.obj,high,_this);
      this.getAllArticle();
    },

    data(){
      return {
        latestList: [],
      url: this.webConfig.getPath('index.php/article/index'),

        timer: null,
        isSmall: true,
        keyWord: '',
        isPost:false,
        isUser: localStorage.getItem("loginCookie"),
        seeHeight:document.documentElement.clientHeight,
        obj:{
             val:null,
             isMoving:false,

        }
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm=>{
          if(localStorage.getItem("loginCookie")){
            vm.isPost=true;
          }else{
            vm.isPost=false;
          }

      })

    },
    methods: {
      getAllArticle(){
        this.$Message.loading({
          content: '正在加载中...',
          duration: 2
        });
        axios.get(this.url, {}).then(res => {
          this.latestList = res.data;
          this.$Message.destroy();
        }).catch((err) => {
          this.$Message.destroy();
          this.$Message.error('请检查你的网络');
        })
      },
      update(){
        this.getAllArticle();

      },
      warningMes(){
        this.$Message.warning('请先登录');
      },
    },
    components: {
      'latest-component': latest,
    }

  }
</script>
<style scoped>
  .high-pull{
    position: fixed;
    width:10vw;
    height:10vw;
    margin: 0 auto;
    top:-9vh;
    left:0;
    right:0;
    transition: 300ms;
  }
  .ivu-spin-fix{
    border-radius: 50%;

  }
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @-webkit-keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
</style>

