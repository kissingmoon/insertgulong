let httpUrl = {
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
        bill:'/user/coin-info'
    }
};
export { httpUrl }