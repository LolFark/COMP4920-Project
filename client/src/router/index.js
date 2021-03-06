import Vue from 'vue'
import Router from 'vue-router'
import Courses from '@/components/Courses'
import NewCourse from '@/components/NewCourse'
import CoursePage from '@/components/CoursePage'
import Register from '@/components/Register'
import Login from '@/components/Login'
import UserPage from '@/components/UserPage'

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
      name: 'NewCourse',
      component: NewCourse
    },
    {
      path: '/courses/:id',
      component: CoursePage
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/:username',
      component: UserPage
    }
  ]
})
