<template>
  <Modal @close="this.close()" :displayModal="displayModal">
    <div class="modal__window-bottom">
      <div class="modal__header">
          <h1 class="modal__title">Измените счёт {{ walletTitle }}</h1>
          <!-- Опрокинуть название счёта -->
      </div>
      <div class="modal__content">
          <div class="modal__purpose-form">
            <div class="modal__currency">
              <input placeholder="Измените название счета" v-model="title" />
              <select name="currency" id="currency" class="modal__currency-sel" v-model="currency">
                  <!-- <option value="" disabled="disabled" selected="selected" class="select-header">Измените валюту</option> -->
                  <option 
                  value="USD" 
                  v-for="currency in allCurrencies" 
                  :key="currency" 
                  selected="{{wallet.Currency}}" 
                  >USD</option>
                   <!-- как сделать selected="{{wallet.Currency}}" через computed wallet  - выше -->
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
            <button class="modal__purpose-btn" @click="editWallet($event)">Сохранить счёт</button>
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
      viewPurpose: false,
      
      title: '',
      currency: ''

    }
  },
  components: {
    Modal
  },
  props: {
    displayModal : Boolean,
    walletId : Number
  },
  computed: {
    walletTitle() {                         
      return this.$store.getters.wallet(this.walletId).Title;                
    },
    wallet() {
      return this.$store.getters.wallet(this.walletId); 
    },
    allCurrencies() {
      return this.$store.getters.allCurrencies
    }
  },
  updated(){
    this.title = this.wallet.Title;
    this.currency = this.wallet.Currency;
  },
  methods: {
    close() {
      this.$emit('close');      
    },
    showPurpose() {
      this.viewPurpose = !this.viewPurpose;  
    },
    editWallet() {
      let wallet = {
        id : this.walletId, 
        title: this.title, 
        currency : this.currency
      };
      this.$store.dispatch('editWallet', wallet).then(response => {
        if(response){
          alert('кошелёк изменён')
          setTimeout(() => {
              this.close();
          }, 1000);
        }
        else{
          alert("Произошла ошибка");
        }
      })
    },
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
.modal__currency {
    display: flex;
    margin: 0 auto;
}
.modal__currency-sel { 
    height: 75px;
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    margin-bottom: 20px;
    margin-top: 20px;
}
.modal__currency-sel option {
    text-align: left;
    width: 100%;
    padding: 20px;
}
.modal__currency-sel option[value=""][disabled] {
    display: none

}
.modal__purpose-radio-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.modal__purpose {
    margin-bottom: 50px;
}
.modal__purpose-left h4 {
    /* text-align: center; */
    margin: 0 0 20px 0;
    font-size: 20px;
}
.modal__purpose-left-text {
    max-width: 72%;
    font-size: 18px;
    line-height: 1.5;
    color: grey;
}
.modal__purpose-bottom-wrapper {
    margin-top: 20px;
}
.modal__purpose-bottom-target {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
}
.modal__purpose-title {
    padding: 10px 20px;
    margin-bottom: 40px;
    width: 100%;
    height: 50px;
    background-color: rgb(198, 198, 198);
    color: #000;
    font-size: 18px;
}
.modal__purpose-bottom label {
    font-size: 18px;
    color: grey;
}
.modal__purpose-amount-wrapper {
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
}
.modal__purpose-amount-wrapper span {
    position: absolute;
    right: 20px;
    top: 37%;
    transform: translateY(-50%);
    color: grey;
}
.modal__purpose-amount {
    padding: 10px 20px;
    margin-bottom: 20px;
    width: 100%;
    height: 50px;
    background-color: rgb(198, 198, 198);
    color: #000;
    font-size: 18px;
}
.modal__purpose-time {
    padding: 10px 20px;
    margin-bottom: 20px;
    width: 40%;
    height: 50px;
    background-color: rgb(198, 198, 198);
    color: grey;
    font-size: 18px;
    
}
.modal__purpose-time::-webkit-calendar-picker-indicator {
    /* filter: brightness(10%); */
    filter:invert(50%);
}
.modal__purpose-time::-webkit-calendar-picker-indicator:hover {
    cursor: pointer;
}
.modal__purpose-btn {
    display: block;
    margin: 0 auto;
    background-color: plum;
    padding: 20px;
    width: 30%;
}
/* странное поведение */
.select-header {
    text-align: left;    
}
 /* странное поведение */

/* Translation */
.purpose-enter-active,
.purpose-leave-active {
    transition: all 2s ease;
}
.purpose-enter-from,
.purpose-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.purpose-enter-active,
.purpose-leave-active {
  transition: all 1s ease;
}
</style>