<template>
  <Modal @close="this.close()" :displayModal="displayModal">
        <div class="modal__window-bottom">
            <div class="modal__header">
                <h1 class="modal__title">Создайте новый счёт</h1>
                <!-- Опрокинуть название счёта -->
            </div>
            <div class="modal__content">
                <div class="modal__purpose-form">
                    <div class="modal__currency">
                        <input placeholder="Измените название счета" v-model="title" />
                        <select name="currency" id="currency" class="modal__currency-sel" v-model="currency">
                            <option value="" disabled="disabled" selected="selected" class="select-header">Измените валюту</option>
                            <option value="USD" v-for="currency in currencies" :key="currencies.name">USD</option>
                            <option value="RUB">RUB</option>
                            <option value="BGN">BGN</option>
                            <option value="RON">RON</option>
                            <option value="ISK">ISK</option>
                        </select>              
                    </div>
                    <div class="modal__purpose">
                        <div class="modal__purpose-radio-wrapper">
                            <div class="modal__purpose-left">
                                <h4>Изменить цель</h4>
                                <p class="modal__purpose-left-text">Накопите на большую покупку, рассчитав сумму ежемесячного платежа</p>
                            </div>
                            <input type="checkbox" class="modal__purpose-right" @click="showPurpose"/>
                        </div>
                        <transition name="purpose">
                            <div class="modal__purpose-bottom-wrapper" v-show="viewPurpose">
                                <input type="text" class="modal__purpose-title" placeholder="Название цели" v-model="purposeName">
                                <div class="modal__purpose-bottom">
                                    <label for="purpose-amount">Введите сумму и месяц, к которому хотите накопить</label>
                                    <div  class="modal__purpose-bottom-target">
                                        <div class="modal__purpose-amount-wrapper">
                                            <input type="text" 
                                            id="purpose-amount" 
                                            class="modal__purpose-amount" 
                                            placeholder="Сумма" 
                                            v-model="purposeAmount">
                                            <span>${{ currency }}</span>
                                        </div>
                                        <input type="date" 
                                        id="purpose-time" 
                                        class="modal__purpose-time" 
                                        placeholder="Выберете месяц"
                                        v-model="purposeTime"
                                        />
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                    <button class="modal__purpose-btn" @click="createNewBankAccount($event)">Сохранить счёт</button>
                </div>
            </div>
        </div>
    </Modal>
</template>

<script>
import Modal from "./Modal.vue";
export default {
  data() {
    return {
// перекинуть в шаблон
title: '',
currencies: [
  {
    name: 'usd',
  },
  {
    name: 'usd',
  }
],

    }
  },
  components: {
    Modal
  },
  watсh: {
    //добавить стейт из computed в data
    wallet(id) {
      title: wallet.Title,
      
    }
  },
  computed: {
    wallet() {
      return this.$store.getters.wallet(this.wallet); 
    }
  }
}
</script>

<style>

</style>