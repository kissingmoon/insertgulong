<template>
    <!-- <div class="tip-iframe">
        <m-iframe :url="url"></m-iframe>
    </div> -->
    
    <div class="tip-wapper">
        <!-- <a href="javascript:GetPlistUrl()">
		    <p style="text-align:center"><img src="./images/download.png" width="320" height="128"></p>
	    </a> -->
	    <!-- <a @click="GetMobileProvision" class="btn">安装完后，一键跳转，立即信任</a> -->
	<br/>
        <p style="text-align:center;font-weight:bold;color:red;font-size:180%">苹果企业包信任授权流程</p>
	<br/>
<header>
    <!-- 由于iOS9系统权限调整， -->
    <!-- 打开应用需要进入【设置>>通用>>描述文件或设备管理】，信任同名的描述文件或设备即可。 -->
    <img class="guide-img" src="./images/guide.gif" alt="">
</header>
<!-- <article>
    <h2>详细图文教程：</h2>
    <div class="title"><i>1</i><p>如果打开游戏时，出现如下图提示，<span>记住红线部分的描述文件名</span></p></div>
    <img src="./images/1.png" class="mod-img">
    <div class="title"><i>2</i><p>然后在设备中点击进入<span>【设置>>通用>>描述文件或设备管理】</span>，找到刚才同名的描述文件或设备</p></div>
    <img src="./images/2.png" class="mod-img"><img src="./images/3.png" class="mod-img">
    <div class="title"><i>3</i><p>点击文件，<span>选择【信任】</span>，然后就能正常打开游戏了</p></div>
    <img src="./images/4.png" class="mod-img">
    <a href="javascript:GetMobileProvision()" class="btn">安装完后，一键跳转，立即信任</a> 
    <a @click="GetMobileProvision" class="btn">安装完后，一键跳转，立即信任</a>
</article> -->
<footer>
    <a href="javascript:GetMobileProvision()" class="btn">安装完后，一键跳转，立即信任</a> 
</footer>
    </div>
</template>
<script>
import MIframe from 'base/m-iframe/m-iframe';
export default {
    data () {
        return {
            url:"http://192.168.8.71/iso.html"
        };
    },
    components:{
        MIframe
    },
    methods:{
        GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
            var r = window.location.search.substr(1).match(reg);
            if (r!=null) return unescape(r[2]); return '';
        },
        GetMobileProvision(){
            var id = this.GetQueryString("id");
            if(id == '1' || id == "")
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20000/20000.mobileprovision";
            }
            else if(id == '2')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/30000/30000.mobileprovision";
            }
            else if(id == '3')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/40000/40000.mobileprovision";
            }
            else if(id == '4')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/50000/50000.mobileprovision";
            }
            else if(id == '5')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/60000/60000.mobileprovision";
            }else if(id == '6')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/70000/70000.mobileprovision";
            }else if(id == '7')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/80000/80000.mobileprovision";
            }else if(id == '8')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/90000/90000.mobileprovision";
            }else if(id == '9')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20001/20001.mobileprovision";
            }else if(id == '10')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20002/20002.mobileprovision";
            }else if(id == '11')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20003/20003.mobileprovision";
            }else if(id == '12')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20004/20004.mobileprovision";
            }else if(id == '13')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20005/20005.mobileprovision";
            }else if(id == '14')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20006/20006.mobileprovision";
            }else if(id == '15')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20007/20007.mobileprovision";
            }else if(id == '16')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20008/20008.mobileprovision";
            }else if(id == '17')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20009/20009.mobileprovision";
            }else if(id == '18')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20010/20010.mobileprovision";
            }else if(id == '19')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20011/20011.mobileprovision";
            }else if(id == '20')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20012/20012.mobileprovision";
            }else if(id == '21')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20015/20015.mobileprovision";
            }else if(id == '22')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20016/20016.mobileprovision";
            }else if(id == '23')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20017/20017.mobileprovision";
            }else if(id == '24')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20018/20018.mobileprovision";
            }else if(id == '25')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20019/20019.mobileprovision";
            }else if(id == '26')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20020/20020.mobileprovision";
            }else if(id == '27')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20021/20021.mobileprovision";
            }else if(id == '28')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20022/20022.mobileprovision";
            }else if(id == '29')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20023/20023.mobileprovision";
            }else if(id == '30')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20024/20024.mobileprovision";
            }else if(id == '31')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20025/20025.mobileprovision";
            }else if(id == '32')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20026/20026.mobileprovision";
            }else if(id == '33')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20027/20027.mobileprovision";
            }else if(id == '34')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20028/20028.mobileprovision";
            }else if(id == '35')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20029/20029.mobileprovision";
            }else if(id == '36')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20030/20030.mobileprovision";
            }else if(id == '37')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20031/20031.mobileprovision";
            }else if(id == '38')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20032/20032.mobileprovision";
            }else if(id == '39')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20033/20033.mobileprovision";
            }else if(id == '40')
            {
                window.location.href = "https://qiye777.oss-cn-hangzhou.aliyuncs.com/20034/20034.mobileprovision";
            }
        }
    }
}
</script>
<style lang="scss" scoped>
// .tip-iframe{
//     position: fixed;
//     top:1.2rem;
//     bottom: 0;
//     width: 100%;
//     z-index: 102;
// }
.tip-wapper{
    position: fixed;
    top:1.2rem;
    bottom: 0;
    z-index: 101;
    -webkit-overflow-scrolling: touch; 
    overflow:scroll;
    background-color: #ffffff;
    padding-top:0.3rem; 
}
header {
            padding: 10px;
            // background-color: #ffe8dd;
            // border: 1px solid #ffd5be;
            font-size: 14px;
            color: #ff671c;
            line-height: 1.7;
            .guide-img{
                display: block;
                width: 100%;
                height: 350px;
            }
        }
        @media only screen 
        and (-webkit-min-device-pixel-ratio: 2){
            // header {border: .5px solid #ffd5be;}
        }
        article {
            padding: 10px 15px;
        }
        h2 {
            font-size: 14px;
            margin-top: 10px;
            margin-bottom: 20px;
            color: #333333;
        }
        .title {
            display: -webkit-box;
            -webkit-box-orient: horizontal;
            -webkit-box-pack: start;
        }
        .title p {
            font-size: 16px;
            color: #333333;
            -webkit-box-flex: 1;
            line-height: 1.7;
        }
        i{
            display: block;
            width: 20px;
            height: 20px;
            margin-top: 4px;
            margin-right: 6px;
            border-radius: 3em;
            font-size: 14px;
            color: #fff;
            text-align: center;
            line-height: 20px;
            background-color: #0099FF;
        }
        .title span {
            color: #FF001C;
            font-size: 16px;
            line-height: 1.7;
        }
        .mod-img {
            display: block;
            margin: 15px auto 20px auto;
            width: 90%;
        }
        .mod-img-union {
            width: 100%;
            margin: 15px auto 20px auto;
            overflow: auto;
        }
        .mod-img-union img {
            display: block;
            width: 49%;
            float: left;
        }
        .mod-img-union img:first-child {
            margin-right: 2%;
        }
        footer {
            color: #333333;
            font-size: 14px;
            padding: 10px;
            line-height: 1.7;
        }
        .btn {
            display: block;
            // position: fixed;
            // bottom: 38px;
            // left: 50%;
            // margin-left: -140px;
            background-color: #1B8DFA;
            width: 280px;
            height: 50px;
            line-height: 50px;
            margin: 0 auto; 
            text-decoration: none;
            text-align: center;
            font-size: 18px;
            color: #fff;
            border-radius: 4px;
        }
</style>
