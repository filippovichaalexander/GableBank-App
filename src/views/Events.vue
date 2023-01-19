<template>
  <div class="container">
    <!-- Event top -->
    <div class="event__top">
      <div class="event__calendar">
        <div class="calendar__btn calendar__btn-prev">
          <img src="../assets/arrow.png" alt="button previous">
        </div>
        <div class="calendar__month-wrapper">
          <img src="../assets/calendar.png" alt="calendar" class="calendar__img">
          <span class="calendar__month-title">Январь</span>
        </div> 
        <div class="calendar__btn calendar__btn-next">
          <img src="../assets/arrow.png" alt="button next">
        </div>
      </div>
      <div class="event__input-wrapper">
        <input type="text" class="event__input" placeholder="Найдите любые события и операции">
        <img src="../assets/magnglass.png" alt="" class="event__input-icon">
      </div>
    </div>
    <!-- Event top -->

    <Statistics />
    <LastTransactions />
  </div>
</template>

<script>
import Statistics from '../components/Statistics.vue'
import LastTransactions from '../components/LastTransactions.vue'
export default {
  components: {
    Statistics,
    LastTransactions
  }
}
</script>

<style scpoed>
.event__top {
  padding: 10px;
  width: 100%;
  height: 60px;
  background-color: WhiteSmoke;

  display: flex;
  align-items: center;
  justify-content: space-between;
}
.event__calendar {
  width: 15%;

  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.event__input-wrapper {
  width: 85%;
}
.event__input {
  width: 100%;
}
.calendar__month-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.calendar__img {
  width: 20px;
}
.calendar__btn {
  width: 15px;
}
.calendar__btn-prev {
  transform: rotate(180deg);
}
.event__input-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  /* position: relative; */
}
.event__input-icon {
  width: 25px;

  /* position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%) */
}
</style>