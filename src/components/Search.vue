
<script>
import { supabase } from '../supabase'

export default       {
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
            console.log('loading to ', this.load)
            this.data = Apps
            console.log('result: ', this.searchQuery, Apps)
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

<template>
    <div class="search-box">
        <input type="text" @input="search()" v-model="searchQuery" placeholder="Search for apps and games...">
        <div class="search-under">
            <div class="back"></div>
            <p class="load" v-if="kiem()">Loading...</p>
            <div class="results" v-else>
                <router-link" class="result" v-for="(app) in data" :key="app.id" :to="app.down_url">
                    <img class="icon" :src="app.icon_url" alt="" referrerpolicy="no-referrer">
                    <p>{{ app.name }}</p>
                </router-link">
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">
.search-box         {
    width: fit-content;

    .search-under {
        z-index: 99;
        width: 300px;
        position: absolute;
        padding-top: 10px;
    }

    .back {
        position: absolute;

        height: 100%;
        width: 100%;
        z-index: 90;
        background-color: rgba(255, 255, 255, 0.875);
        filter: blur(50px);
    }


    input {
        width: 300px;
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

    .results {
        position: relative;
        z-index: 99;

        display: flex;
        flex-direction: column;
        gap: 10px;

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
                color: #63676C;
            }
        }
    }

}
</style>