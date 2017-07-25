<template>
  <div id="article">
    <header>
     <div @click='back' style="height: 100%" class="back" >
       <Icon type="ios-arrow-left"  color="gray"></Icon>
     </div>
      <h1>帖子详情</h1>
      <div class="share">
        ...
      </div>
    </header>
   <div class="content" >
     <div class="article">
       <div class="latest-title">
         <div class="icon" >
           <img :src="initIcon" alt="用户头像" >
         </div>
         <div class="user-mes">
           <div class="name-time">
             <p> <b v-text="latestList.username"> </b></p>
             <small v-text="postTime"></small>
           </div>
         </div>
       </div>
       <div class="latest-content">
         <div class="latest-word">
           {{latestList.content}}
         </div>
         <div class="latest-img"  v-show="latestList.pic">
           <img :src="initImg+latestList.pic" alt="帖子图片" >
         </div>
       </div>
       <div class="latest-bottom">
         <a href="" class="share">
           <Icon type="android-share-alt" color="greenyellow"></Icon>
         </a>
         <a  class="comment">
           <Icon type="chatbubble-working" color="orange"></Icon>
         </a>
         <a href="" class="star">
           <i class="icon iconfont icon-damuzhi"></i>
         </a>
       </div>

     </div>
     <div class="article-comment">
       <comment-component :commentList="commentList"></comment-component>
     </div>
     <div class="float-img" v-show="isSelectImg">
       <img src="" alt="" ref="img">
     </div>
     <footer v-if="isUser">
       <input type="text" class="comment-word" ref="word" onautocomplete="false" v-model="word"
       >
       <div class="upload po-r">
         <Icon type="images"></Icon>
         <input type="file" class="file" @change="selectImg">
       </div>
       <div class="send-btn po-r">
         <Button type="primary" size="small" @click.native="send" >发送</Button>
       </div>
     </footer>
     <footer v-else @click="warningMes">
       <input type="text" class="comment-word" ref="word" >
       <div class="upload po-r">
         <Icon type="images"></Icon>
         <input type="text" class="file" accept="image/*" multiple>
       </div>
       <div class="send-btn po-r">
         <Button type="primary" size="small"  >发送</Button>
       </div>
     </footer>
   </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import comment from './comment.vue'
  import $ from  'jquery'
  export default{
    name: 'article',
    mounted(){
      this.cvs = document.createElement('canvas');
      this.init();
    },
    data(){
      return {
        sendData:0,
        cvs:null,
        fileType:'',
          createImg:true,
        isSelectImg:false,
        initImg: this.webConfig.getPath('assets/img/latest/'),
        url: this.webConfig.getPath('index.php/article/detail-article'),
        getCommentUrl: this.webConfig.getPath('index.php/article/get-comment'),
        setCommentUrl:this.webConfig.getPath('index.php/article/comment'),
        latestList: {
           icon:'man.png',
            pic:'picLoading.jpg',
          username:'',
          createdTime:'000000'
        },
        isUser:localStorage.getItem('uid'),
        word:'',
        image:0,
        commentList:[]
      }
    },
    computed:{
      initIcon(){
         return this.webConfig.getPath('assets/img/user_icon/')+this.latestList.icon;

      },
      postTime(){
        function num(x) {
          if(x<10){
            return '0'+x;
          }else{
            return  x+'';
          }
        }
       let date=new Date(this.latestList.createdTime);
        return num(date.getMonth()+1)+"/"+num(date.getDate());
      },

    },
    methods: {
        warningMes(){
          this.$Message.warning('请先登录');
        },
        init(){
          this.getDetail();
          this.getComment();

        },
      getDetail(){
        let data;
        axios.get(this.url, {
          params: {
            id: this.$route.query.id
          }
        }).then(res => {
        data=res.data;
          if(data.status!=400){
           this.latestList = data;
         }else{
             this.$Message.error(data.msg)
         }
        }).catch(err => {
          console.log(err);
        })
      },
      getComment(){
        let data;
        axios.get(this.getCommentUrl, {
          params: {
            articleId: this.$route.query.id
          }
        }).then(res => {
          data=res.data;
          this.commentList=data;
        }).catch(err => {
          console.log(err);
        })
      },

      back(){
        this.$router.go(-1);
        this.$store.commit('changeInput',true);

      },
      send(){
          if(!this.createImg ){
              return;
          }
        if (this.word.trim().length ==0 && this.sendData == 0) {
              this.$Message.warning('评论不能为空');
              return;
          }
        this.$Message.loading({
          content: '吐槽中...',
          duration: 14
        });
        $.post(this.setCommentUrl, {
            articleId: this.$route.query.id,
            comment:this.word,
            image:this.sendData,
            userId:localStorage.getItem('uid')
        }).then(res => {
            res=JSON.parse(res);
            if(res.status==200){
              this.$Message.success(res.msg);
              this.$Message.destroy();
             this.init();
            }else{
              this.$Message.error(res.msg);
              this.$Message.destroy();
            }
          this.word='';
          this.image=0
          this.isSelectImg=false;
          this.createImg=true;
        }).catch(err => {
          this.isSelectImg=false;

          console.log(err);
        })
      },
      selectImg(e){
        this.createImg=false;
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)  return;
        this.createImage(files[0]);
      },
      createImage(file){
        let _this=this;
        let image = new Image();
        let reader = new FileReader();
        let URL = window.URL || window.webkitURL;
        let imgURL = URL.createObjectURL(file);
        this.$refs.img.src=imgURL;
        this.isSelectImg=true;
        reader.onload = function (e) {
          _this.image = e.target.result;
         _this.createImg=true;
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
          console.log('width:'+_this.cvs.width+" || height:"+_this.cvs.height);
          let ctx =  _this.cvs.getContext('2d');
          ctx.drawImage(this, 0, 0,_this.cvs.width,_this.cvs.height);
          let newImageData = _this.cvs.toDataURL(_this.fileType, 0.8);   //重新生成图片，<span style="font-family: Arial, Helvetica, sans-serif;">fileType为用户选择的图片类型</span>
          _this.sendData = newImageData;

        }
      },
    },
    components:{
      'comment-component':comment
    }
  }
</script>
