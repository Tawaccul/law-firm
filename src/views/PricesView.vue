<!-- <template>
    <HeaderComponent />
    <div class="back-for-page">
      <section class="prices-hero">
        <h1>Цены на услуги адвокатов</h1>
        <h4>Ставки вознаграждения за оказываемую юридическую помощь в Московской коллегии адвокатов "Солидарность"</h4>
      </section>
      <section class="prices-list">
        <div class="price-cards-header">
          <div class="price-card-left-h2">
            <h2>Характер поручения</h2>
          </div>
          <div class="price-card-right-h2">
            <h2>Мин. ставка</h2>
          </div>
        </div>
        <div v-for="price in uniquePrices" :key="price.id" class="price-card">
          <div class="price-card-left">
            <h3>{{ price.name }}</h3>
          </div>
          <div class="price-card-right">
            <p>от {{ price.price }} руб.</p>
          </div>
        </div>
      </section>
      <FooterComponent />
    </div>
  </template>
  
  <script>
  import HeaderComponent from '@/components/HeaderComponent.vue';
  import FooterComponent from '@/components/FooterComponent.vue';
  import { mapState } from 'vuex';
  
  export default {
    name: 'PricesView',
    components: {
      HeaderComponent,
      FooterComponent
    },
    computed: {
      ...mapState(['prices']),
      uniquePrices() {
        // Фильтруем уникальные услуги по "Характер поручения" и "Мин. ставка"
        const seen = new Set();
        return this.prices.filter(price => {
          const key = `${price.name}-${price.price}`;
          if (seen.has(key)) {
            return false;
          }
          seen.add(key);
          return true;
        });
      }
    },
    created() {
      this.$store.dispatch('fetchPrices').then(() => {
        console.log("Prices in component created hook:", this.prices);
      });
    }
  };
  </script>
  
  <style scoped>
  .back-for-page {
    background: #F8F9FA;
    padding: 0 100px;
    padding-top: 200px;
  }
  
  .prices-hero {
    text-align: center;
    margin: 20px 0;
  }
  
  .prices-hero h1 {
    color: #31473A;
  }
  
  .prices-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .price-cards-header {
    display: flex;
    border-bottom: 2px solid #DDD;
  }
  
  h1{
  font-size: 2em;
  color: #31473A;
}
  .price-card-left-h2 {
    padding-left: 20px;
    flex: 5;
    color: #31473A;

  }
  .price-card-right-h2 {
    flex: 1;
    color: #31473A;
    text-align: left;
  }
  
  .price-card {
    display: flex;
  }
  
  .price-card-left {
    flex: 5; /* Занимает 3/4 ширины */
    background: #FFFFFF;
    margin-right: 30px;
    padding: 20px;
    color: #31473A;
  }
  
  .price-card-right {
    flex: 1; /* Занимает 1/4 ширины */
    background: #FFFFFF;
    padding: 20px;
    color: #31473A;
    text-align: center; /* Выравнивание текста по центру */
    align-content: center;
  }
  
  .price-card-left h3,
  .price-card-right p {
    margin: 0; /* Убирает отступы у заголовка и параграфа */
  }

  @media screen and (max-width: 768px) {
    .back-for-page {
    background: #F8F9FA;
    padding: 0 20px;
    padding-top: 100px;
  }
    .prices-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
    .price-card-left-h2 {
    padding-left:0px;
    flex: 5;
    color: #31473A;
    font-size: 14px;

  }
  .price-card-right-h2 {
    padding-left:0px;
    flex: 2;
    color: #31473A;
    font-size: 14px;

  }


  .price-card-right {
    flex: 2; /* Занимает 1/4 ширины */
    background: #FFFFFF;
    padding: 10px;
    color: #31473A;
    text-align: center; /* Выравнивание текста по центру */
    align-content: center;
  }
  
}
  </style>
   -->