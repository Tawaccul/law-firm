<template>
  <div>
    <HeaderComponent />
    <HeroComponent />
    <AdvantagesComponent />
    <ServicesComponent />
    <ReviewsSlider />
    <LawyersComponent />
    <ContactFormComponent />
    <FooterComponent />
    <!-- Здесь будет работать Cleversite -->
  </div>
</template>

<script>
  import HeaderComponent from "@/components/HeaderComponent.vue";
  import HeroComponent from "@/components/HeroComponent.vue";
  import AdvantagesComponent from "@/components/AdvantagesComponent.vue";
  import LawyersComponent from "@/components/LawyersComponent.vue";
  import ServicesComponent from "@/components/ServicesComponent.vue";
  import ContactFormComponent from "@/components/ContactFormComponent.vue";
  import FooterComponent from "@/components/FooterComponent.vue";
  import ReviewsSlider from '@/components/ReviewsSlider.vue';

  export default {
    name: 'HomeView',
    components: {
      HeaderComponent,
      HeroComponent,
      AdvantagesComponent,
      ServicesComponent,
      ReviewsSlider,
      LawyersComponent,
      ContactFormComponent,
      FooterComponent
    },
    mounted() {
      window.onload = () => {
    const script = document.createElement('script');
    script.src = '//widget.cleversite.ru/widget/128185/198949/';
    script.async = true;
    document.body.appendChild(script);
  }}
  };
</script>