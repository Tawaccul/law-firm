<template>
  <HeaderComponent />

  <div class="container">
    <!-- Список калькуляторов -->
    <div class="calculator-list">
      <h1>Калькуляторы</h1>

      <!-- Список калькуляторов -->
      <ul>
        <li v-for="(item, index) in visibleCalculators" :key="index">
          <a
            href="#"
            @click.prevent="selectCalculator(item.calculator)"
            :class="{ active: currentCalculator === item.calculator }"
          >
            {{ item.name }}
          </a>
        </li>
      </ul>

      <!-- Ссылка "Ещё..." для мобильной версии -->
      <a v-if="!showAll && !isDesktop && hiddenCalculators.length > 0" class="more-link" href="#" @click.prevent="showAll = true">Ещё...</a>
    </div>

    <!-- Область для отображения выбранного калькулятора -->
    <div class="calculator-display">
      <NdflCalculator v-if="currentCalculator === 'ndfl'" />
      <CalculatorSecond v-if="currentCalculator === 'second'" />
      <CalcThird v-if="currentCalculator === 'third'" />
      <CalcFourth v-if="currentCalculator === 'fourth'" />
      <CalcFifth v-if="currentCalculator === 'fifth'" />
      <CalcSix v-if="currentCalculator === 'sixth'" />
      <CalcSeven v-if="currentCalculator === 'seventh'" />
      <CalcEight v-if="currentCalculator === 'eighth'" />
    </div>
  </div>

  <FooterComponent />
</template>



<script>
import NdflCalculator from '@/components/CalculatorNDFL.vue';
import CalculatorSecond from '@/components/CalculatorGosPoshlini.vue';
import CalcThird from '@/components/CalculatorUSN.vue';
import CalcFourth from '@/components/CalculatorNDS.vue';
import CalcFifth from '@/components/CalculatorZemelnogoNaloga.vue';
import CalcSix from '@/components/CalculatorAlimentov.vue';
import CalcSeven from '@/components/CalculatorTranspotnogoNaloga.vue';
import CalcEight from '@/components/CalculatorStajaRaboti.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
  name: 'CalculatorsPage',
  data() {
    return {
      currentCalculator: 'ndfl',  // По умолчанию открыт первый калькулятор
      showAll: false,             // Контроль отображения всех калькуляторов на мобильной версии
      calculators: [              // Список всех калькуляторов
        { name: 'Калькулятор НДФЛ', calculator: 'ndfl' },
        { name: 'Калькулятор государственной пошлины', calculator: 'second' },
        { name: 'Калькулятор налога на УСН', calculator: 'third' },
        { name: 'Калькулятор НДС', calculator: 'fourth' },
        { name: 'Калькулятор земельного налога', calculator: 'fifth' },
        { name: 'Калькулятор алиментов', calculator: 'sixth' },
        { name: 'Калькулятор транспортного налога', calculator: 'seventh' },
        { name: 'Калькулятор стажа работы', calculator: 'eighth' }
      ]
    };
  },
  computed: {
    isDesktop() {
      return window.innerWidth >= 1024;  // Определение десктопной версии
    },
    visibleCalculators() {
      // Если показываем всё или это десктоп, возвращаем весь список, иначе — первые три
      return this.showAll || this.isDesktop ? this.calculators : this.calculators.slice(0, 3);
    },
    hiddenCalculators() {
      // Возвращаем скрытые элементы, которые показываются после "Ещё..."
      return this.calculators.slice(3);
    }
  },
  methods: {
    selectCalculator(calculator) {
      this.currentCalculator = calculator;
    }
  },
  components: {
    NdflCalculator,
    CalculatorSecond,
    CalcThird,
    CalcFourth,
    CalcFifth,
    CalcSix,
    CalcSeven,
    CalcEight,
    HeaderComponent,
    FooterComponent
  }
};
</script>
<style>
/* Общий контейнер для списка и калькулятора */
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 180px 100px;
  background-color: #f9f9f9;
}

/* Стили для списка калькуляторов */
.calculator-list {
  width: 100%;
  padding: 20px;
  position: relative;
  background-color: #FFFFFF;
}

.calculator-list li a{
  color: #495057;
  text-decoration: none;
}

.calculator-list li a:hover{
  color: #000000;
  text-decoration: none;
}

/* Активный калькулятор - чёрный цвет */
.calculator-list li a.active {
  color: #000000;
  font-weight: bold; /* Дополнительно выделим жирным */
}

/* Sticky-позиционирование для десктопной версии */
@media (min-width: 1024px) {
  .container {
    flex-direction: row;
  }
  
  .calculator-list {
    width: 25%;
    position: -webkit-sticky;
    position: sticky;
    top: 120px; /* Фиксированный отступ сверху */
    height: 50vh;
    overflow-y: auto; /* Прокрутка, если список будет слишком длинным */
  }

  .calculator-display {
    width: 75%;
  }
}

.calculator-list h1 {
  font-size: 1.5em;
}

.calculator-list ul {
  list-style-type: none;
  padding: 0;
}

.calculator-list li {
  margin: 10px 0;
}

.calculator-list a {
  text-decoration: none;
  color: #007bff;
  font-size: 1.2em;
}

.calculator-list a:hover {
  text-decoration: underline;
  color: #0056b3;
}

/* Ссылка "Ещё..." для мобильной версии */
.more-link {
  display: block;
  text-align: left;
  color: grey;
  font-size: 1.2em;
  margin-top: 10px;
  cursor: pointer;
}

.more-link:hover {
  text-decoration: underline;
}

/* Скрывать ссылку "Ещё..." на десктопной версии */
@media (min-width: 1024px) {
  .more-link {
    display: none;
  }
}

/* Стили для области калькулятора */
.calculator-display {
  width: 100%;
  margin-left: 20px;
  justify-self: end;
}

@media (max-width: 768px) {

  .container {
    padding: 100px 20px;
  }
  .calculator-list {
    width: 90%;
  }

    .tax-calculator {
      padding: 20px;
    }

    .calculator-display {
    width: 100%;
    margin-top: 20px;
    margin-left: 0;
  }
    
    h1 {
      font-size: 20px;
    }
  
    button {
      font-size: 16px;
    }
  
    .result {
      font-size: 16px;
    }
  }

</style>