<template>
  <div class="last-operations">
            <h2 class="last-operations-title">Последние операции</h2>
            <div class="last-operations__content">
              <h4 class="last-operations__date">Вчера</h4>
              <div class="last-operations__item">
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
              </div>
              <div class="last-operations__item">
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
              </div>
              <div class="last-operations__item">
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
              </div>
              <div class="last-operations__item">
                <div class="last-operations__left">
                
                <img src="./assets/oper.png" alt="image"/>
                <div class="last-operations__item-content">
                  <p class="last-operations__recipient">Петров А.А.</p>
                  <div class="last-operations__item-state">
                    <p class="last-operations__account">Домашний счёт</p>
                    <p class="last-operations__cashback">Кэшбэк +<span>10</span></p>
                  </div>
                </div>
                </div>
                <div class="last-operations__item-right">
                  <p class="last-operations__sent-amount">-15.00</p>
                  <p class="last-operations__category">Транспорт</p>
                </div>
              </div>
            </div>
          
          <button class="all-oper-btn">Все операции</button>        
          </div>
</template>

<script>
export default {
  data() {
    return {
      checkTransactions() {
        // if(this.$store.state.lastTransactions) {
        //   return this.$store.state.lastTransactions
        // }
      }
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