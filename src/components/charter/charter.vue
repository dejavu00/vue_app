<template>
  <div id="charter" :class="{'pb':isUser}">
    <!--用户信息-->
    <user-component ></user-component>
    <div id="fun_wrapper" :class="{'night':isNight}">
      <!--功能展示-->
      <div id="function">
        <div class="f_item text-center">
          <router-link to="/fault">
            <p><i class="icon iconfont icon-qrcode-copy"></i></p>
            <span style="visibility: hidden">0</span>
            <p>我的二维码</p>
          </router-link>
        </div>
        <div class="f_item text-center">
          <router-link to="/fault">
            <p><i class="icon iconfont icon-fangzi-copy"></i></p>
            <span class="num">0</span>
            <p>我的租客</p>
          </router-link>
        </div>
        <div class="f_item text-center">
          <router-link to="charter/income" v-if="isUser">
            <p><i class="icon iconfont icon-yue"></i></p>
            <span class="num">0</span>
            <p>收益余额</p>
          </router-link>
          <a @click="forLogin" v-else>
            <p><i class="icon iconfont icon-yue"></i></p>
            <span class="num">0</span>
            <p>收益余额</p>
          </a>
        </div>

      </div>
      <ul class="function-list">
        <li class="list-item">
          <Icon type="ios-paperplane" size="24" color=" deepskyblue"></Icon>
          <span> 我的公寓</span>
          <Icon type="ios-arrow-right"></Icon>
        </li>
        <li class="list-item">
          <Icon type="clipboard" size="20" color=" greenyellow"></Icon>
          <span>我的发帖</span>
          <b class="nu" >{{articleNum}}</b>
          <Icon type="ios-arrow-right"></Icon>
        </li>
        <li class="list-item">
          <Icon type="android-star" size="20" color=" #FF2D55"></Icon>
          <span>我的收藏夹</span>
          <Icon type="ios-arrow-right"></Icon>
        </li>
      </ul>
      <ul class="function-list">
        <li class="list-item">
          <Icon type="ios-moon" size="32" color="yellow"></Icon>
          <span> 夜间模式</span>
          <i-switch size="small" @on-change="dayToNight">
            <Icon type="android-done" slot="open"></Icon>
            <Icon type="android-close" slot="close"></Icon>
          </i-switch>
          <Icon type="ios-arrow-right"></Icon>

        </li>
        <li class="list-item">
          <Icon type="android-share" size="20" color="orange"></Icon>
          <span>推荐给好友</span>
          <Icon type="ios-arrow-right"></Icon>

        </li>
        <li class="list-item">
          <Icon type="ios-eye" size="20" color="yellow"></Icon>
          <span>浏览历史</span>
          <Icon type="ios-arrow-right"></Icon>
        </li>
        <li class="list-item">
          <Icon type="ios-flag" size="24" color="greenyellow"></Icon>
          <span>反馈建议</span>
          <Icon type="ios-arrow-right"></Icon>
        </li>
      </ul>
      <Button @click="confirm" long v-show="isUser" style="width:95%;margin: 0 auto;display: block">退出</Button>
    </div>

  </div>
</template>
<script>
  import  vueCookie from  'vue-cookie'
  import axios from  'axios'
  import user from './children/user.vue'
  import takePhoto from  '../../photo'
  export default{
      name:'charter',
    mounted(){
      this.getNumerArticle();
    },
    data(){
      return {
        initImg: this.webConfig.getPath('assets/img/'),
        url: this.webConfig.getPath('index.php/article/get-number-article'),
        isUser: localStorage.getItem("loginCookie"),
        articleNum:0
      }
    },
    deactivated(){
      this.$destroy(true)
    },
    methods: {
      forLogin(){
        this.$Message.warning('请先登录');
      },
      confirm(){
        let _this = this;
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确认退出？</p>',
          onOk: () => {
            localStorage.removeItem("loginCookie");
            localStorage.removeItem('uid');
            this.$store.commit('beAblePost', false);
            this.$router.push('/rent');
             window.scrollTo(0,0);
          }
        });
      },
      dayToNight(e){
        if (e == true) {
          this.$store.commit('toNight', true);
        } else {
          this.$store.commit('toNight', false);
        }

      },
      getNumerArticle(){
          axios.get(this.url,{
              params:{
                  userId:localStorage.getItem('uid')
              }
          }).then(res=>{
              this.articleNum=res.data;
          })
      }
    },
    computed: {
      isNight(){
        return this.$store.state.night;
      },
    },
    components: {
      'user-component': user,

    }
  }
</script>
<style type="text/css" scoped>
  #charter {
    padding-bottom: 10vh;
  }
  #charter.pb{
    padding-bottom: 16vh;
  }

  #setting {
    position: fixed;
    right: 6vw;
    top: 16vw;
    width: 8vw;
    height: 8vw;
    color: #fff;
  }

  #setting .icon {
    font-size: 1.4rem;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
  }
</style>
