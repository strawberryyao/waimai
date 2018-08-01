import {RECEIVE_ADDRESS,RECEIVE_CATEGORY,RECEIVE_SHOPS} from "./mutations-type";
import {reqAddress,reqCategorys,reqShops} from "../api";

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

  async getShops({commit,state}){
    const {latitude,longitude} = state;
    const result = await reqShops(latitude,longitude);
    if(result.code===0){
      const shops = result.data;
      commit(RECEIVE_SHOPS,{shops})
    }
  }
}
