<template>
	<!-- touchstart是JavaScript在移动端的触摸事件，.stop是vue的事件修饰符，由于移动端click事件触发是会延迟300ms，所以touchStart事件会先触发后再触发click事件。使用stop阻止事件冒泡 -->
	<div class="gesture-lock" :class="{error:error}" :style="{width: containerWidth +'px', height:containerWidth +'px'}"
	 @touchstart.stop="onTouchStart" @touchmove.stop="onTouchMove" @touchend.stop="onTouchEnd" @touchstart.stop.prevent="moveHandle">
		<!-- 9 个圆 -->
		<div v-for="(item,i) in circleArray" :key="i" class="cycle" :class="{check:item.check}" :style="{left:item.style.left,top:item.style.top,width:item.style.width,height:item.style.width}">
		</div>

		<!-- 已激活锁之间的线段 -->
		<div v-for="(item,i) in lineArray" :key="i+100" class="line" :style="{left:item.activeLeft,top:item.activeTop,width:item.activeWidth,transform:'rotate('+item.activeRotate+')'}">
		</div>

		<!-- 最后一个激活的锁与当前位置之间的线段 -->
		<div class="line" :style="{left:activeLine.activeLeft,top:activeLine.activeTop,width:activeLine.activeWidth,transform:'rotate('+activeLine.activeRotate+')'}">
		</div>
	</div>
</template>

<script>
	import GestureLock from './gestureLock';

	export default {
		name: 'index',
		props: {
			/**
			 * 容器宽度
			 */
			containerWidth: [Number, String],
			/**
			 * 圆的半径
			 */
			cycleRadius: [Number, String],
			/**
			 * 已设定的密码
			 */
			password: {
				type: Array,
				default: new Array
			},
		},
		data() {
			return {
				gestureLock: {}, // 锁对象
				circleArray: [], // 圆对象数组
				lineArray: [], // 已激活锁之间的线段
				activeLine: {}, // 最后一个激活的锁与当前位置之间的线段
				error: false
			}
		},
		methods: {
			onTouchStart(e) {
				this.gestureLock.onTouchStart(e);
				this.refesh();
				this.refeshActiveLine();
			},

			onTouchMove(e) {
				this.gestureLock.onTouchMove(e);
				this.refesh();
				this.refeshActiveLine();
			},
			onTouchEnd(e) {
				const checkPoints = this.gestureLock.onTouchEnd(e);
				console.log("抬起：" + checkPoints);
				if (checkPoints == "" || checkPoints == null) {
					//防止误触(点击了锁但没有点击在点区域内)
					return;
				} else {
					console.log("选中：" + JSON.stringify(checkPoints.join('')) + ";密码：" + JSON.stringify(this.password.join('')));
					if (!this.password.length) {
						console.log("第一次");
						this.refeshActiveLine();
						setTimeout(() => {
							this.refesh();
							this.$emit('end', checkPoints);
						}, 200);
					} else {
						if (this.password.length && checkPoints.join('') == this.password.join('')) {
							console.log("两次密码一致");
							this.refeshActiveLine();
							setTimeout(() => {
								// this.refesh();
								this.$emit('end', checkPoints);
							}, 200);
						} else {
							//两次密码不一致
							console.log("两次密码不一致");
							this.refeshActiveLine();
							this.error = true;
							setTimeout(() => {
								this.refesh();
								this.$emit('end', checkPoints);
							}, 1000);
						}
					}
				}
			},
			/* 取消上一个圈内点到当前触摸点的线段 */
			refeshActiveLine() {
				this.activeLine = this.gestureLock.getActiveLine();
			},
			/* 恢复画布状态 */
			refesh() {
				this.error = false;
				this.circleArray = this.gestureLock.getCycleArray();
				this.lineArray = this.gestureLock.getLineArray();
				// this.activeLine = this.gestureLock.getActiveLine();
			},
			/* 禁止页面滑动 */
			moveHandle(e) {
				e.preventDefault();
			}
		},
		// mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
		mounted() {
			this.gestureLock = new GestureLock(this.containerWidth, this.cycleRadius);
			this.refesh();
			this.refeshActiveLine();
		}
	}
</script>

<style scoped>
	.gesture-lock {
		margin: 0 auto;
		position: relative;
		box-sizing: border-box;
		overflow: auto;
	}

	/* 9个外圆环 */
	.gesture-lock .cycle {
		box-sizing: border-box;
		position: absolute;
		border: 0px solid #999999;
		background-color: translate;
		border-radius: 50%;
	}

	.gesture-lock .cycle::after {
		content: "";
		display: block;
		position: absolute;
		width: 15%;
		height: 15%;
		border: 1px solid #999999;
		background-color: #999999;
		border-radius: 50%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}


	.gesture-lock .cycle.check:after {
		content: "";
		display: block;
		position: absolute;
		width: 40%;
		height: 40%;
		border: 1px solid #A0A0A0;
		background-color: #A0A0A0;
		border-radius: 50%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	/* 连接线条 */
	.gesture-lock .line {
		height: 0;
		border-top: 2px solid #4CD964;
		position: absolute;
		transform-origin: left center;
	}

	/* 密码不一致 */
	.gesture-lock.error .cycle.check,
	.gesture-lock.error .cycle.check:after,
	.gesture-lock.error .line {
		border-color: #FF0000;
	}
</style>
