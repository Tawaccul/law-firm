<template>
  <section class="lawyers">
    <h2>Наши адвокаты</h2>
    <div class="lawyers-container">
      <div v-for="(lawyer, index) in lawyers" :key="index" class="lawyer">
        <div class="lawyer-image">
          <img :src="lawyer.image" :alt="lawyer.name" />
          <p class="lawyer-name">{{ lawyer.name }}</p>
        </div>
      </div>
    </div>
    <router-link to="/lawyers" class="but">
    <button @click="viewAllLawyers">Посмотреть всех адвокатов</button>
    </router-link>
  </section>
</template>

<script>
export default {
  name: 'LawyersComponent',
  data() {
    return {
      lawyers: [
        { name: "Рогозин Константин Борисович", image: require('@/assets/rogozin.png') },
        { name: "Кучмезов Мажир Зейтунович", image: require('@/assets/law2.png') },
        { name: "Чадаев Вадим Валерьеви", image: require('@/assets/law3.png') },
      ]
    };
  },
  methods: {
    viewAllLawyers() {
      // Логика для просмотра всех адвокатов
    }
  }
};
</script>

<style scoped>
.lawyers {
  text-align: center;
  background: #F8F9FA;
  margin-top: 0px;
  margin-bottom: 60px;
  padding: 20px 100px;
}

.lawyers-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.lawyer {
  flex: 1 0 calc(33.333% - 20px);
  box-sizing: border-box;
}

.lawyer-image {
  position: relative;
  height: 100%;
}

h2 {
  color: #31473A;
  margin: 40px auto;
  font-size: 2em;
}

.lawyer-name {
  position: absolute;
  bottom: 5px;
  left: 33px;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4); /* Полупрозрачный фон для имени */
  color: white;
  padding: 20px;
  text-align: left;
  font-size: 18px;
  margin: 0;
  width: 74%;
}

button {
  display: block;
  margin: 40px auto;
  padding: 15px 30px;
  background: #31473A;
  color: white;
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-size: 18px;
  font-family: 'Gill Sans';
}
.but{
  text-decoration: none;
}


@media screen and (max-width: 768px) {
  .lawyers {
  text-align: center;
  background: #F8F9FA;
  padding: 20px 0px;
  width: 100%;
  padding-bottom: 180px;
}

.lawyer-name {
  position: absolute;
  bottom: 5px;
  left: 40px;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4); /* Полупрозрачный фон для имени */
  color: white;
  padding: 20px;
  text-align: left;
  font-size: 18px;
  margin: 0;
  width: 72%;
}

}
</style>
