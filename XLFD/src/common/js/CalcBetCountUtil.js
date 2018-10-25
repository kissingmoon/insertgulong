import * as ComAndArrangeUtil from 'common/js/ComAndArrangeUtil.js'
import {trimArr} from 'common/js/param.js';
/**
 * 计算投注
 *
 */
//=========================时时彩=======================================
//----------------------------------------------------五星---------------------------------
//五星直选复式   bet:12,23,56,78,56
export function ssc_5xzhix_fs(value) {
    return sscCountFs(value);
}

//五星直选组合   bet:12,23,56,78,56
export function ssc_5xzhix_zh(value) {
    const count = sscCountFs(value) * 5;
    return count;
}

//五星组选120   bet:1235678
export function ssc_5xzux_120(value) {
    return ComAndArrangeUtil.combination(value.length, 5);
}

//五星组选60   bet:12,256
export function ssc_5xzux_60(value) {
    return countZuxuan1(value, 3);
}

//五星组选30   bet:12,256
export function ssc_5xzux_30(value) {
    return countZuxuan2(value, 2);
}

//五星组选20   bet:12,256
export function ssc_5xzux_20(value) {
    return countZuxuan1(value, 2);
}

//五星组选10   bet:12,256
export function ssc_5xzux_10(value) {
    return countZuxuan1(value, 1);
}

//五星组选5   bet:12,256
export function ssc_5xzux_5(value) {
    return countZuxuan1(value, 1);
}

//一帆风顺   bet:123568
export function ssc_5xts_yffs(value) {
    return value.length;
}

//好事成双  bet:123568
export function ssc_5xts_hscs(value) {
    return value.length;
}

//三星报喜   bet:123568
export function ssc_5xts_sxbx(value) {
    return value.length;
}

//四季发财   bet:123568
export function ssc_5xts_sjfc(value) {
    return value.length;
}

//---------------------------------------四星----------------------------------------------
//前四直选复式   bet:12,34,78,26
export function ssc_4xzhix_qszhixfs(value) {
    return sscCountFs(value);
}

//前四直选组合   bet:12,34,78,26
export function ssc_4xzhix_qszhixzh(value) {
    const count = sscCountFs(value) * 4;
    return count;
}

//后四直选复式   bet:12,34,78,26
export function ssc_4xzhix_hszhixfs(value) {
    return sscCountFs(value);
}

//后四直选组合   bet:12,34,78,26
export function ssc_4xzhix_hszhixzh(value) {
    const count = sscCountFs(value) * 4;
    return count;
}

//前四组选24   bet:1235678
export function ssc_4xzux_qszux24(value) {
    return ComAndArrangeUtil.combination(value.length, 4);
}

//前四组选12   bet:12,26
export function ssc_4xzux_qszux12(value) {
    return countZuxuan1(value, 2);
}

//前四组选6   bet:1235678
export function ssc_4xzux_qszux6(value) {
    return ComAndArrangeUtil.combination(value.length, 2);
}

//前四组选4   bet:1235678
export function ssc_4xzux_qszux4(value) {
    return countZuxuan1(value, 1);
}

//后四组选24   bet:1235678
export function ssc_4xzux_hszux24(value) {
    return ComAndArrangeUtil.combination(value.length, 4);
}

//后四组选12   bet:12,26
export function ssc_4xzux_hszux12(value) {
    return countZuxuan1(value, 2);
}

//后四组选6   bet:1235678
export function ssc_4xzux_hszux6(value) {
    return ComAndArrangeUtil.combination(value.length, 2);
}

//后四组选4   bet:1235678
export function ssc_4xzux_hszux4(value) {
    return countZuxuan1(value, 1);
}

//------------------------------------------------前三----------------------------------
//前三直选复式   bet:12,78,26
export function ssc_q3zhix_fs(value) {
    return sscCountFs(value);
}

//前三直选组合   bet:34,78,26
export function ssc_q3zhix_zh(value) {
    return sscCountFs(value) * 3;
}

//前三直选和值   bet:2,27
export function ssc_q3zhix_hz(value) {
    var count = 0;
    const arr =trimArr(value,',');
    arr.forEach(item => {
        count += ComAndArrangeUtil.combineZhixhz(3, parseInt(item));
    });
    return count;
}

