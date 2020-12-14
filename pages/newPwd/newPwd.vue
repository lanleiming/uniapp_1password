<template>
	<view>
		<div class="main">
			<div @click="copyPwd()" class="div-pwd">
				<span class="pwd-txt">{{ pwd }}</span>
				<label class="lb-tag">点击复制</label>
			</div>
			<div class="div-slider">
				 <div class="slider-title">长度：</div>
				 <slider @change="sliderChange" min="6" max="22" class="slider-item" :value="pwdLength"  show-value></slider>
			</div>
			<div  @click="changeChecked('upperChecked')" class="div-item">
				 <div class="item-left">包含大写</div>
				  <div class="item-right">
					   <switch :checked="upperChecked"  />
				  </div>
			</div>
			<div  @click="changeChecked('lowerChecked')" class="div-item">
				 <div class="item-left">包含小写</div>
				  <div class="item-right">
					   <switch  :checked="lowerChecked"   />
				  </div>
			</div>
			<div  @click="changeChecked('numberChecked')" class="div-item">
				 <div class="item-left">包含数字</div>
				  <div class="item-right">
					   <switch  :checked="numberChecked"   />
				  </div>
			</div>
			<div  @click="changeChecked('specialCheced')" class="div-item">
				 <div class="item-left">包含符号</div>
				  <div class="item-right">
					   <switch  :checked="specialCheced"   />
				  </div>
			</div>
			<div class="div-action">
				 <button class="btn" @click="addUser()"  type="primary">添加账号</button>
				 <button class="btn" @click="createPwd()" type="primary">生成密码</button>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pwd:'',
				pwdLength:9,
				upperChecked:true,
				lowerChecked:true,
				numberChecked:true,
				specialCheced:true
			}
		},
		methods: {
			//复制密码
			copyPwd(){
				var that=this;
				uni.setClipboardData({
					data: this.pwd,
					success: function () {
						uni.hideToast();
						that.Common.toast('已将【密码】复制到剪贴板')
					}
				});
			},
			changeChecked(key){
				this[key] = !this[key];
			},
			sliderChange(e){
				//console.log(this)
				this.pwdLength = e.detail.value;
			},
			//生成密码
			createPwd(){
				//console.log(this.pwdLength);
				//定义每个类型的值
				var obj_values = {
					upperCaseString:'',
					lowerCaseString:'',
					numberString:'0123456789',
					specialString:'!@#$%^&*?~'
				};
				for(var i=0;i<25;i++)
				{
					obj_values.upperCaseString+= String.fromCharCode((65+i));
				}
				obj_values.lowerCaseString = obj_values.upperCaseString.toLocaleLowerCase();
				if(!this.upperChecked 
				&& !this.lowerChecked
				&& !this.numberChecked
				&&!this.specialCheced ){
					this.Common.toast('至少选择一个包含项！')
					return;
				}
				//获取每一项对应的个数
				var obj_count = [];
				if(this.upperChecked){
					obj_count.push({
						key:'upperCaseString',
						count:0
					})
				}
				if(this.lowerChecked){
					obj_count.push({
						key:'lowerCaseString',
						count:0
					})
				}
				if(this.numberChecked){
					obj_count.push({
						key:'numberString',
						count:0
					})
				}
				if(this.specialCheced){
					obj_count.push({
						key:'specialString',
						count:0
					})
				}
				for(var i=0;i<this.pwdLength;i++){
					var index = i%obj_count.length;
					obj_count[index].count+=1;
				}
				//每一项生成对应的值
				var temp_pwd = '';
				for(var i=0;i<obj_count.length;i++){
					temp_pwd += this._randomValue(obj_values[obj_count[i].key],obj_count[i].count)
				}
				this.pwd =this.Common.shuffleArray(temp_pwd.split('')).join('');
			},
			//从字符串中随机取count个
			_randomValue(value,count){
				//console.log(value,count);
				var str = '';
				for(var i=0;i<count;i++){
					str += value[this.randomNumBoth(0,value.length-1)];
				}
				return str;
			},
			//生成随机数
            randomNumBoth(Min,Max){
				var Range = Max - Min;
				var Rand = Math.random();
				var num = Min + Math.round(Rand * Range); //四舍五入
				return num;
			},
			addUser(){				
				uni.navigateTo({
				    url: '/pages/edit/edit?projectIndex=&itemIndex=&pwd='+ encodeURIComponent(this.pwd),
					success(err){
						//console.log(err)
					},
					fail(err){
						//console.log(err)
						},
				});
			}
		}
	}
</script>

<style>
.main{
	width:100%;
	box-sizing: border-box;
	padding:40rpx;
}	
.div-pwd{
	display: flex;
	justify-content: center;
	align-items: center;
	font-size:16px;
	height:120rpx;
	text-align: center;
	position: relative;
	background:rgb(241,241,241);
	border-radius:12rpx;
}
.div-pwd .lb-tag{
	position: absolute;
	right:20rpx;
	bottom:10rpx;
	font-size:12px;
	color:	#808080;
}
.div-item,.div-slider{
	margin-top:30rpx;
	background:rgb(241,241,241);
	display: flex;
	justify-content: space-between;
	align-items: center;
	width:100%;
	box-sizing: border-box;
	padding-left:20rpx;
	height:90rpx;
	border-radius: 12rpx;
}
.div-pwd:active,.div-item:active{
	background-color: #C0C0C0;
}
.slider-title{
	width:20%;
}
.slider-item{
	width:80%;
}
.div-action{
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top:40rpx;
}
.div-action .btn{
	font-size:16px;
}
</style>
