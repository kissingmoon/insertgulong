export const httpUrl = {
    home:{
        sliderImg: '/ad/image-list',
        notice: '/ad/notice',
        gift: '/v2/gc/syad-image',
        lottery:'/v2/gc/get-cp-type',
        rank:'/v2/user-info/get-user-rank',
        betWin:'/v2/gc/betwin-notice',
        messageCount:'/ad/message-not-read',
        qiandao:'/v2/activity/user-sign',
        xrkh:'/v2/yhhd/open-gold'
    },
    account:{
        generatorCode:'/config/generator-code',
        register:'/user/register',
        login:'/user/login'
    },
    info:{
        user:'/user/user-info',
        editNick:'/user/edit-nickname',
        balance:'/user-info/withdraw-cash',
        isNeedCode:'/user-info/isNeedCode',
        coin:'/user/coin-info',
        bet:'/bet/bet-list',
        betDetail:'/bet/bet-info',
        followMyJoin:'/v2/gd-dsb/get-myjoin-gd',
        followMy:'/v2/gd-dsb/get-my-gd',
        followDetail:'/v2/gd-dsb/get-gd-detail',
        attention:'/v2/gd-dsb/my-gz',
        attentionDatail:'/v2/gd-dsb/get-others-gd',
        setAttention:'/v2/gd-dsb/gz',
        editLoginPassword:'/user/edit-passwd',
        editBankPassword:'/user/edit-bank-passwd',
        setBankPassword:'/user/set-bank-passwd',
        bindBank:'/user/bind-bank',
        bankInfo:'/user/bank-info',
        bankList:'/config/bank-list',
        userImg:'/user/edit-user-image-front',
        flowType:'/v2/sys-config/get-flow-type',
        bindPhone:'/user/bind-phone',
        listPhoto:'/user/getListPhoto',
        userImage:'/user/set-user-image',
        isAgent:'/userAgentInfo/isAgent',
        applyAgent :'/userAgentInfo/applyAgent',
        orderByAgent:'/userAgentInfo/findListOrderByAgent',
        agentDetail:'/userAgentInfo/userAgentDetail',
        getColor:'/v5/gc/getColorConfig',
        levelInfo:'/v7/level/user/info',
        rewardHistory:'/v7/level/user/receive/history',
        levelIntro:'/v7/level/user/favourable',
        getGift:{
            upgradeGift:"/v7/level/upgrade/gift",
            weeklyGift:"/v7/level/weekly/gift",
            monthlyGift:"/v7/level/monthly/gift"
        }
    },
    discount:{
        activity:'/v2/activity/get-activity'
    },
    lottery:{
        addType:'/v5/gc/addUserLottery',     //  新增彩种
        delType:'/v5/gc/removeUserLottery',     //  删除彩种
        getType:'/v5/gc/getUserLottery',     //  获取用户添加的彩种
        getTypeList:'/v5/gc/get-cp-type',     //  获取彩种列表
        getRoomList:'/v5/room/getRoomList',//获取房间模式的房间
        bypoint:'/v7/gc/cz-wf-bypoint',
        lhc28Bypoint:'/v7/gc/cz-wf-lhc28-bypoint'
    },
    descover:{
        rank:'/v2/gd-dsb/get-dsb-rank',
        order:'/v2/gd-dsb/get-all-gd',
        draw:'/cp/kj-trend',
        drawNumber:'/cp/kj-trend-history',
        winMoney:'/cp/accumulated-winning',
        betGd:'/v2/bet/bet-gd'
    },
    bet:{
        lotteryWf:'/gc/cz-wf',
        lotteryQh:'/gc/lottery-qh',
        lotteryWfLHC:'/gc/cz-wf-lhc28',
        lockTime:'/gc/cp-lock-time',
        zodiac:'/gc/sx-lhc',
        // betOrder:'/bet/bet-order',
        betOrder:'/bet/bet-order-by-money',
        // betOrderZh:'/v2/bet/bet-order-zh',
        betOrderZh:'/v2/bet/bet-order-zh-by-money',
        // betZyj:'/v2/bet/bet-zyj',
        betZyj:'/v2/bet/bet-zyj-by-money',
        betLHC28:'/bet/bet-order-lhc28',
        subLotteryLocktime:'/v2/gc/sub-lottery-locktime',
        cpLocktime:'/gc/cp-lock-time',
        undoOrder:'/v2/bet/undo-order',
        gdContent:'/v2/gd-dsb/findGdExplainTypeList',
        notice:'/v2/gc/betwin-notice'
    },
    config:{
        urlList:'/config/url-list',
        message:'/ad/message',
        messageHandle:'/ad/message-handle',
        isReceived:'/v2/activity/today-is-received',
        xrkhIsOK:'/v2/yhhd/open-gold-isok',
        geetestCode:'/config/geetest-code',
        sendCode:'/user/sendCode',
        getRecomemendCpType:'/v5/gc/getRecommendCpType',
        getJumpConfig:'/v5/jumpConfig/getJumpConfig',
        // webSocket:'ws://192.168.9.42:8084/websocket',
        // webSocket:'ws://192.168.8.105:8080/websocket',
        // webSocket:'ws://test.weinisi01.com:8090/jeeplus/websocket',
        // webSocket:'ws://weinisi01.com/api/websocket',
        webSocket:'wss://www.xlfdapi.com/websocket',
        baseUrl:'/api',
        // baseUrl:'/test'
        // baseUrl:'/roger'
    },
    pay:{
        chargeUrl:'/v2/app-charge-url/get-charge-url',
        getPayMethod:'/v2/yhhd/user-charge/get-com-pay-method',
        getGateFlag:'/v2/yhhd/user-charge/get-gate-flag',
        getCompayList:'/v2/yhhd/user-charge/get-com-pay-list',
        toChargeNew:'/v2/yhhd/user-charge/to-charge-new',
        compaySubmit:'/v2/yhhd/user-charge/com-pay-submit',
        getpayTotal:'/v2/yhhd/user-charge/get-pay-type',
    },
    agency:{
        reportReview:"/v7/agt/reportReview",
        agentOrDetail:'/v7/agt/agentOrCustomerDetail',
        selfRebate:'/v7/agt/selfRebate',
        inviteCode:'/v7/agt/inviteCode',
        inviteCodeList:'/v7/agt/inviteCodeList',
        deleteInviteCode:'/v7/agt/deleteInviteCode',
        agentOrCustomerDetail:'/v7/agt/agentOrCustomerDetail',
        subReport:"/v7/agt/priorReportReview",
        getAgentOrders:"/v7/agt/agentLotteryOrders",
        getMoneyFlow:"/v7/agt/moneyFlow"
    }
};

