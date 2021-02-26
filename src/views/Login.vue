<template>
    <div>
        <div class="container" id="container">
            <div class="qiyinlogo">
                <img src="http://health.keyintt.com/healthhtml/img/newlogbac.png" alt="">
            </div>
            <div class="logcontent">
                <div class="realcontent">
                    <div class="clicktitle">
                        <div class="pwdlogin">
                            <div class="transborder" @click="pwdlogin()" id="pwdloginid">密码登录
                                <div class="bottomline" v-if="isPwd"></div>
                            </div>
                        </div>
                        <div class="pwdlogin">
                            <div class="transborder" @click="icodelogin()" id="icodeloginid">手机验证登录
                                <div class="bottomline" v-if="!isPwd"></div>
                            </div>
                        </div>
                    </div>
                    <div v-if="isPwd">
                        <div id="pwdrecordinput">
                            <div class="lineone">
                                <div class="linecontenspacebetween">
                                    <div class="numinput">
                                        <input type="number" id="tell" @input="isEmpty" v-model="telVal" placeholder="请输入手机号">
                                    </div>
                                </div>
                            </div>
                            <div class="linetwo">
                                <div class="linecontenspacebetween">
                                    <div class="codeinput width100">
                                        <input type="password" placeholder="请输入密码" @input="isEmpty" v-model="pwdVal" id="password" class="">
                                    </div>
                                </div>
                            </div>
                            <div class="tips">
                                <div onclick="openToast('toast2')" class="forgetpwd">忘记密码？</div>
                            </div>
                        </div>
                        <div class="registerbtn">
                            <div class="buttongrap1">
                                <button class="registerbutton1" :class="{'canlogin': !logBtn}" @click="pwdlog()" v-bind:disabled="logBtn">
                                    登录
                                </button>
                            </div>
                        </div>
                        <div class="weixinbind">
                            <div class="weixinherder">
                            <div class="weixinherderimg" @click="wxlogin()">
                                <img src="" alt="">
                            </div>
                            </div>
                            <div class="wxlogintext">微信一键登录</div>
                        </div>
                    </div>
                    <div  v-if="!isPwd">
                        <div id="recordinput">
                            <div class="lineone">
                                <div class="linecontenspacebetween">
                                    <div class="numinput">
                                        <div class="divverticalline"></div>
                                        <input id="mobile" type="number" placeholder="请输入手机号">
                                    </div>
                                </div>
                            </div>
                            <div class="linetwo">
                                <div class="linecontenspacebetween spacebetween">
                                    <div class="codeinput">
                                        <div class="divverticalline"></div>
                                        <input id="code" type="number" placeholder="请输入验证码" maxlength="6" oninput="if(value.length>6)value=value.slice(0,6)">
                                    </div>
                                    <div class="codebtn">
                                        <input type="button" id="btn" class="getcode gradientgetcodebtn" value="发送验证码" />
                                    </div>
                                </div>
                            </div>
                            <div class="tips" style="display: none" id="codeEroTip">
                                <div>*验证码输入有误，请重新输入</div>
                            </div>
                        </div>
                        <div class="registerbtn">
                            <div class="buttongrap1">
                                <button class="registerbutton1" id="loginphone" @click="codelog()" disabled>
                                    登录
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="goreg">
                        <div class="goregand">
                            —— or ——</div>
                        <div>
                            <div class="goregandtext" onclick="window.location.href=('http://health.keyintt.com/qyuser/reg.jsp')">注册</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="toast" id="toast1" style="display: none;">
            <div class="mask"></div>
            <div class="toastBac">
                <div class="toastBaccontent">
                    <div class="toastclosep" onclick="closeToast('toast1')"><img src="http://health.keyintt.com/healthhtml/img/toastclose.png" alt=""></div>
                    <div>此微信尚未绑定账号</div>
                </div>
            </div>
        </div>
        <div class="toast" id="toast2" style="display: none;">
            <div class="mask"></div>
            <div class="toastBac">
                <div class="toastBaccontent">
                    <div class="toastclosep" onclick="closeToast('toast2')"><img src="http://health.keyintt.com/healthhtml/img/toastclose.png" alt=""></div>
                    <div>忘记密码请使用验证码登陆</div>
                </div>
            </div>
        </div>
        <div class="openDia" id="tips" v-show="manyUsers">
            <div class="mask"></div>
            <div class="maskContent">
                <div class="utittle">
                    <div class="utittletext">请选择您要登录的账号</div>
                    <div class="usertel" id="chosetel">1358****2736</div>
                </div>
                <div class="float_div">
                    <div v-for="(item, index) in userList" v-bind:key="item.message">
                        <div class="everyuser">
                            <div class="firstuser" @click="changeuser(1, 3)">
                                <div :class="{ 'check': isCheckedList[index], 'checked': !isCheckedList[index]}" :id="'check2_'+(index+1)"></div>
                                <div>{{item.name}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="buttongroup">
                    <div class="confirm" onclick="confirmLogin()">确定</div>
                    <div class="cancel" onclick="closeFixed('tips')">取消</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data(){
        return {
            isPwd: true,
            telVal: "",
            pwdVal: "",
            logBtn: true,
            userList: [],
            manyUsers: false,
            isCheckedList: []
        }
    },
    mounted() {

    },
    methods: {
        pwdlogin(){
            this.isPwd = true
        },
        icodelogin(){
            this.isPwd = false
        },
        //检测是否为空
        isEmpty(){
            if(this.telVal !=="" && this.pwdVal !==""){
                this.logBtn = false;
            }else {
                this.logBtn = true;
            }
        },
        //登录提交
        pwdlog(){
            var that = this;
            this.$route
            this.axios.post('../../qyuser/newlogin_pwd.jsp', 'mobile=13814525083&password=123456'
            ,{headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
            ).then(function (response) {
                console.log(response);
                that.userList = response.data.data
                if(that.userList.length > 1){
                    that.manyUsers = true
                }
                for(var i=0; i<that.userList.length; i++){
                    if(i=0){
                        that.isCheckedList.push(true);
                    }else {
                        that.isCheckedList.push(false);
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        changeuser(num, sum){
            if(sum>=1){
                for(var i=1; i<=sum; i++){
                    if(i==num){
                        // $("#check2_" + i).removeClass("check");
                        // $("#check2_" + i).addClass("checked");
                    }else {
                        // $("#check2_" + i).removeClass("checked");
                        // $("#check2_" + i).addClass("check");
                    }
                }
            }
        }
    }
}
</script>

<style scoped>
body{
    padding-bottom: 12.5rem;
}
img{ pointer-events: none; }
a{
    color: white;
    text-decoration: none;
}
.container{
    margin: auto;
    width: 100%;
    position: relative;
}
.getcode{
    background-color: #999999;
    border-radius: 1.8rem;
    text-align: center;
    color: white;
    border: none;
    min-width: 7rem;
    margin: auto;
    height: 2.4rem;
    width: 100%;
    font-size: 1.2rem;
    padding-right: 0;
}
select{
    width: 100%;
    font-size: 1.2rem;
    border: none;
    appearance:none;
    -moz-appearance:none; /* Firefox */
    -webkit-appearance:none; /* Safari 和 Chrome */
    background-color: #ffffff;
}
input{
    border: none;
    box-sizing: border-box;
    -webkit-appearance: none;
    height: 2.5rem;
    font-size: 1.4rem;
    width: 95%;
    display: inline-block;
    vertical-align: middle;
    padding-left: 0;
}
input:focus{
    border: none;
    outline: none;
}
input::-webkit-input-placeholder {
    color: #999999;
}
.realcontent{
    width: 85%;
    margin: auto;
}
.codeinput{
    display: inline-block;
    vertical-align: middle;
    width: 67%;
}
.codebtn{
    display: inline-block;
    vertical-align: middle;
    width: 30%;
}
.numinput{
    display: inline-block;
    vertical-align: middle;
    width: 100%;
}
.lineone, .linetwo{
    padding-top: 1.5rem;
    padding-bottom: 0.2rem;
    border-bottom: 0.1rem solid #c8c8c8;
    margin-bottom: 1rem;
}
.registerbutton{
    width: 20rem;
    height: 3.5rem;
    background-color: #999999;
    border-radius: 2.4rem;
    margin: auto;
    font-size: 1.6rem;
    line-height: 3.5rem;
    color: #ffffff;
}
.registerbtn{
    text-align: center;
    padding-bottom: 2.5rem;
}
.weixinbind{
    margin-top: -1rem;
    text-align: center;
    padding-bottom: 1.5rem;
}
.weixinherder img{
    width: 5.46rem;
    border-radius: 8px;
}
.select{
    position: absolute;
    top: -0.1rem;
    color: transparent;
    background-color: transparent;
}
.select option{
    color: #333333;
}
.numinput input{
    font-size: 1.4rem;
}
.codeinput input{
    font-size: 1.4rem;
}
.qiyinlogo{
    width: 100%;
    margin: auto;
    position: absolute;
}
.qiyinlogo img{
    width: 100%;
}
.logcontent{
    top: 11.5rem;
    position: relative;
    background-color: #ffffff;
    width: 96%;
    margin: auto;
    border-radius: 0.6rem;
    padding-top: 1.5rem;
    padding-bottom: 3rem;
    -moz-box-shadow: 0rem 0.1rem 0.4rem 0.1rem #ababab;
    -webkit-box-shadow: 0rem 0.1rem 0.4rem 0.1rem #ababab;
    box-shadow: 0rem 0.1rem 0.4rem 0.1rem #ababab;
    min-height: 20rem;
}
.tips{
    font-size: 1.1rem;
    color: #ff5252;
    position: relative;
    margin-top: -0.5rem;
}
.width100{
    width: 100%;
}
.pwdlogin{
    font-size: 1.42rem;
    color: #333333;
    vertical-align: middle;
    display: inline-block;
    width: 48.5%;
    text-align: center;
}
.close{
    background-image: url(http://health.keyintt.com/healthhtml/img/close.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 1.5rem;
    height: 1.5rem;
    background-size: 1.5rem;
    float: right;
    margin-top: 0.2rem;
    margin-right: 0.2rem;
    position: absolute;
    top: 0;
    right: 0;
}
.logchecked{
    width: 1.23rem;
    height: 1.23rem;
    display: inline-block;
    vertical-align: middle;
    background-image: url(http://health.keyintt.com/healthhtml/img/logchecked.png);
    background-size: 1.23rem 1.23rem;
    background-repeat: no-repeat;
}
.logcheck{
    width: 1.23rem;
    height: 1.23rem;
    display: inline-block;
    vertical-align: middle;
    background-image: url(http://health.keyintt.com/healthhtml/img/logcheck.png);
    background-size: 1.23rem 1.23rem;
    background-repeat: no-repeat;
}
.logincheckdiv{
    display: inline-block;
    vertical-align: middle;
    font-size: 1.3rem;
    margin-right: 1rem;
}
.logincheckdiv div{
    display: inline-block;
    vertical-align: middle;
}
.logincheckbigdiv{
    margin-top: 1.5rem;
    color: #333333;
}
.forgetpwd{
    display: inline-block;
    color: #333333;
    padding-bottom: 0.2rem;
}
.namebindother{
    margin-top: 2.5rem;
}
.namebindother2{
    margin-top: 1.5rem;
}
.namebindother3{
    margin-top: 1.5rem;
}
.logincheckbigdiv{
    margin-top: 1rem;
    color: #333333;
    margin-bottom: 2.3rem;
}
.logincheckdiv{
    display: inline-block;
    vertical-align: middle;
    font-size: 1.3rem;
    margin-right: 1rem;
}
.logincheckdiv div{
    display: inline-block;
    vertical-align: middle;
}
.logchecked{
    width: 1.23rem;
    height: 1.23rem;
    display: inline-block;
    vertical-align: middle;
    background-image: url(http://health.keyintt.com/healthhtml/img/logchecked.png);
    background-size: 1.23rem 1.23rem;
    background-repeat: no-repeat;
}
.buttongrap1{
    padding-bottom: 0.8rem;
}
.registerbutton1{
    width: 88%;
    margin: auto;
    margin-top: 3.1rem;
    height: 3.415rem;
    line-height: 3.415rem;
    background-color: #c8c8c8;
    color: #999999;
    font-size: 1.69rem;
	padding: 0;
	border: none;
    outline: none; 
    
}
.registerbutton1 img{
    width: 100%;
}
.morename{
    margin-top: 2rem;
    font-size: 1.4rem;
    color: #333333;
}
.forgetname{
    color: #1392bc;
    font-size: 1.2rem;
    display: inline-block;
    vertical-align: middle;
}
.nameinputbox{
    display: inline-block;
    vertical-align: middle;
    -webkit-box-shadow: inset 0 2.5px 2px #d0cfcf;
    -moz-box-shadow: inset 0 2.5px 2px #d0cfcf;
    box-shadow: inset 0 2.5px 2px #d0cfcf;
    height: 3.2rem;
    width: 70%;
}
.nameinput{
    margin-top: 1.5rem;
    position: relative;
}
.saoptips{
    width: 100%;
    -moz-box-shadow: 0rem 0.5rem 1rem rgb(142, 142, 144);
    -webkit-box-shadow: 0rem 0.5rem 1rem rgb(142, 142, 144);
    box-shadow: 0rem 0.5rem 1rem rgb(142, 142, 144);
    border-radius: 0.8rem;
    position: absolute;
    top: 0;
    background-color: #fff;
    color: #333333;
    padding: 1rem 0.8rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
}
.closebtn{
    background-image: url(http://health.keyintt.com/healthhtml/img/close.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 1.5rem;
    height: 1.5rem;
    background-size: 1.5rem;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
}
.forgetnametext{
    margin-top: 1.5rem;
    font-size: 1.4rem;
    color: #333333;
}
.bluetext{
    color: #3cb8d6;
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
}
.saoptips{
    display: none;
}
.transborder{
    position: relative;
}
/* .blueborder{
    border-bottom: 0.4rem solid #3681ff;
} */
#icodeloginhidden{
    display: none;
}
.clicktitle{
    margin-bottom: 2rem;
}
.gradientgetcodebtn {
    background: #3581ff;
    background: -moz-linear-gradient(top, #3581ff 0%, #6fb4ff 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#3581ff), color-stop(100%,#6fb4ff));
    background: -webkit-linear-gradient(top, #3581ff 0%,#6fb4ff 100%);
    background: -o-linear-gradient(top, #3581ff 0%,#6fb4ff 100%);
    background: -ms-linear-gradient(top, #3581ff 0%,#6fb4ff 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3581ff', endColorstr='#6fb4ff',GradientType=0 );
    background: linear-gradient(to bottom, #3581ff 0%,#6fb4ff 100%);
}
.bindnamechaose{
    font-size: 1.4rem;
    color: #333333;
    margin-bottom: 1.5rem;
}
.everyuser{
    margin-bottom: 1.5rem;
}
.firstuser{
    display: inline-block;
    font-size: 1.12rem;
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    -ms-align-items: center;
    -o-align-items: center;
    align-items: center;
}
.firstuser div:last-child{
    max-width: 82%;
    display: inline-block;
    vertical-align: middle;
    margin-left: 0.4rem;
}
.checked{
    width: 1.12rem;
    height: 1.12rem;
    display: inline-block;
    vertical-align: middle;
    background-image: url('http://health.keyintt.com/healthhtml/img/bindchecked.png');
    background-size: 1.12rem 1.12rem;
    background-repeat: no-repeat;
}
.check{
    width: 1.12rem;
    height: 1.12rem;
    display: inline-block;
    vertical-align: middle;
    background-image: url('http://health.keyintt.com/healthhtml/img/bindcheck.png');
    background-size: 1.12rem 1.12rem;
    background-repeat: no-repeat;
}
#choosename{
    display: none;
    margin-top: 2.5rem;
}
.morename{
    display: none;
}
.choosename{
    margin-top: 2.5rem;
}
.openDia{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99999;
}
.openDia .mask{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0.6;
}
.openDia .contentBac{
    position: absolute;
    width: 100%;
    height: 100%;
    margin: auto;
    z-index: 99;
    display: box;              /* OLD - Android 4.4- */
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    -ms-align-items: center;
    -o-align-items: center;
    align-items: center;
    align-content: center;
    -moz-box-pack: center;
    box-pack: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -moz-justify-content: center;
    -ms-justify-content: center;
    -o-justify-content: center;
    justify-content: center;
}
.openDia .maskContent{
    width: 84%;
    height: 90%;
    margin: auto;
    background-color: #ffffff;
    border-radius: 20px;
    font-size: 1.4rem;
    position: absolute;
    border-radius: 0.8rem;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    line-height: 1.5;
    padding-bottom: 9.5rem;
    padding-top: 6.7rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -moz-box-shadow: 0.2rem 0.6rem 1.5rem #ababab;
    -webkit-box-shadow: 0.2rem 0.6rem 1.5rem #ababab;
    box-shadow: 0.2rem 0.6rem 1.5rem #ababab;
    color: #666666;
}
.showContent{
    padding-left: 1.5rem;
    padding-right: 1.5rem;
}
.dialogclose{
    width: 1.3rem;
    height: 1.3rem;
    display: inline-block;
    vertical-align: middle;
    background-image: url(http://health.keyintt.com/healthhtml/img/close.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    right: 0.4rem;
    top: 0.4rem;
}
.dialogbtn{
    margin: auto;
    margin-top: 2rem;
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -moz-box-pack: justify;
    box-pack: justify;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -moz-justify-content: space-between;
    -ms-justify-content: space-between;
    -o-justify-content: space-between;
    justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    -ms-align-items: center;
    -o-align-items: center;
    align-items: center;
    border-top: 0.1rem solid#f0f0f0;
}
.dialogbtn div{
    vertical-align: middle;
    display: inline-block;
    width: 50%;
    text-align: center;
    padding-bottom: 1rem;
    padding-top: 1rem;
}
.confirm{
    color: #ffffff;
    background-color: #3681ff;
    width: 50%;
    margin: auto;
    text-align: center;
    height: 2.82rem;
    line-height: 2.82rem;
    font-size: 1.12rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
}
.cancel{
    color: #999999;
    background-color: #c8c8c8;
    width: 50%;
    margin: auto;
    text-align: center;
    height: 2.82rem;
    line-height: 2.82rem;
    font-size: 1.12rem;
    border-radius: 0.5rem;
}
.open_title{
    font-size: 1.41rem;
    color: #333333;
    text-align: center;
    margin-bottom: 1rem;
}
.redtext{
    color: #ff0000;
}
.wxlogintext{
    color: #333333;
    font-size: 0.847rem;
    margin-top: 0.3rem;
}
.goreg{
    text-align: center;
}
.goreg div{
    color: #c8c8c8;
    font-size: 1.12rem;
}
.goreg div:last-child{
    color: #3681ff;
    font-size: 1.12rem;
}
.canlogin{
    background-color: #3681ff;
    color: #ffffff;
}
.change::-webkit-input-placeholder {
    color: red;
}
.toast{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99999;
}
.toast .mask{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.toastBac{
    position: absolute;
    width: 100%;
    height: 100%;
    margin: auto;
    z-index: 99;
}
.toastBaccontent{
    margin: auto;
    width: 78%;
    font-size: 1.4rem;
    position: absolute;
    border-radius: 0.8rem;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: #111111;
    opacity: 0.89;
    color: #ffffff;
    height: 7.86rem;
    text-align: center;
    font-size: 1.42rem;
}
.toastclosep{
    margin-top: 1rem;
    margin-bottom: 0.5rem;
}
.toastclosep img{
    width: 2.54rem;
}
.float_div{
    width: 80%;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    margin: auto;
}
.buttongroup{
    padding-top: 1.2rem;
}
.usertel{
    font-size: 1.12rem;
}
.utittle{
    width: 80%;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 2rem;
}
.bottomline{
    position: absolute;
    background-color: #3681ff;
    height: 0.47rem;
    width: 5rem;
    border-radius: 2rem;
    padding: 0;
    left: 0;
    right: 0;
    margin: auto;
    bottom: -0.7rem;
}
.weixinherderimg{
    display: inline-block;
}
.goregandtext{
    display: inline-block;
    margin: 0;  
    margin-top: 0.5rem;
}
.spacebetween{
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -moz-box-pack: justify;
    box-pack: justify;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -moz-justify-content: space-between;
    -ms-justify-content: space-between;
    -o-justify-content: space-between;
    justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-align-items: center;
    -ms-align-items: center;
    -o-align-items: center;
    align-items: center;
}
</style>

