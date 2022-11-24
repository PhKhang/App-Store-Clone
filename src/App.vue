<template>

  <router-view />

</template>

<script>
import { ref } from "vue";
import { supabase } from './supabase';
import store from "./store/index";
export default {
  components: {
  },
  setup() {
    // Create data / vars
    const appReady = ref(null);
    // Check to see if user is already logged in
    const user = supabase.auth.getUser();
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
    return { appReady };
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@300;700&display=swap');

body {
  margin: 0;
}

#app {
  position: relative;
  padding: 0;
  margin: 0;
  box-sizing: border-box;

  overflow-x: hidden;
}

* {
  box-sizing: border-box;
  font-family: 'Lexend Deca', Calibri, sans-serif;
  font-weight: 300;
  text-align: justify;
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
