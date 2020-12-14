<!-- 密码item选项 -->
<template>
	<view>
	<!-- 一般用法 -->
	<uni-collapse-item v-for="(item,index) in items" :title="item.name"  >
		<uni-list>
			<uni-list-item v-for="(item1,index1) in item.list"   >
				<template  slot="header">
					<div class="item-name" style="width:100%;" @click="copyTitle(item1.name)">
						{{ item1.isShowPwd?item1.pwd:item1.name}}
					</div>
				</template>
				 <template slot="footer">
					 <div class="item-footer" >
						  <div @click="showPwd(index,index1)" class="div-icon-parent">
							<uni-icons  :type="item1.isShowPwd?'eye':'eye-slash' " size="16"></uni-icons>
						 </div>
						 <div  @click="copyPwd(item1.pwd)" class="div-icon-parent">
							 <img class="icon-copy" src="data:image/png;base64,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" />
						 </div>
						  <div  @click="editItem(index,index1)" class="div-icon-parent">
						 <uni-icons  type="compose" size="16"></uni-icons>
						 </div>
						 <div  @click="deleteItem(index,index1)" class="div-icon-parent">
						 <uni-icons  type="trash" size="16"></uni-icons>
						 </div>
						 <div  @click="copyItem(index,index1)" class="div-icon-parent">
								<uni-icons  type="redo" size="16"></uni-icons>
						 </div>
					 </div>
				</template>
			</uni-list-item>
		
		</uni-list>
	</uni-collapse-item>
	
	</view>
</template>

<script>
	export default {
		props: {
			txt:{
				type:[String]
			},
			data: {
				 type: [Object,Array],
			},		
		},
		data() {
			return {
				items:[]
			};
		},
		methods:{
			//处理data
			handlerData(){
				this.items = [];
				for(var i=0;i<this.data.length;i++){
					var item = this.data[i];
					var item_list = item.list;
					for(var j=0;j<item_list.length;j++){
						item_list[j].isShowPwd = false;
					}
					if(this.txt.length>0 ){
						item.name.indexOf(this.txt)>-1 && this.items.push(item);
					}else{
						this.items.push(item);
					}
				}
				console.log(this.items)
			},
			//显示密码
			showPwd(index,index1){
				var item = this.items[index];
				item.list[index1].isShowPwd = true;
				this.$set(this.items,index,item);
				setTimeout(()=>{
					item.list[index1].isShowPwd = false;
					this.$set(this.items,index,item);
				},800)
			},
			//复制name
			copyTitle(val){
				uni.setClipboardData({
					data: val,
					success: function () {
						uni.hideToast();
						uni.showToast({
						    title: '已将【用户名】复制到剪贴板',
							icon:'none',
						    duration: 1000
						});
					}
				});
			},
			//复制密码
			copyPwd(val){
				uni.setClipboardData({
					data: val,
					success: function () {
						uni.hideToast();
						uni.showToast({
						    title: '已将【密码】复制到剪贴板',
							icon:'none',
						    duration: 1000
						});
					}
				});
			},
			copyItem(index,index1){
				this.Common.copyItem(this.items,index,index1);
			},
			//删除
			deleteItem(index,index1){
				var that = this;
				uni.showModal({
				    title: '提示',
				    content: '确认删除此账号？',
				    success: function (res) {
				        if (res.confirm) {
				           // console.log('用户点击确定');
						   var item = that.data[index];
						   item.list.splice(index1,1);
						   if(item.list.length==0){
							   that.data.splice(index,1);
						   }
						   that.Common.setDataBase(that.data);
				        } else if (res.cancel) {
				           // console.log('用户点击取消');
				        }
				    }
				});
			},
			//编辑数据
			editItem(projectIndex,itemIndex){
				console.log(projectIndex+'  '+itemIndex);
				var item = this.items[projectIndex];
				var item1 = item.list[itemIndex];
				uni.navigateTo({
				    url: '/pages/edit/edit?projectIndex='+projectIndex+'&itemIndex='+itemIndex,
					success(err){
						//console.log(err)
						},
					fail(err){
						//console.log(err)
						},
				});
			}
		},
		mounted() {
			//this.items = this.data;
			this.handlerData();
		},
		watch:{
			data(value){
				this.handlerData();
			},
			txt(value){
				this.handlerData();
			}
		}
	}
</script>

<style>
.item-footer{
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
}
.div-icon-parent{
	width:80rpx;
	height:150%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.item-name{
	max-width: 240rpx;
	word-wrap: break-word;
	word-break: break-all;
}
.item-name:active,.div-icon-parent:active{
	background-color:#DCDCDC;
}
.icon-copy{
	display: inline-block;
	height:30rpx;
}

.m-l-50{
	margin-left:50rpx;
}
</style>
