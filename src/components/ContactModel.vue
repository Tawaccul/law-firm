<template>
  <div v-if="visible" class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <h2>Обратная связь</h2>
      <form @submit.prevent="submitForm">
        <label for="name">Имя:</label>
        <input type="text" id="name" v-model="name" required />

        <label for="phone">Номер телефона:</label>
        <input type="tel" id="phone" v-model="phone" required />

        <label for="email">Почта:</label>
        <input type="email" id="email" v-model="email" required />

        <button type="submit">Отправить</button>
      </form>
      <button @click="closeModal" class="close-button">Закрыть</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  name: 'ContactModal',
  data() {
    return {
      name: '',
      phone: '',
      email: '',
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    async submitForm() {
  const formData = {
    name: this.name.trim(),
    phone: this.phone.trim(),
    email: this.email.trim(),
  };

  if (!formData.name || !formData.phone || !formData.email) {
    alert('Все поля обязательны!');
    return;
  }

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
      throw new Error(errorResponse.message || 'Ошибка сети');
    }

    alert('Заявка отправлена успешно!');
    this.closeModal(); // Закрыть модальное окно
  } catch (error) {
    console.error('Ошибка при отправке формы:', error.message);
    alert(`Ошибка: ${error.message}`);
  }
}


  },
};
</script>

<style scoped>
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
  padding: 30px 20px;
  width: 330px;
}

.modal h2 {
  margin: 0;
}

.close-button {
  background: #47313E;
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  margin-top: 10px;
  font-family: 'Gill Sans';
}

form label {
  display: block;
  margin-top: 10px;
}

form input {
  width: 95%;
  padding: 8px;
  margin-top: 5px;
  font-family: 'Gill Sans';
  border-radius: 0%;
  border: 1px solid #ccc;
}

form button {
  margin-top: 20px;
  background: #31473A;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  width: 100%;
  font-family: 'Gill Sans';
}
</style>
