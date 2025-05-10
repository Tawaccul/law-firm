<template>
  <div class="admin-panel">
    <div v-if="!user">
      <h2>Вход для администратора</h2>
      <form @submit.prevent="login">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Пароль:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>

    <div v-else>
      <button @click="logout" class="red-button">Выйти</button>
      <h1>Админ-панель</h1>
      <!-- Admin forms and lists here -->
      <!-- Form to Add Article -->
      <form @submit.prevent="addArticle">
        <h2>Добавить Статью</h2>
        <div>
          <label for="title">Заголовок 1:</label>
          <input type="text" id="title" v-model="newArticle.title" required />
        </div>
        <div>
          <label for="content">Содержание 1:</label>
          <ckeditor :editor="editor" v-model="newArticle.content" :config="editorConfig" />
        </div>
        <div>
          <label for="title2">Заголовок 2:</label>
          <input type="text" id="title2" v-model="newArticle.title2"  />
        </div>
        <div>
          <label for="content2">Содержание 2:</label>
          <ckeditor :editor="editor" v-model="newArticle.content2" :config="editorConfig" />
        </div>
        <div>
          <label for="articleId">ID Статьи:</label>
          <input type="text" id="articleId" v-model="newArticle.id" required />
        </div>
        <div>
          <label for="category">Категория:</label>
          <select id="category" v-model="newArticle.category" required>
            <option value="individuals">Физическим лицам</option>
            <option value="businesses">Юридическим лицам</option>
          </select>
        </div>
        <button type="submit" class="green-button">Добавить Статью</button>
      </form>

      <!-- Form to Add Service -->
      <form @submit.prevent="addService">
        <h2>Добавить Услугу</h2>
        <div>
          <label for="icon">Иконка:</label>
          <file-upload @file-processed="handleIconUpload" />
        </div>
        <div>
          <label for="name">Название:</label>
          <input type="text" id="name" v-model="newService.name" required />
        </div>
        <div>
          <label for="type">Категория:</label>
          <select id="type" v-model="newService.type" required>
            <option value="individuals">Физическим лицам</option>
            <option value="businesses">Юридическим лицам</option>
          </select>
        </div>

        <div>
          <label for="serviceArticleId">ID Статьи:</label>
          <input type="text" id="serviceArticleId" v-model="newService.articleId" required />
        </div>
        <button type="submit" class="green-button">Добавить Услугу</button>
      </form>

      <!-- Form to Add Price -->
      <!-- <form @submit.prevent="addPrice">
        <h2>Добавить Цену</h2>
        <div>
          <label for="priceName">Название Цена:</label>
          <input type="text" id="priceName" v-model="newPrice.name" required />
        </div>
        <div>
          <label for="priceAmount">Цена:</label>
          <input type="text" id="priceAmount" v-model="newPrice.price" required />
        </div>
        <button type="submit">Добавить Цену</button>
      </form> -->

      <!-- Form to Add Lawyer -->
      <form @submit.prevent="addLawyer">
        <h2>Добавить Адвоката</h2>
        <div>
          <label for="lawyerPhoto">Фото:</label>
          <file-upload @file-processed="handlePhotoUpload" />
        </div>
        <div>
          <label for="lawyerName">Имя:</label>
          <input type="text" id="lawyerName" v-model="newLawyer.name" required />
        </div>
        <div>
          <label for="lawyerProfession">Профессия:</label>
          <input type="text" id="lawyerProfession" v-model="newLawyer.profession" required />
        </div>
        <div>
          <label for="lawyerDescription">Описание:</label>
          <ckeditor :editor="editor" v-model="newLawyer.description" :config="editorConfig" />
        </div>
        <div>
          <label for="lawyerSpecialty">Специальность:</label>
          <input type="text" id="lawyerSpecialty" v-model="newLawyer.specialty" required />
        </div>
        <button type="submit" class="green-button">Добавить Адвоката</button>
      </form>
      <div class="services-list">
        <h2>Существующие услуги</h2>
        <ul>
          <li v-for="service in services" :key="service.id">
            <span>{{ service.name }} ({{ service.type }})</span>
            <button @click="deleteService(service.id)" class="red-button">Удалить</button>
          </li>
        </ul>
      </div>

      <div class="lawyers-list">
        <h2>Существующие адвокаты</h2>
        <ul>
          <li v-for="lawyer in lawyers" :key="lawyer.id">
            <span>{{ lawyer.name }} ({{ lawyer.specialty }})</span>
            <button @click="deleteLawyer(lawyer.id)" class="red-button">Удалить</button>
          </li>
        </ul>
      </div>

    
    </div>
  </div>
</template>

