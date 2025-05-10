<template>
    <div class="alimony-calculator">
      <h1>Калькулятор алиментов</h1>
  
      <!-- Ввод дохода плательщика алиментов до НДФЛ -->
      <label for="income">Сумма дохода плательщика алиментов (до вычета НДФЛ):</label>
      <input type="number" v-model="income" placeholder="Введите сумму дохода" />
  
      <!-- Справка по доходам -->
      <details>
        <summary>Справка: С каких сумм удерживаются и с каких не удерживаются алименты</summary>
        <div>
          <strong>Алименты можно удержать с доходов:</strong>
          <ul>
            <li>Зарплата (по основному месту работы и по совместительству)</li>
            <li>Надбавки, доплаты, премии</li>
            <li>Выплаты за условия труда (ночная работа, сверхурочные)</li>
            <li>Пособия по временной нетрудоспособности</li>
            <li>Средний заработок (включая отпускные)</li>
          </ul>
          <strong>Алименты нельзя удерживать с доходов:</strong>
          <ul>
            <li>Компенсации при увольнении</li>
            <li>Материальная помощь</li>
            <li>Денежные выплаты в связи с рождением ребенка</li>
            <li>Командировочные</li>
            <li>Компенсации за проезд</li>
          </ul>
        </div>
      </details>
  
      <!-- Чекбокс: облагается ли доход НДФЛ -->
      <div class="checkbox-group">
        <label>
          <input type="checkbox" v-model="isTaxable" />
          Облагается ли доход плательщика алиментов НДФЛ?
        </label>
      </div>
  
      <!-- Учет общего числа детей для расчета НДФЛ -->
      <label for="totalChildren">Укажите количество детей плательщика (до 18 лет или до 24 лет при очной форме обучения):</label>
      <select v-model="totalChildren">
        <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
      </select>
  
      <!-- Чекбокс: есть ли имущественный или социальный вычет по НДФЛ -->
      <div class="checkbox-group">
        <label>
          <input type="checkbox" v-model="hasTaxDeduction" />
          Предоставляется ли плательщику алиментов имущественный или социальный вычет по НДФЛ?
        </label>
      </div>
  
      <!-- Ввод количества детей, на которых уплачиваются алименты -->
      <label for="childrenWithAlimony">Укажите количество детей, на которых удерживаются алименты:</label>
      <select v-model="childrenWithAlimony">
        <option v-for="n in totalChildren" :key="n" :value="n">{{ n }}</option>
      </select>
  
      <!-- Кнопка расчета алиментов -->
      <button @click="calculateAlimony">Рассчитать алименты</button>
  
      <!-- Отображение результата -->
      <div v-if="alimonyAmount !== null" class="result">
        <p><strong>Сумма алиментов:</strong> {{ alimonyAmount }} руб.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CalcSix',
    data() {
      return {
        income: null, // Доход плательщика алиментов
        isTaxable: false, // Облагается ли доход налогом
        totalChildren: 0, // Общее количество детей
        hasTaxDeduction: false, // Наличие налоговых вычетов
        childrenWithAlimony: 1, // Количество детей, на которых удерживаются алименты
        alimonyAmount: null // Рассчитанная сумма алиментов
      };
    },
    methods: {
      calculateAlimony() {
        // Проверка на правильность введенных данных
        if (!this.income || this.totalChildren < 1 || this.childrenWithAlimony < 1 || this.childrenWithAlimony > this.totalChildren) {
          alert("Пожалуйста, введите корректные данные.");
          return;
        }
  
        // Определение суммы дохода после вычета НДФЛ, если доход облагается налогом
        let netIncome = this.isTaxable ? this.income * 0.87 : this.income;
  
        // Учет налогового вычета, если он применим
        if (this.hasTaxDeduction) {
          // Допустим, применим стандартный вычет, добавим фиксированную сумму
          netIncome += 1400 * this.totalChildren; // стандартный вычет на каждого ребенка
        }
  
        // Определяем долю для расчета алиментов в зависимости от количества детей
        let alimonyShare = 0;
        if (this.childrenWithAlimony === 1) {
          alimonyShare = 0.25; // 1/4 дохода на одного ребенка
        } else if (this.childrenWithAlimony === 2) {
          alimonyShare = 0.3333; // 1/3 дохода на двух детей
        } else if (this.childrenWithAlimony >= 3) {
          alimonyShare = 0.5; // 1/2 дохода на трех и более детей
        }
  
        // Рассчитываем сумму алиментов
        let alimony = netIncome * alimonyShare;
  
        // Округляем результат до двух знаков после запятой
        this.alimonyAmount = alimony.toFixed(2);
      }
    }
  };
  </script>
  
  <style scoped>
  .alimony-calculator {
    padding: 20px;
    background-color: #ffffff;
    color: #333;
  }
  
  h1 {
    font-size: 24px;
    color: #31473A;
    margin-bottom: 20px;
  }
  
  label {
    font-size: 16px;
    display: block;
    margin-bottom: 10px;
    color: #333;
  }
  
  input{
    width: 97.5%;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #333;
  }
  select {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #333;
  }
  
  button {
    width: 100%;
    padding: 12px;
    font-size: 18px;
    background-color: #31473A;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #2b5c4a;
  }
  
  .result {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
    color: #31473A;
  }
  
  details {
    margin-bottom: 20px;
  }
  
  summary {
    font-weight: bold;
    cursor: pointer;
    font-size: 16px;
  }

  .checkbox-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-group input[type="checkbox"] {
  margin-right: 10px;
  width: 20px;
  height: 20px;
  accent-color: #31473A;
  margin-bottom: 5px;
}
  </style>
  