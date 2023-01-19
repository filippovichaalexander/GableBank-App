<template>
  <div class="paytrans">
      <teleport to="body">
        <TransactionsModal1 :displayModal="displayModal" @close="closeModal"/>
      </teleport>
      <h2 class="paytrans__title">Платежи и переводы</h2>
      <div class="paytrans__content">
          <div class="paytrans__item">
            <p class="paytrans__item-title">По реквизитам</p>
          </div>
          <div class="paytrans__item">
            <p class="paytrans__item-title">Запрос денег</p>
          </div>
          <div class="paytrans__item" @click="showTransactionModal">
            <p class="paytrans__item-title">Перевести деньги</p>
          </div>
      </div>
  </div>
</template>

<script>
import TransactionsModal1 from './modals/TransactionsModal1.vue';
export default {
  data() {
    return {
      displayModal: false,
      showTransactionCreated: false
    }
  },
  components: {
    TransactionsModal1
  },
  methods: {
    showTransactionModal() {
      this.displayModal = true;
    },
    closeModal() {
      this.displayModal = false
    }
  }
}
</script>

<style scoped>

.paytrans__title {
  text-align: center;
  margin-bottom: 30px;
}
.paytrans__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.paytrans__item {
  width: 25%;
  height: 100px;
  background-color: plum;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.paytrans__item:hover {
  cursor: pointer;
}
.paytrans__item-title {
  margin: 0 auto;
}

</style>