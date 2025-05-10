<template>
  <section class="advantages">
    <div v-for="(advantage, index) in advantages" :key="index" :class="['advantage', index % 2 === 0 ? 'green' : 'purple']">
      <img :src="advantage.icon" alt="Иконка" class="icon">
      <h2 v-html="splitTitle(advantage.title)"></h2>
      <p>{{ advantage.description }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AdvantagesComponent',
  data() {
    return {
      advantages: [
        { icon: require('@/assets/time.svg'), title: "Работаем <br>с 2003 года", description: "Клиент может рассчитывать на квалифицированную помощь Адвокатов, имеющих многолетний стаж профессиональной адвокатсткой деятельности в различных отраслях права" },
        { icon: require('@/assets/location.svg'), title: "Расположение <br>офиса", description: 'Офис расположен в бизнес центре "Орликов Плаза", что обеспечивает удобство и доступность для клиентов' },
        { icon: require('@/assets/twentysevenhours.svg'), title: "Круглосуточная консультация", description: "Клиенты могут получить cрочный выезд адвоката 24/7 и консультацию в любое время суток по предварительной записи" },
        { icon: require('@/assets/secure.svg'), title: "Ответственный <br>подход", description: "Мы работаем так, чтобы нам доверяли, к нам возвращались и нас рекомендовали!" },

      ]
    };
  },
  methods: {
    splitTitle(title) {
      return title.replace('<br>', '<br>');
    }
  }
};
</script>

<style scoped>
.advantages {
  position: relative;
  top: -20vh; /* Поднимаем блок на 20% высоты видимой области */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto; /* Центрируем блок по горизонтали */
  padding: 0 100px;
}

.advantage {
  flex: 1 1 20%; /* Изменение ширины блока в зависимости от экрана */
  padding: 60px 30px;
  text-align: center;
}

.icon {
  height: 50px; /* Высота изображения иконки */
  object-fit: cover; /* Заполнение изображения в блоке */
}

.green {
  background-color: #31473A; /* Зеленый цвет для четных блоков (индексы 0 и 2) */
  color: white;
}

.purple {
  background-color: #47313E; /* Фиолетовый цвет для нечетных блоков (индексы 1 и 3) */
  color: white;
}
@media screen and (max-width: 768px) {

  .advantages {
  position: relative;
  top: -10vh; /* Поднимаем блок на 20% высоты видимой области */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto; /* Центрируем блок по горизонтали */
  padding: 0 0px;
}
.advantage {
  flex: 1 1 100%; /* Изменение ширины блока в зависимости от экрана */
  padding: 40px 30px;
  text-align: center;
}


}
</style>
