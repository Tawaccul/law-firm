<template>
    <div class="tax-calculator">
      <h1>Калькулятор транспортного налога</h1>
  
      <!-- Ввод мощности двигателя -->
      <label for="enginePower">Мощность двигателя (л.с.):</label>
      <input type="number" v-model="enginePower" placeholder="Введите мощность двигателя" />
  
      <!-- Ввод региона регистрации транспортного средства -->
      <label for="region">Регион регистрации транспортного средства:</label>
      <select v-model="region">
        <option value="" disabled>Выберите регион</option>
        <option v-for="region in regions" :key="region.name" :value="region">
          {{ region.name }}
        </option>
      </select>
  
      <!-- Ввод периода владения транспортным средством -->
      <label for="monthsOwned">Количество месяцев владения:</label>
      <select v-model="monthsOwned">
        <option v-for="n in 12" :key="n" :value="n">{{ n }}</option>
      </select>
  
      <!-- Чекбокс: Повышающий коэффициент (для дорогих автомобилей) -->
      <div class="checkbox-group">
        <label>
          <input type="checkbox" v-model="hasLuxuryCoefficient" />
          Применить повышающий коэффициент для дорогих автомобилей?
        </label>
      </div>
  
      <!-- Чекбокс: Льготы -->
      <div class="checkbox-group">
        <label>
          <input type="checkbox" v-model="hasBenefits" />
          Использовать налоговые льготы?
        </label>
      </div>
  
      <!-- Кнопка расчета налога -->
      <button @click="calculateTax">Рассчитать налог</button>
  
      <!-- Отображение результата -->
      <div v-if="taxAmount !== null" class="result">
        <p><strong>Сумма транспортного налога:</strong> {{ taxAmount }} руб.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CalcSeven',
    data() {
      return {
        enginePower: null, // Мощность двигателя в л.с.
        region: "", // Регион регистрации
        regions: [
          {
            name: "Москва",
            rates: [12, 25, 35, 45, 50, 65, 75, 150],
          },
          {
            name: "Санкт-Петербург",
            rates: [24, 35, 35, 50, 50, 75, 75, 150],
          },
          {
            name: "Севастополь",
            rates: [5, 7, 7, 25, 25, 75, 75, 115],
          },
          {
            name: "Амурская область",
            rates: [11, 15, 15, 30, 30, 75, 75, 150],
          },
          {
            name: "Магаданская область",
            rates: [7, 10, 10, 15, 15, 23, 23, 45],
          },
          {
            name: "Смоленская область",
            rates: [10, 20, 20, 40, 40, 70, 70, 150],
          },
          {
            name: "Камчатский край",
            rates: [10, 22, 22, 36, 36, 67, 67, 150],
          },
          {
            name: "Пермский край",
            rates: [25, 33, 35, 47, 50, 65, 72, 105],
          },
          {
            name: "Ненецкий автономный округ",
            rates: [10, 15, 15, 25, 25, 30, 30, 50],
          },
          {
            name: "Республика Тыва",
            rates: [7.7, 14, 14, 30, 30, 51, 51, 110],
          },
          {
            name: "Республика Хакасия",
            rates: [6, 15, 15, 29, 29, 50, 50, 104],
          },
          {
            name: "Удмуртская Республика",
            rates: [14, 29, 29, 50, 50, 75, 75, 150],
          },
        ],
        monthsOwned: 12, // Количество месяцев владения
        hasLuxuryCoefficient: false, // Повышающий коэффициент для дорогих автомобилей
        hasBenefits: false, // Налоговые льготы
        taxAmount: null, // Рассчитанная сумма налога
      };
    },
    methods: {
      calculateTax() {
        // Проверка на правильность введенных данных
        if (!this.enginePower || !this.region) {
          alert("Пожалуйста, введите корректные данные.");
          return;
        }
  
        // Определение ставки налога в зависимости от мощности двигателя
        let rateIndex = 0;
        if (this.enginePower > 100 && this.enginePower <= 125) {
          rateIndex = 1;
        } else if (this.enginePower > 125 && this.enginePower <= 150) {
          rateIndex = 2;
        } else if (this.enginePower > 150 && this.enginePower <= 175) {
          rateIndex = 3;
        } else if (this.enginePower > 175 && this.enginePower <= 200) {
          rateIndex = 4;
        } else if (this.enginePower > 200 && this.enginePower <= 225) {
          rateIndex = 5;
        } else if (this.enginePower > 225 && this.enginePower <= 250) {
          rateIndex = 6;
        } else if (this.enginePower > 250) {
          rateIndex = 7;
        }
  
        // Рассчитываем базовый налог
        let baseTax = this.region.rates[rateIndex] * this.enginePower;
  
        // Учитываем коэффициент владения
        let ownershipCoefficient = this.monthsOwned / 12;
        let totalTax = baseTax * ownershipCoefficient;
  
        // Применение повышающего коэффициента
        if (this.hasLuxuryCoefficient) {
          totalTax *= 1.5; // Пример повышающего коэффициента
        }
  
        // Применение льгот
        if (this.hasBenefits) {
          totalTax *= 0.5; // Пример льготы 50%
        }
  
        // Округляем и сохраняем результат
        this.taxAmount = totalTax.toFixed(2);
      },
    },
  };
  </script>
  
  <style scoped>
  .tax-calculator {
    padding: 20px;
    background-color: #FFFFFF;
    color: #333;
  }
  
  h1 {
    font-size: 24px;
    color: #31473a;
    margin-bottom: 20px;
  }
  
  label {
    font-size: 16px;
    display: block;
    margin-bottom: 10px;
    color: #333;
  }
  
  input {
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
    background-color: #31473a;
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
    color: #31473a;
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
  