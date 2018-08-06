import Vue from 'vue';
import VueRouter from 'vue-router';

//关于首屏加载的优化
//使用import 引入的组件模块会对组件进行拆分然后单独打包，返回的组件的函数只有在切换到组件时才会引入
const Msite = ()=>import('../pages/Msite/Msite')
const Search = () => import('../pages/Search/Search')
const Order = ()=> import('../pages/Order/Order')
const Profile = ()=> import('../pages/Profile/Profile')

/*import Msite from '../pages/Msite/Msite';
import Search from '../pages/Search/Search';
import Order from '../pages/Order/Order';
import Profile from '../pages/Profile/Profile';*/
import Login from '../pages/Login/Login';
import Shop from '../pages/Shop/Shop';
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods';
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo';
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings';

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
      path:'/shop',
      component:Shop,
      children:[
        {
          path:'/shop/goods',
          component:ShopGoods
        },
        {
          path:'/shop/info',
          component:ShopInfo
        },
        {
          path:'/shop/ratings',
          component:ShopRatings
        },
        {
          path:'',
          redirect:'/shop/goods'
        }
      ]
    },
    {
      path:'/',
      redirect:'/msite'
    }

  ]
})
