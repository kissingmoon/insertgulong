import Vue from 'vue';
import Router from 'vue-router';
// import Home from 'components/home/home';
//主页，home组件
import Home from 'components/home/home';
//房间模式的入口页面
import LotteryRoom from 'components/lottery-room/lottery-room';
//房间模式的房间主页面
import betRoom from 'components/bet-room/bet-room';
//充值页面
import Pay from 'components/pay/pay';
//活动页面
import Descover from 'components/descover/descover';
import Discount from 'components/discount/discount';
//新的活动页面。原页面作废
import NewDiscount from 'components/discount/discount_new';
//活动页面的具体子页面
import Activity from 'components/activity-con/activity-con';
//用户中心页面
import Info from 'components/info/info';
//登陆页面
import Login from 'components/login/login';
//注册页面
import Register from 'components/register/register';
//提现页面
import Balance from 'components/balance/balance';
//交易明细页面
import Bill from 'components/bill/bill';
//投注页面
import Bet from 'components/bet/bet';
//投注详情页面
import BetDetail from 'components/bet-detail/bet-detail';
import Recharge from 'components/recharge/recharge';
//用户中心现金页面
import Cash from 'components/cash/cash';
//曾经的跟投，暂时无用
import Follow from 'components/follow/follow';
//曾经的跟投，暂时无用
import FollowDetail from 'components/follow-detail/follow-detail';
import Attention from 'components/attention/attention';
import AttentionDetail from 'components/attention-detail/attention-detail';
import Crunchies from 'components/crunchies/crunchies';
//安全中心页面
import Safety from 'components/safety/safety';
//修改密码页面
import EditPassword from 'components/edit-password/edit-password';
//设置密码页面
import SetPassword from 'components/set-password/set-password';
//绑定银行页面
import Bank from 'components/bank/bank';
import Information from 'components/information/information';
import Nick from 'components/nick/nick';
import Draw from 'components/draw/draw';
import DrawNumber from 'components/draw-number/draw-number';
import Message from 'components/message/message';
//客服页面
import UrlContent from 'components/url-content/url-content';
import UserPortrait from 'components/portrait/portrait';
//付款跳转页面
import PayTip from 'components/pay-tip/pay-tip';
import Lottery from 'components/lottery/lottery';
//代理中心页面
import Agency from 'components/agency/agency';
import Report from 'components/agency/report';
//购彩大厅页面
import Goucaidating from 'components/goucaidating/goucaidating';
//首页用到的页面
import betWin from 'components/betWin/betWin';
//首页添加自选猜中
import addCaiType from 'components/addCaiZhong/addCaiType';
//加载页面
import Loading from 'base/loading/loading';
import Rebate from 'components/rebate/rebate';
//下载页面
import DownLoad from 'components/download/download';
//代理中心子页面
import Instruction from 'components/agency/instruction';
import SubReport from 'components/agency/sub-report';
import agencyReport from 'components/agency/agency-report';
import memberManger from 'components/agency/member-manger';
import betDetail from 'components/agency/bet-detail';
import tradDetail from 'components/agency/trad-detail';
import subReg from 'components/agency/sub-reg';
import iosTip from 'components/download/ios-tip';
import userLevel from 'components/user-level/user-level';
//我的代理页面
import myAgency from 'components/my-agency/my-agency';
//饭店赔率表页面
import fandianPlb from 'components/agency/fandian_plb';

