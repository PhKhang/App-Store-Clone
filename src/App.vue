<script>
import { ref } from "vue";
import { computed } from "@vue/reactivity";
import store from "./store/index";
import { supabase } from './supabase';
import Search from '@/components/Search.vue';

export default {
  components: {
    Search
  },
  data() {
    return {
      appData: [{}]
    }
  },
  setup() {
    // Create data / vars
    const appReady = ref(null);
    // Check to see if user is already logged in

    // const user = supabase.auth.getUser();
    const user = computed(() => store.state.user);

    // If user does not exist, need to make app ready
    if (!user) {
      appReady.value = true;
    }
    // Runs when there is a auth state change
    // if user is logged in, this will fire
    supabase.auth.onAuthStateChange((_, session) => {
      console.log(user)
      store.methods.setUser(session);
      appReady.value = true;
    });
    return { appReady, user };
  },
  methods: {
    async load() {
      // console.log(this.data, 'ihgihgih')

      let { data: Apps, error } = await supabase
        .from('Apps')
        .select('*')

      this.appData = Apps
      console.log('All the apps: ', this.appData)
      // console.log(Apps)
    },
  },
  created() {
    this.load()
  }
};
</script>
  
<template>
  <nav>
    <router-link to="/" class="logo">
      <i></i>
      App Store
    </router-link>

    <Search />
    <div class="links">
      <router-link to="/register" v-if="!user">
        <div class="desk">Login/Register</div>
        <i class="mobile fa-solid fa-arrow-right-to-bracket fa-lg"></i>
      </router-link>

      <router-link to="/me" v-if="user">
        <div class="desk">My Account</div>
        <i class="mobile fa-solid fa-circle-user fa-lg"></i>
      </router-link>
    </div>
  </nav>

  <router-view v-model:appData="appData" @load="load" />

</template>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@300;400;500;700&display=swap');

body {
  margin: 0;
}

#app {
  position: relative;
  padding: 0;
  margin: 0;
  box-sizing: border-box;

}

* {
  box-sizing: border-box;
  font-family: 'Lexend Deca', Calibri, sans-serif;
  font-weight: 300;
  text-align: justify;

  transition: all .4s ease;
}

body {
  font-size: 16px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    text-align: left;
  }

}

.header {
  background-color: white;
}
</style>
