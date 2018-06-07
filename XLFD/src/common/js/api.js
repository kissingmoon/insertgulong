import {session,removeSession} from 'common/js/param';
import $axios from 'common/js/axios';
import {httpUrl} from 'common/js/map';
import store from 'store';

const api={
    getUser() {
        $axios.postRequest(httpUrl.info.user)
        .then((res)=> {
            if(!res.data.errorCode){
                store.commit('SET_ACCOUNT',res.data);
            };
        });
    }
}
export default api;