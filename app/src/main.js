import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'
import {store} from './components/store/store.js'

import registerPage from './components/registerPage'
import loginPage from './components/loginPage'
import homePage from './components/homePage'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueRouter)

const routes = [
  {
    path : '/', 
    component : registerPage
  }, 

  {
    path : '/login', 
    component :  loginPage
  }, 

  {
    path : '/home',  
    component : homePage, 
    beforeEnter : (to, from, next) =>{
      if(store.state.authenticated == false){ 
        next("/login");
      }else{
        next();
      }
    }
  }, 
]

const router = new VueRouter({
  routes, 
  mode : 'history'
})

new Vue({
  store : store,
  router : router,
  render: h => h(App),
}).$mount('#app')
