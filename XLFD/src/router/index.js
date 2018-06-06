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
import Recharge from 'components/recharge/recharge';
import Follow from 'components/follow/follow';
import Attention from 'components/attention/attention';
import Safety from 'components/safety/safety';
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
                    path:'login',
                    component:Login
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
                    path:'bet',
                    component:Bet
                },
                {
                    path:'recharge',
                    component:Recharge
                },
                {
                    path:'follow',
                    component:Follow
                },
                {
                    path:'attention',
                    component:Attention
                },
                {
                    path:'safety',
                    component:Safety
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
