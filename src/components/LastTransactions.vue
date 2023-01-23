<template>
  <div class="last-operations">
  <h2 class="last-operations-title">Последние операции</h2>
  <div class="last-operations__content">
    <h4 class="last-operations__date">Вчера</h4>
    <!-- <div class="last-operations__item">
      <div class="last-operations__left">
      <img src="./assets/oper.png" class="last-operations__item-img" alt="image"/>
      <div class="last-operations__item-content">
        <p class="last-operations__recipient">Иванов А.А.</p>
        <div class="last-operations__item-state">
          <p class="last-operations__account">Домашний счёт</p>
          <p class="last-operations__cashback">Кэшбэк +<span>5</span></p>
        </div>
      </div>
      </div>
      <div class="last-operations__item-right">
        <p class="last-operations__sent-amount">-25.00</p>
        <p class="last-operations__category">Фастфуд</p>
      </div>
    </div> -->
    <Suspence>
      <template #default>
        <Transaction />
      </template>
      <template #fallback>
        <TransactionSkeleton />
      </template>
    </Suspence>
  </div>
  
  <button class="all-oper-btn" @click="toEventsView">Все операции</button>        
  </div>
</template>

<script>
import Transaction from './Transaction.vue'
import TransactionSkeleton from './TransactionSkeleton.vue'
export default {
  components: {
    Transaction,
    TransactionSkeleton
  },
  methods: {
    toEventsView() {
      this.$router.push('/events');  
    }
  }
}
</script>

<style scoped>

.last-operations-title {
  margin-top: 30px;
  text-align: center;
  margin-bottom: 20px;
}
.last-operations__date {
  margin-bottom: 20px;
}
.last-operations__item {
  margin-top: 30px;
}
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