// export const serviceUrl = 'https://messenger.providesupport.net/messenger/11s3h541dm5cv1tjkmwtx1vewz.html'
export const serviceUrl = 'https://www.xlfd.com/static/xlfd/kefu.html'
// export const serviceUrl = 'http://192.168.8.71/kefu-online.html'


export const lotteryName ={
    'cqssc':'重庆时时彩',
    'jxssc':'江西时时彩',
    'tjssc':'天津时时彩',
    'xjssc':'新疆时时彩',
    'xssc':'新时时彩',
    'ffc':'分分彩',
    'wfc':'五分彩',
    'jnd3d5fc':'加拿大3.5分彩',
    'tw5fc':'台湾5分彩',
    'els1d5fc':'俄罗斯1.5分彩',
    'xxl45mc':'新西兰45秒彩',
    'fc3d':'福彩3D',
    'jx11x5':'江西11选5',
    'cq11x5':'重庆11选5',
    'ah11x5':'安徽11选5',
    'sd11x5':'山东11选5',
    'gd11x5':'广东11选5',
    'tjklsf':'天津快乐十分',
    'gdklsf':'广东快乐十分',
    'cqklsf':'重庆快乐十分',
    'bjkl8':'北京快乐8',
    'xjpkl8':'新加坡快乐8',
    'jndkl8':'加拿大快乐8',
    'xglhc':'香港六合彩',
    'jsk3':'江苏快3',
    'ahk3':'安徽快3',
    'jlk3':'吉林快3',
    'pk10':'pk拾',
    'hg28':'韩国28',
    'jnd28':'加拿大28',
    'tw28':'台湾28',
    'bj28':'北京28'
};

