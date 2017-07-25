<template>
  <div id="detail">
    <div id="detail_header">
      <header ref="head">
        <router-link    v-for="(val,index) in state"  :key="index"
                        :to="'/rent/getAllApartment/getApartmentDetail/'+val.position+'/'+val.apartmentId+'/'+val.id"

          class="tab  text-center" ref="tab">
          <div class="room_num">
            <p>
              房间{{index+1}}
            </p>
            <p class="nickname">Room{{index+1}}</p>
          </div>
          <span class="room_state text-center" :class="val.status==1?'leave':''">
          {{val.status==0?'住':'空'}}
       </span>
    </router-link>
      </header>
    </div>
      <keep-alive >
        <router-view @change="init">
        </router-view>
      </keep-alive>
    <div class="reserve_booked">
      <a href="javascript:void(0)" class="reserve_btn">
        预约看房
      </a>
      <a href="javascript:void(0)" class="booked_btn">
        抢订房源
      </a>
    </div>
  </div>
</template>
<script>
  import axios from  'axios'
  import room from './detail_room.vue'
  export default{
      name:'detail',
     data(){
       return{
         apartmentId:'',
         url:this.webConfig.getPath('index.php/my-app/get-room-state'),
         state:[],
         Active:[],
         current:0
       }
     },
    methods:{
      init(e){
        this.apartmentId=e.apartmentId;
          this.getRoomState();
      },
      getRoomState(){
        //获取房间空余信息
        let _this=this;
        axios.get(this.url,{
          params:{
            apartmentId:_this.apartmentId
          }
        }).then((response)=>{
          this.state= response.data;
          this.state.forEach( (val,i)=> {
            if(i==this.current){
              val['isActive']=true;
            }else{
              val['isActive']=false;
            }
          })
        }).catch((err)=>{
         this.$Message.error('请检查你的网络连接');
        });
      },
      isActive(){
        let length=this.state.length;
        let array=[true];
        for(let i=1;i<length;i++){
          array.push(false);
        }
        this.Active=array;
      },

    },
    components:{
         'detail-room-component':room
    }
  }
</script>
<style type="text/css" scoped>
  .router-link-active{
    color: #FF2D55;
  }
  .reserve_booked{
    display: flex;
    position: fixed;
    bottom:11vh;
    width:88vw;
    justify-content: space-between;
    left:0;
    right:0;
    z-index: 33;
    margin:0 auto;
  }
  .reserve_btn,.booked_btn{
    color: #fff;

    text-align: center;
    width:49.67%;
    padding: 0.5rem;
    font-size: 1.4rem;
    background: #FF2D55;
  }
</style>
