<template>
    <div class="main">
        <div class="banner">
            <div class="content inner-banner">
                <div class="profile"></div>
            </div>
        </div>

        <div class="content">

            <div class="basic">
                <input class="name" type="text" v-model="name" placeholder="Your name here"
                    :disabled="edit ? '' : disabled" :class="{ edit: !edit }">
                <textarea :disabled="edit ? '' : disabled" :class="{ edit: !edit }" @input="type()" v-model="bio"
                    type="text" placeholder="Have a brief description of yourself here" :rows="6"></textarea>
            </div>

            <div class="socials">
                <a v-if="edit && fb" :href="fb" :disabled="edit ? disable : ''"><span id="fb">{{ '\uf082' }}</span> {{
                        fb
                }}</a>
                <input v-if="!edit" class="fb" :class="{ edit: !edit }" type="text" v-model="fb"
                    placeholder="Add a Facebook link">

                <br v-if="edit && ig">
                <a v-if="edit && ig" :href="ig" :disabled="edit ? disable : ''"><span id="ig">{{ '\ue055' }}</span> {{
                        ig
                }}</a>
                <input v-if="!edit" class="ig" :class="{ edit: !edit }" type="text" v-model="ig"
                    placeholder="Add a Instagram link">

                <br v-if="edit && twt">
                <a v-if="edit && twt" :href="twt" :disabled="edit ? disable : ''"><span id="twt">{{ '\uf081' }}</span>
                    {{ twt
                    }}</a>
                <input v-if="!edit" class="twt" :class="{ edit: !edit }" type="text" v-model="twt"
                    placeholder="Add a Twitter">
            </div>

            <button @click="(edit = !edit)" class="edit-button">Edit info
                <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M24.5718 16.1242L22.3387 14.8347C22.5641 13.6185 22.5641 12.371 22.3387 11.1548L24.5718 9.86533C24.8287 9.71856 24.944 9.41453 24.8601 9.13147C24.2783 7.26534 23.2875 5.57745 21.9928 4.17261C21.7936 3.9577 21.4686 3.90528 21.217 4.05205L18.9839 5.34156C18.0456 4.53431 16.9658 3.91052 15.7968 3.50165V0.927868C15.7968 0.634321 15.5924 0.377467 15.3041 0.314564C13.3803 -0.115273 11.4094 -0.0943054 9.57992 0.314564C9.29162 0.377467 9.08718 0.634321 9.08718 0.927868V3.50689C7.92348 3.921 6.84364 4.54479 5.9001 5.3468L3.67228 4.05729C3.41543 3.91052 3.09567 3.9577 2.89648 4.17786C1.60173 5.57745 0.611004 7.26534 0.0291513 9.13671C-0.0599613 9.41977 0.0606028 9.7238 0.317457 9.87058L2.55051 11.1601C2.32511 12.3762 2.32511 13.6238 2.55051 14.8399L0.317457 16.1294C0.0606028 16.2762 -0.0547193 16.5802 0.0291513 16.8633C0.611004 18.7294 1.60173 20.4173 2.89648 21.8221C3.09567 22.0371 3.42067 22.0895 3.67228 21.9427L5.90534 20.6532C6.84364 21.4605 7.92348 22.0842 9.09242 22.4931V25.0721C9.09242 25.3657 9.29686 25.6225 9.58516 25.6854C11.5089 26.1153 13.4799 26.0943 15.3093 25.6854C15.5976 25.6225 15.8021 25.3657 15.8021 25.0721V22.4931C16.9658 22.079 18.0456 21.4552 18.9892 20.6532L21.2222 21.9427C21.4791 22.0895 21.7988 22.0423 21.998 21.8221C23.2928 20.4226 24.2835 18.7347 24.8653 16.8633C24.944 16.575 24.8287 16.271 24.5718 16.1242V16.1242ZM12.442 17.1883C10.1303 17.1883 8.24848 15.3064 8.24848 12.9948C8.24848 10.6831 10.1303 8.80123 12.442 8.80123C14.7537 8.80123 16.6355 10.6831 16.6355 12.9948C16.6355 15.3064 14.7537 17.1883 12.442 17.1883V17.1883Z"
                        fill="black" />
                </svg>

            </button>

            <button @click="updateInfo()" class="edit-button">Save
            </button>

            <button @click="logout()" class="logout-button">Logout
                <svg width="33" height="25" viewBox="0 0 33 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M32.3514 13.6059L21.4157 24.5416C20.4393 25.518 18.7469 24.8345 18.7469 23.435V17.186H9.89419C9.02845 17.186 8.33195 16.4895 8.33195 15.6238V9.37483C8.33195 8.50909 9.02845 7.81259 9.89419 7.81259H18.7469V1.56362C18.7469 0.170627 20.4328 -0.519362 21.4157 0.457038L32.3514 11.3927C32.9568 12.0046 32.9568 12.994 32.3514 13.6059ZM12.4979 24.2161V21.6124C12.4979 21.1828 12.1464 20.8313 11.7168 20.8313H6.24896C5.09681 20.8313 4.16597 19.9004 4.16597 18.7483V6.25035C4.16597 5.09819 5.09681 4.16736 6.24896 4.16736H11.7168C12.1464 4.16736 12.4979 3.81585 12.4979 3.38624V0.782505C12.4979 0.352889 12.1464 0.00138444 11.7168 0.00138444H6.24896C2.79901 0.00138444 0 2.8004 0 6.25035V18.7483C0 22.1982 2.79901 24.9972 6.24896 24.9972H11.7168C12.1464 24.9972 12.4979 24.6457 12.4979 24.2161Z"
                        fill="black" />
                </svg>

            </button>

            <h3>Id: {{ user.id }}</h3>
        </div>


    </div>


