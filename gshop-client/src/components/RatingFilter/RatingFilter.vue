<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block" :class="{active:selectRateType===2}" @click="setRateType(2)">
        全部<span class="count">{{totalRatingsCount}}</span>
      </span>
      <span class="block" :class="{active:selectRateType===0}" @click="setRateType(0)">
        推荐<span class="count">{{goodRatingsCount}}</span>
      </span>
      <span class="block" :class="{active:selectRateType===1}" @click="setRateType(1)">
        吐槽<span class="count">{{totalRatingsCount - goodRatingsCount}}</span>
      </span>
    </div>
    <div class="switch " @click="switchHasText" :class="{on:hasText}">
      <span class="iconfont icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    props:{
      selectRateType:Number,
      hasText:Boolean
    },
    computed:{
      ...mapGetters(['totalRatingsCount','goodRatingsCount'])
    },
    methods: {
    //通过vue的自定义事件来分发事件
      setRateType(selectRateType){
        console.log(selectRateType);
        this.$emit('setRateType',selectRateType)
      },
      switchHasText(){
        this.$emit('switchHasText')
      }
    },
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"

  .ratingselect
    .rating-type
      padding: 18px 0
      margin: 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        background: rgba(77, 85, 93, 0.2)
        &.active
          background: $green
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icon-check_circle
          color: $green
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
</style>
