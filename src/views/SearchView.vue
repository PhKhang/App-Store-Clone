<template>

</template>

<script>
import { supabase } from '../supabase'

export default {
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

            let { data: Apps, error } = await supabase
                .from('Apps')
                .select('*')
                .textSearch('name', 'trò')

            this.data = Apps
            console.log('result: ', Apps)
        },
    },
    created() {
        this.search()
    }
}
</script>

<style scoped lang="scss">

</style>