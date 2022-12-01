

<script>
import { supabase } from '../supabase'
import AddApp from '@/components/AddApps.vue'
import Nav from '@/components/Nav.vue'
import { anyTypeAnnotation } from '@babel/types'


export default {
  name: 'home',
  components: {
    AddApp,
    Nav
  },
  props: {
    appData: Object
  },
  data() {
    return {
      page_title: 'Blog',
      posts: [],
      data: [],
      dataUsers: [],
      text: '',
      isFix: 0,
      atId: 0,
      app: []
    }
  },
  emits: ['load'],
  methods: {
    async load() {
      // console.log(this.data, 'ihgihgih')

      let { data: Apps, error } = await supabase
        .from('Apps')
        .select('*')

      this.data = Apps
      // console.log(Apps)
    },
    async loadUsers() {
      let { data: Users, error } = await supabase
        .from('Users')
        .select('*')

      this.dataUsers = Users
      // console.log(Users)
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
      if (this.isFix) {
        console.log("Current editing app at id: ", e.currentTarget.id);
        this.atId = e.currentTarget.id;
        this.app = this.appData.find(x => x.id == e.currentTarget.id)
        console.log(this.app)
      }
    },

    switchState() {
      this.isFix = !this.isFix
      if (!this.isFix) {
        this.atId = 0;
      }

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
  },
}
</script>

<template>
  <Nav />

  <button @click="switchState">
    <div v-if="!isFix">Hi there, press me</div>
    <div v-else>Fixing mode ON</div>
  </button>

  <KeepAlive>
    <div class="app-con">
      <div class="app" v-for="(app) in appData" :key="app.id" :id="app.id" @click="onInput"
        :class="{ edit: atId == app.id }">
        <router-link :to="'/app/' + app.id">
          <img :src="app.icon_url" alt="" class="app-icon" referrerpolicy="no-referrer">
        </router-link>
        <h2>{{ app.name }}</h2>
      </div>
    </div>
  </KeepAlive>



  <AddApp @load="$emit('load')" :opt="isFix ? 1 : 0" :id="atId" :app="app"></AddApp>
</template>

<style lang="scss">
.app-con {
  display: flex;
  flex-wrap: wrap;
}

.app {
  width: 177px;
  height: 230px;

  box-sizing: border-box;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  margin: 20px;

  border: 3px solid transparent;
  border-radius: 10px;

  transition: all .2s ease;


  .app-icon {
    width: 160px;
    border-radius: 40px;
    aspect-ratio: 1/1;
  }
}

.edit {
  border: 3px solid darkseagreen;

}
</style>