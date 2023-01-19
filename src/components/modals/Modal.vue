<template>
  <div 
  v-if="displayModal" 
  class="modal__wrapper" 
  @click.self="close"
  >
    <div class="modal__window">
        <div @click="close" class="btn-close-wrapper">
            <img src="../../assets/plus.png" class="btn-close" alt="">
        </div>
        <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["displayModal"],
  methods: {
    close() {
        this.$emit('close');      
    }
  }
}
</script>

<style>
.modal__header {
    position: relative;
}
.btn-close-wrapper {
    position: absolute;
    right: 30px;
    top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #000;
    border-radius: 50%;
    width: 32px;
    height: 32px;
}
.btn-close-wrapper:hover {
    cursor: pointer;
}
.btn-close {
    transform: rotate(45deg);
    width: 24px;
    height: 24px;
}
.modal__wrapper {
    z-index: 8;
    background-color: rgba(0,0,0,0.4);
    position: absolute;
    height: 100vh;
    width: 100vw;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
}
.modal__window {
    padding: 40px;
    z-index: 10;
    background-color: #fff;
    position: absolute;
    /* margin: 0 auto; */
    min-width: 183px;
    max-width: 800px;
    width: 60%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.modal__header,
.modal__content {
    margin: 0 auto;
}
.modal__header {
    max-width: 65%;
}
.modal__title {
    /* display: inline-block; */
    /* margin: 0 auto; */
    text-align: center;
    font-size: 25px;
}
</style>