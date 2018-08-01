import Vue from 'vue';
import VueRouter from 'vue-router';

import Msite from '../pages/Msite/Msite';
import Search from '../pages/Search/Search';
import Order from '../pages/Order/Order';
import Profile from '../pages/Profile/Profile';
import Login from '../pages/Login/Login';

Vue.use(VueRouter);

export default new VueRouter({
  routes:[
    {
      path:'/Msite',
      component:Msite,
      meta: {
        showFoot: true
      }
    },
    {
      path:'/Search',
      component:Search,
      meta: {
        showFoot: true
      }
    },
    {
      path:'/Order',
      component:Order,
      meta: {
        showFoot: true
      }
    },
    {
      path:'/Profile',
      component:Profile,
      meta: {
        showFoot: true
      }
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/',
      redirect:'/msite'
    }

  ]
})
