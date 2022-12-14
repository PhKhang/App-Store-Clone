<template>
    <h3>Name: {{ (user.full_name) ? user.full_name : 'null' }}</h3>
    <h3>Id: {{ user.id }}</h3>

    <Inplace :closable="true">
        <template #display>
            <span class="pi pi-search" style="vertical-align: middle"></span>
            {{ name || 'Click to Edit' }}
        </template>

        <template #content>
            <InputText v-model="name" autoFocus class="p-inputtext-filled" />
        </template>
    </Inplace>


</template>

<script>
import { supabase } from '../supabase'
import { computed } from "@vue/reactivity";
import Inplace from 'primevue/inplace';
import InputText from 'primevue/inputtext';
import store from '@/store';



export default {
    components: {
        Inplace,
        InputText
    },
    data() {
        return {
            user: '',
            name: 'khang'
        }
    },
    methods: {
        async load() {
            // console.log(this.data, 'ihgihgih')
            const { data: { user } } = await supabase.auth.getUser();
            console.log(user.id, 'this is the user data')

            let { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)

            this.user = profile[0]
            console.log(profile, 'this is the user profile')
        },
    },
    created() {
        this.load()
    }
}
</script>

<style lang="scss" scoped>
.p-inplace,
.p-inplace-display,
.p-inplace-content {
    height: 10px;

}
</style>