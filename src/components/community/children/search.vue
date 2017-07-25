<template>
  <div id="search">
    <div id="header">
      <div class="keyword po-r">
        <div class="drop po-a">
          <Dropdown trigger="click" style="margin-left: 20px" placement="bottom" @on-click="selectKey">
            <a href="javascript:void(0)">
              <Icon type="arrow-down-b" color="#6d5d5d"></Icon>
            </a>
            <Dropdown-menu slot="list">
              <Dropdown-item :selected="isSelected" name="帖子内容">帖子内容</Dropdown-item>
              <Dropdown-item :selected="!isSelected" name="用户">用户</Dropdown-item>
              <Dropdown-item disabled="">帖子主题</Dropdown-item>
            </Dropdown-menu>
          </Dropdown>
        </div>
        <input type="text" :placeholder="searchWord" id="keyInput" v-model="keyWord"
                @keyup="searching" ref="word"
        />
        <div class="search po-a" @click="clearWord">
          <Icon type="ios-close-empty" size="24" ></Icon>
        </div>
      </div>
      <div class="cancel" @click="back">取消</div>
    </div>
    <div class="search-result" v-if="keyWord.length>0">
     <ul v-if="queryString=='content'">
       <li class="search-item" v-for="val in searchList" @click="addHistory(val.msg)">
         <router-link :to="'article?id='+val.id" >{{val.msg}}</router-link>
       </li>
     </ul>
      <ul v-else>
        <li class="search-item" v-for="val in searchList">
          {{val.msg}}
        </li>
      </ul>
    </div>
    <div class="search-result" v-else>
      <div class="history">
        <ul>
          <li class="history-list" v-for="(val,index) in history" :key="index">
            <Icon type="clock" color="#a79898"></Icon>
            <a href="">{{val}}</a>
            <Icon type="close" color="#a79898" @click.native="clearThis(index)" class="clearBtn"></Icon>
          </li>
        </ul>
        <span class="clear" @click="clearAll" v-show="history.length>0">清空搜索记录</span>
      </div>
    </div>
  </div>
</template>
<script>
  import latest from './latest.vue'
  import axios from 'axios'
  export default{
    mounted(){

    },
    data(){
      return {
        url: this.webConfig.getPath('index.php/article/search'),
        keyWord: '',
        isSelected: true,
        searchWord: '帖子内容',
        searchList: []
      }
    },
    methods: {

      selectKey(e){
        this.isSelected = !this.isSelected;
        this.searchWord = e;
      },
      clearWord(){
          this.keyWord='';
      },
      searching(){
        let query = this.queryString;
        if (this.keyWord.trim() == '')return;
        axios.get(this.url + '?' + query + '=' + this.keyWord)
          .then(res => {
            this.searchList = res.data;
          }).catch(err => {
          console.log(err);
        });
      },
      addHistory(val){
        this.$store.commit('pushHistory',val);
      },
      back(){
        this.$router.go(-1);
      },
      clearThis(index){
       this.history.splice(index, 1);
      },
      clearAll(){
        this.history = [];
      }
    },
    computed: {

      history(){
        return  this.$store.state.searchHistory;
      },
      params(){
        return this.isSelect;
      },
      queryString(){
        return this.searchWord == '用户' ? 'username' : 'content';
      }
    }
  }
</script>
<style scoped>
  #search {
    height:100vh;
    width: 100vw;
    position: fixed;
    z-index: 544;
    left: 0;
    top: 0;

    background: #fff;
  }

  .search-result {
    background: #fff;
    margin-top: 15vw;
    height: 100vh;
    overflow: auto;
    padding-bottom: 10vh;
  }

  .history {
    border-top: 5px solid gainsboro;
    border-bottom: 5px solid gainsboro;

  }

  .history-list {
    display: flex;
    border-bottom: 1px solid gainsboro;
    padding: 1vw 0;
    justify-content: space-around;
    align-items: center;
  }

  .history-list a {
    font-size: 1.2rem;
    color: #495060;
  }

  .clear {
    float: right;
    padding: 3vw;
    color: #2db7f5;
  }

  .clearBtn {
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 25px;
  }
  .search-item:first-child{
    border-top: 1px solid gainsboro;
  }
  .search-item {
    text-indent: 2rem;
    list-style: none;
   border-bottom: 1px solid gainsboro;

  }
  .search-item a{
    padding: 2vw;
    display: block;
    width:100%;
    height:100%;
    color:#495060 ;
  }
</style>
