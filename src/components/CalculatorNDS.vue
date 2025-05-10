<template>
    <div class="vat-calculator">
      <h1>Калькулятор НДС</h1>
  
      <!-- Выбор типа расчета -->
      <label for="calculationType">Выберите тип расчета:</label>
      <select v-model="calculationType">
        <option value="addVAT">Начислить НДС</option>
        <option value="extractVAT">Выделить НДС</option>
        <option value="calculateTotalVAT">Рассчитать сумму по НДС</option>
      </select>
  
      <!-- Ввод данных в зависимости от типа расчета -->
      <div v-if="calculationType === 'addVAT'">
        <label>Сумма без НДС:</label>
        <input type="number" v-model="amountWithoutVAT" placeholder="Введите сумму без НДС" />
      </div>
  
      <div v-if="calculationType === 'extractVAT'" class="summa">
        <label>Сумма с НДС:</label>
        <input type="number" v-model="amountWithVAT" placeholder="Введите сумму с НДС" />
      </div>
  
      <div v-if="calculationType === 'calculateTotalVAT'">
        <label>НДС:</label>
        <input type="number" v-model="vatAmount" placeholder="Введите сумму НДС" />
      </div>
  
      <!-- Выбор ставки НДС -->
      <label for="vatRate">Ставка НДС:</label>
      <select v-model="vatRate">
        <option value="20">20%</option>
        <option value="10">10%</option>
        <option value="0">0%</option>
      </select>
  
      <!-- Кнопка для расчета -->
      <button @click="calculateVAT">Рассчитать</button>
  
      <!-- Отображение результата -->
      <div v-if="result !== null" class="result">
        <p><strong>Результат:</strong> {{ result }} руб.</p>
        <p><strong>Прописью:</strong> {{ resultInWords }}</p>
      </div>
  
      <!-- Справочная информация о НДС -->
      <div class="vat-info">
        <h2>Что такое НДС?</h2>
        <p>НДС – это федеральный налог, взимаемый с добавленной стоимости на товары, работы и услуги. Объектом налогообложения являются операции, такие как реализация товаров и услуг на территории РФ, ввоз товаров и т.д.</p>
        <p>Основные ставки НДС: 0%, 10%, 20%.</p>
        <p>Для большинства операций используется ставка 20%, ставка 10% применяется к отдельным социально-значимым товарам и услугам, ставка 0% – для экспорта и некоторых других операций.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CalcFourth',
    data() {
      return {
        calculationType: 'addVAT', // Тип расчета по умолчанию
        vatRate: 20, // Ставка НДС по умолчанию
        amountWithoutVAT: null, // Для начисления НДС
        amountWithVAT: null, // Для выделения НДС
        vatAmount: null, // Для расчета суммы по НДС
        result: null, // Итоговый результат
        resultInWords: '' // Результат прописью
      };
    },
    methods: {
      calculateVAT() {
        let result = 0;
        if (this.calculationType === 'addVAT') {
          // Формула для начисления НДС: Сумма без НДС * Ставка НДС / 100
          result = parseFloat(this.amountWithoutVAT) + (this.amountWithoutVAT * this.vatRate / 100);
        } else if (this.calculationType === 'extractVAT') {
          // Формула для выделения НДС: Сумма с НДС * Ставка НДС / (100 + Ставка НДС)
          result = this.amountWithVAT * this.vatRate / (100 + parseFloat(this.vatRate));
        } else if (this.calculationType === 'calculateTotalVAT') {
          // Формула для расчета суммы по НДС: НДС / Ставка НДС * 100
          result = parseFloat(this.vatAmount) / parseFloat(this.vatRate) * 100;
        }
  
        // Округляем до 2 знаков после запятой
        this.result = result.toFixed(2);
  
        // Конвертация результата в пропись
        this.resultInWords = this.numberToWords(result);
      },
      numberToWords(number) {
        // Примитивная функция конвертации числа в пропись (для простоты)
        const units = ["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"];
        const teens = ["", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"];
        const tens = ["", "десять", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"];
        const hundreds = ["", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот"];
  
        let word = '';
        let num = Math.floor(number);
  
        if (num < 10) word = units[num];
        else if (num < 20) word = teens[num - 10];
        else if (num < 100) word = tens[Math.floor(num / 10)] + ' ' + units[num % 10];
        else if (num < 1000) word = hundreds[Math.floor(num / 100)] + ' ' + tens[Math.floor((num % 100) / 10)] + ' ' + units[num % 10];
  
        return word.trim();
      }
    }
  };
  </script>
  
  <style scoped>
  .vat-calculator {
    padding: 20px;
    background-color: #ffffff;
    color: #333;
  }
  
  h1 {
    font-size: 24px;
    color: #31473A;
    margin-bottom: 20px;
    text-align: left
  }
  
  label {
    font-size: 16px;
    display: block;
    margin-bottom: 10px;
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
  
  .vat-info {
    margin-top: 30px;
    padding: 20px;
    background-color: #f1f1f1;
    border: 1px solid #ccc;
  }
  
  .vat-info h2 {
    font-size: 20px;
    margin-bottom: 15px;
  }
  
  .vat-info p {
    font-size: 16px;
    color: #333;
    margin-bottom: 10px;
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

 input{
  width: 97.5%;
  padding: 10px;
    font-size: 16px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #333;
}


  </style>
  