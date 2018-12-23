export function handleReport(res){
    if(res.data && !res.data.errorCode){
        res.data.over="这是处理过后的数据"
        return res.data
    }
}