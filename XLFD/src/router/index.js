import Vue from 'vue';
import Router from 'vue-router';
import Home from 'components/home/home';
import Pay from 'components/pay/pay';
import Descover from 'components/descover/descover';
import Discount from 'components/discount/discount';
import Info from 'components/info/info';

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
            component:Info
        }
    ]
})
