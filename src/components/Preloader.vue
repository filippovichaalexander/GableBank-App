<template>
  <div class="container">
    <div class="preloader__wrapper">
      <h1 class="preloader__title">Gable Bank</h1>
      <div class="preloader__content">
        <!-- <MonoBank /> -->
        <!-- <SvgComponent :svg="svg"/> -->
        <img src="../assets/mono_bank2.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
// import MonoBank from '../assets/mono.svg'
// import SvgComponent from './SvgComponent.svg';

// import svg from "../assets/monoBank.svg";
export default {
  // name: "Preloader",
  date() {
    return {
      // svg: svg
    }
  },
  components: {
    // MonoBank
    // SvgComponent
  }
}
</script>

<style scoped>
  .container {
    padding: 30px;
    position: relative;
    width: 100wv;
    height: 100vh;
    background-color: grey;
  }
  .preloader__wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 20%;
    height: 15%;
    transform: scale(0.6) translateX(-50%);
    /* transform: translate(-50%, -50%); */
  }
  .preloader__content {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  /* .preloader__content {
    border: 1px solid #fff;
    border-radius: 20px;
  } */
  .preloader__title {
    /* margin-bottom: -60px; */
    /* text-align: center; */
    margin-top: -60px;
    /* font-size: 23px; */
    text-align: center;
    font-style: italic;

    color: #fff;

  }
  .preloader__text {
    /* text-align: center; */
    color: #fff;
  }
</style>

