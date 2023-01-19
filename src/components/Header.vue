<template>
    <header class="header">
        <div class="container">
            <div class="header__inner">
              <div class="header__left">
                  <div class="header__logo" @click="toHome">
                      <img src="../assets/mono_bank22.svg" alt="logo" class="logo-img">
                      <p class="header__logo-title">Gable Bank</p>
                  </div>
              </div>
              <nav class="nav">
                  <span class="nav__item">Платежи</span>
                  <span class="nav__item">События</span>
                  <span class="nav__item">Бонусы</span>
                  <span class="nav__item">Кошелёк</span>
                  <span class="nav__item">Настройки</span>
              </nav>
              <span v-if="user">{{user.name}}</span>
              <span class="login-btn" v-else><router-link to="/signin">Личный кабинет</router-link></span>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    computed : {
        user(){
            return this.$store.state.user;   // Можно ли через props так же сделать ? Можно пропимать как это делать через getters ?
        }
    },
    methods: {
      toHome() {
        if(this.user) {             // сперва проверить если залогинен
          this.$router.push('/');  
        }
      }
    }
}
</script>

<style>

.container {
    width: 100%;
    max-width: 1690px;
    margin: 0 auto;
    padding: 0 135px;
}
.header {
  padding-top: 20px;
  padding-bottom: 50px;
}
.header__logo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.logo-img {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
.header__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header__left {
  width: 20%;
}
.header__left:hover {
  cursor: pointer;
}
.header__left-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.nav {
  width: 80%;
}
.nav__item {
  position: relative;
}
.nav__item:hover {
  cursor: pointer;
}
.nav__item:after {
  content: '';
  opacity: 0;
  position: absolute;
  bottom: -15px;
  left: 0;
  background-color: #000;
  width: 100%;
  height: 1px;
  transition: all 0.5s ease;
}
.nav__item:hover::after,
.nav__item:hover:after {
  opacity: 1;
}
.nav__item:not(:nth-child(1)) {
  margin-left: 50px;
}
</style>