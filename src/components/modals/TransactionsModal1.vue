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
            <div class="modal__header">
                <h1 class="modal__title">Создайте новый счёт</h1>
            </div>
            <div class="modal__content">
                <div class="modal__purpose-form">
                        <select name="bankAccount" id="bankAccount" class="modal__bankaccount-sel" v-model="bankAccount">
                            <option value="" disabled="disabled" selected="selected" class="select-header">Выберете счёт</option>
                            <div class="bank-accounts">
                                <option value="USD">Bank Account 1</option>
                                <option value="RUB">Bank Account 2</option>
                                <option value="BGN">Bank Account 3</option>
                            </div>
                            <input placeholder="Введите сумму" v-model="paymentAmount" />
                        </select>
                        <div class="modal__currency">
                        <input placeholder="Введите имя получателя" v-model="receiverFullName" />
                        <input type="tel" placeholder="Введите номер телефона получателя" v-model="receiverPhoneNumber" />
                        </div>
                        <div class="modal__hint-wrapper">
                            <p class="modal__hint-text">или выберете из списка</p>
                            <img src="" alt="" class="modal__hint-img">
                        </div>
                        <select name="receiver" id="receiver" class="modal__receiver-sel" v-model="receiverBrandName">
                            <option value="" disabled="disabled" selected="selected" class="select-header">Выберете получателя</option>
                            <option value="USD">Burger King</option>
                            <option value="RUB">Pizza 24</option>
                            <option value="BGN">H&M</option>
                            <option value="RON">Zara</option>
                            <option value="ISK">New Yorker</option>
                        </select>   
                    <div class="modal__purpose">
                        <div class="modal__purpose-radio-wrapper">
                            <div class="modal__purpose-left">
                                <h4>Добавить цель</h4>
                                <p class="modal__purpose-left-text">Накопите на большую покупку, рассчитав сумму ежемесячного платежа</p>
                            </div>
                            <input type="checkbox" class="modal__purpose-right" @click="showPurpose"/>
                        </div>
                        <transition name="purpose">
                            <div class="modal__purpose-bottom-wrapper" v-show="viewPurpose">
                                <input type="text" class="modal__purpose-title" placeholder="Название цели" v-model="purposeName">
                                <div class="modal__purpose-bottom">
                                    <label for="purpose-amount">Введите сумму и месяц, к которому хотите накопить</label>
                                    <textarea 
                                    class="modal__purpose-bottom-target" 
                                    id="purpose-amount" 
                                    placeholder="напишите комментарий"
                                    rows="10"
                                    >
                                    </textarea>
                                </div>
                            </div>
                        </transition>
                    </div>
                    <button class="modal__purpose-btn" @click="proceedPayment($event)">Оплатить</button>
                </div>
            </div>
        </div>
        </div>
    </template>
    
    <script>
    export default {
        data() {
            return {
                bankAccount: '',
                receiverFullName: '',
                receiverPhoneNumber: '',
                receiverBrandName: '',
                paymentCathegory: '',
                paymentAmount: '',
                paymentCashback: '',
            }
        },
        props: ["displayModal"],
        methods: {
            close() {
                // this.$emit('close', currency);  //отследит в родительской компоненте событие закрытия окна
                this.$emit('close')
                this.viewPurpose = false;       
            },
            showPurpose() {
                this.viewPurpose = !this.viewPurpose;  
            },
            proceedPayment(event) {
            event.preventDefault();
            // let purpose = {
            //     currency: this.currency,
            //     purposeName: this.purposeName,
            //     purposeAmount: this.purposeAmount,
            //     purposeTime : this.purposeTime
            // }
            let payment = {
                bankAccount : this.bankAccount,
                receiverFullName : this.receiverFullName,
                receiverPhoneNumber : this.receiverPhoneNumber,
                receiverBrandName : this.receiverBrandName,
                paymentCathegory : this.paymentCathegory,
                paymentAmount : this.paymentAmount,
                paymentCashback : this.paymentCashback,
            };
            this.$store.dispatch('transact', payment).then(response => {
                if(response){
                    alert("Покупка успешно оплачена");
                    // создать параграф "Счёт успешно добавлен" в компоненте Accards
                }
                else{
                    alert("Произошла ошибка");
                    // создать параграф "Счёт с таким именем уже существует"
                }
            })
            this.bankAccount = '',
            this.receiverFullName = '',
            this.receiverPhoneNumber = '',
            this.receiverBrandName = '',
            this.paymentCathegory = '',
            this.paymentAmount = ''
            }
        }
    }
  
  // как валидировать пропсы ?
  </script>
  
  <style scoped>
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
      padding: 30px;
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
  .modal__purpose {
      padding: 20px;
  
  }
  .modal__purpose-radio-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  .modal__purpose-left h4 {
      /* text-align: center; */
      margin: 0 0 10px 0;
      font-size: 20px;
  }
  .modal__purpose-left-text {
      max-width: 72%;
      font-size: 18px;
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
      margin-bottom: 20px;
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
      color: #000;
      font-size: 18px;
  }
  .modal__purpose-time:hover {
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
  
  
  <!-- https://codepen.io/himalayasingh/pen/pxKKgd -->