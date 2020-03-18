<template>
    <div class="wrapper">
        <div class="Rtable Rtable--5cols Rtable--collapse">
            <div class="Rtable-row Rtable-row--head">
                <div class="Rtable-cell project-cell column-heading">
                    <h2>Project</h2>
                </div>
                <div class="Rtable-cell pipeline-cell column-heading">
                    <h2>Pipeline</h2>
                </div>
                <div class="Rtable-cell commit-cell column-heading">
                    <h2>Commit</h2>
                </div>
                <div class="Rtable-cell stages-cell column-heading">
                    <h2>Status</h2>
                </div>
            </div>
            <div
                class="Rtable-container"
                v-for="event in gitNew.slice(0, 8)"
                :key="event.id"
            >
                <div
                    class="Rtable-row background-success"
                    v-if="event.object_attributes.status === 'success'"
                >
                    <div class="Rtable-cell project-cell">
                        <div class="Rtable-cell--content date-content">
                            <h2>{{ event.project_name }}</h2>
                        </div>
                    </div>
                    <div class="Rtable-cell pipeline-cell">
                        <div class="Rtable-cell--content title-content">
                            <h2 class="Rtable-cell--h2">
                                {{ event.object_attributes.pipeline_id }}
                            </h2>
                        </div>
                    </div>
                    <div class="Rtable-cell commit-cell">
                        <div class="commit-cell__events">
                            <div class="Rtable-commit--bottom">
                                <img
                                    class="Rtable-commit--img"
                                    :src="event.builds['0'].user.avatar_url"
                                    :alt="event.builds['0'].user.name"
                                />
                                <h2 class="commit--pad">
                                    {{ event.commit.message | truncate(50) }}
                                </h2>
                                <div class="Rtable-commit--top">
                                    <h5 class="Rtable-commit--branch">
                                        <h2>
                                            {{ event.object_attributes.ref }}
                                        </h2>
                                    </h5>
                                    <h5 class="commit--number">
                                        {{ event.commit.id }}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="Rtable-cell stages-cell status-container">
                        <div
                            v-for="build in event['builds']"
                            :key="build.id"
                            class="status"
                        >
                            <div v-if="build.status === 'failed'">
                                <i class="far fa-times-circle"></i>
                            </div>
                            <div v-if="build.status === 'warning'">
                                <i class="fas fa-exclamation-circle"></i>
                            </div>
                            <div v-if="build.status === 'pending'">
                                <i class="fas fa-spinner"></i>
                            </div>
                            <div v-if="build.status === 'running'">
                                <i
                                    class="far fa-check-circle animate-flicker"
                                ></i>
                            </div>
                            <div v-if="build.status === 'manual'">
                                <i class="fas fa-wrench"></i>
                            </div>
                            <div v-if="build.status === 'scheduled'">
                                <i class="far fa-calendar-alt"></i>
                            </div>
                            <div v-if="build.status === 'canceled'">
                                <i class="fas fa-ban"></i>
                            </div>
                            <div v-if="build.status === 'success'">
                                <i class="far fa-check-circle"></i>
                            </div>
                            <div v-if="build.status === 'skipped'">
                                <i class="fas fa-forward"></i>
                            </div>
                            <div v-if="build.status === 'created'">
                                <i class="fas fa-plus-circle"></i>
                            </div>
                            <div v-if="build.stage">{{ build.stage }}</div>
                        </div>
                    </div>
                </div>
                <div
                    class="Rtable-row background-failed"
                    v-if="event.object_attributes.status === 'failed'"
                >
                    <div class="Rtable-cell project-cell">
                        <div class="Rtable-cell--content date-content">
                            <h2>{{ event.project_name }}</h2>
                        </div>
                    </div>
                    <div class="Rtable-cell pipeline-cell">
                        <div class="Rtable-cell--content title-content">
                            <h2 class="Rtable-cell--h2">
                                {{ event.object_attributes.pipeline_id }}
                            </h2>
                        </div>
                    </div>
                    <div class="Rtable-cell commit-cell">
                        <div class="commit-cell__events">
                            <div class="Rtable-commit--bottom">
                                <img
                                    class="Rtable-commit--img"
                                    :src="event.builds['0'].user.avatar_url"
                                    :alt="event.builds['0'].user.name"
                                />
                                <h2 class="commit--pad">
                                    {{ event.commit.message | truncate(50) }}
                                </h2>
                                <div class="Rtable-commit--top">
                                    <h5 class="Rtable-commit--branch">
                                        <h2>
                                            {{ event.object_attributes.ref }}
                                        </h2>
                                    </h5>
                                    <h5 class="commit--number">
                                        {{ event.commit.id }}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="Rtable-cell stages-cell status-container">
                        <div
                            v-for="build in event['builds']"
                            :key="build.id"
                            class="status"
                        >
                            <div v-if="build.status === 'failed'">
                                <i class="far fa-times-circle"></i>
                            </div>
                            <div v-if="build.status === 'warning'">
                                <i class="fas fa-exclamation-circle"></i>
                            </div>
                            <div v-if="build.status === 'pending'">
                                <i class="fas fa-spinner"></i>
                            </div>
                            <div v-if="build.status === 'running'">
                                <i
                                    class="far fa-check-circle animate-flicker"
                                ></i>
                            </div>
                            <div v-if="build.status === 'manual'">
                                <i class="fas fa-wrench"></i>
                            </div>
                            <div v-if="build.status === 'scheduled'">
                                <i class="far fa-calendar-alt"></i>
                            </div>
                            <div v-if="build.status === 'canceled'">
                                <i class="fas fa-ban"></i>
                            </div>
                            <div v-if="build.status === 'success'">
                                <i class="far fa-check-circle"></i>
                            </div>
                            <div v-if="build.status === 'skipped'">
                                <i class="fas fa-forward"></i>
                            </div>
                            <div v-if="build.status === 'created'">
                                <i class="fas fa-plus-circle"></i>
                            </div>
                            <div v-if="build.stage">{{ build.stage }}</div>
                        </div>
                    </div>
                </div>
                <div
                    class="Rtable-row background-running"
                    v-if="event.object_attributes.status === 'running'"
                >
                    <div class="Rtable-cell project-cell">
                        <div class="Rtable-cell--content date-content">
                            <h2>{{ event.project_name }}</h2>
                        </div>
                    </div>
                    <div class="Rtable-cell pipeline-cell">
                        <div class="Rtable-cell--content title-content">
                            <h2 class="Rtable-cell--h2">
                                {{ event.object_attributes.pipeline_id }}
                            </h2>
                        </div>
                    </div>
                    <div class="Rtable-cell commit-cell">
                        <div class="commit-cell__events">
                            <div class="Rtable-commit--bottom">
                                <img
                                    class="Rtable-commit--img"
                                    :src="event.builds['0'].user.avatar_url"
                                    :alt="event.builds['0'].user.name"
                                />
                                <h2 class="commit--pad">
                                    {{ event.commit.message | truncate(50) }}
                                </h2>
                                <div class="Rtable-commit--top">
                                    <h5 class="Rtable-commit--branch">
                                        <h2>
                                            {{ event.object_attributes.ref }}
                                        </h2>
                                    </h5>
                                    <h5 class="commit--number">
                                        {{ event.commit.id }}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="Rtable-cell stages-cell status-container">
                        <div
                            v-for="build in event['builds']"
                            :key="build.id"
                            class="status"
                        >
                            <div v-if="build.status === 'failed'">
                                <i class="far fa-times-circle"></i>
                            </div>
                            <div v-if="build.status === 'warning'">
                                <i class="fas fa-exclamation-circle"></i>
                            </div>
                            <div v-if="build.status === 'pending'">
                                <i class="fas fa-spinner"></i>
                            </div>
                            <div v-if="build.status === 'running'">
                                <i
                                    class="far fa-check-circle animate-flicker"
                                ></i>
                            </div>
                            <div v-if="build.status === 'manual'">
                                <i class="fas fa-wrench"></i>
                            </div>
                            <div v-if="build.status === 'scheduled'">
                                <i class="far fa-calendar-alt"></i>
                            </div>
                            <div v-if="build.status === 'canceled'">
                                <i class="fas fa-ban"></i>
                            </div>
                            <div v-if="build.status === 'success'">
                                <i class="far fa-check-circle"></i>
                            </div>
                            <div v-if="build.status === 'skipped'">
                                <i class="fas fa-forward"></i>
                            </div>
                            <div v-if="build.status === 'created'">
                                <i class="fas fa-plus-circle"></i>
                            </div>
                            <div v-if="build.stage">{{ build.stage }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import Pusher from "pusher-js";
import moment from "moment";
export default {
    name: "Pipeline",
    data() {
        return {
            time: this.newMoment,
            contentStyle: {
                backgroundColor: ""
            }
        };
    },
    filters: {
        format(date) {
            return moment(new Date(date)).format("D.M.YYYY");
        },
        fromNow(date) {
            return moment(new Date(date)).fromNow();
        }
    },
    computed: {
        gitNew() {
            return this.$store.getters.gitlabFeed;
        },
        ...mapState(["gitlabFeed"]),
        ...mapGetters({
            newMoment: "createdMoment",
            gitGet: "gitlabFeedWatcher",
            pipeBuilds: "gitlabBuilds"
        })
    },
    methods: {
        clicked: function() {
            this.contentStyle.backgroundColor = "#000000".replace(
                /0/g,
                function() {
                    return (~~(Math.random() * 16)).toString(16);
                }
            );
        },
        pipelineUpdate(data) {
            this.$notification.dark("Pipeline has been updated", {
                title: "PIPELINE",
                timer: 10,
                showLeftIcn: false,
                showCloseIcn: true
            });
        },
        reverse: function(array) {
            return gitlabFeed.slice().reverse();
        },
        colorChange(data) {
            switch (data["0"].object_attributes.status) {
                case "success":
                    this.contentStyle.backgroundColor = "#1aaa55";
                    // console.log('>>>Potato')
                    break;
                case "failed":
                    this.contentStyle.backgroundColor = "#db3b21";
                    break;
                case "running":
                    this.contentStyle.backgroundColor = "#2458a4";
                    break;
                default:
                    this.contentStyle.backgroundColor = "";
                    break;
            }
        }
    },
    //NOTE Getter must be a function for watcher to work
    mounted() {
        this.$store.watch(this.gitGet, data => {
            // console.log('Watchinggg', data)
            if (data) {
                this.pipelineUpdate(data);
                this.colorChange(data);
            }
        });
    },
    created() {
        const pusher = new Pusher('1f1f7b3fb0d8aad224ac', {
            cluster: 'eu',
            forceTLS: true,
            authEndpoint:
                'https://api-dashboard.incendiaryblue.com/broadcasting/auth',
            auth: {
                headers: {
                    'dashboard-auth': 'GGhSdPe8WcPFdztwbYabvl2uOTtno'
                }
            }
        });
        const channel = pusher.subscribe('private-dashboard');
        channel.bind(
            "GitlabPipeline",
            function(data) {
                this.$store.dispatch("updateGit", data.pipelineData);
            },
            this
        );
    }
};
</script>

<style lang="scss" scoped>
$breakpoint: 750px;
$heading-color: #43bac0;
.wrapper {
    width: 100%;
}
.is-striped {
    background-color: rgba(233, 200, 147, 0.2);
}
/* Table column sizing
================================== */
.project-cell {
    min-width: 20%;
    display: flex;
    align-items: center;
}
.pipeline-cell {
    min-width: 20%;
    display: flex;
    align-items: center;
}
.commit-cell {
    min-width: 20%;
    display: flex;
    align-items: center;
}
.stages-cell {
    min-width: 40%;
    display: flex;
    align-items: center;
    /*justify-content: center;*/
}
// .date-cell  { width: 5%; }
/* Apply styles
================================== */
.Rtable {
    display: flex;
    flex-wrap: wrap;
    color: #fff;
    .Rtable-row--head {
        display: none;
    }
    .Rtable-row {
        width: 100%;
        display: flex;
        .Rtable-cell {
            box-sizing: border-box;
            flex-grow: 1;
            padding: 0.8em 1.2em;
            overflow: hidden; // Or flex might break
            list-style: none;
            &.column-heading {
                color: white;
                padding: 1em;
                text-transform: uppercase;
            }
            .Rtable-cell--heading {
                display: none;
            }
            .Rtable-cell--content {
                a {
                    font-size: 2em;
                    color: #333;
                }
                .webinar-date {
                    font-weight: 700;
                }
            }
        }
    }
}
/* Responsive
==================================== */
@media all and (max-width: $breakpoint) {
    .is-striped {
        background-color: white;
    }
    .Rtable--collapse {
        display: block;
        width: 100%;
        padding: 1em;
        box-shadow: none;
        .Rtable-row {
            box-sizing: border-box;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 2em;
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
            .Rtable-cell {
                width: 100% !important;
                display: flex;
                align-items: center;
                .Rtable-cell--heading {
                    display: inline-block;
                    flex: 1;
                    max-width: 120px;
                    min-width: 120px;
                    color: $heading-color;
                    font-weight: 700;
                    border-right: 1px solid #ccc;
                    margin-right: 1em;
                }
                .Rtable-cell--content {
                    flex: 2;
                    padding-left: 1em;
                }
            }
        }
        .pipeline-cell {
            background-color: $heading-color;
            color: white;
            font-weight: 700;
            order: -1;
            .Rtable-cell--content {
                padding-left: 0 !important;
            }
        }
        .Rtable-row--head {
            display: none;
        }
    }
}
// Non-Flex modernizer fallback
.no-flexbox .Rtable {
    display: block;
    &.Rtable-cell {
        width: 100%;
    }
}
// DIrty code
.commit-cell__events {
    // background-color: #43BAC0;
    display: flex;
    color: #fff;
}
.Rtable-commit--top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 0.5rem;
}
.Rtable-commit--bottom {
    display: flex;
    align-items: center;
    margin-right: 5px;
}
.Rtable-commit--img {
    height: 4rem;
    border-radius: 50%;
    margin-right: 10px;
}
// *********
// * SVG ICONS */
svg {
    width: 3.2rem;
    margin: 0 0.3rem;
}
.path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
}
.path.circle {
    -webkit-animation: dash 0.9s ease-in-out;
    animation: dash 0.9s ease-in-out;
}
.path.line {
    stroke-dashoffset: 1000;
    -webkit-animation: dash 0.9s 0.35s ease-in-out forwards;
    animation: dash 0.9s 0.35s ease-in-out forwards;
}
.path.check {
    stroke-dashoffset: -100;
    -webkit-animation: dash-check 0.9s 0.35s ease-in-out forwards;
    animation: dash-check 0.9s 0.35s ease-in-out forwards;
}
p {
    text-align: center;
    margin: 2rem 0 6rem;
    font-size: 1.25rem;
}
p.success {
    color: #73af55;
}
p.error {
    color: #d06079;
}
@-webkit-keyframes dash {
    0% {
        stroke-dashoffset: 1000;
    }
    100% {
        stroke-dashoffset: 0;
    }
}
@keyframes dash {
    0% {
        stroke-dashoffset: 1000;
    }
    100% {
        stroke-dashoffset: 0;
    }
}
@-webkit-keyframes dash-check {
    0% {
        stroke-dashoffset: -100;
    }
    100% {
        stroke-dashoffset: 900;
    }
}
@keyframes dash-check {
    0% {
        stroke-dashoffset: -100;
    }
    100% {
        stroke-dashoffset: 900;
    }
}
.fade-enter {
    opacity: 0;
}
.fade-enter-active {
    transition: opacity 5s;
}
.background-success {
    background-color: rgba(26, 170, 85, 0.5);
}
.background-failed {
    background-color: rgba(219, 59, 33, 0.5);
}
.background-running {
    background-color: rgba(36, 88, 164, 0.5);
}
.Rtable-container {
    width: 100%;
    margin-bottom: 0.5rem;
}
/* FLICKER */
@keyframes flickerAnimation {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@-o-keyframes flickerAnimation {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@-moz-keyframes flickerAnimation {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@-webkit-keyframes flickerAnimation {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
.animate-flicker {
    -webkit-animation: flickerAnimation 1s infinite;
    -moz-animation: flickerAnimation 1s infinite;
    -o-animation: flickerAnimation 1s infinite;
    animation: flickerAnimation 1s infinite;
}
.Rtable-cell--h2 {
    // font-size: 4rem;
    padding: 2rem 0;
}
i {
    font-size: 3rem;
    margin: 0px 5px;
}
.status {
    margin-right: 1rem;
    // border: 2px solid red;
    height: 80%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}
</style>
