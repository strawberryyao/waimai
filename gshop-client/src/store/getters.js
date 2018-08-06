export default{
  //总评价数量
  totalRatingsCount(state){
    return state.ratings.length
  },
  //好评的数量
  goodRatingsCount(state){
    return state.ratings.reduce((initRating,rating)=>initRating +(rating.rateType===0 ?1:0),0)
  },
  //购物车商品的总数量
  cartFoodCount(state){
    return state.cartFoods.reduce((initCount,food)=>initCount+food.count,0)
  },
//购物车商品总价
  cartFoodPrice(state){
    return state.cartFoods.reduce((initCount,food)=>initCount+food.count*food.price,0)
  }
}

