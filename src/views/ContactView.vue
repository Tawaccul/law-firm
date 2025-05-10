<template>
  <HeaderComponent />
  <div class="back-for-page">
    <section class="contacts-hero">
      <h1>Контактная информация</h1>
      <h2>Московская коллегия адвокатов "Солидарность"</h2>
    </section>
    <div class="content">
      <section class="contacts-list">
        <div class="contact-item">
          <i class="fas fa-phone"></i>
          <p>+7(800)-222-50-32</p>
        </div>
        <div class="contact-item">
          <i class="fas fa-map-marker-alt"></i>
          <p>Орликов переулок, дом 5, строение 2, офис 630; БЦ»Орликов Плаза»</p>
        </div>
        <div class="contact-item">
          <i class="fas fa-envelope"></i>
          <p>info@solidarnost.ru</p>
        </div>
      </section>
      <section class="map">
        <div id="map"></div>
      </section>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

/* global ymaps */

export default {
  name: 'ContactsView',
  components: {
    HeaderComponent,
    FooterComponent
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=ed1facd2-8166-427d-b2be-2363cb764ae0';
      script.onload = () => {
        ymaps.ready(() => {
          const map = new ymaps.Map('map', {
            center: [55.7724210689599,37.649722999999994],
            zoom: 16
          });

          const placemark = new ymaps.Placemark([55.7724210689599,37.649722999999994], {
            balloonContent: 'Орликов переулок, 5, строение 2'
          });

          map.geoObjects.add(placemark);
        });
      };
      document.head.appendChild(script);
    }
  }
};
</script>

<style scoped>
.back-for-page {
  background: #F8F9FA;
  padding: 0 100px;
  padding-top: 200px;
}

.contacts-hero {
  text-align: center;
  margin: 20px 0;
}

.contacts-hero h1 {
  font-size: 2em;
  margin-bottom: 10px;
}

.contacts-hero h2 {
  font-size: 1.4em;
  color: #555;
}

.content {
  display: flex;
}

.contacts-list {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  margin: 40px 0;
}

.contact-item {
  display: flex;
  align-items: start;
  gap: 10px;
  text-align: left;
  font-size: 1.2em;
}

.contact-item i {
  font-size: 1.5em;
  color: #555;
}

.map {
  flex: 1;
  display: flex;
  justify-content: center;
  margin: 40px 0;
}

#map {
  width: 100%;
  height: 450px;
}

@media (max-width: 768px) {
  .back-for-page {
    padding: 100px 20px;
  }

  #map {
    height: 300px;
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  .contacts-list {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: start;
    gap: 20px;
    margin: 0px 0;
  }
}
</style>
