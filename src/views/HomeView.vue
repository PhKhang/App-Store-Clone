

<script>
import { supabase } from '../supabase'
import AddApp from '@/components/AddApps.vue'
import Nav from '@/components/Nav.vue'
import { anyTypeAnnotation } from '@babel/types'


export default {
	name: 'home',
	components: {
		AddApp,
		Nav
	},
	props: {
		appData: {
			default: [{}],
			type: Object
		},
	},
	data() {
		return {
			page_title: 'home',
			appDataCat: [],
			category: '',
			posts: [],
			data: [],
			dataUsers: [],
			text: '',
			isFix: 0,
			atId: 0,
			app: [],
			color: [29, 33, 27, 66, 53],
			puzzle: [28, 33, 29, 30, 54],
			offline: [25, 26, 24, 27]
		}
	},
	emits: ['load'],
	methods: {
		async load() {
			// console.log(this.data, 'ihgihgih')

			let { data: Apps, error } = await supabase
				.from('Apps')
				.select('*')

			this.data = Apps
			// console.log(Apps)
		},
		async loadUsers() {
			let { data: Users, error } = await supabase
				.from('Users')
				.select('*')

			this.dataUsers = Users
			// console.log(Users)
		},
		async update() {
			const { data, error } = await supabase
				.from('Apps')
				.insert([
					{
						name: 'Nikke Minaj',
						data: [{
							"name": "Calmest gamer",
							"content": "This game is kinda slow at some point but overall, i give this a 11/10"
						}]
					},
				])
		},
		async updateMany() {

			const { data, error } = await supabase
				.from('Apps')
				.insert([
					{ id: "1", name: 'Nike' },
					{ id: "2", name: 'Genshin' },
					{ id: "3", name: 'Genshin' },
					{ id: "4", name: 'Genshin' },
					{ id: "5", name: 'Genshin' },
				])

		},

		async match() {
			const { data: matchid, error } = await supabase
				.from('Apps')
				.select("*")
				.eq("name", 'Genshin')
			console.log(matchid)

		},

		onInput(e) {
			if (this.isFix) {
				console.log("Current editing app at id: ", e.currentTarget.id);
				this.atId = e.currentTarget.id;
				this.app = this.appData.find(x => x.id == e.currentTarget.id)
				console.log(this.app)
			}
		},
		async onClickCategory(e) {

			const { data, error } = await supabase
				.from('Apps')
				.select()
				.contains('category', [e.target.id])

			console.log(data)
			this.appDataCat = data
			this.category = e.target.id
		},

		switchState() {
			this.isFix = !this.isFix
			if (!this.isFix) {
				this.atId = 0;
			}

		},

		async updateUsers() {
			const { user, error } = await supabase
				.from('Users')
				.insert([
					{
						name: this.text,
					},

				])
			console.log(this.text)
			this.loadUsers()
		}
	},

	created() {
	},
}
</script>

<template>
	<Nav />

	<div class="content">
		<button @click="switchState">
			<div v-if="!isFix">Hi there, press me</div>
			<div v-else>Fixing mode ON</div>
		</button>

		<h1>Chơi game theo Thể loại</h1>
		<div class="category-con">
			<div class="category-inner-con">
				<div class="category">
					<h2 @click="onClickCategory($event)" id="Hành động" class="name">Hành động</h2>
				</div>
				<div class="category">
					<h2 @click="onClickCategory($event)" id="Chiến thuật" class="name">Chiến thuật</h2>
				</div>
				<div class="category">
					<h2 @click="onClickCategory($event)" id="Đóng vai" class="name">Đóng vai</h2>
				</div>
				<div class="category">
					<h2 @click="onClickCategory($event)" id="Thư giãn" class="name">Thư giãn</h2>
				</div>
			</div>
		</div>

		<div class="app-cat" :class="{ cathidden: appDataCat.length == 0 }">
			<h1 v-if="appDataCat.length != 0">{{ category }}</h1>

			<div class="app-con">
				<div class="app" v-for="(app) in appDataCat" :key="app.id" :id="app.id" @click="onInput"
					:class="{ edit: atId == app.id }">

					<router-link :to="'/app/' + app.id">
						<img :src="app.icon_url" alt="" class="app-icon" referrerpolicy="no-referrer">
					</router-link>
					<h2>{{ app.name }}</h2>

				</div>
			</div>


		</div>


		<h1>Một tí <span class="colorful">màu sắc</span> cho đời bớt nhạt</h1>
		<p>Với những game đầy màu sắc như...</p>
		<div class="app-con">
			<div class="app" v-for="(app) in appData.filter(app => color.includes(app.id))" :key="app.id" :id="app.id"
				@click="onInput" :class="{ edit: atId == app.id }">

				<router-link :to="'/app/' + app.id">
					<img :src="app.icon_url" alt="" class="app-icon" referrerpolicy="no-referrer">
				</router-link>
				<h2>{{ app.name }}</h2>


			</div>
		</div>

		<h1>Hãy chọn phương án đúng...</h1>
		<p>Với những game puzzle hóc búa</p>
		<div class="app-con">
			<div class="app" v-for="(app) in appData.filter(app => puzzle.includes(app.id))" :key="app.id" :id="app.id"
				@click="onInput" :class="{ edit: atId == app.id }">

				<router-link :to="'/app/' + app.id">
					<img :src="app.icon_url" alt="" class="app-icon" referrerpolicy="no-referrer">
				</router-link>
				<h2>{{ app.name }}</h2>


			</div>
		</div>

		<h1>Chơi bất chấp!</h1>
		<p>Offline, mọi lúc, mọi nơi</p>
		<div class="app-con">
			<div class="app" v-for="(app) in appData.filter(app => offline.includes(app.id))" :key="app.id" :id="app.id"
				@click="onInput" :class="{ edit: atId == app.id }">

				<router-link :to="'/app/' + app.id">
					<img :src="app.icon_url" alt="" class="app-icon" referrerpolicy="no-referrer">
				</router-link>
				<h2>{{ app.name }}</h2>

			</div>
		</div>

		<h1>Xem qua mọi game</h1>
		<p>Luôn được cập nhật</p>
		<div class="app-con">
			<div class="app" v-for="(app) in appData" :key="app.id" :id="app.id" @click="onInput"
				:class="{ edit: atId == app.id }">
				<router-link :to="'/app/' + app.id">
					<img :src="app.icon_url" alt="" class="app-icon" referrerpolicy="no-referrer">
				</router-link>
				<h2>{{ app.name }}</h2>
			</div>
		</div>



		<AddApp @load="$emit('load')" :opt="isFix ? 1 : 0" :id="atId" :app="app"></AddApp>
	</div>
