<template>
    <div class="overlay">
        <p><span>Incendiary Blue</span></p>
    </div>
</template>

<script>
    export default {
        name: 'Overlay',
        data() {
            return {

            }
        },
    }
</script>

<style lang="scss" scoped>

.overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    animation: colorAnimation 10s infinite;
}

p {
	text-transform: uppercase;
	letter-spacing: .5em;
  
  span {

  	font: 700 10rem/1 "Oswald", sans-serif;
  	letter-spacing: 0;
	  display: block;
	  margin: 0 auto;
      
/* Clip Background Image */

	  background: url(
          https://images.unsplash.com/photo-1507880572231-f85401ce76e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3452&q=80
          ) repeat-y;
	  -webkit-background-clip: text;
	  background-clip: text;

/* Animate Background Image */

	  -webkit-text-fill-color: transparent;
	  -webkit-animation: aitf 80s linear infinite;

/* Activate hardware acceleration for smoother animations */

	  -webkit-transform: translate3d(0,0,0);
	  -webkit-backface-visibility: hidden;

  }
}

/* Animate Background Image */

@-webkit-keyframes aitf {
	0% { background-position: 0% 50%; }
	100% { background-position: 100% 50%; }
}

 @keyframes colorAnimation {
  0% {background-color: rgba(33, 34, 33, 1);}
  25%{background-color: rgba(17, 129, 178, 1);}
  50%{background-color: rgba(221, 237, 244, 1);}
  75%{background-color: rgba(17, 129, 178, 1);}
  100% {background-color: rgba(33, 34, 33, 1);}
}

</style>