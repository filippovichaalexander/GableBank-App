<template>
  <div class="last-operations__item" v-for="transaction in transactions" :key="transaction.id">
      <div class="last-operations__left">
      <img src="./assets/oper.png" class="last-operations__item-img" alt="image"/>
      <div class="last-operations__item-content">
        <p class="last-operations__recipient">Иванов А.А.{{ transaction.recipient }}</p>
        <div class="last-operations__item-state">
          <p class="last-operations__account">Домашний счёт {{ transaction.wallet }}</p>
          <p class="last-operations__cashback">Кэшбэк +{{ transaction.cashback }}<span>{{ transaction.cashbackAmount }}</span></p>
        </div>
      </div>
      </div>
      <div class="last-operations__item-right">
        <p class="last-operations__sent-amount">-25.00{{ transaction.amount }}</p>
        <p class="last-operations__category">Фастфуд{{ transaction.category }}</p>
      </div>
    </div>
</template>

<script>
export default {
  computed: {
    transactions() {
      if(this.$store.getters.transactions) {
        return this.$store.getters.transactions
      }
    },
  },
  mounted() {
    this.$store.dispatch('getWallets')
  }
}
</script>

<style scoped>
  .last-operations__item,
.last-operations__left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.last-operations__item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 30px;
}
.last-operations__item-state {
  margin-left: 20px;
}
.last-operations__account,
.last-operations__sent-amount {
  margin-bottom: 10px;
}
.last-operations__sent-amount {
  text-align: right;  
}
.all-oper-btn {
  width: 100%;
  background-color: plum;
  margin-top: 30px;
  padding: 15px;
}
</style>