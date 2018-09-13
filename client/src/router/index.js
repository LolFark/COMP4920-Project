import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Courses from '@/components/Courses'

Vue.use(Router)

export default new Router({
  mode: 'history', // makes it use full url
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/courses',
      name: 'Courses',
      component: Courses
    }
  ]
})