<script>
import { db, storage } from '@/store/firebase';
import { collection, addDoc, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FileUpload from '@/views/UploadPhoto.vue';

export default {
  name: 'AdminView',
  components: {
    ckeditor: CKEditor.component,
    FileUpload
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {},
      newArticle: {
        id: '',
        title: '',
        content: '',
        title2: '',
        content2: '',
        category: 'individuals' // Default category
      },
      newService: {
        icon: '',
        name: '',
        type: 'individuals',
        link: '',
        articleId: ''
      },
      newLawyer: {
        photo: '',
        name: '',
        description: '',
        specialty: ''
      },
      newPrice: {
        name: '',
        price: ''
      },
      services: [],
      lawyers: [],
      prices: [],
      email: '',
      password: '',
      user: null
    };
  },
  async created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.fetchData();
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    async fetchData() {
      await this.fetchServices();
      await this.fetchLawyers();
      await this.fetchPrices();
    },
    async fetchServices() {
      const querySnapshot = await getDocs(collection(db, 'services'));
      this.services = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    async uploadFile(file, path) {
      const fileRef = ref(storage, path);
  
      try {
        // Загружаем файл
        await uploadBytes(fileRef, file);
        
        // Получаем URL файла
        const downloadURL = await getDownloadURL(fileRef);
        console.log('Файл загружен! URL:', downloadURL);
        
        // Возвращаем URL для использования
        return downloadURL;
      } catch (error) {
        console.error('Ошибка загрузки файла:', error);
        throw error;
      }
    },
    async fetchLawyers() {
      const querySnapshot = await getDocs(collection(db, 'lawyers'));
      this.lawyers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    async fetchPrices() {
      const querySnapshot = await getDocs(collection(db, 'prices'));
      this.prices = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    async addArticle() {
      try {
        await setDoc(doc(db, 'articles', this.newArticle.id), this.newArticle);
        console.log('Статья добавлена с ID:', this.newArticle.id);
        this.resetArticleForm();
      } catch (e) {
        console.error('Ошибка при добавлении статьи:', e);
      }
    },
    async addService() {
      try {
        const docRef = await addDoc(collection(db, 'services'), this.newService);
        this.services.push({ id: docRef.id, ...this.newService });
        this.resetServiceForm();
      } catch (e) {
        console.error('Ошибка при добавлении услуги:', e);
      }
    },
    async addPrice() {
      try {
        const docRef = await addDoc(collection(db, 'prices'), this.newPrice);
        this.prices.push({ id: docRef.id, ...this.newPrice });
        this.resetPriceForm();
      } catch (e) {
        console.error('Ошибка при добавлении цены:', e);
      }
    },
    async addLawyer() {
      try {
        const docRef = await addDoc(collection(db, 'lawyers'), this.newLawyer);
        this.lawyers.push({ id: docRef.id, ...this.newLawyer });
        this.resetLawyerForm();
      } catch (e) {
        console.error('Ошибка при добавлении адвоката:', e);
      }
    },
    async deleteService(serviceId) {
      try {
        await deleteDoc(doc(db, 'services', serviceId));
        this.services = this.services.filter(service => service.id !== serviceId);
      } catch (e) {
        console.error('Ошибка при удалении услуги:', e);
      }
    },
    async deleteLawyer(lawyerId) {
      try {
        await deleteDoc(doc(db, 'lawyers', lawyerId));
        this.lawyers = this.lawyers.filter(lawyer => lawyer.id !== lawyerId);
      } catch (e) {
        console.error('Ошибка при удалении адвоката:', e);
      }
    },
    async deletePrice(priceId) {
      try {
        await deleteDoc(doc(db, 'prices', priceId));
        this.prices = this.prices.filter(price => price.id !== priceId);
      } catch (e) {
        console.error('Ошибка при удалении цены:', e);
      }
    },
    async login() {
      const auth = getAuth();
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.user = auth.currentUser;
      } catch (error) {
        console.error('Ошибка входа:', error);
      }
    },
    async logout() {
      const auth = getAuth();
      try {
        await signOut(auth);
        this.user = null;
      } catch (error) {
        console.error('Ошибка выхода:', error);
      }
    },
    async handleIconUpload(file) {
      const fileRef = ref(storage, `icons/${file.name}`);
      try {
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);
        this.newService.icon = downloadURL;
      } catch (error) {
        console.error('Ошибка загрузки иконки:', error);
      }
    },
    async handlePhotoUpload(file) {
      const fileRef = ref(storage, `photos/${file.name}`);
      try {
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);
        this.newLawyer.photo = downloadURL;
      } catch (error) {
        console.error('Ошибка загрузки фото:', error);
      }
    },
    resetArticleForm() {
      this.newArticle = {
        id: '',
        title: '',
        content: '',
        title2: '',
        content2: '',
        category: 'individuals'
      };
    },
    resetServiceForm() {
      this.newService = {
        icon: '',
        name: '',
        type: 'individuals',
        link: '',
        articleId: ''
      };
    },
    resetPriceForm() {
      this.newPrice = {
        name: '',
        price: ''
      };
    },
    resetLawyerForm() {
      this.newLawyer = {
        photo: '',
        name: '',
        description: '',
        specialty: ''
      };
    }
  }
};
</script>

<style scoped>
.admin-panel {
  padding: 100px;
}
.admin-panel h1 {
  margin-bottom: 20px;
}
.admin-panel form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 40px;
}
.admin-panel form div {
  display: flex;
  flex-direction: column;
}
.admin-panel .services-list,
.admin-panel .lawyers-list,
.admin-panel .prices-list {
  margin-top: 20px;
}

.red-button{
  background: #47313E;
  margin-left: 20px;
  color: #fff;
  padding: 10px;

}
.green-button{
  background: #31473A;
  margin-left: 20px;
  color: #fff;
padding: 10px;
}
</style>
