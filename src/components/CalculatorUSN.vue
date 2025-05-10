<template>
    <div class="usn-calculator">
      <h1>Калькулятор налога на УСН</h1>
  
      <!-- Выбор региона -->
      <label for="region">Выберите регион:</label>
      <select v-model="selectedRegion" @change="updateTaxRate">
        <option v-for="region in regions" :key="region.code" :value="region.code">
          {{ region.name }}
        </option>
      </select>
  
      <!-- Выбор объекта налогообложения -->
      <label for="taxBase">Объект налогообложения:</label>
      <select v-model="taxBase" @change="updateTaxRate">
        <option value="income">Доходы</option>
        <option value="incomeMinusExpenses">Доходы минус расходы</option>
      </select>
  
      <!-- Выбор налогоплательщика -->
      <label for="taxPayerType">Налогоплательщик:</label>
      <select v-model="taxPayerType" @change="updateEmployeeVisibility">
        <option value="individualWithEmployees">ИП с работниками</option>
        <option value="individualWithoutEmployees">ИП без работников</option>
        <option value="organization">Организация</option>
      </select>
  
      <!-- Чекбокс для торгового сбора -->
      <div class="checkbox-group">
        <label>
          <input type="checkbox" v-model="includeTradeFee" />
          <span class="custom-checkbox"></span>
          Включить торговый сбор
        </label>
      </div>
  
      <!-- Основная ставка налога -->
      <label>Основная ставка: {{ taxRate }}%</label>
  
      <!-- Таблица с расчетами по кварталам -->
      <table class="calculation-table">
        <thead>
          <tr>
            <th>Период</th>
            <th>1 квартал</th>
            <th>2 квартал</th>
            <th>3 квартал</th>
            <th>4 квартал</th>
          </tr>
        </thead>
        <tbody>
          <!-- Строка для доходов -->
          <tr>
            <td>Доходы</td>
            <td><input type="number" v-model="incomeQ1" placeholder="0,00" /></td>
            <td><input type="number" v-model="incomeQ2" placeholder="0,00" /></td>
            <td><input type="number" v-model="incomeQ3" placeholder="0,00" /></td>
            <td><input type="number" v-model="incomeQ4" placeholder="0,00" /></td>
          </tr>
  
          <!-- Сумма доходов нарастающим итогом -->
          <tr>
            <td>Сумма нарастающим итогом</td>
            <td>{{ cumulativeIncome(1) }}</td>
            <td>{{ cumulativeIncome(2) }}</td>
            <td>{{ cumulativeIncome(3) }}</td>
            <td>{{ cumulativeIncome(4) }}</td>
          </tr>
  
          <!-- Страховые взносы или расходы -->
          <tr>
            <td>{{ taxBase === 'income' ? 'Страховые взносы' : 'Расходы' }}</td>
            <td><input type="number" v-model="insuranceOrExpensesQ1" placeholder="0,00" /></td>
            <td><input type="number" v-model="insuranceOrExpensesQ2" placeholder="0,00" /></td>
            <td><input type="number" v-model="insuranceOrExpensesQ3" placeholder="0,00" /></td>
            <td><input type="number" v-model="insuranceOrExpensesQ4" placeholder="0,00" /></td>
          </tr>
  
          <!-- Убытки прошлых лет -->
          <tr v-if="taxBase === 'incomeMinusExpenses'">
            <td>Убытки прошлых лет</td>
            <td colspan="4"><input type="number" v-model="previousLosses" placeholder="0,00" /></td>
          </tr>
  
          <!-- Торговый сбор (отображается, если включен) -->
          <tr v-if="includeTradeFee">
            <td>Торговый сбор</td>
            <td><input type="number" v-model="tradeFeeQ1" placeholder="0,00" /></td>
            <td><input type="number" v-model="tradeFeeQ2" placeholder="0,00" /></td>
            <td><input type="number" v-model="tradeFeeQ3" placeholder="0,00" /></td>
            <td><input type="number" v-model="tradeFeeQ4" placeholder="0,00" /></td>
          </tr>
  
          <!-- Авансовые платежи -->
          <tr>
            <td>Авансовые платежи</td>
            <td><input type="number" v-model="advanceQ1" placeholder="0,00" /></td>
            <td><input type="number" v-model="advanceQ2" placeholder="0,00" /></td>
            <td><input type="number" v-model="advanceQ3" placeholder="0,00" /></td>
            <td>–</td>
          </tr>
  
          <!-- Средняя численность работников (отображается, если не ИП без работников) -->
          <tr v-if="showEmployeeCount">
            <td>Средняя численность работников</td>
            <td colspan="4">
              <select v-model="employeeCount">
                <option value="upTo100">до 100</option>
                <option value="101To130">101-130</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
  
      <button @click="calculateTax" type="submit">Рассчитать налог</button>
      <div v-if="result !== null" class="result">
        <p><strong>Размер налога к уплате:</strong> {{ result }} руб.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CalcThird',
    data() {
      return {
        incomeRate: 0, 
        regions: [
          { name: 'Республика Адыгея', code: '01', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Республика Башкортостан', code: '02', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Республика Бурятия', code: '03', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Республика Алтай', code: '04', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Республика Дагестан', code: '05', incomeRate: 1, incomeMinusExpensesRate: 5 },
          { name: 'Республика Ингушетия', code: '06', incomeRate: 2, incomeMinusExpensesRate: 14.7 },
          { name: 'Кабардино-Балкарская Республика', code: '07', incomeRate: 6, incomeMinusExpensesRate: 12 },
          { name: 'Республика Калмыкия', code: '08', incomeRate: 1, incomeMinusExpensesRate: 5 },
          { name: 'Карачаево-Черкесская Республика', code: '09', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Республика Карелия', code: '10', incomeRate: 6, incomeMinusExpensesRate: 12.5 },
          { name: 'Республика Коми', code: '11', incomeRate: 3, incomeMinusExpensesRate: 7.5 },
          { name: 'Республика Марий Эл', code: '12', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Республика Мордовия', code: '13', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Республика Саха (Якутия)', code: '14', incomeRate: 6, incomeMinusExpensesRate: 10 },
          { name: 'Республика Северная Осетия — Алания', code: '15', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Республика Татарстан', code: '16', incomeRate: 6, incomeMinusExpensesRate: 10 },
          { name: 'Республика Тыва', code: '17', incomeRate: 5, incomeMinusExpensesRate: 12 },
          { name: 'Удмуртская Республика', code: '18', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Республика Хакасия', code: '19', incomeRate: 4, incomeMinusExpensesRate: 7.5 },
          { name: 'Чувашская Республика — Чувашия', code: '20', incomeRate: 6, incomeMinusExpensesRate: 12 },
          { name: 'Алтайский край', code: '21', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Краснодарский край', code: '22', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Красноярский край', code: '23', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Приморский край', code: '24', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Ставропольский край', code: '25', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Хабаровский край', code: '26', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Амурская область', code: '27', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Архангельская область', code: '28', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Астраханская область', code: '29', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Белгородская область', code: '30', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Брянская область', code: '31', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Владимирская область', code: '32', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Волгоградская область', code: '33', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Вологодская область', code: '34', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Ярославская область', code: '35', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Забайкальский край', code: '36', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Ивановская область', code: '37', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Калининградская область', code: '38', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Калужская область', code: '39', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Кемеровская область', code: '40', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Кировская область', code: '41', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Ленинградская область', code: '42', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Липецкая область', code: '43', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Магаданская область', code: '44', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Московская область', code: '45', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Нижегородская область', code: '46', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Новгородская область', code: '47', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Новосибирская область', code: '48', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Омская область', code: '49', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Оренбургская область', code: '50', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Орловская область', code: '51', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Пензенская область', code: '52', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Псковская область', code: '53', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Ростовская область', code: '54', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Рязанская область', code: '55', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Самарская область', code: '56', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Саратовская область', code: '57', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Смоленская область', code: '58', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Тамбовская область', code: '59', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Тверская область', code: '60', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Томская область', code: '61', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Тульская область', code: '62', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Тюменская область', code: '63', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Ульяновская область', code: '64', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Челябинская область', code: '65', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Ярославская область', code: '66', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Москва', code: '67', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Санкт-Петербург', code: '68', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Севастополь', code: '69', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Республика Крым', code: '70', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Еврейская автономная область', code: '71', incomeRate: 6, incomeMinusExpensesRate: 15 },
          { name: 'Чукотский автономный округ', code: '72', incomeRate: 6, incomeMinusExpensesRate: 15 },
        ],
        selectedRegion: '01',
        taxBase: 'income',
        taxPayerType: 'individualWithoutEmployees',
        includeTradeFee: false,
        incomeQ1: 0,
        incomeQ2: 0,
        incomeQ3: 0,
        incomeQ4: 0,
        insuranceOrExpensesQ1: 0,
        insuranceOrExpensesQ2: 0,
        insuranceOrExpensesQ3: 0,
        insuranceOrExpensesQ4: 0,
        previousLosses: 0, // Для убытков прошлых лет
        advanceQ1: 0,
        advanceQ2: 0,
        advanceQ3: 0,
        tradeFeeQ1: 0,
        tradeFeeQ2: 0,
        tradeFeeQ3: 0,
        tradeFeeQ4: 0,
        employeeCount: 'upTo100',
        result: null,
        showEmployeeCount: false,
      };
    },
    computed: {
      taxRate() {
        const region = this.regions.find(r => r.code === this.selectedRegion);
        return this.taxBase === 'income' ? region.incomeRate : region.incomeMinusExpensesRate;
      },
    },
    methods: {
      updateTaxRate() {
        this.calculateTax();
      },
      updateEmployeeVisibility() {
        this.showEmployeeCount = this.taxPayerType !== 'individualWithoutEmployees';
        this.calculateTax();
      },
      cumulativeIncome(quarter) {
        return (this['incomeQ' + quarter] || 0) + (this['incomeQ' + (quarter - 1)] || 0);
      },
      calculateTax() {
  const totalIncome =
    (this.incomeQ1 + this.incomeQ2 + this.incomeQ3 + this.incomeQ4) || 0;

  const totalExpenses =
    this.taxBase === 'incomeMinusExpenses'
      ? this.insuranceOrExpensesQ1 +
        this.insuranceOrExpensesQ2 +
        this.insuranceOrExpensesQ3 +
        this.insuranceOrExpensesQ4 +
        this.previousLosses // Учитываем убытки прошлых лет
      : 0;

  const totalInsurance =
    this.taxBase === 'income'
      ? this.insuranceOrExpensesQ1 + this.insuranceOrExpensesQ2 + this.insuranceOrExpensesQ3 + this.insuranceOrExpensesQ4
      : 0;

  const totalTradeFee = this.includeTradeFee
    ? this.tradeFeeQ1 + this.tradeFeeQ2 + this.tradeFeeQ3 + this.tradeFeeQ4
    : 0;

  const advancePayments =
    this.advanceQ1 + this.advanceQ2 + this.advanceQ3;

  // Расчет налоговой базы
  let taxBase = this.taxBase === 'income'
    ? totalIncome - totalInsurance // Вычитаем страховые взносы для "Доходы"
    : totalIncome - totalExpenses;  // Вычитаем расходы для "Доходы минус расходы"

  // Убедимся, что налоговая база не может быть меньше нуля
  taxBase = Math.max(taxBase, 0);

  // Итоговый расчет налога
  const tax = taxBase * (this.taxRate / 100) - advancePayments - totalTradeFee;

  this.result = Math.max(tax, 0).toFixed(2);
}

    },
  };
  </script>
  
  <style scoped>
/* Основной стиль калькулятора */
.usn-calculator {
  padding: 20px;
  background-color: #ffffff; /* Светло-серый фон */
}

/* Заголовок */
h1 {
  font-size: 24px;
  color: #31473A; /* Основной цвет в заголовке */
  margin-bottom: 30px;
  letter-spacing: 1px;
  padding-bottom: 10px;

}

/* Метки (Label) */
label {
  font-size: 16px;
  margin-bottom: 10px;
  display: block;
  color: #2C2C2C; /* Темно-серый текст */
  font-weight: 500;
}

/* Стили для полей выбора (select) и ввода (input) */
select, input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #D0D0D0; /* Легкая граница */
  background-color: #FFFFFF;
  color: #2C2C2C; /* Темно-серый текст */
  font-size: 16px;
  box-shadow: none;
  transition: all 0.3s ease;
  border-radius: 0; /* Убрали закругления */
}

input::placeholder {
  color: #A0A0A0; /* Ненавязчивый серый текст placeholder */
}

input:focus, select:focus {
  outline: none;
  border-color: #31473A; /* Основной цвет при фокусе */
}

/* Кнопка расчета */
button {
  width: 100%;
  padding: 15px;
  margin-top: 20px;
  font-size: 18px;
  color: #FFFFFF;
  background-color: #31473A; /* Основной цвет для кнопки */
  border: none;
  border-radius: 0; /* Убрали закругления */
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  background-color: #2B5C4A; /* Темный вариант основного цвета при наведении */
}

/* Таблица с расчетами */
.calculation-table {
  width: 100%;
  margin-top: 25px;
  background-color: #FFFFFF; /* Белый фон таблицы */
  color: #2C2C2C;
  border: 1px solid #D0D0D0; /* Добавлена строгая граница */
  border-collapse: collapse; /* Убрали разрыв между ячейками */
}

.calculation-table th, .calculation-table td {
  padding: 16px;
  text-align: center;
  font-size: 16px;
  border: 1px solid #D0D0D0; /* Границы для всех ячеек */
}

.calculation-table th {
  background-color: #31473A; /* Основной цвет для заголовков */
  color: #FFFFFF;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 1px;
}

.calculation-table tr:nth-child(even) {
  background-color: #F7F7F7; /* Легкий светлый фон для чередования */
}

.calculation-table tr:hover {
  background-color: #EFEFEF; /* Легкая подсветка строки */
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
  margin-bottom: 5px;
  width: 20px;
  height: 20px;
  accent-color: #31473A;
}

/* Поля ввода в таблице */
.calculation-table input {
  width: 90%;
  padding: 10px;
  border: 1px solid #D0D0D0;
  background-color: #FFFFFF;
  color: #2C2C2C;
  border-radius: 0; /* Убрали закругления */
}

.calculation-table input:focus {
  outline: none;
  border-color: #31473A;
}

/* Результат расчета */
.result {
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  color: #31473A; /* Основной цвет для акцента на результате */
}

/* Адаптация на маленьких экранах */
@media (max-width: 768px) {
  .usn-calculator {
    padding: 20px;
  }

  h1 {
    font-size: 24px;
  }

  .calculation-table th, .calculation-table td {
    padding: 12px;
    font-size: 14px;
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
}

  </style>