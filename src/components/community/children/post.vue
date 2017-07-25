<template>
  <div id="post">
    <header>
      <div @click="modal1 = true" style="height: 100%" class="back" >
        <Icon type="ios-arrow-left"  color="gray"></Icon>
      </div>
      <h1 v-text="title"></h1>
      <a to="/community" class="publish" @click="uploadImg">
        发表
      </a>
    </header>
    <div id="content" style="padding-bottom: 9vw" >
      <Input v-model="content" type="textarea" :rows="7" placeholder="发表帖子..."  ref="text"

      ></Input>
      <div class="upload" >
        <img src="" ref="pic" id="pic" style="height: auto">
        <Icon type="plus-round"></Icon>
        <div class="input-icon">
          <input type="file" name="imageFile" multiple @change="selectImg" accept="image/*">
        </div>
      </div>

    </div>
    <footer ref="footer" :style="toBottom" id="upFooter">
      <div class="tab" id="takePhoto" @click.stop="takePhoto">
        <Icon type="android-camera"></Icon>
        <p>照相</p>
      </div>
      <div class="tab">
        <Icon type="link"></Icon>
        <p>链接</p>
      </div>
      <div class="tab">
        <Icon type="stats-bars"></Icon>
        <p>投票</p>
      </div>
    </footer>
    <Modal
      v-model="modal1"
      title="提示"
      @on-ok="ok"
      @on-cancel="cancel">
      你想放弃发帖吗?
    </Modal>
  </div>
</template>
<script>
  import takePhoto from  '../../../photo'
  import $ from 'jquery'
  export default{
    name: 'post',
    mounted(){
      this.cvs = document.createElement('canvas');
      document.addEventListener('deviceready', function () {
      }, false);
    },
    data(){
      return {
        sendData:0,
        cvs:null,
        fileType:'',
        modal1: false,
        url: this.webConfig.getPath('index.php/article/create-atrticle'),
        title: '发帖',
        content: '',
        image: 0,
        isRequest:false,
        toBottom:{
            bottom:'30vh'
        }
      }

    },
    methods: {
      takePhoto(){
       this.$Message.info('已具备照相功能');
      },

      ok () {
        this.back();
      },
      cancel () {
        this.$Message.info('你的选择是对的');
      },
      back(){
        this.$router.go(-1);
      },
      selectImg(e){
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)  return;
        this.createImage(files[0]);
      },
      createImage(file){
        let _this = this;
        let image = new Image();
        let reader = new FileReader();
        let URL = window.URL || window.webkitURL;
        let imgURL = URL.createObjectURL(file);
        this.$refs.pic.src = imgURL;
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
              scale = 500 / this.width;
            }else{
              scale = 500 / this.height;
            }
          }
          _this.cvs.width = this.width*scale;
          _this.cvs.height = this.height*scale;

          let ctx =  _this.cvs.getContext('2d');
          ctx.drawImage(this, 0, 0,_this.cvs.width,_this.cvs.height);
          let newImageData = _this.cvs.toDataURL(_this.fileType, 0.8);   //重新生成图片，<span style="font-family: Arial, Helvetica, sans-serif;">fileType为用户选择的图片类型</span>
          _this.sendData = newImageData;

        }
      },
      uploadImg(){
        if (this.content.trim().length ==0 && this.sendData == 0) {
          this.$Message.warning('请填写帖子内容或上传图片');
          return;
        }
        if(this.isRequest){
            return;
        }
        this.isRequest=true;
        this.$Message.loading({
          content: '发表...',
          duration: 14
        });
        $.ajax({
          url: this.url,
          method: 'post',
          data: {
            image: this.sendData,
            id: localStorage.getItem('uid'),
            content: this.content
          }
        }).then(res => {
          res = JSON.parse(res);
          if (res.status == 200) {
            this.$emit('update');
            this.isRequest=false;
            this.$router.push('/community');
            this.$Message.destroy();
          } else {
            this.isRequest=false;
            this.$Message.warning(res.msg);
            this.$Message.destroy();

          }
        }).catch(err => {
          this.$Message.error('请检查你的网络');
        })
      }
    },

  }
</script>
<style type="text/css" scoped>
footer{
  display: flex;
  justify-content: space-around;
}
  img {
    height: 100%;
  }

  .upload {
    width: 100%;
  }

  .tab {
    flex-grow: 1;
    color: #2d8cf0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  footer .ivu-icon {
    text-align: center;
    flex-basis: 100%;
    font-size: 2rem;
  }
</style>
