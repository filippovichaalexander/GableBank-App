<template>
  <div class="last-operations__item">
      <div class="last-operations__left">
      <img src="./assets/oper.png" class="last-operations__item-img" alt="image"/>
      <div class="last-operations__item-content">
        <p class="last-operations__recipient"></p>
        <div class="last-operations__item-state">
          <p class="last-operations__account"></p>
          <p class="last-operations__cashback"></p>
        </div>
      </div>
      </div>
      <div class="last-operations__item-right">
        <p class="last-operations__sent-amount"></p>
        <p class="last-operations__category"></p>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
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
  text-align: right;  
  width: 100%;
}
.last-operations__recipient {
  width: 100%;
}
.last-operations__category {
  width: 100%;
}
.last-operations__cashback {
  width: 100%;
}
.all-oper-btn {
  width: 100%;
  background-color: plum;
  margin-top: 30px;
  padding: 15px;
}
</style>