//前三直选跨度   bet:1,2,3
export function ssc_q3zhix_kd(value) {
    var count = 0;
    const arr =trimArr(value,',');
    arr.forEach(item => {
        count += ComAndArrangeUtil.combineZhixKd(3, parseInt(item),3);
    });
    return count;
}

//前三组三复式   bet:1236
export function ssc_q3zux_q3zu3fs(value) {
    return ComAndArrangeUtil.combination(value.length, 2) * 2;
}

//前三组六复式   bet:1236
export function ssc_q3zux_q3zu6fs(value) {
    return ComAndArrangeUtil.combination(value.length, 3);
}

//前三组选和值   bet:2,27
export function ssc_q3zux_q3zuxhz(value) {
    var count = 0;
    const arr =trimArr(value,',');
    arr.forEach(item => {
        count += ComAndArrangeUtil.combineZuxhz(3, parseInt(item),3);
    });
    return count;
}

//前三组选包胆   bet:1,2,3,4,5
export function ssc_q3zux_q3zuxbd(value) {
    return trimArr(value,',').length * 54;
}

//------------------------------------------------中三----------------------------------
//中三直选复式   bet:12,78,26
export function ssc_z3zhix_fs(value) {
    return sscCountFs(value);
}

//中三直选组合   bet:34,78,26
export function ssc_z3zhix_zh(value) {
    return sscCountFs(value) * 3;
}

//中三直选和值   bet:2,27
export function ssc_z3zhix_hz(value) {
    return ssc_q3zhix_hz(value);
}

//中三直选跨度   bet:1,2,3
export function ssc_z3zhix_kd(value) {
    return ssc_q3zhix_kd(value);
}

//中三组三复式   bet:1236
export function ssc_z3zux_z3zu3fs(value) {
    return ComAndArrangeUtil.combination(value.length, 2) * 2;
}

//中三组六复式   bet:1236
export function ssc_z3zux_z3zu6fs(value) {
    return ComAndArrangeUtil.combination(value.length, 3);
}

//中三组选和值   bet:2,27
export function ssc_z3zux_z3zuxhz(value) {
    return ssc_q3zux_q3zuxhz(value);
}

//中三组选包胆   bet:1,2,3,4,5
export function ssc_z3zux_z3zuxbd(value) {
    return ssc_q3zux_q3zuxbd(value);
}

//------------------------------------------------后三----------------------------------
//后三直选复式   bet:12,78,26
export function ssc_h3zhix_fs(value) {
    return sscCountFs(value);
}

//后三直选组合   bet:34,78,26
export function ssc_h3zhix_zh(value) {
    return sscCountFs(value) * 3;
}

//后三直选和值   bet:2,27
export function ssc_h3zhix_hz(value) {
    return ssc_q3zhix_hz(value);
}

//后三直选跨度   bet:1,2,3
export function ssc_h3zhix_kd(value) {
    return ssc_q3zhix_kd(value);
}

//后三组三复式   bet:1236
export function ssc_h3zux_h3zu3fs(value) {
    return ComAndArrangeUtil.combination(value.length, 2) * 2;
}

//后三组六复式   bet:1236
export function ssc_h3zux_h3zu6fs(value) {
    return ComAndArrangeUtil.combination(value.length, 3);
}

//后三组选和值   bet:2,27
export function ssc_h3zux_h3zuxhz(value) {
    return ssc_q3zux_q3zuxhz(value);
}

//后三组选包胆   bet:1,2,3,4,5
export function ssc_h3zux_h3zuxbd(value) {
    return ssc_q3zux_q3zuxbd(value);
}

//------------------------------------------------前二----------------------------------
//前二直选复式   bet:12,26
export function ssc_q2zhix_fs(value) {
    return sscCountFs(value);
}

//前二直选和值   bet:1,2,17
export function ssc_q2zhix_hz(value) {
    var count = 0;
    const arr =trimArr(value,',');
    arr.forEach(item => {
        count += ComAndArrangeUtil.combineZhixhz(2, parseInt(item));
    });
    return count;
}

//前二直选跨度   bet:1,2,3
export function ssc_q2zhix_kd(value) {
    var count = 0;
    const arr =trimArr(value,',');
    arr.forEach(item => {
        count += ComAndArrangeUtil.combineZhixKd(2, parseInt(item),2);
    });
    return count;
}

//前二组选复式   bet:1236
export function ssc_q2zux_fs(value) {
    return ComAndArrangeUtil.combination(value.length, 2);
}

