<template>
	<view>
		<view class="u-padding-30">
			<view>
				<view class="ti">{{title}}</view>
				<u-parse style="padding-top: 20rpx;" :style="{'font-size':size}" :show-with-animation="true"
					:selectable="true">{{text}}</u-parse>
			</view>
		</view>

	</view>
</template>

<script>
	import req from '../../config/request.js';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {

				background: {
					backgroundColor: '#fffae8'
				},
				value: 30,
				size: '35rpx',
				ul: '',
				back_id: '',
				text: '',
				title: ''
			}
		},
		onLoad(option) {
			//console.log(option.id)

		
			uni.request({
				url: req.url + '/bookcase/getBookContent', //http://localhost:8285/bookcase/getBookContent?id=1
				method: 'GET',
				data: {
					id: option.id
				},
				success: (res) => {
					//console.log(res);
					this.text = res.data;
					/* console.log(res.data); */
				}
			});


		},
		methods: {

		}
	}
</script>

<style>
	page {
		background-color: #fffae8;
	}

	.ti {
		font-size: 80rpx;
		font-weight: bolder;
		text-align: center;
		margin-bottom: 20rpx;
	}
</style>
