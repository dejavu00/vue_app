<template>
  <div id="comment">
    <div class="comment-title">
      <p>评论</p>
      <p>
        <Dropdown trigger="click" placement="top-end" @on-click="change">
          <a href="javascript:void(0)">
            <span>{{sort}}</span>
            <Icon type="levels" color="20"></Icon>
          </a>
          <Dropdown-menu slot="list" >
            <Dropdown-item name="最新排序" :selected="latest">按最新排序</Dropdown-item>
            <Dropdown-item name="热门排序" :selected="!latest">按热门排序</Dropdown-item>
          </Dropdown-menu>
        </Dropdown>

      </p>
    </div>
    <ul >
      <li class="comment-item" v-for="val in commentList">
        <div class="comment-user">
          <img :src="initIcon+val.icon" alt="用户头像">
        </div>
        <div class="comment-content">
          <p class="username-time">
            <b> {{val.username}}</b>
            <span class="time"> {{val.createdTime | getTime}}</span>
          </p>
         <div class="content-img">
          <div> {{val.comment}}</div>
           <div v-show="val.commentPic" style="width:40vw;">
             <img :src="val.commentPic | addComment" alt="评论图片">
           </div>
         </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import Vue from 'vue'
  Vue.filter('getTime',function (val) {
      function num(x) {
        if(x<10){
            return '0'+x;
        }else{
            return  x+'';
        }
      }
    let date=new Date(val);
    return num(date.getMonth()+1)+"/"+num(date.getDate());
  })
  Vue.filter('addComment',function (val) {
    let str='';
    if(val){
      str='http://mta.bixiuko.com/forstus/web/assets/img/comment/'+val;
      return str;
    }else {
      return '';
    }
  })
  export default{
      name:'comment',
      props:['commentList'],
      data(){
          return{
            latest:true,
              sort:'最新排序',
            initIcon:this.webConfig.getPath('assets/img/user_icon/'),
            commentPic:this.webConfig.getPath('assets/img/comment/'),

          }
      },
    methods: {
      change(e){
        this.sort = e;
        this.latest=!this.latest;
      }
    }
  }
</script>
<style type="text/css" scoped>
  .comment-item{
    border-bottom: 1px solid gainsboro;
    padding: 3vw;
    display: flex;
  }
  .comment-title{
    color: #b1a9a9;
    padding: 1vw 2vw;
    display: flex;
    justify-content: space-between;

  }
.comment-content{
  margin-left:2vw;
  width:80%;
}
  .comment-user{
    border-radius: 50%;
    overflow: hidden;
    width:12vw;
    height:12vw;
  }
  .comment-user img{
    height:100%;
  }
  .time{
    font-size: 0.8rem;
  }
</style>
