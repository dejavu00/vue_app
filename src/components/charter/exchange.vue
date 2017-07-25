<template>
  <div id="exhange">
    <h1 >提现申请 </h1>
    <div class="result ">

        {{msg}}

    </div>
    <div id="back">
      <router-link to="/charter/income" >
        返回
      </router-link>
    </div>
  </div>
</template>
<script>
  export default{

      data(){
          return{
              msg:'你收益余额为0，不能提现'
          }
      }
  }
</script>
<style scoped="">

  h1{
    padding: 2vw 0;
    text-align: center;
    font-weight: 400;
    color:  #fa2c52;
    border-bottom: 1px solid  #fa2c52;
  }
  .result{
    height:70vh;
    text-align: center;
    line-height: 70vh;
    font-size: 1.5rem;
    color: #FF2D55;
  }
  #back{
    display: block;
    width:80%;
    margin: 0 auto;
    text-align: center;

  }
  #back  a{
    background: #FF2D55;
    color: #fff;
    border-radius: 15px;
    font-size: 1.6rem;
    text-align: center;
    padding:2vw 29vw;
  }

</style>
