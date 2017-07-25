<template>
  <div id="chat">
    <Tabs value="name1">
      <Tab-pane :label="label" name="name1">
        <div class="remind" v-if="remindList.length>0">
          <div class="remind-item">
          </div>
        </div>
        <div class="b_img" v-else :style="bg">
          <span @click="change"> 没有消息提醒额~</span>
        </div>
      </Tab-pane>
      <Tab-pane :label="label2" name="name2">
        <div class="letter" v-for="val in letterList" >
              <router-link :to="'/chat/chatting/'+val.id" class="letter-item">
                  <div class="icon">
                    <img :src="initImg+val.icon" alt="用户头像">
                  </div>
                <div class="content">
                  <div class="message">
                    {{val.message}}
                  </div>
                  <div class="user_time">
                    <b>{{val.username}}</b>
                    <span>{{val.time}}</span>
                  </div>
                </div>
              </router-link>
        </div>
      </Tab-pane>
    </Tabs>
    <transition >
      <router-view id="view"></router-view>
    </transition>

  </div>
</template>
<script>

  export default{
    mounted(){
      this.change();
      this.init();
    },
  data(){

    return {
      bg:{
         backgroundImage:''
      },
      initImg:this.webConfig.getPath('assets/img/user_icon/'),
        initUrl:`url(${this.webConfig.getPath("assets/img/non-chat.png")})`,
        remindList:[],
        letterList:[{
            id:'93651281-e3c7-d60c-7c0a-a73d225a0032',
            icon:'user20170023.jpg',
            username:'敬林',
            message:'你最近怎样',
            time:'2017/5/4 20:00:00',

        }],
      label: (h) => {
        return h('div', [
          h('span', '提醒'),
          h('Badge', {
            props: {
              count: this.remindList.length
            }
          })
        ])
      },
      label2: (h) => {
        return h('div', [
          h('span', '私信'),
          h('Badge', {

            props: {
              count: this.letterList.length
            }
          })
        ])
      }
    }
      },
   methods:{
      init(){
          this.bg.backgroundImage=this.initUrl;
      },
     change(){
         if(this.letterList.length>0){
           this.$store.commit('haveMes',true);
         }else{
           this.$store.commit('haveMes',false);
         }

     }
   },
    computed:{

      mesIsShow(){
          return localStorage.getItem("loginCookie")==null?false:true
      }
    },

}
</script>
<style type="text/css" scoped="">
.b_img{
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  margin:auto;
  left:0;
  right:0;
  bottom:0;
  top:-60vw;
  width:59vw;
  height:66vw;
background: url('http://192.168.0.132:8881/assets/img/non-chat.png');
  background-size: 100% auto;
  padding-bottom:10vw;
}
  .letter-item{
    color: #2b2424;
    padding:2vw;
    display: flex;
    background: #fff;
    border-bottom: 1px solid gainsboro;
  }
  .icon{
    padding: 2px;
    border: 1px solid gainsboro;
    width:24vw;
    height:24vw;

  }
  .content{
    flex-grow: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 1.3vw;
  }
  .message{
    font-size: 1.2rem;
  }
  .user_time{
  align-self: flex-end;
   }
  #view{
    position: fixed;
    right:0;
    top:0;
    background: #fff;
    width:100%;
    height:100vh;
    z-index:633;
  }
</style>