//前二组选和值   bet:2,17
export function ssc_q2zux_hz(value) {
    var count = 0;
    const arr =trimArr(value,',');
    arr.forEach(item => {
        count += ComAndArrangeUtil.combineZuxhz(2, parseInt(item),2);
    });
    return count;
}

//前二组选包胆   bet:1,2,3,4,5
export function ssc_q2zux_bd(value) {
    return trimArr(value,",",1).length * 9;
}

//------------------------------------------------后二----------------------------------
//后二直选复式   bet:12,26
export function ssc_h2zhix_fs(value) {
    return ssc_q2zhix_fs(value);
}

//后二直选和值   bet:1,2,17
export function ssc_h2zhix_hz(value) {
    return ssc_q2zhix_hz(value);
}

//后二直选跨度   bet:1,2,3
export function ssc_h2zhix_kd(value) {
    return ssc_q2zhix_kd(value);
}

//后二组选复式   bet:1236
export function ssc_h2zux_fs(value) {
    return ssc_q2zux_fs(value);
}

//后二组选和值   bet:2,17
export function ssc_h2zux_hz(value) {
    return ssc_q2zux_hz(value);
}

//后二组选包胆   bet:1,2,3,4,5
export function ssc_h2zux_bd(value) {
    return ssc_q2zux_bd(value);
}

//------------------------------------------------定位胆----------------------------------
//五星定位胆   bet:1,2,,4,5
export function ssc_5xdwd(value) {
    var count = 0;
    const arr=trimArr(value,',',1)
    arr.forEach(item => {
        count += item.length;
    });
    return count;
}

//------------------------------------------------不定位----------------------------------
//前三一码不定   bet:126
export function ssc_3xbdw_q31(value) {
    return value.length;
}

//中三一码不定   bet:126
export function ssc_3xbdw_z31(value) {
    return value.length;
}

//后三一码不定   bet:126
export function ssc_3xbdw_h31(value) {
    return value.length;
}

//前三二码不定   bet:126
export function ssc_3xbdw_q32(value) {
    return ComAndArrangeUtil.combination(value.length, 2);
}

//中三二码不定   bet:126
export function ssc_3xbdw_z32(value) {
    return ComAndArrangeUtil.combination(value.length, 2);
}

//后三二码不定   bet:126
export function ssc_3xbdw_h32(value) {
    return ComAndArrangeUtil.combination(value.length, 2);
}

//后四一码不定   bet:126
export function ssc_4xbdw_h41(value) {
    return value.length;
}

//后四二码不定   bet:126
export function ssc_4xbdw_h42(value) {
    return ComAndArrangeUtil.combination(value.length, 2);
}

//五星二码不定   bet:126
export function ssc_4xbdw_h52(value) {
    return ComAndArrangeUtil.combination(value.length, 2);
}

//五星三码不定   bet:126
export function ssc_4xbdw_h53(value) {
    return ComAndArrangeUtil.combination(value.length, 3);
}

//------------------------------------------------大小单双----------------------------------
//前二大小单双   bet:大小,单双
export function ssc_dxds_q2(value) {
    return sscCountFs(value);
}

//后二大小单双   bet:大小,单双
export function ssc_dxds_h2(value) {
    return sscCountFs(value);
}

//前三大小单双   bet:大小,单双
export function ssc_dxds_q3(value) {
    return sscCountFs(value);
}

//后三大小单双   bet:大小,单双
export function ssc_dxds_h3(value) {
    return sscCountFs(value);
}

//------------------------------------------------任选2----------------------------------
//任二直选复式   bet:12,,56,,26
export function ssc_r2zhix_fs(value) {
    return countRX(value, 2);
}

//任二直选和值   bet:0,2,4@5$6$7$15
export function ssc_r2zhix_hz(value) {
    const positionList = trimArr(trimArr(value,'@')[0],',');
    const bet = trimArr(value,'@')[1].replace(/\$/g, ",");
    const count = ComAndArrangeUtil.combination(positionList.length, 2);
    return ssc_q2zhix_hz(bet) * count;
}

//任二组选复式   bet:0,2,4@123
export function ssc_r2zux_fs(value) {
    const positionList = trimArr(trimArr(value,'@')[0],',');
    const bet = trimArr(value,'@')[1];
    const bcount = ComAndArrangeUtil.combination(bet.length, 2);
    const pcount = ComAndArrangeUtil.combination(positionList.length, 2);
    return pcount * bcount;
}

