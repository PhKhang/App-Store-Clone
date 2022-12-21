
<script>
import { supabase } from '../supabase'

export default {
    data() {
        return {
            searchQuery: "",
            data: [],
            load: false
        }
    },
    props: {
        appData: ''
    },
    methods: {
        async load() {
            // console.log(this.data, 'ihgihgih')

            let { data: Apps, error } = await supabase
                .from('Apps')
                .select('*')

            this.data = Apps
            console.log(Apps)
        },

        async search() {
            // console.log(this.data, 'ihgihgih')
            this.load = true
            if (this.searchQuery == '') {
                this.load = false
            }

            console.log('loading to ', this.load)
            console.log(this.searchQuery)

            let { data: Apps, error } = await supabase
                .from('Apps')
                .select('*')
                .textSearch('name', this.searchQuery, {
                    type: 'websearch',
                    config: 'english'
                })

            this.load = false
            this.data = Apps
        },

        kiem() {
            if (this.load) {
                return true
            }
            else {
                return false
            }
        }
    },
    created() {
    }
}
</script>
<svg class='hideSvgSoThatItSupportsFirefox'>
    <filter id='sharpBlur'>
        <feGaussianBlur stdDeviation='90'></feGaussianBlur>
        <feColorMatrix type='matrix' values='1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 9 9 9 0'></feColorMatrix>
        <feComposite in2='SourceGraphic' operator='in'></feComposite>
    </filter>
</svg>
<template>
    <div class="search-box">


        <form @submit.prevent="search()">
            <input type="text" v-model="searchQuery" placeholder="Search for apps and games...">
        </form>

        <div class="search-under" v-if="(data.length > 0 || load == true) && searchQuery != ''">
            <div class="back" v-if="data.length > 0 || load"></div>

            <p class="load" v-if="kiem()">Loading...</p>

            <div v-else class="results">
                <router-link class="result" v-for="(app) in data" :key="app.id" :to="'/app/' + app.id">

                    <img class="icon" :src="app.icon_url" alt="" referrerpolicy="no-referrer">
                    <p>{{ app.name }}</p>

                </router-link>
            </div>


        </div>
    </div>

</template>

<style scoped lang="scss">
.search-box {
    width: 220px;

    .search-under {
        z-index: 99;
        width: 220px;
        position: absolute;
        padding-top: 10px;
    }

    .back {
        position: absolute;
        top: 1px;

        height: 100%;
        width: 100%;
        border-radius: 8px;
        padding: 5px;
        padding-top: 0;

        z-index: -1;
        background-color: rgba(255, 255, 255, 0.875);
        filter: url("#sharpBlur");

        overflow: hidden;
    }


    input {
        width: 220px;
        height: 32px;
        border-radius: 8px;

        border: 2px solid #B2B5B8;
        padding-left: 10px;
        padding-right: 10px;

        font-family: 'Lexend Deca';
        color: #343638;

    }

    input:active {
        outline-color: #B2B5B8;
    }

    p {
        margin: 10px 10px;
    }

    .results {
        position: relative;
        z-index: 99;

        display: flex;
        flex-direction: column;
        gap: 10px;


        padding: 10px 10px;

        .result {
            position: relative;
            z-index: 99;

            display: flex;
            align-items: center;

            .icon {
                width: 50px;
                aspect-ratio: 1/1;
                object-fit: cover;

                border-radius: 25%;
            }

            p {
                margin-left: 5px;
                text-align: left;
                // color: #63676C;
            }
        }
    }

}

a {
    text-decoration: none;

    &:visited {
        color: inherit;
    }
}

svg {
    width: 0;
    height: 0;
    overflow: hidden;
    visibility: hidden;
}
</style>
