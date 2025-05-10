<template>
  <HeaderComponent />
  <div class="back-for-page">
    <section class="lawyers-hero">
      <h1>Наши адвокаты</h1>
    </section>
    <section class="lawyers-list">
      <div
        v-for="lawyer in lawyers"
        :key="lawyer.id"
        class="lawyer-card-container"
        :class="{ expanded: activeLawyerId === lawyer.id }"
      >
        <div class="lawyer-card">
          <div class="lawyer-card-left">
            <img :src="lawyer.photo" alt="lawyer photo" />
          </div>
          <div class="lawyer-card-right">
            <div class="right">
              <h2>{{ lawyer.name }}</h2>
            <p>{{ lawyer.profession }}</p>
            <p>Профессиональное направление:</p>
            <p>{{ lawyer.specialty }}</p>

            </div>
            <button @click="toggleDetails(lawyer.id)">
              {{ activeLawyerId === lawyer.id ? 'Закрыть' : 'Подробнее' }}
            </button>
          </div>
        </div>
        <transition name="fade">
          <div
            v-if="activeLawyerId === lawyer.id"
            class="lawyer-details"
            ref="lawyerDetails"
          >
            <div v-html="lawyer.description"></div>
          </div>
        </transition>
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
  name: 'LawyersView',
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      activeLawyerId: null,
    };
  },
  computed: {
    ...mapState(['lawyers']),
  },
  methods: {
    toggleDetails(id) {
      this.activeLawyerId = this.activeLawyerId === id ? null : id;
    },
  },
  created() {
    this.$store.dispatch('fetchLawyers').then(() => {
      console.log('Lawyers in component created hook:', this.lawyers);
    });
  },
};
</script>

<style scoped>
.back-for-page {
  background: #f8f9fa;
  padding: 0 100px;
  padding-top: 180px;
}

.lawyers-hero {
  text-align: center;
  margin: 20px 0;
}

.lawyers-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 20px;
}

.lawyer-card-container {
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  background: #fff;
  transition: max-height 0.3s ease, padding 0.3s ease;
  overflow: hidden;
}

.lawyer-card-container.expanded {
  max-height: none;
  padding-bottom: 20px;
}

.lawyer-card {
  display: flex;
  background: #ffffff;
  padding: 20px;
  align-items: flex-start;
}

.lawyer-card-left {
  margin-right: 20px;
}

h1 {
  font-size: 2em;
  color: #31473a;
}

.right{
  height: 140px;
}

.lawyer-card-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
}

h2 {
  margin: 0;
  color: #31473a;
}

.lawyer-card img {
  width: 170px;
  height: 200px;
  object-fit: cover;
  object-position: top;
}

.lawyer-card button {
  background-color: #47313e;
  color: #ffffff;
  padding: 10px 20px;
  margin-top: 20px;
  width: 200px;
  border: none;
  cursor: pointer;
  font-family: 'Gill Sans';
  display: block;
}

.lawyer-card button:hover {
  background-color: #6a5662;
}

.lawyer-details {
  padding: 0px 20px;
}


.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 768px) {
  .back-for-page {
  background: #f8f9fa;
  padding: 0 20px;
  padding-top: 100px;
}
.lawyer-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 20px;
  align-items: flex-start;
}
.lawyers-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
h2 {
  margin-top: 10px;
  color: #31473a;
}
.lawyer-card-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 240px;
}

}
</style>
