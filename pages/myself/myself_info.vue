<template>
	<view>
		<u-cell-group>
			<u-cell-item title="头像" @click='changeHead'>
				<u-image width='100rpx' height='100rpx' slot="right-icon" :src="headImg" shape="circle">
				</u-image>
			</u-cell-item>
			<u-cell-item title="ID" :value="id"></u-cell-item>

			<u-form class="form_styh" ref="uForm">
				<u-form-item label="昵称">
					<u-input class="form_styn" v-model="name" />
				</u-form-item>
			</u-form>


			<u-cell-item title="性别" :value="sex" @click='selectSex'></u-cell-item>
			<u-cell-item title="出生日期" :value="birthday" @click='show=true'></u-cell-item>
			<u-calendar v-model="show" @change="change"></u-calendar>
		</u-cell-group>
		<button class="save" @tap="savaInfo">保 存 修 改</button>
	</view>
</template>


<script>
	import req from '../../config/request.js'

	export default {
		data() {
			return {
				headImg: '',
				birthday: '请选择出生日期',
				sex: '',
				name: '',
				show: false,
				id: ''

			}
		},
		onLoad() {
			try {
				const value = uni.getStorageSync('userInfo');
				if (value) {
					this.name = value.username;
					this.id = value.uid;
					this.sex = value.sex;
					this.headImg = value.avatar;
					this.birthday = value.birth;
				} else {

				}
			} catch (e) {
				// error
			}
		},
		onBackPress() {
			uni.switchTab({
				/* url:'./myself' */
			})
		},

		methods: {
			changeHead() {

				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: req.url + '/uploadImage', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name:'file',
							success: (uploadFileRes) => {
								this.headImg = uploadFileRes.data;
							}
						});
					}
				});
			},
			selectSex() {
				const arr = ['男', '女', '保密']
				uni.showActionSheet({
					itemList: arr,
					success: (res) => {
						this.sex = arr[res.tapIndex]
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			change(e) {
				this.birthday = e.result

				console.log(this.birthday)
			},
			savaInfo() {
				uni.request({
					url: req.url + '/user/updateMyInfo', //http://localhost:8285/user/updateMyInfo
					method: 'POST',
					data: {
						uid: this.id,
						username: this.name,
						sex: this.sex,
						birth: this.birthday,
						avatar: this.headImg
					},
					success: (res) => {
						console.log(res);
					}
				});
			}

		}
	}
</script>



<style>
	.save {
		background: #53A1BD;
		border: none;
		color: #000000;
		margin-top: 40rpx;
		font-size: 28rpx;
	}

	.form_styh {
		margin-left: 35rpx;
	}

	.form_styn {
		margin-left: 500rpx;
	}
</style>
