// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  vueCookie from  'vue-cookie'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import Vuex from 'vuex'
import init from './vue_init'
init(Vue);
Vue.use(Vuex);
Vue.use(iView);

Vue.config.productionTip = false;


import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)


import AMap from 'vue-amap';
Vue.use(AMap);
AMap.initAMapApiLoader({
  key: 'your amap key',
  plugin: ['Geolocation','Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor']
});

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish();
});

const store=new Vuex.Store({
  state:{
    night:false,
    haveMes:true,
   inputting:true,
    searchHistory:[],
    isPost:false
  },
  mutations:{
    toNight(state,status){
      state.night=status;
    },
    haveMes(state,status){
       state.haveMes=status;
    },
    changeInput(state,status){

      state.inputting=status;
    },
    pushHistory(state,val){
      state.searchHistory.push(val);
    },
    beAblePost(state,status){
      state.isPost=status
    }

  },
  getters: {
    getIntputStatus: state => {
      return state.inputting;
    }
  }
});
new Vue({
  mounted(){
    this.$Message.config({
      top: 70,
      duration: 1
    });
  },
  el: '#app',
  vueCookie,
  router,
  store,
  template: '<App/>',
  components: { App },

})
