<template>
	<view>
		<div class="main">
			<div @click="importDB()" class="div-item">
				 <uni-icons class="item-icon" type="plus" size="20"></uni-icons>
				 <label class="item-name">导入数据</label>
			</div>
			<div class="div-tips">
				操作步骤：<br/>
				0：导入的数据库将做覆盖操作，谨慎操作！<br/>
				1、手动将数据文件命名为 import.txt<br/>
				2、将文件移动到：{{ importPath }}<br/>
				3、点击 “导入数据”，即可。
			</div>
			<div @click="exportDB()" class="div-item">
				 <uni-icons class="item-icon" type="download" size="20"></uni-icons>
				 <label class="item-name">备份数据</label>
			</div>
			<div class="div-tips">
				默认将数据导出到：{{ exportPath }}
			</div>
		<!-- 	<div @click="help()" class="div-item">
				 <uni-icons class="item-icon" type="info" size="20"></uni-icons>
				 <label class="item-name">使用教程</label>
			</div> -->
			<div @click="aboutUS()" class="div-item">
				 <uni-icons class="item-icon" type="person" size="20"></uni-icons>
				 <label class="item-name">关于我</label>
			</div>
			<div class="div-tips div-tips1">
				<div style="margin-top:20rpx;">客服QQ：3261631197</div>
				<div style="margin-top:20rpx;">QQ群：1020048903</div>
			</div>
			
			<!-- 废弃：速度较慢 -->
			<!-- <yt-file-selector @selected="selectedHandler" :autoclose="false" ref="selectors"></yt-file-selector>
			<block>
				<view class="item" v-for="(item,i) in selectList" :key="i">
					<view>path:{{item.path}}</view>
					<view>size:{{item.size}}</view>
				</view>
			</block> -->
		</div>
	</view>
</template>

<script>
	// import ytFileSelector from '../../components/yt-file-selector/index.vue'
	export default {
		// components:{
		// 	ytFileSelector
		// },
		data() {
			return {
			  importPath:'',
			  exportPath:'',
			}
		},
		onLoad(){
			this.importPath = '/sdcard/Android/data/'+this.Common.pkgName+'/documents';
			this.exportPath = '/sdcard/Android/data/'+this.Common.pkgName+'/documents/export.txt';
		},
		methods: {
			async importDB(){
				uni.showLoading({
				    title: '加载中'
				});
				var result = await this.Common.importDB();
				uni.hideLoading();
				if(!result){
					uni.showModal({
					    title: '导入失败',
					    content: '请先将数据文件 import.txt 移动到：'+this.importPath,
					    showCancel:false,
						success: function (res) {
					    }
					});
					return;
				}
				//console.log(result)
				//检测数据文件是否正确				
				if(!this.Common.checkDB(result)){
					this.Common.toast('数据格式有误，可以先导出数据对比！')
					return;
				}				
				//覆盖数据库
				var result1 =this.Common.setDataBase(JSON.parse(result));
				this.Common.toast(result1?'导入成功':'导入失败')
			},
			async exportDB(){
				var db = await this.Common.getDataBase();
				var result = await this.Common.exportDB(JSON.stringify(db));
				if(result){
					uni.showModal({
					    title: '导出成功',
					    content: '文件路径：'+this.exportPath,
					    showCancel:false,
						success: function (res) {
					    }
					});
				}else{
					this.Common.toast('导出失败，请检查权限！');
				}
			},
			help(){},
			aboutUS(){
				var that = this;
				uni.setClipboardData({
					data: 'QQ群：1020048903',
					success: function () {
						uni.hideToast();
						that.Common.toast('已将【QQ群号】复制到剪贴板')
					}
				});
			},
		}
	}
</script>

<style>
.main{
	width:100%;
	box-sizing: border-box;
	padding:40rpx 0rpx;
	font-size:32rpx;
}
.div-item{
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width:100%;
	background:rgb(241,241,241);
	height:90rpx;
	margin-top:20rpx;
	box-sizing: border-box;
	padding-left:20rpx;
	color:#000;
}
.div-item:active{
	background-color: #C0C0C0;
}
.item-name{
	margin-left:20rpx;
}
.div-tips{
	padding:0 20rpx;
	font-size:12px;
	color:red;
	word-break: break-all;
	margin-top:6rpx;
}
.div-tips1{
	font-size:14px;
}
</style>
