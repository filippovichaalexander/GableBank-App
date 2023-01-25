<template>
    <Modal @close="this.close()" :displayModal="displayModal">
        <div class="modal__header">
            <h1 class="modal__title">Заполните данные</h1>
        </div>
        <div class="modal__content">
            <div class="modal__form">
                <div class="top-wrapper">
                    <select name="bankAccount" 
                    id="bankAccount" 
                    class="select-top" 
                    v-model="wallet">

                        <option value="" disabled="disabled" selected="selected" class="select-header">Выберете счёт</option>
                        <option  v-for:="wallet in wallets" :key="wallet.Id" :value="wallet.Id">{{wallet.Title}}</option>
                    </select>
                    <p class="modal__currency-type">Валюта счёта - <span v-if="wallet != 0">{{walletCurrency}}</span></p>
                </div>
                <div class="amount-wrapper">
                    <input type="text" placeholder="Введите сумму" v-model="paymentAmount" /> <span>{{ walletCurrency }}</span>
                </div>
                <div class="receiver-bottom">
                    <div class="receiver__phone-number-wrapper">
                        <div class="receiver__phone-number-label">
                            <label for="phone">Введите номер телефона получателя</label>
                        </div>
                        <div class="receiver__phone-number-input">
                            <input 
                            v-model="recipientPhone" 
                            type="text" 
                            name="" 
                            id="phone"
                            data-phone-pattern = "+7 (___) ___-__-__" />
                        </div>
                    </div>
                    <div class="receiver-name-wrapper">
                        <div class="receiver-name-top-wrapper">
                            <p class="receiver-name-text">или выберете получателя из списка</p>
                            <img src="" alt="" class="receiver-name-img">
                        </div>
                        <select name="receiver" id="receiver" class="select-top" v-model="recipientId">
                            <option value="" disabled="disabled" selected="selected" class="select-header">Выберете получателя</option>
                            <option v-for="recipient in recipients" :key="recipient.name" :value="recipient.id">{{recipient.name}}</option>
                            <!-- <option value="Pizza 24">Pizza 24</option>
                            <option value="H&M">H&M</option>
                            <option value="Zara">Zara</option>
                            <option value="New Yorker">New Yorker</option>
                            <option value="Decathlon">Decathlon</option> -->
                        </select>   
                    </div>
                </div>
            </div>
        </div>
    </Modal>
</template>

<script>
// логику можно оставить для передачи денег с одного счёта на другой, сделать PUT,

// маска телефона
var eventCalllback = function (e) {
    let el = e.target,
        clearVal = el.dataset.phoneClear,
        pattern = el.dataset.phonePattern,
        matrix_def = "+7(___) ___-__-__",
        matrix = pattern ? pattern : matrix_def,
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = e.target.value.replace(/\D/g, "");
    if (clearVal !== 'false' && e.type === 'blur') {
        if (val.length < matrix.match(/([\_\d])/g).length) {
            e.target.value = '';
            return;
        }
    }
    if (def.length >= val.length) val = def;
    e.target.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    });
}
var phone_inputs = document.querySelectorAll('[data-phone-pattern]');
for (let elem of phone_inputs) {
    for (let ev of ['input', 'blur', 'focus']) {
        elem.addEventListener(ev, eventCalllback);
    }
}
        
// маска телефона

import Modal from './Modal.vue'
export default {
    data() {
        return {
            wallet: 0,
            recipientPhone: '',
            recipientName: '',
            paymentCathegory: this.recipientCathegory,
            paymentAmount: '',
            paymentCashback: '',
            recipientId : ''
        }
    },
    components: {
        Modal
    },
    props: ["displayModal"],
    computed: {
        wallets() {
            return this.$store.state.wallets
        },
        walletCurrency() {     
            if(this.wallet != 0){
                return this.$store.getters.wallet(this.wallet).Currency;                
            }                    
        },
        recipients() {
            return this.$store.state.recipients
        },
        currencies() {
            return this.$store.state.currencies
        },
        recipientCathegory() {
            return this.$store.getters.recipientCathegory(this.recipientName).Cathegory;
        },
        paymentCashback() {
            this.paymentCashback = this.paymentAmount * 0.05 // в зависимости от категории определённый кэшбэк
        }
    },
    methods: {
        close() {
            this.$emit('close');
            this.walletTitle = '';    
        },
        proceedPayment(event) {
            event.preventDefault();

            let payment = {
                wallet : this.wallet,
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
        this.wallet = '',
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
    .top-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 30px;
    }
    .modal__currency {
        display: flex;
        margin: 0 auto;
    }
    .modal__currency-sel { 
        height: 75px;
        width: 40%;
        text-align: center;
    }
    .select-top option {
        text-align: left;
        width: 100%;
        padding: 20px;
    }
    .select-top option[value=""][disabled] {
        display: block

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
    .modal__currency-type {
        padding: 30px 10px;
    }
    .amount-wrapper {
        padding: 30px 10px;
        text-align: center;
    }
    .receiver__phone-number-wrapper {
        text-align: center;
    }
    /* .receiver__phone-number-label,
    .receiver__phone-number-input {
        padding: 10px 20px;
    } */
    .receiver__phone-number-label {
        text-align: left;
    }
    .receiver-bottom {
        display: flex;
        justify-content: center;
        gap: 30px;
        align-items: center;
    }
    .receiver__phone-number-wrapper,
    .receiver-name-wrapper {
        width: 30%;
    }

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