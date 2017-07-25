<template>
  <div id="login" style="height: 90vh;" class="{'night':isNight}">
    <div id="user" :style="bg">
      <p class="title">
        <Icon type="ios-arrow-left" class="back" @click.native="back" color="#fff"></Icon>
        <router-link to="register" id="register">
          立即注册
        </router-link>
      </p>
    </div>
    <form id="form_login">
      <div class="form-group po-r">
        <i class="icon iconfont icon-phone"></i>
        <input type="text" class="form-control" placeholder="联系手机号" name="mobile" v-model="formList.mobile"
               autocomplete="off"
               ref="number" @focus="isInputting" @blur="notInputting" autofocus>
        <Icon type="ios-close-outline" class="po-a close" size="28" color="#fff" @click.native="clear('mobile')"></Icon>
      </div>
      <div class="form-group po-r">
        <i class="icon iconfont icon-mima"></i>
        <input type="password" class="form-control" name="password" placeholder="密码" v-model="formList.password"
               autocomplete="off" required @focus="isInputting" @blur="notInputting">
        <Icon type="ios-close-outline" class="po-a close" size="28" color="#fff"
              @click.native="clear('password')"></Icon>
      </div>
      <div class="for_pass">
        <a href="" style="float:right;">忘记密码?</a>
      </div>
      <div>
        <button type="button" id="submit_btn" class="form-control" @click="send">登录</button>
      </div>

    </form>
    <div id="third_party" class="po-r s-around">
      <div class="po-a other">
        <span >其他方式登录</span>
      </div>
      <a href="`">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-qq"></use>
        </svg>
      </a>
      <a href="">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weixin"></use>
        </svg>
      </a>
      <a href="" style="color: #000">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weibo"></use>
        </svg>
      </a>
    </div>

  </div>
</template>
<script>
  import $ from 'jquery'
  import '../../assets/fonts/iconfont'
  export default{
    mounted(){
      this.$refs.number.focus();
      this.$store.commit('changeInput', false);
      this.init();
    },
    data(){
      return {
        bg: {
          backgroundImage: ''
        },
        initUrl: `url(${this.webConfig.getPath("assets/img/login.jpg")})`,
        url: this.webConfig.getPath('index.php/my-app/login'),
        formList: {
          password: '',
          mobile: '',
          rememberMe: true
        }
      }
    },
    computed: {
      isNight(){
        return this.$store.state.night;
      },
    },
    methods: {
      clear(e){
        this.formList[e]='';
      },
      isInputting(){
        this.$store.commit('changeInput', false);
      },
      notInputting(){
        this.$store.commit('changeInput', true);
      },
      init(){
          window.scrollTo(0,0);
        this.bg.backgroundImage = this.initUrl;
      },
      back(){
        this.$router.go(-1);
      },

      send(e){
        if (this.formList.mobile == '' && this.formList.password == '') {
          this.$Message.error('手机号或密码不能为空');
          return;
        };
        this.$Message.loading({
          content: '正在登录...',
          duration: 5
        });
        $.post(this.url, {
          mobile: this.formList.mobile,
          password: this.formList.password,
          rememberMe: this.formList.rememberMe
        }).then(res => {
          res = JSON.parse(res);
          if (res.status == 400) {
            console.log(res.msg);
            this.$Message.destroy();
            this.$Message.error(res.msg);
            return;
          }
          if (!localStorage.getItem("loginCookie")) {
            localStorage.setItem("loginCookie", res.cookies)
          }
          this.$Message.success('登录成功');
          this.$store.commit('beAblePost', true);
          this.$router.push('/charter');
          this.$Message.destroy();
        }).catch(err => {
          this.$Message.destroy();
          console.log(err);
        });
      }
    }
  }
</script>
<style scoped>
  p.title {
    padding: 8vw 4vw;
    height: 23px;
    line-height: 23px;
  }
  .title .ivu-icon {
    font-size: 1.7rem;
  }

  .back {
    float: left;
  }

  #register {
    font-size: 1.2rem;
    width: 20vw;
    float: right;
    color: #fff;
  }

  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .for_pass {
    overflow: auto;
    margin: 2vw 2vw 2vw 6vw;

  }

</style>
