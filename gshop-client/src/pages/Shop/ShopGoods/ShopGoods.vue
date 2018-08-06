<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item " :class="{current:index===currentIndex}"
              v-for="(good,index) in goods" :key="index" @click="foodItem(index)">
            <span class="text bottom-border-1px">{{good.name}}
              <img class="icon" :src="good.icon" v-if="good.icon">
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good,index) in goods"
              :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods"
                  :key="index"  @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <!--添加至购物车-->
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>

            </ul>
          </li>

        </ul>
      </div>
      <Food :food="food" ref="food"/>
      <ShopCart/>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll';

  import CartControl from '../../../components/CartControl/CartControl'
  import ShopCart from '../../../components/ShopCart/ShopCart'
  import Food from '../../../components/Food/Food'
  export default {
    data() {
      return {
        scrollY:0,    //右侧列表滚动的Y坐标
        tops:[],     //右侧foods-wrapper 中每个li的top组成的数组
        food:{}
      }
    },
    computed:{
      ...mapState(['goods']),
      //定义左侧当前显示的食品分类的index  通过给scroll事件绑定监听,计算scrollY
      currentIndex(){
        const{scrollY,tops} = this;
        const index = tops.findIndex((top,index)=>scrollY>= top && scrollY< tops[index+1]);
        this._scrollToTarget(index);
        return index
      }
    },
    mounted(){
      this.$store.dispatch('getGoods',()=>{
        //$nextTick 使页面数据更新后再执行
        this.$nextTick(()=>{
          this._initScroll();
          this._initTops();

        })
      })
    },
    methods: {
      //1.统计右侧每个li的top值放到tops中
      _initTops(){
        const tops=[];
        let top = 0 ;
        tops.push(top);
        const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook');
        Array.prototype.slice.call(lis).forEach(li=>{
          top += li.clientHeight;
          tops.push(top)
        })
        // 更新tops状态
        this.tops = tops
        console.log('tops'+tops);
      },
      //2.分别为左侧和右侧创建一个滚动对象
      _initScroll(){
        this.scrollMenu = new BScroll('.menu-wrapper',{
          scrollY: true,
          click: true
        });
        this.scrollFoods = new BScroll('.foods-wrapper',{
          probeType: 3,
          scrollY: true,
          click: true
        });
        //3.给右侧创建的滚动对象绑定监听事件
        this.scrollFoods .on('scroll', ({x,y})=>{
          //console.log(x, y);
          this.scrollY = Math.abs(y)
         // console.log(this.scrollY);
        })
        this.scrollFoods .on('scrollEnd', ({x,y})=>{
          //console.log(x, y);
          this.scrollY = Math.abs(y)
          // console.log(this.scrollY);
        })
      },
      //根据scrollY 和 index 来确定点击的index
      //左侧的每个分类都对应着右侧的top值
      foodItem(index){
        const top = this.tops[index]
        console.log('当前的top'+top);
        this.scrollY = top;
        this.scrollFoods.scrollTo(0,-top,300)
      },
      //使左侧滑动到对应的分类下
      _scrollToTarget(index){
        if(this.scrollMenu){
          const li = this.$refs.foodsUl.children[index]
          this.scrollMenu.scrollToElement(li,300)
        }
      },
      //显示food组件
      showFood(food){
        this.food = food;
        console.log(this.food);
        //父组件调用子组件的方法
        this.$refs.food.toggleShow()
      }
    },

    components: {
      CartControl,
      ShopCart,
      Food
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()

        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px 12px
            background-repeat: no-repeat
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
