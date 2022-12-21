    
<script>
import { ref, getCurrentInstance } from "vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import Nav from '@/components/Nav.vue'

let user_name = ''
export default {
    name: "register",
    data() {
        return {
        }
    },
    components: {
        Nav
    },
    props: {
        appData: {
            default: [{}],
            type: Object,
        }
    },
    setup() {

        // Create data / vars
        const router = useRouter();
        const email = ref(null);
        const password = ref(null);
        const confirmPassword = ref(null);
        const errorMsg = ref(null);
        const name = ref('null')

        // Register function
        const register = async () => {
            if (password.value === confirmPassword.value) {
                try {
                    console.log(name.value)
                    const { error } = await supabase.auth.signUp(
                        {
                            email: email.value,
                            password: password.value,

                        },
                        {
                            data: {
                                "name": name.value
                            }
                        });
                    if (error) throw error;

                    router.push({ name: "login" });
                } catch (error) {
                    errorMsg.value = error.message;
                    setTimeout(() => {
                        errorMsg.value = null;
                    }, 5000);
                }
                return;
            }
            errorMsg.value = "Error: Passwords do not match";
            setTimeout(() => {
                errorMsg.value = null;
            }, 5000);
        };

        return { email, password, confirmPassword, errorMsg, register, name };
    },
};
</script>
<template>
    <Nav />
    <div class="outer">
        <div class="back" id="right"></div>
        <div class="back" id="left"></div>
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
            </div>
            <div class="column">
                <img src="https://image.winudf.com/v2/image1/Y29tLnN1cGVyY2VsbC5ib29tYmVhY2hfaWNvbl8xNTU1MzI2OTcyXzA4NQ/icon.png?w=140&fakeurl=1"
                    referrerpolicy="no-referrer">
                <img src="https://play-lh.googleusercontent.com/WNWZaxi9RdJKe2GQM3vqXIAkk69mnIl4Cc8EyZcir2SKlVOxeUv9tZGfNTmNaLC717Ht=w240-h480"
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
            </div>
            <div class="column">
                <img src="https://image.winudf.com/v2/image1/Y29tLnN1cGVyY2VsbC5oYXlkYXlfaWNvbl8xNTYxMzc5NDYyXzA0Ng/icon.png?w=140&fakeurl=1"
                    referrerpolicy="no-referrer">
                <img src="https://image.winudf.com/v2/image1/Y29tLmlubmVyc2xvdGguc3BhY2VtYWZpYV9pY29uXzE2MjU2NzQyMTZfMDg0/icon.png?w=280&fakeurl=1"
                    referrerpolicy="no-referrer">
                <img src="https://play-lh.googleusercontent.com/lSsveSVEIpCjixX8K3lQSe2BSbrcUIu1Faum87k_Kbje_xIE5aEFDMGOPYCIJCJfWtQ=w240-h480-rw"
                    referrerpolicy="no-referrer">
                <img src="https://play-lh.googleusercontent.com/S3GPwY1-mc5876ZnMk65-VrG3Xlh1R8zgK-Q_LlnbjZ7llyyv0ZGWIlNnBM7LckMMzYy=w240-h480-rw"
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




        <!-- Register -->
        <div class="box">

            <!-- Error Handling -->
            <div v-if="errorMsg">
                <p class="error">{{ errorMsg }}</p>
            </div>

            <form @submit.prevent="register">
                <h1>Hello</h1>
                <h2>and welcome to our store</h2>

                <div class="email">
                    <input type="text" required id="email" v-model="email" :placeholder="'\uf1d8  ...email?'" />
                </div>
                <div class="password">
                    <input type="password" required id="password" v-model="password"
                        :placeholder="'\uf023  ...and your password'" />
                </div>
                <div class="confirm-pass">
                    <input type="password" required id="confirmPassword" v-model="confirmPassword"
                        :placeholder="'\uf023  Just making sure it\'s the right one'" />
                </div>
                <button type="submit">
                    Register
                </button>
                <router-link :to="{ name: 'login' }">
                    Already have one? <span>Login</span>
                </router-link>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
* {
    box-sizing: border-box;
    transition: all .4s ease;
}

.outer {
    position: relative;
    height: 100vh;
    width: 100%;

    overflow-x: hidden;
}

.back {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;

    &#right {
        background: linear-gradient(237.67deg, rgba(255, 255, 255, 0) 35%, #FFFFFF 75%);
    }

    &#left {
        background: linear-gradient(122.33deg, rgba(255, 255, 255, 0) 35%, #FFFFFF 75%);
    }
}

.columns {
    width: 1100px;

    position: absolute;
    z-index: -1;
    left: 50%;
    transform: translate(-50%);
    display: flex;
    justify-content: space-evenly;
}

.column {
    position: relative;

    width: fit-content;

    display: flex;
    flex-direction: column;
    gap: 25px;

    img {
        width: 120px;
        aspect-ratio: 1/1;
        border-radius: 25%;
    }

    &:nth-child(odd) {
        margin-top: -50px;
    }

    animation: floatBubble 5s cubic-bezier(0, 0, 1, 1.42) 0s 1 forwards,
    floatBubble2 3s linear 0s 1 forwards;
}

@keyframes floatBubble {
    0% {
        top: 30px;
    }

    100% {
        top: -20px;
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

.box {
    width: 100%;
    max-width: 600px;

    position: relative;
    top: 10%;
    margin: auto;

    display: flex;
    flex-direction: column;
    align-items: center;

    overflow-y: hidden;


    h1 {
        font-size: 140px;
        text-align: center;
        margin-bottom: 0px;

        background-color: #00DBDE;
        background-image: linear-gradient(90deg, #00bbbe 0%, #FC00FF 100%);




        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        animation: textAnimate 5s ease-in-out 0s infinite alternate;
    }

    h2 {
        text-align: center;
        margin-top: 0px;
        margin-bottom: 30px;
    }
}


@keyframes textAnimate {
    from {
        filter: hue-rotate(0deg);

    }

    to {
        filter: hue-rotate(110deg);

    }
}

.box form {
    div {
        display: flex;
    }

    input {
        font-family: 'Lexend deca', arial, 'FontAwesome';
        height: 45px;
        width: 100%;
        max-width: 330px;

        // only for the gradient border
        padding: 5px;
        border: double 3.5px transparent;
        border-radius: 15px;
        background-image: linear-gradient(white, white),
            linear-gradient(to right, #050423, #2EDBFF) !important;
        background-origin: border-box;
        background-clip: padding-box, border-box;

        margin: auto;
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
        color: black;
        padding: 5px;
        margin-left: 20px;
        margin-right: 20px;

        background-color: white;

        border: 3.5px solid black;
        border-radius: 15px;

        cursor: pointer;
    }

}

@media screen and (max-width: 880px) {
    .columns {
        width: 800px;

        left: 50%;
        transform: translate(-50%);
        display: flex;
        justify-content: space-evenly;
    }

    .column {
        width: fit-content;

        display: flex;
        flex-direction: column;
        gap: 25px;

        img {
            width: 100px;
            aspect-ratio: 1/1;
            border-radius: 25%;
        }
    }
}
</style>
  