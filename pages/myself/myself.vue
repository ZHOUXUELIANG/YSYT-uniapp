<template>
	
	<view class="container">
		<view class="personal" @click="login()">
			<view class="personal-main">
				<u-avatar :src="avatar" mode="square" size="120" class="u-avatar"></u-avatar>
				<view class="personal-info">
					<view>id: {{userDetailInfo.uid}}</view>
					<view>name: {{userDetailInfo.username}}</view>
				</view>
			</view>
			<u-icon name="arrow-right" size="30" class="p-right-icon"></u-icon>
		</view>
		<view class="n-p" v-for="(item,index) in list" :key="index" hover-class="hover-class"
			@click="onClick(index,item)">
			<view style="position: relative">
				<view class="p-left">
					<u-icon :name="item.icon" size="45" color="#757575"></u-icon>
				</view>
			</view>
			<view class="p-right">
				<view class="p-right-main">
					<view class="p-right-main-name">{{item.name}}</view>
				</view>

				<view class="lfet-a">
					<view style="position: relative">
					</view>
					<u-icon name="arrow-right" size="30" class="p-right-icon"></u-icon>
				</view>
			</view>
		</view>

		<u-button class="logout" type="error" @click="open()">退出登录</u-button>
		<u-modal :show-cancel-button="true" v-model="show" :content="content" @confirm="confirm()"></u-modal>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar: '',
				list: [{
						name: '书架',
						id: 'bookOrder',
						icon: 'order',
						iconBackground: '#5e2d88'
					},
					{
						name: '设置',
						id: 'setUp',
						icon: 'grid',
						iconBackground: '#3b2021'
					},
					{
						name: '关于我们',
						id: 'help',
						icon: 'server-fill',
						iconBackground: '#833456'
					}
				],
				userDetailInfo: {
					uid: '',
					username: ''
				},
				show: false,
				content: '确认退出登录吗？'
			}
		},
		created() {
			this.checkLogin();
		},
		onLoad() {
			/* uni.getStorage({
			    key: 'userInfo',
			    success: function (res) {
				   console.log(res.data[0])
					this.userDetailInfo.uid = res.data[0].uid;
					this.userDetailInfo.username = res.data[0].username;
			    }
			})   */
			/* 谨记，一定要使用同步，不知道为什么，我在使用异步存储与获取的时候总是出问题 */
			try {
				const value = uni.getStorageSync('userInfo');
				if (value) {
					this.userDetailInfo.uid = value.uid;
					this.userDetailInfo.username = value.username;
					this.avatar = value.avatar;
				} else {
					uni.navigateTo({
						url: '../login/login'
					})
				}
			} catch (e) {
				// error
			}
		},
		methods: {
			onClick(index) {
				
				if (index == 0) {
					uni.switchTab({
						url: '../bookcase/bookcase'
					});
				}
				if (index == 1) {
					setTimeout(function() {
						uni.navigateTo({
							url: 'forget-pwd/forget-pwd'
						})
					}, 500)
				}
				if (index == 2) {
					setTimeout(function() {
						uni.navigateTo({
							url: 'about/about'
						})
					}, 500)
				}
			},
			login() {
				uni.navigateTo({
					url: './myself_info'
				})

			},
			open() {
				this.show = true;
			},
			confirm() {
				try {
					uni.clearStorageSync('userInfo');
				} catch (e) {
					// error
				}

				setTimeout(function() {
					uni.reLaunch({
						url: "../login/login",
						success() {
							/* 页面跳转之后，进行页面刷新，避免了本地storage返回清理的问题 */
							let page = getCurrentPages().pop(); //跳转页面成功之后
							if (!page) return;
							page.onLoad(); //如果页面存在，则重新刷新页面
						}
					})
				}, 1500)


			}

		}
	}
</script>

<style>
	.personal {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 0 40rpx 30rpx;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
	}

	.personal-main {
		display: flex;
		align-items: center;
	}

	.personal-info {
		display: flex;
		flex-direction: column;
	}

	.u-avatar {
		margin-right: 30rpx;
	}

	.navbar-right {
		padding: 0 40rpx;
	}

	.navbar-right-icon {
		margin-left: 50rpx;
	}

	.hover-class {
		/* background-color: #efefef; */
	}

	.n-p {
		display: flex;
		align-items: center;
		background-color: #ffffff;
		margin-bottom: 20rpx;
	}

	.p-right-icon {
		padding: 0 40rpx;
	}

	.p-left {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60rpx;
		height: 60rpx;
		padding: 10rpx;
		margin: 20rpx;
		/* color: #FFFFFF; */
		border-radius: 10rpx;

	}

	.p-right {
		height: 90rpx;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.p-right-main {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.p-right-main-name {
		font-size: 36rpx;
		font-weight: 500;
	}

	.p-right-main-time {
		margin-right: 20rpx;
		font-size: 24rpx;
		/* color: #9d9d9d; */
	}

	.logout {
		margin-top: 60px;
	}
</style>
