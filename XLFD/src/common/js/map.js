let localhostDev = true;
let _host= localhostDev ? '/api' : '';
let httpUrl = {
    home:{
        'sliderImg': _host + '/ad/image-list',
        'notice': _host + '/ad/notice',
        'gift': _host + '/v2/gc/syad-image',
        'lottery':_host+'/v2/gc/get-cp-type'
    }
};
export { httpUrl }