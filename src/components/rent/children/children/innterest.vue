<template>
  <div id="interest">
    <h1 class="title">{{title}}</h1>
    <a :href="'/#/rent/getAllApartment/getApartmentDetail/'+item.position+'?apartmentId='+item.apartmentId+'&roomId='+item.roomId"  class="interest_item border-t" v-for="(item,index) in interestList" >
      <div class="house_img">
        <img :src="initImg+item.pic" alt="推荐房源图">
      </div>
     <div class="house_mes">
       <h1 class="house_name">
         {{item.style}}
       </h1>
       <p class="address_area">
        <span class="address">
          {{item.location}}
        </span>
         <span class="area">
           {{item.area}}
        </span>
       </p>
       <p class="price">
         ￥{{item.price}}
       </p>
       <p class="total_price">
         整租优惠价: {{item.total_price}}元/月
       </p>
     </div>
     </a>
  </div>
</template>
<script>
  import axios from 'axios'
  export default{
      name:'interest',
    mounted(){
      window.scrollTo(0,0);
      this.getSuggestedApartment();
    },
    data(){
          return{
              initImg:this.webConfig.getPath('assets/img/'),
              url: this.webConfig.getPath('index.php/my-app/get-suggested-apartment'),
              title:'你可能感兴趣的房源',
              interestList:[]
          }
    },
    methods:{
//        获取推荐房源信息
      getSuggestedApartment(){
        this.apartmentId = this.$route.query.apartmentId;
        this.roomId = this.$route.query.roomId;
        let _this=this;
        let data;
        axios.get(this.url, {
          params: {
            apartmentId: _this.apartmentId,
            roomId: _this.roomId
          }
        }).then((response) => {
          data = response.data;
          this.interestList = data;
        }).catch((err) => {
          console.log(err);
        });
      }
    }
  }
</script>

