<template>
	<view style="height: 100vh;overflow: hidden;">
		<view class="lock-tips">
			<view class="big-tips" :style="[needAuthenticate&&!pwdError?{color:'#999999'}:needAuthenticate&&pwdError?{color:'#FF0000'}:{color:''}]">{{text}}</view>
			<view class="small-tips" v-if="lockType == 2 || (lockType == 3 && !needAuthenticate)">请牢记您的密码，忘记后将无法找回</view>
		</view>

		<view class="container-lock">
			<mpvue-gesture-lock ref="mpvueGestureLock" :containerWidth="screenWidth" :cycleRadius="30" @end="onEnd" :password="password"></mpvue-gesture-lock>
		</view>
		<view class="container-confirm" v-if="showLockConfirm">
			<view class="lock-reset" @click="resetLock">重绘</view>
			<view :class="[confirmEnable?'':'disable-confirm']" @click="lockConfirm">确认</view>
		</view>
	</view>
</template>

<script>
	
	import mpvueGestureLock from '@/components/mpvueGestureLock/gestureLocker.vue';
	

	export default {
		components: {
			mpvueGestureLock
		},
		data() {
			return {
				title: "手势图案",
				password: [],
				text: '绘制你的手势图案，至少连接4个点',
				screenWidth: '', //屏幕宽度
				screenHeight: '', //屏幕高度
				showLockConfirm: false, //是否显示确认
				confirmEnable: false, //是否确认可点击
				lockType: '', //手势锁认证类型（1-解锁、2、注册、3-修改）
				serverPwd: '', //用以验证的密码
				needAuthenticate: false, //是否需要认证（解锁、修改需要和设定好的密码做认证）
				pwdError: false, //手势认证是否通过
				errorTimes: 0, //认证失败次数(限制)
				maxErrorTimes: 5, //最多可以失败几次
				backNum: 0,
			}
		},
		onBackPress(e) {
			if (this.lockType == 1) {
				this.backNum++;
				setTimeout(() => {
					this.backNum = 0;
					console.log("重置：" + this.backNum);
				}, 1500);
				console.log("backNum：" + this.backNum);
				if (this.backNum == 1) {
					uni.showToast({
						title: "再按一次退出",
						icon: 'none'
					});
				} else if (this.backNum >= 2) {
					plus.runtime.quit();
				}
				return true; //返回true禁止默认返回
			} else {
				return false;
			}
		},
		onLoad(options) {
			this.getScreenHeight();
			this.lockType = options.type;
			this.serverPwd = options.pwd;
			console.log("type：" + this.lockType + ";pwd:" + this.serverPwd);

			if (this.lockType == 1) {
				this.text = "请绘制您的手势图案";
				this.needAuthenticate = true;
				console.log("need:" + this.needAuthenticate + ";error:" + this.pwdError);
			} else if (this.lockType == 2) {
				this.text = "绘制你的手势图案，至少连接4个点";
			} else if (this.lockType == 3) {
				this.text = "请绘制您的手势图案";
				this.needAuthenticate = true;
			}
		},
		methods: {
			/* 测量屏幕高度，固定手势锁位置 */
			getScreenHeight() {
				//测量屏幕宽度（得到的是px单位）
				const deviceInfo = uni.getSystemInfoSync();
				console.log("设备信息：" + JSON.stringify(deviceInfo));
				this.screenWidth = deviceInfo.screenWidth;
				console.log("屏幕宽高：（" + this.screenWidth + ";" + this.screenHeight + ")");
			},
			onEnd(data) {
				if (this.password.length) {
					/* ***********二次认证*********** */
					if (this.lockType == 1) {
						//1、登录
						console.log("认证失败次数1：" + this.errorTimes);
						this.overFailedTimes();
					} else if (this.lockType == 2) {
						//2、注册
						this.secondDraw(data);
					} else if (this.lockType == 3) {
						//3、修改-重新设置
						this.secondDraw(data);
					}
				} else {
					/* ************首次绘制************ */
					this.password = data;
					if (this.lockType == 1) {
						//1、登录
						console.log("认证失败次数1：" + this.errorTimes);
						if (!this.overFailedTimes()) {
							//解锁
							console.log("密码：" + this.password.join(''));
							if ((this.password.join('')) == this.serverPwd) {
								this.text = '解锁成功';
								this.needAuthenticate = false;
								setTimeout(function() {
									uni.switchTab({
										url: '../index/index'
									});
								}, 500);
							} else {
								this.certificationFailed();
							}
							this.password = [];
						}
					} else if (this.lockType == 2) {
						//2、注册
						this.firstDraw();
					} else if (this.lockType == 3) {
						//3、修改密码
						if (this.needAuthenticate) {
							console.log("认证失败次数1：" + this.errorTimes);
							if (!this.overFailedTimes()) {
								//修改需要先认证
								console.log("修改-密码认证：" + this.password.join(''));
								if ((this.password.join('')) == this.serverPwd) {
									uni.showToast({
										title: "手势认证通过",
										icon: "success",
										duration: 500
									});
									this.text = '手势认证通过';
									this.pwdError = false;

									setTimeout(res => {
										this.text = '绘制你的手势图案，至少连接4个点';
										this.needAuthenticate = false;
									}, 800);
								} else {
									this.certificationFailed();
								}
								this.password = [];
							}
						} else {
							//修改密码-第一次绘制(认证通过)
							this.firstDraw();
						}
					}
				}
			},
			/* 注册、修改-第一次绘制手势 */
			firstDraw() {
				if (this.lockType == 1) {
					console.log("注册-绘制第一次");
				} else if (this.lockType == 3) {
					console.log("修改密码-重新设置第一次");
				}
				if (this.password.length < 4) {
					this.text = '至少连接4个点，请重新绘制';
					this.password = [];
				} else {
					this.text = '再次绘制图案进行确认';
					this.showLockConfirm = true;
				}
			},
			/* 注册、修改-第二次绘制手势 */
			secondDraw(pwdAgain) {
				if (this.lockType == 1) {
					console.log("注册-绘制第二次");
				} else if (this.lockType == 3) {
					console.log("修改密码-重新设置第二次");
				}

				if (this.password.join('') === pwdAgain.join('')) {
					this.text = '手势设定完成,点击确认完成设定';
					this.confirmEnable = true;
					console.log("密码：" + JSON.stringify(this.password));

					// this.password = []
				} else {
					this.text = '两次手势设定不一致'
					this.confirmEnable = false;
					this.password = []
				}
			},
			/* 检查认证错误次数 */
			overFailedTimes() {
				if (this.errorTimes > this.maxErrorTimes - 1) {
					uni.showModal({
						title: "警告",
						content: "今日认证失败超过限制次数，你的设备已被锁定！",
						showCancel: false,
						confirmText: "好哒"
					});
					this.password = [];
					return true;
				}
				return false;
			},
			/* 手势认证失败 */
			certificationFailed() {
				this.text = '手势认证未通过';
				this.pwdError = true;
				this.needAuthenticate = true;
				this.errorTimes++;
				console.log("errorTimes:" + this.errorTimes + ";maxError:" + this.maxErrorTimes + ";error：" + this.pwdError +
					";need:" + this.needAuthenticate);
			},
			/* 确认手势密码 */
			lockConfirm() {
				if (this.confirmEnable == true) {
					console.log("设定密码：" + this.password.join(''));
					// uni.showToast({
					// 	title: "手势密码设置成功" + this.password.join(''),
					// 	icon: 'none',
					// 	duration: 1000
					// });

					
					setTimeout(function() {
						uni.navigateBack({
							delta: 1
						});
					}, 500);
				} else {

				}
			},
			/* 重绘密码 */
			resetLock() {
				console.log("重绘");
				this.text = "绘制你的手势图案，至少连接4个点";
				this.password = [];
				//引入子组件文件，然后用ref给子组件一个id标识，然后通过this.$refs.组件名.组件方法;调用子组件方法
				this.$refs.mpvueGestureLock.refesh();
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.lock-tips {
		height: 25%;
		margin: 0 !important;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		justify-content: center;
	}

	.big-tips {
		font-size: 32rpx;
		color: #333333;
		text-align: center;
		font-weight: 500;
	}

	.small-tips {
		font-size: 24rpx;
		color: #999999;
		text-align: center;
		font-weight: 500;
		margin-top: 20rpx;
	}

	.container-lock {
		background-color: #FCFCFC;
	}

	.container-confirm {
		display: flex;
		width: 100%;
		height: 16%;
		position: absolute;
		bottom: 0;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		text-align: center;

		view {
			color: #666666;
			font-size: 28rpx;
			font-weight: 500;
			text-align: center;
			flex: 1;
			width: 80%;
			margin: 0 5%;
			height: 100rpx;
			line-height: 100rpx;
			border: 1px solid #F0F0F0;
			border-radius: 50rpx;
		}

		.disable-confirm {
			color: #A0A0A0;
			background-color: #F5F5F5;
		}
	}
</style>
