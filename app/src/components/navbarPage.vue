<template>
  <div class="container-main">
    <nav class="navbar navbar-expand-lg navbar-default">
      
      <div class="container-fluid">
        <a href="#" class="navbar-brand">
          Pixel
        </a>
        <button
          type="button"
          class="navbar-toggler "
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span class="navbar-toggler-icon"><i class="fas fa-chevron-down"></i></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse" >
          <div class="navbar-nav ms-auto " >
            <p class="nav-item " style="margin-top: 0.5rem ; margin-right : 1rem ; " v-if="this.$store.state.showNavitems.greet">Hello, {{(this.$store.state.username).split(" ")[0]}} </p>

            <router-link to="/" class="nav-item nav-link " v-show="this.$store.state.showNavitems.signup">signup</router-link>

            <router-link to="/login" class="nav-item nav-link"  v-show="this.$store.state.showNavitems.login">login</router-link>

            <router-link to="/home" class="nav-item nav-link"  v-show="this.$store.state.showNavitems.filter">home</router-link>
            
           <a href="#"  @click.prevent="logout" class="nav-item nav-link" v-show="this.$store.state.showNavitems.logout">logout</a>
          </div>   
        </div>
      </div>
    </nav>
    
  </div>
</template>

<script>
export default {
  name: "navbarPage",
  data(){
    return {
      showLogout : "logout", 
    }  
  }, 

  methods : {
    resetNavItems(){

      let items = this.$store.state.showNavitems;
      items.greet = false;
      items.login = true;
      items.signup = true;
      items.logout = false;
      items.home = false;
    },

    logout(){
      this.$store.commit("setAuthentication", false);
      this.$store.state.connectionArr = [];
      this.$router.push("/login");
      this.resetNavItems();
    }, 
  }

};
</script>

<style scoped>
    .navbar{
        font-weight: bold;
        position: fixed;
        z-index: 100;
        width: 100vw;
    }

    .navbar-default{
      background-color: #5C3ACC;
      color: white;
      border-bottom: 1px solid #8e77da;
    }

    a{
      color: white;
    }
</style>