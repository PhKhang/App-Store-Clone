<template>
    <nav>
        <router-link to="/" class="logo">
            <i></i>
            App Store
        </router-link>

        <Search />
        <div class="links">
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>
        </div>
    </nav>
</template>

<script>
import Search from '@/components/Search.vue';

export default {
    components: {
        Search
    }
}
</script>

<style scoped lang="scss">
* {
    font-weight: 700;
}

nav {
    box-sizing: border-box;

    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    padding: 6px;
    margin: 0;


    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    a {
        text-decoration: none;
        color: inherit;
    }

    .links {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 50px;
    }
}
</style>