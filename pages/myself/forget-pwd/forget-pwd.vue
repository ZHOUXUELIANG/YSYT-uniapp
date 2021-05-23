<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="input-box">

			<view class="input-item">
				<view class="input-label">密码</view>
				<view class="input-body">
					<input v-model="password1" type="text" :password="isHidePassword1?true:false"
						style="margin-right: 50upx;" placeholder="请输入密码" maxlength="20" class="input" />
					<image @click="isHidePasswordClick1" class="eye"
						:src="isHidePassword1?'/static/img/attention.png':'/static/img/attention_forbid.png'"></image>
				</view>
			</view>
			<view class="input-item">
				<view class="input-label">确认密码</view>
				<view class="input-body">
					<input v-model="password2" type="text" :password="isHidePassword2?true:false"
						style="margin-right: 50upx;" placeholder="请再次输入密码" maxlength="20" class="input" />
					<image @click="isHidePasswordClick2" class="eye"
						:src="isHidePassword2?'/static/img/attention.png':'/static/img/attention_forbid.png'"></image>
				</view>
			</view>
		</view>
		<button class="button" @click="submit">修改密码</button>
	</view>
</template>

<script>
	import req from '../../../config/request.js';

	let timer = '';
	import {
		checkPhone,
		checkPwd,
		checkCode
	} from "../../../common/common.js"
	export default {
		data() {
			return {

				isHidePassword1: true,
				isHidePassword2: true,
				phone: "",
				password1: "",
				password2: "",
				code: "",
				getUid: ''
			};
		},
		onLoad() {

			try {
				const value = uni.getStorageSync('userInfo');
				if (value) {
					console.log(value);
					this.getUid = value.uid;
				}
			} catch (e) {
				// error
			}
		},
		methods: {
			isHidePasswordClick1() {
				this.isHidePassword1 = !this.isHidePassword1;


			},
			isHidePasswordClick2() {
				this.isHidePassword2 = !this.isHidePassword2;


			},

			submit() {
				/*
				 * 修改密码逻辑
				 */
				if (this.password1.length != 6 || this.password2.length != 6) {
					this.$refs.uTips.show({
						title: '密码格式不正确，请重新输入',
						type: 'error',
						duration: '2300'
					})
				} else {

					if (this.password1 != this.password2) {
						this.$refs.uTips.show({
							title: '两次密码不一致，请重新输入',
							type: 'error',
							duration: '2300'
						})
					} else {
						uni.request({
							url: req.url + '/user/updatesecret', //http://localhost:8285/user/updatesecret
							method: 'POST',
							data: {
								uid: this.getUid,
								password: this.password2
							},
							success: (res) => {
								console.log(res.data);
								if (res.data) {
									this.$refs.uTips.show({
										title: '密码修改成功',
										type: 'success',
										duration: '2300'
									})
									setTimeout(function() {
										uni.switchTab({
											url: '../myself'
										})
									}, 2000)
								}

							}
						})

					}





				}
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	page {
		background-color: #FFFFFF;
	}

	button::after {
		border: none;
	}

	.input-box {
		padding: 50upx;
		font-size: 30upx;

		.input-item {
			display: flex;
			background: white;
			border-bottom: 1upx solid #eeeeee;
			line-height: 100upx;
			height: 100upx;

			.input-label {
				width: 150upx;
			}

			.input-body {
				position: relative;
				height: 100upx;
				width: calc(100% - 150upx);

				.input {
					line-height: 100upx;
					height: 100upx;
					position: relative;
					font-size: 28upx;
				}

				.eye {
					position: absolute;
					height: 50upx;
					width: 50upx;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
				}

				.btn-code {
					position: absolute;
					right: 0upx;
					top: 50%;
					transform: translateY(-50%);
					background: none;
					color: #205592;
					width: 160upx;
					font-size: 24upx;
					box-sizing: border-box;
					text-align: right;
					padding: 0;
					height: 100upx;
					line-height: 100upx;
				}
			}

		}

		.select {
			padding-top: 40upx;
			display: flex;
			justify-content: space-between;
			color: #003B67;
		}
	}

	.button {
		margin: 0 30upx;
		background: #08B6F2;
		border-radius: 50upx;
		line-height: 80upx;
		height: 80upx;
		color: white;
		font-size: 32upx;
	}
</style>
