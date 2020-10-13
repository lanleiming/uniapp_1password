<!-- 密码item选项 -->
<template>
	<view>
	<!-- 一般用法 -->
	<uni-collapse-item title="微信"  :open="true" thumb="https://ftp.bmp.ovh/imgs/2020/10/84ca10a94c162bb7.png">
		<uni-list>
			<uni-list-item title="标题文字1"></uni-list-item>
			<uni-list-item title="标题文字2" note="描述信息" ></uni-list-item>
			<uni-list-item title="标题文字3" note="描述信息1"></uni-list-item>
		</uni-list>
	</uni-collapse-item>
	<uni-collapse-item title="微信"  :open="false" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png">
		<uni-list>
			<uni-list-item title="标题文字1"></uni-list-item>
			<uni-list-item title="标题文字2" note="描述信息" ></uni-list-item>
			<uni-list-item title="标题文字3" note="描述信息1"></uni-list-item>
		</uni-list>
	</uni-collapse-item>
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				 type: [Object,Array],
			},
		},
		data() {
			return {
				items:[]
			};
		},
		mounted() {
			if(this.data){
				if(this.data instanceof Array){
					this.items = this.data;
				}else{
					this.items = [this.data];
				}
			}
		}
	}
</script>

<style>

</style>
