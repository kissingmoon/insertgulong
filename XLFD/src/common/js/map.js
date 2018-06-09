export const httpUrl = {
    home:{
        sliderImg: '/ad/image-list',
        notice: '/ad/notice',
        gift: '/v2/gc/syad-image',
        lottery:'/v2/gc/get-cp-type',
        rank:'/v2/user-info/get-user-rank',
        betWin:'/v2/gc/betwin-notice'
    },
    account:{
        generatorCode:'/config/generator-code',
        register:'/user/register',
        login:'/user/login',
    },
    info:{
        user:'/user/user-info',
        editNick:'/user/edit-nickname',
        balance:'/user-info/withdraw-cash',
        coin:'/user/coin-info',
        bet:'/bet/bet-list',
        betDetail:'/bet/bet-info',
        followMyJoin:'/v2/gd-dsb/get-myjoin-gd',
        followMy:'/v2/gd-dsb/get-my-gd',
        followDetail:'/v2/gd-dsb/get-gd-detail',
        attention:'/v2/gd-dsb/my-gz'
    }
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

export const headerConfig = {
    '/home':{
        title:'小李飞刀',
        service:true,
        message:true
    },
    '/pay':{
        title:'充值',
        service:true,
        rechargeTip:true
    },
    '/descover':{
        title:'精彩发现',
        service:true,
        message:true
    },
    '/discount':{
        title:'优惠活动',
        service:true,
        message:true
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
    '/info/bet':{
        title:'投注记录',
        back:true,
        time:true
    },
    '/info/bet/detail':{
        title:'投注详情',
        back:true
    },
    '/info/recharge':{
        title:'充值记录',
        back:true,
        time:true
    },
    '/info/cash':{
        title:'提现记录',
        back:true
    },
    '/info/follow':{
        title:'我的跟单',
        back:true
    },
    '/info/follow/detail':{
        title:'跟单详情',
        back:true
    },
    '/info/attention':{
        title:'我的关注',
        back:true
    },
    '/info/safety':{
        title:'安全中心',
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
};