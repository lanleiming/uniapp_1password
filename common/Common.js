var Common = {
	pkgName:'uni.liuge.pwd',
	db_key :'db_key',//数据库
	lock_key:'lock_key',//锁屏密码
	isJSON(str) {
	 if (typeof str == 'string') {
			try {
				var obj=JSON.parse(str);
				if(typeof obj == 'object' && obj ){
					return true;
				}else{
					return false;
				}
			} catch(e) {
				return false;
			}
		}
	},
	copyItem(items,index,index1){
		var that =this;
		var item = items[index];
		var item1 = item.list[index1];
		var txt = '';
		txt+='网站：'+item.name+'\r\n';
		txt+='URL：'+item.url+'\r\n';
		txt+='账号：'+item1.name+'\r\n';
		txt+='密码：'+item1.pwd+'\r\n';
		txt+='备注：'+item1.desc+'\r\n';
		uni.setClipboardData({
			data: txt,
			success: function () {
				uni.hideToast();
				that.toast('已将【所有信息】复制到剪贴板');
			}
		});
	},
	toast(msg,duration){
		uni.showToast({
		    title: msg,
			icon:'none',
		    duration:duration?duration:1000
		});
	},
	//保存锁屏密码
	setLockPwd(value){
		return new Promise((resolve,reject)=>{
			uni.setStorage({
			    key: this.lock_key,
			    data: value,
			    success: function () {
			        console.log('success');
					resolve(true);
			    },
				fail:function(){
					resolve(false);
				}				
			});
		})
	},	
	//获取锁屏密码
	getLockPwd(){
		return new Promise((resolve,rejecet)=>{
			var db_value = "";
			uni.getStorage({
			    key: this.lock_key,
			    success: function (res) {
			       db_value = res.data;
			    },
				complete:function(){
					resolve(db_value);
				}
			});
		})
	},
	//导出数据库
	exportDB(val){
		return new Promise((resolve,reject)=>{
			var that = this;
			plus.io.requestFileSystem(plus.io.PUBLIC_DOCUMENTS, function(success) {
				success.root.getFile('export.txt',
					{       
						create: true
					},
					function(fileEntry) {
						var Path = fileEntry.toURL(); //获取当前文件的路径
						//console.log(Path, '当前路径');
						fileEntry.createWriter(
								function(data) {   //对文件进行写入操作
									data.write(val);
									//console.log('写入成功')
									resolve(true)
								}, 
								function(e) {
									console.log('写入失败')
									reject(false)
								}
							)
							//console.log('创建了一个新的文件')
						}
				)
				   //console.log('我已经进入了系统目录下')
			}, function(e) {
				//console.log('我是调用失败的回调')   //失败的回调
				reject(false)
			})
		})
	},
	//导入数据库
	importDB(){
		return new Promise((resolve,reject)=>{
			plus.io.requestFileSystem(plus.io.PUBLIC_DOCUMENTS, function(fobject){
				// fs.root是根目录操作对象DirectoryEntry
				fobject.root.getFile('import.txt',{create:false}, function(fileEntry){
					fileEntry.file( function(file){
						var fileReader = new plus.io.FileReader();
						fileReader.readAsText(file, 'utf-8');
						fileReader.onloadend = function(e) {
							resolve(e.target.result)
						}
					} );
				},
			     function(err){
					resolve(false);
				 }
				);
			});
		})
	},
	//检测导入的数据，格式是否正确
	checkDB(txt){
		if(this.isJSON(txt)){
			var obj = JSON.parse(txt);
			//检测具体的格式
			if(obj instanceof Array){
				for(var i=0;i<obj.length;i++){
					var item = obj[i];
					if('name' in item && 'url' in item && 'list' in item ){
						
					}else{
						return false;
					}
				}
				return true;
			}
		}
		return false;
	},
	//打乱数组
	shuffleArray(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
		return array;
	},
	//获取数据库
	getDataBase:function(){
		return new Promise((resolve,rejecet)=>{
			var db_value = [];
			uni.getStorage({
			    key: this.db_key,
			    success: function (res) {
			       db_value = res.data;
			    },
				complete:function(){
					resolve(db_value);
				}
			});
		})
	},
	//保存数据库
	setDataBase:function(value){
		return new Promise((resolve,reject)=>{
			uni.setStorage({
			    key: this.db_key,
			    data: value,
			    success: function () {
			        console.log('success');
					resolve(true);
			    },
				fail:function(){
					resolve(false);
				}				
			});
		})
	}	
}

export default {Common};