<template>
  <header :class="{ 'header-hidden': isHeaderHidden }">
    <div class="top-bar" ref="topBar">
      <div class="logo"><img src="@/assets/logotype.png" alt="Logo"></div>
      <button @click="openModal" class="contact-button">Обратная связь</button>
      <button @click="toggleMobileMenu" class="mobile-menu-button">☰</button>
    </div>
    <nav ref="nav" :class="['fixed-nav', { 'mobile-nav-open': isMobileMenuOpen }]">
      <ul>
        <li v-for="(section, index) in sections" :key="section" class="nav-item"
            @click="section === 'Услуги' ? navigateToServices(section) : hideDropdownImmediately"
            @mouseover="index === 1 ? showDropdown() : null"
            @mouseleave="index === 1 ? hideDropdownWithDelay() : null">
          <router-link 
            :to="getRoute(section)" 
            class="nav-link" 
            active-class="active-link"
          >
            {{ section }}
          </router-link>
        </li>
        <li class="search-container nav-item">
          <div class="search-icon">
            <img src="@/assets/search.png">
          </div>
          <div class="search-box">
            <input type="text" placeholder="Поиск..." v-model="searchQuery" @input="handleSearch" />
          </div>
          <div v-if="searchResultsVisible" class="search-results">
            <div v-if="filteredArticles.length">
              <h3>Статьи</h3>
              <ul>
                <li v-for="article in filteredArticles" :key="article.id">
                  <router-link :to="{ name: 'article', params: { id: article.id } }" class="nav-link">
                    {{ article.name }}
                  </router-link>
                </li>
              </ul>
            </div>
            <div v-if="filteredServices.length">
              <h3>Услуги</h3>
              <ul>
                <li v-for="service in filteredServices" :key="service.id">
                  <router-link :to="{ name: 'article', params: { id: service.articleId } }" class="nav-link">
                    {{ service.name }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
      <div v-if="dropdownVisible" ref="dropdownMenu" class="dropdown-menu" @mouseover="showDropdown" @mouseleave="hideDropdownWithDelay">
        <div class="dropdown-section">
          <h3>Для физ. лиц</h3>
          <ul>
            <li v-for="service in individualServices" :key="service.id">
              <router-link :to="{ name: 'article', params: { id: service.articleId } }" class="nav-link">
                {{ service.name }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="dropdown-section">
          <h3>Для юр. лиц</h3>
          <ul>
            <li v-for="service in businessServices" :key="service.id">
              <router-link :to="{ name: 'article', params: { id: service.articleId } }" class="nav-link">
                {{ service.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <contact-modal :visible="isModalVisible" @close="closeModal"></contact-modal>
  </header>
</template>

<script>
import { db } from '@/store/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ContactModal from '@/components/ContactModel.vue';

export default {
  components: {
    ContactModal
  },
  data() {
    return {
      // Добавили новый пункт "Шаблоны договоров"
      sections: ['Главная', 'Услуги', 'Адвокаты', 'Шаблоны договоров', 'Контакты', 'Калькуляторы'],
      dropdownVisible: false,
      hideTimeout: null,
      isHeaderHidden: false,
      lastScrollTop: 0,
      individualServices: [],
      businessServices: [],
      articles: [],
      searchQuery: '',
      searchResultsVisible: false,
      filteredArticles: [],
      filteredServices: [],
      isMobileMenuOpen: false,
      isModalVisible: false,
    };
  },
  async mounted() {
    window.addEventListener('scroll', this.handleScroll);
    await this.fetchServices();
    await this.fetchArticles();
  },
  watch: {
    '$route.params.id': 'fetchArticle'
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: { 
    contactUs() {
      this.isModalVisible = true;
    },
    openModal() {
      this.isModalVisible = true;
      this.$forceUpdate();
      this.$nextTick(() => {
        document.body.classList.add('modal-open');
      });
    },
    closeModal() {
      this.isModalVisible = false;
      this.$forceUpdate();
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    showDropdown() {
      clearTimeout(this.hideTimeout);
      if (window.innerWidth <= 768) {
        return;
      }
      this.dropdownVisible = true;
    },
    hideDropdown() {
      this.dropdownVisible = false;
    },
    hideDropdownImmediately() {
      this.dropdownVisible = false;
    },
    hideDropdownWithDelay() {
      this.hideTimeout = setTimeout(() => {
        this.dropdownVisible = false;
      }, 300);
    },
    handleScroll() {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const triggerHeight = 120;
      if (currentScroll > this.lastScrollTop && currentScroll > triggerHeight) {
        this.isHeaderHidden = true;
      } else {
        this.isHeaderHidden = false;
      }
      this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    },
    getRoute(section) {
      switch (section) {
        case 'Главная':
          return '/';
        case 'Услуги':
          return '/services';
        case 'Адвокаты': 
          return '/lawyers';
        case 'Шаблоны договоров': 
          return '/templates';
        case 'Контакты': 
          return '/contacts';
        case 'Калькуляторы': 
          return '/calculators';
        default:
          return '#';
      }
    },
    async fetchServices() {
      try {
        const servicesRef = collection(db, 'services');
        const querySnapshot = await getDocs(servicesRef);
        querySnapshot.forEach((doc) => {
          const service = doc.data();
          if (service.type === 'individuals') {
            this.individualServices.push({ id: doc.id, ...service });
          } else if (service.type === 'businesses') {
            this.businessServices.push({ id: doc.id, ...service });
          }
        });
      } catch (error) {
        console.error('Ошибка при загрузке услуг:', error);
      }
    },
    async fetchArticles() {
      try {
        const articlesRef = collection(db, 'articles');
        const querySnapshot = await getDocs(articlesRef);
        this.articles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Ошибка при загрузке статей:', error);
      }
    },
    handleSearch() {
      if (this.searchQuery.length > 0) {
        this.searchResultsVisible = true;
        this.filteredArticles = this.articles.filter(article =>
          article.name && article.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        this.filteredServices = [
          ...this.individualServices,
          ...this.businessServices
        ].filter(service =>
          service.name && service.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.searchResultsVisible = false;
        this.filteredArticles = [];
        this.filteredServices = [];
      }
    },
    navigateToServices(section) {
      if (section === 'Услуги') {
        this.$router.push({ name: 'services' });
      }
    }
  }
};
</script>

<style scoped>
header {
  width: 100%;
  position: fixed;
  z-index: 1000;
  transition: top 0.3s ease-in-out;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  color: white;
  width: 100%;
  height: 80px;
}

.logo {
  margin-left: 100px;
  padding-top: 10px;
}

.logo img {
  height: 40px;
}

.contact-button {
  padding: 15px 30px;
  background-color: #31473A;
  color: white;
  border: none;
  cursor: pointer;
  margin-right: 100px;
  font-family: 'Gill Sans';
  font-size: 18px;
}

.fixed-nav {
  background-color: #31473A;
  color: white;
  display: flex;
  justify-content: center;
  padding: 10px 0px;
  width: 100%;
  transition: top 0.3s;
  height: 40px;
  justify-content: flex-start;
}

.fixed-nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;
  padding: 0px 80px;
  width: 100%;
  justify-content: flex-start;
}

.fixed-nav .nav-item {
  margin: 0 20px;
  position: relative;
  cursor: pointer;
}

.nav-link {
  color: white;
  text-decoration: none;
}

.nav-link:hover,
.active-link {
  color: #adffc8;
}

li {
  text-decoration: none;
  color: white;
}

.search-container {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  position: relative;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: white;
  padding: 5px;
}

.search-icon {
  background: #47313E;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
}

.search-icon img{
  align-self: center;
  width: 18px;
  padding: 10px 10px;
}

.search-box input {
  border: none;
  padding: 5px;
  font-size: 16px;
  outline: none;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #31473A;
  color: white;
  padding: 20px 100px;
  z-index: 999;
  display: flex;
}

.dropdown-section {
  margin-bottom: 20px;
  text-align: left;
}

.dropdown-section h3 {
  margin-bottom: 10px;
}

.dropdown-section ul {
  list-style: none;
  padding: 0;
  width: 400px;
  flex-direction: column;
  display: flex;
  justify-content: start;
  text-align: left;
  align-items: start;
  margin-top: 20px;
}

.dropdown-section ul li {
  margin-right: 10px;
  margin-bottom: 10px;
  color: #fff;
  text-decoration: none;
  text-align: left;
}

.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  margin-right: 20px;
  color: #31473A;
  cursor: pointer;
}

.header-hidden {
  top: -80px;
  transition: top 0.3s;
}

.search-results {
  position: absolute;
  top: 40px;
  background: #31473A;
  color: #fff;
  padding: 10px;
  width: 50%;
  z-index: 1001;
}

.search-results h3 {
  margin: 0;
  padding: 10px 0;
}

.search-results ul {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-direction: column;
}

.search-results li {
  padding: 5px 0;
  text-align: left;
  width: 100%;
}

.search-results .nav-link {
  color: #fff;
  text-decoration: none;
  display: inline;
}

.search-results .nav-link:hover {
  text-decoration: underline;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  max-width: 80%;
}

.close-button {
  background: #31473A;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

form label {
  display: block;
  margin-top: 10px;
}

form input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

form button {
  margin-top: 20px;
  background: #31473A;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  width: 100%;
}

@media (max-width: 768px) {
  .contact-button {
    display: none;
  }
  .mobile-menu-button {
    display: block;
  }
  .fixed-nav {
    flex-direction: column;
    align-items: flex-start;
    display: none;
    text-align: left;
  }
  .fixed-nav.mobile-nav-open {
    display: flex;
    background-color: #31473A;
    height: 260px;
    padding-top: 20px;
  }
  .mobile-nav-open input{
    max-width: 200px;
  }
  .fixed-nav ul {
    flex-direction: column;
    padding-left: 20px;
    align-items: start;
  }
  .fixed-nav .nav-item {
    margin: 10px 0;
  }
  .search-container {
    width: 90%;
    justify-content: left;
    justify-items: left;
    align-items: left;
    padding: 0;
  }
  .search-box {
    width: 100%;
  }
  .logo {
    margin-left: 20px;
  }
  .search-results {
    position: absolute;
    top: 50px;
    background: #31473A;
    color: #fff;
    padding: 10px;
    width: 120%;
    margin-left: -20px;
    z-index: 1001;
  }
}
</style>
