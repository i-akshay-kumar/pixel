<template>
  <div class="homepage-container">
    <div class="container">
      <div action="" class="search-bar">
        <button type="submit">
          <img
            src="../assets/search-button.png"
            alt="search"
            @click="search"
          />
        </button>
        <input
          type="text"
          placeholder="Search Image"
          v-model="searchTerm"
          @keyup.enter="search"
        />
      </div>
    </div>

    <div class="image-gallery" v-if="!disableDefaultGallery">
      <div v-for="item in randomImageArr" :key="item.id" >
        <div class="image-wrapper">
          <img :src="`${item.urls.full}`" alt=""  />
          <div class="overlay">
            <div class="text"><img src="../assets/heart.png" alt="">{{item.likes}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="image-gallery">
      <div v-for="item in targetImageArr" :key="item.id">
        <div class="image-wrapper">
          <img :src="`${item.urls.full}`" alt="" />
          <div class="overlay">
            <div class="text"><img src="../assets/heart.png" alt="">{{item.likes}}</div>
          </div>
        </div>
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
      "https://api.unsplash.com/photos?page=5&per_page=30&client_id=h4WpGWxUMzW-9D5QaGl2FshKe8us_qBLRMwOy6Nj_cc"
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
.container {
  width: 90%;
  padding: 5rem 0 2rem;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.search-bar {
  width: 100%;
  max-width: 700px;
  /* background: rgba(255, 255, 255, 0.2); */
  background-color: #fdf7f7 ;
  display: flex;
  align-items: center;
  border-radius: 60px;
  backdrop-filter: blur(4px) saturate(180%);
  border: 1px solid #ebebeb;
}

.search-bar input {
  background: transparent;
  flex: 1;
  border: 0;
  outline: none;
  padding: 20px 15px;
  font-size: 20px;
  color: black;
}

::placeholder {
  color: black;
}

.search-bar button img {
  width: 1.4rem;
}

.search-bar button {
  border: 0;
  border-radius: 50%;
  width: 4.1rem;
  height: 4.1rem;
  background-color: #fdf7f7 ;
  cursor: pointer;
}

.input-group {
  width: 30%;
  margin: 0 auto;
  text-align: center;
  flex-direction: row;
}

@media only screen and (max-width: 600px) {
  .container {
    padding: 5rem 0 2rem;
  }
  .search-bar input {
    font-size: 16px;
  }

  .search-bar button {
    width: 3.2rem;
    height: 3.2rem;
  }
}

.image-gallery {
  columns: 4;
  column-gap: 5px;
  width: 80%;
  margin: 0 auto;
}

/* .image-gallery img {
  width: 100%;
  margin: 0;
  padding: 5px;
  border-radius: 10%;
} */

.image-wrapper {
  position: relative;
}

.image-wrapper img {
  width: 100%;
  margin: 0;
  padding: 5px;
  border-radius: 10%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 5px;
  border-radius: 10%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 5;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}
.text {
  position: absolute;
  bottom: 0.2rem;
  left: 0.3rem;
  padding: 10px;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
}

.overlay img{
  margin-left: 5px;
  width: 10%;
}

.image-wrapper:hover .overlay {
  opacity: 1;
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


</style>