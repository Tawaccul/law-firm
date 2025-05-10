<template>
  <footer>
    <div class="footer-container">
      <div class="footer-section">
        <h3>Разделы сайта</h3>
        <ul>
          <li><a href="/">Главная</a></li>
          <li><a href="services">Услуги</a></li>
          <li><a href="lawyers">Адвокаты</a></li>
          <li><a href="contact">Контакты</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>Контакты</h3>
        <ul>
          <li>Телефон: +7(800)-222-50-32</li>
          <li>Email: info@solidarnost.ru</li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Адрес</h3>
        <p>Орликов переулок, дом 5, строение 2, офис 630; БЦ»Орликов Плаза»</p>
      </div>
      <div class="footer-section">
        <h3>Социальные сети</h3>
        <ul class="social-links">
          <li><a href="#facebook" @click="contactViaWhatsapp">Whatsapp</a></li>
          <li><a href="#twitter" @click="visitInstagram">*Instagram (Запрещен в РФ)</a></li>
        </ul>
      </div>
    </div>
    <p>&copy; 2007 - 2024 Московская коллегия адвокатов - все права защищены</p>
    <p>ОГРН 1037703008573</p>
    <p>ИНН 7703369468</p>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  methods:{
    contactViaWhatsapp() {
    window.open('https://wa.me/+79602206565', '_blank'); // Замените номер на ваш
  },
  visitInstagram() {
    window.open('https://www.instagram.com/mka_solidarnost/profilecard/?igsh=bG9vajM0cTlsZjY5', '_blank'); // Замените URL на ваш
  },
  }
};
</script>

<style scoped>
footer {
  background: #F8F9FA;
  color: black;
  text-align: center;
  padding: 20px;
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.footer-section {
  flex: 1 1 200px;
  margin: 10px;
}

.footer-section h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #31473A;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 5px;
}

.footer-section ul li a {
  color: black;
  text-decoration: none;
}

.footer-section ul li a:hover {
  text-decoration: underline;
}

.social-links {
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 0;
}

.social-links li {
  list-style: none;
}

.social-links a {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

.social-links a:hover {
  text-decoration: underline;
}

@media screen and (max-width: 768px) {
  footer {
  background: #F8F9FA;
  color: black;
  text-align: center;
  margin-top: 0px;
}
.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
}
</style>
