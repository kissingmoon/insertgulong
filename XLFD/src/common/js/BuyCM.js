import * as BuyUtil from 'common/js/BuyUtil.js';

export function BaseVM(wfBeanParam,position,is28OrLhcOld,shengXiaoLHCRecvListParam) {
    const TYPE_CIRCLE = 1;
    const TYPE_ROUND_RECT = 2;
    const TYPE_WHOLE_ROUND_RECT = 3;
    const TYPE_NEW_K3 = 4;
    const str0 = ["十个", "百个", "百十", "千个", "千十", "千百", "万个", "万十", "万百", "万千"];
    const str1 = ["龙", "虎", "合"];
    const str8 = ["龙", "虎"];
    const str2 = ["大", "小", "单", "双"];
    const str3 = ["5单0双", "4单1双", "3单2双", "2单3双", "1单4双", "0单5双"];
    const str4 = ["11*", "22*", "33*", "44*", "55*", "66*"];
    const str5 = ["111", "222", "333", "444", "555", "666"];
    const str6 = ["123", "234", "345", "456"];
    let wfBean = wfBeanParam || {};
    let shengXiaoLHCRecvList = shengXiaoLHCRecvListParam || []; //生肖容器
    let is28OrLhc = is28OrLhcOld;  // 是不是6或新28
    let buyNumberBeanList = [];  // 号码容器
    let isShowOdds = true;  // 是否显示顶部赔率
    let isCanTopFastPick = false;           // 是否显示位置（顶部圆圈，时时彩）
    let isShowSign = false;                  // 是否显示最左侧的名字
    let isCanBottomFastPick = false;        // 是否可以快速选择，即下方的全、大、小、双、单、清按钮是否可见
    let backgroundType = TYPE_CIRCLE;  //定义号码背景形状，1 = 圆形 ， 2 方形，3 = 长园形
    
    switch (wfBean.wf_flag) {
        case "ssc_lhd":
            buyNumberBeanList = position == 0 ? BuyUtil.initDataStr(str0) : BuyUtil.initDataStr(str1);
            isCanTopFastPick = false;
            isShowSign = true;
            isCanBottomFastPick = false;
            break;
        case "ssc_dxds_q2":case "ssc_dxds_h2":case "ssc_dxds_q3":case "ssc_dxds_h3":
        case "pk10_dxds_gj":case "pk10_dxds_yj":case "pk10_dxds_jj":
            buyNumberBeanList = BuyUtil.initDataStr(str2);
            isCanTopFastPick = false;
            isShowSign = true;
            isCanBottomFastPick = false;
            break;
        case "21312312":
            buyNumberBeanList = BuyUtil.initDataNum(wfBean.param.begin, wfBean.param.end);
            isCanTopFastPick = position == 0;
            isShowSign = true;
            isCanBottomFastPick = false;
            break;
        case "ssc_r3zux_z3fs":case "ssc_r3zux_z6hz":case "ssc_r3zux_hz":case "ssc_r4zux_24":
        case "ssc_r4zux_12":case "ssc_r4zux_6":case "ssc_r4zux_4":case "ssc_r2zux_fs":
            buyNumberBeanList = BuyUtil.initDataNum(wfBean.param.begin, wfBean.param.end);
            isCanTopFastPick = position == 0;
            isShowSign = true;
            isCanBottomFastPick = true;
            break;
        case "ssc_r2zhix_hz":case "ssc_r3zhix_hz":case "ssc_r2zux_hz":
            buyNumberBeanList = BuyUtil.initDataNum(wfBean.param.begin,  wfBean.param.end);
            isCanTopFastPick = true;
            isShowSign = true;
            isCanBottomFastPick = true;
            break;
        case "11x5_qwx_dds":
            buyNumberBeanList = BuyUtil.initDataStr(str3);
            isCanTopFastPick = false;
            isShowSign = false;
            isCanBottomFastPick = false;
            backgroundType = TYPE_WHOLE_ROUND_RECT;
            break;
        //这里开始自己写
        //二不同标准
        case "k3_2bth_bz":case "k3_3bth_bz":
            buyNumberBeanList = BuyUtil.initDataNum(wfBean.param.begin, wfBean.param.end);
            isCanTopFastPick = false;
            isCanBottomFastPick = false;
            backgroundType = TYPE_NEW_K3;
            break;
        //二不同胆拖
        case "k3_2bth_dt":case "k3_3bth_dt":
            buyNumberBeanList = BuyUtil.initDataNum(wfBean.param.begin, wfBean.param.end);
            isCanBottomFastPick = true;
            isShowSign = true;
            backgroundType = TYPE_NEW_K3;
            break;
        //三同号通选
        case "k3_3th_thtx":
            buyNumberBeanList = BuyUtil.initDataStr(str5);
            backgroundType = 5;
            break;
        //三连号通选
        case "k3_3th_lhtx":
            buyNumberBeanList = BuyUtil.initDataStr(str6);
            backgroundType = 5;
            break;
        //三同号单选
        case "k3_3th_dx":
            buyNumberBeanList = BuyUtil.initDataStr(str5);
            isCanTopFastPick = false;
            isShowSign = false;
            isCanBottomFastPick = false;
            backgroundType = TYPE_NEW_K3;
            break;
            //三不同和值
        case "k3_3bth_hz":
            buyNumberBeanList = BuyUtil.initDataNum(wfBean.param.begin, wfBean.param.end);
            isShowSign = true;
            isCanBottomFastPick = true;
            backgroundType = TYPE_NEW_K3;
            break;
        //和值
        case "k3_hz_hz":
            buyNumberBeanList = BuyUtil.initDataNum(wfBean.param.begin, wfBean.param.end);
            buyNumberBeanList.map((v,k)=>{
                var num=v.number<11?v.number:(21-v.number)
                v=Object.assign(v,{pl:wfBean.wf_pl[num-3].award_money});
            })
            backgroundType = 6;
            break;
        //暂时没用
        case "k3_2th_fx":
            buyNumberBeanList = BuyUtil.initDataStr(str4);
            isCanTopFastPick = false;
            isShowSign = true;
            isCanBottomFastPick = false;
            break;
        
        
        case "k3_2th_bz":
            buyNumberBeanList = BuyUtil.initDataNum(1, 6);
            isCanTopFastPick = false;
            isShowSign = true;
            isCanBottomFastPick = true;
            break;
        
        case "xglhc_tema_xuma":case "xglhc_zhma_xm":case "xglhc_zhmat_z1t":case "xglhc_zhmat_z2t":
        case "xglhc_zhmat_z3t":case "xglhc_zhmat_z4t":case "xglhc_zhmat_z5t":case "xglhc_zhmat_z6t":case "xy28_tmtm_tm":
            buyNumberBeanList = BuyUtil.initDataLHCPL(wfBean.wf_pl,wfBean.wf_flag,wfBean.name);
            isCanTopFastPick = false;
            isShowSign = false;
            isCanBottomFastPick = false;
            break;
        // 3个矩形
        case "xglhc_tema_qita":case "xglhc_sebo_banbo":case "xglhc_sebo_bbanbo":case "xglhc_tws_tws":
        case "xglhc_zhma_qt":case "xglhc_zhmat_z1tdx":case "xglhc_zhmat_z2tdx":case "xglhc_zhmat_z6tdx":
        case "xglhc_zhmat_z3tdx":case "xglhc_zhmat_z4tdx":case "xglhc_zhmat_z5tdx":case "xglhc_zhma1d6_zm1":
        case "xglhc_zhma1d6_zm2":case "xglhc_zhma1d6_zm3":case "xglhc_zhma1d6_zm4":case "xglhc_zhma1d6_zm5":
        case "xglhc_zhma1d6_zm6":case "xglhc_7sebo_7sb":case "xglhc_zoxiao_zx":case "xy28_qthh_hh":
        case "xy28_qtbz_bz":
            buyNumberBeanList = BuyUtil.initDataLHCPL(wfBean.wf_pl,wfBean.wf_flag,wfBean.name);
            isCanTopFastPick = false;
            isShowSign = false;
            isCanBottomFastPick = false;
            backgroundType = TYPE_WHOLE_ROUND_RECT;
            break;
        // 方形色波
        case "xglhc_sebo_sebo":case "xy28_qtbs_bs":
            buyNumberBeanList = BuyUtil.initDataBy(1, wfBean.wf_pl,wfBean.wf_flag,wfBean.name);
            isCanTopFastPick = false;
            isShowSign = false;
            isCanBottomFastPick = false;
            backgroundType = TYPE_ROUND_RECT;
            break;
        // 生肖
        case "xglhc_texiao_tx":case "xglhc_pt1xws_1x":case "xglhc_zhxiao_zx":case "xglhc_lxlw_3lx":
        case "xglhc_lxlw_4lx":case "xglhc_lxlw_5lx":
            buyNumberBeanList = BuyUtil.initShengxiaoData(8, shengXiaoLHCRecvList, wfBean.wf_pl,wfBean.wf_flag,wfBean.name);  // 现在替换成从服务器动态获取
            isCanTopFastPick = false;
            isShowSign = false;
            isCanBottomFastPick = false;
            backgroundType = TYPE_ROUND_RECT;
            break;
        // 生肖
        case "xglhc_lxlw_2lx":
            buyNumberBeanList = BuyUtil.initShengxiaoData(8, shengXiaoLHCRecvList, wfBean.wf_pl,wfBean.wf_flag,wfBean.name);  // 现在替换成从服务器动态获取
            isCanTopFastPick = false;
            isShowSign = false;
            isCanBottomFastPick = false;
            backgroundType = TYPE_ROUND_RECT;
            break;
        // 合肖
        case "xglhc_hexiao_hx":
            buyNumberBeanList = BuyUtil.initShengxiaoData(7, shengXiaoLHCRecvList, wfBean.wf_pl,wfBean.wf_flag,wfBean.name);  // 现在替换成从服务器动态获取
            isCanTopFastPick = false;
            isShowSign = false;
            isCanBottomFastPick = false;
            backgroundType = TYPE_ROUND_RECT;
            isShowOdds = false;
            break;
        // 五行
        case "xglhc_wuxing_wx":
            buyNumberBeanList = BuyUtil.initDataBy(3, wfBean.wf_pl,wfBean.wf_flag,wfBean.name);
            isCanTopFastPick = false;
            isShowSign = false;
            isCanBottomFastPick = false;
            backgroundType = TYPE_ROUND_RECT;
            break;
        // 尾数
        case "xglhc_pt1xws_ws":
            buyNumberBeanList = BuyUtil.initDataBy(9, wfBean.wf_pl,wfBean.wf_flag,wfBean.name);
            isCanTopFastPick = false;
            isShowSign = false;
            isCanBottomFastPick = false;
            break;
        // 尾数
        case "xglhc_lxlw_2lw":case "xglhc_lxlw_3lw":case "xglhc_lxlw_4lw":case "xglhc_lxlw_5lw":
            buyNumberBeanList = BuyUtil.initDataBy(9, wfBean.wf_pl,wfBean.wf_flag,wfBean.name);
            isCanTopFastPick = false;
            isShowSign = false;
            isCanBottomFastPick = false;
            break;
        case "xglhc_lm_3z2":case "xglhc_lm_3qz":case "xglhc_lm_2qz":
        case "xglhc_lm_2zt":case "xglhc_lm_tc":case "xglhc_lm_4qz":
            buyNumberBeanList = BuyUtil.initDataBy(5, wfBean.wf_pl,wfBean.wf_flag,wfBean.name);
            isCanTopFastPick = false;
            isShowSign = false;
            isCanBottomFastPick = false;
            isShowOdds = false;
            break;
        case "xglhc_zxbz_zxbz":
            buyNumberBeanList = BuyUtil.initDataBy(5, wfBean.wf_pl,wfBean.wf_flag,wfBean.name);
            isCanTopFastPick = false;
            isShowSign = false;
            isCanBottomFastPick = false;
            isShowOdds = true;
            break;
        case "xy28_tmb3_b3":
            buyNumberBeanList = BuyUtil.initDataBy(6, wfBean.wf_pl,wfBean.wf_flag,wfBean.name);
            isCanTopFastPick = false;
            isShowSign = false;
            isCanBottomFastPick = false;
            isShowOdds = false;
            break;
        case "pk10_lhd":
            buyNumberBeanList = BuyUtil.initPk10_lhdData(str8,position);
            isCanTopFastPick = false;
            isShowSign = true;
            isCanBottomFastPick = false;
            break;
        default:
            buyNumberBeanList = BuyUtil.initDataNum(wfBean.param.begin, wfBean.param.end);
            isCanTopFastPick = false;
            isShowSign = true;
            isCanBottomFastPick = true;
            break;
    }
    return {
                wfBean,
                is28OrLhc,
                buyNumberBeanList,
                isCanTopFastPick,
                isShowSign,
                isCanBottomFastPick,
                backgroundType,
                isShowOdds
            }
    
}