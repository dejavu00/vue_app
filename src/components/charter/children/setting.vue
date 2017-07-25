<template>
  <div id="person_setting" @click="isModal=false">
    <header>
      <Icon type="ios-arrow-left" class="back" @click.native="back" color="#fff"></Icon>
      <h1 v-text="title"></h1>
    </header>
    <div class="user po-r" >
      <div class="user-icon po-r">
        <div class="icon po-a">
          <img :src="initIcon+userList.icon" alt="用户头像" ref="icon" id="pic" style="height: 100%">
        </div>
        <div class="icon icon2 po-a">
          <input type="file" name="imageFile" id="upload"  accept="image/*;capture=camera" @change="selectImg">
        </div>
        <p class="po-a modify">{{modify}}</p>

      </div>
    </div>
    <div class="detail-mes">
      <p>
        <b class="define">昵称</b>
        <router-link :to="'setting/modify?username='+userList.username">
          <span>{{userList.username}}</span>
        </router-link>
      </p>
      <p>
        <b class="define">性别</b>
        <Radio-group v-model="userList.sex" @on-change="change">
          <Radio label="男">
            <span>男</span>
          </Radio>
          <Radio label="女">
            <span>女</span>
          </Radio>
        </Radio-group>
      </p>
      <p>
        <b class="define">个人签名</b>
        <router-link :to="'setting/modify?signature='+userList.signature">
          <span>{{userList.signature}}</span>
        </router-link>
      </p>
    </div>
    <router-view @init="init">
    </router-view>
    <div id="allmap" style="height: 300px">

    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import takePhoto from  '../../../photo'

  export default{
    name: 'person',
    mounted(){
      console.log('缓存没');
      let _this=this;

     this.cvs = document.createElement('canvas');
      document.addEventListener('deviceready', function () {

      }, false);
      if (this.isUser) {
        this.getUser();
      }
    },
    data(){
      return {
        x: 0,
        y: 0,
        cvs:null,
        title: '个人信息',
        uploadFile: this.webConfig.getPath('index.php/my-app/upload'),
       initIcon: this.webConfig.getPath('assets/img/user_icon/'),
        url: this.webConfig.getPath('index.php/my-app/login'),
        isUser: localStorage.getItem("loginCookie"),
        modify: '点击修改头像',
        userList: {
          icon: 'man.png',
          sex: '男',
          signature: '这家伙很懒，什么都没有写~'
        },
        image: 0,
        fileType:'',
        isModal: false,
        sendData:0

      }
    },
    methods: {
      init(){
        this.getUser();
      },
      change(e){
        this.$Message.warning('不男不女真的好吗?');
      },
      back(){
        this.$router.push('/charter')
      },
      getUser(){
        $.post(this.url, {
          isUser: this.isUser
        }).then(res => {
          this.$Loading.finish();
          res = JSON.parse(res);
          this.userList = res;
          this.userList.sex = this.userList.sex - 0 == 0 ? '男' : '女';
        }).catch(err => {
          this.$Loading.error();
        })
      },
      selectImg(e){
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)  return;
        this.fileType=files[0].type;
        this.createImage(files[0]);
        this.isModal = false;
      },
      createImage(file){
        let _this = this;
        let image = new Image();
        let reader = new FileReader();
        let URL = window.URL || window.webkitURL;
        this.$refs.icon.src = URL.createObjectURL(file);

        reader.onload = function (e) {
          _this.image = e.target.result;
          _this.forCanvas(_this.image);
        };
        reader.readAsDataURL(file);
      },
      forCanvas(srcImg){
          let _this=this;
          let image=new Image();
          image.src=srcImg;
        image.onload=function () {
          let scale = 1;
          if(this.width > 1000 || this.height > 1000){
            if(this.width > this.height){
              scale = 100 / this.width;
            }else{
              scale = 100 / this.height;
            }
          }
          _this.cvs.width = this.width*scale;
          _this.cvs.height = this.height*scale;
          console.log(_this.cvs.width+"||"+_this.cvs.height);
          let ctx =  _this.cvs.getContext('2d');
          ctx.drawImage(this, 0, 0,  _this.cvs.width,  _this.cvs.height);
          let newImageData = _this.cvs.toDataURL(_this.fileType, 0.8);   //重新生成图片，<span style="font-family: Arial, Helvetica, sans-serif;">fileType为用户选择的图片类型</span>
          _this.sendData = newImageData;
          _this.uploadImg(_this.sendData);
        }
      },
      uploadImg(){
        $.ajax({
          url: this.uploadFile,
          method: 'post',
          data: {
            image: this.sendData,
            mobile: this.userList.mobile
          }
        }).then(res => {
          res = JSON.parse(res);
          if (res.status == 200) {
            this.$Message.success(res.msg);
          } else {
            this.$Message.warning(res.msg);
          }
        }).catch(err => {
          this.$Message.error(err);
        })
      },


    }
  }
</script>
<style type="text/css" scoped>
  .photo-wrapper {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
    left: 0;
    top: 0;
    justify-content: center;
    align-items: center;
  }

  .photo {
    width: 84vw;
    height: 50vw;
    background: #fff;
    margin-top: -20vw;
  }
  .photo .title {
    font-size: 1.4rem;
    color: deepskyblue;
    padding: 4vw 0;
    margin-left: 2vw;
    border-bottom: 1px solid deepskyblue;
  }
  .photo p {
    margin-left: 2vw;
    height: 16vw;
    line-height: 16vw;
  }

  .photo label {
    display: block;
    width: 100%;
    height: 100%;
  }

</style>



