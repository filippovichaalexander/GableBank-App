<template>
   <div class="main-container">
    <div class="container">
      <div class="main-container-wrapper">
        <Accarts />
        <div class="main">
          <Paytrans />
          <LastTransactions />
          <Statistics />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Accarts from '../components/Accarts.vue'
import Paytrans from '../components/Paytrans.vue'
import LastTransactions from '../components/LastTransactions.vue'
import Statistics from '../components/Statistics.vue'



export default {
  mounted(){
    if(!this.$store.state.user) {
      this.$router.push("signin");  // signin из name router. Если state.user пустой перекинь, router, когда отрисуешься (Можно created) в signin 
    } // прелоадер лучше делать в роутере ?
  },
  components: {
    Accarts,
    Paytrans,
    LastTransactions,
    Statistics
  }
}
</script>

<style scoped>


.login-btn:hover {
  cursor: pointer;
}

.container {
    width: 100%;
    max-width: 1690px;
    margin: 0 auto;
    padding: 0 135px;
}
.main-container-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.main {
  width: 80%;
}
</style>