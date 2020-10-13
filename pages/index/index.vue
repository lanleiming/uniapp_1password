<template>
	<view class="container">
		<uni-search-bar class="uni-searchbar" clearButton="auto" @input="searchTxt" cancelButton="none"  ></uni-search-bar>
		<!-- 标题卡片模式 -->
		<uni-collapse>
			<pwd-item :data="items"></pwd-item>
		</uni-collapse>
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
		
		<!-- 提示信息 -->
		<uni-popup ref="popup" type="message">
		    <uni-popup-message type="success" :message=msg :duration="150"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg:'复制成功',
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
			showMsg(msg){
				this.msg = msg || this.msg;
				this.$refs.popup.open();
			},
			searchTxt(e){
				console.log(this)
				console.log(e);
				this.showMsg();
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
		padding:17.77rpx 10rpx !important;
	}
	.uni-collapse{
		margin-top:10px;
		box-sizing: border-box;
		padding:0 10rpx !important;
	}
</style>
