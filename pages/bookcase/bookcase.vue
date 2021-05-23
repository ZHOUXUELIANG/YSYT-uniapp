<template>


	<view>
		
		<view style="margin: 40rpx; font-weight: bolder; font-size: 50rpx;">我的书架</view>

		<view class="content">
			<view class="l-placeholder"></view>

			<view style="margin-top: 40rpx;" class="l-body l-clear-both">
				<view class="l-li" v-for="(item,key) in hiss" :key="key" @tap="navtoSection(item.id)">
					<image class="l-li-img" :src="item.image" mode="aspectFill"></image>
					<view class="l-li-txt">
						{{item.name}}
					</view>
				</view>
			</view>

		</view>
		<view class="info_total">
			<u-divider>您的书架共有{{len}}本书</u-divider>
		</view>
	</view>


</template>
<script>
	import req from '../../config/request.js';

	export default {
		data() {
			return {
				hiss: [
					/* {
						name: '《百年孤独》',
						image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181218%2Fbfb0c3130242480eb8395aabfc6ad565.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618905856&t=82552fb7f8c429601cc16d929e4555d5'
					}*/
				],
				list: [

				],
				uid: '',
				len: ''
				
			}
		},
		onLoad() {
			this.preOnload();

		},

		methods: {
			preOnload() {
				try {
					const value = uni.getStorageSync('userInfo');
					if (value) {
						this.uid = value.uid;
					} else {

					}
				} catch (e) {
					// error
				}
				//console.log(this.uid)

				var that = this;
				uni.request({

					url: req.url + '/bookcase/findAll', //http://localhost:8285/bookcase/findAll
					method: 'POST',
					data: {
						uid: this.uid
					},
					success: (res) => {
						//console.log(res.data)
						that.list = res.data;
						that.len = res.data.length;
						that.getBookcaseList();
					}
				})
			},
			getBookcaseList() {
				//console.log(this.list.length);
				for (var i = 0; i < this.list.length; i++) {
					var book = {
						name: this.list[i].description,
						image: this.list[i].cover,
						id: this.list[i].id
					}
					this.hiss.push(book)
				}
			},
			navtoSection(re) {
				uni.navigateTo({
					//url: '../index/read/read?id=' + re
					
					url:'read?id=' + re
				})
			}


		}
	}
</script>

<style>
	/* l-body */

	
	.content {
		margin-left: 45rpx;
	}

	.l-body {
		padding: var(--pad-lr) 0 var(--pad-lr) var(--pad-lr);
	}

	.l-ul {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 32rpx;
	}

	.l-add,
	.l-li {
		width: 28%;
		float: left;
		height: 392rpx;
		margin-right: 5%;
		margin-bottom: 32rpx;
	}

	.l-li {
		text-align: center;
	}

	.l-add-view,
	.l-li-img {
		width: 100%;
		height: 300rpx;
		border-radius: 10rpx;
		margin-bottom: 8rpx;
	}

	.l-add-view {
		box-sizing: border-box;
		display: flex;
		border: 6rpx solid rgba(126, 127, 148, 1);
		align-items: center;
		justify-content: center;
	}

	.l-icon-add {
		width: 36rpx;
		height: 36rpx;
	}

	.l-li-txt {
		padding: 0 10rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		color: #9A9DA2;
	}

	.info_total {
		margin-bottom: 0rpx;
	}
</style>
