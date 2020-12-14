<template>
	   <view>
			<div class="div-form">
				<div class="div-item">
					<div class="item-left"><label class="lb-tag">*</label>网站名称：</div>
					<div class="item-right">
						<xfl-select
							ref="xfl_select"
							:list="select_list"
							:clearable="false"
							:showItemNum="5" 
							:listShow="listShow"
							:isCanInput="true"  
							:style_Container="'height: 80rpx; font-size: 16px;'"
							:initValue="webName"
							:focusShowList="true"
							:selectHideType="'hideAll'"
							:disabled="select_disabled"
							@change="selectChange"
							@input="inputChange"
						>
						</xfl-select>
					</div>
				</div>
				<div class="div-item">
					<div class="item-left">URL：</div>
					<div class="item-right">
						 <input  v-model="url" class="uni-input"  placeholder="" />
					</div>
				</div>
				<div class="div-item">
					<div class="item-left"><label class="lb-tag">*</label>账号：</div>
					<div class="item-right">
						 <input v-model="username"  class="uni-input"  placeholder="" />
					</div>
				</div>
				<div class="div-item">
					<div class="item-left"><label class="lb-tag">*</label>密码：</div>
					<div class="item-right">
						  <input v-model="pwd"  class="uni-input"  type="text" placeholder="" />
					</div>
				</div>
				<div class="div-item">
					<div class="item-left">备注：</div>
					<div class="item-right">
						 <input  v-model="desc"  class="uni-input"  placeholder="" />
					</div>
				</div>
				<div class="div-item">
					 <button @click="back()"  type="primary">返回</button>
					 <button @click="save()"  type="primary">保存</button>
				</div>
			</div>
	    </view>
</template>

<script>
	import xflSelect from '../../components/xfl-select/xfl-select.vue'; 
	
	export default {
		components: { xflSelect },  //注册为子组件
		data() {
			return {
				webName:'', //网站名称
				url:'', //
				username:'',//用户名
				pwd:'',
				desc:'',
				projectIndex:'',
				itemIndex:'',
				//下拉框列表
				select_disabled:false,
				select_list: [],
				listShow:false,
				db:[],//数据库
			}
		},
		methods: {
			selectChange(res){	
				// console.log('selectChange')
				// console.log(JSON.stringify(res))
				this.webName = res.newVal;
				this.url = res.orignItem.url;
			},	
			inputChange(res){
				console.log('inputChange')
				console.log(res)
				this.webName = res.target.value;
				//这里需要清空下
				setTimeout(()=>{
					if(this.select_list.length==0 || this.webName==''){
						this.url = '';
						this.$refs.xfl_select.switchMgr.close(100);
					}
				},20)
			},
			back(){
				uni.navigateBack()
			},	
			async save(){
				//先校验
				if(!this.webName.trim()){
					this.Common.toast('网站名称不能为空！')
					return;
				}
				if(!this.username.trim()){
					this.Common.toast('账号不能为空！')
					return;
				}
				if(!this.pwd.trim()){
					this.Common.toast('密码不能为空！')
					return;
				}
				//编辑
				if(this.projectIndex!='' && this.itemIndex!=''){
					var item  = this.db[this.projectIndex];	
				    item.name = this.webName;
					item.url = this.url;
					if(item.list && item.list.length>this.itemIndex){
						var item1 = item.list[this.itemIndex];
						item1.name = this.username;
						item1.pwd = this.pwd;
						item1.desc = this.desc;
					}
				}else{
					//新增
					//1、检测是否存在相同网站
					var item = null;
					for(var i=0;i<this.db.length;i++){
						if(this.db[i].name==this.webName){
							item = this.db[i];
							break;
						}
					} 
					if(item){
						//找到
						item.url = this.url;
						item.list.push({
							name:this.username,
							pwd:this.pwd,
							desc:this.desc
						})
					}else{
						//未搜索到
						this.db.push({
							name:this.webName,
							url:this.url,
							list:[{
								name:this.username,
								pwd:this.pwd,
								desc:this.desc
							}]
						})
					}
				}
				//进行保存
			   if(await this.Common.setDataBase(this.db)){
				   this.Common.toast('保存成功！');
				   setTimeout(()=>{
					   this.back()
				   },500)
			   }else{
				   this.Common.toast('保存失败，请重试！');
			   }
			},
			//处理网站名称列表
			handlerWebNameList(){
				this.select_list = [];
				if(this.db && this.db.length>0){
					this.db.forEach(item=>{
						var list_item = {
							value:item.name,
							url:item.url
						};
						if(this.webName.length>0){
							item.name.indexOf(this.webName)>-1 && this.select_list.push(list_item);
						}else{
							this.select_list.push(list_item);
						}
					})
				}
				//console.log(this.select_list)
			},
		},		
		async onLoad(res){
			//console.log(res)
			this.db = await this.Common.getDataBase();
			//console.log(this.db)
			this.handlerWebNameList();
			this.itemIndex = 'itemIndex' in res ? res.itemIndex:'';
			this.projectIndex ='projectIndex' in res ?  res.projectIndex:'';
			this.pwd = 'pwd' in res ? res.pwd:'';
			if(this.projectIndex!=''){
				this.select_disabled =true;
			}
		},
		watch:{
			webName(val){
				this.handlerWebNameList()
			},
			projectIndex(val){
				console.log('watch')
				if(val!='' && this.db && this.db.length ){
					let item = this.db[val];
					this.webName = item.name;
					this.url = item.url;
					this.$refs.xfl_select.selectText = this.webName;
					if(this.itemIndex!='' && item.list && item.list.length>0){
						var item1 = item.list[this.itemIndex];
						if(item1){
							this.username = item1.name;
							this.pwd = item1.pwd;
							this.desc = item1.desc;
						}
					}
				}				
			}
		}
	}
</script>

<style>
.div-form{
	width:100%;
	box-sizing: border-box;
	padding:40rpx 20rpx;
}
.div-item{
	display: flex;
	justify-content: space-between;
	align-items: center;
	width:100%;
	height:100rpx;
	box-sizing: border-box;
	margin-top:40rpx;
}
.item-left{
	width:25%;
	text-align: right;
}
.item-right{
	width:74%;
	box-sizing: border-box;
	padding:0 10rpx;
}
.uni-input{
	border:1px solid #DCDCDC;
	height:80rpx !important;
	font-size:16px !important;
	border-radius: 10rpx;
	color:rgb(96,98,102);
	padding:0 24rpx;
}
.lb-tag{
	color:red;
}
button{
	width:200rpx;
	height:80rpx;
	line-height: 80rpx;
	font-size:16px;
}
</style>