//任二组选和值   bet:0,2,4@5$6$7$15
export function ssc_r2zux_hz(value) {
    const positionList = trimArr(trimArr(value,'@')[0],',');
    const bet = trimArr(value,'@')[1].replace(/\$/g, ",");
    const count = ComAndArrangeUtil.combination(positionList.length, 2);
    return ssc_q2zux_hz(bet) * count;
}

//------------------------------------------------任选3----------------------------------
//任三直选复式   bet:12,,56,,26
export function ssc_r3zhix_fs(value) {
    return countRX(value, 3);
}

//任三直选和值   bet:0,2,4@5$6$7$15
export function ssc_r3zhix_hz(value) {
    const positionList = trimArr(trimArr(value,'@')[0],',');
    const bet = trimArr(value,'@')[1].replace(/\$/g, ",");
    const count = ComAndArrangeUtil.combination(positionList.length, 3);
    return ssc_q3zhix_hz(bet) * count;
}

//任3组三复式   bet:2,3,4@123
export function ssc_r3zux_z3fs(value) {
    const positionList = trimArr(trimArr(value,'@')[0],',');
    const bet = trimArr(value,'@')[1];
    const bcount = ComAndArrangeUtil.combination(bet.length, 2) * 2;
    const pcount = ComAndArrangeUtil.combination(positionList.length, 3);
    return pcount * bcount;
}

//任3组六复式   bet:2,3,4@123
export function ssc_r3zux_z6hz(value) {
    const positionList = trimArr(trimArr(value,'@')[0],',');
    const bet = trimArr(value,'@')[1];
    const bcount = ComAndArrangeUtil.combination(bet.length, 3);
    const pcount = ComAndArrangeUtil.combination(positionList.length, 3);
    return pcount * bcount;
}

//任3组选和值   bet:0,2,4@5$6$7$15$27
export function ssc_r3zux_hz(value) {
    const positionList = trimArr(trimArr(value,'@')[0],',');
    const bet = trimArr(value,'@')[1].replace(/\$/g, ",");
    const count = ComAndArrangeUtil.combination(positionList.length, 3);
    return ssc_q3zux_q3zuxhz(bet) * count;
}

//------------------------------------------------任选4----------------------------------
//任四直选复式   bet:12,34,56,,26
export function ssc_r4zhix_fs(value) {
    return countRX(value, 4);
}

//任4组选24   bet:1,2,3,4@123
export function ssc_r4zux_24(value) {
    const positionList = trimArr(trimArr(value,'@')[0],',');
    const bet = trimArr(value,'@')[1]
    const bcount = ComAndArrangeUtil.combination(bet.length, 4);
    const pcount = ComAndArrangeUtil.combination(positionList.length, 4);
    return pcount * bcount;
}

//任4组选12   bet:1,2,3,4@12,123
export function ssc_r4zux_12(value) {
    const positionList = trimArr(trimArr(value,'@')[0],',');
    const bet2 = trimArr(trimArr(trimArr(value,"@",1)[1],",",1)[0],"",1);
    const bet1 = trimArr(trimArr(value,"@",1)[1],",",1)[1];
    const pcount = ComAndArrangeUtil.combination(positionList.length, 4); //位置组合
    var temp = "";
    var bcount = 0;
    for (var i = 0; i < bet2.length; i++) {
        if (!(/\s/g.test(bet2[i]))) {
            const reg=new RegExp(bet2[i],'g');
            temp = bet1.replace(reg, "");
            bcount = bcount + ComAndArrangeUtil.combination(temp.length, 2);
        }
    }
    return pcount * bcount;
}

//任4组选6   bet:1,2,3,4@123
export function ssc_r4zux_6(value) {
    const positionList = trimArr(trimArr(value,'@')[0],',');
    const bet = trimArr(value,"@",1)[1];
    const pcount = ComAndArrangeUtil.combination(positionList.length, 4);
    const bcount = ComAndArrangeUtil.combination(bet.length, 2);
    return pcount * bcount;
}

