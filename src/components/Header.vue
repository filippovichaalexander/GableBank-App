<template>
    <header class="header">
        <div class="container">
            <div class="header__inner">
             <div class="header__left-wrapper">
                <div class="header__left">
                    <div class="header__logo">
                        <img src="./assets/logo1.png" alt="logo" class="logo-img">
                    </div>
                </div>
                <nav class="nav">
                    <span class="nav__item">Платежи</span>
                    <span class="nav__item">Бонусы</span>
                    <span class="nav__item">Кошелёк</span>
                    <span class="nav__item">Настройки</span>
                </nav>
             </div>
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
  padding-bottom: 20px;
}
.header__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header__left-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.nav {
  margin-left: 100px;
}
.nav__item {
  padding-left: 50px;
}
</style>