<template>
  <div class="homepage-container">
    <!-- <div class="search-box"> -->
    <!-- <input
        type="text"
        v-model="searchTerm"
        @keyup.enter="search"
        class="search-input"
        placeholder="Search Image"
      /> -->
    <!-- <button @click="search" class="search-button">Search</button> -->
    <!-- <button @click="search" class="search-button">
        <svg class="search-icon" viewBox="0 0 24 24">
          <path
            d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
      </button> -->
    <!-- </div> -->

    <!-- <center> -->
      <div class="input-group" style="padding-top: 7rem;">
        <div class="form-outline">
          <input
            type="search"
            id="form1"
            class="form-control"
            v-model="searchTerm"
            @keyup.enter="search"
            placeholder="Search Image"
          />
        </div>
        <button type="button" class="btn btn-primary" @click="search">
          <svg class="search-icon" viewBox="0 0 24 24">
            <path
              d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
        </button>
      </div>
    <!-- </center> -->

    <div class="image-gallery" v-if="!disableDefaultGallery">
      <div v-for="item in randomImageArr" :key="item.id">
        <img :src="`${item.urls.thumb}`" alt="" />
      </div>
    </div>

    <div class="image-gallery">
      <div v-for="item in targetImageArr" :key="item.id">
        <img :src="`${item.urls.thumb}`" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "homePage",

  data() {
    return {
      searchTerm: "",
      randomImageArr: [],
      targetImageArr: [],
      disableDefaultGallery: false,
    };
  },

  mounted() {
    Axios.get(
      "https://api.unsplash.com/photos?client_id=h4WpGWxUMzW-9D5QaGl2FshKe8us_qBLRMwOy6Nj_cc"
    ).then(
      (res) => {
        console.log("image response", res);
        console.log(res.data);
        this.randomImageArr = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  },

  methods: {
    search() {
      console.log(`{this.searchTerm}`);
      Axios.get(
        `https://api.unsplash.com/search/photos?page=5&per_page=30&query=${this.searchTerm}&client_id=h4WpGWxUMzW-9D5QaGl2FshKe8us_qBLRMwOy6Nj_cc`
      ).then(
        (res) => {
          console.log("image response", res);
          console.log(res.data);
          console.log("length is : ", this.targetImageArr.length);
          this.targetImageArr = res.data.results;
          if (this.targetImageArr.length > 0) {
            this.disableDefaultGallery = true;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>

<style scoped>
/* .homepage-container {
  display: flex;
  flex-direction: column;
} */
/* .search-box {
  padding-top: 5rem;
  margin: auto;
}
.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
} */

/* .search-input {
  padding: 0.7rem;
  font-size: 1.2rem;
  border-radius: 0.5rem 0 0 0.5rem;
  border: 0.1px solid #cfc7c7;
  outline: none;
  flex-grow: 1;
  margin-right: 1rem;
} */
.input-group{
  width: 30%;
  /* height: 50px; */
  /* background: lightgray; */
  margin: 0 auto;
  text-align: center;
  flex-direction: row;
}
.search-button {
  padding: 0.7rem 2rem;
  /* font-size: 1.2rem; */
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

button {
  background-color: #5c3acc;
}

button:hover {
  background-color: #6f4fd5;
}
.image-gallery {
  columns: 4;
  column-gap: 5px;
  width: 80%;
  margin: 5rem auto;
}

.image-gallery img {
  width: 100%;
  margin: 0;
  padding: 5px;
}

@media screen and (min-width: 50px) and (max-width: 1000px) {
  .image-gallery {
    columns: 3;
  }
}

@media screen and (min-width: 500px) and (max-width: 650px) {
  .image-gallery {
    columns: 2;
  }
}

@media screen and (max-width: 500px) {
  .image-gallery {
    columns: 1;
  }
}

@media screen and (min-width: 966px) and (max-width: 1283px) {
    .input-group{
      width: 40%;
    }
}

@media screen and (min-width: 760px) and (max-width: 966px) {
    .input-group{
      width: 51%;
    }
}
@media screen and (min-width: 660px) and (max-width: 760px) {
    .input-group{
      width: 60%;
    }
}

@media screen and (max-width: 660px) {
  .input-group{
      width: 70%;
    }
}

@media screen and (max-width: 550) {
  .input-group{
      width: 80%;
    }
}
</style>