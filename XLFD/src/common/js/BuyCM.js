import * as BuyUtil from 'BuyUtil.js';

export function BaseVM(wfBeanParam,shengXiaoLHCRecvListParam,is28OrLhc,position) {
    const str0 = ["十个", "百个", "百十", "千个", "千十", "千百", "万个", "万十", "万百", "万千"];
    const str1 = ["龙", "虎", "合"];
    const str8 = ["龙", "虎"];
    const str2 = ["大", "小", "单", "双"];
    const str3 = ["5单0双", "4单1双", "3单2双", "2单3双", "1单4双", "0单5双"];
    const str4 = ["11*", "22*", "33*", "44*", "55*", "66*"];
    const str5 = ["111", "222", "333", "444", "555", "666"];
    const str6 = ["123", "234", "345", "456"];
    const str7 = ["1", "2", "3", "4"];
    const wfBean = wfBeanParam || {};
    const shengXiaoLHCRecvList = shengXiaoLHCRecvListParam || []; //生肖容器
    const is28OrLhc = is28OrLhc; // 是不是6或新28
    const buyNumberBeanList = []; // 号码容器
    const topPickFlags = [0,0,0,0,0]; // 标记是否选中位置（顶部圆圈，时时彩）
    const lineColumnCount = 0;                // 每行显示几个，0表示不限制
    const isCanTopFastPick = false;           // 是否显示位置（顶部圆圈，时时彩）
    const isShowSign = false;                  // 是否显示最左侧的名字
    const isCanBottomFastPick = false;        // 是否可以快速选择，即下方的全、大、小、双、单、清按钮是否可见
    const backgroundType = TYPE_CIRCLE; //定义号码背景形状，1 = 圆形 ， 2 = 大方形 3 = 小方形；4 = 长园形
    let TYPE_CIRCLE = 1;
    let TYPE_ROUND_RECT = 2;
    let TYPE_ROUND_HALF_RECT = 3;
    let TYPE_WHOLE_ROUND_RECT = 4;

    switch (wfBean.wf_flag) {
        case "ssc_lhd":
            buyNumberBeanList = position == 0 ? BuyUtil.initDataStr(str0) : BuyUtil.initDataStr(str1);
            lineColumnCount = 6;
            isCanTopFastPick = false;
            isShowSign = true;
            isCanBottomFastPick = false;
            break;
        case "ssc_dxds_q2":case "ssc_dxds_h2":case "ssc_dxds_q3":case "ssc_dxds_h3":
        case "pk10_dxds_gj":case "pk10_dxds_yj":case "pk10_dxds_jj":
            buyNumberBeanList = BuyUtil.initDataStr(str2);
            lineColumnCount = 6;
            isCanTopFastPick = false;
            isShowSign = true;
            isCanBottomFastPick = false;
            break;
        case "21312312":
            buyNumberBeanList = BuyUtil.initDataNum(wfBean.param.begin, wfBean.param.end);
            isCanTopFastPick = position == 0;
            lineColumnCount = 6;
            isShowSign = true;
            isCanBottomFastPick = false;
            break;
        case "ssc_r3zux_z3fs":case "ssc_r3zux_z6hz":case "ssc_r3zux_hz":case "ssc_r4zux_24":
        case "ssc_r4zux_12":case "ssc_r4zux_6":case "ssc_r4zux_4":case "ssc_r2zux_fs":
            buyNumberBeanList = BuyUtil.initDataNum(wfBean.param.begin, wfBean.param.end);
            lineColumnCount = 6;
            isCanTopFastPick = position == 0;
            isShowSign = true;
            isCanBottomFastPick = true;
            break;
        case "ssc_r2zhix_hz":case "ssc_r3zhix_hz":case "ssc_r2zux_hz":
            buyNumberBeanList = BuyUtil.initDataNum(wfBean.param.begin,  wfBean.param.end);
            lineColumnCount = 6;
            isCanTopFastPick = true;
            isShowSign = true;
            isCanBottomFastPick = true;
            break;
        case "11x5_qwx_dds":
            buyNumberBeanList = BuyUtil.initDataStr(str3);
            lineColumnCount = 3;
            isCanTopFastPick = false;
            isShowSign = true;
            isCanBottomFastPick = false;
            break;
        case "k3_2th_fx":
            buyNumberBeanList = BuyUtil.initDataStr(str4);
            lineColumnCount = 6;
            isCanTopFastPick = false;
            isShowSign = true;
            isCanBottomFastPick = false;
            break;
        case "k3_3th_dx":
            buyNumberBeanList = BuyUtil.initDataStr(str5);
            lineColumnCount = 6;
            isCanTopFastPick = false;
            isShowSign = true;
            isCanBottomFastPick = false;
            break;
        case "k3_3th_thtx":
            buyNumberBeanList = BuyUtil.initDataStr(str5);
            lineColumnCount = 6;
            isCanTopFastPick = false;
            isShowSign = true;
            isCanBottomFastPick = false;
            break;
        case "k3_3th_lhtx":
            buyNumberBeanList = BuyUtil.initDataStr(str6);
            lineColumnCount = 6;
            isCanTopFastPick = false;
            isShowSign = true;
            isCanBottomFastPick = false;
            break;
        case "k3_2th_bz":
            buyNumberBeanList = BuyUtil.initDataNum(1, 6);
            lineColumnCount = 6;
            isCanTopFastPick = false;
            isShowSign = true;
            isCanBottomFastPick = true;
            break;
        case "xglhc_tema_xuma":case "xglhc_zhma_xm":case "xglhc_zhmat_z1t":case "xglhc_zhmat_z2t":
        case "xglhc_zhmat_z3t":case "xglhc_zhmat_z4t":case "xglhc_zhmat_z5t":case "xglhc_zhmat_z6t":case "xy28_tmtm_tm":
            buyNumberBeanList = BuyUtil.initDataLHCPL(wfBean.wf_pl);
            lineColumnCount = 6;
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
            buyNumberBeanList = BuyUtil.initDataLHCPL(wfBean.wf_pl);
            lineColumnCount = 3;
            isCanTopFastPick = false;
            isShowSign = false;
            isCanBottomFastPick = false;
            backgroundType = TYPE_WHOLE_ROUND_RECT;
            break;
        // 方形色波
        case "xglhc_sebo_sebo":case "xy28_qtbs_bs":
            buyNumberBeanList = BuyUtil.initDataBy(1, wfBean.wf_pl);
            lineColumnCount = 3;
            isCanTopFastPick = false;
            isShowSign = false;
            isCanBottomFastPick = false;
            backgroundType = TYPE_ROUND_RECT;
            break;
        // 生肖
        case "xglhc_texiao_tx":case "xglhc_pt1xws_1x":case "xglhc_zhxiao_zx":case "xglhc_lxlw_3lx":
        case "xglhc_lxlw_4lx":case "xglhc_lxlw_5lx":
            buyNumberBeanList = BuyUtil.initShengxiaoData(8, shengXiaoLHCRecvList, wfBean.wf_pl);  // 现在替换成从服务器动态获取
            lineColumnCount = 3;
            isCanTopFastPick = false;
            isShowSign = false;
            isCanBottomFastPick = false;
            backgroundType = TYPE_ROUND_HALF_RECT;
            break;
        // 生肖
        case "xglhc_lxlw_2lx":
            buyNumberBeanList = BuyUtil.initShengxiaoData(8, shengXiaoLHCRecvList, wfBean.wf_pl);  // 现在替换成从服务器动态获取
            lineColumnCount = 3;
            isCanTopFastPick = false;
            isShowSign = false;
            isCanBottomFastPick = false;
            backgroundType = TYPE_ROUND_HALF_RECT;
            break;
        // 合肖
        case "xglhc_hexiao_hx":
            buyNumberBeanList = BuyUtil.initShengxiaoData(7, shengXiaoLHCRecvList, wfBean.wf_pl);  // 现在替换成从服务器动态获取
            lineColumnCount = 3;
            isCanTopFastPick = false;
            isShowSign = false;
            isCanBottomFastPick = false;
            backgroundType = TYPE_ROUND_HALF_RECT;
            break;
        // 五行
        case "xglhc_wuxing_wx":
            buyNumberBeanList = BuyUtil.initDataBy(3, wfBean.wf_pl);
            lineColumnCount = 3;
            isCanTopFastPick = false;
            isShowSign = false;
            isCanBottomFastPick = false;
            backgroundType = TYPE_ROUND_RECT;
            break;
        // 尾数
        case "xglhc_pt1xws_ws":
            buyNumberBeanList = BuyUtil.initDataBy(9, wfBean.wf_pl);
            lineColumnCount = 7;
            isCanTopFastPick = false;
            isShowSign = false;
            isCanBottomFastPick = false;
            break;
        // 尾数
        case "xglhc_lxlw_2lw":case "xglhc_lxlw_3lw":case "xglhc_lxlw_4lw":case "xglhc_lxlw_5lw":
            buyNumberBeanList = BuyUtil.initDataBy(9, wfBean.wf_pl);
            lineColumnCount = 7;
            isCanTopFastPick = false;
            isShowSign = false;
            isCanBottomFastPick = false;
            break;
        case "xglhc_zxbz_zxbz":case "xglhc_lm_3z2":case "xglhc_lm_3qz":case "xglhc_lm_2qz":
        case "xglhc_lm_2zt":case "xglhc_lm_tc":case "xglhc_lm_4qz":
            buyNumberBeanList = BuyUtil.initDataBy(5, wfBean.wf_pl);
            lineColumnCount = 7;
            isCanTopFastPick = false;
            isShowSign = false;
            isCanBottomFastPick = false;
            break;
        case "xy28_tmb3_b3":
            buyNumberBeanList = BuyUtil.initDataBy(6, wfBean.wf_pl);
            lineColumnCount = 7;
            isCanTopFastPick = false;
            isShowSign = false;
            isCanBottomFastPick = false;
            break;
        case "pk10_lhd":
            buyNumberBeanList = BuyUtil.initPk10_lhdData(str8,position);
            lineColumnCount = 6;
            isCanTopFastPick = false;
            isShowSign = true;
            isCanBottomFastPick = false;
            break;
        default:
            buyNumberBeanList = BuyUtil.initDataNum(wfBean.param.begin, wfBean.param.end);
            lineColumnCount = 6;
            isCanTopFastPick = false;
            isShowSign = true;
            isCanBottomFastPick = true;
            break;
    }
    return {
                wfBean,
                shengXiaoLHCRecvList,
                is28OrLhc,
                buyNumberBeanList,
                lineColumnCount,
                isCanTopFastPick,
                isShowSign,
                isCanBottomFastPick,
                backgroundType
            }
    
    // function selectFastPick(type) {
    //     BuyUtil.updateListByStatus(buyNumberBeanList, type);
    // }


}