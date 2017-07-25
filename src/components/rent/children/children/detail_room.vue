<template>
 <div id="room">
   <div class="resource_item po-r" >
     <div id="house_img" ref="carousel" class="po-r">
       <swiper :options="swiperOption">
         <swiper-slide v-for="(val,index) in roomMes.imgGroup" :key="index">
           <img :src="val | addImg" alt="房间图">
         </swiper-slide>
       </swiper>
       <div class="swiper-pagination" slot="pagination"></div>
       <div class="collection po-a" @click.stop="isRed=!isRed" >
         <Icon type="android-star" v-if="isRed" class="isRed"></Icon>
         <Icon type="ios-star-outline" v-else></Icon>
       </div>
     </div>
     <div id="price" class="price po-a">
       <span>￥{{roomList.price}}</span> <small>/月</small>
     </div>
   </div>
   <!--详情页面主要内容-->
   <div id="detail_room" >
     <!--房间空余状态、价格及房间缩略图-->
     <div class="house_name text-center">
       <h1>{{roomList.style}}</h1>
       <span >整租优惠价: {{roomList.total_price}}元/月</span>
     </div>
     <!--房间详细信息，位置，交通户型等-->
     <ul class="detail_mes">
       <li class="location s-between">
         <span>小区</span>
         <span>{{roomList.location}}</span>
       </li>
       <li class="household s-between">
         <span>楼层</span>
         <span>
              {{roomList.household}}
            </span>
       </li>
       <li class="storey s-between">
         <span>楼层</span>
         <span>
              {{roomList.storey}}
            </span>
       </li>
       <li class="area s-between">
         <span>面积</span>
         <span>{{roomList.area}}平米</span>
       </li>
       <li class="facing s-between">
         <span>朝向</span>
         <span>{{roomList.facing}}</span>
       </li>
       <li class="transportation">
         <span>交通</span>
         <div class="pl_10">
           <p class="mb_2">地铁: {{ getMetro }}</p>
           <p class="mb_2">公交: {{ getTransit}}</p>
         </div>
       </li>
       <li class="shopping">
         <span>购物</span>
         <div class="pl_10">
           <span>{{roomList.shopping}}</span>
         </div>
       </li>
       <li class="bank" >
         <span>银行</span>
         <div class="pl_10">
            {{roomList.bank}}
         </div>
       </li>
     </ul>
     <!--配套设施-->
     <div class="supporting_facilities">
       <div >
        <div class="supporting_img"> <img :src="roomMes.facilities.image | addImg" alt="配套图片"></div>
         <h1 class="text-center">{{roomMes.facilities.title}}</h1>
       </div>
       <!--设施图标-->
       <div class="support-icon s-around">
         <i class="icon iconfont text-center " :class="val" v-for="val in roomMes.facilities.icon"></i>
       </div>
     </div>
     <!--管家服务-->
     <div class="services">
       <div >
        <div class="service_img"> <img :src="roomMes.service.image | addImg " alt="配套图片"></div>
         <h1 class="text-center">{{roomMes.service.title}}</h1>
       </div>
       <!--提供服务图标-->
       <div class="service_icon">
         <div v-for="(val,key) in roomMes.service.icon" class="text-center">
           <p class="mb_2"><i class="icon iconfont text-center" :class="val"></i></p>
           <p class="mb_2"><span>{{key}}</span></p>
         </div>
       </div>
     </div>
     <!--小区百度地图-->
      <a-map-component></a-map-component>
     <!--兴趣房源-->
     <div id="interest">
       <h1 class="title">{{title}}</h1>
       <router-link
         :to="{name:'detail_room',params:{id:item.position,aId:item.apartmentId,rId:item.roomId}}"
         class="interest_item border-t" v-for="(item,index) in interestList" :key="index" >
         <div class="house_img">
           <img :src="suggestImg+item.pic" alt="推荐房源图">
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
       </router-link>
     </div>
   </div>
 </div>
</template>
<script>
//  import interest from  './innterest.vue'
  import map from '../../../aMap.vue'
  import axios from 'axios'
  import $ from 'jquery'
