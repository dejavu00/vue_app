<template>
  <div id="resource" class="po-r" :class="{'night':isNight}" @click="notInput">
    <div id="find_house">
      <span class="more text-center">更多搜索</span>
      <input type="text" title="house_resource" placeholder="输入小区、区域等" id="key" v-model="keyword"
             @keydown.enter="search" @focus="isInputting" @click.stop.prevent="isInputting"/>
      <i class="icon iconfont icon-icon19" id="search" @click="search"></i>
    </div>


   <router-link class="resource_item " v-for="(val,index) in sourceList" :key="index" tag="div"
                :to="{name:'detail_room',params:{id:val.position,aId:val.apartmentId,rId:val.roomId}}">
     <div class="house_img_price po-r">
       <img :src="initImg+val.pic" alt="房源图">
       <div class="total_price po-a">
         <span>￥{{val.price}}</span>
         <small>/月</small>
       </div>
       <div class="collection po-a" @click.prevent="red(index)" :ref="'obj'+index">
         <Icon type="ios-star-outline"  class="out"></Icon>
         <Icon type="android-star"   class="isRed" ></Icon>

       </div>
     </div>
     <div class="house_mes">
       <div class="house_name_state">
           <span class="house_name">
             {{val.style}}
           </span>
         <span class="house_state">
             {{val.status == 1 ? '未租' : '已租'}}
          </span>
       </div>
       <div class="location_area_facing">
         <span class="location">{{val.location}}</span>
         <span class="area">{{val.area}}</span>
         <span class="facing">{{val.facing}}</span>
       </div>
     </div>

   </router-link>
 </div>

</template>
<script>
  import $ from'jquery'
  import axios from 'axios'
  import Vue from 'vue'
  export default{
    mounted(){
      $('html,body').css({scrollTop: 0});
      this.getAll();
      this.roll();
    },
    data(){
      return {
          initImg:this.webConfig.getPath('assets/img/'),
        url: this.webConfig.getPath('index.php/my-app/get-all-apartment'),
        searchUrl:this.webConfig.getPath('index.php/my-app/search-apartment'),
        page: 1,
        first: 1,
        keyword: '',
        sourceList: [],
        pullState: false,
        isSearch: false,

      }
    },

    methods: {
      notInput(){
        this.$store.commit('changeInput',true);
      },
      red(index){
          let obj=$(this.$refs['obj' + index][0]).find('.out');
          if(obj.is(":hidden")){
            obj.show();
          }else{
            obj.hide();
          }
      },
      roll(){
        let _this = this;
        let $resource=$('#resource');
        $resource.scroll(function () {
          if ($resource.scrollTop() + $resource.height() >= $(document).height()+100) {
            if (_this.pullState) {
              return;
            }
            _this.page = _this.page + 1;
            _this.getAll();
          }
        })

      },
      getAll(){

        this.pullState = true;
        let data;
        this.$Message.loading({
          content: '正在加载中...',
          duration: 4
        });
        axios.get(this.url, {
          params: {
            page: this.page,
            keyword: this.keyword
          }
        }).then((res) => {
          localStorage.setItem("room_list", res.data);
          data = res.data;
          //当页面第一次加载出来和搜索后，都需要直接将数据覆盖原来数据，不能再用push递增了
          if (this.first == 1) {
            this.sourceList = data;
            this.first = 0;
            this.pullState = false;
            this.$Message.destroy();
          } else {
            if (data.length > 0) {
              this.pullState = false;
              data.forEach(val => {
                this.sourceList.push(val)
              })
              this.$Message.destroy();
            } else {
              this.url =this.webConfig.getPath('index.php/my-app/get-all-apartment');
              this.$Message.destroy();
            }
          }
        }).catch((err) => {
            console.log(err);
          });
      },
      search(){
        this.pullState = false;
        this.page = 1;
        this.first = 1;
        this.url = this.searchUrl;
        this.getAll();
      },
      isInputting(){
        this.$store.commit('changeInput',false);
      },
      notInputting(){
        this.$store.commit('changeInput',true);
      },
      throttle (delay, action){
        let last = 0
        return function () {
          let curr = new Date()
          if (curr - last > delay) {
            action.apply(this, arguments)
            last = curr
          }
        }
      }
    },

    computed: {
        redGroup(){
          return this.sourceList.map(x=>{
              return true;
          })
        },
      isNight(){
        return this.$store.state.night;
      }
    }
  }
</script>
