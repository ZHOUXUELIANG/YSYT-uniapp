<template>
	<view class="wrap">
		<u-swiper :list="list" :title="true"></u-swiper>
	</view>
</template>

<script>
	
	import req from '../../config/request.js'
	export default {
		data() {
			return {
				list: [{
						id: '1',
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						id: '2',
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						id: '3',
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				showList: [
					
				],
			}
		},
		onLoad() {
			/* uni.request({
				url: req.url + '/carousel/findAllC', //http://localhost:8285/carousel/findAllC
				method: 'POST',
				success: (res) => {
					//_this.templList = res.data;
					
					console.log(res.data);
					//_this.getCarouselList()
				}
			}) */
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 40rpx;
	}
</style>
