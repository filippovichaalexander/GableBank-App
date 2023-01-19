    <template>
        <Modal @close="this.close()" :displayModal="displayModal">
            <div v-if="accountDeleted" class="account--deleted">
                <h2>Счёт {{walletTitle}} успешно удалён</h2>   
                <!-- Можно добавить обратный таймер с кнопкой Отмена -->
            </div>
            <div v-else class="modal__content-wrapper">
                <div class="modal__header">
                    <h1 class="modal__title">Вы уверены что хотите удалить cчёт {{walletTitle}}?</h1>
                </div>
                <div class="modal__content-btn-wrapper">    
                    <button class="modal__purpose-btn" @click="deleteWallet">Да</button>
                    <button class="modal__purpose-btn btn-2" @click="close">Нет</button>
                </div>
            </div>
        </Modal>
    </template>
    
    <script>
    import Modal from "./Modal.vue";
    export default {
        data() {
            return {
                accountDeleted: false
            }
        },
        props: {
            displayModal : Boolean,
            walletId : [String, Number]
        },
        components: {
            Modal
        },
        computed: {
            walletTitle() {                         
                return this.$store.getters.getWalletTitle(this.walletId);                
            }
        },
        methods: {
            close() {
                this.$emit('close')
            },
            deleteWallet() {
            this.$store.dispatch('deleteWallet', this.walletId).then(response => {
                if(response){
                    // alert("Счёт успешно удалён");
                    // this.accountDeleted = true
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
  
// как валидировать пропсы ?
</script>

<style scoped>
.modal__header {
    position: relative;
    width: 80%;
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
    padding-bottom: 100px;
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
.modal__content-btn-wrapper {
    margin-top: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>


<!-- https://codepen.io/himalayasingh/pen/pxKKgd -->