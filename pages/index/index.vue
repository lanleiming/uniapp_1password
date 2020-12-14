<template>
	<view class="container">
		<uni-search-bar class="uni-searchbar" clearButton="auto" @input="searchTxt" cancelButton="none"  ></uni-search-bar>
		<!-- 标题卡片模式 -->
		<uni-collapse>
			<pwd-item v-if="db&&db.length>0" :txt="txt" :data="db"></pwd-item>
		</uni-collapse>
		<!-- + -->
		<uni-icons @click="add" class="icon-add" type="plus" size="30"></uni-icons>
	</view>
</template>

<script>	
	export default {
		data() {
			return {
				//数据库总文件
			    txt:'',
				db:[]				
			}
		},		
		methods: {
			//搜索
			searchTxt(e){
				this.txt = e.value.trim();				
			},
			//新增item
			add(){
				uni.navigateTo({
				    url: '/pages/edit/edit?projectIndex=&itemIndex=',
					success(err){
						//console.log(err)
					},
					fail(err){
						//console.log(err)
						},
				});
			}
		},
		async onShow(){
			console.log('首页展示');
			// var data = [{"name":"微信","url":"123123","list":[{"name":"lanleiming1","pwd":"123123","desc":""},{"name":"lanleiming2","pwd":"123123","desc":""}]},
			// {"name":"微信1","url":"123123","list":[{"name":"lanleiming1","pwd":"123123","desc":""},{"name":"lanleiming2","pwd":"123123","desc":""}]},
			// {"name":"qq","url":"123123","list":[{"name":"lanleiming1","pwd":"123123","desc":""},{"name":"lanleiming2","pwd":"123123","desc":""}]}
			// ];
			// this.Common.setDataBase(data);
		    this.db = await this.Common.getDataBase();
		}
	
	}
</script>

<style>

	.container {
		padding: 0rpx 10rpx 56rpx;
		font-size: 14px;
		line-height: 24px;
	}
	.uni-searchbar{
		position: fixed;
		top:0rpx;
		left:0;
		padding:17.77rpx 20rpx !important;
		width: 100%;
		background:#fff;
		box-sizing: border-box;
		z-index: 999;
	}
	.uni-collapse{
		margin-top:10px;
		box-sizing: border-box;
		padding:0 10rpx !important;
	}
	.icon-add{
		position: fixed;
		right:40rpx;
		bottom:40rpx;
		color:#007AFF !important;
		font-size: 80rpx !important;
		font-weight: bold;
	}

</style>
