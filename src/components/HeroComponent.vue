<template>
  <section class="hero">
    <div class="hero-content">
      <h1>Московская коллегия адвокатов
“Солидарность”</h1>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroComponent',
};
</script>

<style scoped>
.hero {
  background: url('@/assets/heroImage.jpg') no-repeat center center;
  background-size: cover;
  height: 680px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.hero-content {
  text-align: center;
  font-size: 36px;
  padding-bottom: 10px;
}

@media screen and (max-width: 768px) {
  .hero-content {
  font-size: 28px;
  padding: 20px 20px;
}
}
</style>
