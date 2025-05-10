<template>
  <section class="services">
    <h2 class="services-title">Услуги наших адвокатов</h2>

    <div class="service-types">
      <button :class="{ active: activeServiceType === 'individuals' }" @click="setServiceType('individuals')">Физическим лицам</button>
      <button :class="{ active: activeServiceType === 'businesses' }" @click="setServiceType('businesses')">Юридическим лицам</button>
    </div>

    <div class="service-grid">
      <div v-for="(service, index) in filteredServices" :key="index" class="service">
        <div class="circle green">
          <img :src="service.icon" alt="Иконка" class="icon">
        </div>
        <h3 v-html="splitTitle(service.title)"></h3>
      </div>
    </div>

    <!-- Кнопка "Перейти к услугам" -->
    <router-link to="/services">
      <button class="go-to-services">Перейти к услугам</button>
    </router-link>
  </section>
</template>

<script>
export default {
  name: 'ServicesComponent',
  data() {
    return {
      activeServiceType: 'individuals', // По умолчанию показываем услуги для физических лиц
      services: [
        { icon: require('@/assets/icon6.png'), title: "Адвокат по <br>гражданским <br>делам", type: 'individuals' },
        { icon: require('@/assets/icon1.png'), title: "Адвокат по <br>уголовным<br> делам", type: 'individuals' },
        { icon: require('@/assets/icon3.png'), title: "Адвокат по <br>арбитражным <br>вопросам", type: 'businesses' },
        { icon: require('@/assets/icon4.png'), title: "Адвокат по <br>семейным<br>спорам", type: 'individuals' },
        { icon: require('@/assets/icon5.png'), title: "Адвокат по <br> жилищным <br> вопросам", type: 'individuals' },
        { icon: require('@/assets/nalog.svg'), title: "Адвокат по <br> налоговым <br> спорам", type: 'businesses' },
        { icon: require('@/assets/hands.svg'), title: "Абонентское <br>юридическое<br> обслуживание ", type: 'businesses' },
        { icon: require('@/assets/icon14.png'), title: "Адвокат по <br>наследственным  <br>делам ", type: 'individuals' },
        { icon: require('@/assets/icon8.png'), title: "Помощь <br>адвоката <br>за рубежом", type: 'individuals' },
        { icon: require('@/assets/defend.svg'), title: "Сопровождение <br> налоговых<br> проверок", type: 'businesses' },
        { icon: require('@/assets/icon2.png'), title: "Уголовно-правовая <br>защита <br>бизнеса ", type: 'businesses' },
        { icon: require('@/assets/bankrotstvo.svg'), title: "Банкротство<br> юридических<br> лиц ", type: 'businesses' },
      
      ]
    };
  },
  computed: {
    filteredServices() {
      return this.services.filter(service => service.type === this.activeServiceType);
    }
  },
  methods: {
    setServiceType(type) {
      this.activeServiceType = type;
    },
    splitTitle(title) {
      return title.replace('<br>', '<br>');
    }
  }
};
</script>

<style scoped>
.services {
  margin-top: -120px;
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 10px;
  text-align: center;
}

.services-title {
  margin-bottom: 30px;
  color: #31473A;
  font-size: 2em;
}

.service-types {
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
}

.service-types button {
  padding: 15px 20px;
  cursor: pointer;
  background: #D6DAD8;
  font-family: 'Gill Sans';
  border: none;
  width: 250px;
  font-size: 18px;
  color: #31473A;
  margin: 0 0px;
}

.service-types button.active {
  background-color: #31473A;
  color: #FFFFFF;
}

.service-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(6, 1fr);
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
}

.service {
  text-align: center;
  margin-right: 20px;
}

.circle {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0px;
}

.icon { 
  height: 50px;
}

.green {
  background-color: #31473A;
  color: white;
}

.go-to-services {
  margin-top: 40px;
  padding: 15px 30px;
  background-color: #47313E;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-family: 'Gill Sans';
  width: 250px;
  justify-self: center;
}

@media screen and (max-width: 768px) {
  .service-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    width: auto;
  }
 
  .circle {
    width: 100px;
    height: 100px;
    background-color: #31473A;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0px;
  }

  .icon { 
    height: 35px;
  }

  .service {
    display: flex;
    margin-left: 28px;
    flex-direction: column;
    justify-content: start;
    text-align: center;
    align-items: center;
    width: 120px;
  }

  .services-title {
    font-size: 1.6em;
  }
  .services{
    width: auto;
    margin-top: -80px;
  }

  .service-types button {
    font-size: 14px;
    width: 180px;
  }
}
</style>
