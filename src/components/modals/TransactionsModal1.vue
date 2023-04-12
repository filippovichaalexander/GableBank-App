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
                    v-model="walletId">
                    <option value="0" selected disabled>Выберите кошелёк</option>
                    <option  
                    v-for:="w in wallets" 
                    :key="w.Id" 
                    :value="w.Id"
                        >{{w.Title}}
                        </option>
                    </select>
                </div>
                <div class="choose-transaction">
                    <div class="choose-transaction__item">
                        <input 
                        type="radio" 
                        id="add_transaction" 
                        name="transfer" 
                        value="1"
                        v-model="type">
                        <label for="add_transaction">Доход</label>
                    </div>
                    <div class="choose-transaction__item">
                        <input 
                        type="radio" 
                        id="outcome" 
                        name="transfer" 
                        value="0"
                        v-model="type">
                        <label for="outcome">Расход</label>
                    </div>
                    <div class="choose-transaction__item">
                        <input 
                        type="radio" 
                        id="transfer" 
                        name="transfer" 
                        value="2" 
                        v-model="type">
                        <label for="transfer">Перевести</label>
                    </div>
                </div>
                <div class="amount-wrapper">
                    <input type="text" placeholder="Введите сумму" v-model="total" /> <span v-if="walletId != 0">{{ wallet.Currency }}</span>
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
                        <!-- Сделать выпадающий список с категориями, привязать с помощью v-model -->
                        <!-- И попробовать отправить запрос -->
                        <!-- <SearchBar v-model="category" @change="log"/> -->
                        <div 
                        сlass="search-bar" 
                        :style="{'position' : (isVisible) ? 'absolute' : 'fixed'}" 
                        @сlick.self="hideList"
                        >
                            <input 
                            type="text" 
                            v-model="inputSearchCat"
                            placeholder="Create or find category" 
                            @focus="isVisible = true"
                            />
                            <div class="search-bar-options" v-if="isVisible" >
                                <div v-for="category in categories" :key="category.Id" class="search-bar-option" @click="selectCategory(category)" > 
                                    <p  class="pointer category">
                                    {{ category.Title }}
                                    </p>
                                </div>
                                <div v-if="categories.length === 0">
                                    <p>No results found!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btns">
                    <!-- <div class="btns-top">
                        <button class="btn btn-top">Доход</button>
                        <button class="btn btn-top">Расход</button>
                    </div> -->
                    <button class="btns-bottom btn" @click.prevent="add_transaction()">Выполнить транзакцию</button>
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
            walletId: 0,
            walletCategory: '',
            type: '0',
            total: '',
            inputSearchCat: '',
            category: false,
            isVisible: false,

            categoryTitle,
            categoryType
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
        wallet() {  
            if(this.walletId != 0){
                return this.$store.getters.wallet(this.walletId);                
            }  
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
        // searchbar
        categories(){
            return this.$store.getters.categories.filter(category => category.Title.includes(this.inputSearchCat));
        },
    },
    methods: {
        // phone number mask
        // input(e) {
        //     var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        //     e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        // },
        // phone number mask

        close() {
            this.$emit('close');
            this.walletTitle = '';    
        },
        add_transaction() {

            // let regAmount = /^\d+$/;      
            //     if (this.transactionAmount.match(regAmount)) {
            //         console.log('сумма верна')
            //     }
            if(this.category){
                let walletData = {
                    wallet_id : this.walletId,   // слева ключи должны быть идентичны бэку
                    type : this.type, 
                    total : this.total,  
                    category: this.category
                };
                this.$store.dispatch('add_transaction', walletData).then(response => {
                if(response){
                    console.log(walletData)
                }
                else{
                    alert("Произошла ошибка");
                    }
                })
                this.close()
            }
            else{
                // Здесь нужно вызвать запрос на добавление категории. 
                // Назване - inputSearchCat
                // Тип тоже в дате
                // После вызова данного запроса необходимо каким-то путем получить id новой категории (взять id последнего объекта из getters.categories или другой вариант)
                // И уже выполнить добавление транзакции
                
                this.$store.dispatch('addCategory', categoryData)
                    let lastCategoryId = this.$store.getters.categories.length - 1

                    let categoryData = {
                        category_id : lastCategoryId.id,   // слева ключи должны быть идентичны бэку
                        categoryTitle : this.categoryTitle, 
                        categoryTYpe : this.categoryType
                    };
                    this.$store.dispatch('add_transaction', categoryData).then(response => {
                    if(response){
                        console.log(categoryData)
                    }
                    else{
                        alert("Произошла ошибка");
                    }
                })
                this.close()
            }
        },
        // searbar
        selectCategory(category) {
            this.category = category.Id;
            this.inputSearchCat = category.Title;
            this.isVisible = false;
        },
        hideList() {
            this.isVisible = false;
        }
    },
    mounted(){
        if(!this.$store.getters.categories){
            this.$store.dispatch("getCategories");
        }
    }
}

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
    .select-top {
        margin: 30px 0;
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
    .choose-transaction
     {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .choose-transaction__item {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    /* SearchBar */
    .pointer {
  cursor: pointer;
}
.show {
  visibility: show;
}
.hide {
  visibility: hidden;
}

.search-bar-options{
  position : absolute;
  background-color: white;
  display:flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  width: 220px;
  max-height: 300px;
  overflow-y:scroll;
  padding: 5px;
}
.search-bar-option{
  width: 175px;
  text-align: left;
  box-shadow: 0 0 5px black;
  border-radius: 5px;
  padding: 5px;
}
</style>


<!-- https://codepen.io/himalayasingh/pen/pxKKgd -->