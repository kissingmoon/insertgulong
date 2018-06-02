let localhostDev = true;
let _host= localhostDev ? '/api' : '';
let httpUrl = {
    home:{
        sliderImg: _host + '/ad/image-list',
        notice: _host + '/ad/notice',
        gift: _host + '/v2/gc/syad-image',
        lottery:_host+'/v2/gc/get-cp-type',
        rank:_host+'/v2/user-info/get-user-rank',
        betWin:_host+'/v2/gc/betwin-notice'
    },
    account:{
        generatorCode:_host+'/config/generator-code',
        register:_host+'/user/register',
        login:_host+'/user/login',
    }
};
export { httpUrl }