<template>
  <div class="court-fee-calculator">
    <h1>Калькулятор государственной пошлины</h1>

    <!-- Выбор суда -->
    <div class="form-group">
      <label for="court">Выберите суд:</label>
      <select id="court" v-model="selectedCourt" @change="resetCalculator">
        <option disabled value="">Не выбрано</option>
        <option v-for="court in courts" :key="court" :value="court">{{ court }}</option>
      </select>
    </div>

    <!-- Выбор типа заявления -->
    <div class="form-group">
      <label for="applicationType">Выберите тип заявления:</label>
      <select id="applicationType" v-model="applicationType" @change="onTypeChange">
        <option disabled value="">Не выбрано</option>
        <optgroup
          v-for="group in applicationGroups"
          :key="group.label"
          :label="group.label"
        >
          <option
            v-for="type in group.types"
            :key="type.id"
            :value="type.id"
          >{{ type.label }}</option>
        </optgroup>
      </select>
    </div>

    <!-- Ввод цены иска при необходимости -->
    <div class="form-group" v-if="currentType.requiresAmount">
      <label for="claimAmount">Сумма иска (руб):</label>
      <input
        id="claimAmount"
        type="number"
        v-model.number="claimAmount"
        placeholder="Введите сумму"
        min="0"
      />
    </div>

    <!-- Категория истца -->
    <div class="form-group" v-if="currentType.hasCategory">
      <label for="plaintiffCategory">Категория истца:</label>
      <select id="plaintiffCategory" v-model="plaintiffCategory">
        <option value="individual">Физическое лицо</option>
        <option value="organization">Юридическое лицо</option>
      </select>
    </div>

    <!-- Подтип для алиментов -->
    <div class="form-group" v-if="isAlimony">
      <label>Вариант взыскания алиментов:</label>
      <div>
        <label><input type="radio" value="children" v-model="alimonyType" /> На содержание детей</label>
        <label><input type="radio" value="children_and_self" v-model="alimonyType" /> На детей и истца</label>
      </div>
    </div>

    <!-- Льгота -->
    <div class="checkbox-group">
      <label>
        <input type="checkbox" v-model="isExempted" />
        <span class="custom-checkbox"></span>Освобожден от уплаты госпошлины
      </label>
    </div>

    <!-- Кнопка расчета -->
    <button type="button" @click="calculateFee">Рассчитать</button>

    <!-- Результат расчета -->
    <div v-if="result !== null" class="result">
      <p><strong>Сумма государственной пошлины:</strong> {{ formattedFee }} руб.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourtFeeCalculator',
  data() {
    return {
      courts: [
        'Московский городской суд',
        'Бабушкинский районный суд',
        'Басманный районный суд',
        'Бутырский районный суд',
        'Гагаринский районный суд',
        'Головинский районный суд',
        'Дорогомиловский районный суд',
        'Замоскворецкий районный суд',
        'Зеленоградский районный суд',
        'Зюзинский районный суд',
        'Измайловский районный суд',
        'Коптевский районный суд',
        'Кузьминский районный суд',
        'Кунцевский районный суд',
        'Лефортовский районный суд',
        'Люблинский районный суд',
        'Мещанский районный суд',
        'Нагатинский районный суд',
        'Никулинский районный суд',
        'Останкинский районный суд',
        'Перовский районный суд',
        'Преображенский районный суд',
        'Пресненский районный суд',
        'Савёловский районный суд',
        'Симоновский районный суд',
        'Солнцевский районный суд',
        'Таганский районный суд',
        'Тверской районный суд',
        'Тимирязевский районный суд',
        'Троицкий районный суд',
        'Тушинский районный суд',
        'Хамовнический районный суд',
        'Хорошёвский районный суд',
        'Черёмушкинский районный суд',
        'Чертановский районный суд',
        'Щербинский районный суд'
      ],
      applicationGroups: [
        {
          label: 'Исковые и административные заявления',
          types: [
            {
              id: 'non-valued',
              label: 'Имущественного характера, не подлежащего оценке и неимущественного характера',
              fees: { individual: 3000, organization: 20000 },
              requiresAmount: false,
              hasCategory: true
            },
            {
              id: 'property-valued',
              label: 'Имущественного характера, подлежащего оценке',
              requiresAmount: true,
              hasCategory: false
            }
          ]
        },
        {
          label: 'Семейные споры',
          types: [
            {
              id: 'divorce',
              label: 'Расторжение брака и иные семейные споры',
              fees: { individual: 5000, organization: 5000 },
              requiresAmount: false,
              hasCategory: true
            }
          ]
        },
        {
          label: 'Дела особого производства',
          types: [
            {
              id: 'special-production',
              label: 'Дела особого производства',
              fees: { individual: 3000, organization: 3000 },
              requiresAmount: false,
              hasCategory: true
            }
          ]
        },
        {
          label: 'Административные споры',
          types: [
            {
              id: 'admin-norm-partial',
              label: 'Оспаривание нормативных правовых актов',
              fees: { individual: 4000, organization: 20000 },
              requiresAmount: false,
              hasCategory: true
            },
            {
              id: 'admin-norm-full',
              label: 'Признание решений и действий незаконными',
              fees: { individual: 3000, organization: 15000 },
              requiresAmount: false,
              hasCategory: true
            }
          ]
        },
        {
          label: 'Жалобы',
          types: [
            {
              id: 'appeal-order',
              label: 'Апелляционная / частная жалоба',
              fees: { individual: 3000, organization: 15000 },
              requiresAmount: false,
              hasCategory: true
            }
          ]
        },
        {
          label: 'Прочие заявления',
          types: [
            {
              id: 'successorship',
              label: 'Правопреемство, кроме универсального',
              fees: { individual: 2000, organization: 15000 },
              requiresAmount: false,
              hasCategory: true
            },
            {
              id: 'writ-enforcement',
              label: 'Выдача исполнительных листов по решениям третейского суда',
              requiresAmount: true,
              hasCategory: false
            },
            {
              id: 'cancellation-arbitral',
              label: 'Отмена решения третейского суда',
              requiresAmount: true,
              hasCategory: false
            },
            {
              id: 'security',
              label: 'Обеспечение иска и меры обеспечения',
              fees: { individual: 10000, organization: 10000 },
              requiresAmount: false,
              hasCategory: true
            },
            {
              id: 'writ-duplicate',
              label: 'Дубликат исполнительного листа / пересмотр заочного решения',
              fees: { individual: 1500, organization: 1500 },
              requiresAmount: false,
              hasCategory: true
            },
            {
              id: 'missed-term',
              label: 'Восстановление пропущенного срока и сопутствующие',
              fees: { individual: 3000, organization: 3000 },
              requiresAmount: false,
              hasCategory: true
            },
            {
              id: 'review-new',
              label: 'Пересмотр по новым обстоятельствам',
              fees: { individual: 10000, organization: 10000 },
              requiresAmount: false,
              hasCategory: true
            },
            {
              id: 'alimony',
              label: 'Взыскание алиментов',
              requiresAmount: false,
              hasCategory: false
            }
          ]
        }
      ],
      selectedCourt: '',
      applicationType: '',
      claimAmount: 0,
      plaintiffCategory: 'individual',
      alimonyType: 'children',
      isExempted: false,
      result: null
    };
  },
  computed: {
    currentType() {
      for (const group of this.applicationGroups) {
        const found = group.types.find(t => t.id === this.applicationType);
        if (found) return found;
      }
      return {};
    },
    isAlimony() {
      return this.applicationType === 'alimony';
    },
    formattedFee() {
      return this.result !== null ? this.result.toFixed(2) : '0.00';
    }
  },
  methods: {
    resetCalculator() {
      this.applicationType = '';
      this.claimAmount = 0;
      this.plaintiffCategory = 'individual';
      this.alimonyType = 'children';
      this.isExempted = false;
      this.result = null;
    },
    onTypeChange() {
      this.claimAmount = 0;
      this.plaintiffCategory = 'individual';
      this.alimonyType = 'children';
      this.isExempted = false;
      this.result = null;
    },
    calculateFee() {
      if (!this.applicationType) return;
      if (this.isExempted) {
        this.result = 0;
        return;
      }
      let fee = 0;
      switch (this.applicationType) {
        case 'non-valued':
          fee = this.currentType.fees[this.plaintiffCategory];
          break;
        case 'property-valued':
          fee = this.calculateGeneralPropertyFee(this.claimAmount);
          break;
        case 'divorce':
        case 'special-production':
        case 'admin-norm-partial':
        case 'admin-norm-full':
        case 'appeal-order':
        case 'successorship':
        case 'security':
        case 'writ-duplicate':
        case 'missed-term':
        case 'review-new':
          fee = this.currentType.fees[this.plaintiffCategory];
          break;
        case 'writ-enforcement':
          fee = this.calculateGeneralPropertyFee(this.claimAmount) * 0.3;
          break;
        case 'cancellation-arbitral':
          fee = this.calculateGeneralPropertyFee(this.claimAmount);
          break;
        case 'alimony':
          fee = this.alimonyType === 'children' ? 150 : 300;
          break;
        default:
          fee = 0;
      }
      this.result = fee;
    },
    calculateGeneralPropertyFee(amount) {
      if (amount <= 100000) {
        return 4000;
      } else if (amount <= 300000) {
        return 4000 + (amount - 100000) * 0.03;
      } else if (amount <= 500000) {
        return 10000 + (amount - 300000) * 0.025;
      } else if (amount <= 1000000) {
        return 15000 + (amount - 500000) * 0.02;
      } else if (amount <= 3000000) {
        return 25000 + (amount - 1000000) * 0.01;
      } else if (amount <= 8000000) {
        return 45000 + (amount - 3000000) * 0.007;
      } else if (amount <= 24000000) {
        return 80000 + (amount - 8000000) * 0.0035;
      } else if (amount <= 50000000) {
        return 136000 + (amount - 24000000) * 0.003;
      } else if (amount <= 100000000) {
        return 214000 + (amount - 50000000) * 0.002;
      } else {
        return Math.min(314000 + (amount - 100000000) * 0.0015, 900000);
      }
    }
  }
};
</script>

<style scoped>
.court-fee-calculator {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
}
h1 {
  text-align: left;
  color: #31473A;
  font-size: 24px;
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 15px;
}
.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ced4da;
  font-size: 16px;
}
.checkbox-group {
  margin-bottom: 15px;
}
.checkbox-group input[type="checkbox"] {
  margin-right: 10px;
  accent-color: #31473A;
}
button {
  width: 100%;
  padding: 12px;
  background-color: #31473A;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}
button:hover {
  background-color: #263e33;
}
.result {
  margin-top: 20px;
  padding: 15px;
  background-color: #dff0d8;
  color: #3c763d;
  text-align: center;
}
</style>
