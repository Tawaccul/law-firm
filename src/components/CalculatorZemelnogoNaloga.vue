<template>
    <div class="land-tax-calculator">
      <h1>Калькулятор земельного налога</h1>
  
      <!-- Ввод кадастровой стоимости -->
      <label for="cadastralValue">Кадастровая стоимость земельного участка (руб.):</label>
      <input type="number" v-model="cadastralValue" placeholder="Введите кадастровую стоимость" />
  
      <!-- Ввод размера доли -->
      <label for="ownershipShare">Размер доли в праве (в процентах):</label>
      <input type="number" v-model="ownershipShare" min="1" max="100" placeholder="100" />
  
      <!-- Ввод периода владения в месяцах -->
      <label for="ownershipPeriod">Период владения участком (месяцев):</label>
    <select v-model="ownershipPeriod">
      <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
    </select>
  
      <!-- Ввод налоговой ставки -->
      <label for="taxRate">Ставка земельного налога (%):</label>
      <input type="number" v-model="taxRate" placeholder="Введите ставку земельного налога" />
  
      <!-- Чекбокс для повышающего коэффициента -->
      <div class="checkbox-group">
        <label>
          <input type="checkbox" v-model="showIncreasingCoefficient" />
          Ввести повышающий коэффициент
        </label>
      </div>
  
      <!-- Поле для повышающего коэффициента (открывается, если чекбокс отмечен) -->
      <div v-if="showIncreasingCoefficient">
        <label for="increasingCoefficient">Повышающий коэффициент:</label>
        <input type="number" v-model="increasingCoefficient" placeholder="1.0" step="0.01" />
      </div>
  
      <!-- Чекбокс для льготы -->
      <div class="checkbox-group">
        <label>
          <input type="checkbox" v-model="showPrivilege" />
          Указать категорию льготы
        </label>
      </div>
  
      <!-- Поле для выбора льготы (открывается, если чекбокс отмечен) -->
      <div v-if="showPrivilege">
        <label for="privilege">Категория налогоплательщика:</label>
        <select v-model="privilege">
          <option value="none">Без льготы</option>
          <option value="pensioner">Пенсионер</option>
          <option value="disabled">Инвалид</option>
          <option value="veteran">Ветеран</option>
          <option value="religiousOrg">Религиозная организация</option>
          <option value="publicDisabilityOrg">Общественная организация инвалидов</option>
        </select>
      </div>
  
      <!-- Чекбокс для налогового вычета -->
      <div class="checkbox-group">
        <label>
          <input type="checkbox" v-model="showTaxDeduction" />
          Ввести налоговый вычет
        </label>
      </div>
  
      <!-- Поле для налогового вычета (открывается, если чекбокс отмечен) -->
      <div v-if="showTaxDeduction" >
        <label for="taxDeduction">Налоговый вычет:</label>
        <input type="number" v-model="taxDeduction" placeholder="Введите сумму вычета" />
      </div>
  
      <!-- Чекбокс для дополнительного налогового вычета -->
      <div class="checkbox-group">
        <label>
          <input type="checkbox" v-model="showAdditionalTaxDeduction" />
          Ввести дополнительный налоговый вычет
        </label>
      </div>
  
      <!-- Поле для дополнительного налогового вычета (открывается, если чекбокс отмечен) -->
      <div v-if="showAdditionalTaxDeduction" >
        <label for="additionalTaxDeduction">Дополнительный налоговый вычет:</label>
        <input type="number" v-model="additionalTaxDeduction" placeholder="Введите сумму дополнительного вычета" />
      </div>
  
      <!-- Кнопка расчета налога -->
      <button @click="calculateTax">Рассчитать налог</button>
  
      <!-- Отображение результата -->
      <div v-if="result !== null" class="result">
        <p><strong>Результат налога к уплате:</strong> {{ result }} руб.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CalcFifth',
    data() {
      return {
        cadastralValue: null, // Кадастровая стоимость
        ownershipShare: 100, // Доля владения в процентах (по умолчанию 100%)
        ownershipPeriod: 1, // Период владения в месяцах (по умолчанию 1)
        taxRate: null, // Ставка налога
        showIncreasingCoefficient: false, // Показывать ли поле для повышающего коэффициента
        increasingCoefficient: 1.0, // Повышающий коэффициент (по умолчанию 1.0)
        showPrivilege: false, // Показывать ли выбор льготы
        privilege: 'none', // Льгота
        showTaxDeduction: false, // Показывать ли поле для налогового вычета
        taxDeduction: 0, // Налоговый вычет
        showAdditionalTaxDeduction: false, // Показывать ли поле для дополнительного налогового вычета
        additionalTaxDeduction: 0, // Дополнительный вычет
        result: null, // Итоговый результат
        months: Array.from({ length: 12 }, (_, i) => i + 1) // Массив месяцев от 1 до 12

      };
    },
    methods: {
      calculateTax() {
        // Проверяем введенные данные
        if (!this.cadastralValue || !this.taxRate || !this.ownershipPeriod || this.ownershipShare <= 0) {
          alert("Пожалуйста, введите все данные для расчета.");
          return;
        }
  
        // Проверка на корректность периода владения
        if (this.ownershipPeriod < 1 || this.ownershipPeriod > 12) {
          alert("Количество месяцев владения должно быть от 1 до 12.");
          return;
        }
  
        // Учитываем долю владения
        const shareFraction = this.ownershipShare / 100;
  
        // Учитываем период владения (в долях от года)
        const ownershipFraction = this.ownershipPeriod / 12;
  
        // Рассчитываем базовый налог до вычетов
        let taxAmount = (this.cadastralValue * this.taxRate / 100) * shareFraction * ownershipFraction;
  
        // Учитываем налоговые вычеты
        taxAmount = Math.max(0, taxAmount - this.taxDeduction - this.additionalTaxDeduction);
  
        // Применяем повышающий коэффициент, если задан и чекбокс отмечен
        if (this.showIncreasingCoefficient) {
          taxAmount *= this.increasingCoefficient;
        }
  
        // Округляем до двух знаков после запятой
        this.result = taxAmount.toFixed(2);
      }
    }
  };
  </script>
  
  <style scoped>
  .land-tax-calculator {
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
  
  input, select {
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

  input{
    width: 97.5%;
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
  