//任4组选4  bet:1,2,3,4@12,123
export function ssc_r4zux_4(value) {
    const position = trimArr(trimArr(value,"@",1)[0],",",1);
    const bet2 = trimArr(trimArr(trimArr(value,"@",1)[1],",",1)[0],"",1);
    const bet1 = trimArr(trimArr(value,"@",1)[1],",",1)[1];
    const pcount = ComAndArrangeUtil.combination(position.length, 4); //位置组合
    var temp = "";
    var bcount = 0;
    for (var i = 0; i < bet2.length; i++) {
        if (!(/\s/g.test(bet2[i]))) {
            const reg=new RegExp(bet2[i],'g');
            temp = bet1.replace(reg, "");
            bcount = bcount + temp.length;
        }
    }
    return pcount * bcount;
}

//------------------------------------------------龙虎斗----------------------------------
//任4组选4  bet:十个,百个,百十-龙,虎
export function ssc_lhd(value) {
    const list = trimArr(value,"-");
    if (list.length == 2) {
        return trimArr(list[0],",").length * trimArr(list[1],",").length
    } else {
        return 0;
    }
}


//=========================pk10=======================================


//猜第一  bet:1,2,3,4,5,6,7,10
export function pk10_cq1_d1(value) {
    return trimArr(value,",").length;
}

//第二名  bet:1,2,3,4,5,6,7,10
export function pk10_cq2_d2(value) {
    return pk10_cq1_d1(value);
}

//第三名  bet:1,2,3,4,5,6,7,10
export function pk10_cq3_d3(value) {
    return pk10_cq1_d1(value);
}

//第四名  bet:1,2,3,4,5,6,7,10
export function pk10_cq4_d4(value) {
    return pk10_cq1_d1(value);
}

//第五名  bet:1,2,3,4,5,6,7,10
export function pk10_cq5_d5(value) {
    return pk10_cq1_d1(value);
}

//第六名  bet:1,2,3,4,5,6,7,10
export function pk10_cq6_d6(value) {
    return pk10_cq1_d1(value);
}

//第七名  bet:1,2,3,4,5,6,7,10
export function pk10_cq7_d7(value) {
    return pk10_cq1_d1(value);
}

//第八名  bet:1,2,3,4,5,6,7,10
export function pk10_cq8_d8(value) {
    return pk10_cq1_d1(value);
}

//第九名  bet:1,2,3,4,5,6,7,10
export function pk10_cq9_d9(value) {
    return pk10_cq1_d1(value);
}

//第十名  bet:1,2,3,4,5,6,7,10
export function pk10_cq10_d10(value) {
    return pk10_cq1_d1(value);
}

//-------------------------------------------------------------猜前几-------------------------------
//猜前二  bet:1,2,3-5,6,7,10
export function pk10_cq2_q2(value) {
    return caclQnSNoRepeat(value, 2);
}

//猜前三  bet:1,2,10-1,2,3,10-5,6,7,10
export function pk10_cq3_q3(value) {
    return caclQnSNoRepeat(value, 3);
}

//猜前4  bet:1,2,10-1,2,3,10-5,6,7,10
export function pk10_cq4_q4(value) {
    return caclQnSNoRepeat(value, 4);
}

//猜前5  bet:1,2,10-1,2,3,10-5,6,7,10
export function pk10_cq5_q5(value) {
    return caclQnSNoRepeat(value, 5);
}

//猜前6  bet:1,2,10-1,2,3,10-5,6,7,10
export function pk10_cq6_q6(value) {
    return caclQnSNoRepeat(value, 6);
}

//猜前7  bet:1,2,10-1,2,3,10-5,6,7,10
export function pk10_cq7_q7(value) {
    return caclQnSNoRepeat(value, 7);
}

//猜前8  bet:1,2,10-1,2,3,10-5,6,7,10
export function pk10_cq8_q8(value) {
    return caclQnSNoRepeat(value, 8);
}

//猜前9  bet:1,2,10-1,2,3,10-5,6,7,10
export function pk10_cq9_q9(value) {
    return caclQnSNoRepeat(value, 9);
}

//猜前10  bet:1,2,10-1,2,3,10-5,6,7,10
export function pk10_cq10_q10(value) {
    return caclQnSNoRepeat(value, 10);
}

//-------------------------------定位胆-----------------------------------
//定位胆  bet:1,2,10--3,5--5--10---1,1
export function pk10_gp_dwd_child(value) {
    const s = trimArr(value,"-",1);
    var count = 0;
    for (var i = 0; i < s.length; i++) {
        if (!(/\s/g.test(s[i]))) {
            const temp = trimArr(s[i],",",1);
            count = count + temp.length;
        }
    }
    return count;
}

