<template>
    <div class="container" @click="clickHandle('test click', $event)">

        <div class="userinfo" @click="bindViewTap">
            <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover"/>
            <div class="userinfo-nickname">
                <card :text="userInfo.nickName"></card>
            </div>
        </div>

        <div class="usermotto">
            <div class="user-motto">
                <card :text="motto"></card>
            </div>
        </div>

        <form class="form-container">
            <input type="text" class="form-control" v-model="motto" placeholder="v-model"/>
            <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy"/>
        </form>
        <a open-type="redirect" href="/pages/counter/main" class="counter">去往Vuex示例页面</a>
        <div>globalData.count:{{count}}</div>
    </div>
</template>

<script>
    import card from '@/components/card';
    import store from '../../store/index.js';

    let timer = null;

    export default {
        data() {
            return {
                motto: 'Hello World',
                userInfo: {},
            };
        },

        components: {
            card,
        },

        computed: {
            count() {
                return store.state.count;
            },
        },

        methods: {
            bindViewTap() {
                const url = '../logs/main';
                wx.navigateTo({url});
            },
            getUserInfo() {
                // 调用登录接口
                wx.login({
                    success: () => {
                        wx.getUserInfo({
                            success: (res) => {
                                this.userInfo = res.userInfo;
                            },
                        });
                    },
                });
            },
            clickHandle(msg, ev) {
                console.log('clickHandle:', msg, ev);
            },
        },
        created() {
            // 调用应用实例的方法获取全局数据
            this.getUserInfo();
            console.log('created');
        },
        onLoad() {
            console.log('onLoad');
        },
        onShow() {
            console.log('onShow');
        },
        mounted() {
            console.log('mounted');
            console.log(this);
            timer = setInterval(() => {
                store.commit('countIncrement');
            }, 1000);
        },
        onUnload() {
            console.log('onUnload');
            clearInterval(timer);
        },
    };
</script>

<style scoped lang="scss">
    @import "../../scss/config";

    .userinfo {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .userinfo-avatar {
        width: px2rem(128);
        height: px2rem(128);
        margin: px2rem(20);
        border-radius: 50%;
    }

    .userinfo-nickname {
        color: #aaa;
    }

    .usermotto {
        margin-top: 150px;
    }

    .form-control {
        display: block;
        padding: 0 12px;
        margin-bottom: 5px;
        border: 1px solid #ccc;
    }

    .counter {
        display: inline-block;
        margin: 10px auto;
        padding: 5px 10px;
        color: blue;
        border: 1px solid blue;
    }
</style>
