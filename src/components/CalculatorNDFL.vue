<template>
  <div class="calculator">
    <h1>НДФЛ Калькулятор</h1>

    <!-- Выбор принципа расчета -->
    <div class="form-group">
      <label for="calculationMode">Выберите расчет:</label>
      <select v-model="calculationMode">
        <option value="total">Известна общая сумма, включая НДФЛ</option>
        <option value="net">Известна сумма за вычетом НДФЛ</option>
      </select>
    </div>

    <!-- Поля для ввода в зависимости от выбранного режима -->
    <form @submit.prevent="calculateTax">
      <div  class="form-group" v-if="calculationMode === 'total'">
        <label for="income">Общая сумма (руб):</label>
        <input type="number" v-model="income" placeholder="Введите сумму" required />
      </div>

      <div class="form-group" v-if="calculationMode === 'net'">
        <label for="income">Сумма за вычетом НДФЛ (руб):</label>
        <input type="number" v-model="income" placeholder="Введите сумму" required />
      </div>

      <div class="form-group">
        <label for="taxRate">Ставка налога (%):</label>
        <select v-model="taxRate">
          <option value="9">9%</option>
          <option value="13">13%</option>
          <option value="15">15%</option>
          <option value="30">30%</option>
          <option value="35">35%</option>
        </select>
      </div>

      <!-- Дополнительные поля, если выбрана общая сумма, включая НДФЛ -->
      <div v-if="calculationMode === 'total'">
        <div class="checkbox-group">
          <label>
            <input type="checkbox" v-model="applyDeduction" />
            <span class="custom-checkbox"></span>
            Применить вычет на детей
          </label>
        </div>

        <!-- Появляется, если применяем вычет на детей -->
        <div v-if="applyDeduction">
          <div class="form-group">
            <label for="children">Количество детей:</label>
            <input type="number" v-model="childrenCount" placeholder="Введите количество детей" min="0" />
          </div>

          <div class="form-group">
            <label for="deductionType">Выберите тип вычета на детей:</label>
            <select v-model="deductionType">
              <option value="0">Без вычета</option>
              <option value="1400">На 1-го и 2-го ребенка (1400 руб.)</option>
              <option value="3000">На 3-го и каждого последующего (3000 руб.)</option>
              <option value="12000">На ребенка-инвалида (12 000 руб.) — для родителей</option>
              <option value="6000">На ребенка-инвалида (6 000 руб.) — для опекунов</option>
            </select>
          </div>

          <div class="form-group">
            <label for="months">Расчетный период в месяцах:</label>
            <div class="month-selector">
              <button type="button" @click="decreaseMonths">-</button>
              <input type="number" v-model="months" min="1" readonly />
              <button type="button" @click="increaseMonths">+</button>
            </div>
          </div>
        </div>

        <!-- Чекбоксы для включения социальных, имущественных и профессиональных вычетов -->
        <div class="checkbox-group">
          <label>
            <input type="checkbox" v-model="applySocialDeduction" />
            <span class="custom-checkbox"></span>
            Применить социальный вычет
          </label>
        </div>
        <div v-if="applySocialDeduction" class="form-group">
          <label for="socialDeduction">Социальный вычет (руб):</label>
          <input type="number" v-model="socialDeduction" placeholder="Введите сумму социального вычета" />
        </div>

        <div class="checkbox-group">
          <label>
            <input type="checkbox" v-model="applyPropertyDeduction" />
            <span class="custom-checkbox"></span>
            Применить имущественный вычет
          </label>
        </div>
        <div v-if="applyPropertyDeduction" class="form-group">
          <label for="propertyDeduction">Имущественный вычет (руб):</label>
          <input type="number" v-model="propertyDeduction" placeholder="Введите сумму имущественного вычета" />
        </div>

        <div class="checkbox-group">
          <label>
            <input type="checkbox" v-model="applyProfessionalDeduction" />
            <span class="custom-checkbox"></span>
            Применить профессиональный вычет
          </label>
        </div>
        <div v-if="applyProfessionalDeduction" class="form-group">
          <label for="professionalDeduction">Профессиональный вычет (руб):</label>
          <input type="number" v-model="professionalDeduction" placeholder="Введите сумму профессионального вычета" />
        </div>
      </div>

      <button type="submit">Рассчитать НДФЛ</button>
    </form>

    <!-- Результат -->
    <div v-if="result !== null" class="result">
      <p><strong>Результат расчета:</strong></p>
      <p>Налог: {{ result.tax }} руб.</p>
      <p>Сумма выплаты: {{ result.payout }} руб.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NdflCalculator',

  data() {
    return {
      calculationMode: 'total',
      income: 0,
      taxRate: 13,
      applyDeduction: false,
      childrenCount: 0,
      deductionType: 0,
      months: 1,
      applySocialDeduction: false,
      socialDeduction: 0,
      applyPropertyDeduction: false,
      propertyDeduction: 0,
      applyProfessionalDeduction: false,
      professionalDeduction: 0,
      result: null
    };
  },
  methods: {
    calculateTax() {
      let taxableIncome = this.income;

      if (this.calculationMode === 'total') {
        if (this.applyDeduction) {
          taxableIncome -= this.childrenCount * this.deductionType;
        }

        if (this.applySocialDeduction) {
          taxableIncome -= this.socialDeduction;
        }

        if (this.applyPropertyDeduction) {
          taxableIncome -= this.propertyDeduction;
        }

        if (this.applyProfessionalDeduction) {
          taxableIncome -= this.professionalDeduction;
        }
      }

      const taxRateDecimal = this.taxRate / 100;
      let tax, payout;

      if (this.calculationMode === 'total') {
        tax = taxableIncome * taxRateDecimal;
        payout = taxableIncome - tax;
      } else if (this.calculationMode === 'net') {
        tax = this.income * taxRateDecimal;
        payout = this.income;
      }

      tax = Math.round(tax);
      payout = Math.round(payout);

      this.result = {
        tax,
        payout
      };
    },
    decreaseMonths() {
      if (this.months > 1) {
        this.months--;
      }
    },
    increaseMonths() {
      this.months++;
    }
  }
};
</script>

<style scoped>
.calculator {
  margin: 0 auto;
  padding: 20px;
  background-color: #FFFFFF;
}

h1 {
  text-align: left;
  color: #31473A;
  font-size: 24px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group input {
  width: 97.5%;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #495057;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #31473A;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #31473A;
}

.result {
  margin-top: 20px;
  padding: 15px;
  background-color: #dff0d8;
  color: #3c763d;
  text-align: center;
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
}

.month-selector {
  display: flex;
  align-items: center;
}

.month-selector button {
  width: 40px;
  height: 40px;
  background-color: #31473A;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 18px;
}

.month-selector button:hover {
  background-color: #31473A;
}

.month-selector input {
  width: 60px;
  text-align: center;
  border: none;
  font-size: 18px;
  margin: 0 10px;
}

.select-input{
  width: 30%;
}
</style>