//冠军大小单双    bet:大单
export function pk10_dxds_gj(value) {
    return value.length;
}

//亚军大小单双    bet:大单
export function pk10_dxds_yj(value) {
    return pk10_dxds_gj(value);
}

//季军大小单双    bet:大单
export function pk10_dxds_jj(value) {
    return pk10_dxds_gj(value);
}

//冠亚和值    bet:3,4,5,8,12,16,19
export function pk10_hz_gy(value) {
    return trimArr(value,',').length;
}

//冠亚季和值    bet:8,12,16,19,23,26,27
export function pk10_hz_gyj(value) {
    return pk10_hz_gy(value);
}

//龙虎斗    bet:1vs10-龙虎,2vs9-龙虎,3vs8-龙虎
export function pk10_lhd(value) {
    var count = 0;
    var arr=trimArr(value,',');
    arr.forEach(item => {
        count += trimArr(item,'-')[1].length;
    });
    return count;
}


//------------------------------------------------------11选5-------------------------------
//前三直选复式  bet:1,2,10-1,2,3,10-5,6,7,10
export function m11x5_3m_q3zhixfs(value) {
    return caclQnSNoRepeat(value, 3);
}

//前三组选复式  bet:1,2,3,4,5,6,7,10,11
export function m11x5_3m_q3zuxfs(value) {
    return ComAndArrangeUtil.combination(trimArr(value,',').length, 3);
}

//前三组选胆拖  bet:1,2-3,4,5,6,7,10,11
export function m11x5_3m_q3zuxdt(value) {
    return m11x5RXDT(value, 3);
}

//前二直选复式  bet:1,11-2,5,10
export function m11x5_2m_q2zhixfs(value) {
    return caclQnSNoRepeat(value, 2);
}

//前二组选复式  bet:1,2,3,4,5,6,7,10,11
export function m11x5_2m_q2zuxfs(value) {
    return ComAndArrangeUtil.combination(trimArr(value,',').length, 2);
}

//	//前二组选胆拖  bet:1,2-3,4,5,6,7,10,11
export function m11x5_2m_q2zuxdt(value) {
    return m11x5RXDT(value, 2);
}

//前一直选  bet:1,2,10,11
export function m11x5_1m_q1zhix(value) {
    return trimArr(value,',').length;
}

//前三不定胆  bet:1,2,10,11
export function m11x5_bdw_q3bdw(value) {
    return trimArr(value,',').length;
}

//前三定位胆  bet:-1,2,3-1,3
export function m11x5_dwd_q3dwd(value) {
    return pk10_gp_dwd_child(value);
}

//定单双  bet:5单0双,4单1双,3单2双
export function m11x5_qwx_dds(value) {
    return trimArr(value,',').length;
}

//猜中数  bet:23456
export function m11x5_qwx_czs(value) {
    return value.length;
}

//任选1中1复式  bet:1,2,10,11
export function m11x5_rx_1z1fs(value) {
    return trimArr(value,',').length;
}

//任选2中2复式 bet:1,2,10,11
export function m11x5_rx_2z2fs(value) {
    return ComAndArrangeUtil.combination(trimArr(value,',').length, 2);
}

//任选3中3复式 bet:1,2,10,11
export function m11x5_rx_3z3fs(value) {
    return ComAndArrangeUtil.combination(trimArr(value,',').length, 3);
}

//任选4中4复式 bet:1,2,10,11
export function m11x5_rx_4z4fs(value) {
    return ComAndArrangeUtil.combination(trimArr(value,',').length, 4);
}

//任选5中5复式 bet:1,2,10,11
export function m11x5_rx_5z5fs(value) {
    return ComAndArrangeUtil.combination(trimArr(value,',').length, 5);
}

//任选6中5复式 bet:1,2,10,11
export function m11x5_rx_6z5fs(value) {
    return ComAndArrangeUtil.combination(trimArr(value,',').length, 6);
}

//任选7中5复式 bet:1,2,10,11
export function m11x5_rx_7z5fs(value) {
    return ComAndArrangeUtil.combination(trimArr(value,',').length, 7);
}

//任选8中5复式 bet:1,2,10,11
export function m11x5_rx_8z5fs(value) {
    return ComAndArrangeUtil.combination(trimArr(value,',').length, 8);
}

//任选二胆拖  bet:1,2-3,4,5,6,7,10,11
export function m11x5_dt_2(value) {
    return m11x5RXDT(value, 2);
}

