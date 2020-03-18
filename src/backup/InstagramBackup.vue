<template>
  <div class="container">
    <div v-for="post in instagramFeed" :key="post.id" class="card__container">
      <div class="card__image">
        <img :src="post.recentPost" alt />
      </div>

      <div class="card__body">
        <h3 class="card__body__heading">Building Web Applications that make clients reach the goals.</h3>
      </div>

      <div class="card__footer">
        <div class="card__footer__analysis">
          <span class="card__footer__analysis--shares">{{post.likes}}</span>
          <span class="card__footer__analysis--views">5</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pusher from "pusher-js";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      instagramFeed: []
    };
  },
  created() {
    var pusher = new Pusher("", {
      cluster: "eu"
      // authEndPoint: '/broadcasting/auth',
      // forceTLS: true
    });

    var channel = pusher.subscribe("dashboard");
    channel.bind(
      "App\\Events\\InstagramFeedsEvent",
      function(data) {
        this.instagramFeed.push({
          profilePicture: data.instagramFeeds.profile_picture,
          recentPost: data.instagramFeeds.recent_posted_picture,
          likes: data.instagramFeeds.likes_count
        });
      },
      this
    );

    channel.bind("App\\Events\\SentryIssuesEvent", function(data) {}, this);
  }
};
</script>

<style scoped>
p {
  font-size: 1.2rem;
  font-weight: 300;
}

.card__container {
  width: 400px;
  background: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 3px;
  transition: all 0.2s;
  margin-bottom: 10px;
}

.card__container:hover {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.card__image img {
  width: 100%;
}

.card__body {
  position: relative;
  text-align: center;
}

.card__body__wrapper {
  position: absolute;
  top: -12px;
  left: 15px;
  z-index: 1;
}
.card__body__heading {
  font-weight: 400;
  color: #5f6368;
  font-size: 0.95rem;
  line-height: 25px;
  padding: 15px 5px;
}

.card__footer {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
}

.card__footer__options {
  display: flex;
  align-items: center;
}

.card__footer__options--favourite {
  cursor: pointer;
  display: block;
  width: 26px;
  height: 26px;
  background-color: #edf2f6;
  color: #b2c0c8;
  line-height: 26px;
  text-align: center;
  font-size: 12px;
  border-radius: 50%;
  transition: color 0.35s, border 0.35s;
  border: 1px solid transparent;
  box-sizing: border-box;
}

.card__footer__options--favourite::before {
  font-family: "FontAwesome";
  content: "\f02e";
  font-size: 13px;
}

.card__footer__options--postmenu {
  cursor: pointer;
  color: #b2c0c8;
  width: 26px;
  text-align: center;
  margin-left: 5px;
}

.card__footer__options--postmenu:before {
  font-family: "FontAwesome";
  content: "\f141";
}

.card__footer__analysis--shares {
  color: #b2c0c8;
  width: 26px;
  height: 26px;
  font-size: 11px;
  margin-left: 10px;
}

.card__footer__analysis--shares:before {
  font-family: "FontAwesome";
  font-size: 14px;
  content: "\f06e";
}

.card__footer__analysis--views {
  width: 26px;
  height: 26px;
  color: #b2c0c8;
  font-size: 11px;
  margin-left: 10px;
}

.card__footer__analysis--views:before {
  font-size: 13px;
  font-family: "FontAwesome";
  content: "\f064";
}
</style>
