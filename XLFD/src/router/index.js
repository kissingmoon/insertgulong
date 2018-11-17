import Vue from 'vue';
import Router from 'vue-router';
// import Home from 'components/home/home';
import Home from 'components/home/home1';
import LotteryRoom from 'components/lottery-room/lottery-room';
import betRoom from 'components/bet-room/bet-room';
import Pay from 'components/pay/pay';
import Descover from 'components/descover/descover';
import Discount from 'components/discount/discount';
import NewDiscount from 'components/discount/discount_new';
import Activity from 'components/activity-con/activity-con';
import Info from 'components/info/info';
import Login from 'components/login/login';
import Register from 'components/register/register';
import Balance from 'components/balance/balance';
import Bill from 'components/bill/bill';
import Bet from 'components/bet/bet';
import BetDetail from 'components/bet-detail/bet-detail';
import Recharge from 'components/recharge/recharge';
import Cash from 'components/cash/cash';
import Follow from 'components/follow/follow';
import FollowDetail from 'components/follow-detail/follow-detail';
import Attention from 'components/attention/attention';
import AttentionDetail from 'components/attention-detail/attention-detail';
import Crunchies from 'components/crunchies/crunchies';
import Safety from 'components/safety/safety';
import EditPassword from 'components/edit-password/edit-password';
import SetPassword from 'components/set-password/set-password';
import Bank from 'components/bank/bank';
import Information from 'components/information/information';
import Nick from 'components/nick/nick';
import Draw from 'components/draw/draw';
import DrawNumber from 'components/draw-number/draw-number';
import Message from 'components/message/message';
import UrlContent from 'components/url-content/url-content';
import UserPortrait from 'components/portrait/portrait';
import PayTip from 'components/pay-tip/pay-tip';
import Lottery from 'components/lottery/lottery';
import Agency from 'components/agency/agency';
import Report from 'components/agency/report';
import Goucaidating from 'components/goucaidating/goucaidating';
import betWin from 'components/betWin/betWin';
import addCaiType from 'components/addCaiZhong/addCaiType';
import Loading from 'base/loading/loading';
import Rebate from 'components/rebate/rebate';
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
            path:'/recharge',
            component:Recharge
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