//任选3胆拖  bet:1,2-3,4,5,6,7,10,11
export function m11x5_dt_3(value) {
    return m11x5RXDT(value, 3);
}

//任选4胆拖  bet:1,2-3,4,5,6,7,10,11
export function m11x5_dt_4(value) {
    return m11x5RXDT(value, 4);
}

//任选5胆拖  bet:1,2-3,4,5,6,7,10,11
export function m11x5_dt_5(value) {
    return m11x5RXDT(value, 5);
}

//任选6胆拖  bet:1,2-3,4,5,6,7,10,11
export function m11x5_dt_6(value) {
    return m11x5RXDT(value, 6);
}

//任选7胆拖  bet:1,2-3,4,5,6,7,10,11
export function m11x5_dt_7(value) {
    return m11x5RXDT(value, 7);
}

//------------------------------------------------------快3-------------------------------
//二不同标准  bet:3,4,5,6
export function k3_2bth_bz(value) {
    return ComAndArrangeUtil.combination(trimArr(value,',').length, 2);
}

//二不同胆拖  bet:1-3,4,5,6
export function k3_2bth_dt(value) {
    const str=trimArr(value,'-')[1]
    return trimArr(str,',').length;
}

//二同号标准  bet:1,2,3-1,2,3,4,5,6
export function k3_2th_bz(value) {
    const str = trimArr(value,"-",1)[0];
    const tonghao = trimArr(str,",",1);
    const buTh = trimArr(value,"-",1)[1].replace(/,/g, "");
    var count = 0;
    for (var i = 0; i < tonghao.length; i++) {
        const reg=new RegExp(tonghao[i],'g');
        count = count + buTh.replace(reg, "").length;
    }
    return count;
}

//二同号复选  bet:11*,55*,66*
export function k3_2th_fx(value) {
    return trimArr(value,',').length;
}

//三不同标准  bet:3,4,5,6
export function k3_3bth_bz(value) {
    return ComAndArrangeUtil.combination(trimArr(value,',').length, 3);
}

//三不同胆拖  bet:1,2-3,4,5,6
export function k3_3bth_dt(value) {
    return m11x5RXDT(value, 3);
}

//三不同和值   bet:6,7,12,15
export function k3_3bth_hz(value) {
    const temp = trimArr(value,",",1);
    var count = 0;
    for (var i = 0; i < temp.length; i++) {
        const tv = parseInt(temp[i]);
        if (tv == 6 || tv == 7 || tv == 14 || tv == 15) {
            count += 1;
        } else if (tv == 8 || tv == 13) {
            count += 2;
        } else if (tv == 9 || tv == 10 || tv == 11 || tv == 12) {
            count += 3;
        }
    }
    return count;
}

//三同号单选  bet:111,555,666
export function k3_3th_dx(value) {
    return trimArr(value,',').length;
}

//三同号通选  bet:111,222,333,444,555,666
export function k3_3th_thtx(value) {
    return value.length==0?0:1;
}

//三连号通选  bet:123,234,345,456
export function k3_3th_lhtx(value) {
    return value.length==0?0:1;
}

//和值  bet:6,7,12,15
export function k3_hz_hz(value) {
    return trimArr(value,',').length;
}

/**
 * bet:12,256，num:组合的个数
 *
 * @param value
 * @param num：组合的个数
 * @return
 */
export function countZuxuan1(value, num) {
    const str = trimArr(value,",",1)[0];
    const bet2 =  trimArr(str,"",1);
    const bet1 = trimArr(value,",",1)[1];
    var count = 0;
    for (var i = 0; i < bet2.length; i++) {
        if (!(/\s/g.test(bet2[i]))) {
            const reg=new RegExp(bet2[i],'g');
            const temp = bet1.replace(reg, "");   //用下面的数据进行组合,上面的数据循环
            count = count + ComAndArrangeUtil.combination(temp.length, num);
        }
    }
    return count;
}

/**
 * 用bet2来进行组合
 * bet:12,256，num:组合的个数
 *
 * @param value
 * @param num:组合的个数
 * @return
 */
