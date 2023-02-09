import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        isUserAvailable : "", 
        username : "", 
        userID : "",
        authenticated : false, 
        showNavitems : {
            greet : false , 
            signup : true ,
            login : true , 
            filter : false  
        }
    }, 

    mutations:{   
        setAuthentication(state, status){
            state.authenticated = status;
        }
    }, 

    actions:{   

    }
})

