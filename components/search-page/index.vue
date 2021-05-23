<template>
	<view class="content">
		<view class="search_box">
			<view class="search">
				<view class="search_left">
					<view class="icon"><uni-icons type="search"></uni-icons></view>
					<view class="input">
						<input type="text" 
							placeholder-class="input_placeholder" 
							:placeholder="placeholder" 
							v-model="searchText" 
							confirm-type="search" 
							@confirm="search"
							@focus="handleFocus"
							@blur="handleBlur"
							:focus="focus"
							:adjust-position="false"
						/>
					</view>
				</view>
				<view class="back" @click="handleBack">{{backText}}</view>
			</view>
		</view>
		<!-- 历史记录 -->
		<view class="list history" v-if="hList.length > 0 && showHistory">
			<view class="head">
				<view>历史记录：</view>
				<view class="delete-icon"><uni-icons type="trash" @click="clearCach"></uni-icons></view>
			</view>
			<view class="list_ls">
				<view class="item" :class="hType" v-for="(item,index) in hList" :key="index" @click="searchText = item">{{item}}</view>
			</view>
		</view>
		<!-- 热门搜索 -->
		<view class="list hot" v-if="hotList.length > 0 && showHot">
			<view class="head">
				<view>搜索发现：</view>
			</view>
			<view class="list_ls">
				<view class="item" :class="oType" v-for="(item,index) in hotList" :key="index" @click="searchText = item">{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	export default{
		components:{
			uniIcons
		},
		props:{
			placeholder:{//placeholder
				type:String,
				default:''
			},
			hotList:{//热门搜索列表
				type:Array,
				default:()=>{
					return []
				}
			},
			hMax:{//历史记录最多保留几条
				type:Number,
				default:10
			},
			showHistory:{//是否展示历史记录
				type:Boolean,
				default:true
			},
			showHot:{//是否展示热门搜索
				type:Boolean,
				default:true
			},
			defaultText:{//默认搜索关键词
				type:String,
				default:''
			},
			hType:{//历史记录文本样式 round round-fill square square-fill
				type:String,
				default:''
			},
			oType:{//热门搜索文本样式 round round-fill square square-fill
				type:String,
				default:''
			},
			focus:{//输入框是否自动获得焦点
				type:Boolean,
				default:true
			}
		},
		data(){
			return {
				searchText:'',//搜索的内容
				backText:'返回',//输入框后面的文字
				hList:uni.getStorageSync('hList'),//历史记录
			}
		},
		mounted() {
			if(this.defaultText.length > 0){
				this.searchText = this.defaultText;
			}
		},
		methods:{
			// 搜索
			search(){
				uni.hideKeyboard();
				if(!this.searchText){
					uni.showToast({
						title:'请输入内容',
						icon:'none'
					})
					return false;
				}
				this.setHistory();
				this.$emit('search',this.searchText)
				this.searchText = '';
			},
			// 返回按钮操作
			handleBack(){
				if(this.backText == '清除'){
					this.clearText()
				}else if(this.backText == '返回'){
					uni.navigateBack({})
				}
			},
			// 清空输入的内容
			clearText(){
				this.searchText = '';
			},
			// 存储历史记录
			setHistory(){
				let that = this;
				let hList = uni.getStorageSync('hList');
				if(!hList){
					uni.setStorage({
						key:'hList',
						data:[this.searchText]
					})
				}else{
					hList = hList.concat(this.searchText);
					hList = [...new Set(hList)]
					if(hList.length > this.hMax){
						hList.splice(0,(hList.length - this.hMax))
					}
					uni.setStorage({
						key:'hList',
						data:hList
					})
				}
				uni.getStorage({
					key:'hList',
					success:function(res){
						that.hList = res.data;
					}
				})
			},
			// 清空历史记录
			clearCach(){
				uni.removeStorage({ key:'hList' })
				this.hList = uni.getStorageSync('hList');
			},
			// 获得焦点时触发
			handleFocus(e){
				this.$emit('focus',e)
			},
			// 失去焦点时触发
			handleBlur(e){
				this.$emit('blur',e)
			}
		},
		watch:{
			searchText(n,o){
				if(n.length > 0){
					this.backText = '清除'
				}else{
					this.backText = '返回'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		.search_box{box-sizing: border-box;padding: 20rpx 40rpx;margin-bottom: 72rpx;
			.search{display: flex;align-items: center;
				.search_left{flex: 1; display: flex;background-color: #FAFAFA;border-radius: 36rpx;height: 68rpx;align-items: center;box-sizing: border-box;padding-left: 28rpx;padding-right: 34rpx;
					.icon{margin: 16rpx;display: flex;align-items: center;}
					.input{flex: 1;
						input{font-size: 28rpx;color: #404040;}
						.input_placeholder{font-size: 28rpx;color: #B9BDBB;}
					}
				}
				.back{font-size: 28rpx;color: #B9BDBB;margin-left: 42rpx;}
			}
		}
		.list{padding: 0 40rpx;
			.head{display: flex;justify-content: space-between; color: #1A1A1A;font-size: 32rpx;margin-bottom: 28rpx;}
			.list_ls .item{display: inline-block;padding: 8rpx 24rpx;margin:0rpx 16rpx 22rpx 0rpx;font-size: 28rpx;color: #1A1A1A;
				&.round{border: 2rpx solid #EFEFEF;border-radius: 24rpx;font-size: 24rpx;color: #919191;}
				&.round-fill{background-color:#EFEFEF;border: 2rpx solid #EFEFEF;border-radius: 24rpx;font-size: 24rpx;color: #919191;}
				&.square{border: 2rpx solid #EFEFEF;border-radius: 8rpx;font-size: 24rpx;color: #919191;}
				&.square-fill{background-color:#EFEFEF; border-radius: 8rpx;font-size: 24rpx;color: #919191;}
			}
		}
	}
</style>