export function countZuxuan2(value,num) {
    const bet2 = trimArr(value,",",1)[0];
    const str = trimArr(value,",",1)[1];
    const bet1 =  trimArr(str,"",1);
    var count = 0;
    for (var i = 0; i < bet1.length; i++) {
        if (!(/\s/g.test(bet1[i]))) {
            const reg=new RegExp(bet1[i],'g');
            const temp = bet2.replace(reg, "");  //用上面的数据进行组合,下面的数据循环
            count = count + ComAndArrangeUtil.combination(temp.length, 2);
        }
    }
    return count;
}

/**
 * 任选统计
 *
 * @param value：12,34,,,26
 * @param rxNum：任选         2/3/4
 * @return
 */
export function countRX(value, rxNum) {
    const temp = trimArr(value,",",1);
    var s = "";
    for (var i = 0; i < temp.length; i++) {
        if (!(/\s/g.test(temp[i]))) {
            s = s + i + ",";
        }
    }
    s = s.substring(0, s.lastIndexOf(","));
    const str = trimArr(s,",",1);
    const list = ComAndArrangeUtil.getCombination(str, rxNum);//位置组合
    var count = 0;
    for (var i = 0; i < list.length; i++) {
        const ss = trimArr(list[i],",",1);//0,1,2,3
        var tempInt = 1;
        for (var j = 0; j < rxNum; j++) {
            tempInt = temp[parseInt(ss[j])].length * tempInt;
        }
        count = count + tempInt;
    }
    return count;
}

//复式方法计算         bet:12,23,56,78,56
export function sscCountFs(value) {
    const list = trimArr(value,',');
    const needSize = value.split(',').length;
    if (list.length == needSize) {
        var count = 1;
        list.forEach((item) => {
            count = count * item.length;
        });
        return count;
    } else {
        return 0;
    }
}

/**
 * 计算指定前n位数不相同的注数
 * 例如pk10猜前几的公用方法
 *
 * @param value           : 1,2,10-1,2,3,10-5,6,7,10
 * @param spcialValue:指定位 3
 * @return
 */
export function caclQnSNoRepeat(value, specialValue) {
    const count = {value:0};
    var arr=trimArr(value,'-',1);
    caclQSxuhuan(arr, 1, specialValue, [], count);
    return count.value;
}

/**
 * 以猜前三为例
 * pk10猜前数调用方法
 *
 * @param str：1,2,10-1,2,3,10-5,6,7,10分隔后的数组
 * @param p：123次循环
 * @param specialValue：指定的第几个循环为最后一个
 */
export function caclQSxuhuan(str, p, specialValue, set, count) {
    const s= trimArr(str[p - 1],',',1);
    try{
        for (var i = 0; i < s.length; i++) {
            if(set.indexOf(s[i]) == -1){
                set.push(s[i]);
            }
            if (p == specialValue) {  // 第3此循环
                if (set.length == specialValue) {
                    count.value = count.value + 1;
                    set.splice(set.indexOf(s[i]), 1);
                }
            } else { //小于3次的循环
                if (set.length == p) {   //p=2,size=2代表添加了两个不同的数
                    caclQSxuhuan(str, p + 1, specialValue, set, count);
                    set.splice(set.indexOf(s[i]), 1);
                }
            }
        }
    }
    catch(err) {
        const count = {value:0};
    }

}

/**
 * 例如：11xuan5
 *
 * @param value：1,2,3-3,4,5,6
 * @param num:任选几胆拖
 * @return
 */
export function m11x5RXDT(value, num) {
    const reg10=new RegExp('10','g');
    const reg11=new RegExp('11','g');
    value = value.replace(reg10, "a").replace(reg11, "b");
    const str =  trimArr(value,'-',1);
    const danma = trimArr(str[0],',',1);   //胆码
    var tuoma = str[1].replace(/,/g, "");   //5678ab
    for (var i = 0; i < danma.length; i++) {
        const reg=new RegExp(danma[i],'g');
        tuoma = tuoma.replace(reg, "");
    }
    const count = ComAndArrangeUtil.combination(tuoma.length, num - danma.length);
    return Math.floor(count);
}
export function xy28_tmb3_b3(value) {
    return value.length>=3?value.length/3:0;
}
export function xglhc_lxlw_5lw(value) {
    return value.length>=5?1:0;
}
export function xglhc_lm_3z2(value,callee) {
    console.log(callee)
    return value.length>=5?1:0;
}
// test function
export function getZhuShu(name,value){
    let numIndex = name.lastIndexOf('_')+1;
    let num = name.substr(numIndex,1)
    return value.length >= num ? 1 : 0;
}