</template>

<style lang="scss">
.content>* {
	width: 100%;
	padding: 0 20px;
}

h1 {
	margin-bottom: 5px;
}

p {
	margin-top: 6px;
	margin-bottom: 6px;
}

.category-con {
	overflow: scroll;

	.category-inner-con {
		width: max-content;


		.category {
			display: inline-block;
			position: relative;
			margin: 30px 10px;

			width: 360px;
			height: 190px;
			border-radius: 20px;

			box-shadow: 0 0 15px 0 rgba(5, 35, 63, 0.736);

			.name {
				position: relative;
				top: 50%;
				transform: translate(0, -100%);

				margin-left: 10px;

				font-size: 40px;
				color: white;

				cursor: pointer;
			}
		}

		.category:nth-child(1) {
			background-color: #f76a4f;
			background-image: linear-gradient(30deg, #ffac7c 12%, transparent 12.5%, transparent 87%, #ffac7c 87.5%, #ffac7c), linear-gradient(150deg, #ffac7c 12%, transparent 12.5%, transparent 87%, #ffac7c 87.5%, #ffac7c), linear-gradient(30deg, #ffac7c 12%, transparent 12.5%, transparent 87%, #ffac7c 87.5%, #ffac7c), linear-gradient(150deg, #ffac7c 12%, transparent 12.5%, transparent 87%, #ffac7c 87.5%, #ffac7c), linear-gradient(60deg, #ffac7c77 25%, transparent 25.5%, transparent 75%, #ffac7c77 75%, #ffac7c77), linear-gradient(60deg, #ffac7c77 25%, transparent 25.5%, transparent 75%, #ffac7c77 75%, #ffac7c77);
			background-size: 20px 35px;
			background-position: 0 0, 0 0, 10px 18px, 10px 18px, 0 0, 10px 18px;
		}

		.category:nth-child(2) {
			background-color: #59457a;
			background-image: repeating-linear-gradient(45deg, #8664ec 25%, transparent 25%, transparent 75%, #8664ec 75%, #8664ec), repeating-linear-gradient(45deg, #8664ec 25%, #59457a 25%, #59457a 75%, #8664ec 75%, #8664ec);
			background-position: 0 0, 20px 20px;
			background-size: 40px 40px;
		}

		.category:nth-child(3) {
			background-color: #f76a4f;
			background-image: radial-gradient(ellipse farthest-corner at 20px 20px, #ffac7c, #ffac7c 50%, #f76a4f 50%);
			background-size: 20px 20px;
		}

		.category:nth-child(4) {
			background-color: #387eee;
			opacity: 0.8;
			background-image: radial-gradient(circle at center center, #71cdf3, #387eee), repeating-radial-gradient(circle at center center, #71cdf3, #71cdf3, 10px, transparent 20px, transparent 10px);
			background-blend-mode: multiply;
		}

	}
}

.category-con::-webkit-scrollbar {
	display: none;
}

.colorful {
	font-weight: inherit;
	background-color: #00DBDE;
	background-image: linear-gradient(90deg, #00bbbe 0%, #FC00FF 100%);




	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}

.app-cat {
	max-height: 1000px;
	overflow-y: hidden;
	transition: all .6s ease;
}

.cathidden {
	max-height: 0px;
}

.app-con {
	padding-left: 5px;
	padding-right: 5px;

	display: flex;
	flex-wrap: wrap;
}

.app {
	width: 177px;

	box-sizing: border-box;

	padding: 5px;
	margin: 20px;

	border: 3px solid transparent;
	border-radius: 10px;

	transition: all .2s ease;

	h2 {
		margin-top: 0px;
	}


	.app-icon {
		width: 160px;
		border-radius: 25%;
		aspect-ratio: 1/1;
	}
}

.edit {
	border: 3px solid darkseagreen;

}

@media screen and (max-width: 600px) {
	.app {
		margin: 0px;
		width: 120px;

		h2 {
			font-size: 16px;
		}

		.app-icon {
			width: 100%;
		}
	}
}
</style>