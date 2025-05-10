<template>
  <HeaderComponent />
  <div class="back-for-page">

    <section class="services-hero">
      <h1>Услуги наших адвокатов</h1>
      <div class="service-types">
        <button :class="{ active: activeServiceType === 'individuals' }" @click="setServiceType('individuals')">Физическим лицам</button>
        <button :class="{ active: activeServiceType === 'businesses' }" @click="setServiceType('businesses')">Юридическим лицам</button>
      </div>
    </section>
    <section class="services-list">
      <div v-for="service in filteredServices" :key="service.id" class="service-card">
        <div class="service-card-top"> 
          <div class="icon-circle">
            <img :src="service.icon" alt="service icon" class="service-icon" />
          </div>
          <h2>{{ service.name }}</h2>
        </div>
        <button @click="viewDetails(service.articleId)" class="button-link">Подробнее</button>
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
  name: 'ServicesView',
  components: {
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      activeServiceType: 'individuals'
    };
  },
  computed: {
    ...mapState(['services']),
    filteredServices() {
      return this.services.filter(service => service.type === this.activeServiceType);
    }
  },
  methods: {
    setServiceType(type) {
      this.activeServiceType = type;
    },
    viewDetails(articleId) {
      this.$router.push({ name: 'article', params: { id: articleId } });
    }
  },
  created() {
    const serviceType = this.$route.query.type;
    if (serviceType) {
      this.setServiceType(serviceType);
    }
    this.$store.dispatch('fetchServices');
  }
};
</script>

<style scoped>
template {
  background: #F8F9FA;
}

.back-for-page {
  background: #F8F9FA;
  padding: 0 100px;
  padding-top: 200px;
}

.services-hero {
  text-align: center;
  margin: 20px 0;
}

.service-types {
  display: flex;
  justify-content: center;
}

.service-types button {
  padding: 15px 20px;
  cursor: pointer;
  background: #D6DAD8;
  font-family: 'Gill Sans';
  border: none;
  width: 100%;
  font-size: 24px;
  color: #31473A;
}

.service-types button.active {
  background-color: #31473A;
  color: #FFFFFF;
}

.services-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-content: center;
  padding-top: 20px;
}

.service-card-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 80%;
  height: 250px;
}

.service-card {
  padding: 20px;
  height: 350px;
  text-align: center;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  font-size: 2em;
  color: #31473A;
}

h2 {
  font-size: 1.4em;
  color: #31473A;
}

.service-icon {
  width: 50px;
  height: 50px;
  justify-self: center;
}

.button-link {
  background: #31473A;
  border: none;
  font-size: 18px;
  font-family: 'Gill Sans';
  color: #FFFFFF;
  padding: 10px 20px;
  margin-top: 40px;
}

.icon-circle {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 100%;
  width: 80px;
  height: 80px;
  display: grid;
  align-items: center;
  justify-content: center;
  background: #D6DAD8;
}

@media screen and (max-width: 768px) {
  .services-list {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .service-card {
    width: 90%;
    padding: 10px;
    height: 280px;

  }

  .icon-circle {
    width: 50px;
    height: 50px;
  }
  h2 {
  font-size: 1em;
  color: #31473A;
}

.button-link {
  background: #31473A;
  border: none;
  font-size: 14px;
  font-family: 'Gill Sans';
  color: #FFFFFF;
  padding: 10px 20px;
  margin-top: 40px;
}
.service-card-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.back-for-page {
  background: #F8F9FA;
  padding: 0 20px;
  padding-top: 100px;
}
.service-types button {
  padding: 15px 20px;
  cursor: pointer;
  background: #D6DAD8;
  font-family: 'Gill Sans';
  border: none;
  width: 100%;
  font-size: 14px;
}

}
</style>
