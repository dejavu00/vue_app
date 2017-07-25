<template>
  <div id="latest">
    <div class="latest-item" v-for="(val,index) in latestList" :key="index">
      <div class="latest-title">
        <div class="icon">
          <img :src="initIcon+val.icon" alt="用户头像" >
        </div>
        <div class="user-mes">
          <div class="name">
            {{val.username}}
          </div>
        </div>
      </div>
      <router-link :to="'/community/article?id='+val.articleId">
        <div class="latest-content">
          <div class="latest-word">
            {{val.content}}
          </div>
          <div class="latest-img" v-show="val.pic" ref="images">

            <img :src="defaultImg" alt="帖子图片" :newPic="val.pic | addPost">
          </div>
        </div>
        <div class="latest-bottom">
          <a class="share">
            <Icon type="android-share-alt" color="greenyellow"></Icon>
          </a>
          <a class="comment">
            <Icon type="chatbubble-working" color="orange"></Icon>
          </a>
          <a class="star">
            <i class="icon iconfont icon-damuzhi"></i>
          </a>
        </div>
      </router-link>
    </div>
    <div class="text-center" style="color: #bbbec4">
      {{tips}}
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
Vue.filter('addPost',function (val) {
    let str='';
  if(val){
        str='http://mta.bixiuko.com/forstus/web/assets/img/latest/'+val;
      return str;
  }else {
      return '';
  }
})
  export default{
    name: 'latest',
    props: ['latestList'],
    updated(){
      this.init(this.latestList);
    },
    data(){
      return {
          tips:'已经到最下面了，我的天',
        initIcon: this.webConfig.getPath('assets/img/user_icon/'),
        initImg: this.webConfig.getPath('assets/img/latest/'),
        defaultImg: this.webConfig.getPath('assets/img/latest/picLoading.jpg'),
        length:0,
      }
    },

    methods:{
      init(val){
        let img = this.$refs.images;
        this.length =val.length;
        let length=this.length;
          this.lazyLoad(img,length);
        let _this=this;
      //  window.onscroll=this.lazyLoad(img,length);

     window.addEventListener('scroll',_this.throttle(_this.lazyLoad,img,length,200,500),false);
      },
      lazyLoad(img,length){
        let seeHeight = document.documentElement.clientHeight; //可见区域高度
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部高度
        let n=0;
        let src='';
        let  reg = /\w+\.(jpg|jpeg|gif|bmp|png)/i;
        for (let i = n; i < length; i++) {
          if (img[i].offsetTop < seeHeight + scrollTop + 190) {
                  src=img[i].lastChild.getAttribute('src');
            if (src!='' ||  !reg.test(src)) {
              img[i].lastChild.src = img[i].lastChild.getAttribute("newPic");
            }
            n = i + 1;
          }
        }
      },
      throttle(fn,img,length,delay,atleast){
        let timer=null;
        let previous=null;
          return function () {
            let currentDate=new Date();
            if(currentDate-previous>atleast){
              fn(img,length);
              previous=currentDate;
            }else{
              clearTimeout(timer);
              timer=setTimeout(function () {
                fn(img,length);
              },delay)
            }

          }

      }

    }
  }
</script>
