<template>
  <div class="homepage-container">
    <div class="search-box">
      <input
        type="text"
        v-model="searchTerm"
        @keyup.enter="search"
        class="search-input"
      />
      <!-- <button @click="search" class="search-button">Search</button> -->
      <button @click="search" class="search-button">
        <svg class="search-icon" viewBox="0 0 24 24">
          <path
            d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
      </button>
    </div>

    <div class="image-gallery" v-if="!disableDefaultGallery">
      <div v-for="item in randomImageArr" :key="item">
        <img :src="`${item.urls.thumb}`" alt="">
      </div>
    </div>

    <div class="image-gallery">
      <div v-for="item in targetImageArr" :key="item">
        <img :src="`${item.urls.thumb}`" alt="">
      </div>
    </div>

  </div>
</template>

<script>
import Axios from 'axios';
export default {
  name: "homePage",

  data() {
    return {
      searchTerm: "",
      randomImageArr : [],
      targetImageArr : [],
      disableDefaultGallery : false
    };
  },

  mounted() {
    Axios.get("https://api.unsplash.com/photos?client_id=h4WpGWxUMzW-9D5QaGl2FshKe8us_qBLRMwOy6Nj_cc").then((res)=>{
      console.log("image response",res);
      console.log(res.data);
      this.randomImageArr = res.data;

    }, (err)=>{
      console.log(err);
    })
  },

  methods: {
    search() {
      console.log(`{this.searchTerm}`);
      Axios.get(`https://api.unsplash.com/search/photos?query=${this.searchTerm}&client_id=h4WpGWxUMzW-9D5QaGl2FshKe8us_qBLRMwOy6Nj_cc`).then((res)=>{
      console.log("image response",res);
      console.log(res.data);
      if(this.targetImageArr.length > 0){
        this.disableDefaultGallery = true;
      }
      this.targetImageArr = res.data.results;

    }, (err)=>{
      console.log(err);
    })
    },
  },
};
</script>

<style scoped>
.homepage-container {
  display: flex;
  flex-direction: column;
}
.search-box {
  padding-top: 5rem;
  margin: auto;
}
.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
}

.search-input {
  padding: 0.7rem;
  font-size: 1.6rem;
  border-radius: 0.5rem 0 0 0.5rem;
  border: 0.1px solid #cfc7c7;
  outline: none;
  flex-grow: 1;
  margin-right: 1rem;
}

.search-button {
  padding: 0.7rem 2rem;
  font-size: 1.6rem;
  background-color: #5c3acc;
  color: white;
  border-radius: 0 0.5rem 0.5rem 0;
  border: none;
  outline: none;
  cursor: pointer;
  
}

.search-button:hover {
  background-color: #5c3acc;
}

.search-icon {
  width: 1.6rem;
  height: 1.6rem;
  fill: white;
}

.image-gallery{
  columns: 4;
  column-gap: 5px;
  width: 80%;
  margin: 5rem auto;
}

.image-gallery img{
  width: 100%;
  margin: 0;
  padding: 5px;
}
</style>