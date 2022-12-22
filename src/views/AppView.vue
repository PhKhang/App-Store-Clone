

<script>
import { supabase } from '../supabase'
import Nav from '@/components/Nav.vue'
import Vibrant from 'node-vibrant'
import Rating from 'primevue/rating';

// let des = document.querySelector(".des").scrollHeight > document.querySelector(".des").clientHeight;


export default {
    name: 'app',
    components: {
        Nav,
        Rating
    },
    props: {
        appData: Object
    },
    data() {
        return {
            page_title: 'Blog',
            commentName: [],
            isOverflow: 0,
            posts: [],
            data: [],
            text: '',
            comment_con: '',
            app: [1],
            comments: [],
            palette: {},
            val: '0',
            id: '',
            user: '',
            name: '',
            bio: '',
            fb: '',
            ig: '',
            twt: '',
        }
    },
    computed: {
        vibrant() {
            Object.keys(this.palette).length
            if (Object.keys(this.palette).length == 0) {
                return '#000';
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
                return '#000';
            }
            return this.palette.DarkVibrant.getHex();
        },
        muted() {
            Object.keys(this.palette).length
            if (Object.keys(this.palette).length == 0) {
                return '#000';
            }
            return this.palette.Muted.getHex();
        },
        lightmuted() {
            Object.keys(this.palette).length
            if (Object.keys(this.palette).length == 0) {
                return '#000';
            }
            return this.palette.LightMuted.getHex();
        },
        darkmuted() {
            Object.keys(this.palette).length
            if (Object.keys(this.palette).length == 0) {
                return '#000';
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

        async loadUserInfo() {
            // console.log(this.data, 'ihgihgih')
            const { data: { user } } = await supabase.auth.getUser();

            if (user == null) {
                return
            }

            let { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)


            console.log(user.id, 'this is the user data')
            this.id = user.id
            this.user = profile[0]
            this.name = profile[0].username
            this.bio = profile[0].bio
            this.fb = profile[0].fb
            this.ig = profile[0].ig
            this.twt = profile[0].twt

            console.log(profile, 'this is the user profile')
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

        async addReviews(id, by, content, name, val) {
            console.log({ id, name: by, content })
            let { data: Reviews, error } = await supabase
                .from('Reviews')
                .insert([
                    {
                        for_id: id,
                        by: by,
                        content: content,
                        name: name,
                        rating: val
                    }
                ])

            console.log({ id, name: by, content })
            this.val = 0;
            this.comment_con = ""

            this.updateReviews(this.$route.params.id);

        },

        async getName(id) {
            let { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', id)

            console.log(profile)
            return profile
        },
        async searchUserName(id, oldname) {
            // console.log(this.data, 'ihgihgih')

            console.log("before await")
            const profile = await this.getName(id)
            console.log("after await")

            if (profile != null) {
                console.log("user name", profile[0].username)
                this.commentName.unshift(profile[0].username)
                return
            }
            else {
                console.log("old name")
                this.commentName.unshift(oldname)
                return
            }
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
        expandDes() {
            console.log('Expanding...');
            const des = document.querySelector(".des");
            this.isOverflow = des.scrollHeight > des.clientHeight;
            console.log((des.scrollHeight > des.clientHeight) ? 'overflow' : 'not');
            document.querySelector(".des").style.height = "max-content";
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
        },

    },

    created() {
        this.match(this.$route.params.id);
        this.updateReviews(this.$route.params.id);
        this.loadUserInfo();



    },
    mounted() {

    }
}
</script>

<template>
    <Nav />


    <div class="header">
        <video class="back vid" v-if="app[0].header_url" autoplay loop :muted="true">
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

            <Rating v-model="app[0].rating" :cancel="false" readonly />
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

        <h3>Description</h3>
        <p class="des" style="white-space: pre-wrap">{{ app[0].des }}</p>
        <button @click="expandDes" class="expand" v-if="!isOverflow">Read more <svg width="39" height="18"
                viewBox="0 0 39 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M27.4394 0.376574C28.0251 -0.125524 28.9749 -0.125524 29.5607 0.376574L38.5607 8.09087C39.1465 8.59298 39.1465 9.40707 38.5607 9.90915L29.5607 17.6234C28.9749 18.1255 28.0251 18.1255 27.4394 17.6234C26.8536 17.1214 26.8536 16.3073 27.4394 15.8052L33.8787 10.2857L1.5 10.2861C0.671581 10.2861 0 9.71044 0 9.00034C0 8.29026 0.671581 7.71462 1.5 7.71462L33.8787 7.7143L27.4394 2.19486C26.8536 1.69275 26.8536 0.878684 27.4394 0.376574Z"
                    fill="#331D0B" />
            </svg>
        </button>

        <h3>Comment</h3>



        <!-- Nhap ten va review cua nguoi dung -->
        <form v-if="user" action="" @submit.prevent="addReviews($route.params.id, user.id, comment_con, name, val)">
            <div class="them-com">
                <!-- <input :value="text" @input="onInput" placeholder="Type here"> -->
                <h3><span>Thêm bình luận với tên: </span>{{ name }}</h3>

                <Rating v-model="val" />
                <textarea :value="comment_con" @input="onInputCon" placeholder="Your review here"></textarea>
                <button type="submit">
                    Thêm bình luận
                </button>
            </div>
        </form>
        <h3 v-else>Vui lòng đăng nhặp để sử dụng chức năng bình luận</h3>



        <!-- Hien thi tat ca review cua ung dung -->
        <div class="comment-cont">
            <div class="comment" v-for="(Review, index) in comments" :key="index">
                <h3>{{ Review.name }}</h3>
                <p>{{ Review.content }}</p>
                <Rating v-model="Review.rating" :cancel="false" readonly />

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

    background-color: black;
    background: linear-gradient(to right, v-bind(darkvi) 28.45%, rgba(37, 37, 37, 0.185) 67.48%, v-bind(darkvi) 99.95%);
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

    .des {
        width: 100%;

        line-height: 2.5ex;
        height: 7.5ex;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        transition: all 4s ease;
    }

    .expand {
        display: flex;
        align-items: center;
        justify-content: space-between;

        height: 30px;
        width: 300px;
        padding-left: 20px;
        margin: 20px;
        font-weight: 500;
        font-size: 16px;

        background-color: v-bind(lightvi);
        border: none;
        border-radius: 15px;


        cursor: pointer;

        svg {
            transform: scale(.7);
        }
    }

}

.them-com {
    border: 2px solid #b2b2b2;
    border-radius: 10px;
    padding: 10px;

    span {
        font-weight: 400;
    }

    textarea {
        border: 2px solid #b2b2b2;
        border-radius: 8px;
        padding: 10px;
        margin: 0;
        margin-top: 5px;
    }

    button {
        background-color: v-bind(lightvi);
        border: none;
        border-radius: 4px;

        margin: 4px;
        font-weight: 500;
    }
}

:deep(.p-rating-icon) {
    color: v-bind(lightvi) !important;
}

.comment {
    border: 2px solid #b2b2b2;
    border-radius: 10px;
    padding: 10px;
    margin-top: 10px;

    h3 {
        margin-top: 0;
        margin-bottom: 5px;
    }
}
</style>