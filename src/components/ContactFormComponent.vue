<template>
  <section class="back">
    <h2>Обратный звонок</h2>
    <h3>Заполните форму, и мы обязательно Вам перезвоним!</h3>

    <div class="contact-form">
      <div class="left-block">
        <div class="social-buttons">
          <button @click="contactViaWhatsapp">
            <img src="@/assets/whatsapp.png" alt="WhatsApp" /> Написать в WhatsApp
          </button>
          <button @click="visitInstagram">
            <img src="@/assets/insta.png" alt="Instagram" /> Перейти в Instagram (*Запрещен в РФ)
          </button>

        </div>
        <div class="contact-info">
          <p>Орликов переулок, дом 5, строение 2, офис 630; БЦ "Орликов Плаза"</p>
        </div>
      </div>
      <div class="right-block">
        <form @submit.prevent="submitForm">
          <div>
            <label for="name">Имя:</label>
            <input type="text" id="name" v-model="name" />
          </div>
          <div>
            <label for="phone">Номер телефона:</label>
            <input type="tel" id="phone" v-model="phone" />
          </div>
          <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" />
          </div>
          <div>
  <label for="service">Выберите услугу:</label>
  <select id="service" v-model="selectedService">
    <option value="" disabled>Выберите услугу</option>
    <option v-for="service in services" :key="service.id" :value="service">
      {{ service.name }}
    </option>
  </select>
</div>

          <button type="submit" class="submit-button">Отправить</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ContactFormComponent',
  data() {
  return {
    name: "",
    phone: "",
    email: "",
    selectedService: null, // Теперь хранится объект услуги
  };
},
computed: {
  ...mapGetters(['services']),
},
created() {
  this.$store.dispatch('fetchServices');
  console.log('Services:', this.services); // Проверьте, выводятся ли данные
},
methods: {
  async submitForm() {
    const formData = {
      name: this.name,
      phone: this.phone,
      email: this.email,
      service: this.selectedService ? this.selectedService.name : "", // Отправляем название услуги
    };

    try {
      const response = await fetch('https://mka-solidarnost.ru/send-email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Network response was not ok');
      }
      console.log('Form submitted successfully');
      alert('Ваша заявка отправлена успешно!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`Произошла ошибка при отправке заявки: ${error.message}. Попробуйте снова.`);
    }
  },
  contactViaWhatsapp() {
    window.open('https://wa.me/+79602206565', '_blank'); // Замените номер на ваш
  },
  visitInstagram() {
    window.open('https://www.instagram.com/mka_solidarnost/profilecard/?igsh=bG9vajM0cTlsZjY5', '_blank'); // Замените URL на ваш
  },
},


};
</script>


<style scoped>

.back{ 
  padding: 0 100px;
}
.contact-form {
  display: flex;
  justify-content: space-between;
  background: #f9f9f9;
  margin: 40px auto;
  height: 600px;
}

section h2, h3{ 
  text-align: center;
}

section h2 {
  color: #31473A;
  font-size: 2em;
}

.left-block, .right-block {
  flex: 1;
  max-width: 50%;
  padding: 80px;
}
.right-block {
  background: #47313E;

}

.right-block label {
  color: #ffffff;
  font-size: 18px;
}
.right-block input {
  color: #47313E;
  padding-left: 10px;

}



.left-block{
  background: url('@/assets/hero.jpg') no-repeat center center;
  background-size: cover;
  flex-direction: column;
  justify-content: space-between;
  justify-items: space-between;
  align-items: end;
}

.social-buttons button {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 15px;
  background: #EDF4F2;
  box-shadow: 0px 2px 2px 0px rgb(0 0 0 / 25%);
  border: none;
  color: #47313E;
  font-family: 'Gill Sans';
  font-size: 18px;
  cursor: pointer;
  width: 100%;
}

.social-buttons img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  object-fit: contain;

}

.contact-info {
  margin-top: 200px;
  font-size: 18px;
  justify-self: end;
}

form div {
  margin-bottom: 20px;
}

select {
  width: 102%;
  margin-top: 5px;
  height: 50px;
  color: #47313E;
  padding: 0 10px;
  font-family: 'Gill Sans';

}

input{
  width: 100%;
  margin-top: 5px;
  height: 40px;
  color: #C8C1C5;
}

.submit-button {
  padding: 10px 20px;
  background: #31473A;
  border: 1px solid #EEEDE5 ;
  height: 50px;
  color: white;
  cursor: pointer;
  width: 100%;
  font-family: 'Gill Sans';
  font-size: 18px;
  margin-top: 20px;
}

@media screen and (max-width: 768px) {

  .contact-form {
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  background: #f9f9f9;
  margin: 0px;
  margin-top: 100px;
  height: 600px;

}
.back{ 
  padding: 0 0px;
}
.left-block, .right-block {
  flex: 1;
  max-width: 100%;
  padding: 40px;
}

input{
  width: 96%;
  margin-top: 5px;
  height: 40px;
  color: #C8C1C5;
}

select {
  width: 100%;
  margin-top: 5px;
  height: 50px;
  color: #C8C1C5;
  padding: 0 10px;
  font-family: 'Gill Sans';

}
}
</style>
