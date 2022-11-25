

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

            this.carousel()
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


        },

        carousel() {
            console.log("Carousel")
            $(".screen-con").slick({
                dots: true,
                infinite: true,
                speed: 700,
                autoplay: true,
                autoplaySpeed: 2000,
                arrows: true,
                slidesToShow: 2,
                slidesToScroll: 1
            });
        }
    },

    created() {
        this.match(this.$route.params.id);
        this.updateReviews(this.$route.params.id);



    },
    mounted() {
        /* console.log("Carousel")
        $(".screen-con").slick({
            lazyLoad: 'ondemand',
            slidesToShow: 1,
            slidesToScroll: 1
        }); */
    }
}
</script>

<template>
    <Nav />


    <div class="header">
        <video class="back vid" v-if="app[0].header_url" autoplay loop>
            <source :src="app[0].header_url" type="video/mp4">
        </video>
        <div v-else class="back" v-for="(screen, index) in app[0].screens" :key="index">

            <img :src="screen" referrerpolicy="no-referrer" v-if="index == 0">

        </div>

        <div class="header-text">

            <img class=" app-icon" id="icon" :src="app[0].icon_url" alt="" @load="getColor()"
                referrerpolicy="no-referrer">
            <h1>{{ app[0].name }}</h1>
            <h4>{{ app[0].author }}</h4>
            <a :href="app[0].down_url" class="down-link">
                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M2 23.75V25.5625C2 28.5656 4.43446 31 7.4375 31H25.5625C28.5656 31 31 28.5656 31 25.5625V23.75M23.75 16.5L16.5 23.75M16.5 23.75L9.25 16.5M16.5 23.75V2"
                        :stroke=darkvi stroke-width="3.625" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </a>
        </div>
    </div>


    <div class="content">
        <div class="screen-con">
            <div class="screen-wrap" v-for="(screen, index) in app[0].screens" :key="index">
                <img class="screen" :src="screen" referrerpolicy="no-referrer">
            </div>
        </div>

        <h3 @load="">Description</h3>
        <p class="des" style="white-space: pre-wrap">{{ app[0].des }}</p>
        <h3>Comment</h3>
        <input :value="text" @input="onInput" placeholder="Type here">
        <form action="" @submit.prevent="addReviews($route.params.id, text, comment_con)">
            <input :value="comment_con" @input="onInputCon" placeholder="Your review here">
        </form>
        <p>Name: {{ text }}</p>
        <p>Review: {{ comment_con }}</p>

        <div class="comment-cont">
            <div class="comment" v-for="(Review, index) in comments" :key="index">
                <h3>{{ Review.name }}</h3>
                <p>{{ Review.content }}</p>
            </div>
        </div>
    </div>






</template>

<style scoped lang="scss">
* {
    transition: all .3s ease;
    box-sizing: border-box;
}

.header {
    background-color: white;

    h1 {
        color: white;
    }
}

.app-icon {
    width: 250px;
    aspect-ratio: 1/1;
    border-radius: 70px;
}

.header {
    width: 100%;
    height: 700px;
    max-height: 773px;

    background: linear-gradient(to right, v-bind(darkvi) 28.45%, rgba(122, 122, 122, 0.185) 67.48%, v-bind(darkvi) 99.95%);
    position: relative;

    color: v-bind(lightvi);
    transition: background .4s ease;

    overflow: hidden;
    transition: all .2s ease;

    .back {
        position: absolute;
        right: 0;
        z-index: -1;
        width: 80%;
        height: 100%;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;

            transition: all .2s ease;
        }
    }

    .vid {
        height: 100%;
        width: max-content;
    }

    .header-text {
        width: 100%;
        max-width: 1300px;
        margin: auto;
        padding: 10px;
        height: 100%;


        display: flex;
        flex-direction: column;
        justify-content: center;


        h1 {
            font-size: 56px;
            font-weight: 700;
            margin-bottom: 0;
            padding-bottom: 0;
        }

        h4 {
            font-size: 20px;
            font-weight: 700;
            margin-top: 10px;
        }

        a {
            width: 100%;
            max-width: 200px;
            height: 36px;
            background-color: v-bind(lightvi);

            border-radius: 10px;
            margin-top: 30px;
            padding: 4px;

            display: flex;
            justify-content: center;
            align-items: center;

            >* {
                transform: scale(.7);
            }
        }
    }

}

@media screen and (max-width: 820px) {
    .header {
        height: 80vh;
        background: linear-gradient(0deg, v-bind(darkvi) 28.45%, rgba(122, 122, 122, 0.185) 67.48%);

        .back {
            width: 100%;
        }

        .vid {
            height: 80%;
            width: min-content;

            left: 50%;
            transform: translate(-50%);
        }

        .app-icon {
            width: 180px;
            border-radius: 28%;
        }

        .header-text {
            h1 {
                font-size: 40px;
            }
        }
    }
}


.screen-con {
    margin-top: 100px;
    width: 100%;

    display: flex;
    gap: 16px;
    overflow-x: scroll;


    .screen-wrap {
        width: fit-content;
    }

    .screen {
        height: 330px;
        border-radius: 10px;
        object-fit: contain;
    }
}


*::-webkit-scrollbar {
    width: 12px;
    height: 12px;
}

*::-webkit-scrollbar-track {
    background: var(--scroll-bar-bg-color);
}

*::-webkit-scrollbar-thumb {
    background-color: var(--scroll-bar-color);
    border-radius: 20px;
    border: 3px solid var(--scroll-bar-bg-color);
}


.content {
    width: 100%;
    max-width: 1100px;
    margin: auto;
    padding: 10px;


    p {
        color: #63676C;
    }

}
</style>