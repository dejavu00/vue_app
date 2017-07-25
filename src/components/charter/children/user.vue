<template>
  <div id="user" class="po-r" :style="bg">
    <div id="avator_name" class="po-a s-around">
     <div class="icon-username">
       <div class="avator">
        <router-link to="/charter/setting" v-if="isUser">
          <img :src="initIcon+userList.icon" alt="用户头像">
        </router-link>
         <div to="/charter/setting" v-else @click="warningMeg">
           <img :src="initIcon+userList.icon" alt="用户头像">
         </div>
       </div>
       <div class="name_id" v-if="isUser">
         <p class="name mb_2">
           {{identity}}: {{userList.username}}
         </p>
         <p class="my_Id ">
           ID: {{my_id}}
         </p>
       </div>
       <div class="name_id" v-else>
         <p>
           未登录<br/> <router-link to="charter/login" style="color: greenyellow">点击登录</router-link>
         </p>
       </div>
     </div>
      <div class="signature ">
        <router-link to="/charter/setting" class="s-between">
          <i> {{userList.signature}}</i>
          <Icon type="ios-arrow-right" size="20" v-show="userList.signature.length>0"></Icon>
        </router-link>
      </div>
    </div>

  </div>
</template>
<script>
  import $ from  'jquery'
  export default{
      name:'user',

      mounted(){
        this.init();
        if(this.isUser){
          this.getUser();
        }
      },
      data(){
          return{
            bg:{
              backgroundImage:''
            },
            initUrl:`url(${this.webConfig.getPath("assets/img/user-bg.jpg")})`,
            initIcon:this.webConfig.getPath('assets/img/user_icon/'),
              url:this.webConfig.getPath('index.php/my-app/login'),
              isUser:localStorage.getItem("loginCookie"),
              userList: {
                  id:'808008',
                  icon:'man.png',
                  username:'哈哈哈',
                  signature:''
              }
          }
      },
    methods:{
      warningMeg(){
        this.$Message.warning('修改头像前，请先登录');
      },
      init(){
        this.bg.backgroundImage=this.initUrl;
      },
      getUser(e){
        $.post(this.url, {
          isUser: this.isUser
        }).then(res => {
          res = JSON.parse(res);
          this.userList = res;
          //每次通过本地存储的发送ajax太麻烦，这里直接把手机号存储在本地
         localStorage.setItem('uid', this.userList.id);

        }).catch(err => {
          this.$Message.error('请检查你的网络连接');
        })
      }
    },
    computed:{
      my_id(){
        return this.userList.id.substr(0,3)+'_'+this.userList.id.substr(3,4);
      },
      identity(){
        return this.userList.identity==0?'租客':'房东';
      }
    },
  }
</script>

