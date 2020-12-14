<template>
	<view class="div-toast" v-show="isShow">
		<label v-html="txt"></label>
	</view>
</template>

<script>
	export default {
		props: {
			txt: {
				 type: String,
			},
			duration:{
				type:Number,
				default:500
			}
		},
		data() {
			return {
				isShow:false
			};
		},
		methods:{
			show(){
				var _this = this;
				this.isShow = true;
				setTimeout(function(){
					_this.isShow = false;
				},this.duration)
			}
		}
	}
</script>

<style>
.div-toast{
	position: fixed;
	top:50%;
	left:50%;
	transform: translate(-50%,-50%);
	z-index: 99999;
	background:#808080;
	color:#fff;
	padding:20rpx;
}
</style>
