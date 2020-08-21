<template>
	<view class="container">
		<uni-search-bar class="uni-searchbar" clearButton="auto" @input="searchTxt" cancelButton="none"  ></uni-search-bar>
		<!-- 单行内容显示 -->
		<!-- <uni-list>
		    <uni-list-item  title="列表文字" ></uni-list-item>
		    <uni-list-item :disabled="true" title="列表禁用状态" ></uni-list-item>
		</uni-list> -->
		<!-- 标题卡片模式 -->
		<uni-card title="博客园" :is-shadow="true" >
			<pwd-item :data="items"></pwd-item>
		</uni-card>
		<!-- 自定义底部按钮 -->
	<!-- 	<uni-card title="Dcloud" note="true">
		    默认内容
		    <template v-slot:footer>
		        <view class="footer-box">
		            <view>喜欢</view>
		            <view>评论</view>
		            <view>分享</view>
		        </view>
		    </template>
		</uni-card> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items:[{
					name:'liuge',
					pwd:'admin123@'
				},
				{
					name:'liuge1',
					pwd:'admin123@@'
				}],
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {
			searchTxt(e){
				console.log(e);
			}
		}
	}
</script>

<style>
	.container {
		padding: 20rpx 10rpx;
		font-size: 14px;
		line-height: 24px;
	}
	.uni-searchbar{
		padding:17.77rpx 33.33rpx !important;
	}
</style>
