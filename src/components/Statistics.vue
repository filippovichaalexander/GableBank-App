<template>
  <!-- в обертку компоненты - v-if="walletId != 0"  ???? -->
  <div class="statistics">  
            <h2 class="statistics__title">Статистика за <span>Ноябрь</span></h2>
            <div class="statistics__content">
              <div class="statistics__left">
                <div class="statistics__left-top">
                    <button class="statistics--btn statistics--btn-exps" 
                    :style="{backgroundColor: btnColor ? 'LightGreen' : 'none'}"
                    @click="setStatsExps"
                    >Расходы</button>
                  <button class="statistics--btn statistics--btn-income" 
                  :style="{backgroundColor: btnColor ? 'none' : 'LightSteelBlue'}"
                  @click="setStatsIncome"
                  >Поступления</button>
                </div>
                <div v-if="stats === 'exps'">
                  <div class="statistics__exps"  v-for="transactedCategory in transactedCategoriesIncome" :key="transactedCategory.id">
                    <p class="statistics__item statistics__item--exps">{{transactedCategory.name}}&nbsp;<span>{{transactedCategory.total}}</span><span class="statistics--currency">{{wallet.currency}}</span></p>
                    <p class="statistics__item statistics__item--exps">Турагенства&nbsp;<span>54,55</span><span class="statistics--currency">$</span></p>
                    <p class="statistics__item statistics__item--exps">Фастфуд&nbsp;<span>50,55</span><span class="statistics--currency">$</span></p>
                    <p class="statistics__item statistics__item--exps">Супермаркеты&nbsp;<span>50,55</span><span class="statistics--currency">$</span></p>
                    <p class="statistics__item statistics__item--exps">Топливо&nbsp;<span>30,55</span><span class="statistics--currency">$</span></p>
                  </div>
                </div>
                <div class="statistics__income" v-else>
                  <p class="statistics__item statistics__item--income">Рестораны&nbsp;<span>50,55</span><span class="statistics--currency">$</span></p>
                  <p class="statistics__item statistics__item--income">Турагенства&nbsp;<span>54,55</span><span class="statistics--currency">$</span></p>
                  <p class="statistics__item statistics__item--income">Фастфуд&nbsp;<span>50,55</span><span class="statistics--currency">$</span></p>
                  <p class="statistics__item statistics__item--income">Супермаркеты&nbsp;<span>50,55</span><span class="statistics--currency">$</span></p>
                  <p class="statistics__item statistics__item--income">Топливо&nbsp;<span>30,55</span><span class="statistics--currency">$</span></p>
                </div>
              </div>
              
              <div class="statistics__right">
                <svg class="chart" width="300" height="300" viewBox="0 0 50 50">
                  <circle class="unit" r="15.9" cx="50%" cy="50%"></circle>
                  <circle class="unit" r="15.9" cx="50%" cy="50%"></circle>
                  <circle class="unit" r="15.9" cx="50%" cy="50%"></circle>
                  <circle class="unit" r="15.9" cx="50%" cy="50%"></circle>
                  <circle class="unit" r="15.9" cx="50%" cy="50%"></circle>
                  <circle class="unit" r="15.9" cx="50%" cy="50%"></circle>
                  <circle class="unit" r="15.9" cx="50%" cy="50%"></circle>
                </svg>
              </div>
            </div>
          </div>
</template>

<script>
export default {
    // name: Statistics,
    data() {
        return {
            stats: 'exps', //обязательно ли здесь принимать только строку ?
            btnColor: true,  
            // walletId: 0,
        }
    },
    computed: {
      transactedCategoriesIncome() {   // только те категории у которых поле income 
        if(this.$store.state.transactedCategories.income === 1) {
          return this.$store.state.transactedCategories
        //  this.$store.state.transactedCategories.filter(cat => cat.income)
        }
      },
      wallet() {     // как взять wallet в котором я нахожусь ?
        if(this.walletId != 0){
            return this.$store.getters.wallet(this.walletId);                
        }  
      },
    },
    methods: {
        setStatsExps() {
            this.stats = 'exps',
            this.btnColor = !this.btnColor
        },
        setStatsIncome() {
            this.stats = 'income',
            this.btnColor = !this.btnColor
        }
    }   
}
</script>

<style scoped>
.statistics {
    margin-top: 50px;
}
.statistics__title {
    text-align: center;
    margin-bottom: 20px;
}
.statistics__content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.statistics__left {
  width: 60%;
}
.statistics__right {
  width: 40%;
}
.statistics__exps,
.statistics__income {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
}
.statistics__item {
    margin-top: 30px;
    font-size: 18px;
    line-height: 1px;
    padding: 20px 25px;
    margin-right: 40px;
    color: #000;
    border-radius: 9px;
}
.statistics__item--exps {
    background-color: LightGreen;
}
.statistics__item--income {
    background-color: LightSteelBlue;
}
.statistics__item span {
    font-size: 19px;
}
.statistics--btn {
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;

    padding: 5px 15px;
    background-color: none;
    font-size: 20px;
}
.btn-statistics-income {
    margin-left: 50px;
}

/* .statistics--btn-exps:focus {
    background-color: LightGreen;
}
.statistics--btn-income:focus {
    background-color: LightSteelBlue;
} */
.statistics__exps,
.statistics__income {
    /* display: none; */
    /* opacity: 0; */
    -webkit-animation-name: content;
        animation-name: content;
        -webkit-animation-direction: normal;
                animation-direction: normal;
        -webkit-animation-duration: 0.3s;
                animation-duration: 0.3s;
        -webkit-animation-timing-function: ease-in-out;
                animation-timing-function: ease-in-out;
        -webkit-animation-iteration-count: 1;
        animation-iteration-count: 1;
}
@keyframes content {
    from {
      opacity: 0;
      /* transform: translateY(5%); */
    }
    to {
      opacity: 1;
      /* transform: translateY(0%); */
    }
  }

/* Диаграмма 2 */

@keyframes render {
  0% {
    stroke-dasharray: 0 100;
  }
}
.chart {
  min-width: 300px;
  display: flex;
  margin: 0 auto;
}

.unit {
  fill: none;
  stroke-width: 4;
  cursor: pointer;
  
  animation-name: render;
  animation-duration: .7s;
  transition-property: all; 
  transition-duration: 1.5s;
}

.unit:hover,
.hovered {
  opacity: 0.8;
  stroke-width: 5;
}

.unit:nth-child(1) {
  stroke: #86cfa3;
  stroke-dasharray: 8 100;
}

.unit:nth-child(2) {
  stroke: #a2c6e0;
  stroke-dasharray: 11 100;
  stroke-dashoffset: -8;
}

.unit:nth-child(3) {
  stroke: #ffc7ec;
  stroke-dasharray: 11 100;
  stroke-dashoffset: -19;
}

.unit:nth-child(4) {
  stroke: #f8faa0;
  stroke-dasharray: 14 100;
  stroke-dashoffset: -30;
}

.unit:nth-child(5) {
  stroke: #adffd8;
  stroke-dasharray: 11 100;
  stroke-dashoffset: -44;
}

.unit:nth-child(6) {
  stroke: #f2c48f;
  stroke-dasharray: 5 100;
  stroke-dashoffset: -55;
}

.unit:nth-child(7) {
  stroke: #e3bfe2;
  stroke-dasharray: 40 100;
  stroke-dashoffset: -60;
}

</style>