
const state = {
    header: {},
    account:{},
    user_token:'',
    md5_salt:'',
    is_debugger:false,
    show_time:false,
    show_picker:false,
    show_search:false,
    tip:'',
    api_base:'/api',   
    // api_base:'/test',    
    message_count:0,
    hd_qiandao:1, // 签到
    hd_charge:1, //首次充值
    hd_zlcj:1, //助力彩金
    hd_xrkh:1,  //新人开户
    hd_fxpyq:1, //分享朋友圈
    has_phone:1, //绑定手机号
    href_type:'',
    user_id:'',
    xglhc_color:[],
    nav_active:false,   // 添加彩种时保留nav导航首页选项当前样式
}

export default state