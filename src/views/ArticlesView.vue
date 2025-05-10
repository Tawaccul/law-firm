<template>
  <div>
    <HeaderComponent />
    <section class="content">
      <div class="sidebar">
        <div class="category">
          <div class="title">
            <h2>Физическим лицам</h2>
          </div>
          <ul>
            <li
              v-for="service in individualServices"
              :key="service.id"
              @click="navigateToArticle(service.articleId)"
            >
              {{ service.name }}
            </li>
          </ul>
        </div>
        <div class="category">
          <div class="title">
            <h2>Юридическим лицам</h2>
          </div>
          <ul>
            <li
              v-for="service in businessServices"
              :key="service.id"
              @click="navigateToArticle(service.articleId)"
            >
              {{ service.name }}
            </li>
          </ul>
        </div>
      </div>
      <div class="articles">
        <div v-if="loading" class="loading">Загрузка статьи...</div>
        <div v-else-if="article" class="article">
          <div class="article-header">
            <h1 v-if="article.category === 'individuals'">Физическим лицам</h1>
            <h1 v-else-if="article.category === 'businesses'">Юридическим лицам</h1>
          </div>
          <div class="article-block">
            <h1>{{ article.title }}</h1>
            <div class="text-block" v-html="article.content"></div>
          </div>
          <div class="article-block" v-if="article.title2 && article.content2">
            <h1>{{ article.title2 }}</h1>
            <div class="text-block" v-html="article.content2"></div>
          </div>
        </div>
        <div v-else>
          <p>Статья не найдена.</p>
        </div>
      </div>
    </section>
    <FooterComponent />
  </div>
</template>

<script>
import { db } from '@/store/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  name: 'ArticlesView',
  components: {
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      article: null,
      individualServices: [],
      businessServices: [],
      loading: true,
    };
  },
  async mounted() {
    await this.fetchServices();
    this.updateArticle();
    document.dispatchEvent(new Event('render-event'));
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler() {
        this.updateArticle();
      }
    }
  },
  methods: {
    navigateToArticle(articleId) {
      this.$router.push({ path: `/article/${articleId}` });
    },
    async fetchServices() {
      try {
        const servicesRef = collection(db, 'services');
        const snapshot = await getDocs(servicesRef);
        snapshot.forEach(doc => {
          const svc = doc.data();
          if (svc.type === 'individuals') {
            this.individualServices.push({ id: doc.id, ...svc });
          } else if (svc.type === 'businesses') {
            this.businessServices.push({ id: doc.id, ...svc });
          }
        });
      } catch (e) {
        console.error('Ошибка при загрузке услуг:', e);
      }
    },
    async updateArticle() {
      const id = this.$route.params.id;
      if (!id) {
        this.article = null;
        this.loading = false;
        return;
      }
      this.loading = true;
      try {
        const articlesRef = collection(db, 'articles');
        const q = query(articlesRef, where('id', '==', id));
        const snap = await getDocs(q);
        this.article = snap.empty ? null : snap.docs[0].data();
      } catch (e) {
        console.error('Ошибка при загрузке статьи:', e);
        this.article = null;
      }
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.content {
  display: flex;
  padding: 0 100px;
  padding-top: 200px;
  background: #f9f9f9;
}

h1 {
  color: #31473A;
}

.title {
  background: #D6DAD8;
  padding: 10px 0;
  text-align: center;
  color: #31473A;
}

.sidebar {
  display: flex;
  flex-direction: column;
  min-width: 220px;
  margin-top: 20px;
  gap: 20px;
}

.category {
  background-color: #ffffff;
}

.category h2 {
  font-size: 18px;
  margin: 0 0 10px;
}

.category ul {
  list-style: none;
  padding: 0;
}

.category li {
  cursor: pointer;
  color: #000;
  margin: 8px 20px;
  word-break: break-word;
  font-size: 16px;
}

.category li:hover {
  text-decoration: underline;
}

.articles {
  flex: 1;
  padding: 20px;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: #666;
}

.article-header {
  margin-bottom: 20px;
}

.article-block {
  margin-bottom: 20px;
  background: #fff;
  padding: 30px 50px;
  max-width: 860px;
  word-break: break-word;
}

.article-block h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.text-block {
  font-size: 16px;
  line-height: 1.5;
}

/* Адаптив для мобильных устройств */
@media (max-width: 767px) {
  .content {
    flex-direction: column;
    padding: 0 16px;
    padding-top: 120px;
  }
  .sidebar {
    min-width: auto;
    margin: 0 0 20px;
  }
  .category h2 {
    font-size: 16px;
    margin-bottom: 8px;
  }
  .category li {
    margin: 6px 16px;
    font-size: 14px;
  }
  .articles {
    padding: 0;
  }
  .article-block {
    padding: 20px;
    margin-bottom: 30px;
    max-width: 100%;
  }
  .article-block h1 {
    font-size: 20px;
    margin-bottom: 8px;
  }
  .text-block {
    font-size: 14px;
    line-height: 1.4;
  }
  .loading {
    font-size: 16px;
  }
}
</style>
