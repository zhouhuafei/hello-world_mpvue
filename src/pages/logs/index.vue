<template>
    <div>
        <ul class="container log-list">
            <li v-for="(log, index) in logs" :class="{ red: aa }" :key="index" class="log-item">
                <card :text="(index + 1) + ' . ' + log"></card>
            </li>
        </ul>
    </div>
</template>

<script>
    import {formatTime} from '@/utils/index';
    import card from '@/components/card';

    export default {
        components: {
            card,
        },

        data() {
            return {
                logs: [],
            };
        },

        created() {
            const logs = (wx.getStorageSync('logs') || []);
            this.logs = logs.map(log => formatTime(new Date(log)));
        },
    };
</script>

<style lang="scss">
    @import "../../scss/config";

    .log-list {
        display: flex;
        flex-direction: column;
        padding: px2rem(40);
    }

    .log-item {
        margin: px2rem(10);
    }
</style>
