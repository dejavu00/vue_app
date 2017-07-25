<template>
  <div id="register">
    <div id="user" :style="bg">
      <p class="title">
        <Icon type="ios-arrow-left" class="back" @click.native="back" color="#fff"></Icon>
      </p>
    </div>
    <div  id="register_form"
          >
      <div class="form-group po-r">
        <i class="icon iconfont icon-yonghu"></i>
        <input type="text" class="form-control" name="username" placeholder="姓名" v-model="formList.username" autofocus="autofocus" autocomplete="off"  ref="user"    >
        <Icon type="ios-close-outline" class="po-a close" size="28" color="#fff" @click.native="clear('username')"></Icon>

      </div>
      <div class="form-group po-r">
        <i class="icon iconfont icon-mima"></i>
        <input type="password" class="form-control" name="password" placeholder="密码" v-model="formList.password"
         minlength="6"      required>
        <Icon type="ios-close-outline" class="po-a close" size="28" color="#fff" @click.native="clear('password')"></Icon>

      </div>
      <div class="form-group po-r">
        <i class="icon iconfont icon-phone"></i>
        <input type="text" class="form-control" placeholder="联系手机号" name="mobile" v-model="formList.mobile"  autocomplete="off"
        >
        <Icon type="ios-close-outline" class="po-a close" size="28" color="#fff" @click.native="clear('mobile')"></Icon>

      </div>
      <div class="form-group identity-group ">
        <span>请问你是:</span>
        <Radio-group v-model="formList.identity">
          <Radio label="0">
            <span>租客</span>
          </Radio>
          <Radio label="1">
            <span>房东</span>
          </Radio>

        </Radio-group>
      </div>
      <div class="form-group po-r" v-show="formList.identity==1">
        <i class="icon iconfont icon-quyu"></i>
        <input type="text" class="form-control" placeholder="区域/小区" name="area" v-model="formList.area"  autocomplete="off">
        <Icon type="ios-close-outline" class="po-a close" size="28" color="#fff" @click.native="clear('area')"></Icon>
      </div>
      <div>

        <button type="button" id="submit_btn" class="form-control" @click="send">提交</button>
      </div>
    </div>
    <div id="wrapper" v-show="isModal">
      <div class="validate_mes">
        <div class="content">
          {{fault_mes}}
        </div>
        <p id="confirm" @click="isModal=!isModal">确定</p>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import $ from  'jquery'
  export default{
    name: 'register',
    mounted(){

      this.$refs.user.focus();
      this.$store.commit('changeInput', false);
        let _this=this;
        let $input=$("#register_form input");
        $input.focus(function () {
          _this.isInputting();
        }).blur(function () {
          _this.notInputting();
        })

      this.init();
    },
    data(){
      return {
        bg:{
          backgroundImage:''
        },
        initUrl:`url(${this.webConfig.getPath("assets/img/login.jpg")})`,
        isModal: false,
        fault_mes: '请输入你的手机号。',
        isValid: true,
       url:this.webConfig.getPath('index.php/my-app/signup'),
       confirmUserUrl:this.webConfig.getPath('index.php/my-app/confirm-user'),
        formList: {
          username: '',
          password: '',
          mobile: '',
          identity:'0',
          area: ''
        },

      }

    },
    methods: {
      clear(e){
         this.formList[e]='';
      },
        send(){
            this.validate();
            if(this.isValid==false){
                return;
            }
        },
      isInputting(){
        this.$store.commit('changeInput',false);
      },
      notInputting(){
        this.$store.commit('changeInput',true);
      },
      init(){
        window.scrollTo(0,0);
        this.bg.backgroundImage=this.initUrl;
      },
      validate(){
          this.checkUser();
          this.validate_area();
      },
      validate_area(){
        if (this.formList.isOwner == '0') {
          this.formList.area = '';

        }
      },
      checkUser(){

        let re2=/^[\u4E00-\u9FA5A-Za-z][\u4E00-\u9FA5A-Za-z0-9/，/_/。/,/、/.]+$/
        let user=this.formList.username.trim();
        let password=this.formList.password.trim();
        if(user.length==0 || password.length==0){
          this.fault_mes = '用户名或密码不能为空';
          this.isModal = true;
          this.isValid = false;
        }else if(!re2.test(user)  ){
          this.fault_mes = '以字母或汉字开头非特殊字符(可含有标点)';
          this.isModal = true;
          this.isValid = false;
        }
        else if(12<password.length ||  password.length<6){
          this.fault_mes = '密码请输入6-12位';
          this.isModal = true;
          this.isValid = false;
        }
        else{
          this.isValid = true;
          this.checkPhone();
        }
      },
      checkPhone(){
        if (!(/^1[34578]\d{9}$/.test(this.formList.mobile))) {
          this.fault_mes = '手机格式不对';
          this.isModal = true;
          this.isInputting();
          this.isValid = false;
        }else{
          this.isValid = true;
          this.confirmUser();
        }
      },
      confirmUser() {
        axios.get(this.confirmUserUrl,{
            params:{
                mobile:this.formList.mobile
            }
        }).then(res => {
          if(res.data.length>3){
           this.fault_mes=res.data;
           this.isModal = true;
            this.isInputting();
           this.isValid = false;
         }else{
            this.isValid = true;
            this.register();
          }

        }).catch((error) => {
          this.isValid = true;
        console.log(error);
      })
    },
      back(){
        this.$router.go(-1);
      },
      register(){
        $.ajax({
          url:this.url,
          method:'post',
          data:this.formList
        }).then(res=>{
          res=JSON.parse(res);
          if(res.status==200){
            this.$Message.success('恭喜你注册成功');
            this.$router.push('/charter/login');
          }
        }).catch(err=>{
          this.$Message.error(err);
        })
      }

    }

  }
</script>
<style>
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
  .identity-group span{
    margin-left: 2vw;
    color: #727680;
    padding:0!important;
  }

</style>

