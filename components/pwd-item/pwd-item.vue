<!-- 密码item选项 -->
<template>
	<view>
		<uni-list >
		<!--    <uni-list-item  v-for="(item,index) in items" :showArrow="false" class="item" :title="'账号：'+item.name" >
				  <template v-slot:header>
				       asdfasdf
				  </template>
			</uni-list-item> -->
			   <uni-list-item title="aa123123">
			        <template v-slot:right>
			          垂直排列的大图模式列表， header 内容为插槽自定义的内容
			        </template>
			    </uni-list-item>
			
		</uni-list>
	

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
