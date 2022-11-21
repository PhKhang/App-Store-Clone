

<script>
import { supabase } from '../supabase'

export default {
    name: 'app',
    components: {
    },
    data() {
        return {
            page_title: 'Blog',
            posts: [],
            data: [],
            text: '',
            comment_con: '',
            app: [1],
            comments: []
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

        async match(id) {
            const { data: matchid, error } = await supabase
                .from('Apps')
                .select("*")
                .eq("id", id)

            this.app = matchid
            console.log(matchid)

        },

        async updateReviews(id) {
            let { data: Reviews, error } = await supabase
                .from('Reviews')
                .select('*')
                .eq('for_id', id)

            this.comments = Reviews
            console.log(Reviews)
        },

        async addReviews(id, name, content) {
            console.log({ id, name, content })
            let { data: Reviews, error } = await supabase
                .from('Reviews')
                .insert([
                    {
                        for_id: id,
                        name: name,
                        content: content,
                    }
                ])

            console.log({ id, name, content })
        },

        onInput(e) {
            this.text = e.target.value
        },
        onInputCon(e) {
            this.comment_con = e.target.value
        }
    },

    created() {
        this.match(this.$route.params.id);
        this.updateReviews(this.$route.params.id)
    },
}
</script>

<template>
    <button @click="updateReviews($route.params.id)"></button>
    <h1>App name: {{ app[0].name }}</h1>
    <img :src="app[0].icon_url" alt="" referrerpolicy="no-referrer">
    <h3>Description</h3>
    <p style="white-space: pre-wrap">{{ app[0].des }}</p>
    <h3>Down load the game/app</h3>
    <a :href="app[0].down_url">Download here</a>

    <h3>Comment</h3>

    <input :value="text" @input="onInput" placeholder="Type here">
    <form action="" @submit.prevent="addReviews($route.params.id, text, comment_con)">
        <input :value="comment_con" @input="onInputCon" placeholder="Your review here">
    </form>
    <p>Name: {{ text }}</p>
    <p>Review: {{ comment_con }}</p>


    <div class="comments" v-for="(comment, index) in comments">
        <h4>{{ comment.name }}</h4>
        <p>{{ comment.content }}</p>
    </div>

</template>

<style>

</style>