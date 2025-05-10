<template>
    <div class="tax-calculator">
      <h1>Калькулятор стажа работы для больничного листа</h1>
      <form @submit.prevent="calculateTotalExperience">
        <div v-for="(period, index) in periods" :key="index" class="mb-3 period">
          <h5>Период {{ index + 1 }}</h5>
          <div class="row">
            <div class="col">
              <label>Дата начала</label>
              <!-- Заменяем flat-pickr на Flatpickr -->
              <Flatpickr
                v-model="period.start"
                :config="datePickerConfig"
                required
                class="date-input"
              />
            </div>
            <div class="col">
              <label>Дата окончания</label>
              <!-- Заменяем flat-pickr на Flatpickr -->
              <Flatpickr
                v-model="period.end"
                :config="datePickerConfig"
                required
                class="date-input"
              />
            </div>
          </div>
          <div v-if="period.start && period.end && new Date(period.end) < new Date(period.start)" class="error">
            Дата окончания не может быть раньше даты начала!
          </div>
            <button type="button" class="remove-button" @click="removePeriod(index)">Удалить период</button>

        </div>
        <div class="buttons">
        <button type="button" class="add-button" @click="addNewPeriod">Добавить период</button>
        <button type="submit" class="calculate-button">Посчитать стаж</button>
        </div>

      </form>
      <div v-if="totalDays !== null" class="result">
        <h4>Общий стаж работы: {{ totalYears }} лет, {{ totalMonths }} месяцев и {{ totalDays }} дней</h4>
      </div>
    </div>
</template>
  
  
  <script>
  import Flatpickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  
  export default {
    name: 'CalcEight',
    components: {
      Flatpickr
    },
    data() {
      return {
        periods: [{ start: '', end: '' }],
        totalYears: null,
        totalMonths: null,
        totalDays: null,
        datePickerConfig: {
          dateFormat: 'Y-m-d',
          onReady: (selectedDates, dateStr, instance) => {
            instance.calendarContainer.classList.add('green-calendar');
          },
        },
      };
    },
    methods: {
  calculateTotalExperience() {
    let totalDays = 0;

    this.periods.forEach(period => {
      const startDate = new Date(period.start);
      const endDate = new Date(period.end);

      // Проверяем, являются ли обе даты валидными объектами Date
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.error('Ошибка: некорректная дата.');
        return;
      }

      if (endDate >= startDate) {
        const daysDifference = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
        totalDays += daysDifference;
      }
    });

    this.totalYears = Math.floor(totalDays / 365);
    const remainingDays = totalDays % 365;
    this.totalMonths = Math.floor(remainingDays / 30);
    this.totalDays = remainingDays % 30;
  },

      addNewPeriod() {
        this.periods.push({ start: '', end: '' });
      },
      removePeriod(index) {
        this.periods.splice(index, 1);
      },
    },
  };
  </script>
  
  <style scoped>
  .tax-calculator {
    padding: 20px;
    background-color: #fff;
    color: #333;
  }
  
  h1 {
    font-size: 24px;
    color: #31473a;
    margin-bottom: 20px;
  }
  
  .label {
    font-size: 16px;
    display: block;
    margin-bottom: 10px;
    color: #333;
  }
  
  .period {
    margin-bottom: 20px;
  }
  
  .date-input {
    width: 97.5%;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 10px;
    border: 1px solid #ccc;

  }
  
  button {
    width: 100%;
    padding: 12px;
    font-size: 18px;
    border: none;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .add-button {
    background-color: #31473a;
    color: #fff;
    width: 48%;
    margin-top: 5px;
  }
  
  .add-button:hover {
    background-color: #2b5c4a;
  }
  
  .calculate-button {
    background-color: #31473a;
    color: #fff;
    margin-top: 0;
    width: 48%;
    margin-top: 5px;
  }
  
  .calculate-button:hover {
    background-color: #45a049;
  }
  
  .remove-button {
    background-color: #47313E;
    margin-top: 10px;
    color: #fff;
  }
  
  .remove-button:hover {
    background-color: #47313E;
  }
  
  .result {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
    color: #31473a;
  }
  
  .error {
    color: #47313E;
  }
  
  /* Стили для зеленого календаря */
  .flatpickr-calendar.green-calendar {
    background-color: #d4edda;
  }
  
  .flatpickr-calendar.green-calendar .flatpickr-day {
    color: #155724;
  }
  
  .flatpickr-calendar.green-calendar .flatpickr-day:hover {
    background-color: #c3e6cb;
  }
  
  .buttons{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
  }


  /* Адаптивность */
  @media (max-width: 768px) {
    .tax-calculator {
      padding: 20px;
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
  