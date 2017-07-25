<template>
  <div class="map-view">
      <div class="amap-page-container">
        <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center" :zoom="zoom">
        </el-amap>
      </div>
  </div>
</template>
<script>
  import AMap from 'vue-amap';
  export default{
    name: 'aMap',
    data(){
      let self = this;
      return {
        center: [104, 30],
        lng: 0,
        lat: 0,
        loaded: false,
        zoom: 14,
        plugin: [{
          pName: 'Geolocation',
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.loaded = true;
                  self.$nextTick();
                }
              });
            }
          }
        }]
      };
    }

  }
</script>
<style>
  .amap-demo {
    height: 55vw;
  }
  .map-view {
    height: 55vw;
  }
</style>
