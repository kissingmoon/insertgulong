import Vue from 'vue';
import Router from 'vue-router';
import Home from 'components/home/home';
import Pay from 'components/pay/pay';
import Descover from 'components/descover/descover';
import Discount from 'components/discount/discount';
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
import Safety from 'components/safety/safety';
import EditPassword from 'components/edit-password/edit-password';
import SetPassword from 'components/set-password/set-password';
import Bank from 'components/bank/bank';
import Information from 'components/information/information';
import Nick from 'components/nick/nick';

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
            component:Pay
        },
        {
            path:'/descover',
            component:Descover
        },
        {
            path:'/discount',
            component:Discount
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
                    path:'recharge',
                    component:Recharge
                },
                {
                    path:'cash',
                    component:Cash
                },
                {
                    path:'follow',
                    component:Follow,
                    children:[
                        {
                            path:'detail',
                            component:FollowDetail
                        }
                    ]
                },
                {
                    path:'attention',
                    component:Attention,
                    children:[
                        {
                            path:'detail',
                            component:AttentionDetail
                        }
                    ]
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
            
        }
    ]
})
