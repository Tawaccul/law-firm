<template>
    <section class="reviews">
      <h2 class="section-title">Отзывы наших клиентов</h2>
      <Splide :options="options" class="review-splide">
        <SplideSlide
          v-for="(review, index) in reviews"
          :key="index"
          class="review-slide"
        >
          <div class="review-card">
            <div class="rating">
              <span v-for="n in 5" :key="n" class="star">★</span>
            </div>
            <p class="quote">{{ review.text }}</p>
            <div class="author">— {{ review.author }}</div>
          </div>
        </SplideSlide>
      </Splide>
    </section>
  </template>
  
  <script>
  import { Splide, SplideSlide } from '@splidejs/vue-splide';
  import '@splidejs/vue-splide/css';
  
  export default {
    name: 'ReviewsSlider',
    components: { Splide, SplideSlide },
    data() {
      return {
        options: {
          type: 'loop',
          perPage: 5,
          gap: '20px',
          autoplay: true,
          interval: 3000,
          pauseOnHover: true,
          arrows: true,
          pagination: true,
          breakpoints: {
            768: { perPage: 1 }
          }
        },
        reviews: [
          { text: 'Хочу искренне поблагодарить за проделанную работу и помощь в решении проблемы, я на самом деле, безмерно вам благодарен, потому что вы буквально спасли мне жизнь, спасибо!!', author: 'Владимир' },
          { text: 'Купил мягкую мебель, после доставки которой были обнаружены повреждения. Продавец отказывался забирать её обратно. Обратился в МКА «Солидарность», помогли составить претензию — и продавец вернул деньги! Спасибо большое!', author: 'Арсений' },
          { text: 'Доверяю адвокатам МКА «Солидарность» все свои юридические дела уже много лет! У меня есть фирма, которая стоит на обслуживании у МКА «Солидарность»; они решают все юридические вопросы, в том числе представляют наши интересы в судах. По моим рекомендациям многие знакомые обращались к адвокатам коллегии и все остались довольны! Рекомендую всем!', author: 'Фарид' },
          { text: 'Мне понравилась доброжелательность и помощь. Я обращалась за юридической консультацией по открытию розничного табачного магазина. Юрист Школьников Павел дал понятные и доступные ответы. Сама организация находится в бизнес-центре, кабинет уютный и чистый, без посторонних запахов. Меня все устроило.', author: 'Дарья' },
          { text: 'Милана — профессионал с большой буквы. Умница, всё по существу, выиграла дело. Грамотно подошла к проблеме, исправила ошибки предыдущих адвокатов и несоответствие решений судов при обжаловании. Сильная!', author: 'Светлана Махова' },
          { text: 'Хочу поблагодарить Салпагарова Исмаила Ахматовича за помощь в сложной ситуации по вине одного из московских отелей. Несмотря на прогноз, он подготовил досудебную претензию и исковое, добился взыскания компенсации морального вреда. Большое спасибо!', author: 'Виктория Владимировна' },
          { text: 'Хочу выразить благодарность адвокату Валерию Александровичу Альбрехту за профессиональную помощь в сложнейшей ситуации. Грамотные действия помогли выиграть суд, и теперь мой брат на свободе. Ещё раз СПАСИБО!', author: 'Наталья' },
          { text: 'Долго искал доступную и качественную помощь, наткнулся на Мурада Умахановича, специалиста по уголовному праву. Очень ответственный и квалифицированный специалист, который серьёзно относится к своему делу. Рекомендую!', author: 'Сергей' },
          { text: 'Отдельная благодарность лучшему юристу и профессионалу своего дела — адвокату Салпагарову И.А. Благодаря его усидчивости удалось разрешить сложный вопрос с изъятым имуществом, требующий глубоких знаний и коммуникативных способностей. Всё вернули обратно, за что ему низкий поклон.', author: 'Константин' },
          { text: 'Константин Борисович — профессионал, сочетающий юридическую и психологическую грамотность, что важно при ведении клиента. Готовность защищать 24/7, быть на связи в срочных вопросах. Для него нет фразы «мой рабочий день закончился». Обращайтесь к тому, кто знает всё до мелочей и вытащит вас из самых сложных ситуаций.', author: 'Маргарита' },
          { text: 'Огромное спасибо адвокату Милане Дадашевой! Благодаря её профессионализму и настойчивости я вернула свою квартиру!', author: 'Ирина' }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .reviews {
    padding: 60px 20px;
    margin-top: 20px;
    background: #F8F9FA;
    text-align: center;
  }
  
  .section-title {
    font-size: 2em;
    margin-bottom: 40px;
    color: #2c3e50;
  }
  
  .review-splide {
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    overflow: visible; /* чтобы тень не обрезалась */
  }
  
  .review-slide {
    display: flex;
    justify-content: center;
  }
  
  .review-card {
    background: white;
    padding: 30px 20px;
    margin-bottom: 10px;
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.05);
    max-width: 320px;
    min-height: 320px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.3s ease;
    text-align: left;
  }
  
  .review-card:hover {
    transform: translateY(-5px);
  }
  
  .rating {
    margin-bottom: 10px;
  }
  
  .star {
    font-size: 1.2em;
    color: #f1c40f;
    margin-right: 2px;
  }
  
  .quote {
    font-size: 1em;
    color: #555;
    line-height: 1.6;
    margin: 20px 0;
    flex-grow: 1;
  }
  
  .author {
    font-weight: bold;
    font-size: 0.95em;
    color: #333;
    text-align: right;
    margin-top: 15px;
  }
  
  /* Стили стрелок Splide */
  .review-splide ::v-deep .splide__arrow {
    background: none;
    color: #47313E;
  }
  
  /* Стили точек пагинации */
  .review-splide ::v-deep .splide__pagination__page {
    background: #47313E; /* цвет навигационных кругов */
  }
  
  @media screen and (max-width: 768px) {
    .review-splide {
      padding: 0 10px;
    }
    .review-card {
      max-width: 100%;
      padding: 20px;
      min-height: auto;
    }
  }
  </style>
  