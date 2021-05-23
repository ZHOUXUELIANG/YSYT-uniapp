<template>
	<view>
		<view class="top-search">
			<u-search :show-action="true" action-text="搜索" :animation="true"></u-search>
		</view>
		<view class="wrap yellow">
			<u-swiper @click="caroNav" :list="imglist"></u-swiper>
		</view>
		<view class="yellow">
			<u-notice-bar :duration="200" mode="horizontal" :list="yidonglist"></u-notice-bar>
		</view>
		<view class="l-main">
			<view class="l-h3">
				<h3>
					<text class="l-h3-title" style="font-weight: bold;">推荐阅读</text>
				</h3>
			</view>
		</view>
		<view class="wrap">
			<u-waterfall v-model="flowList" ref="uWaterfall">
				<template v-slot:left="{leftList}">
					<view class="demo-warter" v-for="(item, index) in leftList" :key="index" @click="booksBtn(item.id)">
						<u-lazy-load threshold="-450" border-radius="10" :image="item.ima" :index="index">
						</u-lazy-load>
						<view class="demo-title">
							{{item.shop}}
						</view>
						<view class="demo-tag">
							{{item.title}}
						</view>
						<view class="demo-shop">
							{{item.author}}
						</view>
					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view class="demo-warter" v-for="(item, index) in rightList" :key="index"
						@click="booksBtn(item.id)">
						<u-lazy-load threshold="-450" border-radius="10" :image="item.ima" :index="index">
						</u-lazy-load>
						<view class="demo-title">
							{{item.shop}}
						</view>
						<view class="demo-tag">
							{{item.title}}
						</view>
						<view class="demo-shop">
							{{item.author}}
						</view>
					</view>
				</template>
			</u-waterfall>
		</view>
	</view>
</template>

<script>
	import req from '../../config/request.js';
	export default {

		data() {
			return {
				len: '',
				imglist: [], //轮播图数据对象
				templList: [],
				yidonglist: [
					'给岁月以文明，而不是给文明以岁月',
					'宇宙就是一座黑暗森林，每个文明都是带枪的猎人，像幽灵般潜行于林间，轻轻拨开挡路的树枝，竭力不让脚步发出一点儿声音，连呼吸都小心翼翼',
					'失去人性，失去很多；失去兽性，失去一切'
				],
				loadStatus: 'loadmore',
				flowList: [],
				uid: '',
				list: []
			}
		},
		onLoad() {

			try {
				const value = uni.getStorageSync('userInfo');
				if (value) {
					this.uid = value.uid;
				} else {

				}
			} catch (e) {
				// error
			}

			var _this = this;
			uni.request({
				url: req.url + '/carousel/findAllC', //http://localhost:8285/carousel/findAllC
				method: 'POST',
				success: (re) => {
					//_this.templList = re.data;

					for (var i = 0; i < re.data.length; i++) {
						var te = {
							image: re.data[i].cover,
							title: re.data[i].bname,
							cid: re.data[i].id
						}
						_this.imglist.push(te);
					}
					//_this.getCarouselList()
					//this.templList = re.data
				}
			})
			//console.log(this.imglist)
			var that = this;
			uni.request({
				url: req.url + '/book/findAll',
				method: 'POST',
				success: (res) => {
					that.list = res.data
					that.getBookList()
				}
			})
		},
		methods: {
			getBookList() {
				for (var i = 0; i < this.list.length; i++) {
					var book = {
						author: this.list[i].author,
						shop: this.list[i].bname,
						ima: this.list[i].cover,
						title: this.list[i].keyword,
						id: this.list[i].id
					}
					this.flowList.push(book)
				}
			},
			getCarouselList() {
				for (var j = 0; j < this.templList.length; j++) {
					var caro = {
						image: this.templList[j].cover,
						title: this.templList[j].bname,
						cid: this.templList[j].id
					}
					this.imglist.push(caro);
				}
			},
			booksBtn(re) {
				uni.navigateTo({
					url: '../bookcase/bookinfo/bookinfo?id=' + re + '&uid=' + this.uid
				})
			},
			caroNav(index) {
				uni.navigateTo({
					url: './carousel/bookinfo?id=' + this.imglist[index].cid + '&uid=' + this.uid
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.yellow {
		background-color: #FFDA33;
	}

	.top-search {
		background-color: #FFDA33;
	}

	.wrap {
		padding: 40rpx;
	}

	.l-main {
		margin-top: 10rpx;
		margin-left: 40rpx;
	}

	.demo-warter {
		border-radius: 8rpx;
		margin: 5rpx;
		background-color: #ffffff;
		padding: 8rpx;
		position: relative;
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.demo-image {
		width: 100%;
		border-radius: 4rpx;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5rpx;
		color: $u-tips-color;
	}

	.demo-tag {
		display: flex;
		margin-top: 5rpx;
	}

	.demo-tag-owner {
		background-color: $u-type-error;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}

	.demo-tag-text {
		border: 1rpx solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10rpx;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}

	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5rpx;
	}
</style>
