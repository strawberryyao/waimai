import {RECEIVE_ADDRESS,
        RECEIVE_CATEGORY,
        RECEIVE_SHOPS,
        RECEIVE_USER,
        RESET_USER,
        RECEIVE_GOODS,
        RECEIVE_RATINGS,
        RECEIVE_INFO,
        INCREMENT_FOOD_COUNT,
        DECREMENT_FOOD_COUNT
        } from "./mutations-type";
import {reqAddress,
        reqCategorys,
        reqShops,
        reqUser,
        reqLogout,
        reqGoods,
        reqInfo,
        reqRatings
      } from "../api";

export default {
  //异步获取当前地址
  async getAddress({commit,state}){
    const {longitude,latitude} = state;
    const geohash = `${latitude},${longitude}`;
    const result = await reqAddress(geohash);
    if(result.code===0){
      const address = result.data;
      commit(RECEIVE_ADDRESS,{address});
    }
  },
  //异步获取商品分类信息
  async getCategorys({commit}){
    const result = await reqCategorys();
    if(result.code===0){
      const categorys = result.data;
      commit(RECEIVE_CATEGORY,{categorys})
    }
  },
//异步获取店家信息
  async getShops({commit,state}){
    const {latitude,longitude} = state;
    const result = await reqShops(latitude,longitude);
    if(result.code===0){
      const shops = result.data;
      commit(RECEIVE_SHOPS,{shops})
    }
  },
  saveUser({commit},user){
   commit(RECEIVE_USER,{user})
  },

  async getUser({commit}){
    const result = await reqUser();
    if(result.code===0){
      console.log(result);
      const user = result.data;
      commit(RECEIVE_USER,{user})
    }
  },
  async logout({commit}){
    const result = await reqLogout();
    if(result.code===0){
      commit(RESET_USER)
    }
  },
  async getGoods({commit,state},cb){
    const result = await reqGoods();
    if(result.code===0){
      const goods = result.data;
      commit(RECEIVE_GOODS,{goods})
      cb && cb()
    }
  },
  async getRatings({commit,state},cb){
    const result = await reqRatings();
    if(result.code===0){
      const ratings = result.data;
      commit(RECEIVE_RATINGS,{ratings})
      cb && cb()
    }
  },
  async getInfo({commit,state}){
    const result = await reqInfo();
    if(result.code===0){
      const info = result.data;
      commit(RECEIVE_INFO,{info})
    }
  },
  //同步更新购物车商品数量
  updateFoodCount({commit,state},{food,isAdd}){
    if(isAdd){
      commit(INCREMENT_FOOD_COUNT,{food})
    }else{
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  }

}
