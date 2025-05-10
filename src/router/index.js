// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import ArticlesView from '@/views/ArticlesView.vue';
import ServicesView from '@/views/ServicesView.vue';
import HomeView from '@/views/HomeView.vue';
import LawyersView from '@/views/LawersView.vue';
import ContactView from '@/views/ContactView.vue';
import AdminView from '@/views/AdminView.vue';
import CalculatorsPage from '@/views/Calculators.vue';
import TemplatesPage from '@/views/TemplatesView.vue';

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    meta: {
      title: 'Московская коллегия адвокатов Солидарность',
      description: 'Получите квалифицированную помощь Адвокатов, имеющих многолетний стаж профессиональной адвокатсткой деятельности в различных отраслях права',
    }
  },
  {
    path: '/services',
    name: 'services',
    component: ServicesView,
    props: true,
    meta: {
      title: 'Услуги адвокатов МКА Солидарность',
      description: 'Услуги: Адвокат по гражданским делам, Адвокат по уголовным делам, Адвокат по семейным спорам, Адвокат по жилищным вопросам, Адвокат по наследственным делам, Адвокат по мошенничеству',
    }
  },
  {
    path: '/article/:id',
    name: 'article',
    component: ArticlesView,
    props: true,
    meta: {
      title: 'Полезные статьи от МКА Солидарность',
      description: 'Чем поможет адвокат при земельных спорах? Чем поможет адвокат по мошенничеству? Чем помогает адвокат заключенным? Чем поможет налоговый адвокат?',
    }
  },
  {
    path: '/lawyers',
    name: 'LawyersView',
    component: LawyersView,
    props: true,
    meta: {
      title: 'Адвокаты - Московская коллегия адвокатов Солидарность',
      description: 'Познакомьтесь с нашими опытными адвокатами - Дадашева Милана Шарпудиновна, Рогозин Константин Борисович, Алиев Мурад Умаханович, Боташев Рашид Ахматович, Кучмезов Мажир Зейтунович, Чадаев Вадим Валерьевич',
    }
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: ContactView,
    props: true,
    meta: {
      title: 'Контакты - Московская коллегия адвокатов',
      description: 'Свяжитесь с нами для получения консультации или записи на прием. Консультация адвоката бесплатна! На связи круглосуточно. ',
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    props: true,
    meta: {
      title: 'Админ-панель',
      description: 'Административная панель для управления сайтом.',
    }
  },
  {
    path: '/calculators',
    name: 'calculators',
    component: CalculatorsPage,
    props: true,
    meta: {
      title: 'Юридические калькуляторы',
      description: 'Калькултор НДС, Калькулятор НДФЛ, Калькулятор налога на УСН, Калькулятор земельного налога, Калькулятор алиментов, Калькулятор транспортного налога, Калькулятор стажа работы',
    }
  },
  {
    path: '/templates',
    name: 'templates',
    component: TemplatesPage,
    props: true,
    meta: {
      title: 'Шаблоны договоров',
      description: 'Образец претензии в Вайлдберризю. В нашей практике довольно часто встречаем случаи, когда клиенты крупных маркетплейсов и агрегаторов не отвечают по своим обязательствам и в нарушение Закона О Защите прав потребителей не выполняют требования Закона',
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Установка динамических мета-тегов
router.afterEach((to) => {
  const defaultTitle = 'Московская коллегия адвокатов - Солидарность';
  const defaultDescription = 'Юридические услуги для физических и юридических лиц.';
  
  document.title = to.meta.title || defaultTitle;
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) {
    descriptionMeta.setAttribute('content', to.meta.description || defaultDescription);
  }
});

export default router;
