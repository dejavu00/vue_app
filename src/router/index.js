import Vue from 'vue'
import Router from 'vue-router'
// import Rent from '@/components/rent/rent'
import Reserve from '@/components/rent/children/reserve'
 // import Detail from '@/components/rent/children/children/detail'
 // import Detail_Room from '@/components/rent/children/children/detail_room.vue'
import Boutique from '@/components/rent/children/boutique'
import Landlord from '@/components/rent/children/landlord'


// import Message from '@/components/chat/message'
//  import chatting from '@/components/chat/children/chatting'
//  import Charter from '@/components/charter/charter'
  import Setting from '@/components/charter/children/setting'
  import Modify from '@/components/charter/children/modify'
//  import Income from '@/components/charter/income'
//  import Exchange from '@/components/charter/exchange'
//  import Login from '@/components/charter/login'
//  import Register from '@/components/charter/register'
import Fault from '@/components/fault'
//  import Community from '@/components/community/community'
// import  Post from '@/components/community/children/post'
Vue.use(Router)

const Rent=resolve=>{
  require.ensure(['@/components/rent/rent'],()=>{
    resolve(require('@/components/rent/rent'))
  })
}
const Detail=resolve=>{
  require.ensure(['@/components/rent/children/children/detail'],()=>{
    resolve(require('@/components/rent/children/children/detail'))
  })
}
const Detail_Room=resolve=>{
  require.ensure(['@/components/rent/children/children/detail_room'],()=>{
    resolve(require('@/components/rent/children/children/detail_room'))
  })
}
const Message=resolve=>{
  require.ensure(['@/components/chat/message'],()=>{
    resolve(require('@/components/chat/message'))
  })
}
const chatting=resolve=>{
  require.ensure(['@/components/chat/children/chatting'],()=>{
    resolve(require('@/components/chat/children/chatting'))
  })
}
const Charter=resolve=>{
  require.ensure(['@/components/charter/charter'],()=>{
    resolve(require('@/components/charter/charter'))
  })
}
const Login=resolve=>{
  require.ensure(['@/components/charter/login'],()=>{
    resolve(require('@/components/charter/login'))
  })
}
const Register=resolve=>{
  require.ensure(['@/components/charter/register'],()=>{
    resolve(require('@/components/charter/register'))
  })
}
const Exchange=resolve=>{
  require.ensure(['@/components/charter/exchange'],()=>{
    resolve(require('@/components/charter/exchange'))
  })
}
const Income=resolve=>{
  require.ensure(['@/components/charter/income'],()=>{
    resolve(require('@/components/charter/income'))
  })
}
const Community=resolve=>{
  require.ensure(['@/components/community/community'],()=>{
    resolve(require('@/components/community/community'))
  })
}
const Post=resolve=>{
  require.ensure(['@/components/community/children/post'],()=>{
    resolve(require('@/components/community/children/post'))
  })
}
const Article=resolve=>{
  require.ensure(['@/components/community/children/article'],()=>{
    resolve(require('@/components/community/children/article'))
  })
}

const Search=resolve=>{
  require.ensure(['@/components/community/children/search'],()=>{
    resolve(require('@/components/community/children/search'))
  })
}



export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'rent/getAllApartment'
    },
    {
      path: '/rent',
      name:'rent',
      component: Rent,

      children:[
        {
          path: '/',
          redirect: 'getAllApartment'
        },
        {
          name:'getAll',
          path: 'getAllApartment',
          component: Reserve,

        },
        {
          path: 'boutique',
          component: Boutique
        },
        {
          path:'landlord',
          component:Landlord
        }
      ]
    },
    {
      name:'detail',
      path:"/rent/getAllApartment/getApartmentDetail",
      component: Detail,
      children:[
        {
          name:'detail_room',
          path:'/rent/getAllApartment/getApartmentDetail/:id/:aId/:rId',
          component: Detail_Room,
        }
      ]
    },
    {
      path: '/chat',
      name: 'chat',
      component: Message,
      children:[
        {
          path: 'chatting/:id',
          name: 'Chatting',
          component: chatting
        }
      ]
    },
    {
      path: '/charter',
      name: 'charter',
      component: Charter,

    },
    {
      path:'/charter/setting',
      name:'setting',
      component: Setting,

      children:[
        {
          path:'modify',
          name:'modify',
          component:Modify
        }
      ]
    },
    {
      path:'/charter/login',
      name:'login',
      component:Login
    },
    {
      path:'/charter/register',
      name:'register',
      component:Register
    },
    {
    name:'income',
    path:'/charter/income',
    component: Income,
  },
    {
      name:'exchange',
      path:'/charter/income/exchange',
      component: Exchange,
    },
    {
      name:'fault',
      path:'/fault',
      component: Fault,
    },
    {
      name:'community',
      path:'/community',
      component: Community,
      children:[
        {
          path:'search',
          name:'search',
          component: Search
        },
        {
          path:'post',
          name:'post',
          component: Post
        }
      ]
    },
    {
      path:'/community/article',
      name:'article',
      component:Article
    }

  ]
})