export const betUnit = {
    0:'元',
    1:'角',
    2:'分',
};

export const betType = {
    '0':'未开奖',
    '1':'未中奖',
    '2':'撤销',
    '3':'中奖',
    '4':'订单异常',
};

export const billType ={
    '01':'下注',
    '02':'中奖',
    '03':'反水',
    '04':'撤单',
    '05':'充值',
    '06':'提款',
    '20':'活动奖励'
};

export const cashType ={
    '1':'提现成功',
    '2':'提现失败',
    '3':'审核中'
};

export const rechargeType ={
    '1':'已支付',
    '2':'支付失败',
    '3':'未支付'
};

export const activityKind ={
    '00':'所有活动',
    '01':'限时优惠',
    '02':'免费活动',
    '03':'VIP专享'
};

export const waveColor ={
    '红波':['01','02','07','08','12','13','18','19','23','24','29','30','34','35','40','45','46'],
    '绿波':['05','06','11','16','17','21','22','27','28','32','33','38','39','43','44','49'],
    '蓝波':['03','04','09','10','14','15','20','25','26','31','36','37','41','42','47','48']
};
export const waveColor28 ={
    '红波':['01','04','07','10','16','19','22','25'],
    '绿波':['02','05','08','11','17','20','23','26'],
    '蓝波':['03','06','09','12','15','18','21','24']
};

export const fiveElement ={
    '金':['03','04','17','18','25','26','33','34','47','48'],
    '木':['07','08','15','16','29','30','37','38','45','46'],
    '水':['05','06','13','14','21','22','35','36','43','44'],
    '火':['01','02','09','10','23','24','31','32','39','40'],
    '土':['11','12','19','20','27','28','41','42','49']
};
export const pk10Clolr ={
    '01':"#E6E300",
    '02':"#0A87ED",
    '03':"#4C4C4C",
    '04':"#FF7300",
    '05':"#1AE1E2",
    '06':"#5435F4",
    '07':"#C1C2C4",
    '08':"#FE2703",
    '09':"#83120E",
    '10':"#09C105"
}

