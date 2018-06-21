import Vue from 'vue';
import Router from 'vue-router';
import Home from 'components/home/home';
import Pay from 'components/pay/pay';
import Descover from 'components/descover/descover';
import Discount from 'components/discount/discount';
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

Vue.use(Router)

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/home'
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
            path:'/home',
            component:Home
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
            path:'/descover',
            component:Descover,
            children:[
                {
                    path:'detail',
                    component:FollowDetail
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
            path:'/activity',
            component:Activity
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
            component:Discount,
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
            path:'/portrait',
            component:UserPortrait
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
            path:'/info',
            component:Info,
            children:[
                {
                    path:'balance',
                    component:Balance
                },
                {
                    path:'bill',
                    component:Bill
                },
                {
                    path:'bet',
                    component:Bet,
                    children:[
                        {
                            path:'detail',
                            component:BetDetail
                        }
                    ]
                },
                {
                    path:'cash',
                    component:Cash
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
                        }
                    ]
                }
            ]
            
        },
        {
            path:'/lottery',
            component:Lottery
        }
    ]
})
