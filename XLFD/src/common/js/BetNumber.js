
/**
 * 根据已经选择的注列表生成下注的数字字符串：996,13,,3,,
 */
export function getBetNumberByBetGroupList(list,wf_flag,positionList) {
    var i = 0;
    var bet = "";
    var str = "";
    var arr=JSON.parse(JSON.stringify(list));
    var listList=[];
    arr.forEach((item,i) => {
        listList[i]=item.sort((a,b) => { return a-b });
    });
    if (!wf_flag) {
        return "";
    }
    switch (wf_flag) {
        //任3组选和值 //任三直选和值 //任二组选和值 //任二直选和值
        case "ssc_r3zux_hz": case "ssc_r3zhix_hz": case "ssc_r2zux_hz":
        case "ssc_r2zhix_hz":
            bet=positionList.join(',')+"@"+listList[0].join('$');
            break;
        //任4组选6 //任4组选24 //任3组六复式 //任3组三复式 //任二组选复式
        case "ssc_r4zux_6": case "ssc_r4zux_24": case "ssc_r3zux_z6hz":
        case "ssc_r3zux_z3fs": case "ssc_r2zux_fs":
            if (listList.length == 1) {
                bet=positionList.join(',')+"@"+listList[0].join('');
            }
            break;
        //任4组选4 //任4组选12
        case "ssc_r4zux_4": case "ssc_r4zux_12":
            if (listList.length == 2) {
                bet=positionList.join(',')+"@"+listList[0].join('')+","+listList[1].join('');
            }
            break;
        //时时彩龙虎斗
        case "ssc_lhd":
            if (listList.length == 2) {
                bet=listList[0].join(',')+"-"+listList[1].join(',');
            }
            break;
        // pk10龙虎斗
        case "pk10_lhd":
            const titles = ["1vs10", "2vs9", "3vs8", "4vs7", "5vs6"];
            const results = [];
            for (i = 0; i < listList.length; i++) {
                if (listList[i].length == 0) {
                    continue;
                }
                str = titles[i] + '-';
                str += listList[i].join('');
                results.push(str);
            }
            bet = results.join(',');
            break;
        case "pk10_cq1_d1": case "pk10_cq2_d2": case "pk10_cq3_d3":
        case "pk10_cq4_d4": case "pk10_cq5_d5": case "pk10_cq6_d6":
        case "pk10_cq7_d7": case "pk10_cq8_d8": case "pk10_cq9_d9":
        case "pk10_cq10_d10": case "pk10_hz_gy": case "pk10_hz_gyj":
        case "11x5_3m_q3zuxfs": case "11x5_rx_1z1fs": case "11x5_rx_2z2fs":
        case "11x5_rx_3z3fs": case "11x5_rx_4z4fs": case "11x5_rx_5z5fs":
        case "11x5_rx_6z5fs": case "11x5_rx_7z5fs": case "11x5_rx_8z5fs":
        case "11x5_2m_q2zuxfs": case "11x5_1m_q1zhix": case "11x5_bdw_q3bdw":
        case "11x5_qwx_dds": case "k3_2bth_bz": case "k3_2th_fx":
        case "k3_3th_thtx": case "k3_3th_lhtx": case "k3_3th_dx":
        case "k3_3bth_bz": case "k3_3bth_hz": case "k3_hz_hz":
            listList.forEach((item) => {
                bet += item.join(',');
            });
            break;
        case "pk10_cq2_q2": case "pk10_cq3_q3": case "pk10_cq4_q4":
        case "pk10_cq5_q5": case "pk10_cq6_q6": case "pk10_cq7_q7":
        case "pk10_cq8_q8": case "pk10_cq9_q9": case "pk10_cq10_q10":
        case "pk10_gp_dwd_child": case "11x5_3m_q3zhixfs": case "11x5_3m_q3zuxdt":
        case "11x5_2m_q2zhixfs": case "11x5_2m_q2zuxdt": case "11x5_dt_2":
        case "11x5_dt_3": case "11x5_dt_4": case "11x5_dt_5":
        case "11x5_dt_6": case "11x5_dt_7": case "11x5_dwd_q3dwd":
        case "k3_2th_bz": case "k3_2bth_dt": case "k3_3bth_dt":
            listList.forEach((item,i) => {
                bet += item.join(',');
                if(i != (listList.length-1)){
                    bet += '-'
                }
            });    
            break;
        case "ssc_q3zhix_hz": case "ssc_q3zux_q3zuxhz": case "ssc_q3zhix_kd":
        case "ssc_q3zux_q3zuxbd": case "ssc_q2zhix_hz": case "ssc_q2zhix_kd":
        case "ssc_q2zux_hz": case "ssc_q2zux_bd": case "ssc_h2zhix_hz":
        case "ssc_h2zhix_kd": case "ssc_h2zux_hz": case "ssc_h2zux_bd":
        case "ssc_z3zhix_hz": case "ssc_z3zhix_kd": case "ssc_z3zux_z3zuxhz":
        case "ssc_h3zhix_hz": case "ssc_h3zhix_kd": case "ssc_h3zux_h3zuxhz":
        case "ssc_z3zux_z3zuxbd": case "ssc_h3zux_h3zuxbd":
            bet += listList[0].join(',');
            break;
        default:
            listList.forEach((item,i) => {
                bet += item.join('');
                if(i != (listList.length-1)){
                    bet += ','
                }
            });  
            break;
    }
    return bet;
}

