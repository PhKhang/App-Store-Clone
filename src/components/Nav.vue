<template>

</template>

<script>
import Search from '@/components/Search.vue';

export default {
    components: {
        Search
    }
}
</script>

<style lang="scss">
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
        font-weight: 700;
        text-decoration: none;
        color: inherit;
    }

    .links {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;

        .desk {
            font-weight: 700;
        }
    }
}


@media screen and (max-width: 600px) {
    .desk {
        display: none;
    }
}

@media screen and (min-width: 601px) {
    .mobile {
        display: none;
    }
}
</style>