export const headerConfig = {
    '/home':{
        title:'小李飞刀',
        service:true,
        message:true,
        bgImg:true
    },
    '/pay':{
        title:'充值',
        service:true,
        rechargeTip:true
    },
    '/pay/tip':{
        title:'充值提醒',
        back:true
    },
    '/descover':{
        title:'精彩发现',
        service:true,
        followExplain:true
    },
    '/descover/detail':{
        title:'跟单详情',
        back:true
    },
    '/descover/explain':{
        title:'跟单说明',
        back:true
    },
    '/descover/ds-detail':{
        title:'大神详情',
        back:true
    },
    '/descover/ds-detail/detail':{
        title:'跟单详情',
        back:true
    },
    '/discount':{
        title:'优惠活动',
        service:true,
        message:true
    },
    '/discount/activity':{
        title:'活动详情',
        back:true
    },
    '/home/activity':{
        title:'活动详情',
        back:true
    },
    '/home/addCaiType':{
        title:'添加彩种',
        back:true
    },
    '/draw':{
        title:'开奖信息',
        back:true,
    },
    '/draw/number':{
        title:'开奖历史',
        back:true
    },
    '/info':{
        title:'个人中心',
        service:true,
        message:true
    },
    '/register':{
        title:'用户注册',
        back:true
    },
    '/login':{
        title:'用户登录',
        back:true
    },
    
    '/message':{
        title:'通知',
        back:true
    },
    '/info/balance':{
        title:'提现',
        back:true
    },
    '/info/bill':{
        title:'账户明细',
        back:true,
        time:true,
        moneyType:true
    },
    '/bet':{
        title:'投注记录',
        back:true,
        time:true,
        downDatil:true
    },
    '/bet/detail':{
        title:'投注详情',
        back:true
    },
    '/recharge':{
        title:'充值记录',
        back:true,
        time:true
    },
    '/info/cash':{
        title:'提现记录',
        back:true,
        time:true
    },
    '/crunchies':{
        title:'大神榜',
        back:true
    },
    '/crunchies/detail':{
        title:'大神详情',
        back:true
    },
    '/crunchies/detail/detail':{
        title:'跟单详情',
        back:true
    },
    '/follow':{
        title:'我的跟单',
        back:true
    },
    '/follow/detail':{
        title:'跟单详情',
        back:true
    },
    '/attention':{
        title:'我的关注',
        back:true
    },
    '/attention/detail':{
        title:'关注详情',
        back:true
    },
    '/attention/detail/detail':{
        title:'跟单详情',
        back:true
    },
    '/info/agency':{
        title:'我的代理',
        back:true
    },
    '/info/agency/report':{
        title:'报表详情',
        back:true,
        search:true
    },
    '/info/safety':{
        title:'安全中心',
        back:true
    },
    '/info/safety/edit-password':{
        title:'修改密码',
        back:true
    },
    '/info/safety/bank':{
        title:'银行卡信息',
        back:true
    },
    '/info/safety/set-password':{
        title:'提款密码',
        back:true
    },
    '/info/information':{
        title:'个人信息',
        back:true
    },
    '/info/information/nick':{
        title:'昵称修改',
        back:true
    },
    '/service':{
        title:'客服中心',
        back:true
    },
    '/protocol':{
        title:'注册协议',
        back:true
    },
    '/info/information/portrait':{
        title:'设置头像',
        back:true
    },
    '/home/betwin':{
        title:'今日中奖公告',
        back:true
    },
    '/goucaidating':{
        title:'购彩大厅',
        service:true,
        message:true
    },
    '/addType':{
        title:'添加彩种',
        back:true
    },
    '/rebate':{
        title:'回水规则',
        back:true
    },
    '/betroom': {
        title:'',
        back:true
    },
    '/download': {
        title:'APP下载',
        back:true
    },
    '/agency': {
        title:'代理中心',
        back:true
    },
    '/agency/instruction': {
        title:'代理说明',
        back:true
    },
    '/agency/agencyReport': {
        title:'代理报表',
        back:true,
        agencyFilter:true,
        filterConfig:{
            name:['今天','昨天','本月','上月']
        },
        currentIndx:0
    },
    '/agency/subReport': {
        title:'下级报表',
        back:true,
        agencyFilter:true,
        filterConfig:{
            name:['今天','昨天','本月','上月']
        },
        currentIndx:0
    },
    '/agency/memberManger':{
        title:'会员管理',
        back:true,
    },
    '/agency/betDetail':{
        title:'投注明细',
        back:true,
        agencyFilter:true,
        filterConfig:{
            name:['今天','昨天','本月','上月']
        },
        currentIndx:0
    },
    '/agency/tradDetail':{
        title:'交易明细',
        back:true,
        agencyFilter:true,
        filterConfig:{
            name:['今天','昨天','七天']
        },
        currentIndx:0
    },
    '/agency/subReg':{
        title:'下级开户',
        back:true,
    },
    '/iosTip': {
        title:'APP下载',
        back:true
    },
    '/userLevel': {
        title:'我的等级',
        // headerStyle:{
        //     background:'#414141'
        // },
        hidden:true
    }
};

export const footConfig = {
    '/betroom': false,
}