// const Descover = () => import('components/descover/descover')
// const Home = () => import('components/home/home')
// const Pay = () => import('components/pay/newpay')
// const Discount  = () => import( 'components/discount/discount');
// const Activity  = () => import( 'components/activity-con/activity-con');
// const Info  = () => import( 'components/info/info');
// const Login  = () => import( 'components/login/login');
// const Register  = () => import( 'components/register/register');
// const Balance  = () => import( 'components/balance/balance');
// const Bill  = () => import( 'components/bill/bill');
// const Bet  = () => import( 'components/bet/bet');
// const BetDetail  = () => import( 'components/bet-detail/bet-detail');
// const Recharge  = () => import( 'components/recharge/recharge');
// const Cash  = () => import( 'components/cash/cash');
// const Follow  = () => import( 'components/follow/follow');
// const FollowDetail  = () => import( 'components/follow-detail/follow-detail');
// const Attention  = () => import( 'components/attention/attention');
// const AttentionDetail  = () => import( 'components/attention-detail/attention-detail');
// const Crunchies  = () => import( 'components/crunchies/crunchies');
// const Safety  = () => import( 'components/safety/safety');
// const EditPassword  = () => import( 'components/edit-password/edit-password');
// const SetPassword  = () => import( 'components/set-password/set-password');
// const Bank  = () => import( 'components/bank/bank');
// const Information  = () => import( 'components/information/information');
// const Nick  = () => import( 'components/nick/nick');
// const Draw  = () => import( 'components/draw/draw');
// const DrawNumber  = () => import( 'components/draw-number/draw-number');
// const Message  = () => import( 'components/message/message');
// const UrlContent  = () => import( 'components/url-content/url-content');
// const UserPortrait  = () => import( 'components/portrait/portrait');
// const PayTip  = () => import( 'components/pay-tip/pay-tip');
// const Lottery  = () => import( 'components/lottery/lottery');
// const Agency  = () => import( 'components/agency/agency');
// const Report  = () => import( 'components/agency/report');
Vue.use(Router)

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path:'/home',
            component:Home,
            meta: {
                keepAlive: true // 需要缓存
            },  
            children:[
                // {
                //     path:'lottery',
                //     component:Lottery
                // },
                {
                    path:'activity',
                    component:Activity
                },
                {
                    path:'betwin',
                    component:betWin
                },
                {
                    path:'addCaiType',
                    component:addCaiType,
                    meta: {
                        keepAlive: true // 需要缓存
                    }, 
                },
            ]
        },
        {
            path:'/lottery',
            component:Lottery
        },
        {
            path:'/register',
            component:Register    
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/loading',
            component:Loading
        },
        {
            path:'/pay',
            component:Pay,
            children:[
                {
                    path:'tip',
                    component:PayTip
                }
            ]
        },
        {
            path:'/goucaidating',
            component:Goucaidating,
            meta: {
                keepAlive: true // 需要缓存
            },
            children:[
                // {
                //     path:'number',
                //     component:DrawNumber
                // }
                {
                    path:'lottery',
                    component:Lottery
                }
            ]  
        },
        {
            path:'/lotteryroom',
            component:LotteryRoom
        },
        {
            path:'/download',
            component:DownLoad,
            props: { newsletterPopup: false }
        },
        {
            path:'/betroom',
            component:betRoom
        },
        {
            path:'/descover',
            component:Descover,
            
            // component:Draw,
            children:[
                {
                    path:'detail',
                    component:FollowDetail
                },
                {
                    path:'explain',
                    component:UrlContent
                },
                {
                    path:'ds-detail',
                    component:AttentionDetail,
                    children:[
                        {
                            path:'detail',
                            component:FollowDetail
                        }
                    ]
                }
            ]
        },
        {
            path:'/crunchies',
            component:Crunchies,
            children:[
                {
                    path:'detail',
                    component:AttentionDetail,
                    children:[
                        {
                            path:'detail',
                            component:FollowDetail
                        }
                    ]
                }
            ]
        },
        {
            path:'/attention',
            component:Attention,
            children:[
                {
                    path:'detail',
                    component:AttentionDetail,
                    children:[
                        {
                            path:'detail',
                            component:FollowDetail
                        }
                    ]
                }
            ]
        },
        {
            path:'/message',
            component:Message
        },
        {
            path:'/service',
            component:UrlContent
        },
        {
            path:'/protocol',
            component:UrlContent
        },
        {
            path:'/discount',
            component:NewDiscount, 
                     
            meta: {
                keepAlive: true // 需要缓存
              },
            children:[
                {
                    path:'activity',
                    component:Activity
                }
            ]
        },
        {
            path:'/follow',
            component:Follow,
            children:[
                {
                    path:'detail',
                    component:FollowDetail
                }
            ]
        },
        {
            path:'/draw',
            component:Draw,
            children:[
                {
                    path:'number',
                    component:DrawNumber
                }
            ]
        },
        {
            path:'/iosTip',
            component:iosTip,
        },
        {
            path:'/recharge',
            component:Recharge
        },{
            path:"/userLevel",
            component:userLevel
        },
        {
            path:'/bet',
            component:Bet,
            children:[
                {
                    path:'detail',
                    component:BetDetail
                }
            ]
        },
        {
            path:'/myAgency',
            component:myAgency,
        },
        {
            path:'/agency',
            component:Agency,
            children:[
                {
                    path:'fandianPlb',
                    component:fandianPlb
                },
                {
                    path:'instruction',
                    component:Instruction
                },
                {
                    path:'subReport',
                    component:SubReport
                },
                {
                    path:'agencyReport',
                    component:agencyReport
                },{
                    path:'memberManger',
                    component:memberManger
                },{
                    path:'betDetail',
                    component:betDetail
                },{
                    path:'tradDetail',
                    component:tradDetail
                },{
                    path:'subReg',
                    component:subReg
                }
            ]
        },
        {
            path:'/info',
            component:Info,
            children:[
                {
                    path:'agency',
                    component:Agency,
                    children:[
                        {
                            path:'report',
                            component:Report
                        }
                    ]
                },
                {
                    path:'balance',
                    component:Balance
                },
                {
                    path:'bill',
                    component:Bill
                },
                {
                    path:'cash',
                    component:Cash
                },
                {
                    path:'rebate',
                    component:Rebate
                },
                {
                    path:'safety',
                    component:Safety,
                    children:[
                        {
                            path:'edit-password',
                            component:EditPassword
                        },
                        {
                            path:'bank',
                            component:Bank
                        },
                        {
                            path:'set-password',
                            component:SetPassword
                        }
                    ]
                },
                {
                    path:'information',
                    component:Information,
                    children:[
                        {
                            path:'nick',
                            component:Nick
                        },
                        {
                            path:'portrait',
                            component:UserPortrait
                        },
                    ]
                }
            ]
            
        },
        
    ]
})