</template>

<script>
import { supabase } from '../supabase'
import { computed } from "@vue/reactivity";
import Inplace from 'primevue/inplace';
import InputText from 'primevue/inputtext';
import store from '@/store';
import { useRouter } from "vue-router";

export default {
    components: {
        Inplace,
        InputText
    },
    data() {
        return {
            id: 0,
            user: '',
            name: '',
            bio: '',
            fb: '',
            ig: '',
            twt: '',
            edit: true
        }
    },
    methods: {
        async load() {
            // console.log(this.data, 'ihgihgih')
            const { data: { user } } = await supabase.auth.getUser();

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

        async updateInfo() {
            this.edit = false
            let { data: Profiles, error } = await supabase
                .from('profiles')
                .update([
                    {
                        username: this.name,
                        bio: this.bio,
                        fb: this.fb,
                        ig: this.ig,
                        twt: this.twt,
                    }
                ])
                .eq("id", this.id)
            this.load()
        },

        async logout() {
            await supabase.auth.signOut();
            this.$router.push({ name: "home" });
        }
    },
    created() {
        this.load()
    }
}
</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
    font-family: 'Lexend deca', arial, 'FontAwesome';

    transition: border .4s ease;
}

input {
    border: 2px solid transparent;
    border-radius: 10px;
}

textarea {
    border: 2px solid transparent;
    border-radius: 10px;
    resize: none;

    transition: width .1s ease;
}

.main {
    width: 100%;
    padding: 0;
}

.banner {
    position: relative;

    width: calc(100% - 60px);
    height: 300px;
    margin: auto;
    margin-bottom: 80px;

    background: linear-gradient(90deg, #F8E1AB 0%, #F6D0CB 100%);
    border-radius: 24px 24px 0px 0px;

    .inner-banner {
        position: relative;
        height: 100%;
    }

    .profile {
        position: absolute;
        left: 50px;
        bottom: -60px;

        width: 150px;
        aspect-ratio: 1/1;
        border-radius: 50%;

        background-color: blue;
        border: 10px white solid;
    }
}

.content {
    width: 100%;
    max-width: 900px;
    margin: auto;

    &:nth-child(2) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-template-rows: 2fr 1fr;
        grid-template-areas:
            "a b"
            "a b";
    }
}

.basic {
    grid-area: a;

    display: flex;
    flex-direction: column;

    .name {
        font-size: 40px;
        font-weight: 700;
    }
}

.socials {
    grid-area: b;

    a {
        color: inherit;
        text-decoration: none;
    }

    #fb {
        font-size: 18px;

        color: blue;
    }

    #ig {
        font-size: 18px;

        background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
        -webkit-background-clip: text;
        /* Also define standard property for compatibility */
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    #twt {
        font-size: 18px;

        color: #1DA1F2;
    }
}

.edit-button {
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 30px;
    width: 130px;
    padding-left: 15px;
    margin: 20px;
    font-weight: 500;
    font-size: 16px;

    background-color: #AFE1AA;
    border: none;
    border-radius: 15px;


    cursor: pointer;

    svg {
        transform: scale(.7);
    }
}

.logout-button {
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 30px;
    width: 130px;
    padding-left: 15px;
    margin: 20px;
    font-weight: 500;
    font-size: 16px;

    background-color: #DFA4A4;
    border: none;
    border-radius: 15px;


    cursor: pointer;

    svg {
        transform: scale(.6);
    }
}

input:disabled {
    color: black;
}

.edit {
    border: 2px solid rgb(179, 179, 179);

}

a {
    text-align: left;

}

a span {
    border: 1px solid transparent;
}

/* a.edit {
    pointer-events: none;
} */

@media screen and (max-width: 880px) {
    .banner {
        width: calc(100% - 20px);

        .profile {
            left: 20px;
            transform: all .4s ease;
        }

    }

    .content:nth-child(2) {
        display: flex;
        flex-direction: column;
    }
}
</style>