<script>
    import Vue from 'vue'
	

    export default {
        created() {
            // #ifdef APP-PLUS
            plus.navigator.closeSplashscreen();
            // #endif
        },
        onLaunch: function () {

            console.log('App Launch')
            uni.getSystemInfo({
                success: function (e) {
                    // #ifndef MP
                    Vue.prototype.StatusBar = e.statusBarHeight;
                    if (e.platform == 'android') {
                        Vue.prototype.CustomBar = e.statusBarHeight + 50;
                    } else {
                        Vue.prototype.CustomBar = e.statusBarHeight + 45;
                    }
                    ;
                    // #endif

                    // #ifdef MP-WEIXIN
                    Vue.prototype.StatusBar = e.statusBarHeight;
                    let custom = wx.getMenuButtonBoundingClientRect();
                    Vue.prototype.Custom = custom;
                    Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
                    // #endif

                    // #ifdef MP-ALIPAY
                    Vue.prototype.StatusBar = e.statusBarHeight;
                    Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
                    // #endif
                }
            })
        },
        onShow: function () {
            console.log('App 开启')
			
			
		
        },
        onHide: function () {
            console.log('App 关闭')
        }
    }
</script>

<style lang="scss">
	
	
    /* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
    @import "uview-ui/index.scss";
    /*每个页面公共css */
  page {
        background-color: #ECECEC;
    }

	
	

</style>
