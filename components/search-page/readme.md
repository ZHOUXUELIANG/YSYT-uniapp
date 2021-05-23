# 使用方法
```html
	<search-page 
		:placeholder="placeholder" 
		:hotList="hotList" 
		:hMax="hMax" 
		:showHistory="showHistory" 
		:showHot="showHot" 
		:hType="hType" 
		:oType="oType" 
		:focus="focus"
		@search="search"
		@focus="handleFocus"
		@blur="handleBlur"
	></search-page>
```
```javascript
	export default{
		data(){
			placeholder:'自定义placeholder',
			hotlist:['111','222','333','444'],
			hMax:5,
			showHistory:true,
			showHot:true,
			hType:'round',
			oType:'square-fill',
			focus:true
		},
		methods:{
			search(text){
				console.log(text)
			},
			/* 注意：请勿与data中命名冲突 */
			handleFocus(e){
				console.log(e)
			},
			handleBlur(e){
				console.log(e)
			}
		}
	}
```

# 文档
| 字段 | 类型 | 默认 | 描述 |
| ---  | --- | --- | --- |
| placeholder | String |  | 自定义输入框的placeholder |
| hotList | Array |  | 热门搜索列表 |
| hMax | Number | 10 | 最多保留历史记录条数 |
| showHistory | Boolean | true | 是否显示历史记录 |
| showHot | Boolean | true | 是否显示热门搜索 |
| defaultText | String |  | 输入框默认搜索关键词 |
| hType | String[**参数值如下**] |  | 历史记录文本样式 |
| oType | String[**参数值如下**] |  | 热门搜索文本样式 |
| focus | Boolean | true | 输入框是否自动聚焦 |

# 事件
| 事件名 | 默认参数 | 描述 |
| ---  | --- | --- |
| search | text | 回车执行search方法，拿到输入框输入的内容 |
| blur | e | 输入框失去焦点时触发，event.detail = {value: value} |
| focus | e | 输入框聚焦时触发，event.detail = { value, height }，height 为键盘高度 |

# hType && oType 字段值
| 字段名 \ 参数值 | round | round-fill | square | square-fill |
| ---  | --- | --- | --- | --- |
| hType | √ | √ | √ | √ |
| oType | √ | √ | √ | √ |


# 依赖于
> [uni-icons](https://ext.dcloud.net.cn/plugin?id=28) 

# 注意
> 如果遇到问题可以【加入下方qq群】或者【发送给我邮箱】
> 亦可以【关注公众号】后台给我留言

# 更新记录
V0.0.2
- 新增自动聚焦
- 新增blur事件
- 新增focus事件

# 参与贡献
+ xueshuai(xueshuai_12@163.com)
+ Email：xueshuai_12@163.com
+ GitHub：[GitHub地址](https://github.com/xue-shuai/uni-ui/tree/main/search-page)
+ QQ交流群：[1063233592](https://qm.qq.com/cgi-bin/qm/qr?k=48lCCsUUYgxZh1eQGvJR9FDzqnwwyghJ&jump_from=webapi)
+ 个人网站：[前端靓仔](http://xueshuai.top)
+ 个人公众号：**叮当Ding**<br>
<br>
<img src="https://img-blog.csdnimg.cn/20210202143040150.png" width="30%" alt="叮当Ding">
