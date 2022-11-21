<template>
    <nav>
        <div class="logo">
            <i></i>
            App Store
        </div>

        <div class="links">
            <router-link to="/">Home</router-link>
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>
        </div>
    </nav>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
nav {
    box-sizing: border-box;

    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    padding: 6px;
    margin: 0;

    border: solid;

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    .links {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 50px;
    }
}
</style>