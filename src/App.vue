<template>

  <!-- <router-link to="/">Home</router-link> -->
  <Preloader v-if="displayPreloader"/>
  <div v-else>
    <Header />  
    <router-view ></router-view>
  </div>
</template>

<script>

// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue';
import Preloader from './components/Preloader.vue';

export default {
  name: 'App',
  // data() {
  //   return {
  //     // displayPreloader: this.$store.state.preloader
  //   }
  // },
  components: {
    Header,
    Preloader
  },
  mounted() {   
    setTimeout(() => {
      this.$store.state.preloader = false;
      }, 3000) 
  },
  beforeCreate(){
    if(!this.$store.state.user) {
      this.$router.push("signin");  // signin из name router. Если state.user пустой перекинь, router, когда отрисуешься (Можно created) в signin 
    } // прелоадер лучше делать в роутере ?
  },
  computed: {               // если я хочу обратиться к стэйту, использовать всегда computed, потому что он подцепить автоматически изменеия, watcher позволяет в момент изменения сделвть еще одну функцию 
    displayPreloader() {
      return this.$store.state.preloader
    }
  }
}
</script>

<style scoped>

</style>

