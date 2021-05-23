<template>


	<view class="forget">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="content">
			<!-- 主体 -->
			<view class="main">
				<view class="tips">若你忘记了密码，可在此重置新密码。</view>
				<wInput @blur="confirm1($event)" v-model="phoneData" type="text" maxlength="11" placeholder="请输入手机号">
				</wInput>
				<wInput @blur="confirm2($event)" v-model="passData" type="password" maxlength="6" placeholder="请输入旧密码"
					isShowPass></wInput>
				<wInput v-model="newpassData1" type="password" maxlength="6"
					placeholder="请输入新密码" isShowPass></wInput>
				<wInput @blur="confirm4($event)" v-model="newpassData2" type="password" maxlength="6"
					placeholder="请再次确认新密码" isShowPass>
				</wInput>

			</view>
			<wButton class="wbutton" text="重置密码" :rotate="isRotate" @click.native="startRePass()"></wButton>

		</view>
	</view>
</template>

<script>
	let _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import req from '../../config/request.js'

	export default {
		data() {
			return {
				phoneData: "", //电话
				passData: "", //密码
				newpassData1: "", //新密码
				newpassData2: "", //确认新密码
				isRotate: false, //是否加载旋转
				isture1: false,
				isture2: false,
				isture3: false
			}
		},
		components: {
			wInput,
			wButton
		},
		onLoad() {
			_this = this;
		},
		methods: {
			confirm1(e) {
				if (this.phoneData.length != 11) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '手机号不正确'
					});
					return false;
				} else {

					uni.request({
						url: req.url + "/user/confirm1", //仅为示例，并非真实接口地址。
						data: { //参数
							uid: this.phoneData
						},
						method: 'POST', //请求方式  或GET，必须为大写
						success: res => {
							console.log('返回', res.data);

							if (res.data.uid.length != 11) {
								this.$refs.uTips.show({
									title: '用户不存在，请先注册',
									type: 'error',
									duration: '2300'
								})
							} else {
								this.$refs.uTips.show({
									title: '该用户存在，可重置密码',
									type: 'success',
									duration: '2300'
								})
								this.isture1 = true;
							}
						},
						fail: res => {

						}
					})
				}

			},
			confirm2(e) {
				uni.request({
					url: req.url + "/user/confirm2", //仅为示例，并非真实接口地址。
					data: { //参数
						uid: this.phoneData,
						password: this.passData
					},
					method: 'POST', //请求方式  或GET，必须为大写
					success: res => {
						if(res.data != 'ok') {
							this.$refs.uTips.show({
								title: '用户名或密码不正确，请检查后重新输入',
								type: 'error',
								duration: '2300'
							})
						} else{
							this.isture2 = true;
						} 
					}
				})
			},
			confirm4(e) {
				if(this.newpassData1 != this.newpassData2) {
					this.$refs.uTips.show({
						title: '两次输入的新密码不一致，请重新输入',
						type: 'error',
						duration: '2300'
					})
				}
			},
			
			startRePass() {
				
				/* if() {
					
				} */
				
				//重置密码
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				
				uni.request({
					url: req.url + "/forget",
					data:{
						uid: this.phoneData,
						password: this.newpassData2
					},
					method:'POST',
					success: res => {
						this.$refs.uTips.show({
							title: '重置密码成功，请前往登录',
							type: 'success',
							duration: '2300'
						})
						
						setTimeout(function() {
							uni.navigateTo({
								url: '../login/login'
							})
						}, 2000)
					}
				})
				
				console.log("重置密码成功")
				_this.isRotate = true
				setTimeout(function() {
					_this.isRotate = false
				}, 3000)
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>
