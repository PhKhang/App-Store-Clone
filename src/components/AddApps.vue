<script>
import { supabase } from '../supabase'

export default {
    name: 'app',
    components: {
    },
    data() {
        return {
            name: '',
            icon_url: '',
            header_url: '',
            rating: '',
            author: '',
            des: '',
            size: '',
            down_url: '',
            screen: [],
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
            // console.log(matchid)

        },

        async updateReviews(id) {
            let { data: Reviews, error } = await supabase
                .from('Reviews')
                .select('*')
                .eq('for_id', id)

            this.comments = Reviews
            // console.log(Reviews)
        },

        async addApp() {
            let { data: Apps, error } = await supabase
                .from('Apps')
                .insert([
                    {
                        name: this.name,
                        icon_url: this.icon_url,
                        header_url: this.header_url,
                        rating: this.rating,
                        author: this.author,
                        des: this.des,
                        size: this.size,
                        down_url: this.down_url
                    }
                ])

            console.log(
                this.name,
                this.icon_url,
            )

            this.load()
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


    <div class="add">

        <div class="input">
            <input v-model="name" placeholder="App name">
            <input v-model="icon_url" placeholder="Icon's URL">
            <input v-model="header_url" placeholder="Header's URL">
            <input v-model="rating" placeholder="App rating, I.E: 4.7, 3.8">
            <input v-model="author" placeholder="Author">
            <textarea v-model="des" type="text" placeholder="App description"></textarea>
            <input v-model="size" placeholder="Size, I.E: 49.56, 458.45">
            <form action="" @submit.prevent="addApp()">
                <input v-model="down_url" placeholder="Download URL">
            </form>
        </div>


        <div class="output">
            <p><span>Name:</span> {{ name }}</p>
            <img :src="icon_url" alt="" referrerpolicy="no-referrer">
            <p><span>Header URL:</span> {{ header_url }}</p>
            <p><span>Rating:</span> {{ rating }}</p>
            <p><span>Author:</span> {{ author }}</p>
            <p><span>Description:<br></span></p>
            <p style="white-space: pre-wrap">{{ des }}</p>
            <p><span>Size:</span> {{ size }}<span>MB</span></p>
            <p><span>Download URL:</span> {{ down_url }}</p>
        </div>

    </div>


</template>

<style lang="scss" scoped>
.add {
    display: flex;
    flex-wrap: wrap;

    .input {
        padding-left: 100px;
        padding-right: 100px;
        width: 50%;
        display: grid;
        flex-wrap: wrap;

    }

    .output {
        width: 50%;

        span {
            font-weight: 400;
        }
    }

}
</style>