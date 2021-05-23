<template>
	<view>

		<cmd-nav-bar class="top" background-color="linear-gradient(to right, #FFDA33, #66BD88)" iconTwo="camera"
			@iconTwo="uploadImage()"></cmd-nav-bar>

			
		<u-top-tips ref="uTips"></u-top-tips>

		<view>
			<view class="vvv">
				<text v-model="h" selectable="true" v-for="(item,index) in content" :key="index">{{item.words}}</text>
			</view>
		</view>

		<view class="btnNext">
			<u-button @click="openVoice()" class="bt1" size="medium" type="warning">
				<u-icon name="volume-up"></u-icon>语音播报
			</u-button>
			<u-button @click="addTobookcase()" class="bt2" size="medium" type="warning">保存到书架<u-icon name="file-text">
				</u-icon>
			</u-button>
		</view>

	</view>

</template>

<script>
	import req from '../../config/request.js'
	import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"

	//引入图片提取文字插件
	import {
		pathToBase64,
		base64ToPath
	} from '../../js_sdk/mmmm-image-tools/index.js';
	import Voice from '../../js_sdk/QuShe-baiduYY/QS-baiduyy/QS-baiduyy.js'

	export default {
		components: {
			cmdNavBar
		},
		data() {
			return {
				src: '',
				content: [],
				itemNum: 1,
				h: '',
				voiceFlag: true,
				access_t: '', //图像识别文字接口的token
				im: '',
				rl: '',
				uid: ''
			}
		},
		onLoad() {
			this.getToken();
			try {
				const value = uni.getStorageSync('userInfo');
				if (value) {
					this.uid = value.uid;
				} else {
					
				}
			} catch (e) {
				// error
			}
			
		},
		methods: {

			iconTwo() {
				console.log(123)
			},

			getToken() {
				uni.request({
					url: 'https://aip.baidubce.com/oauth/2.0/token',
					data: {
						grant_type: 'client_credentials',
						client_id: 'KaaCB6NCEcGXM2n5nLReCVG7',
						client_secret: 'QkowIGpGSrfIEBxVNWC2Sl768ySa2HE3'
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						this.access_t = res.data.access_token
					}
				})
			},
			uploadImage() { //   选取照片，进行OCR识别

				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;

						uni.uploadFile({
							url: req.url + '/uploadImage', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								this.im = uploadFileRes.data;
							}
						});

						uni.showLoading({
							title: '正在识别中...'
						});
						this.src = res.tempFilePaths[0]; //后面还能用到 src 暂且留着
						// console.log(res);
						pathToBase64(res.tempFilePaths[0])
							.then(base64 => {
								// console.log(base64)
								var base = base64.split(',')[1]

								//console.log('在选取图片时候打印出', this.access_t);

								//console.log(base)、

								uni.request({
									url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic?access_token=' +
										this.access_t,
									data: {
										image: base,
										// language_type:'ENG', //识别语言类型，默认中英文结合
										detect_direction: true, //检测图像朝向
									},
									method: 'POST',
									header: {
										'Content-Type': 'application/x-www-form-urlencoded'
									},
									success: (res) => {
										this.content = res.data
											.words_result
										uni.hideLoading(); //把正在加载中隐藏
										//console.log(res.data)

										//将content数组中的内容全部存到变量 h 中
										for (var i = 0; i < res.data
											.words_result_num; i++) {
											this.h += this.content[i]
												.words
										}

										//console.log(this.h)
										
										let that = this;
										uni.request({
											url: req.url + '/transToTxt?str=' +
												this
												.h, //http://localhost:8285/transToTxt?str=demoData
											method: "POST",
											success(es) {
												that.rl = es.data;
												//console.log("返回的文件地址" + es.data)
											}
										})
									}
								});
							})
							.catch(error => {
								console.error(error)
							});
						/* uni.request({
							url: req.url + '/transToTxt?str=' + this.h ,  //http://localhost:8285/transToTxt?str=demoData
							method:"POST",
							success(es) {
								console.log(es.data)
							}
							
						}) */
					}
				});
			},
			openVoice() {
				var voice;
				if (this.voiceFlag == true) {
					voice = Voice({
						voiceSet: {
							tex: this.h
						},
						audioSet: {
							volume: 1
						},
						audioCallback: {
							onPlay: () => {
								console.log('音频开始播放了')
							}
						},
						returnAudio: false
					});
				}

			},
			addTobookcase() {
				
				console.log("获取到链接" + this.rl)
				uni.request({
					url: req.url + '/bookcase/addBookcase', //http://localhost:8285/book/finOne
					method: 'POST',
					data: {
						cover: this.im,
						uid: this.uid,
						content: this.rl,
						description: '自定义到书架'
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

<style>
	page {
		/* background-color: #F5F8FF; */
		background-color: light gray;

	}

	.vvv {
		width: 99%;
		border: 2px dashed black;
		height: 500upx;
		margin: 30upx 0 0 0;
		margin-top: 300rpx;
	}

	.btnNext {

		position: fixed;
		bottom: 200rpx;
	}

	.bt1 {
		margin-left: 20rpx;
	}

	.bt2 {
		margin-left: 120rpx;
	}
</style>
