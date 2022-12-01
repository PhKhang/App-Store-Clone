<script>
import { supabase } from '../supabase'

export default {
    name: 'app',
    components: {
    },
    props: {
        appData: Object,
        opt: Number,
        id: String,
        app: {}
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
            screen_raw: '',
            screen_pre: []
        }
    },
    emits: ['load'],
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
            if (!this.opt) {
                var text2array = this.screen_raw.split('\n');
                this.screen = text2array;

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
                            down_url: this.down_url,
                            screens: this.screen,
                        }
                    ])


                console.log(
                    this.screen,
                    text2array
                )

                this.$emit('load')
            }
            else {
                console.log("Editing at: ", this.id)
                var text2array = this.screen_raw.split('\n');
                this.screen = text2array;

                let { data: Apps, error } = await supabase
                    .from('Apps')
                    .update([
                        {
                            name: this.name,
                            icon_url: this.icon_url,
                            header_url: this.header_url,
                            rating: this.rating,
                            author: this.author,
                            des: this.des,
                            size: this.size,
                            down_url: this.down_url,
                            screens: this.screen,
                        }
                    ])
                    .eq("id", this.id)


                console.log(
                    this.screen,
                    text2array
                )

                this.$emit('load')

            }
        },

        onInput(e) {
            this.text = e.target.value
        },
        onInputCon(e) {
            this.comment_con = e.target.value
        },

        type() {
            this.screen_pre = this.screen_raw.split('\n');
            console.log(this.screen_pre)
            console.log('Typing...')
        },

        updateSelect() {
            this.icon_url = this.app.icon_url;
            this.name = this.app.name;
            this.header_url = this.app.header_url;
            this.rating = this.app.rating;
            this.author = this.app.author;
            this.des = this.app.des;
            this.size = this.app.size;
            this.down_url = this.app.down_url;
            this.screen_raw = this.app.screens.join('\r\n');
            this.type()
        }
    },

    created() {
        if (this.app) {
            console.log('thing')
        }
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
            <textarea @input="type()" v-model="screen_raw" type="text"
                :placeholder="'Screenshots URLs: \nyoutube.com \nm.me'" :rows="6"></textarea>
            <input v-model="size" placeholder="Size, I.E: 49.56, 458.45">
            <form action="" @submit.prevent="addApp()">
                <input v-model="down_url" placeholder="Download URL">
            </form>
        </div>


        <div class="output">
            <button @click="$emit('load')">Reload all apps</button>
            <button v-if="opt" @click="updateSelect">Refresh selected app to edit</button>
            <p><span>Name:</span> {{ name }}</p>
            <img :src="icon_url" alt="" referrerpolicy="no-referrer">
            <p><span>Header URL:</span> {{ header_url }}</p>
            <p><span>Rating:</span> {{ rating }}</p>
            <p><span>Author:</span> {{ author }}</p>
            <p><span>Description:<br></span></p>
            <p style="white-space: pre-wrap">{{ des }}</p>
            <p><span>Screenshots:<br></span></p>
            <div class="screens">
                <div class="screen" v-for="(img, index) in screen_pre" :key="index">
                    <img :src="img" alt="" referrerpolicy="no-referrer">
                </div>
            </div>
            <p><span>Size:</span> {{ size }}<span>MB</span></p>
            <p><span>Download URL:</span> {{ down_url }}</p>
        </div>

    </div>


</template>

<style lang="scss" scoped>
.add {
    width: 100%;

    .input {
        float: left;
        padding-left: 100px;
        padding-right: 100px;
        width: 50%;

        >* {
            display: block;
            width: 100%;
        }
    }

    .output {
        float: right;
        width: 50%;

        span {
            font-weight: 700;
        }

        .screens {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;

            img {
                max-width: 360px;
                max-height: 300px;
                object-fit: contain;
                border-radius: 10px;
            }
        }
    }

}
</style>