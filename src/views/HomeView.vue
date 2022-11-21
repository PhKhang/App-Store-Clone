

<script>
import { supabase } from '../supabase'
import AddApp from '@/components/AddApps.vue'
import Nav from '@/components/Nav.vue'


export default {
  name: 'home',
  components: {
    AddApp,
    Nav
  },
  data() {
    return {
      page_title: 'Blog',
      posts: [],
      data: [],
      dataUsers: [],
      text: ''
    }
  },

  methods: {
    async load() {
      let { data: Apps, error } = await supabase
        .from('Apps')
        .select('*')

      this.data = Apps
      console.log(Apps)
    },
    async loadUsers() {
      let { data: Users, error } = await supabase
        .from('Users')
        .select('*')

      this.dataUsers = Users
      console.log(Users)
    },
    async update() {
      const { data, error } = await supabase
        .from('Apps')
        .insert([
          {
            name: 'Nikke Minaj',
            data: [{
              "name": "Calmest gamer",
              "content": "This game is kinda slow at some point but overall, i give this a 11/10"
            }]
          },
        ])
    },
    async updateMany() {

      const { data, error } = await supabase
        .from('Apps')
        .insert([
          { id: "1", name: 'Nike' },
          { id: "2", name: 'Genshin' },
          { id: "3", name: 'Genshin' },
          { id: "4", name: 'Genshin' },
          { id: "5", name: 'Genshin' },
        ])

    },

    async match() {
      const { data: matchid, error } = await supabase
        .from('Apps')
        .select("*")
        .eq("name", 'Genshin')
      console.log(matchid)

    },

    onInput(e) {
      this.text = e.target.value
    },

    async updateUsers() {
      const { user, error } = await supabase
        .from('Users')
        .insert([
          {
            name: this.text,
          },

        ])
      console.log(this.text)
      this.loadUsers()
    }
  },

  created() {
    this.load();
    this.loadUsers()
  },
}
</script>

<template>
  <Nav />

  <div class="app-con">
    <div class="app" v-for="(app, index) in data">
      <router-link :to="'/app/' + app.id">
        <img :src="app.icon_url" alt="" class="app-icon" referrerpolicy="no-referrer">
      </router-link>
      <h2>{{ app.name }}</h2>
    </div>
  </div>



  <AddApp></AddApp>
</template>

<style lang="scss">
.app-con {
  display: flex;
  flex-wrap: wrap;
}

.app {
  width: 177px;
  height: 230px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  margin: 20px;

  .app-icon {
    width: 160px;
    border-radius: 40px;
    aspect-ratio: 1/1;
  }
}
</style>