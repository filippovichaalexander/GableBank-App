<template>
  <div class="accarts">
    <teleport to="body">
      <bAccountModal :displayModal="displayModal" @close="closeModal" />
    </teleport>
    <teleport to="body">
    <DeletebAccountModal 
    :displayModal="displayDeleteModal" 
    :walletId="activeWallet"
    @close="closeDeleteModal"
    />
    </teleport>
    <!-- :getWalletTitle="getWalletTitle()" -->
    <div class="accarts__wrapper">
      <h2 class="accarts__title">Счета и карты</h2>
      <div class="accarts__content">
        <div v-for:="wallet in wallets" :key="wallet.Id" class="accarts__item">
          <p class="accarts__item-currency">{{wallet.Currency}}</p>
          <div class="accarts__item-right">
            <p class="accarts__item-name">
              {{wallet.Title }}
            </p>
            <span class="accarts__item-value">{{wallet.Total}}</span>&nbsp;
            <!-- условная отрисовка символа валюты   -->
            <span v-if="wallet.Currency === 'RUB'">&#x20bd;</span>
            <span v-else-if="wallet.Currency === 'USD'">&#36;</span>
            <span v-else-if="wallet.Currency === 'BGN'">&#1083;</span>
            <span v-else-if="wallet.Currency === 'RON'">&#108;</span>
            <span v-else-if="wallet.Currency === 'iSK'">&#107;</span>
          </div>
          <div class="accarts__item-btns">
            <div class="accarts__item-edit">
              <img src="../assets/pen.png" 
              alt="edit bank account" 
              class="accarts__item-edit-img"
              @click="editWallet(wallet.Id)"
              >
            </div>
            <div class="accarts__item-delete" @click="deleteWallet(wallet.Id)">
              <img src="../assets/delete.png" 
              alt="delete bank account" 
              class="accarts__item-delete-img"
              >
            </div>
          </div>
        </div>
        <div class="create-baccount" @click="showModal">
          <div class="create-baccount-img-wrapper">
            <img src="../assets/plus.png" alt="" class="create-baccount-img">
            <!-- <div class="create-baccount-img"></div> -->
          </div>
          <p class="create-baccount-text">Создать счёт</p>
          <!-- <p v-if="showBankAccountCreated">Вами только что был создан новый счёт Black {{ currency }}</p>  -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bAccountModal from './modals/bAccountModal.vue';
import DeletebAccountModal from './modals/DeletebAccountModal.vue';
export default {
  data() {
    return {
      displayModal: false,
      displayDeleteModal: false,
      showBankAccountCreated: false,
      activeWallet: false
    }
  },
  components: {
    bAccountModal,
    DeletebAccountModal
  },
  computed: {
    wallets() {                             // называть как переменную
        if(this.$store.state.wallets) {
        console.log('wallet')
        return this.$store.state.wallets
      }
    }
  },
  mounted() {           // для показа кошельков, проверяет если есть
    this.$store.dispatch('getWallets')
    // добавить анимацию для строки только что созданного кошелька
  },
  methods: {
    showModal() {
      this.displayModal = true
    },
    deleteWallet(id) {
      this.displayDeleteModal = true;
      this.activeWallet = Number(id);
    },
    closeModal() {
        this.displayModal = false
    },
    closeDeleteModal() {
        this.displayDeleteModal = false
    },
    editWallet(id) {
      this.$store.dispatch('editWallet', id).then(response => {
        if(response){
          showModal();
            // alert("Счёт успешно удалён");
            // создать параграф "Счёт успешно удалён" в компоненте Accards
        }
        else{
            alert("Произошла ошибка");
        }
      })
    }
  }
}
</script>

<style scoped>

.accarts {
  width: 20%;
}
.accarts__title {
  margin-bottom: 20px;
}
.accarts__item {
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  position: relative;
}
.accarts__item-right {
  margin-left: 20px;
}
.accarts__item-name {
  margin-bottom: 10px;
}
.accarts__item-value span{
  padding-left: 5px;
}
.accarts__item {
  margin-top: 30px;
}
.accarts__item-btns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 20px;
  right: 20px;
}
.accarts__item-delete,
.accarts__item-edit {
  width: 25px;
  height: 25px;
  border: 1px solid grey;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .4s ease;
}
.accarts__item-delete:hover,
.accarts__item-edit:hover {
  cursor: pointer;
  transform: scale(1.2);
}
.accarts__item-edit-img,
.accarts__item-delete-img {
  width: 60%;
}
.accarts__item-edit {
  margin-right: 10px;
}
.create-baccount {
  margin-top: 30px;
  height: 50px;
  padding: 15px;
  width: 100%;
  border: 1px solid plum;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 20px;
}
.create-baccount-img-wrapper {
  margin-right: 15px;
  height: 26px;
  width: 26px;
  border-radius: 50%;
  background-color: plum;
  display: flex;
  justify-content: center;
  align-items: center;
}
.create-baccount:hover {
  background-color: lightgrey;
  cursor: pointer;
}
.create-baccount:hover .create-baccount-img {
  transform: rotate(90deg);
}
.create-baccount-img {
  height: 22px;
  transition: all 0.5s ease;
}
</style>