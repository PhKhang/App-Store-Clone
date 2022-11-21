

<script>
import { supabase } from '../supabase'
import Nav from '@/components/Nav.vue'
import Vibrant from 'node-vibrant'

export default {
    name: 'app',
    components: {
        Nav
    },
    data() {
        return {
            page_title: 'Blog',
            posts: [],
            data: [],
            text: '',
            comment_con: '',
            app: [1],
            comments: [],
            palette: {}
        }
    },
    computed: {
        vibrant() {
            Object.keys(this.palette).length
            if (Object.keys(this.palette).length == 0) {
                return '#fff';
            }
            return this.palette.Vibrant.getHex();
        },
        lightvi() {
            Object.keys(this.palette).length
            if (Object.keys(this.palette).length == 0) {
                return '#fff';
            }
            return this.palette.LightVibrant.getHex();
        },
        darkvi() {
            Object.keys(this.palette).length
            if (Object.keys(this.palette).length == 0) {
                return '#fff';
            }
            return this.palette.DarkVibrant.getHex();
        },
        muted() {
            Object.keys(this.palette).length
            if (Object.keys(this.palette).length == 0) {
                return '#fff';
            }
            return this.palette.Muted.getHex();
        },
        lightmuted() {
            Object.keys(this.palette).length
            if (Object.keys(this.palette).length == 0) {
                return '#fff';
            }
            return this.palette.LightMuted.getHex();
        },
        darkmuted() {
            Object.keys(this.palette).length
            if (Object.keys(this.palette).length == 0) {
                return '#fff';
            }
            return this.palette.DarkMuted.getHex();
        },
        cssVars() {
            return {
                '--primary': '#331D0B'
            }
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
        },

        async getColor() {
            const img = document.getElementById('icon')
            img.setAttribute('crossOrigin', '');
            const vibrant = new Vibrant(img)

            let result = await vibrant.getPalette().then(
                (palette) => {
                    this.palette = palette
                    const title = document.getElementsByTagName('h1')
                    console.log('palette', palette.LightVibrant.getBodyTextColor())
                },
                (reason) => {
                    console.error(reason)
                }
            )


        }
    },

    created() {
        this.match(this.$route.params.id);
        //this.updateReviews(this.$route.params.id);
    },
    mounted() {
    }
}
</script>

<template>
    <Nav />


    <div class="header" :style="cssVars">
        <img class="app-icon" id="icon" :src="app[0].icon_url" alt="" @load="getColor()" referrerpolicy="no-referrer">

        <h1 :style="{ color: vibrant }">vibrant: {{ app[0].name }}</h1>
        <h1 :style="{ color: muted }">muted: {{ app[0].name }}</h1>
        <h1 :style="{ color: darkmuted }">darkmuted: {{ app[0].name }}</h1>
        <h1 :style="{ color: darkvi }">darkvi: {{ app[0].name }}</h1>
        <h1 :style="{ color: lightmuted }">lightmuted: {{ app[0].name }}</h1>
        <h1 :style="{ color: lightvi }">lightvi: {{ app[0].name }}</h1>

        <h4 :style="{ color: vibrant }">{{ app[0].author }}</h4>
        <a :style="{ color: vibrant }" :href="app[0].down_url" class="down-link">
            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M2 23.75V25.5625C2 28.5656 4.43446 31 7.4375 31H25.5625C28.5656 31 31 28.5656 31 25.5625V23.75M23.75 16.5L16.5 23.75M16.5 23.75L9.25 16.5M16.5 23.75V2"
                    :stroke=vibrant stroke-width="3.625" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </a>
    </div>


    <h3>Description</h3>
    <p style="white-space: pre-wrap">{{ app[0].des }}</p>

    <h3>Comment</h3>

    <input :value="text" @input="onInput" placeholder="Type here">
    <form action="" @submit.prevent="addReviews($route.params.id, text, comment_con)">
        <input :value="comment_con" @input="onInputCon" placeholder="Your review here">
    </form>
    <p>Name: {{ text }}</p>
    <p>Review: {{ comment_con }}</p>


    <div class="screen-con">
        <div v-for="(screen, index) in app[0].screens">
            <img class="screen" :src="screen" referrerpolicy="no-referrer">
        </div>
    </div>



</template>

<style scoped lang="scss">
* {
    transition: all .3s ease;
}

.header {
    background-color: white;
}

.app-icon {
    width: 290px;
    aspect-ratio: 1/1;
    border-radius: 70px;
}

.header {
    width: 100%;
    min-height: 90vh;

    background: linear-gradient(to right, v-bind(darkvi) 28.45%, rgba(122, 122, 122, 0.185) 67.48%, v-bind(darkvi) 99.95%);

    transition: background 1s ease;
}

.screen-con {
    display: flex;
    gap: 16px;

    .screen {
        width: 230px;
        object-fit: cover;
    }
}
</style>