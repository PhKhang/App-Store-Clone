<script>
import { ref } from "vue";
import { supabase } from '../supabase';
import { useRouter } from "vue-router";
import Nav from '@/components/Nav.vue'

export default {
    name: "login",
    components: {
        Nav
    },
    setup() {
        // Create data / vars
        const router = useRouter();
        const email = ref(null);
        const password = ref(null);
        const errorMsg = ref(null);

        // Login function
        const login = async () => {
            try {
                const { error } = await supabase.auth.signInWithPassword({
                    email: email.value,
                    password: password.value,
                });
                if (error) throw error;
                router.push({ name: "home" });
            } catch (error) {
                errorMsg.value = `Error: ${error.message}`;
                setTimeout(() => {
                    errorMsg.value = null;
                }, 5000);
            }
        };

        return { email, password, errorMsg, login };
    },
};
</script>


<template>
    <Nav />
    <div class="outer">
        <div class="columns">
            <div class="column">
                <img src="https://play-lh.googleusercontent.com/hNY9sHSFng41zM41-7reQQHhvEwgsLfaKT_c7v7CEKVudOLRYld6UgVcnlG-xQNXyDM=w240-h480-rw"
                    referrerpolicy="no-referrer">
                <img src="https://play-lh.googleusercontent.com/XdcScI3Zuy0CmXDKuUxlktK9JvMnM_WTVxpKQ0NikRtBacWTzc-nMVTdtjDFs9LPwwg=w240-h480-rw"
                    referrerpolicy="no-referrer">
                <img src="https://play-lh.googleusercontent.com/2yH_JCxn7D9FttXZViPhmvIEDfRhio5qdLdWJLxcIfh8PjIkVeBgt_Gj7q21dIRp97g=w240-h480-rw"
                    referrerpolicy="no-referrer">
                <img src="https://tse4.mm.bing.net/th?id=OIP.sdkOUG8y4yZs33SWJjk95wHaHp&pid=Api&P=0"
                    referrerpolicy="no-referrer">
            </div>
            <div class="column">
                <img src="https://play-lh.googleusercontent.com/CJ-qBO1DxxZ9OjuX1x0db-dKCe4Q0Y-hc79ONlRr5zUeIIqQpInhR4SctPzlb7ap0w=w240-h480-rw"
                    referrerpolicy="no-referrer">
                <img src="https://play-lh.googleusercontent.com/fDYdsxcx4rt4XWMFRhIdaDcgDkYkarVhGXYMZH3qnxAIgY0fyo4gIoVgoEtyVCnC5n0=w240-h480-rw"
                    referrerpolicy="no-referrer">
                <img src="https://play-lh.googleusercontent.com/ExTusrE6tBOXwC1uzd3EFHYSrlTv1UabD-rMMA2D3Q5WOTNZtAK5LomyqPI5O7LP774=w240-h480-rw"
                    referrerpolicy="no-referrer">
                <img src="https://play-lh.googleusercontent.com/bz1cf3mlWDba3SjZedKjjgSetdVKvZ6PxdPlocRrr3q1NM_jCnwNJ2xQ_VsEuQKGpB0"
                    referrerpolicy="no-referrer">
                <img src="https://image.winudf.com/v2/image1/Y29tLnN1cGVyY2VsbC5oYXlkYXlfaWNvbl8xNTYxMzc5NDYyXzA0Ng/icon.png?w=140&fakeurl=1"
                    referrerpolicy="no-referrer">
            </div>
            <div class="column">
                <img src="https://play-lh.googleusercontent.com/hNY9sHSFng41zM41-7reQQHhvEwgsLfaKT_c7v7CEKVudOLRYld6UgVcnlG-xQNXyDM=w240-h480-rw"
                    referrerpolicy="no-referrer">
                <img src="https://image.winudf.com/v2/image1/Y29tLnN1cGVyY2VsbC5ib29tYmVhY2hfaWNvbl8xNTU1MzI2OTcyXzA4NQ/icon.png?w=140&fakeurl=1"
                    referrerpolicy="no-referrer">
                <img src="https://play-lh.googleusercontent.com/WNWZaxi9RdJKe2GQM3vqXIAkk69mnIl4Cc8EyZcir2SKlVOxeUv9tZGfNTmNaLC717Ht=w240-h480"
                    referrerpolicy="no-referrer">
                <img src="https://image.winudf.com/v2/image1/Y29tLmlubmVyc2xvdGguc3BhY2VtYWZpYV9pY29uXzE2MjU2NzQyMTZfMDg0/icon.png?w=280&fakeurl=1"
                    referrerpolicy="no-referrer">
                <img src="https://play-lh.googleusercontent.com/YMSRhM3aMa62_gD8JxlJeEF2AvOxd7BGRNo2mNkJ_CqRhyBJToXPUZ5qHHNbp4TT7qU=w240-h480-rw"
                    referrerpolicy="no-referrer">
                <img src="https://play-lh.googleusercontent.com/7ZUSJ7zfFSHlyjUBH2oWBJGkdW3CNSp7Tl6ZX7AuFcQSQbJut_tZP2GAyxheSa4OsVg=w240-h480-rw"
                    referrerpolicy="no-referrer">
            </div>
            <div class="column">
                <img src="https://play-lh.googleusercontent.com/Xdplpd2qDjHDG7cPMROU42NpIPiz3-QRIDXat1RDoDL3hm77boOFqmqOaDvSKb9FHq9I=w240-h480-rw"
                    referrerpolicy="no-referrer">
                <img src="https://play-lh.googleusercontent.com/WRqyDBHjPjPtTNFLE-viIQFdmSjc16v5RKDEQshMccPEhMRBoYpNvrRe1wfLNuU8Hb0=w240-h480-rw"
                    referrerpolicy="no-referrer">
                <img src="https://image.winudf.com/v2/image1/Y29tLnN1cGVyY2VsbC5jbGFzaHJveWFsZV9pY29uXzE1OTk3MjQzODlfMDk3/icon.png?w=280&fakeurl=1"
                    referrerpolicy="no-referrer">
                <img src="https://image.winudf.com/v2/image1/Y29tLnN1cGVyY2VsbC5icmF3bHN0YXJzX2ljb25fMTYwNTA4MjQ3M18wNDY/icon.png?w=140&fakeurl=1"
                    referrerpolicy="no-referrer">
                <img src="https://image.winudf.com/v2/image1/Y29tLnJvdmlvLmJhYmFfaWNvbl8xNjY5MDQ3NDEzXzA1NQ/icon.png?w=140&fakeurl=1"
                    referrerpolicy="no-referrer">
            </div>
            <div class="column">
                <img src="https://image.winudf.com/v2/image1/Y29tLnN1cGVyY2VsbC5oYXlkYXlfaWNvbl8xNTYxMzc5NDYyXzA0Ng/icon.png?w=140&fakeurl=1"
                    referrerpolicy="no-referrer">

                <img src="https://play-lh.googleusercontent.com/lSsveSVEIpCjixX8K3lQSe2BSbrcUIu1Faum87k_Kbje_xIE5aEFDMGOPYCIJCJfWtQ=w240-h480-rw"
                    referrerpolicy="no-referrer">
                <img src="https://play-lh.googleusercontent.com/S3GPwY1-mc5876ZnMk65-VrG3Xlh1R8zgK-Q_LlnbjZ7llyyv0ZGWIlNnBM7LckMMzYy=w240-h480-rw"
                    referrerpolicy="no-referrer">
                <img src="https://image.winudf.com/v2/image1/Y29tLmlyb25oaWRlZ2FtZXMuYW5kcm9pZC5raW5nZG9tcnVzaF9pY29uXzE1NjY5OTUzMjdfMDkx/icon.png?w=140&fakeurl=1"
                    referrerpolicy="no-referrer">
            </div>
            <div class="column">
                <img src="https://image.winudf.com/v2/image1/Y29tLmlyb25oaWRlZ2FtZXMuYW5kcm9pZC5raW5nZG9tcnVzaF9pY29uXzE1NjY5OTUzMjdfMDkx/icon.png?w=140&fakeurl=1"
                    referrerpolicy="no-referrer">
                <img src="https://image.winudf.com/v2/image1/Y29tLmdhbWUua2tpcnVrLm15YWRvcmFibGVjYXRzX2ljb25fMTY0MjQzOTkwNF8wODc/icon.png?w=100&fakeurl=1&type=.webp"
                    referrerpolicy="no-referrer">
                <img src="https://image.winudf.com/v2/image1/Y29tLmFjdGl2aXNpb24uY2FsbG9mZHV0eS5zaG9vdGVyX2ljb25fMTYzNzA0NjEyOF8wMDc/icon.png?w=140&fakeurl=1"
                    referrerpolicy="no-referrer">
                <img src="https://image.winudf.com/v2/image1/Y29tLnJvdmlvLmJhYmFfaWNvbl8xNjY5MDQ3NDEzXzA1NQ/icon.png?w=140&fakeurl=1"
                    referrerpolicy="no-referrer">
            </div>
        </div>

        <div class="box">
            <h1>Welcome back</h1>
            <!-- Error Handling -->
            <div v-if="errorMsg" class="error">
                <p class="error">{{ errorMsg }}</p>
            </div>
            <!-- Login -->
            <form @submit.prevent="login">
                <h2>It's been a while</h2>
                <div>
                    <input type="text" required id="email" v-model="email"
                        :placeholder="'\uf1d8  Again, your email?'" />
                </div>
                <div>
                    <input type="password" required id="password" v-model="password"
                        :placeholder="'\uf023  ...and your password too'" />
                </div>
                <button type="submit">
                    Login
                </button>
                <router-link :to="{ name: 'register' }">Don't have an account? <span>Register</span>
                </router-link>
            </form>
        </div>
    </div>
