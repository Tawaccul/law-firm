import { createStore } from 'vuex';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/store/firebase';

export default createStore({
  state() {
    return {
      services: [],
      articles: [],
      lawyers: [],
    };
  },
  mutations: {
    setServices(state, services) {
      state.services = services;
    },
    setArticles(state, articles) {
      state.articles = articles;
    },
    setLawyers(state, lawyers) {
      state.lawyers = lawyers;
    },
    removeService(state, serviceId) {
      state.services = state.services.filter(service => service.id !== serviceId);
    },
    removeLawyer(state, lawyerId) {
      state.lawyers = state.lawyers.filter(lawyer => lawyer.id !== lawyerId);
    },
  },
  actions: {
    async fetchServices({ commit }) {
      try {
        const querySnapshot = await getDocs(collection(db, 'services'));
        const services = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        commit('setServices', services);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    },
    async fetchArticles({ commit }) {
      try {
        const querySnapshot = await getDocs(collection(db, 'articles'));
        const articles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        commit('setArticles', articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    },
    async fetchLawyers({ commit }) {
      try {
        const querySnapshot = await getDocs(collection(db, 'lawyers'));
        const lawyers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        commit('setLawyers', lawyers);
      } catch (error) {
        console.error('Error fetching lawyers:', error);
      }
    },
    async deleteService({ commit }, serviceId) {
      try {
        await deleteDoc(doc(db, 'services', serviceId));
        commit('removeService', serviceId);
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    },
    async deleteLawyer({ commit }, lawyerId) {
      try {
        await deleteDoc(doc(db, 'lawyers', lawyerId));
        commit('removeLawyer', lawyerId);
      } catch (error) {
        console.error('Error deleting lawyer:', error);
      }
    },
  },
  getters: {
    services: state => state.services,
    articles: state => state.articles,
    lawyers: state => state.lawyers,
  }
});
