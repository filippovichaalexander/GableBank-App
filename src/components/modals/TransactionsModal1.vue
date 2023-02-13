<template>
    <Modal @close="this.close()" :displayModal="displayModal">
        <div class="modal__header">
            <h1 class="modal__title">Заполните данные</h1>
        </div>
        <div class="modal__content">
            <div class="modal__form">
                <div class="top-wrapper">
                    <select 
                    name="bankAccount" 
                    id="bankAccount" 
                    class="select-top" 
                    v-model="wallet">
                        <!-- <option value="" disabled="disabled" selected="{{ wallet.Title }}" class="select-header">Выберете счёт</option> как сделать этот option - подсказку ?-->
                        <option  
                        v-for:="wallet in wallets" 
                        :key="wallet.Id" 
                        :value="wallet.Id"
                        selected="{{walletTitle}}"
                        >{{wallet.Title}}
                        </option>
                    </select>
                    <p class="modal__currency-type">Валюта счёта - <span v-if="wallet != 0">{{walletCurrency}}</span></p>
                    <!-- Создать просто геттер wallet -> и обращаться к нему wallet.Currency -->
                </div>
                <div class="amount-wrapper">
                    <input type="text" placeholder="Введите сумму" v-model="transactionAmount" /> <span>{{ walletCurrency }}</span>
                </div>
                <div class="receiver-bottom">
                <!--div class="receiver__phone-number-wrapper">
                        <div class="receiver__phone-number-label">
                            <label for="phone">Введите номер телефона получателя</label>
                        </div>
                        <div class="receiver__phone-number-input">
                            <input v-model="recipientPhone" type="text" id="phone" placeholder="(555) 555-5555" @input="input"/>
                        </div>
                    </div> -->
                    <div class="receiver-name-wrapper">
                        <SearchBar />
                    </div>
                </div>
                <div class="btns">
                    <div class="btns-top">
                        <button class="btn btn-top">Доход</button>
                        <button class="btn btn-top">Расход</button>
                    </div>
                    <button class="btns-bottom btn">Перевести на другой счёт</button>
                </div>
            </div>
        </div>
    </Modal>
</template>

<script>



import Modal from './Modal.vue'
import SearchBar from '../SearchBar.vue'
export default {
    data() {
        return {
            wallet: 0,
            walletCategory: '',
            walletTitle: '',
            transactionAmount: ''

        }
    },
    components: {
        Modal,
        SearchBar
    },
    props: ["displayModal"],
    computed: {
        wallets() {
            return this.$store.state.wallets
        },
        // walletCurrency() {     
        //     if(this.wallet != 0){
        //         return this.$store.getters.wallet(this.wallet).Currency;                
        //     }                    
        // },
        walletTitle() {     
                if(this.wallet != 0){
                    return this.$store.getters.wallet(this.wallet).Title;                
            }
        },
        wallet() {     
                if(this.wallet != 0){
                    return this.$store.getters.wallet(this.wallet);                
            }  // вместо walletTitle и walletCurrency получить getter "Wallet" и при mounted или computed опрокидывать в шаблон
            // В шаблоне wallet.Currency - не визуализируется...
        },
        recipients() {
            return this.$store.state.recipients
        },
        currencies() {
            return this.$store.state.currencies
        },
        recipientCategory() {
            return this.$store.getters.recipientCategory(this.recipientName).Category;
        },
        // paymentCashback() {
        //     return this.paymentAmount * 0.05 // в зависимости от категории определённый кэшбэк
        // }
    },
    methods: {
        // маска телефона
        input(e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        },
        // маска телефона
        close() {
            this.$emit('close');
            this.walletTitle = '';    
        },
        income(event) {
            event.preventDefault();

            // regex transactionAmount
            let regAmount = /^\d+$/;      
                if (this.transactionAmount.match(regAmount)) {
                    console.log('сумма верна')
                }
                // или так:
                // let regAmount = Number(transactionAmount); 138 строка

                // regex transactionAmount
                // в которые строки кодв=а вставит этот regex ?

            let walletData = {
                walletCategory : this.walletCategory,  // категорию можно выбрать, следовательно её нужно передавать ?
                walletTitle : this.walletTitle,  // Имя кошелька не нужно передавать тк он не изменяется ?
                walletCurrency : this.walletCurrency,  // валюту не нужно передавать тк она не изменяется ?
                transactionAmount: this.transactionAmount
                // transactionAmount: this.Number(transactionAmount);
            };
            this.$store.dispatch('income', walletData).then(response => {
            if(response){
                alert("Операция прощла успешно");
                // создать параграф "Счёт успешно добавлен" в компоненте Accards
            }
            else{
                alert("Произошла ошибка");
                // создать параграф "Счёт с таким именем уже существует"
                }
            })
            // Чистить поле ввода
            this.transactionAmount = ''
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
        width: 42%;
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
        padding: 30px 0;
        text-align: left;
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

        position: relative;
    }
    .receiver__phone-number-wrapper,
    .receiver-name-wrapper {
        /* width: 30%; */
        position: absolute;
        left: 0;
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
    .btns {
        
        margin: 50px auto 0 auto;
        text-align: center;
        width: 300px;
    }
    .btns-top {
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 30px;
    }
    .btns-bottom {
        margin-top: 30px;
    text-align: center;
        width: 100%;
    }
    .btn {
        padding: 10px;
        background-color: plum;
    }
    .btn-top {
        width: 40%;
    }
    .btn-else {
        padding: 10px;
        background-color: plum;
    }
</style>


<!-- https://codepen.io/himalayasingh/pen/pxKKgd -->