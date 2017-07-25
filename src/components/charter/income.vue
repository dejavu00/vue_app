<template>
  <div id="income">
    <user-component></user-component>
    <div id="withdraw">
      <p class="text-center">余额 <span>0</span> </p>
      <router-link to="income/exchange" class="withdraw">
        提现
      </router-link>
    </div>
    <Tabs>
      <Tab-pane label="全部" >
        <div class="empty po-r">
          <h1 class="po-a">哈哈，尚未数据</h1>
        </div>

      </Tab-pane>
      <Tab-pane label="已签约" >
        <div class="empty po-r">
          <h1 class="po-a">哈哈，尚未数据</h1>
        </div>
      </Tab-pane>
    </Tabs>
  </div>
</template>
<script>
  import user from './children/user.vue'
  export default{
    data(){
        return{

        }
    },
    components:{
      'user-component':user
    }
  }
</script>
<style  scoped>
 #income #user{
  background: #fa2c52!important;
}
h1{
  font-size: 1.3rem;
  left:50%;
  top:40%;
  transform:translate(-50%,-50%);
}
.empty{
  min-height: 64vh;
  background: #eaeaea;
}
#withdraw{
  width: 20vw;
  height: 13vw;
  position: fixed;
  right: 5vw;
  top: 15vw;

}
#withdraw p{
  margin-bottom:1vw;
  color: #fff ;
}
  .withdraw{
    color: #fa2c52;
    padding: 1vw 5vw;
    border-radius: 5px;
    background:#DBDBDB;
  }
</style>
