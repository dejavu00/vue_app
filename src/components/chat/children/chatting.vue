<template>
  <div id="chatting">
    <header class="po-r">
      <div @click='back' style="height: 100%;margin-left: 2vw;width: 10vw" class="back po-a" >
        <Icon type="ios-arrow-left"  color="gray" size="20"></Icon>
      </div>

      <h1>与 {{chatList[0].username}} 聊天中</h1>
    </header>
    <div id="chat_wrapper">
      <div class="chat_item" v-for="val in chatList">
        <div class="icon">
          <img :src="initIcon+val.icon" alt="用户头像">
        </div>
        <div class="content po-r">
          <Icon type="arrow-left-b" class="po-a three"></Icon>
          <div class="message">
            {{val.message}}
          </div>

        </div>
      </div>
    </div>
    <div id="chat_input">
      <Input v-model="mySay" placeholder="我想说...管你毛事" ></Input>
      <Button type="success">发送</Button>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
          mySay:'',
        initIcon: this.webConfig.getPath('assets/img/user_icon/'),
        chatList: [
          {
            icon:'user20170023.jpg',
            username: '敬林',
            message: '你最近怎样',
            time: '2017/5/4 20:00:00'
          }
        ]
      }
    },
    methods: {
      back(){
        this.$router.go(-1);
      }
    }
  }
</script>
<style type="text/css" scoped>
  header {
    text-align: center;
    border-bottom: 1px solid gainsboro;
   line-height: 13vw;
    font-size: 0.6rem;
  }

  header .po-a {
    font-size: 1.5rem;
    width: 1.2vw;


  }
  #chat_wrapper{
    min-height: 100vh;
    overflow: auto;
    background: #eaeaea;
  }
  .chat_item{
    padding: 2vw;

  }
  .icon{
    padding: 2px;
    border: 1px solid gainsboro;
    width:14vw;
    height:14vw;

  }
  .content{
    margin-left:2vw;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 1.3vw;
    background: #fff;
  }
  .message{
    font-size: 1.2rem;
  }

  .chat_item{
    display: flex;
  }
  .three{
    left:-6px;
    top:0;
    margin:  auto 0;
    height:19px;
    bottom:0;
    font-size: 1.6rem;
    color: #fff;
  }
  #chat_input{
    display: flex;
    width:100%;
    position: fixed;
    left:0;
    bottom:4px;
  }
  .ivu-input{
    height:36px;
  }


</style>