import Vue from 'vue'
Vue.filter('addImg',function (val) {
  let str='';
  if(val){
    str='http://mta.bixiuko.com/forstus/web/assets/img/'+val;
    return str;
  }else {
    return '';
  }
});
  export default{
    name: 'detail_room',
    mounted(){
      window.scrollTo(0,0)
      this.init();
    },
      data(){
      return {
          initImg:this.webConfig.getPath('assets/img/'),
          swiperOption: {
          autoplay:1000,
          paginationType: 'fraction',
          loop: true,
          grabCursor : true,
          autoplayDisableOnInteraction:false,
          pagination: '.swiper-pagination',
          paginationCustomRender: function (swiper, current, total) {
            return current + ' / ' + total;
          }
        },
        timer: null,
        i: 0,
        isRed: false,
        isMoving: true,
        apartmentId: '',
        roomId: '',
        url: this.webConfig.getPath('index.php/my-app/get-apartment-detail'),
        imgUrl:this.webConfig.getPath('index.php/my-app/get-apartment-images'),
        roomMes: {
          imgGroup: [],
          facilities: {
            title: '配套设施',
            image: '',
            icon: []
          },
          service: {
            title: '管家服务',
            image: '',
            icon: {
              '免费WIFI': 'icon-wifi',
              '管家服务': 'icon-icon-test',
              '预约维修': 'icon-buoumaotubiao41',
              '免费保洁': 'icon-lanzixian'
            }
          }
        },
        roomList: {
          location: '',
          area: '',
          transportation: '',
          household: '',
          facing: '',
        },
        suggestImg:this.webConfig.getPath('assets/img/'),
        suggestUrl: this.webConfig.getPath('index.php/my-app/get-suggested-apartment'),
        title:'你可能感兴趣的房源',
        interestList:[]
      }
    },
    methods: {
        init(){

          this.apartmentId = this.$route.params.aId;
          this.roomId = this.$route.params.rId;
          this.getApartmentDetail();
          this.getApartmentImages();
          this.getSuggestedApartment();
        },
//      获取房间详细信息
      getApartmentDetail(){
        //        通过axios查询当前房间详情
        let _this = this;
        let data;
        axios.get(_this.url, {
          params: {
            apartmentId: _this.apartmentId,
            roomId: _this.roomId
          }
        }).then((response) => {
          data = response.data;
          this.roomList = data;
        }).catch((err) => {
          this.$Message.error('请检查你的网络连接');
        });
      },
//      获取房间图片及图标
      getApartmentImages(){
        let _this = this;
        let data;
        let icon;
        let second;
        axios.get(_this.imgUrl, {
          params: {
            roomId: _this.roomId
          }
        }).then((response) => {
          data = response.data;
          this.roomMes.imgGroup = [];
          data.forEach(x => {
            this.roomMes.imgGroup.push(x.pic);
          })
          this.roomMes.facilities.image = data[0].pic;
          second = data[2] ? data[2].pic : data[1].pic;
          this.roomMes.service.image = second;
          icon = data[0].icon.split(',')
          this.roomMes.facilities.icon = icon;
          this.$Message.destroy();
        }).catch((err) => {
          this.$Message.error('请检查你的网络连接');
        });
      },
//      获取推荐房源信息
      getSuggestedApartment(){


    let _this=this;
    let data;
    axios.get(this.suggestUrl, {
      params: {
        apartmentId: _this.apartmentId,
        roomId: _this.roomId
      }
    }).then((response) => {
      data = response.data;
      this.interestList = data;
      let obj={
        apartmentId: _this.apartmentId,
        roomId: _this.roomId
      }
      this.$emit('change',obj);
      window.scrollTo(0,0);
    }).catch((err) => {
      this.$Message.error('请检查你的网络连接');
    });
  }

      },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'init'
    },
      computed: {
//        地铁和公交的取值
        getMetro(){
          if(this.roomList) {
              return this.roomList.transportation.split(',')[0];
            }

        },
        getTransit(){
          if(this.roomList) {
            return this.roomList.transportation.split(',')[1];
          }
        }

      },
      components: {
//        'interest-components': interest,
        'a-map-component':map
      }

  }
</script>
<style type="text/css" scoped>
  .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
    bottom: 16px;
    right: 0;
    width: 20%;
    left: auto;
    color: #fff;
  }
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
