<template name="nodata">
    <view class="page-gray">
        <view class="img-wrap">
            <image src="https://img.yohaoyun.com/yohaoyun/tongcheng/nodata.png" class="nodata"></image>
            <!-- <image src="https://img.yohaoyun.com/yohaoyun/nodata.png" class="nodata"></image> -->
        </view>
    </view>
</template>

<script>
    export default {
        name: 'nodata',
        data() {
            return {};
        }
    }
</script>

<style>
    /* 没有数据 */
    .img-wrap {
        display: flex;
        justify-content: center;
    }

    .nodata {
        height: 261upx;
        width: 261upx;
        margin-top: 100upx;
    }

</style>
