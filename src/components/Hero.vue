<template>
  <div>
    <div class="slider">
      <div class="slide-track">
        <div class="slide">
          <img src="https://seeklogo.com/images/T/typescript-logo-B29A3F462D-seeklogo.com.png" alt="" />
        </div>
        <div class="slide">
          <img src="https://seeklogo.com/images/V/vuejs-logo-17D586B587-seeklogo.com.png"  alt="" />
        </div>
        <div class="slide">
          <img src="https://seeklogo.com/images/A/amazon-web-services-aws-logo-6C2E3DCD3E-seeklogo.com.png"  alt="" />
        </div>
        <div class="slide">
          <img src="https://seeklogo.com/images/L/laravel-framework-logo-C10176EC8C-seeklogo.com.png"  alt="" />
        </div>
        <div class="slide">
          <img src="https://seeklogo.com/images/J/javascript-js-logo-2949701702-seeklogo.com.png" alt="" />
        </div>
        <div class="slide">
          <img src="https://seeklogo.com/images/V/visual-studio-code-logo-284BC24C39-seeklogo.com.png"  alt="" />
        </div>
        <div class="slide">
          <img src="https://seeklogo.com/images/A/apple-logo-E3DBF3AE34-seeklogo.com.png"  alt="" />
        </div>

        <div class="slide">
          <img src="https://seeklogo.com/images/T/typescript-logo-B29A3F462D-seeklogo.com.png" alt="" />
        </div>
        <div class="slide">
          <img src="https://seeklogo.com/images/V/vuejs-logo-17D586B587-seeklogo.com.png"  alt="" />
        </div>
        <div class="slide">
          <img src="https://seeklogo.com/images/A/amazon-web-services-aws-logo-6C2E3DCD3E-seeklogo.com.png"  alt="" />
        </div>
        <div class="slide">
          <img src="https://seeklogo.com/images/L/laravel-framework-logo-C10176EC8C-seeklogo.com.png"  alt="" />
        </div>
        <div class="slide">
          <img src="https://seeklogo.com/images/J/javascript-js-logo-2949701702-seeklogo.com.png" alt="" />
        </div>
        <div class="slide">
          <img src="https://seeklogo.com/images/V/visual-studio-code-logo-284BC24C39-seeklogo.com.png"  alt="" />
        </div>
        <div class="slide">
          <img src="https://seeklogo.com/images/A/apple-logo-E3DBF3AE34-seeklogo.com.png"  alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hero',
  data() {
    return {
      
    }
  }
}
</script>

<style scoped>
@-webkit-keyframes scroll {
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  100% {
    -webkit-transform: translateX(calc(-250px * 7));
            transform: translateX(calc(-250px * 7));
  }
}

@keyframes scroll {
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
  }
  100% {
    -webkit-transform: translateX(calc(-250px * 7));
            transform: translateX(calc(-250px * 7));
  }
}
.slider {
  background: #23272f;
  /* box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.125); */
  margin: auto;
  overflow: hidden;
  position: relative;
  /* width: 960px; */
  width: 100vw;
}
.slider::before, .slider::after {
  background: linear-gradient(to right, white 0%, rgba(255, 255, 255, 0) 100%);
  content: "";
  position: absolute;
  width: 200px;
  z-index: 2;
}
.slider::after {
  right: 0;
  top: 0;
  -webkit-transform: rotateZ(180deg);
          transform: rotateZ(180deg);
}
.slider::before {
  left: 0;
  top: 0;
}
.slider .slide-track {
  -webkit-animation: scroll 40s linear infinite;
          animation: scroll 40s linear infinite;
  display: flex;
  align-items: center;
  width: calc(250px * 14);
}
.slider .slide {
  width: 450px;
}

img {
  width: 125px;
}

</style>
