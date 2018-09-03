<template>
    <parcel>
        <div class="lottery">
            <div class="lottery-content">
                <!-- 头部玩法说明 -->
                <div class="lottery-title-content">
                    <div class="back" @click="judgeBack"><i class="icon-arrows-left"></i></div>
                    <div class="time-money-wrapper">
                        <!-- <div class="kind" @click="show('wfKindShow')">玩<br>法</div> -->
                        <div class="rule" @click="show('wfRuleShow')" v-if="!is28OrLhc">说<br>明</div>
                        <div class="rule" @click="setRuleParam" v-if="is28OrLhc">说<br>明</div>
                    </div>
                    <h1 class="title">
                        <p class="txt" @click="show('wfKindShow')">
                            <span class="kind">玩<br>法</span>
                            {{currentWf.name}}<i class="icon-triangle-below triangle-below"></i>
                        </p>
                    </h1>
                </div>
                <!-- 期数信息 -->
                <div class="lottery-nav border-bottom-1px">
                    <div class="nav-left border-right-1px">
                        <!-- <div class="rock-follow">
                            <p class="follow" @click="gotoPage('/descover')">大神跟单<i class="icon-triangle-below"></i></p>
                        </div> -->
                        <div class="count-down">
                            距{{lotteryInfo.show_qh}}期截止:{{drawCountTime}}
                        </div>
                        <div class="drow-tip">
                            <p>等</p>
                            <p>待</p>
                            <p>开</p>
                            <p>奖</p>
                        </div>
                    </div>
                    <div class="nav-right" @click="showDrawHistory">
                        <!-- <div class="lottery-wf">
                            当前玩法:{{currentWf.name}}
                        </div> -->
                        <div class="draw-history">
                             <!-- <p class="history" @click="getDrawHis">历史开奖记录<i class="icon-triangle-below"></i></p> -->
                             <p class="history">{{newDraw.lottery_qh}}期开奖<i class="icon-triangle-below"></i></p>
                        </div>
                        <div  class="lottery-wf">
                           <!-- {{newDraw.kj_code}} -->
                           <span :class=v.clas v-for="(v,k) in newDraw.resultList" :key="k" :style="v.bg">{{v.val}}</span>
                        </div>
                    </div>
                </div>
                <!-- 组合赔率 -->
                <div class="lottery-odds border-bottom-1px" v-if="!isShowOdds">
                    <div class="wf-name">{{currentWf.name}}</div>
                    <div class="odds">赔率:{{totalOdds}}</div>
                </div>
                <!-- 投注号码 -->
                <scroll ref="scroll" class="scroll-content" :class="{'odds-scroll': !isShowOdds,'bet-set-scroll':lotterySelectShow}" :data="numberList">
                    <bet-number 
                        ref="betnumberlist"
                        :numList="numberList"
                        :selectNumList="selectNumList"
                        :selectPosition="selectPosition"
                        @selectNum="selectNum"
                        @selectPosi="selectPosi"
                        @selectKind="selectKind"
                        >
                    </bet-number>
                </scroll>
                <!-- 倍投模式 -->
                <!-- <div v-if="!is28OrLhc" class="lottery-set">
                    <div class="multiple">
                        <p>投注</p>
                        <p class="number"><input type="tel" v-model.number="betTimes" maxlength="4" ></p>
                        <p>元</p>
                    </div>
                    <div class="unit">
                        <p>模式</p>
                        <p class="type" @click="show('modesShow')">{{betUnit[lotteryModes]}}</p>
                    </div>  
                    <div class="bonus" @click="winMoney">
                        <p>单注奖金{{showWinMoney}}元</p>
                    </div>
                </div> -->
                <!-- <div v-if="!is28OrLhc" class="lottery-bottom">
                    <div class="clear-all" @click="allClear">
                        <p>清空</p>
                    </div>
                    <div class="bet-collect">
                        <p class="bet-count">{{betCount}}注{{calculateBetMoney}}元</p>
                        <p class="balance">余额:{{account.balance || 0}}元</p>
                    </div>
                    <div class="brokerage" @click="betExamine('gdSetShow')">
                        <p class="check-box"><i class="icon-right" v-show="earnCommission"></i></p>
                        <p>赚佣金</p>
                    </div>
                    <div class="follow-num" @click="betExamine('followNumberShow')">
                        <p>追号</p>
                    </div>
                    <div class="bet-btn" @click="betExamine('betAffirmShow')">
                        <p>投注</p>
                    </div>
                </div> -->
                <!-- 元投模式 -->
                <div>
                    <div v-show="lotterySelectShow" class="background" @click="hide('lotterySelectShow')"></div>
                    <transition name="lottery-select">
                        <div v-show="lotterySelectShow" class="lottery-select-info">
                            <div class="bet-money-warpper">
                                <p class="tit">单注金额</p>
                                <p class="bet-money">
                                    <input type="tel" v-model.number="betTimes" maxlength="6" @click="show('keyboardShow')" readonly="readonly" />
                                </p>
                                <p class="unit" :class="{'on': lotteryModes == 0}" @click="changeLotteryModes(0)">元</p>
                                <p class="unit" :class="{'on': lotteryModes == 1}" @click="changeLotteryModes(1)">角</p>
                                <p class="unit" :class="{'on': lotteryModes == 2}" @click="changeLotteryModes(2)">分</p>
                            </div>
                            <div class="follow-num-brokerage">
                                <div class="count-money">
                                    <p>注数:<span class="yellow">{{betCount}}</span>注</p>
                                    <p>投注总额:<span class="yellow">{{calculateBetMoney}}</span>元</p>
                                </div>
                                <!-- <div class="brokerage" @click="betExamine('gdSetShow')">
                                     <p class="check-box"><i class="icon-right" v-show="earnCommission"></i></p> 
                                    <p>赚佣金</p>
                                </div> -->
                                <div class="follow-num" @click="betExamine('followNumberShow')">
                                    <p>追号</p>
                                </div>
                            </div>
                            <div class="win-money-warpper border-bottom-1px">
                                <div class="balance">
                                    账户余额:<span class="yellow">{{moneyToFixed}}</span>元
                                </div>
                                <div class="bonus" @click="winMoney">
                                    <p>若中奖，单注奖金<span class="yellow">{{formetWinMoney}}</span>元</p>
                                </div>
                            </div>
                            <div class="btn-wrapper">
                                <div class="close" @click="hide('lotterySelectShow')">
                                    取消
                                </div>
                                <div class="affirm" @click="selectInfo">
                                    确定
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                <!-- 底部 -->
                <div class="lottery-bottom">
                    <div class="clear-all" @click="allClear">
                        <p>清空</p>                         
                    </div>
                    <!-- 标记 添加的随机按钮 -->
                    <!-- <div class="lhc-bet-count">
                        <random-bet :wf_flag="currentWf.wf_flag" @selectRandNum='selectRandNum' @selectRandPos="selectRandPos" @selectRandObj="selectRandObj" ></random-bet>
                    </div> -->
                    <!-- 非6和28投注按钮 -->
                    <div v-if="!is28OrLhc" class="bet-btn"  @click="betExamine('lotterySelectShow')">
                        <p>投注</p>
                    </div>
                    <!-- 6和28投注按钮 -->
                    <div v-if="is28OrLhc" class="bet-btn" @click="makeBetOrder">
                        <p>投注</p>
                    </div>
                    <div class="lhc-bet-count">
                        {{betCount}}注
                    </div>
                </div>
            </div>
            <!-- 倍投模式单位选择 -->
            <!-- <div v-if="modesShow">
                <div class="background" @click="hide('modesShow')"></div>
                <div class="modes-main">
                    <div class="modes-wrapper clearfix">
                        <ul>
                            <li class="item-wrapper border-bottom-1px" @click="selectMode(0)">
                                元
                            </li>
                            <li class="item-wrapper border-bottom-1px" @click="selectMode(1)">
                                角
                            </li>
                            <li class="item-wrapper border-bottom-1px" @click="selectMode(2)">
                                分
                            </li>
                        </ul>
                    </div>
                    <div class="modes-close" @click="hide('modesShow')">
                        取消
                    </div>
                </div>
            </div> -->
            <!-- 玩法规则 -->
            <div v-if="wfRuleShow">
                <div class="background" @click="hide('wfRuleShow')"></div>
                <div class="detail">
                    <div class="wf-detail-wrapper clearfix">
                        <div class="detail-title">玩法提示</div>
                        <div class="wf-detail-main">
                            <ul>
                                <li class="item-wrapper">
                                    <p class="title">当前玩法</p>
                                    <p class="txt">{{currentWf.name}}</p>
                                </li>
                                <li class="item-wrapper">
                                    <p class="title">选号规则</p>
                                    <p class="txt">{{wfDetail.explain}}</p>
                                </li>
                                <li class="item-wrapper">
                                    <p class="title">中奖说明</p>
                                    <p class="txt">{{wfDetail.help}}</p>
                                </li>
                            </ul>
                        </div>
                        <div class="wf-detail-close">
                            <button @click="hide('wfRuleShow')"><i class="icon-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 单注奖金显示 -->
            <div v-if="winMoneyShow">
                <div class="background" @click="hide('winMoneyShow')"></div>
                <div class="detail">
                    <div class="wf-detail-wrapper clearfix">
                        <div class="detail-title">奖金提示<span style="position:absolute;right:0.2rem;top:0" @click="hide('winMoneyShow')">X</span></div>
                        <div class="wf-detail-main">
                            <ul>
                                <li class="win-money" v-for="(item,val,indx) in currentWf.wf_pl" :key="indx">
                                    {{item.pl_name}} 奖金:{{item.award_money}}
                                </li>
                            </ul>
                        </div>
                        <!-- <div class="wf-detail-close">
                            <button @click="hide('winMoneyShow')"><i class="icon-right"></i></button>
                        </div> -->
                    </div>
                </div>
            </div>
            <!-- 赚佣金设置 -->
            <div v-if="gdSetShow">
                <div class="background"></div>
                <div class="detail">
                    <div class="gd-detail-wrapper clearfix">
                        <div class="detail-title">
                            <div class="gd-rule" @click="setRuleParam">说<br>明</div>
                            <div class="gd-title">发起跟单</div>
                        </div>
                        <div class="gd-detail-main">
                            <ul>
                                <li class="item-wrapper">
                                    <div class="title">方案公开:</div>
                                    <div class="txt">
                                        <p class="open-type" :class="{'on': gdParam.kj_show_hm == 1}" @click="setKjShow(1)">
                                            <span>结束后</span>
                                            <i class="icon-right-ak right-ak"></i>
                                        </p>
                                        <p class="open-type" :class="{'on': gdParam.kj_show_hm == 0}" @click="setKjShow(0)">
                                            <span>跟单后</span>
                                            <i class="icon-right-ak right-ak"></i>
                                        </p>
                                    </div>
                                </li>
                                <li class="item-wrapper">
                                    <div class="title">薪酬设置:</div>
                                    <div class="set-num">
                                        <input type="tel" v-model.number="commissionCopy" maxlength="2" >%
                                    </div>
                                    <div class="title">预计收益:</div>
                                    <div class="set-num">
                                        <input type="tel" v-model.number="backRateCopy" maxlength="3" >倍
                                    </div>
                                </li>
                                <li class="item-wrapper">
                                    <div class="title">
                                        <p>跟单说明:</p>
                                        <!-- <p class="gd-length">0/100</p> -->
                                    </div>
                                    <div class="txt">
                                        <textarea class="gd-instructions" maxlength="100" v-model="gdParam.content" @click="show('gdContentShow')" readonly ></textarea>
                                        <p class="gd-instructions-tip">跟单说明很重要，玩家将从您的描述中来决定是否购买，请您认真填写！</p>
                                    </div>
                                </li>
                            </ul>
                            <div class="btn-wrapper">
                                <button class="cancel" @click="setEarnCommission(false)">放弃发起</button>
                                <button class="affirm"  @click="setEarnCommission(true)" :disabled="commissionCopy.length < 1 || backRateCopy < 1">确认</button>
                            </div>
                            <div class="gd-tip">
                                <p>温馨提示:您可以在我的-跟单列表界面查看跟单明细<br>发起跟单将会在您成功付款后展示</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 选择跟单标语 -->
            <div v-show="gdContentShow">
                <div class="background"></div>
                <div class="detail">
                    <div class="wf-detail-wrapper clearfix">
                        <div class="detail-title">
                            选择标语
                            <!-- <span class="title-tip">(点击选择)</span> -->
                        </div>
                        <div class="wf-detail-main">
                            <ul>
                                <li class="gd-content border-bottom-1px" v-for="(item,i) in gdContentList" @click="setGdContent(item.label)" :key="i">{{item.label}}</li>
                            </ul>
                        </div>
                        <div class="wf-detail-close">
                            <button @click="hide('gdContentShow')"><i class="icon-close"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 赚佣金提示 -->
            <div v-if="gdTipShow">
                <div class="background" @click="gdAffirm"></div>
                <div class="bet-success-detail">
                    <div class="bet-success-wrapper clearfix">
                        <div class="detail-title">提示</div>
                        <div class="bet-success-main">
                            <div class="success-tip">
                               您的跟单将在您成功投注后生效
                            </div>
                            <div class="btn-wrapper">
                                <button class="affirm" @click="gdAffirm">确认</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 投注确认 -->
            <div v-if="betAffirmShow">
                <div class="background"></div>
                <div class="detail">
                    <div class="bet-detail-wrapper clearfix">
                        <div class="detail-title">确认投注</div>
                        <div class="bet-detail-main">
                            <ul>
                                <li class="item-wrapper">
                                    <div class="title">投注号码：<span class="txt">{{betNumber}}</span></div>
                                </li>
                                <li class="item-wrapper">
                                    <div class="title">玩法：<span class="txt">{{currentWf.name}}</span></div>
                                </li>
                                <li class="item-wrapper">
                                    <div class="title">投注金额：<span class="txt">{{calculateBetMoney}}元（一注{{betTimes}}{{betUnit[lotteryModes]}}）</span></div>
                                </li>
                                <li class="item-wrapper">
                                    <div class="title">当前余额：<span class="txt">{{account.balance || 0}}元</span></div>
                                </li>
                            </ul>
                            <div class="btn-wrapper">
                                <button class="cancel"  @click="closeBetAffirm">取消</button>
                                <!-- 这里标记发送下注号码 -->
                                <button v-show="!earnCommission" class="affirm" @click="betOrder">确认</button>
                                <button v-show="earnCommission" class="affirm" @click="betGdOrder">确认</button>
                            </div>
                            <div class="gd-tip">
                                <p>温馨提示:您可以在我的-跟单列表界面查看跟单明细<br>发起跟单将会在您成功付款后展示</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 投注成功提示 -->
            <div v-if="betSuccessShow">
                <div class="background" @click="hide('betSuccessShow')"></div>
                <div class="bet-success-detail">
                    <div class="bet-success-wrapper clearfix">
                        <div class="detail-title">投注成功</div>
                        <div class="bet-success-main">
                            <div class="success-tip">
                                投注成功，好运即将到来！
                            </div>
                            <div class="btn-wrapper">
                                <button class="cancel" @click="gotoPage('/bet')">投注记录</button>
                                <button class="affirm"  @click="hide('betSuccessShow')">继续投注</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 离开提示 -->
            <div v-if="leaveTipShow">
                <div class="background" @click="hide('leaveTipShow')"></div>
                <div class="bet-success-detail">
                    <div class="bet-success-wrapper clearfix">
                        <div class="detail-title">提示</div>
                        <div class="bet-success-main">
                            <div class="success-tip">
                                退出将取消已选择的号码是否退出？
                            </div>
                            <div class="btn-wrapper">
                                <button class="cancel" @click="hide('leaveTipShow')">取消</button>
                                <button class="affirm" @click="goBack()">确定</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 金额不足提示 -->
            <div v-if="moneyLackShow">
                <div class="background" @click="hide('moneyLackShow')"></div>
                <div class="bet-success-detail">
                    <div class="bet-success-wrapper clearfix">
                        <div class="detail-title">投注失败</div>
                        <div class="bet-success-main">
                            <div class="success-tip">
                                余额不足，把握机会！
                            </div>
                            <div class="btn-wrapper">
                                <button class="cancel" @click="hide('moneyLackShow')">取消</button>
                                <button class="affirm"  @click="gotoPage('/pay')">立即充值</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 历史开奖 -->
            <draw-history v-if="drawHistoryShow" @close="hide" :data="drawHistoryList"></draw-history>
            <!-- 玩法 -->
            <wf-kind v-if="wfKindShow" :data="wfList" @close="hide" @selectWf="changeWf"></wf-kind>
            <!-- 跟单 -->
            <follow-number 
                v-if="followNumberShow" 
                :gdParam="gdParam" 
                :lotteryId="lotteryId"
                :betNumber="betNumber"
                :betCount="betCount"
                :lotteryModes="lotteryModes"
                :lotteryInfo="lotteryInfo"
                :earnCommission="earnCommission"
                :wfFlag="wfFlag"
                :betTimes="betTimes"
                :drawCountTime="drawCountTime"
                @close="hide"
                @changeNumber="changeNumber"
                @moneyPop="show"
                @betSuccess="betSuccess"
                >

            </follow-number>
            <!-- 6和28投注号码 -->
            <bet-order-list 
                v-if="betOrderListShow" 
                :lotteryId="lotteryId"
                :lotteryInfo="lotteryInfo"
                :wfFlag="wfFlag"
                :updataNumberList="updataNumberList"
                @close="hide"
                @clearBetOrderList="clearBetOrderList"
                @betSuccess="betSuccess"
                @deleteOrder="deleteOrder"
                >

            </bet-order-list >
            <!-- 6和28玩法规则 -->
            <rule-pare v-if="ruleShow"
                :ruleUrl="ruleUrl"
                :ruleTitle="ruleTitle"
                @close="hide"
            >
            </rule-pare>
            <loading v-show="loadingShow" :loadingTip="loadingTip"></loading>
            <!-- 数字键盘 -->
            <number-keyboard
                 :keyboardShow="keyboardShow"
                 :keyboardType="keyboardType"
                 :oldVal="keyOldVal"
                 :varName="keyName"
                 :lotteryModes="lotteryModes"
                 @close="hide"
                 @changeKeyNumber="changeKeyNumber"
                >
            </number-keyboard>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import {mapMutations,mapActions,mapGetters} from 'vuex';
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import Loading from 'base/loading/loading';
    import BetNumber from 'base/bet-number/bet-number';
    import numberKeyboard from 'base/number-keyboard/number-keyboard';
    import DrawHistory from 'components/lottery/draw-history';
    import WfKind from 'components/lottery/wf-kind';
    import FollowNumber from 'components/lottery/follow-number';
    import BetOrderList from 'components/lottery/bet-order-list';
    import RulePare from 'components/lottery/rule-page';
    import {httpUrl,betUnit} from 'common/js/map';
    import {BaseVM} from 'common/js/BuyCM';
    import LotteryWfDetail from 'common/js/Lottery_wf_detail';
    import * as CalcBetCount from 'common/js/CalcBetCountUtil.js';
    import {getBetNumberByBetGroupList} from 'common/js/BetNumber.js';
    import {slicer,countTime} from 'common/js/param.js';
    import randomBet from 'components/random-bet/random-bet'
    import showKjCodeByType from 'common/js/showKjCodeByType.js'

    export default {
        data() {
            return{
                tacitWf:{
                    '1':'ssc_5xdwd',
                    '3':'11x5_1m_q1zhix',
                    '6':'xglhc_tema_xuma',
                    '9':'k3_hz_hz',
                    '10':'pk10_cq1_d1',
                    '11':'xy28_qthh_hh'
                },
                isReady:false, //加载完成
                wfRuleShow:false, //玩法规则
                gdSetShow:false,  //跟单设置
                gdTipShow:false,  //跟单提示
                betAffirmShow:false,  //下注确认
                betSuccessShow:false,  //下注成功
                drawHistoryShow:false,  //开奖历史
                wfKindShow:false,  //玩法种类
                modesShow:false,  //模式选择
                lotterySelectShow:false,  //下注信息
                followNumberShow:false,  //追号页面
                betOrderListShow:false,  //六合彩下注页面
                earnCommission:false,  //是否赚佣
                isShowOdds:true,  //是否显示号码赔率
                ruleShow:false,  //是否显示规则页面
                winMoneyShow:false,  //是否显示奖金提示页面
                leaveTipShow:false,  //是否确认离开
                moneyLackShow:false,  //金额不足提示
                keyboardShow:false,  //显示数字键盘
                gdContentShow:false,  //显示跟单标语
                loadingShow:false,  //加载中
                loadingTip:'正在投注...',
                ruleTitle:'',
                ruleUrl:'',
                betUnit,
                lotteryInfo:{},
                drawCountTime:'',
                wfList:[],
                zodiac:[],
                currentWf:{},
                wfFlag:'',
                wfDetail:{},
                numberList:[],
                selectNumList:[],
                selectPosition:[],
                selectObj:{},
                updataNumberList:[],
                drawHistoryList:[],
                gdContentList:[],
                newDraw:{},
                betCount:0,
                betNumber:'',
                betTimes:2,
                lotteryModes:0,
                totalOdds:'',//赔率
                totalPlFlag:'',
                commissionCopy:1,
                backRateCopy:1,
                totalMoney:0,
                keyboardType:1, // 数字键盘类型 1金额 2倍数 3期数
                keyName:'betTimes', // 数字键盘改变名称
                keyOldVal:'2', // 键盘初始值
                gdParam:{
                    commission:1,
                    back_rate:1,
                    content:'潜心研究了这组跟单，跟我必胜！',
                    kj_show_hm:1,  //号码是否开奖展示， 1：是，0：否
                }
            }
        },
        components:{
            Parcel,
            Scroll,
            BetNumber,
            DrawHistory,
            WfKind,
            FollowNumber,
            BetOrderList,
            RulePare,
            Loading,
            numberKeyboard,
            randomBet
        },
        created() {
            this.init();
        },
        mounted(){
        },
        updated(){
            this.setTotal()
        },
        beforeDestroy(){
            clearTimeout(this.lockTimes);
            clearTimeout(this.getLockTimes);
        },
        computed: {
            //显示单注奖金
            showWinMoney(){
                if(this.currentWf.wf_pl){
                    return (this.currentWf.wf_pl[0].award_money * 1/Math.pow(10,this.lotteryModes)).toFixed(2);
                }else{
                    return "";
                }
            },
            //计算下注金额
            calculateBetMoney(){
                let mode=1/Math.pow(10,this.lotteryModes);
                let money=this.betTimes*mode*this.betCount;
                this.totalMoney = money.toFixed(2);
                return money.toFixed(2);
            },
            //计算下注金额
            formetWinMoney(){
                let money= this.showWinMoney*this.betTimes/2;
                return money.toFixed(2);
            },
            moneyToFixed(){
                if(this.account.balance){
                    let money=this.account.balance - 0;
                    return money.toFixed(2);
                }else{
                    return '0.00'
                }
            },
            ...mapGetters([
                'account',
                'user_token',
                'api_base'
            ])
        },
        methods: {
            ...mapActions([
                'getUser'
            ]),
            ...mapMutations({
                setTip:'SET_TIP',
            }),
            init(){
                this.lotteryId =this.$router.history.current.query.id;
                this.lotteryType =this.$router.history.current.query.type;
                this.is28OrLhc =this.lotteryType == '6' || this.lotteryType == '11'? true:false ;
                this.getUser();
                this.getBetWF();
                this.getZodiac();
                this.getLockTime();
                this.getDrawHis();
                this.getGdContent();
                this.initLotteryModes();
            },
            watchInit(){
                const _this=this;
                this.$watch('selectNumList',() => {
                    this.recount();
                });
                this.$watch('selectPosition',() => {
                    this.recount();
                });
                this.$watch('commissionCopy',(newVal,oldVal) => {
                    const regex = /^\d*$/;
                    if(!regex.test(newVal)) {
                        this.commissionCopy = oldVal ;
                    }
                    if(this.commissionCopy > 10){
                        this.commissionCopy =10;
                    }
                    this.gdParam.commission = this.commissionCopy;
                });
                this.$watch('backRateCopy',(newVal,oldVal) => {
                    const regex = /^\d*$/;
                    if(!regex.test(newVal)) {
                        this.backRateCopy = oldVal;
                    }
                    if(this.backRateCopy > 100){
                        this.backRateCopy =100;
                    }
                    this.gdParam.back_rate = this.backRateCopy;
                });
            },
            //根据用户余额判断投注默认的元 角 分
            initLotteryModes(){
                if(this.account.balance>=10){
                    this.lotteryModes=0;
                }
                else if(this.account.balance>=5&&this.account.balance<10){
                    this.lotteryModes=1;
                }
                else if(this.account.balance<5){
                    this.lotteryModes=2;
                }
            },
            //获取玩法
            getBetWF(){
                const api=this.is28OrLhc ? httpUrl.bet.lotteryWfLHC:httpUrl.bet.lotteryWf;
                this.$axios.postRequest(api,{lottery_id:this.lotteryId})
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.wfList=res.data;
                        this.selectTacitWf();
                        this.makeWfParam();
                    };
                });
            },
            //获取12生肖
            getZodiac(){
                this.$axios.postRequest(httpUrl.bet.zodiac)
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.zodiac=res.data;
                    };
                });
            },
            //获取玩法封单时间
            getLockTime(){
                this.$axios.postRequest(httpUrl.bet.lockTime,{lottery_id:this.lotteryId})
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.lotteryInfo=res.data;
                        this.setCountTime(res.data.lock_time.replace(/-/g,'/'));
                    };
                });
            },
            
            //倒计时功能
            setCountTime(dateStr) {
                const urlHash =this.$route.path;
                this.drawCountTime=countTime(dateStr);
                if(this.drawCountTime == "00:03:00"){
                    this.getDrawHis();
                }
                if (this.drawCountTime == "00:00:00" && urlHash == "/home/lottery") {
                    this.setTip(`${this.lotteryInfo.lottery_qh}期已封单,<br/>请在${this.lotteryInfo.next_qh}期继续投注`);
                    this.hide('betAffirmShow');
                    this.hide('gdSetShow');
                    this.hide('followNumberShow');
                    this.hide('betOrderListShow');
                    clearTimeout(this.getLockTimes);
                    this.getLockTimes = setTimeout(() => {
                        this.getLockTime();
                    },2000);
                }else if(urlHash == "/home/lottery"){
                    clearTimeout(this.lockTimes);
                    this.lockTimes=setTimeout(() => {
                        this.setCountTime(dateStr);
                    },1000);
                }
            },
            //设置默认玩法
            selectTacitWf(){
                let tacitWf=this.tacitWf[this.lotteryType];
                this.wfList.forEach((item,i) => {
                    item.wf.forEach((sub,s)=>{
                        if( sub.wf_flag == tacitWf ){
                            this.currentWf=this.wfList[i].wf[s];
                            return false;
                        }
                    });
                });
                if(Object.keys(this.currentWf).length == 0 && this.wfList.length > 0){
                    this.currentWf=this.wfList[0].wf[0];
                }
                this.wfFlag=this.currentWf.wf_flag;
            },
            //修改玩法
            changeWf(i,s){
                this.currentWf=this.wfList[i].wf[s];
                this.wfFlag=this.wfList[i].wf[s].wf_flag;
                this.makeWfParam();
                this.hide('wfKindShow');
            },
            //生成号码
            makeWfParam(){
                const lottery=this.wfFlag.split('_')[0];
                this.selectNumList=[];
                this.selectPosition=[];
                this.selectObj={};
                if(!this.is28OrLhc){
                    this.wfDetail=LotteryWfDetail[lottery].wf_class[this.wfFlag];
                }
                this.wfDetail=Object.assign({},this.wfDetail,this.currentWf);
                this.numberList=[];
                if(this.is28OrLhc){
                    const detail=BaseVM(this.wfDetail,0,true,this.zodiac);
                    this.numberList.push(detail);
                    this.selectNumList.push([]);
                }else{
                    this.wfDetail.param.titles.forEach((item,i) => {
                        const detail=BaseVM(this.wfDetail,i);
                        detail.title=item;
                        this.numberList.push(detail);
                        this.selectNumList.push([]);
                    });
                }
                this.isShowOdds=this.numberList[0].isShowOdds;
                this.setTotal();
                this.watchInit();
            },
            
            //选择号码
            selectNum(p,i,num){
                const index=this.selectNumList[p].indexOf(num);
                if(index != -1){
                    this.selectNumList[p].splice(index,1);
                    if(this.is28OrLhc){
                        delete this.selectObj[num];
                    }
                }else{
                    this.selectNumList[p].push(num);
                    if(this.is28OrLhc){
                        this.selectObj[num]=this.numberList[0].buyNumberBeanList[i];
                        console.log("看这里")
                        console.log(this.numberList[0].buyNumberBeanList[i])
                    }
                }
                this.changeTotal();

            },
            //选择位置
            selectPosi(num){
                const index=this.selectPosition.indexOf(num);
                if(index != -1){
                    this.selectPosition.splice(index,1);
                }else{
                    this.selectPosition.push(num);
                }
            },
            //根据单双大小选择号码
            selectKind(p,arr){
                this.selectNumList.splice(p,1,arr);
            },
            //倍投选择模式
            // selectMode(mode){
            //     this.lotteryModes = mode;
            //     this.hide('modesShow');
            // },
            //元投选择模式
            changeLotteryModes(mode){
                this.lotteryModes = mode;
            },
            //随机生成选择号码 随机按钮(如果存在的话)的绑定事件标记
            selectRandom(){
                console.log(this.currentWf.wf_flag)
                var _this=this;
                this.allClear()
                if(this.currentWf.wf_flag==='ssc_5xdwd'){
                   this.selectNumList=[[0],[],[],[],[]]
                   setTimeout(function(){
                       _this.selectNumList=[[1],[],[],[],[]]
                   },800)
                   setTimeout(function(){
                       _this.selectNumList=[[2],[],[],[],[]]
                   },1800)
                }
                if(this.currentWf.wf_flag==='ssc_5xzhix_fs'){            
                   this.selectNumList=[[0],[1],[2],[3],[4]]
                   setTimeout(function(){
                       _this.selectNumList=[[0,1],[2],[3],[4],[5]]
                   },800)
                   setTimeout(function(){
                       _this.selectNumList=[[0,1,2],[3],[4],[5],[6]]
                   },1800)
                }
                if(this.currentWf.wf_flag==="ssc_r4zux_12"){                    
                    this.selectPosition=[0,1,2,3,]
                    //一定要记住selectNumList的长度应该与当前玩法总共有几位的位数保持一致
                    this.selectNumList=[[0],[1,2]]
                }
            },
            selectRandNum(num){
                this.$refs.betnumberlist.clearKind()//清除大小单双的选择
                this.selectNumList=num
            },
            selectRandPos(pos,num){
                this.$refs.betnumberlist.clearKind()
                this.selectPosition=pos
                this.selectNumList=num
            },
            selectRandObj(num,obj){
                var _this=this;
                this.$refs.betnumberlist.clearKind()
                this.selectNumList=num;
                this.selectObj={};
                if(Array.isArray(obj)){
                    obj[0].map(function(v,k){
                        _this.selectObj[v.number]=v
                    })
                }
                else{
                    let objkey=num[0][0];
                    this.selectObj[objkey]=obj;
                }
                
                
            },
            //清除所有选择的号码
            allClear(){
                this.selectNumList=[];
                this.selectPosition=[];
                this.earnCommission=false;
                this.selectObj={};
                this.totalOdds='';
                this.totalPlFlag='';
                if(!this.is28OrLhc){
                    this.wfDetail.param.titles.forEach((item,i) => {
                        this.selectNumList.push([]);
                    });
                }else{
                    this.selectNumList.push([]);
                }
                this.$refs.betnumberlist.clearKind();
            },
            //设置组合赔率
            setTotal(){
                switch(this.wfFlag){
                    case "xglhc_lm_3z2":case "xglhc_lm_2zt":
                        this.totalOdds=this.currentWf.wf_pl[0].award_money+','+this.currentWf.wf_pl[1].award_money;
                        this.totalPlFlag=this.currentWf.wf_pl[0].pl_flag;
                        break;
                    case "xglhc_lm_3qz":case "xglhc_lm_2qz":case "xglhc_lm_tc":case "xglhc_lm_4qz":case "xy28_tmb3_b3":
                        this.totalOdds=this.currentWf.wf_pl[0].award_money;
                        this.totalPlFlag=this.currentWf.wf_pl[0].pl_flag
                        break;
                    default:
                        this.totalOdds='';
                        this.totalPlFlag='';
                    break;
                };
            },
            //修改组合赔率
            changeTotal(){
                switch(this.wfFlag){
                    case "xglhc_zxbz_zxbz":
                        const n=this.selectNumList[0].length-6;
                        if(n >= 0 && n <= 5){
                            this.totalOdds=this.currentWf.wf_pl[n].award_money;
                            this.totalPlFlag=this.currentWf.wf_pl[n].pl_flag;
                        }else{
                            this.totalOdds='';
                            this.totalPlFlag='';
                        }
                        break;
                    case "xglhc_hexiao_hx":
                        const m=this.selectNumList[0].length-2;
                        if(m >= 0 && m <= 9){
                            this.totalOdds=this.currentWf.wf_pl[m].award_money;
                            this.totalPlFlag=this.currentWf.wf_pl[m].pl_flag;
                        }else{
                            this.totalOdds='';
                            this.totalPlFlag='';
                        }
                        break;
                }
            },
            
            //页面跳转
            gotoPage(url){
                this.$router.push({
                    path:url
                });
            },
            // 显示历史开奖
            showDrawHistory(){
                this.show('drawHistoryShow');
                this.getDrawHis();
            },
            //获取开奖历史
            getDrawHis(){
                this.$axios.postRequest(httpUrl.descover.drawNumber,{lottery_id:this.lotteryId,page_size:20,page_no:1})
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.newDraw=res.data[0];
                        this.drawHistoryList=slicer(res.data,"kj_code",",");
                        //根据最近一期的开奖号码显示不同的颜色
                        this.newDraw.resultList=showKjCodeByType(res.data[0].kj_code,this.lotteryId)
                    };
                });
            },
            // 赚拥金设置
            setEarnCommission(b){
                this.earnCommission=b;
                this.hide('gdSetShow');
                this.hide('lotterySelectShow');
                if(b){
                    if(this.followNumberShow){
                        this.show('gdTipShow');
                    }else{
                        this.show('betAffirmShow');
                    }
                }
            },
            //赚拥金号码显示设置
            setKjShow(type){
                this.gdParam.kj_show_hm=type;
            },
            //跟单确认
            gdAffirm(){
                this.hide('gdTipShow');
            },
            //更换跟单号码
            changeNumber(){
                this.hide('followNumberShow');
                this.allClear();
            },
            
            //投注确认
            betExamine(showElm){
                if(!this.user_token){
                    this.$router.push({
                        path:'/login'
                    });
                    return;
                }
                if(this.betCount > 0){
                    if(showElm == 'lotterySelectShow'){
                        this.show(showElm);
                    }else{
                        this.hide('lotterySelectShow');
                        // 判断余额是否足够
                        const judge = this.judgeLackMoney();
                        if(judge){
                            this.show(showElm);
                        }
                    }
                }else{
                    this.setTip("请选择一组号码")
                }
            },
            // 关闭投注确认
            closeBetAffirm(){
                this.earnCommission=false;
                this.hide('betAffirmShow')
            },
            //投注设置
            selectInfo(){
                this.hide('lotterySelectShow');
                const judge = this.judgeLackMoney();
                if(judge){
                    this.show('betAffirmShow');
                };
            },
            // 判断余额是否足够
            judgeLackMoney(){
                if(parseFloat(this.totalMoney) > parseFloat(this.account.balance)){
                    this.show('moneyLackShow');
                    return false;
                }else{
                    return true;
                }
            },
            //投注
            betOrder(){
                const param={
                    lottery_id:this.lotteryId,
                    lottery_qh:this.lotteryInfo.lottery_qh,
                    wf_flag:this.wfFlag,
                    bet_number:this.betNumber,
                    by_money:this.betTimes,
                    bet_count:this.betCount,
                    lottery_modes:this.lotteryModes
                }
                this.show('loadingShow')
                this.$axios.postRequest(httpUrl.bet.betOrder,param)
                .then((res)=> {
                    this.hide('loadingShow');
                    if(res.data && !res.data.errorCode){
                        this.allClear();
                        this.getUser()
                        this.hide('betAffirmShow');
                        this.show('betSuccessShow');
                    };
                })
                .catch((err) => {
                    this.hide('loadingShow');
                });
            },
            //赚佣投注
            betGdOrder(){
                let param={
                    lottery_id:this.lotteryId,
                    wf_flag:this.wfFlag,
                    bet_number:this.betNumber,
                    bet_count:this.betCount,
                    lottery_modes:this.lotteryModes,
                    zhuihao_count_qs:1,
                    zhuihao_stop:1,
                    zhuihao_all_qh:this.lotteryInfo.lottery_qh,
                    zhuihao_all_bs_by_money:this.betTimes
                }
                param=Object.assign({},param,this.gdParam);
                this.loadingTip='正在投注...'
                this.show('loadingShow')
                this.$axios.postRequest(httpUrl.bet.betZyj,param)
                .then((res)=> {
                    this.hide('loadingShow');
                    if(res.data && !res.data.errorCode){
                        this.allClear();
                        this.getUser()
                        this.hide('betAffirmShow');
                        this.show('betSuccessShow');
                    };
                })
                .catch((err) => {
                    this.hide('loadingShow');
                });
            },
            //获取跟单标语
            getGdContent(){
                this.$axios.postRequest(httpUrl.bet.gdContent,{type:'gd_explain_type'})
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.gdContentList=res.data.data.list;
                    };
                });
            },
            //设置跟单标语
            setGdContent(txt){
                this.gdParam.content = txt;
                this.hide('gdContentShow');
            },
            //投注成功
            betSuccess(){
                if(this.is28OrLhc){
                    this.hide('betOrderListShow');
                    this.updataNumberList=[];
                }else{
                    this.hide('followNumberShow');
                }
                this.show('betSuccessShow');
                this.allClear();
            },
            //组合下注号码和计算注数
            recount(){
                this.betNumber=getBetNumberByBetGroupList(this.selectNumList,this.wfFlag,this.selectPosition);
                if(this.is28OrLhc){
                    this.betCount=this.selectNumList[0].length;
                }else{
                    const funName= this.lotteryType == 3 ? "m"+this.wfFlag : this.wfFlag;
                    try{
                        this.betCount=CalcBetCount[funName](this.betNumber);
                    }
                    catch(err){
                        this.betCount=0;
                    }
                }
            },
            //六和28投注号码生成
            makeBetOrder(){
                if(!this.user_token){
                    this.$router.push({
                        path:'/login'
                    });
                    return;
                }
                const keyLength=Object.keys(this.selectObj).length;
                const plLength=this.currentWf.wf_pl.length;
                let isTrueNumber=true;
                if(this.updataNumberList.length>=0){
                    // 号码判断
                    if (this.wfFlag=="xglhc_hexiao_hx" && (keyLength < 2 || keyLength > 11)) {
                        if (keyLength < 2) {
                            this.setTip("最少选择2个号码");
                        } else {
                            this.setTip("最多选择11个号码");
                        }
                        return;
                    } else if ((this.wfFlag=="xglhc_lm_2qz" || this.wfFlag=="xglhc_lm_2zt"
                            || this.wfFlag=="xglhc_lm_tc" || this.wfFlag=="xglhc_lxlw_2lx"
                            || this.wfFlag=="xglhc_lxlw_2lw")
                            && keyLength != 2) {
                        this.setTip("请选择2个号码");
                        return;
                    } else if ((this.wfFlag=="xglhc_lm_3z2" || this.wfFlag=="xglhc_lm_3qz"
                            || this.wfFlag=="xglhc_lxlw_3lx" || this.wfFlag=="xglhc_lxlw_3lw"
                            || this.wfFlag=="xy28_tmb3_b3")
                            && keyLength != 3) {
                        this.setTip("请选择3个号码");
                        return;
                    } else if ((this.wfFlag=="xglhc_lm_4qz" || this.wfFlag=="xglhc_lxlw_4lx"
                            || this.wfFlag=="xglhc_lxlw_4lw")
                            && keyLength != 4) {
                        this.setTip("请选择4个号码");
                        return;
                    } else if ((this.wfFlag=="xglhc_lxlw_5lx" || this.wfFlag=="xglhc_lxlw_5lw") && keyLength != 5) {
                        this.setTip("请选择5个号码");
                        return;
                    } else if (this.wfFlag=="xglhc_zxbz_zxbz" &&  (keyLength < 6 || keyLength > (5+plLength))) {
                        if (keyLength < 6) {
                            this.setTip("最少选择6个号码");
                        } else {
                            this.setTip(`最多选择${5+plLength}个号码`);
                        }
                        return;
                    }else if(keyLength == 0){
                        this.setTip("请选择一组号码");
                        return;
                    }
                }else{
                    // 号码判断
                    if (this.wfFlag=="xglhc_hexiao_hx" && (keyLength < 2 || keyLength > 11)) {
                        isTrueNumber=false;
                    } else if ((this.wfFlag=="xglhc_lm_2qz" || this.wfFlag=="xglhc_lm_2zt"
                            || this.wfFlag=="xglhc_lm_tc" || this.wfFlag=="xglhc_lxlw_2lx"
                            || this.wfFlag=="xglhc_lxlw_2lw")
                            && keyLength != 2) {
                        isTrueNumber=false;
                    } else if ((this.wfFlag=="xglhc_lm_3z2" || this.wfFlag=="xglhc_lm_3qz"
                            || this.wfFlag=="xglhc_lxlw_3lx" || this.wfFlag=="xglhc_lxlw_3lw"
                            || this.wfFlag=="xy28_tmb3_b3")
                            && keyLength != 3) {
                        isTrueNumber=false;
                    } else if ((this.wfFlag=="xglhc_lm_4qz" || this.wfFlag=="xglhc_lxlw_4lx"
                            || this.wfFlag=="xglhc_lxlw_4lw")
                            && keyLength != 4) {
                        isTrueNumber=false;
                    } else if ((this.wfFlag=="xglhc_lxlw_5lx" || this.wfFlag=="xglhc_lxlw_5lw") && keyLength != 5) {
                        isTrueNumber=false;
                    } else if (this.wfFlag=="xglhc_zxbz_zxbz" &&  (keyLength < 6 || keyLength > (5+plLength))) {
                        isTrueNumber=false;
                    }else if(keyLength == 0){
                        isTrueNumber=false;
                    }
                }
                if(isTrueNumber){
                    this.setTotal()
                    switch(this.wfFlag){
                        case "xglhc_lm_3z2":case "xglhc_lm_2zt":case "xglhc_lm_3qz":case "xglhc_lm_2qz":
                        case "xglhc_lm_tc":case "xglhc_lm_4qz":case "xglhc_zxbz_zxbz":case "xglhc_hexiao_hx":case "xy28_tmb3_b3":
                            const obj={
                                wf_flag:this.currentWf.wf_flag,
                                wf_name:this.currentWf.name,
                                bet_money:'',
                                number_str:'',
                                pl_flag:''
                            }
                            const arr = [];
                            for ( var key in this.selectObj){
                                obj.pl_flag=this.totalPlFlag;
                                arr.push(this.selectObj[key].number_str);
                            };
                            obj.number_str= this.wfFlag == "xglhc_hexiao_hx"? arr.sort().join(''):arr.sort().join(',')
                            obj.pl=this.totalOdds;
                            this.updataNumberList.push(obj);
                            break;
                        default:
                            for ( var key in this.selectObj){
                                this.updataNumberList.push(this.selectObj[key]);
                            };
                            break;
                    };
                }
                
                this.show('betOrderListShow');
                this.allClear();
            },

            //清空六或28的下注列表
            clearBetOrderList(){
                this.updataNumberList=[];
            },
            //删除六|28的下注号码
            deleteOrder(i){
                this.updataNumberList.splice(i,1);
            },
            //设置王法规则显示
            setRuleParam(){
                switch(this.lotteryType){
                    case '6':
                        this.ruleTitle="香港六合彩玩法规则";
                        this.ruleUrl=`${this.api_base}/wf-explain/lhc-wf`;
                        break;
                    case '11':
                        this.ruleTitle="28玩法规则";
                        this.ruleUrl=`${this.api_base}/wf-explain/xy28-wf`;
                        break;
                    default:
                        this.ruleTitle="跟单说明"
                        this.$axios.postRequest(httpUrl.config.urlList,{flag:'gd_helper_url'})
                        .then((res)=> {
                            if(res.data && !res.data.errorCode){
                                this.ruleUrl=res.data[0].url;
                            }
                        });
                        break;
                }
                this.show('ruleShow');
            },
            //显示奖金提示
            winMoney(){
                if(this.currentWf.wf_pl.length > 1){
                    this.show('winMoneyShow');
                }
            },
            // 清除倍数
            clearBetTimes(){
                this.betTimes ='';
            },
            //确认离开
            judgeBack(){
                if(this.is28OrLhc && this.updataNumberList.length > 0){
                    this.show('leaveTipShow');
                }else{
                    this.goBack()
                }
            },
            //返回
            goBack(){
                this.$router.back();
            },
            // 显示
            show(key){
                this[key]=true;
                // 重新计算滑动容器高度
                // clearTimeout(this.timesScroll);
                // this.timesScroll=setTimeout(()=>{
                //     if(this.$refs.scroll){
                //         this.$refs.scroll.refresh();
                //     }
                // },200);
            },
            // 隐藏
            hide(key){
                this[key]=false;
                // 重新计算滑动容器高度
                // clearTimeout(this.timesScroll);
                // this.timesScroll=setTimeout(()=>{
                //     if(this.$refs.scroll){
                //         this.$refs.scroll.refresh();
                //     }
                // },200);
            },
            changeKeyNumber(key,val){
                this.keyOldVal = val;
                this[key]=val;
                this.hide('keyboardShow');
            }

        },
        watch:{
            betTimes(newVal,oldVal){
                const regex = /^\d*$/;
                if(!regex.test(newVal)) {
                    this.betTimes = oldVal ;
                }
            }
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.lottery{
    position: fixed;
    width: 100%;
    top: 0rem;
    bottom: 0rem;
    z-index: 103;
    @include bg-image('bg-lottery-shallow');
    background-size: 0.6rem;
    .lottery-content{
        position: relative;
        width: 100%;
        height:100%;
        overflow: hidden;
        .lottery-title-content{
            position:relative;
            height:1.2rem;
            line-height: 1.2rem;
            text-align: center;
            color:#fff;
            @include bg-image('bg-lottery-title');
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center bottom;
            
            .back{
                position:absolute;
                height:1.2rem;
                line-height: 1.4rem;
                padding: 0 0.5rem 0 0.3rem;
                font-size: 0.52rem;
                font-size: $font-size-large-x;
            }
            .time-money-wrapper{
                position:absolute;
                height:1.2rem;
                line-height: 1.35rem;
                right:0;
                font-size:$font-size-small;
                padding-right: 0.4rem;
                color:#fff;
                .rule{
                    float:right;
                    height:0.9rem;
                    padding-top:0.3rem;
                    padding-right: 0.39rem;
                    padding-left: 0.2rem;
                    width:0.5rem;
                    line-height: 0.32rem;
                    @include bg-image('icon-wf-rule');
                    background-repeat: no-repeat;
                    background-size:0.4rem;
                    background-position: right center;
                }
                .kind{
                    float:right;
                    width:0.5rem;
                    height:0.9rem;
                    padding-top:0.3rem;
                    padding-right: 0.47rem;
                    padding-left: 0.2rem;
                    line-height: 0.32rem;
                    @include bg-image('icon-wf-kind');
                    background-repeat: no-repeat;
                    background-size: 0.5rem;
                    background-position: right center;
                }
            }
            .title{
                display: inline-block;
                height:1.2rem;
                line-height: 1.2rem;
                vertical-align: top;
                padding: 0 2.4rem;
                font-size: $font-size-large;
                @include no-wrap();
                text-align: center;
                .txt{
                    position: relative;
                    display: inline-block;
                    padding:0 0.1rem;
                    height: 0.66rem;
                    line-height: 0.66rem;
                    border:1px solid #fff;
                    border-radius: 0.1rem;
                    align-items: center;
                    .triangle-below{
                        color: $color-yellow;
                    }
                    .kind{
                        position: absolute;
                        left:-0.4rem;
                        height:0.66rem;
                        line-height: 0.33rem;
                        font-size: $font-size-small;
                    }
                }
            }
        }
        .lottery-nav{
            height:1.63rem;
            background-size: 0.6rem;
            @include bg-image('bg-lottery-deep');
            @include border-bottom-1px(solid,#053105);
            color:#fff;
            .nav-left{
                float: left;
                height:1.63rem;
                width:5rem;
                @include border-right-1px(solid,#053105);
                // padding-top: 0.1rem;
                overflow: hidden;
                .rock-follow{
                    height:0.7rem;
                    padding-top: 0.1rem;
                    .follow{
                        border:1px solid #24754b;
                        width:2rem;
                        height:0.6rem;
                        line-height: 0.6rem;
                        border-radius: 0.1rem;
                        text-align: center;
                        margin-left: 0.15rem;
                        vertical-align:text-bottom;
                    }
                }
                .count-down{
                    height:0.7rem;
                    line-height: 0.7rem;
                    padding-left:0.15rem;
                    text-align: center;
                    @include no-wrap();
                }
                .drow-tip{
                    height:0.7rem;
                    text-align: center;
                    p{
                        display: inline-block;
                        width:0.7rem;
                        height:0.7rem;
                        line-height: 0.7rem;
                        text-align: center;
                        border-radius: 50%;
                        background: #65A689;
                        color:#fff;
                        
                    }
                }

            }
            .nav-right{
                height:1.63rem;
                width:5rem;
                float: left;
                text-align: center;
                .lottery-wf{
                    height:0.7rem;
                    font-size: $font-size-medium;
                    line-height: 0.7rem;
                    color:$color-yellow;
                    @include no-wrap();
                    .last-draw-k3{
                        display: inline-block;
                        width: 0.7rem;
                        height: 0.7rem;
                        margin: 0 0.1rem;
                    }
                    .last-draw-11x5{
                        display: inline-block;
                        width: 0.6rem;
                        height: 0.6rem;
                        margin: 0 0.1rem;
                        border-radius: 50%;
                        border: 1px solid #7B6503;
                        line-height: 0.6rem;
                        text-align: center;
                    }
                }
                .draw-history{
                    height:0.7rem;
                    // padding-top: 0.1rem;
                    .history{
                        display: inline-block;
                        // border:1px solid #24754b;
                        // width:3rem;
                        height:0.7rem;
                        line-height: 0.7rem;
                        border-radius: 0.1rem;
                        margin-left: 0.15rem;
                        vertical-align:text-bottom;
                        text-align: center;
                    }
                }
            }
        }
        .lottery-odds{
            height:0.8rem;
            line-height: 0.8rem;
            padding:0 0.4rem;
            color:#fff;
            @include border-bottom-1px(solid,#163316);
            .wf-name{
                float: left;
            }
            .odds{
                float: right;
            }
        }
        // .lottery-set{
        //     position: absolute;
        //     height:1rem;
        //     width:100%;
        //     bottom:1.15rem;
        //     line-height: 1rem;
        //     color:#fff;
        //     background:#13432A;
        //     .multiple{
        //         height:1rem;
        //         width:2.6rem;
        //         float: left;
        //         padding-left:0.2rem;
        //         p{
        //             display: inline-block;
        //             height:0.6rem;
        //             line-height: 0.6rem;
        //             text-align: center;
        //             &.number{
        //                 width:1rem;
        //                 height:0.6rem;
        //                 border-radius: 0.1rem;
        //                 background:#64A387;
        //                 input{
        //                     width:1rem;
        //                     height:0.6rem;
        //                     background: none;
        //                     border:0;
        //                     padding:0;
        //                     margin: 0;
        //                     line-height: 0.6rem;
        //                     color:$color-yellow;
        //                     text-align: center;
        //                 }
        //             }
        //         }
        //     }
        //     .unit{
        //         float: left;
        //         width:3rem;
        //         height:1rem;
        //         text-align: center;
        //         p{
        //             display:inline-block;
        //             height:0.6rem;
        //             line-height: 0.6rem;
        //             text-align: center;
        //             &.type{
        //                 width:1rem;
        //                 height:0.6rem;
        //                 border-radius: 0.1rem;
        //                 background:#64A387;
        //                 text-align: center;
        //             }
        //         }
        //     }
        //     .bonus{
        //         float: left;
        //         height:1rem;
        //         width:4.2rem;
        //         text-align: right;
        //         p{
        //             padding-right: 0.2rem;
        //             padding-top: 0.2rem;
        //             height:0.6rem;
        //             line-height: 0.6rem;
        //             @include no-wrap();
        //         }
        //     }

        // }
        .lottery-select-info{
            position: absolute;
            height:6rem;
            width:100%;
            bottom:0;
            background:#13432A;
            z-index: 320;
            color:#fff;
            .yellow{
                color:$color-yellow;
            }
            .bet-money-warpper{
                height:0.8rem;
                padding:0.5rem 0.4rem 0;
                p{
                    float: left;
                    height:0.8rem;
                    line-height: 0.8rem;
                    margin-right: 0.32rem;
                    &.tit{
                        margin-right: 0.1rem;
                        width:1.5rem;
                        overflow: hidden;
                    }
                    &.bet-money{
                        width:3rem;
                        input{
                            height:0.8rem;
                            border: 0;
                            border-radius: 0.1rem;
                            text-align: center;
                            background: #64A387;
                            width:100%;
                            color:#fff;
                        }
                    }
                    &.unit{
                        height:0.8rem;
                        width:1.2rem;
                        text-align: center;
                        background: #64A387;
                        border-radius: 0.1rem;
                    }
                    &.on{
                        background: #F0CA30;
                    }
                    &:last-child{
                        margin-right: 0rem;
                    }
                }
            }
            .follow-num-brokerage{
                height: 1rem;
                padding: 0.5rem 0.4rem 0;
                .count-money{
                    float: left;
                    p:first-child{
                        height:0.3rem;
                        line-height: 0.3rem;
                    }
                    p:last-child{
                        height:0.7rem;
                        line-height: 1rem;
                        overflow: hidden;
                    }
                }
                .brokerage{
                    float: right;
                    width:1.3rem;
                    height:0.6rem;
                    text-align: center;
                    background:#64A387;
                    border-radius: 0.1rem;
                    padding-top:0.2rem;
                    padding-left:0.2rem;
                    p{
                        float: left;
                        line-height: 0.45rem;
                        &.check-box{
                            width:0.4rem;
                            height:0.4rem;
                            background: #fff;
                            color:$color-text;
                            border-radius: 0.07rem;
                            line-height: 0.45rem;
                        }
                    }
                }
                .follow-num{
                    height:0.8rem;
                    width:1.1rem;
                    float: right;
                    margin-right: 0.3rem;
                    p{
                        width:1.1rem;
                        height:0.8rem;
                        line-height: 0.8rem;
                        text-align: center;
                        background:#64A387;
                        border-radius: 0.1rem;
                    }
                }
            }
            .win-money-warpper{
                height:0.8rem;
                line-height: 0.8rem;
                padding:0 0.4rem 0.5rem;
                @include border-bottom-1px(solid,#65A689);
                .balance{
                    float: left;
                    height:0.8rem;
                }
                .bonus{
                    float: right;
                    height:0.8rem;
                }
            }
            .btn-wrapper{
                padding: 0.4rem;
                height:1rem;
                div{
                    float: left;
                    width:3.6rem;
                    height:1rem;
                    line-height: 1rem;
                    text-align: center;
                    background: #38bb80;
                    font-size: $font-size-large;
                    border-radius: 0.14rem;
                    &.affirm{
                        float: right;
                        color: $color-text;
                        background: #F0CA30;
                    }
                }
            }
        }
        .lottery-bottom{
            position: absolute;
            height:1.45rem;
            width:100%;
            bottom:0;
            line-height: 1.45rem;
            text-align: center;
            @include bg-image('bg-lottery-bottom');
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center top;
            color:rgb(230, 230, 230);
            .clear-all{
                height:1.15rem;
                width:1.8rem;
                float: left;
                padding:0.22rem 0 0 0.2rem;
                p{
                    width:1.8rem;
                    height:1rem;
                    line-height: 1rem;
                    text-align: center;
                    background:$color-bg-deep-gray;
                    border-radius: 0.1rem;
                }
            }
            .bet-collect{
                height:1.15rem;
                width:3.4rem;
                float: left;
                padding-top:0.14rem;
                p{
                    height:0.45rem;
                    line-height: 0.45rem;
                    text-align: left;
                    @include no-wrap();
                }
            }
            // .brokerage{
            //     float: left;
            //     width:1.7rem;
            //     height:0.52rem;
            //     text-align: center;
            //     background:$color-bg-deep-gray;
            //     border-radius: 0.1rem;
            //     margin-top:0.25rem;
            //     padding-top:0.15rem;
            //     padding-left:0.2rem;
            //     p{
            //         float: left;
            //         line-height: 0.45rem;
            //         &.check-box{
            //             width:0.4rem;
            //             height:0.4rem;
            //             background: #fff;
            //             color:$color-text;
            //             border-radius: 0.07rem;
            //             line-height: 0.45rem;
            //         }
            //     }
            // }
            // .follow-num{
            //     height:1.15rem;
            //     width:1.1rem;
            //     float: left;
            //     padding:0.25rem 0.2rem;
            //     p{
            //         width:1.1rem;
            //         height:0.67rem;
            //         line-height: 0.67rem;
            //         text-align: center;
            //         background:$color-bg-deep-gray;
            //         border-radius: 0.1rem;
            //     }
            // }
            .bet-btn{
                height:1.15rem;
                width:1.8rem;
                float: right;
                padding-top:0.22rem;
                margin-right:0.2rem;
                p{
                    width:1.8rem;
                    height:1rem;
                    line-height: 1rem;
                    text-align: center;
                    background:$color-yellow;
                    border-radius: 0.1rem;
                    color:$color-text;
                    font-size: $font-size-medium-x;
                }
            }
            .lhc-bet-count{
                display: inline-block;
                padding:0.2rem 0.3rem;
                color:#fff;
                background: rgb(13, 85, 48);
                border-radius: 0.1rem;
                line-height: 0.4rem;
            }
        }
        .scroll-content{
            height: calc(100% - 4.28rem);
            overflow: hidden;
            &.lhc-scroll{
                height: calc(100% - 4.28rem);
            }
            &.odds-scroll{
                height: calc(100% - 5.08rem);
            }
            &.bet-set-scroll{
                height: calc(100% - 8.83rem);
            }
        }
    }
    .background {
        position:fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 300;
        background:$color-bg-shade-a5;
    }
    .detail{
        position:fixed;
        top:calc((100% - 9rem) / 2);
        left:1.2rem;
        z-index:310;
        width:7.6rem;
        height:9rem;
        overflow: hidden;
        @include bg-image('bg-lottery-shallow');
        background-size: 0.6rem;
        border-radius: 0.2rem;
        border:1px solid #7B6503;
        .detail-title{
            height:1.2rem;
            @include bg-image('bg-lottery-title');
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center bottom;
            border-top-left-radius: 0.2rem;
            border-top-right-radius: 0.2rem;
            color:#fff;
            line-height: 1.2rem;
            text-align: center;
            font-size: $font-size-large;
            .title-tip{
                font-size: $font-size-small;
            }
        }
        .gd-title{
            width:4rem;
            margin: 0 auto;
        }
        .gd-rule{
            font-size: $font-size-small;
            float:right;
            height:0.9rem;
            margin-right: 0.3rem;
            padding-top:0.3rem;
            padding-right: 0.39rem;
            padding-left: 0.2rem;
            width:0.5rem;
            line-height: 0.32rem;
            @include bg-image('icon-wf-rule');
            background-repeat: no-repeat;
            background-size:0.4rem;
            background-position: right center;
        }
        .wf-detail-wrapper{
            min-height:100%;
            .wf-detail-main{
                padding:0rem 0.4rem 0.2rem;
                overflow:auto;
                height:6.2rem;
                .win-money{
                    line-height: 0.5rem;
                    color:#fff;
                    padding-top:0.2rem;
                }
                .item-wrapper{
                    height:auto;
                    overflow: hidden;
                    padding-top: 0.4rem;
                    line-height: 0.5rem;
                    p{
                        height:auto;
                        overflow: hidden;
                        line-height: 0.5rem;
                        &.title{
                            color:$color-yellow;
                        }
                        &.txt{
                            color:#fff;
                        }
                    }

                }
                .gd-content{
                    height:auto;
                    overflow: hidden;
                    line-height: 0.5rem;
                    padding: 0.34rem 0;
                    color:#fff;
                    @include no-wrap();
                    @include border-bottom-1px(solid,$color-border-num);
                }
            }
            .wf-detail-close{
                position:relative;
                margin:0 auto;
                height:1rem;
                width:1rem;
                padding-top:0.1rem;
                text-align: center;
                clear:both;
                button{
                    height:0.96rem;
                    width:0.96rem;
                    line-height: 1rem;
                    border-radius: 50%;
                    border:1px solid $color-border-num;
                    text-align: center;
                    background:none;
                    color: $color-yellow;
                    font-size: $font-size-large-x;
                    padding:0;
                    margin: 0;
                }
            }
        }
        .gd-detail-wrapper{
            min-height:100%;
            .gd-detail-main{
                padding:0.3rem 0 0 0.15rem;
                overflow:auto;
                height:7.5rem;
                .item-wrapper{
                    height:auto;
                    overflow: hidden;
                    padding-bottom: 0.2rem;
                    line-height: 0.64rem;
                    div{
                        float: left;
                        height:auto;
                        overflow: hidden;
                        line-height: 0.64rem;
                        &.title{
                            color:#fff;
                            width:1.8rem;
                        }
                        &.txt{
                            color:#fff;
                            width:5.4rem;
                        }
                        &.set-num{
                            width:1.5rem;
                            color:#fff;
                            padding-right: 0.2rem;
                            height: auto;
                            overflow: hidden;
                            input{
                                width:1rem;
                                height:0.64rem;
                                border-radius: 0.1rem;
                                line-height: 0.64rem;
                                border:0;
                                text-align: center;
                            }
                        }
                        
                        .open-type{
                            float: left;
                            position: relative;
                            width:1.92rem;
                            height:0.64rem;
                            border:1px solid $color-border-num;
                            line-height: 0.64rem;
                            text-align: center;
                            border-radius: 0.1rem;
                            overflow: hidden;
                            margin-right: 0.4rem;
                            .right-ak{
                                position: absolute;
                                width:0.57rem;
                                height:0.57rem;
                                bottom:0;
                                right:0;
                                font-size: $font-size-large-x;
                                color:$color-border-num;
                            }
                            &.on{
                                border:1px solid $color-yellow;
                                color:$color-yellow;
                                .right-ak{
                                    color:$color-yellow;
                                }
                            }
                        }
                        .gd-instructions{
                            width:5.2rem;
                            border:0;
                            border-radius: 0.1rem;
                            padding:0.1rem;
                            height:1.94rem;
                            line-height: 0.4rem;
                            font-size: $font-size-small-x;
                        }
                        .gd-instructions-tip{
                            line-height: 0.32rem;
                            font-size: $font-size-small;
                            color:#86BFA5;
                        }
                        .gd-length{
                            padding-top:1.2rem;
                            text-align: right;
                            line-height: 0.3rem;
                            font-size: $font-size-small;
                            color: #86BFA5;
                            padding-right:0.2rem;
                        }
                        
                    }
                    

                }
                .btn-wrapper{
                    height: 0.8rem;
                    padding-top: 0.2rem;
                    text-align: center;
                    width:100%;
                    .cancel{
                        height:0.8rem;
                        width:2.5rem;
                        line-height: 0.8rem;
                        text-align: center;
                        background:#38BB80;
                        color: #fff;
                        font-size: $font-size-medium-x;
                        border-radius: 0.1rem;
                        border:0;
                        padding:0;
                        margin-right: 0.8rem;
                    }
                    .affirm{
                        height:0.8rem;
                        width:2.5rem;
                        line-height: 0.8rem;
                        text-align: center;
                        background:$color-yellow;
                        color: #fff;
                        font-size: $font-size-medium-x;
                        border-radius: 0.1rem;
                        border:0;
                        padding:0;
                        &:disabled{
                            background:$color-btn-gray;
                            color: $color-text;
                        }
                    }
                }
                .gd-tip{
                    width:100%;
                    color: #fff;
                    font-size: $font-size-small-x;
                    line-height: 0.4rem;
                    padding-top:0.3rem;
                }
            }
        }
        .bet-detail-wrapper{
            min-height:100%;
            .bet-detail-main{
                padding:0.5rem 0 0 0.15rem;
                overflow:auto;
                height:7.5rem;
                ul{
                    height:4.6rem;
                    overflow-y: auto;
                    .item-wrapper{
                        height:auto;
                        overflow: hidden;
                        padding-bottom: 0.2rem;
                        line-height: 0.5rem;
                        div{
                            height:auto;
                            overflow: hidden;
                            line-height: 0.5rem;

                            &.title{
                                color:#fff;
                                padding:0 0.5rem;
                                word-wrap: break-word; 
                                .txt{
                                    color:$color-yellow;
                                }
                            }
                            &.set-num{
                                width:1.5rem;
                                color:#fff;
                                padding-right: 0.2rem;
                                height: auto;
                                overflow: hidden;
                                input{
                                    width:1rem;
                                    height:0.5rem;
                                    border-radius: 0.1rem;
                                    line-height: 0.5rem;
                                    border:0;
                                    text-align: center;
                                }
                            }
                            .gd-instructions{
                                width:5.2rem;
                                border:0;
                                border-radius: 0.1rem;
                                padding:0.1rem;
                                height:1.94rem;
                                line-height: 0.4rem;
                                font-size: $font-size-small;
                            }
                            .gd-instructions-tip{
                                line-height: 0.32rem;
                                font-size: $font-size-small;
                                color:#86BFA5;
                            }
                            .gd-length{
                                padding-top:1.2rem;
                                text-align: right;
                                line-height: 0.3rem;
                                font-size: $font-size-small;
                                color: #86BFA5;
                                padding-right:0.2rem;
                            }
                            
                            
                        }
                    }
                }
                
                .btn-wrapper{
                    height: 0.8rem;
                    padding-top: 0.2rem;
                    text-align: center;
                    width:100%;
                    .cancel{
                        height:0.8rem;
                        width:2.5rem;
                        line-height: 0.8rem;
                        text-align: center;
                        background:#38BB80;
                        color: #fff;
                        font-size: $font-size-medium-x;
                        border-radius: 0.1rem;
                        border:0;
                        padding:0;
                        margin-right: 0.8rem;
                    }
                    .affirm{
                        height:0.8rem;
                        width:2.5rem;
                        line-height: 0.8rem;
                        text-align: center;
                        background:$color-yellow;
                        color: #fff;
                        font-size: $font-size-medium-x;
                        border-radius: 0.1rem;
                        border:0;
                        padding:0;
                    }
                }
                .gd-tip{
                    width:100%;
                    color: #fff;
                    font-size: $font-size-small-x;
                    line-height: 0.4rem;
                    padding-top:0.5rem;
                }
            }
        }
    }
    .bet-success-detail{
        position:fixed;
        top:calc((100% - 5.6rem) / 2);
        left:1.2rem;
        z-index:320;
        width:7.6rem;
        height:5.6rem;
        overflow: hidden;
        @include bg-image('bg-lottery-shallow');
        background-size: 0.6rem;
        border-radius: 0.2rem;
        border:1px solid #7B6503;
        .detail-title{
            height:1.2rem;
            @include bg-image('bg-lottery-title');
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center bottom;
            border-top-left-radius: 0.2rem;
            border-top-right-radius: 0.2rem;
            color:#fff;
            line-height: 1.2rem;
            text-align: center;
            font-size: $font-size-large;
        }
        .bet-success-wrapper{
            min-height:100%;
            .bet-success-main{
                overflow:hidden;
                height:auto;
                .success-tip{
                    height:2.6rem;
                    line-height: 2.6rem;
                    text-align: center;
                    font-size: $font-size-medium-x;
                    color: #fff;
                }
                
                .btn-wrapper{
                    height: 0.8rem;
                    padding-top: 0.2rem;
                    text-align: center;
                    width:100%;
                    .cancel{
                        height:0.8rem;
                        width:2.5rem;
                        line-height: 0.8rem;
                        text-align: center;
                        background:#38BB80;
                        color: #fff;
                        font-size: $font-size-medium-x;
                        border-radius: 0.1rem;
                        border:0;
                        padding:0;
                        margin-right: 0.8rem;
                    }
                    .affirm{
                        height:0.8rem;
                        width:2.5rem;
                        line-height: 0.8rem;
                        text-align: center;
                        background:$color-yellow;
                        color: #fff;
                        font-size: $font-size-medium-x;
                        border-radius: 0.1rem;
                        border:0;
                        padding:0;
                    }
                }
            }
        }
    }
    .lottery-select-enter-active, .lottery-select-leave-active{
        transition: all 0.3s;
    }

    .lottery-select-enter, .lottery-select-leave-to{
        transform: translate3d(0, 6rem, 0);
    }
    // .modes-main{
    //     position:fixed;
    //     z-index:440;
    //     width:100%;
    //     height:auto;
    //     overflow: hidden;
    //     bottom:0;
    //     background:#fff;
    //     .modes-wrapper{
    //         height:auto;
    //         overflow: hidden;
    //         .item-wrapper{
    //             height:1.3rem;
    //             line-height: 1.3rem;
    //             overflow: hidden;
    //             padding: 0 0.3rem;
    //             text-align: center;
    //             @include border-bottom-1px(solid,$color-border-gray);
    //             font-size: $font-size-medium-x;
    //         }
    //     }
    //     .modes-close{
    //         position:relative;
    //         height:1.2rem;
    //         text-align: center;
    //         line-height: 1.2rem;
    //         font-size: $font-size-medium;
    //         color:$color-text-gray;
    //     }
    // }
    
}
</style>