</template>
  
<style lang="scss" scoped>
* {
    box-sizing: border-box;
    transition: all .4s ease;
}

.outer {
    position: relative;
    width: 100%;
    height: calc(100vh - 50px);
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 50.06%);

    overflow: hidden;
}

.box {
    width: 50%;
    float: right;

    h1 {
        font-size: 90px;
        text-align: left;
        font-weight: 700;
        margin-top: 0;
        margin-bottom: 0px;
    }

    h2 {
        text-align: left;
        font-size: 40px;
        font-weight: 500;
        margin-top: 0px;
        margin-bottom: 30px;
    }
}

.box form {

    input {
        font-family: 'Lexend deca', arial, 'FontAwesome';
        height: 45px;
        width: 100%;
        max-width: 430px;

        // only for the gradient border
        padding: 5px;
        border: double 3.5px transparent;
        border-radius: 15px;
        background-image: linear-gradient(white, white),
            linear-gradient(to right, #050423, #2EDBFF) !important;
        background-origin: border-box;
        background-clip: padding-box, border-box;

        margin-top: 14px;

        font-size: 17px;
        font-weight: 400px;



        &::placeholder {
            color: hsl(213, 4%, 1%);
            font-size: 17px;
            font-weight: 400px;
        }

        &:-webkit-autofill,
        &:-webkit-autofill:focus {
            transition: background-color 600000s 0s, color 600000s 0s;
        }

    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        transition: background-color 5000s ease-in-out 0s;
    }

    button {
        margin-top: 14px;

        font-size: 17px;

        background-color: none;
        border: none;

    }

}

.columns {
    width: 900px;

    position: absolute;
    z-index: -1;
    left: -30px;

    display: flex;
    justify-content: space-between;

    transform: rotate(-24deg);


}

.column {
    &:nth-child(even) {
        margin-top: -50px;
    }

    &:nth-child(3) {
        margin-top: -150px;
    }

    width: fit-content;

    position: relative;

    display: flex;
    flex-direction: column;
    gap: 25px;

    animation: floatBubble 5s cubic-bezier(0, 0, 1, 1.42) 0s 1 forwards,
    floatBubble2 3s linear 0s 1 forwards;

    img {
        width: 120px;
        aspect-ratio: 1/1;
        border-radius: 25%;
    }

}

@keyframes floatBubble {
    0% {
        top: 70px;
    }

    100% {
        top: 0px;
    }
}

@keyframes floatBubble2 {
    0% {
        transform: scale(1.06);
    }

    100% {
        transform: scale(1);
    }
}

@media screen and (max-width: 880px) {
    .outer {
        background: linear-gradient(122.33deg, rgba(255, 255, 255, 0) 30.62%, #FFFFFF 72.75%),
            linear-gradient(237.67deg, rgba(255, 255, 255, 0) 30.62%, #FFFFFF 72.03%);
    }

    .box {
        position: relative;


        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        height: 100%;
        width: 100%;
        float: left;

        h1 {
            width: 100%;

            font-size: 60px;
            text-align: center;
        }

        h2 {
            text-align: center;
        }
    }


}
</style>