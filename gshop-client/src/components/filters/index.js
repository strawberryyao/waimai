import Vue from 'vue';
import moment from 'moment'

//格式化日期的过滤器

Vue.filter('format-data',(value,format='YYYY-MM-DD HH:mm:ss')=>{
  return moment(value).format(format)
})
