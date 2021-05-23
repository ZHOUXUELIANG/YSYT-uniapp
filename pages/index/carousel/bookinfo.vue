<template>
	<view class="books-details">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="book-detail">
			<view class="detail-left">
				<image class="book-img" :src="imge" />
			</view>
			<view class="detail-right">
				<view class="detail-right-box">
					<view class="title">{{title}}</view>
					<view class="author">{{author}}</view>
					<view class="tag">
						<view class="tag-title">心理学</view>
						<view class="tag-title">人性</view>
					</view>
					<view class="grade">
						<u-rate active-color="#FFB32F" current="5" :disabled='true' />
					</view>
				</view>
				<view class="btn-box">
					<view class="readBtn" @click="startRe()">开始阅读</view>
					<view class="joinBtn" @click="addTobookcase()">加入书架</view>
				</view>
			</view>
		</view>
		<view class="book-jieshao">
			<u-read-more :toggle="true" show-height="76" :shadow-style="jieshaStyle" color="#0086E7" close-text="展开阅读全文"
				font-size="26">
				<rich-text class="jiesha" :nodes="jiesha"></rich-text>
			</u-read-more>
		</view>

		<view class="review">
			<view class="review-head">评论</view>
			<view class="review-input">
				<input maxlength="150" confirm-type="go" placeholder="评论才是真爱" />
				<view class="review-btn">
					提交
					<i class="iconfont send" />
				</view>
			</view>
			<view class="review-list">
				<view class="review-box">
					<view class="user-message">
						<view class="message-img">
							<image class="user-img" src="https://s1.ax1x.com/2020/06/02/ttbbJU.jpg"></image>
						</view>
						<view class="message-name">
							<view class="head">
								努力努力再努力
							</view>
							<view class="star">
								<u-rate active-color="#FFB32F" size="26" current="5" :disabled='true' />
							</view>
						</view>
						<view class="message-praise">
							<view @click="iconActive" :class="{'icon-active':iconOFF}">
								<i class="iconfont love" />
							</view>
						</view>
					</view>
					<view class="con-tent">
						<p class="text">该书汇集了卡耐基的思想精华和激动人心的内容，是作者功的励志经典，出版后立即获得了广大读者的欢迎，成为西方世界的人文书。</p>
						<p class="time">2019-11-16</p>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import req from '../../../config/request.js';

	export default {
		data() {
			return {
				jiesha: ``,
				iconOFF: false, //爱心激活开关
				jieshaStyle: {
					backgroundImage: "linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 80%)",
					paddingTop: "80rpx",
					marginTop: "-80rpx",
				},
				author: '',
				title: '',
				imge: '',
				id: '',
				uid: '',
				url: ''


			};
		},
		onLoad(option) {
			
			//console.log(option)

			this.id = option.id;
			this.uid = option.uid;
			
			let that = this;
			uni.request({
				url: req.url + '/carousel/findOne', //http://localhost:8285/carousel/findOne
				method: 'POST',
				data: {
					id: option.id
				},
				success: (res) => {
					
					//console.log(res)
					that.author = res.data.author;
					that.title = res.data.bname;
					that.imge = res.data.cover;
					that.jiesha = res.data.outline;
					that.url = res.data.url;
				}
			}) 
		},
		methods: {
			rateBtn(value) {
				console.log(value)
			},
			iconActive() {
				this.iconOFF = !this.iconOFF
			},
			startRe() {
				uni.navigateTo({
					//url: '../../index/read/read?id=' + this.id，
					url:'read?id=' + this.id
				})
			},
			addTobookcase() {
				uni.request({
					url: req.url + '/bookcase/addBookcase', //http://localhost:8285/book/finOne
					method: 'POST',
					data: {
						cover: this.imge,
						uid: this.uid,
						content: this.url,
						description: this.title
					},
					success: (res) => {
						this.$refs.uTips.show({
							title: '成功添加到书架',
							type: 'success',
							duration: '2300'
						})



					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.books-details {
		padding: 0 $bleed $navBoxHeight $bleed;
	}

	.book-detail {
		display: flex;
		padding-top: 40upx;

		.detail-left {
			flex: 1;
			min-width: 270upx;
			max-width: 270upx;
			height: 340upx;

			.book-img {
				width: 240upx;
				height: 340upx;
				border-radius: 12upx;
				background-color: $skeletonColor;
			}
		}

		.detail-right {
			height: 340upx;
			padding: 4upx 0;

			.detail-right-box {
				height: calc(100% - 64upx);
			}

			.title {
				font-size: 36upx;
				font-weight: 700;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				margin-bottom: 10upx;
			}

			.author {
				font-size: 26upx;
				color: $mediumGrey;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				padding-bottom: 20upx;
			}

			.tag {
				padding-bottom: 5upx;

				.tag-title {
					background-color: #EFF5FD;
					height: 48upx;
					line-height: 48upx;
					color: $mediumGrey;
					padding: 0 20upx;
					margin-right: 20upx;
					border-radius: 4upx;
					display: inline-block;
					font-size: 24upx;
				}
			}

			.grade {
				padding-top: 4upx;
			}

			.btn-box {
				.readBtn {
					background-color: $dominantHue;
					border: 1px solid $dominantHue;
					padding: 0 30upx;
					display: inline-block;
					height: 64upx;
					line-height: 64upx;
					border-radius: 4upx;
					color: #fff;
					cursor: pointer;
					font-size: 28upx;
					margin-right: 26upx;
				}

				.readBtn:active {}

				.joinBtn {
					border: 1px solid $dominantHue;
					color: $dominantHue;
					padding: 0 29upx;
					height: 64upx;
					line-height: 64upx;
					display: inline-block;
					border-radius: 4upx;
					cursor: pointer;
					font-size: 28upx;
				}
			}
		}

	}

	.book-jieshao {
		padding: 40upx 0 30upx 0;
		overflow: hidden;

		.jiesha {
			width: 100%;
			word-wrap: break-word;
			color: $mediumGrey;
			line-height: 48upx;
			font-size: 26upx;
		}
	}

	.catalogue-box {
		height: 96upx;
		line-height: 96upx;
		padding: 0 20upx;
		background-color: $lightBlue;
		border-radius: 4upx;
		font-size: 28upx;
		display: flex;
		margin-bottom: 60upx;

		.catalogue-left {
			flex: 1;
			max-width: 80upx;
		}

		.catalogue-centre {
			flex: 1;
			color: $mediumGrey;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		}

		.catalogue-right {
			flex: 1;
			max-width: 80upx;
			text-align: right;
		}
	}

	.review {
		.review-head {
			font-size: 32upx;
			font-weight: 700;
			margin-bottom: 30upx;
		}

		.review-input {
			$review: 84upx;
			height: $review;
			border-radius: 8upx;
			border: 1px solid $dominantHue;
			margin-bottom: 60upx;

			input {
				height: $review - 2upx;
				line-height: $review - 2upx;
				padding: 0 20upx;
				float: left;
				width: calc(100% - 112upx);
				font-size: 28upx;
				box-sizing: border-box;
			}

			.review-btn {
				float: right;
				height: $review - 2upx;
				line-height: $review - 2upx;
				width: 112upx;
				background-color: $dominantHue;
				text-align: center;

				.send {
					color: #fff;
					font-size: 48upx;
				}
			}
		}
	}

	.review-list {
		.review-box {
			$imgWidth: 96upx;
			padding-bottom: 40upx;

			.user-message {
				$userH: 76upx;
				display: flex;
				height: $userH;

				.message-img {
					flex: 1;
					height: $userH;
					min-width: $imgWidth;
					max-width: $imgWidth;

					.user-img {
						width: $userH;
						height: $userH;
						border-radius: 50%;
						background-color: $skeletonColor;
					}
				}

				.message-name {
					flex: 1;

					.head {
						font-size: 28upx;
						height: 44upx;
					}

					.star {
						height: 38upx;
						padding-top: 2upx;
					}
				}

				.message-praise {
					flex: 1;
					line-height: $userH - 20upx;
					min-width: 40upx;
					max-width: 40upx;
					text-align: right;
					padding: 10upx 0;

					.icon-active {
						.love {
							color: $redAll;
						}
					}

					.love {
						font-size: 34upx;
						color: #A3B0C0;
					}
				}

			}

			.con-tent {

				padding: 14upx 0 0 $imgWidth;

				.text {
					word-wrap: break-word;
					font-size: 26upx;
					line-height: 40upx;
					color: $mediumGrey;
				}

				.time {
					padding: 10upx 0 0 0;
					color: $lightGray;
					font-size: 24upx;
				}
			}

		}
	}
</style>
