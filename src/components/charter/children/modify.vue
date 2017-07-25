<template>
  <div id="modify">
    <header>
      <Icon type="ios-arrow-left" class="back" @click.native="back" color="#fff"></Icon>
      <h1 v-text="title"></h1>
    </header>
    <div class="content" v-if="isUsername">
      <div class="modify-mes">
        <input type="text" v-model="username" ref="word" class="user-input"/>
        <p class="tips">{{tips}}</p>
        <Button type="primary" shape="circle" size="large" @click.native="modal1 = true">完成</Button>
      </div>
    </div>
    <div class="content" v-else>
      <div class="modify-mes">
        <Input v-model="signature" type="textarea" :rows="4" placeholder="请输入个人签名" :maxlength="length" :autofocus=auto></Input>
        <p class="tips">{{tips}}</p>
        <Button type="primary" shape="circle" size="large" @click.native="modifySignature">保存</Button>
      </div>
    </div>

    <Modal
      v-model="modal1"
      title="提示"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>确认修改昵称</p>

    </Modal>
  </div>
</template>
<script>
  import $ from 'jquery'
  export default{
    name: 'modify',
    mounted(){
      this.$refs.word.focus();
      let query = this.$route.query;
      for (let key in query) {

        if (key == 'username') {
          this.isUsername = true;
          this.title = '昵称';
          this.username = query[key];
          this.tips = '一个月可以修改一次昵称，请认真修改哟!';
        } else {
          this.isUsername = false;
          this.title = '个人签名';
          this.tips = '最长可以输入24个字符的个人签名'
        }
      }
    },
    data(){
      return {
        auto:true,
        url: this.webConfig.getPath('index.php/my-app/modify-user'),
//        url: 'http://192.168.0.151:8881/my-app/modify-user',
        modal1: false,
        isUsername: true,
        tips: '',
        title: '昵称',
        username: '',
        signature: '',
        length: 24
      }
    },
    methods: {
      modifyUsername(){
       $.post(this.url,{
           userId:localStorage.getItem('uid'),
           username:this.username
       }).then(res=>{
         res = JSON.parse(res);
         if(res.status==200){
             this.$Message.success(res.msg);
             this.$emit('init');
             this.$router.push('/charter/setting');

         }else{
           this.$Message.error(res.msg);
           this.$emit('init');
           this.$router.push('/charter/setting');
         }
       })
      },
      modifySignature(){
          if(this.signature.trim().length==0){
            this.signature='这个家伙很懒，什么都没有写~'
          }
        $.post(this.url,{
          userId:localStorage.getItem('uid'),
          signature:this.signature
        }).then(res=>{
          res = JSON.parse(res);
          if(res.status==200){
            this.$Message.success(res.msg);
            this.$emit('init');
            this.$router.push('/charter/setting');
          }else{
            this.$Message.error(res.msg);
            this.$emit('init');
            this.$router.push('/charter/setting');
          }
        })
      },
      back()
      {
        this.$router.go(-1);
      },
      ok () {
        this.modifyUsername();
      },
      cancel () {

      }

    }
  }
</script>

