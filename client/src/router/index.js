import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Courses from '@/components/Courses'
import NewCourse from '@/components/NewCourse'

Vue.use(Router)

export default new Router({
  mode: 'history', // makes it use full url
  routes: [
    {
      path: '/',
      name: 'Courses',
      component: Courses
    },
    {
      path: '/courses/new',
      name: 'AddCourse',
      component: NewCourse
    }
  ]
})
