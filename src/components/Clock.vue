<template>
	<div id="content" v-bind:style="contentStyle" @click="clicked" class="radius">
		<div class="wrapper">
			<h1>{{timeOne}}</h1>
			<h3>{{timeTwo}}</h3>
			<State />
		</div>
	</div>
</template>

<script>
import moment from 'moment-timezone'
import State from '@/components/State'

export default {
  name: 'Clock',
  components: {
	State
  },
	data() {
    return {
		contentStyle: {
			backgroundColor: "#23272f"
		},
		timeOne: moment().format('HH:mm:ss'),
		timeTwo: moment().format('ddd DD/MM'),
		timeThree: moment().format('MMMM Do YY'),
		timeFour: moment().format('l'),
		one: true,
		two: false,
		three: false,
		four: false,
		faded: '',
    }
	},
	methods: {
		clicked: function() {
			this.contentStyle.backgroundColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16)})
			if(this.one == true){
				this.faded = 'faded'
				setTimeout(()=>{
					this.faded = ''
					this.one = false
					this.two = true
				},200)
			}
			else if(this.two == true) {
				this.faded = 'faded'
				setTimeout(()=>{
					this.faded = ''
					this.two = false
					this.three = true
				},200)
			}
			else if(this.three == true){
				this.faded = 'faded'
				setTimeout(()=>{
					this.faded = ''
					this.three = false
					this.four = true
				},200)
			}
			else if(this.four == true){
				this.faded = 'faded'
				setTimeout(()=>{
					this.faded = ''
					this.four = false
					this.one = true
				},200)
			}
		}
	},
	mounted: function() {
		setInterval(()=>{
			this.timeOne = moment().format('HH:mm:ss')
		},1000)
	}
}
</script>

<style scoped>
#content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  color: #fff;
  transition: 0.5s;
  text-align: center;
  font-family: Helvetica, Arial, sans-serif;
}

#content h1 {
  transition: 0.2s;
  font-size: 4rem;
  margin: 0;
}
#content p {
  transition: 0.2s;
}
#content h3 {
	color: #FFB700;
	font-size: 3rem;
	margin-bottom: .5rem;
}
.faded {
  opacity: 0;
  transition: 0.2s;
}

.radius {
	border-radius: 0.5rem;
}
</style>
