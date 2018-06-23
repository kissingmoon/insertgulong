export default {
  "ssc": {
    "num_min": 0,
    "num_max": 9,
    "num_len": 1,
    "run_num_length": 5,
    "wf_class": {
      "wf_5x": {
        "title": "五星",
        "ssc_5xzhix_fs": {
            "title": "五星直选复式",
            "param": {
                "titles": [
                "万位",
                "千位",
                "百位",
                "十位",
                "个位"
                ],
                "begin": 0,
                "end": 9,
                "row_num_count": 10
            },
            "calculate": {
                "method": "formula_num_multiply"
            },
            "explain": "从万位、千位、百位、十位、个位各选一个号码组成一注。",
            "example": "投注方案：12345<br>开奖号码：12345，即中五星直选。",
            "help": "从万位、千位、百位、十位、个位中选择一个5位数号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。"
        },
        "ssc_5xzhix_zh": {
          "title": "五星直选组合",
          "param": {
            "titles": [
              "万位",
              "千位",
              "百位",
              "十位",
              "个位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_num_multiply"
          },
          "explain": "从万位、千位、百位、十位、个位各选一个号码组成五注。",
          "example": "投注方案：购买：4+5+6+7+8，该票共10元，由以下5注：45678(五星)、5678(四星)、678(三星)、78(二星)、8(一星)构成。开奖号码：45678，即可中五星、四星、三星、二星、一星各1注。",
          "help": "从万位、千位、百位、十位、个位中至少各选一个号码组成1-5星的组合，共五注，所选号码的个位与开奖号码相同，则中1个5等奖；所选号码的个位、十位与开奖号码相同，则中1个5等奖以及1个4等奖，依此类推，最高可中5个奖。"
        },
        "ssc_5xzux_120": {
          "title": "五星组选120",
          "param": {
            "titles": [
              "组选120"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 5
          },
          "explain": "从0-9中选择5个号码组成一注。",
          "example": "投注方案：10568开奖号码：10568（顺序不限），即可中五星组选120。",
          "help": "从0-9中任意选择5个号码组成一注，所选号码与开奖号码的万位、千位、百位、十位、个位相同，顺序不限，即为中奖。"
        },
        "ssc_5xzux_60": {
          "title": "五星组选60",
          "param": {
            "titles": [
              "二重号",
              "单号"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_one_more",
            "oneRow": 0,
            "moreRow": 1,
            "base_len": 3
          },
          "explain": "从“二重号”选择一个号码，“单号”中选择三个号码组成一注。",
          "example": "投注方案：二重号：8；单号：016开奖号码：01688（顺序不限），即可中五星组选60。",
          "help": "选择1个二重号码和3个单号号码组成一注，所选的单号号码与开奖号码相同，且所选二重号码在开奖号码中出现了2次，即为中奖。"
        },
        "ssc_5xzux_30": {
          "title": "五星组选30",
          "param": {
            "titles": [
              "二重号",
              "单号"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_one_more",
            "oneRow": 1,
            "moreRow": 2,
            "base_len": 1
          },
          "explain": "从“二重号”选择两个号码，“单号”中选择一个号码组成一注。",
          "example": "投注方案：二重号：68；单号：0<br/>开奖号码：06688（顺序不限），即可中五星组选30。",
          "help": "选择2个二重号和1个单号号码组成一注，所选的单号号码与开奖号码相同，且所选的2个二重号码分别在开奖号码中出现了2次，即为中奖。"
        },
        "ssc_5xzux_20": {
          "title": "五星组选20",
          "param": {
            "titles": [
              "三重号",
              "单号"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_one_more",
            "oneRow": 0,
            "moreRow": 1,
            "base_len": 2
          },
          "explain": "从“三重号”选择一个号码，“单号”中选择两个号码组成一注。",
          "example": "投注方案：三重号：8；单号：01<br/>开奖号码：01888（顺序不限），即可中五星组选20。",
          "help": "选择1个三重号码和2个单号号码组成一注，所选的单号号码与开奖号码相同，且所选三重号码在开奖号码中出现了3次，即为中奖。"
        },
        "ssc_5xzux_10": {
          "title": "五星组选10",
          "param": {
            "titles": [
              "三重号",
              "单号"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_one_more",
            "oneRow": 0,
            "moreRow": 1,
            "base_len": 1
          },
          "explain": "从“三重号”选择一个号码，“二重号”中选择一个号码组成一注。",
          "example": "投注方案：三重号：8；二重号：1<br/>开奖号码：11888（顺序不限），即可中五星组选10。",
          "help": "选择1个三重号码和1个二重号码，所选三重号码在开奖号码中出现3次，并且所选二重号码在开奖号码中出现了2次，即为中奖。"
        },
        "ssc_5xzux_5": {
          "title": "五星组选5",
          "param": {
            "titles": [
              "四重号",
              "单号"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_one_more",
            "oneRow": 0,
            "moreRow": 1,
            "base_len": 1
          },
          "explain": "从“四重号”选择一个号码，“单号”中选择一个号码组成一注。",
          "example": "投注方案：四重号：8；单号：1开奖号码：18888（顺序不限），即可中五星组选5。",
          "help": "选择1个四重号码和1个单号号码组成一注，所选的单号存在于开奖号码中，且所选四重号码在开奖号码中出现了4次，即为中奖。"
        },
        "ssc_5xts_yffs": {
          "title": "一帆风顺",
          "param": {
            "titles": [
              "一帆风顺"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_num_count"
          },
          "explain": "从0-9中任意选择一个以上号码。",
          "example": "投注方案：8<br/>开奖号码：至少出现1个8，即中一帆风顺。",
          "help": "从0-9中任意选择1个号码组成一注，只要开奖号码的万位、千位、百位、十位、个位中包含所选号码，即为中奖。"
        },
        "ssc_5xts_hscs": {
          "title": "好事成双",
          "param": {
            "titles": [
              "好事成双"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_num_count"
          },
          "explain": "从0-9中任意选择一个以上的二重号码。",
          "example": "投注方案：8开奖号码：至少出现2个8，即中好事成双。",
          "help": "从0-9中任意选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现2次，即为中奖。"
        },
        "ssc_5xts_sxbx": {
          "title": "三星报喜",
          "param": {
            "titles": [
              "三星报喜"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_num_count"
          },
          "explain": "从0-9中任意选择一个以上的三重号码。",
          "example": "投注方案：8<br/>开奖号码：至少出现3个8，即中三星报喜。",
          "help": "从0-9中任意选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现3次，即为中奖。"
        },
        "ssc_5xts_sjfc": {
          "title": "四季发财",
          "param": {
            "titles": [
              "四季发财"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_num_count"
          },
          "explain": "从0-9中任意选择一个以上的四重号码。",
          "example": "投注方案：8<br/>开奖号码：至少出现4个8，即中四季发财。",
          "help": "从0-9中任意选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现4次，即为中奖。"
        }
      },
      "wf_4x": {
        "title": "四星",
        "ssc_4xzhix_qszhixfs": {
          "title": "前四直选复式",
          "param": {
            "titles": [
              "万位",
              "千位",
              "百位",
              "十位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_num_multiply"
          },
          "explain": "从万位、千位、百位、十位各选一个号码组成一注。",
          "example": "投注方案：3456<br/>开奖号码：3456，即中四星直选。",
          "help": "从万位、千位、百位、十位中选择一个4位数号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。"
        },
        "ssc_4xzhix_qszhixzh": {
          "title": "前四直选组合",
          "param": {
            "titles": [
              "万位",
              "千位",
              "百位",
              "十位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_group"
          },
          "explain": "从万位、千位、百位、十位各选一个号码组成四注。",
          "example": "投注方案：<br/>购买：5+6+7+8，该票共8元，由以下4注：5678(四星)、678(三星)、78(二星)、8(一星)构成。<br/>开奖号码：5678，即可中四星、三星、二星、一星各1注。",
          "help": "从万位、千位、百位、十位中至少各选一个号码组成1-4星的组合，共四注，所选号码的个位与开奖号码相同，则中1个4等奖；所选号码的十位、百位与开奖号码相同，则中1个4等奖以及1个3等奖，依此类推，最高可中4个奖。"
        },
        "ssc_4xzhix_hszhixfs": {
          "title": "后四直选复式",
          "param": {
            "titles": [
              "千位",
              "百位",
              "十位",
              "个位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_num_multiply"
          },
          "explain": "从千位、百位、十位、个位各选一个号码组成一注。",
          "example": "投注方案：3456<br/>开奖号码：3456，即中四星直选。",
          "help": "从千位、百位、十位、个位中选择一个4位数号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。"
        },
        "ssc_4xzhix_hszhixzh": {
          "title": "后四直选组合",
          "param": {
            "titles": [
              "千位",
              "百位",
              "十位",
              "个位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_group"
          },
          "explain": "从千位、百位、十位、个位各选一个号码组成四注。",
          "example": "投注方案：<br/>购买：5+6+7+8，该票共8元，由以下4注：5678(四星)、678(三星)、78(二星)、8(一星)构成。<br/>开奖号码：5678，即可中四星、三星、二星、一星各1注。",
          "help": "从千位、百位、十位、个位中至少各选一个号码组成1-4星的组合，共四注，所选号码的个位与开奖号码相同，则中1个4等奖；所选号码的个位、十位与开奖号码相同，则中1个4等奖以及1个3等奖，依此类推，最高可中4个奖。"
        },
        "ssc_4xzux_qszux24": {
          "title": "前四组选24",
          "param": {
            "titles": [
              "组选24"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 4
          },
          "explain": "从0-9中选择4个号码组成一注。",
          "example": "投注方案：0568，开奖号码的四个数字只要包含0、5、6、8，即可中四星组选24。",
          "help": "从0-9中任意选择4个号码组成一注，所选号码与开奖号码的万位、千位、百位、十位相同，且顺序不限，即为中奖。"
        },
        "ssc_4xzux_qszux12": {
          "title": "前四组选12",
          "param": {
            "titles": [
              "二重号",
              "单号"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_one_more",
            "oneRow": 0,
            "moreRow": 1,
            "base_len": 2
          },
          "explain": "从“二重号”选择一个号码，“单号”中选择两个号码组成一注。",
          "example": "投注方案：二重号：8，单号：0、6，只要开奖的四个数字从小到大排列为 0、6、8、8，即可中四星组选12。",
          "help": "选择1个二重号码和2个单号号码组成一注，所选号码与开奖号码的万位、千位、百位、十位相同，且所选二重号码在开奖号码万位、千位、百位、十位中出现了2次，即为中奖。"
        },
        "ssc_4xzux_qszux6": {
          "title": "前四组选6",
          "param": {
            "titles": [
              "二重号"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 2
          },
          "explain": "从“二重号”选择两个号码组成一注。",
          "example": "投注方案：二重号：2、8，只要开奖的四个数字从小到大排列为 0、2、2、8、8，即可中四星组选6。",
          "help": "选择2个二重号码组成一注，所选的2个二重号码在开奖号码万位、千位、百位、十位分别出现了2次，即为中奖。"
        },
        "ssc_4xzux_qszux4": {
          "title": "前四组选4",
          "param": {
            "titles": [
              "三重号",
              "单号"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_one_more",
            "oneRow": 0,
            "moreRow": 1,
            "base_len": 1
          },
          "explain": "从“三重号”选择一个号码，“单号”中选择一个号码组成一注。",
          "example": "投注方案：三重号：8，单号：0、2，只要开奖的四个数字从小到大排列为 0、2、8、8、8，即可中四星组选4。",
          "help": "选择1个三重号码和1个单号号码组成一注，所选号码与开奖号码的万位、千位、百位、十位相同，且所选三重号码在开奖号码万位、千位、百位、十位中出现了3次，即为中奖。"
        },
        "ssc_4xzux_hszux24": {
          "title": "后四组选24",
          "param": {
            "titles": [
              "组选24"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 4
          },
          "explain": "从0-9中选择4个号码组成一注。",
          "example": "投注方案：0568，开奖号码的四个数字只要包含0、5、6、8，即可中四星组选24。",
          "help": "从0-9中任意选择4个号码组成一注，所选号码与开奖号码的千位、百位、十位、个位相同，且顺序不限，即为中奖。"
        },
        "ssc_4xzux_hszux12": {
          "title": "后四组选12",
          "param": {
            "titles": [
              "二重号",
              "单号"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_one_more",
            "oneRow": 0,
            "moreRow": 1,
            "base_len": 2
          },
          "explain": "从“二重号”选择一个号码，“单号”中选择两个号码组成一注。",
          "example": "投注方案：二重号：8，单号：0、6，只要开奖的四个数字从小到大排列为 0、6、8、8，即可中四星组选12。",
          "help": "选择1个二重号码和2个单号号码组成一注，所选号码与开奖号码的千位、百位、十位、个位相同，且所选二重号码在开奖号码千位、百位、十位、个位中出现了2次，即为中奖。"
        },
        "ssc_4xzux_hszux6": {
          "title": "后四组选6",
          "param": {
            "titles": [
              "二重号"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 2
          },
          "explain": "从“二重号”选择两个号码组成一注。",
          "example": "投注方案：二重号：2、8，只要开奖的四个数字从小到大排列为 0、2、2、8、8，即可中四星组选6。",
          "help": "选择2个二重号码组成一注，所选的2个二重号码在开奖号码千位、百位、十位、个位分别出现了2次，即为中奖。"
        },
        "ssc_4xzux_hszux4": {
          "title": "后四组选4",
          "param": {
            "titles": [
              "三重号",
              "单号"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_one_more",
            "oneRow": 0,
            "moreRow": 1,
            "base_len": 1
          },
          "explain": "从“三重号”选择一个号码，“单号”中选择一个号码组成一注。",
          "example": "投注方案：三重号：8，单号：0、2，只要开奖的四个数字从小到大排列为 0、2、8、8、8，即可中四星组选4。",
          "help": "选择1个三重号码和1个单号号码组成一注，所选号码与开奖号码的千位、百位、十位、个位相同，且所选三重号码在开奖号码千位、百位、十位、个位中出现了3次，即为中奖。"
        }
      },
      "wf_q3": {
        "title": "前三",
        "ssc_q3zhix_fs": {
          "title": "前三直选复式",
          "param": {
            "titles": [
              "万位",
              "千位",
              "百位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_num_multiply"
          },
          "explain": "从万位、千位、百位各选一个号码组成一注。",
          "example": "投注方案：345<br/>开奖号码：345，即中前三直选。",
          "help": "从万位、千位、百位中选择一个3位数号码组成一注，所选号码与开奖号码的前3位相同，且顺序一致，即为中奖。"
        },
        "ssc_q3zhix_zh": {
          "title": "前三直选组合",
          "param": {
            "titles": [
              "万位",
              "千位",
              "百位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_group"
          },
          "explain": "从万位、千位、百位各选一个号码组成三注。",
          "example": "投注方案：<br/>购买：6+7+8，该票共6元，由以下3注：678(三星)、78(二星)、8(一星)构成<br/>开奖号码：678，即可中三星、二星、一星各1注。",
          "help": "从万位、千位、百位中至少各选择一个号码组成1-3星的组合共三注，当百位号码与开奖号码相同，则中1个3等奖；如果百位与千位号码与开奖号码相同，则中1个3等奖以及1个2等奖，依此类推，最高可中3个奖。"
        },
        "ssc_q3zhix_hz": {
          "title": "前三直选和值",
          "param": {
            "titles": [
              "和值"
            ],
            "begin": 0,
            "end": 27,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_value_add",
            "value": "zhi_san",
            "num_separator": "$"
          },
          "explain": "从0-27中任意选择一个或一个以上号码。",
          "example": "投注方案：和值1<br/>开奖号码前三位：001,010,100,即中前三直选。",
          "help": "所选数值等于开奖号码的万位、千位、百位三个数字相加之和，即为中奖。"
        },
        "ssc_q3zhix_kd": {
          "title": "前三直选跨度",
          "param": {
            "titles": [
              "跨度"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_value_add",
            "value": "kd_san",
            "num_separator": ","
          },
          "explain": "从0-9中选择一个或一个以上号码。",
          "example": "投注方案：跨度8<br/>开奖号码前三位：(1)开出的三个数字包括0,8,x，其中x≠9，即可中前三直选;(2)开出的三个数字包括1,9,x，其中x≠0，即可中前三直选。",
          "help": "所选数值等于开奖号码的前3位最大与最小数字相减之差，即为中奖。"
        },
        "ssc_q3zux_q3zu3fs": {
          "title": "前三组三复式",
          "param": {
            "titles": [
              "组三"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_num_fold",
            "base_len": 2
          },
          "explain": "从0-9中任意选择2个或2个以上号码。",
          "example": "投注方案：5,8,8<br/>开奖号码前三位：1个5，2个8 (顺序不限)，即中前三组三。",
          "help": "从0-9中选择2个数字组成两注，所选号码与开奖号码的万位、千位、百位相同，且顺序不限，即为中奖。"
        },
        "ssc_q3zux_q3zu6fs": {
          "title": "前三组六复式",
          "param": {
            "titles": [
              "组六"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 3
          },
          "explain": "从0-9中任意选择3个或3个以上号码。",
          "example": "投注方案：2,5,8<br/>开奖号码前三位：1个2、1个5、1个8 (顺序不限)，即中前三组六。",
          "help": "从0-9中任意选择3个号码组成一注，所选号码与开奖号码的万位、千位、百位相同，顺序不限，即为中奖。"
        },
        "ssc_q3zux_q3zuxhz": {
          "title": "前三组选和值",
          "param": {
            "titles": [
              "和值"
            ],
            "begin": 1,
            "end": 26,
            "row_num_count": 13
          },
          "calculate": {
            "method": "formula_value_add",
            "value": "zu_san",
            "num_separator": "$"
          },
          "explain": "从1-26中任意选择一个或一个以上号码。",
          "example": "投注方案：和值3<br/>开奖号码前三位：(1)开出003号码，顺序不限，即中前三组三；(2)开出012号码，顺序不限，即中前三组六。",
          "help": "所选数值等于开奖号码万位、千位、百位三个数字相加之和(不含豹子号)，即为中奖。"
        },
        "ssc_q3zux_q3zuxbd": {
          "title": "前三组选包胆",
          "param": {
            "titles": [
              "包胆"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_count_fold",
            "bet": "54",
            "num_separator": "$"
          },
          "explain": "从0-9中任意选择一个号码。",
          "example": "投注方案：包胆3<br/>开奖号码前三位：(1)出现3xx或者33x,即中前三组三；(2)出现3xy，即中前三组六。",
          "help": "从0-9中任意选择1个包胆号码，开奖号码的万位、千位、百位中任意1位只要和所选包胆号码相同(不含豹子号)，即为中奖。"
        }
      },
      "wf_z3zhix": {
        "title": "中三",
        "ssc_z3zhix_fs": {
          "title": "中三直选复式",
          "param": {
            "titles": [
              "千位",
              "百位",
              "十位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_num_multiply"
          },
          "explain": "从千位、百位、十位各选一个号码组成一注。",
          "example": "投注方案：345<br/>开奖号码：345，即中中三直选。",
          "help": "从千位、百位、十位中选择一个3位数号码组成一注，所选号码与开奖号码后3位相同，且顺序一致，即为中奖。"
        },
        "ssc_z3zhix_zh": {
          "title": "中三直选组合",
          "param": {
            "titles": [
              "千位",
              "百位",
              "十位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_group"
          },
          "explain": "从千位、百位、十位各选一个号码组成三注。",
          "example": "投注方案：<br/>购买：6+7+8，该票共6元，由以下3注：678(三星)、78(二星)、8(一星)构成<br/>开奖号码：678，即可中三星、二星、一星各1注。",
          "help": "从千位、百位、十位中至少各选择一个号码组成1-3星的组合共三注，当个位号码与开奖号码相同，则中1个3等奖；如果个位与十位号码与开奖号码相同，则中1个3等奖以及1个2等奖，依此类推，最高可中3个奖。"
        },
        "ssc_z3zhix_hz": {
          "title": "中三直选和值",
          "param": {
            "titles": [
              "和值"
            ],
            "begin": 0,
            "end": 27,
            "row_num_count": 14
          },
          "calculate": {
            "method": "formula_value_add",
            "value": "zhi_san",
            "num_separator": "$"
          },
          "explain": "从0-27中任意选择一个或一个以上号码。",
          "example": "投注方案：和值1<br/>开奖号码中三位：001,010,100,即中中三直选。",
          "help": "所选数值等于开奖号码的千位、百位、十位三个数字相加之和，即为中奖。"
        },
        "ssc_z3zhix_kd": {
          "title": "中三直选跨度",
          "param": {
            "titles": [
              "跨度"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_value_add",
            "value": "kd_san",
            "num_separator": ","
          },
          "explain": "从0-9中选择一个以上号码。",
          "example": "投注方案：跨度8<br/>开奖号码中间三位：(1)开出的三个数字包括0,8,x，其中x≠9，即可中中三直选;(2)开出的三个数字包括1,9,x，其中x≠0，即可中中三直选。",
          "help": "所选数值等于开奖号码的中间3位最大与最小数字相减之差，即为中奖。"
        },
        "ssc_z3zux_z3zu3fs": {
          "title": "中三组三复式",
          "param": {
            "titles": [
              "组三"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_num_fold",
            "base_len": 2
          },
          "explain": "从0-9中任意选择2个或2个以上号码。",
          "example": "投注方案：5,8,8<br/>开奖号码中三位：1个5，2个8 (顺序不限)，即中中三组三。",
          "help": "从0-9中选择2个数字组成两注，所选号码与开奖号码的千位、百位、十位相同，且顺序不限，即为中奖。"
        },
        "ssc_z3zux_z3zu6fs": {
          "title": "中三组六复式",
          "param": {
            "titles": [
              "组六"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 3
          },
          "explain": "从0-9中任意选择3个或3个以上号码。",
          "example": "投注方案：2,5,8<br/>开奖号码中三位：1个2、1个5、1个8 (顺序不限)，即中中三组六。",
          "help": "从0-9中任意选择3个号码组成一注，所选号码与开奖号码的千位、百位、十位相同，顺序不限，即为中奖。"
        },
        "ssc_z3zux_z3zuxhz": {
          "title": "中三组选和值",
          "param": {
            "titles": [
              "和值"
            ],
            "begin": 1,
            "end": 26,
            "row_num_count": 13
          },
          "calculate": {
            "method": "formula_value_add",
            "value": "zu_san",
            "num_separator": "$"
          },
          "explain": "从1-26中任意选择一个或一个以上号码。",
          "example": "投注方案：和值3<br/>开奖号码中三位：(1)开出003号码，顺序不限，即中中三组三；(2)开出012号码，顺序不限，即中中三组六。",
          "help": "所选数值等于开奖号码千位、百位、十位三个数字相加之和(不含豹子号)，即为中奖。"
        },
        "ssc_z3zux_z3zuxbd": {
          "title": "中三组选包胆",
          "param": {
            "titles": [
              "包胆"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_count_fold",
            "bet": "54",
            "num_separator": "$"
          },
          "explain": "从0-9中任意选择一个号码。",
          "example": "投注方案：包胆3<br/>开奖号码中三位：(1)出现3xx或者33x,即中中三组三；(2)出现3xy，即中中三组六。",
          "help": "从0-9中任意选择1个包胆号码，开奖号码的千位、百位、十位中任意1位与所选包胆号码相同(不含豹子号)，即为中奖。"
        }
      },
      "wf_hs": {
        "title": "后三",
        "ssc_h3zhix_fs": {
          "title": "后三直选复式",
          "param": {
            "titles": [
              "百位",
              "十位",
              "个位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_num_multiply"
          },
          "explain": "从百位、十位、个位各选一个号码组成一注。",
          "example": "投注方案：345<br/>开奖号码：345，即中后三直选。",
          "help": "从百位、十位、个位中选择一个3位数号码组成一注，所选号码与开奖号码后3位相同，且顺序一致，即为中奖。"
        },
        "ssc_h3zhix_zh": {
          "title": "后三直选组合",
          "param": {
            "titles": [
              "百位",
              "十位",
              "个位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_group"
          },
          "explain": "从百位、十位、个位各选一个号码组成三注。",
          "example": "投注方案：<br/>购买：6+7+8，该票共6元，由以下3注：678(三星)、78(二星)、8(一星)构成<br/>开奖号码：678，即可中三星、二星、一星各1注。",
          "help": "从百位、十位、个位中至少各选择一个号码组成1-3星的组合共三注，当个位号码与开奖号码相同，则中1个3等奖；如果个位与十位号码与开奖号码相同，则中1个3等奖以及1个2等奖，依此类推，最高可中3个奖。"
        },
        "ssc_h3zhix_hz": {
          "title": "后三直选和值",
          "param": {
            "titles": [
              "和值"
            ],
            "begin": 0,
            "end": 27,
            "row_num_count": 14
          },
          "calculate": {
            "method": "formula_value_add",
            "value": "zhi_san",
            "num_separator": "$"
          },
          "explain": "从0-27中任意选择一个或一个以上号码。",
          "example": "投注方案：和值1<br/>开奖号码后三位：001,010,100,即中后三直选。",
          "help": "所选数值等于开奖号码的百位、十位、个位三个数字相加之和，即为中奖。"
        },
        "ssc_h3zhix_kd": {
          "title": "后三直选跨度",
          "param": {
            "titles": [
              "跨度"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_value_add",
            "value": "kd_san",
            "num_separator": ","
          },
          "explain": "从0-9中选择一个以上号码。",
          "example": "投注方案：跨度8<br/>开奖号码后三位：(1)开出的三个数字包括0,8,x，其中x≠9，即可中后三直选;(2)开出的三个数字包括1,9,x，其中x≠0，即可中后三直选。",
          "help": "所选数值等于开奖号码的后3位最大与最小数字相减之差，即为中奖。"
        },
        "ssc_h3zux_h3zu3fs": {
          "title": "后三组三复式",
          "param": {
            "titles": [
              "组三"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_num_fold",
            "base_len": 2
          },
          "explain": "从0-9中任意选择2个或2个以上号码。",
          "example": "投注方案：5,8,8<br/>开奖号码后三位：1个5，2个8 (顺序不限)，即中后三组三。",
          "help": "从0-9中选择2个数字组成两注，所选号码与开奖号码的百位、十位、个位相同，且顺序不限，即为中奖。"
        },
        "ssc_h3zux_h3zu6fs": {
          "title": "后三组六复式",
          "param": {
            "titles": [
              "组六"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 3
          },
          "explain": "从0-9中任意选择3个或3个以上号码。",
          "example": "投注方案：2,5,8<br/>开奖号码后三位：1个2、1个5、1个8 (顺序不限)，即中后三组六。",
          "help": "从0-9中任意选择3个号码组成一注，所选号码与开奖号码的百位、十位、个位相同，顺序不限，即为中奖。"
        },
        "ssc_h3zux_h3zuxhz": {
          "title": "后三组选和值",
          "param": {
            "titles": [
              "和值"
            ],
            "begin": 1,
            "end": 26,
            "row_num_count": 13
          },
          "calculate": {
            "method": "formula_value_add",
            "value": "zu_san",
            "num_separator": "$"
          },
          "explain": "从1-26中任意选择一个或一个以上号码。",
          "example": "投注方案：和值3<br/>开奖号码后三位：(1)开出003号码，顺序不限，即中后三组三；(2)开出012号码，顺序不限，即中后三组六。",
          "help": "所选数值等于开奖号码百位、十位、个位三个数字相加之和(不含豹子号)，即为中奖。"
        },
        "ssc_h3zux_h3zuxbd": {
          "title": "后三组选包胆",
          "param": {
            "titles": [
              "包胆"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_count_fold",
            "bet": "54",
            "num_separator": "$"
          },
          "explain": "从0-9中任意选择一个号码。",
          "example": "投注方案：包胆3<br/>开奖号码后三位：(1)出现3xx或者33x,即中后三组三；(2)出现3xy，即中后三组六。",
          "help": "从0-9中任意选择1个包胆号码，开奖号码的百位、十位、个位中任意1位与所选包胆号码相同(不含豹子号)，即为中奖。"
        }
      },
      "wf_q2": {
        "title": "前二",
        "ssc_q2zhix_fs": {
          "title": "前二直选复式",
          "param": {
            "titles": [
              "万位",
              "千位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_num_multiply"
          },
          "explain": "从万位、千位各选一个号码组成一注。",
          "example": "投注方案：58<br/>开奖号码前二位：58，即中前二直选。",
          "help": "从万位、千位中选择一个2位数号码组成一注，所选号码与开奖号码的前2位相同，且顺序一致，即为中奖。"
        },
        "ssc_q2zhix_hz": {
          "title": "前二直选和值",
          "param": {
            "titles": [
              "和值"
            ],
            "begin": 0,
            "end": 18,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_value_add",
            "value": "zhi_er",
            "num_separator": "$"
          },
          "explain": "从0-18中任意选择一个或一个以上号码。",
          "example": "投注方案：和值1<br/>开奖号码前二位：01,10，即中前二直选。",
          "help": "所选数值等于开奖号码的万位、千位二个数字相加之和，即为中奖。"
        },
        "ssc_q2zhix_kd": {
          "title": "前二直选跨度",
          "param": {
            "titles": [
              "跨度"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_value_add",
            "value": "kd_er",
            "num_separator": ","
          },
          "explain": "从0-9中选择一个或一个以上号码。",
          "example": "投注方案：跨度9<br/>开奖号码为9,0,-,-,-或0,9,-,-,-，即中前二直选。",
          "help": "所选数值等于开奖号码的前2位最大与最小数字相减之差，即为中奖。"
        },
        "ssc_q2zux_fs": {
          "title": "前二组选复式",
          "param": {
            "titles": [
              "组选"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 2
          },
          "explain": "从0-9中任意选择2个或2个以上号码。",
          "example": "投注方案：5,8<br/>开奖号码前二位：85 或58(顺序不限，不含对子号)，即中前二组选。",
          "help": "从0-9中选2个号码组成一注，所选号码与开奖号码的万位、千位相同，顺序不限（不含对子号），即中奖。"
        },
        "ssc_q2zux_hz": {
          "title": "前二组选和值",
          "param": {
            "titles": [
              "和值"
            ],
            "begin": 1,
            "end": 17,
            "row_num_count": 9
          },
          "calculate": {
            "method": "formula_value_add",
            "value": "zu_er",
            "num_separator": "$"
          },
          "explain": "从1-17中任意选择一个或一个以上号码。",
          "example": "投注方案：和值1<br/>开奖号码前二位：10或01 (顺序不限，不含对子号)，即中前二组选。",
          "help": "所选数值等于开奖号码的万位、千位二个数字相加之和（不含对子号），即为中奖。"
        },
        "ssc_q2zux_bd": {
          "title": "前二组选包胆",
          "param": {
            "titles": [
              "包胆"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_count_fold",
            "bet": 9,
            "num_separator": "$"
          },
          "explain": "从0-9中任意选择一个号码。",
          "example": "投注方案：包胆号码8<br/>开奖号码前二位：出现1个8（不包括2个8），即中前二组选。",
          "help": "从0-9中任意选择1个包胆号码，开奖号码的万位、千位中任意1位包含所选的包胆号码相同（不含对子号），即为中奖。"
        }
      },
      "wf_h2": {
        "title": "后二",
        "ssc_h2zhix_fs": {
          "title": "后二直选复式",
          "param": {
            "titles": [
              "十位",
              "个位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_num_multiply"
          },
          "explain": "从十位、个位各选一个号码组成一注。",
          "example": "投注方案：58<br/>开奖号码后二位：58，即中后二直选。",
          "help": "从十位、个位中选择一个2位数号码组成一注，所选号码与开奖号码的十位、个位相同，且顺序一致，即为中奖。"
        },
        "ssc_h2zhix_hz": {
          "title": "后二直选和值",
          "param": {
            "titles": [
              "和值"
            ],
            "begin": 0,
            "end": 18,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_value_add",
            "value": "zhi_er",
            "num_separator": "$"
          },
          "explain": "从0-18中任意选择一个或一个以上号码。",
          "example": "投注方案：和值1<br/>开奖号码后二位：01,10，即中后二直选。",
          "help": "所选数值等于开奖号码的十位、个位二个数字相加之和，即为中奖。"
        },
        "ssc_h2zhix_kd": {
          "title": "后二直选跨度",
          "param": {
            "titles": [
              "跨度"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_value_add",
            "value": "kd_er",
            "num_separator": ","
          },
          "explain": "从0-9中选择一个或一个以上号码。",
          "example": "投注方案：跨度9<br/>开奖号码为-,-,-,9,0或-,-,-,0,9，即中后二直选。",
          "help": "所选数值等于开奖号码的后2位最大与最小数字相减之差，即为中奖。"
        },
        "ssc_h2zux_fs": {
          "title": "后二组选复式",
          "param": {
            "titles": [
              "组选"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 2
          },
          "explain": "从0-9中任意选择2个或2个以上号码。",
          "example": "投注方案：5,8<br/>开奖号码后二位：85 或58 (顺序不限，不含对子号)，即中后二组选。",
          "help": "从0-9中选2个号码组成一注，所选号码与开奖号码的十位、个位相同，顺序不限（不含对子号），即为中奖。"
        },
        "ssc_h2zux_hz": {
          "title": "后二组选和值",
          "param": {
            "titles": [
              "和值"
            ],
            "begin": 1,
            "end": 17,
            "row_num_count": 9
          },
          "calculate": {
            "method": "formula_value_add",
            "value": "zu_er",
            "num_separator": "$"
          },
          "explain": "从1-17中任意选择一个或一个以上号码。",
          "example": "投注方案：和值1<br/>开奖号码后二位：10或01(顺序不限，不含对子号)，即中后二组选。",
          "help": "所选数值等于开奖号码的十位、个位二个数字相加之和（不含对子号），即为中奖。"
        },
        "ssc_h2zux_bd": {
          "title": "后二组选包胆",
          "param": {
            "titles": [
              "包胆"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_count_fold",
            "bet": 9,
            "num_separator": "$"
          },
          "explain": "从0-9中任意选择一个号码。",
          "example": "投注方案：包胆号码8<br/>开奖号码后二位：出现1个8（不包括2个8），即中后二组选。",
          "help": "从0-9中任意选择1个包胆号码，开奖号码的十位、个位中任意1位包含所选的包胆号码相同（不含对子号），即为中奖。"
        }
      },
      "wf_dwd": {
        "title": "定位胆",
        "ssc_5xdwd": {
          "title": "五星定位胆",
          "param": {
            "titles": [
              "万位",
              "千位",
              "百位",
              "十位",
              "个位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_num_count"
          },
          "explain": "从万位、千位、百位、十位、个位任意位置上选择1个或一个以上号码。",
          "example": "投注方案：万位 1<br>开奖号码：万位 1，即中定位胆万位。",
          "help": "从万位、千位、百位、十位、个位任意位置上至少选择1个以上号码，所选号码与相同位置上的开奖号码一致，即为中奖。"
        }
      },
      "wf_bdw": {
        "title": "不定位",
        "ssc_3xbdw_q31": {
          "title": "前三一码不定",
          "param": {
            "titles": [
              "不定位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_num_count"
          },
          "explain": "从0-9中任意选择1个以上号码。",
          "example": "投注方案：1<br/>开奖号码前三位：至少出现1个1，即中前三一码不定位。",
          "help": "从0-9中选择1个号码，每注由1个号码组成，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖。"
        },
        "ssc_3xbdw_z31": {
          "title": "中三一码不定",
          "param": {
            "titles": [
              "不定位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_num_count"
          },
          "explain": "从0-9中任意选择1个以上号码。",
          "example": "投注方案：1<br/>开奖号码前三位：至少出现1个1，即中三一码不定位。",
          "help": "从0-9中选择1个号码，每注由1个号码组成，只要开奖号码的千位、百位、十位中包含所选号码，即为中奖。"
        },
        "ssc_3xbdw_h31": {
          "title": "后三一码不定",
          "param": {
            "titles": [
              "不定位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_num_count"
          },
          "explain": "从0-9中任意选择1个以上号码。",
          "example": "投注方案：1<br/>开奖号码后三位：至少出现1个1，即中后三一码不定位。",
          "help": "从0-9中选择1个号码，每注由1个号码组成，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖。"
        },
        "ssc_3xbdw_q32": {
          "title": "前三二码不定",
          "param": {
            "titles": [
              "不定位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 2
          },
          "explain": "从0-9中任意选择2个以上号码。",
          "example": "投注方案：1,2<br/>开奖号码前三位：至少出现1和2各1个，即中前三二码不定位。",
          "help": "从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的万位、千位、百位中同时包含所选的2个号码，即为中奖。"
        },
        "ssc_3xbdw_z32": {
          "title": "中三二码不定",
          "param": {
            "titles": [
              "不定位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 2
          },
          "explain": "从0-9中任意选择2个以上号码。",
          "example": "投注方案：1,2<br/>开奖号码中间三位：至少出现1和2各1个，即中中三二码不定位。",
          "help": "从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的千位、百位、十位中同时包含所选的2个号码，即为中奖。"
        },
        "ssc_3xbdw_h32": {
          "title": "后三二码不定",
          "param": {
            "titles": [
              "不定位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 2
          },
          "explain": "从0-9中任意选择2个以上号码。",
          "example": "投注方案：1,2<br/>开奖号码后三位：至少出现1和2各1个，即中后三二码不定位。",
          "help": "从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的百位、十位、个位中同时包含所选的2个号码，即为中奖。"
        },
        "ssc_4xbdw_h41": {
          "title": "后四一码不定",
          "param": {
            "titles": [
              "不定位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_num_count"
          },
          "explain": "从0-9中任意选择1个以上号码。",
          "example": "投注方案：1<br/>开奖号码后四位：至少出现1个1，即中四星一码不定位。",
          "help": "从0-9中选择1个号码，每注由1个号码组成，只要开奖号码的千位、百位、十位、个位中包含所选号码，即为中奖。"
        },
        "ssc_4xbdw_h42": {
          "title": "后四二码不定",
          "param": {
            "titles": [
              "不定位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 2
          },
          "explain": "从0-9中任意选择2个以上号码。",
          "example": "投注方案：1,2<br/>开奖号码后四位：至少出现1和2各1个，即中四星二码不定位。",
          "help": "从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的千位、百位、十位、个位中同时包含所选的2个号码，即为中奖。"
        },
        "ssc_4xbdw_h52": {
          "title": "五星二码不定",
          "param": {
            "titles": [
              "不定位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 2
          },
          "explain": "从0-9中任意选择2个以上号码。",
          "example": "投注方案：1,2<br/>开奖号码：至少出现1和2各1个，即中五星二码不定位。",
          "help": "从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的万位、千位、百位、十位、个位中同时包含所选的2个号码，即为中奖。"
        },
        "ssc_4xbdw_h53": {
          "title": "五星三码不定",
          "param": {
            "titles": [
              "不定位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 3
          },
          "explain": "从0-9中任意选择3个以上号码。",
          "example": "投注方案：1,2,3<br/>开奖号码：至少出现1、2、3各1个，即中五星三码不定位。",
          "help": "从0-9中选择3个号码，每注由3个不同的号码组成，开奖号码的万位、千位、百位、十位、个位中同时包含所选的3个号码，即为中奖。"
        }
      },
      "wf_dxds": {
        "title": "大小单双",
        "ssc_dxds_q2": {
          "title": "前二大小单双",
          "param": {
            "titles": [
              "万位",
              "千位"
            ],
            "cs": "dx_ds"
          },
          "calculate": {
            "method": "formula_num_multiply"
          },
          "explain": "从万位、千位中的“大、小、单、双”中至少各选一个组成一注。",
          "example": "投注方案：小双<br/>开奖号码万位与千位：小双，即中前二大小单双。",
          "help": "对万位、千位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。"
        },
        "ssc_dxds_h2": {
          "title": "后二大小单双",
          "param": {
            "titles": [
              "十位",
              "个位"
            ],
            "cs": "dx_ds"
          },
          "calculate": {
            "method": "formula_num_multiply"
          },
          "explain": "从十位、个位中的“大、小、单、双”中至少各选一个组成一注。",
          "example": "投注方案：大单<br/>开奖号码十位与个位：大单，即中后二大小单双。",
          "help": "对十位和个位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。"
        },
        "ssc_dxds_q3": {
          "title": "前三大小单双",
          "param": {
            "titles": [
              "万位",
              "千位",
              "百位"
            ],
            "cs": "dx_ds"
          },
          "calculate": {
            "method": "formula_num_multiply"
          },
          "explain": "从万位、千位、百位中的“大、小、单、双”中至少各选一个组成一注。",
          "example": "投注方案：小双小<br/>开奖号码万、千、百位：小双小，即中前三大小单双。",
          "help": "对万位、千位和百位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。"
        },
        "ssc_dxds_h3": {
          "title": "后三大小单双",
          "param": {
            "titles": [
              "百位",
              "十位",
              "个位"
            ],
            "cs": "dx_ds"
          },
          "calculate": {
            "method": "formula_num_multiply"
          },
          "explain": "从百位、十位、个位中的“大、小、单、双”中至少各选一个组成一注。",
          "example": "投注方案：大单大<br/>开奖号码百、十、个位：大单大，即中后三大小单双。",
          "help": "对百位、十位和个位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。"
        },
        "fc3d_dxds_q2": {
          "title": "前二大小单双",
          "type": "select",
          "param": {
            "titles": [
              "百位",
              "十位"
            ],
            "cs": "dx_ds",
            "selector": 1
          },
          "calculate": {
            "method": "formula_num_multiply"
          },
          "explain": "从百位、十位中的“大、小、单、双”中至少各选一个组成。",
          "example": "投注方案：小双<br>开奖号码：百位与十位“小双”，即中前二大小单双。",
          "help": "对百位、十位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。"
        },
        "fc3d_dxds_h2": {
          "title": "后二大小单双",
          "type": "select",
          "param": {
            "titles": {
              "shi": "十位",
              "ge": "个位"
            },
            "cs": "dx_ds",
            "selector": 1
          },
          "calculate": {
            "method": "formula_num_multiply"
          },
          "explain": "从十位、个位中的“大、小、单、双”中至少各选一个组成。",
          "example": "投注方案：大单<br>开奖号码：十位与个位“大单”，即中后二大小单双。",
          "help": "对十位和个位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。"
        }
      },
      "wf_r2": {
        "title": "任二",
        "ssc_r2zhix_fs": {
          "title": "任二直选复式",
          "param": {
            "titles": [
              "万位",
              "千位",
              "百位",
              "十位",
              "个位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10
          },
          "calculate": {
            "method": "formula_rx_zhi_fs",
            "base_len": 2
          },
          "explain": "从万位、千位、百位、十位、个位中至少两位上各选一个号码组成一注。",
          "example": "投注方案：万位1，十位2<br/>开奖号码：1**2*，即中任二直选。",
          "help": "从万位、千位、百位、十位、个位中任意选择两个位，在这两个位上至少各选1个号码组成一注，所选2个位置上的开奖号码与所选号码完全相同，且顺序一致，即为中奖。"
        },
        "ssc_r2zhix_hz": {
          "title": "任二直选和值",
          "param": {
            "titles": [
              "和值"
            ],
            "begin": 0,
            "end": 18,
            "row_num_count": 10,
            "selector": 0,
            "num_location": "checkbox"
          },
          "calculate": {
            "method": "formula_rx_value_add",
            "base_len": 2,
            "value": "zhi_er",
            "num_separator": "$",
            "location": "zx"
          },
          "explain": "从万位、千位、百位、十位、个位中至少选择两个位置，至少选择一个和值号码组成一注。",
          "example": "投注方案：勾选位置千位、个位，选择和值15<br/>开奖号码：*8**7，即中任二直选和值。",
          "help": "从万位、千位、百位、十位、个位中任意勾选两个位置，然后选择一个和值，所选2个位置的开奖号码相加之和与所选和值一致，且顺序一致，即为中奖。"
        },
        "ssc_r2zux_fs": {
          "title": "任二组选复式",
          "param": {
            "titles": [
              "组选"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10,
            "selector": 2,
            "num_location": "checkbox"
          },
          "calculate": {
            "method": "formula_rx_zu_fs",
            "base_len": 2,
            "location": "zx"
          },
          "explain": "从万位、千位、百位、十位、个位中至少选择两个位置，号码区至少选择两个号码组成一注。",
          "example": "投注方案：勾选位置万位、个位，选择号码79<br/>开奖号码：9***7 或 7***9，均中任二组选。",
          "help": "从万位、千位、百位、十位、个位中任意勾选两个位置，然后从0-9中选择两个号码组成一注，所选2个位置的开奖号码与所选号码一致，顺序不限，即为中奖。"
        },
        "ssc_r2zux_hz": {
          "title": "任二组选和值",
          "param": {
            "titles": [
              "和值"
            ],
            "begin": 1,
            "end": 17,
            "row_num_count": 10,
            "selector": 0,
            "num_location": "checkbox"
          },
          "calculate": {
            "method": "formula_rx_value_add",
            "value": "zu_er",
            "base_len": 2,
            "num_separator": "$",
            "location": "zx"
          },
          "explain": "从万位、千位、百位、十位、个位中至少选择两个位置，至少选择一个和值号码组成一注。",
          "example": "投注方案：勾选位置千位、个位，选择和值6<br/>开奖号码：*4**2 或 *2**4，均中任二组选和值",
          "help": "从万位、千位、百位、十位、个位中任意勾选两个位置，然后选择一个和值，所选2个位置的开奖号码相加之和与所选和值一致，顺序不限，即为中奖。"
        }
      },
      "wf_r3": {
        "title": "任三",
        "ssc_r3zhix_fs": {
          "title": "任三直选复式",
          "param": {
            "titles": [
              "万位",
              "千位",
              "百位",
              "十位",
              "个位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10,
            "selector": 2
          },
          "calculate": {
            "method": "formula_rx_zhi_fs",
            "base_len": 3
          },
          "explain": "从万位、千位、百位、十位、个位中至少三位上各选一个号码组成一注。",
          "example": "投注方案：万位1、千位5、十位2<br/>开奖号码：15*2*，即中任三直选。",
          "help": "从万位、千位、百位、十位、个位中任意选择三个位，在这三个位上至少各选1个号码组成一注，所选3个位置上的开奖号码与所选号码完全相同，且顺序一致，即为中奖。"
        },
        "ssc_r3zhix_hz": {
          "title": "任三直选和值",
          "param": {
            "titles": [
              "和值"
            ],
            "begin": 0,
            "end": 27,
            "row_num_count": 14,
            "selector": 0,
            "num_location": "checkbox"
          },
          "calculate": {
            "method": "formula_rx_value_add",
            "value": "zhi_san",
            "base_len": 3,
            "num_separator": "$",
            "location": "zx"
          },
          "explain": "从万位、千位、百位、十位、个位中至少选择三个位置，至少选择一个和值号码组成一注。",
          "example": "投注方案：勾选位置万位、千位、个位，选择和值8<br/>开奖号码：22**4，即中任三直选和值。",
          "help": "从万位、千位、百位、十位、个位中任意勾选三个位置，然后选择一个和值，所选3个位置的开奖号码相加之和与所选和值一致，且顺序一致，即为中奖。"
        },
        "ssc_r3zux_z3fs": {
          "title": "任3组三复式",
          "param": {
            "titles": [
              "组三"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10,
            "selector": 2,
            "num_location": "checkbox"
          },
          "calculate": {
            "method": "formula_rx_zs_fs",
            "num_len": 2,
            "base_len": 3,
            "location": "zx"
          },
          "explain": "从万位、千位、百位、十位、个位中至少选择三个位置，号码区至少选择两个号码组成一注。",
          "example": "投注方案：勾选位置万位、千位、个位，选择号码18<br/>开奖号码：11**8 或 18**1，均中任三组三。",
          "help": "从万位、千位、百位、十位、个位中任意勾选三个位置，然后从0-9中选择两个号码组成一注，所选3个位置的开奖号码与所选号码一致，顺序不限，即为中奖。"
        },
        "ssc_r3zux_z6hz": {
          "title": "任3组六复式",
          "param": {
            "titles": [
              "组六"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10,
            "selector": 2,
            "num_location": "checkbox"
          },
          "calculate": {
            "method": "formula_rx_zu_fs",
            "base_len": 3,
            "location": "zx"
          },
          "explain": "从万位、千位、百位、十位、个位中至少选择三个位置，号码区至少选择三个号码组成一注。",
          "example": "投注方案：勾选位置万位、百位、个位，选择号码159<br/>开奖号码：1*5*9 或 9*1*5，均中任三组六。",
          "help": "从万位、千位、百位、十位、个位中任意勾选三个位置，然后从0-9中选择三个号码组成一注，所选3个位置的开奖号码与所选号码一致，顺序不限，即为中奖。"
        },
        "ssc_r3zux_hh3": {
          "title": "任3混合",
          "param": {
            "num_location": "checkbox"
          },
          "calculate": {
            "base_len": 3,
            "check_type": 3,
            "location": "zx"
          },
          "explain": "从万位、千位、百位、十位、个位中至少选择三个位置，手动至少输入三个号码组成一注（不包含豹子号）。",
          "example": "投注方案：勾选位置千位、百位、个位，分別投注(0,0,1),以及(1,2,3)<br/>开奖号码：*00*1，顺序不限，即中任三组三；或者(2)*21*3，顺序不限，即中任三组六。",
          "help": "从万位、千位、百位、十位、个位中任意勾选三个位置，然后输入三个号码组成一注，所选3个位置的开奖号码与输入号码一致，顺序不限，即为中奖。"
        },
        "ssc_r3zux_hz": {
          "title": "任3组选和值",
          "param": {
            "titles": [
              "和值"
            ],
            "begin": 1,
            "end": 26,
            "row_num_count": 13,
            "selector": 0,
            "num_location": "checkbox"
          },
          "calculate": {
            "method": "formula_rx_value_add",
            "value": "zu_san",
            "base_len": 3,
            "num_separator": "$",
            "location": "zx"
          },
          "explain": "从万位、千位、百位、十位、个位中至少选择三个位置，至少选择一个和值号码组成一注。",
          "example": "投注方案：勾选位置万位、千位、个位；选择和值8<br/>开奖号码：13**4 顺序不限，即中任三直选。",
          "help": "从万位、千位、百位、十位、个位中任意勾选三个位置，然后选择一个和值，所选3个位置的开奖号码相加之和与所选和值一致，顺序不限，即为中奖。"
        }
      },
      "wf_r4": {
        "title": "任四",
        "ssc_r4zhix_fs": {
          "title": "任四直选复式",
          "param": {
            "titles": [
              "万位",
              "千位",
              "百位",
              "十位",
              "个位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10,
            "selector": 2
          },
          "calculate": {
            "method": "formula_rx_zhi_fs",
            "base_len": 4
          },
          "explain": "从万位、千位、百位、十位、个位中至少四位上 各选一个号码组成一注。",
          "example": "投注方案：万位1、千位5、百位0、十位2<br/>开奖号码：1502*，即中任四直选。",
          "help": "从万位、千位、百位、十位、个位中任意选择四个位置，在这四个位上至少各选1个号码组成一注，所选4个位置上的开奖号码与所选号码完全相同，且顺序一致，即为中奖。"
        },
        "ssc_r4zux_24": {
          "title": "任4组选24",
          "param": {
            "titles": [
              "组选24"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10,
            "selector": 2,
            "num_location": "checkbox"
          },
          "calculate": {
            "method": "formula_rx_zu_fs",
            "base_len": 4,
            "location": "zx"
          },
          "explain": "从万位、千位、百位、十位、个位中至少选择四个位置，号码区至少选择四个号码组成一注。",
          "example": "投注方案：勾选位置万位、千位、十位、个位，选择号码1234<br/>开奖号码：12*34 或 13*24，均中任四组选24。",
          "help": "从万位、千位、百位、十位、个位中任意勾选四个位置，然后从0-9中选择四个号码组成一注，所选4个位置的开奖号码与所选号码一致，顺序不限，即为中奖。"
        },
        "ssc_r4zux_12": {
          "title": "任4组选12",
          "param": {
            "titles": [
              "二重号",
              "单号"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10,
            "selector": 2,
            "num_location": "checkbox"
          },
          "calculate": {
            "method": "formula_rx_zx",
            "oneRow": 0,
            "moreRow": 1,
            "num_len": 2,
            "base_len": 4,
            "location": "zx"
          },
          "explain": "从万位、千位、百位、十位、个位中至少选择四个位置，从“二重号”选择一个号码，“单号”中选择两个号码组成一注。",
          "example": "投注方案：勾选位置万位、千位、十位、个位，选择二重号：8，单号：0、6<br/>开奖号码：88*06 或 08*68，均中任四组选12。",
          "help": "从万位、千位、百位、十位、个位中任意勾选四个位置，然后选择1个二重号码和2个单号号码组成一注，所选4个位置的开奖号码中包含与所选号码，且所选二重号码在所选4个位置的开奖号码中出现了2次，即为中奖。"
        },
        "ssc_r4zux_6": {
          "title": "任4组选6",
          "param": {
            "titles": [
              "二重号"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10,
            "selector": 2,
            "num_location": "checkbox"
          },
          "calculate": {
            "method": "formula_rx_zl",
            "num_len": 2,
            "base_len": 4,
            "location": "zx"
          },
          "explain": "从万位、千位、百位、十位、个位中至少选择四个位置，从“二重号”中选择两个号码组成一注。",
          "example": "投注方案：勾选位置万位、千位、十位、个位，选择二重号：6、8<br/>开奖号码：66*88 或 68*68，均中任四组选6。",
          "help": "从万位、千位、百位、十位、个位中任意勾选四个位置，然后从0-9中选择2个二重号组成一注，所选4个位置的开奖号码与所选号码一致，并且所选的2个二重号码在所选4个位置的开奖号码中分别出现了2次，顺序不限，即为中奖。"
        },
        "ssc_r4zux_4": {
          "title": "任4组选4",
          "type": "select",
          "param": {
            "titles": [
              "三重号",
              "单号"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10,
            "selector": 2,
            "num_location": "checkbox"
          },
          "calculate": {
            "method": "formula_rx_zx",
            "oneRow": 0,
            "moreRow": 1,
            "num_len": 1,
            "base_len": 4,
            "location": "zx"
          },
          "explain": "从万位、千位、百位、十位、个位中至少选择四个位置，从“三重号”选择一个号码，“单号”中选择一个号码组成一注。",
          "example": "投注方案：勾选位置万位、千位、十位、个位，选择三重号：8，单号：0<br/>开奖号码：88*80 或 80*88，均中任四组选4。",
          "help": "从万位、千位、百位、十位、个位中任意勾选四个位置，然后从0-9中选择1个三重号和1个单号组成一注，所选4个位置的开奖号码与所选号码一致，并且所选三重号码在所选4个位置的开奖号码中出现了3次，顺序不限，即为中奖。"
        }
      },
      "wf_lhd": {
        "title": "龙虎斗",
        "ssc_lhd": {
          "title": "龙虎斗",
          "type": "select",
          "param": {
            "titles": [
              "位置",
              "号码"
            ],
            "cs": "ssc_lhd"
          },
          "calculate": {
            "method": "formula_num_multiply",
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从选择位置上选择一个形态组成一注。",
          "example": "投注方案：龙；开奖号码十位大于个位：龙，即中奖。",
          "help": "根据十位、个位号码数值比大小，十位号码大于个位号码为龙，十位号码小于个位号码为虎，号码相同则为和。所选形态与开奖号码形态一致，即为中奖。"
        }
      }
    }
  },
  "fc3d": {
    "num_min": 0,
    "num_max": 9,
    "num_len": 1,
    "run_num_length": 3,
    "wf_class": {
      "wf_3x": {
        "title": "三星",
        "fc3d_3xzhix_fs": {
          "title": "三星直选复式",
          "type": "select",
          "param": {
            "titles": {
              "bai": "百位",
              "shi": "十位",
              "ge": "个位"
            },
            "begin": 0,
            "end": 9,
            "row_num_count": 10,
            "selector": 2
          },
          "calculate": {
            "method": "formula_num_multiply"
          },
          "explain": "从百位、十位、个位各选一个号码组成一注。",
          "example": "投注方案：345<br>开奖号码：345，即中后三直选。",
          "help": "从百味、十位、个位中选择一个3位数号码组成一注，所选号码与开奖号码后3位相同，且顺序一致，即为中奖。"
        },
        "fc3d_3xzhix_hz": {
          "title": "三星直选和值",
          "type": "select",
          "param": {
            "titles": [
              "直选和值"
            ],
            "begin": 0,
            "end": 27,
            "row_num_count": 14,
            "selector": 0
          },
          "calculate": {
            "method": "formula_value_add",
            "value": "zhi_san",
            "num_separator": "$"
          },
          "explain": "从0-27中任意选择1个或1个以上号码。",
          "example": "投注方案：和值1<br>开奖号码：后三位001,010,100，即中后三直选。",
          "help": "所选数值等于开奖号码的百位、十位、个位三个数字相加之和，即为中奖。"
        },
        "fc3d_3xzux_z3fs": {
          "title": "三星组三复式",
          "type": "select",
          "param": {
            "titles": [
              "组三"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10,
            "selector": 2
          },
          "calculate": {
            "method": "formula_num_fold",
            "base_len": 2
          },
          "explain": "从0-9中任意选择2个或2个以上号码。",
          "example": "投注方案：588<br>开奖号码：后三位588（顺序不限），即中后三组选三。",
          "help": "从0-9中选择2个数字组成两注，所选号码与开奖号码的百味、十位、个位相同，且顺序不限，即为中奖。"
        },
        "fc3d_3xzux_z6fs": {
          "title": "三星组六复式",
          "type": "select",
          "param": {
            "titles": [
              "组六"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10,
            "selector": 2
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 3
          },
          "explain": "从0-9中任意选择3个或3个以上号码。",
          "example": "投注方案：258<br>开奖号码：后三位852（顺序不限），即中后三组选六。",
          "help": "从0-9中任意选择3个号码组成一注，所选号码与开奖号码的百味、十位、个位相同，顺序不限，即为中奖。"
        },
        "fc3d_3xzux_zxhh": {
          "title": "三星组选混合",
          "type": "input",
          "param": {},
          "calculate": {
            "base_len": 3,
            "check_type": 3
          },
          "explain": "手动输入号码，至少输入1个三位数号码。",
          "example": "投注方案：001和123<br>开奖号码：后三位001（顺序不限）即中后三组选三，或者后三位312（顺序不限）即中后三组选六。",
          "help": "手动输入一个3位数号码组成一注（不含豹子号），开奖号码的百位、十位、个位符合后三组三或者组六均为中奖。"
        },
        "fc3d_3xzux_zxhz": {
          "title": "三星组选和值",
          "type": "select",
          "param": {
            "titles": [
              "和值"
            ],
            "begin": 1,
            "end": 26,
            "row_num_count": 13,
            "selector": 0
          },
          "calculate": {
            "method": "formula_value_add",
            "value": "zu_san",
            "num_separator": "$"
          },
          "explain": "从1-26中任意选择1个或1个以上号码。",
          "example": "投注方案：和值3<br>开奖号码：后三位003（顺序不限）即中后三组选三，或者后三位012（顺序不限）即中后三组选六。",
          "help": "所选数值等于开奖号码的百位、十位、个位三个数字相加之和（非豹子号），即为中奖。"
        },
        "fc3d_3xqw_012": {
          "title": "三星趣味012",
          "type": "select",
          "param": {
            "titles": [
              "0",
              "1",
              "2"
            ],
            "cs": "fc_spice_012",
            "selector": 1
          },
          "calculate": {
            "method": "formula_value_add",
            "value": "fc_spice_012",
            "num_separator": "$",
            "group": "all_num"
          },
          "explain": "所选号码与开奖号码相同（且顺序一致）即中奖。",
          "example": "所选号码与开奖号码相同（且顺序一致）即中奖。",
          "help": "所选号码与开奖号码相同（且顺序一致）即中奖。"
        },
        "fc3d_3xqw_dx": {
          "title": "三星趣味大小",
          "type": "select",
          "param": {
            "titles": [
              "小",
              "大"
            ],
            "cs": "fc_spice_dx",
            "selector": 1
          },
          "calculate": {
            "method": "formula_count_fold",
            "bet": 125,
            "num_separator": "$",
            "group": "all_num"
          },
          "explain": "所选号码与开奖号码相同（且顺序一致）即中奖。",
          "example": "所选号码与开奖号码相同（且顺序一致）即中奖。",
          "help": "所选号码与开奖号码相同（且顺序一致）即中奖。"
        },
        "fc3d_3xqw_zh": {
          "title": "三星趣味质合",
          "type": "select",
          "param": {
            "titles": [
              "质",
              "合"
            ],
            "cs": "fc_spice_zh",
            "selector": 1
          },
          "calculate": {
            "method": "formula_count_fold",
            "bet": 125,
            "num_separator": "$",
            "group": "all_num"
          },
          "explain": "所选号码与开奖号码相同（且顺序一致）即中奖。",
          "example": "所选号码与开奖号码相同（且顺序一致）即中奖。",
          "help": "所选号码与开奖号码相同（且顺序一致）即中奖。"
        },
        "fc3d_3xqw_jo": {
          "title": "三星趣味奇偶",
          "type": "select",
          "param": {
            "titles": [
              "奇",
              "偶"
            ],
            "cs": "fc_spice_jo",
            "selector": 1
          },
          "calculate": {
            "method": "formula_count_fold",
            "bet": 125,
            "num_separator": "$",
            "group": "all_num"
          },
          "explain": "所选号码与开奖号码相同（且顺序一致）即中奖。",
          "example": "所选号码与开奖号码相同（且顺序一致）即中奖。",
          "help": "所选号码与开奖号码相同（且顺序一致）即中奖。"
        }
      },
      "wf_2x": {
        "title": "二星",
        "fc3d_2xzhix_q2fs": {
          "title": "前二直选复式",
          "type": "select",
          "param": {
            "titles": [
              "百位",
              "十位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10,
            "selector": 2
          },
          "calculate": {
            "method": "formula_num_multiply"
          },
          "explain": "从百位、十位中至少各选1个号码组成一注。",
          "example": "投注方案：58<br>开奖号码：前二位58，即中前二直选。",
          "help": "从百味、十位中选择一个2位数号码组成一注，所选号码与开奖号码的前2位相同，且顺序一致，即为中奖。"
        },
        "fc3d_2xzhix_h2fs": {
          "title": "后二直选复式",
          "type": "select",
          "param": {
            "titles": [
              "十位",
              "个位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10,
            "selector": 2
          },
          "calculate": {
            "method": "formula_num_multiply"
          },
          "explain": "从十位、个位中至少各选1个号码组成一注。",
          "example": "投注方案：58<br>开奖号码：后二位58，即中后二直选。",
          "help": "从十位、个位中选择一个2位数号码组成一注，所选号码与开奖号码的后2位相同，且顺序一致，即为中奖。"
        },
        "fc3d_2xzux_q2fs": {
          "title": "前二组选复式",
          "type": "select",
          "param": {
            "titles": [
              "组选"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10,
            "selector": 2
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 2
          },
          "explain": "从0-9中任意选择2个或2个以上号码。",
          "example": "投注方案：58<br>开奖号码：前二位85或者58（顺序不限，不含对子号），即中前二组选。",
          "help": "从0-9中选择2个数字组成一注，所选号码与开奖号码的百味、十位相同，顺序不限，即为中奖。"
        },
        "fc3d_2xzux_h2fs": {
          "title": "后二组选复式",
          "type": "select",
          "param": {
            "titles": [
              "组选"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10,
            "selector": 2
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 2
          },
          "explain": "从0-9中任意选择2个或2个以上号码。",
          "example": "投注方案：58<br>开奖号码：后二位85或者58（顺序不限，不含对子号），即中后二组选。",
          "help": "从0-9中选择2个数字组成一注，所选号码与开奖号码的十味、个位相同（不含对子号），顺序不限，即为中奖。"
        }
      },
      "wf_bdw": {
        "title": "不定位",
        "fc3d_bdw_fs": {
          "title": "不定位复式",
          "type": "select",
          "param": {
            "titles": [
              "不定位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10,
            "selector": 2
          },
          "calculate": {
            "method": "formula_num_count"
          },
          "explain": "从01-11中共11个号码中选择1个号码，每注由1个号码组成",
          "example": "只要当期顺序摇出的第一位、第二位、第三位开奖号码中包含所选号码，即为中奖。",
          "help": "从01-11中共11个号码中选择1个号码，每注由1个号码组成，只要当期顺序摇出的第一位、第二位、第三位开奖号码中包含所选号码，即为中奖。"
        }
      },
      "wf_zhix": {
        "title": "直选",
        "fc3d_qyzx_fs": {
          "title": "前一直选复式",
          "type": "select",
          "param": {
            "titles": [
              "百位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10,
            "selector": 2
          },
          "calculate": {
            "method": "formula_num_count"
          },
          "explain": "前一直选",
          "example": "前一直选",
          "help": "前一直选"
        },
        "fc3d_hyzx_fs": {
          "title": "后一直选复式",
          "type": "select",
          "param": {
            "titles": [
              "个位"
            ],
            "begin": 0,
            "end": 9,
            "row_num_count": 10,
            "selector": 2
          },
          "calculate": {
            "method": "formula_num_count"
          },
          "explain": "后一直选",
          "example": "后一直选",
          "help": "后一直选"
        }
      }
    }
  },
  "11x5": {
    "num_min": 1,
    "num_max": 11,
    "num_len": 2,
    "run_num_length": 5,
    "wf_class": {
      "wf_3m": {
        "title": "三码",
        "11x5_3m_q3zhixfs": {
          "title": "前三直选复式",
          "type": "select",
          "param": {
            "titles": [
              "第一位",
              "第二位",
              "第三位"
            ],
            "begin": 1,
            "end": 11,
            "row_num_count": 11,
            "selector": 2
          },
          "calculate": {
            "method": "formula_count_no_repeat",
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从第一位、第二位、第三位中至少各选择1个号码。",
          "example": "如：选择01，02，03，开奖号码顺序为01，02，03 * *，即为中奖。",
          "help": "从01-11共11个号码中选择3个不重复的号码组成一注，所选号码与当期顺序摇出的5个号码中的前3个号码相同，且顺序一致，即为中奖。"
        },
        "11x5_3m_q3zuxfs": {
          "title": "前三组选复式",
          "type": "select",
          "param": {
            "titles": [
              "组选"
            ],
            "begin": 1,
            "end": 11,
            "row_num_count": 11,
            "selector": 2
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 3,
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从01-11中任意选择3个或3个以上号码。",
          "example": "如：选择01 02 03（展开为01 02 03 * *，01 03 02 * *，02 01 03 * *，02 03 01 * *，03 01 02 * *，03 02 01 * *），开奖号码为03 01 02  如：，即为中奖。",
          "help": "从01-11中共11个号码中选择3个号码，所选号码与当期顺序摇出的5个号码中的前3个号码相同，顺序不限，即为中奖。"
        },
        "11x5_3m_q3zuxdt": {
          "title": "前三组选胆拖",
          "type": "select",
          "param": {
            "titles": [
              "胆码",
              "拖码"
            ],
            "begin": 1,
            "end": 11,
            "row_num_count": 11,
            "selector": 2,
            "selector_index": {
              "1": 1
            }
          },
          "calculate": {
            "method": "formula_dt",
            "base_len": 2,
            "num_separator": ",",
            "row_separator": "-",
            "limit_row": 0,
            "limit_rule": "no_repeat"
          },
          "explain": "从01-11中，选取3个及以上的号码进行投注，每注需至少包括1个胆码及2个拖码。",
          "example": "如：选择胆码 01，选择拖码 02 06，开奖号码为 02 01 06 * *，即为中奖。",
          "help": "分别从胆码和拖码的01-11中，至少选择1个胆码和2个拖码组成一注。当期顺序摇出的5个号码中的前3个号码中同时包含所选的1个胆码和2个拖码，顺序不限，即为中奖。"
        }
      },
      "wf_2m": {
        "title": "二码",
        "11x5_2m_q2zhixfs": {
          "title": "前二直选复式",
          "type": "select",
          "param": {
            "titles": [
              "第一位",
              "第二位"
            ],
            "begin": 1,
            "end": 11,
            "row_num_count": 11,
            "selector": 2
          },
          "calculate": {
            "method": "formula_count_no_repeat",
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从第一位、第二位中至少各选择1个号码。",
          "example": " 如：选择01 02，开奖号码 01 02 * * *，即为中奖。",
          "help": "从01-11共11个号码中选择2个不重复的号码组成一注，所选号码与当期顺序摇出的5个号码中的前2个号码相同，且顺序一致，即中奖。"
        },
        "11x5_2m_q2zuxfs": {
          "title": "前二组选复式",
          "type": "select",
          "param": {
            "titles": [
              "组选"
            ],
            "begin": 1,
            "end": 11,
            "row_num_count": 11,
            "selector": 2
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 2,
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从01-11中任意选择3个或3个以上号码。",
          "example": "如：选择01 02 03（展开为01 02 03 * *，01 03 02 * *，02 01 03 * *，02 03 01 * *，03 01 02 * *，03 02 01 * *），开奖号码为03 01 02  如：，即为中奖。",
          "help": "从01-11中共11个号码中选择3个号码，所选号码与当期顺序摇出的5个号码中的前3个号码相同，顺序不限，即为中奖。"
        },
        "11x5_2m_q2zuxdt": {
          "title": "前二组选胆拖",
          "type": "select",
          "param": {
            "titles": [
              "胆码",
              "拖码"
            ],
            "begin": 1,
            "end": 11,
            "row_num_count": 11,
            "selector": 2,
            "selector_index": {
              "1": 1
            }
          },
          "calculate": {
            "method": "formula_dt",
            "base_len": 1,
            "num_separator": ",",
            "row_separator": "-",
            "limit_row": 0,
            "limit_rule": "no_repeat"
          },
          "explain": "从01-11中，选取3个及以上的号码进行投注，每注需至少包括1个胆码及2个拖码。",
          "example": "如：选择胆码 01，选择拖码 02 06，开奖号码为 02 01 06 * *，即为中奖。",
          "help": "分别从胆码和拖码的01-11中，至少选择1个胆码和2个拖码组成一注。当期顺序摇出的5个号码中的前3个号码中同时包含所选的1个胆码和2个拖码，顺序不限，即为中奖。"
        }
      },
      "wf_1m": {
        "title": "一码",
        "11x5_1m_q1zhix": {
          "title": "前一直选",
          "type": "select",
          "param": {
            "titles": [
              "第一位"
            ],
            "begin": 1,
            "end": 11,
            "row_num_count": 11,
            "selector": 2
          },
          "calculate": {
            "method": "formula_num_count",
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从01-11中任意选择1个或1个以上号码。",
          "example": "如：选择01，开奖号码为01 * * * *,即为中奖。",
          "help": "从01-11中共11个号码中选择1个号码，每注由1个号码组成，只要当期顺序摇出的第一位开奖号码包含所选号码，即为中奖。"
        }
      },
      "wf_bdw": {
        "title": "不定位",
        "11x5_bdw_q3bdw": {
          "title": "前三不定胆",
          "type": "select",
          "param": {
            "titles": [
              "前三位"
            ],
            "begin": 1,
            "end": 11,
            "row_num_count": 11,
            "selector": 2
          },
          "calculate": {
            "method": "formula_num_count",
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从01-11中任意选择1个或1个以上号码。",
          "example": "如：选择01，开奖号码为01 * * * *，* 01 * * *，* * 01 * *,即为中奖。",
          "help": "从01-11中共11个号码中选择1个号码，每注由1个号码组成，只要当期顺序摇出的第一位、第二位、第三位开奖号码中包含所选号码，即为中奖。"
        }
      },
      "wf_dwd": {
        "title": "定位胆",
        "11x5_dwd_q3dwd": {
          "title": "前三不定胆",
          "type": "select",
          "param": {
            "titles": [
              "第一位",
              "第二位",
              "第三位"
            ],
            "begin": 1,
            "end": 11,
            "row_num_count": 11,
            "selector": 2
          },
          "calculate": {
            "method": "formula_num_count",
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从第一位，第二位，第三位任意位置上任意选择1个或1个以上号码。",
          "example": "如：万位上选择01，开奖号码为01 * * * *，即为中奖。<br/>如：千位上选择01，开奖号码为 * 01* * *，即为中奖。<br/>如：百位上选择01，开奖号码为 * * 01 * *，即为中奖。",
          "help": "从第一位，第二位，第三位任意1个位置或多个位置上选择1个号码，所选号码与相同位置上的开奖号码一致，即为中奖。"
        }
      },
      "wf_qwx": {
        "title": "趣味型",
        "11x5_qwx_dds": {
          "title": "定单双",
          "type": "select",
          "param": {
            "titles": [
              "定单双"
            ]
          },
          "cs": "eleven_five_dds",
          "selector": 0,
          "calculate": {
            "method": "formula_num_count",
            "num_separator": ","
          },
          "explain": "从不同的单双组合中任意选择1个或1个以上的组合。",
          "example": "如：选择5单0双，开奖号码01，03，05，07，09五个单数，即为中奖。",
          "help": "从5种单双个数组合中选择1种组合，当期开奖号码的单双个数与所选单双组合一致，即为中奖。"
        },
        "11x5_qwx_czs": {
          "title": "猜中数",
          "type": "select",
          "param": {
            "titles": [
              "猜中位"
            ],
            "begin": 3,
            "end": 9,
            "row_num_count": 7,
            "selector": 2,
            "value": "number"
          },
          "calculate": {
            "method": "formula_num_count",
            "num_separator": "$"
          },
          "explain": "从3-9中任意选择1个或1个以上数字。",
          "example": "如：选择8，开奖号码为11，04，09，05，08，按开奖号码的数字大小排列为04，05，08，09，11，中间数08，即为中奖。",
          "help": "从3-9中选择1个号码进行购买，所选号码与5个开奖号码按照大小顺序排列后的第3个号码相同，即为中奖。"
        }
      },
      "wf_rx": {
        "title": "任选",
        "11x5_rx_1z1fs": {
          "title": "任选1中1复式",
          "type": "select",
          "param": {
            "titles": [
              "选一中一"
            ],
            "begin": 1,
            "end": 11,
            "row_num_count": 11,
            "selector": 2
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 1,
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从01-11中任意选择1个或1个以上号码。",
          "example": "如：选择05，开奖号码为08 04 11 05 03，即为中奖。",
          "help": "从01-11共11个号码中选择1个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。"
        },
        "11x5_rx_2z2fs": {
          "title": "任选2中2复式",
          "type": "select",
          "param": {
            "titles": [
              "选二中二"
            ],
            "begin": 1,
            "end": 11,
            "row_num_count": 11,
            "selector": 2
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 2,
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从01-11中任意选择2个或2个以上号码。",
          "example": "如：选择05 04，开奖号码为08 04 11 05 03，即为中奖。"
        },
        "11x5_rx_3z3fs": {
          "title": "任选3中3复式",
          "type": "select",
          "param": {
            "titles": [
              "选三中三"
            ],
            "begin": 1,
            "end": 11,
            "row_num_count": 11,
            "selector": 2
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 3,
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从01-11中任意选择3个或3个以上号码。",
          "example": "如：选择05 04 11，开奖号码为08 04 11 05 03，即为中奖。",
          "help": "从01-11共11个号码中选择3个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。"
        },
        "11x5_rx_4z4fs": {
          "title": "任选4中4复式",
          "type": "select",
          "param": {
            "titles": [
              "选四中四"
            ],
            "begin": 1,
            "end": 11,
            "row_num_count": 11,
            "selector": 2
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 4,
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从01-11中任意选择4个或4个以上号码。",
          "example": "如：选择05 04 08 03，开奖号码为08 04 11 05 03，即为中奖。",
          "help": "从01-11共11个号码中选择4个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。"
        },
        "11x5_rx_5z5fs": {
          "title": "任选5中5复式",
          "type": "select",
          "param": {
            "titles": [
              "选五中五"
            ],
            "begin": 1,
            "end": 11,
            "row_num_count": 11,
            "selector": 2
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 5,
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从01-11中任意选择5个或5个以上号码。",
          "example": "如：选择05 04 11 03 08，开奖号码为08 04 11 05 03，即为中奖。",
          "help": "从01-11共11个号码中选择5个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。"
        },
        "11x5_rx_6z5fs": {
          "title": "任选6中5复式",
          "type": "select",
          "param": {
            "titles": [
              "选六中五"
            ],
            "begin": 1,
            "end": 11,
            "row_num_count": 11,
            "selector": 2
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 6,
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从01-11中任意选择6个或6个以上号码。",
          "example": "如：选择05 10 04 11 03 08，开奖号码为08 04 11 05 03，即为中奖。",
          "help": "从01-11共11个号码中选择6个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。"
        },
        "11x5_rx_7z5fs": {
          "title": "任选7中5复式",
          "type": "select",
          "param": {
            "titles": [
              "选七中五"
            ],
            "begin": 1,
            "end": 11,
            "row_num_count": 11,
            "selector": 2
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 7,
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从01-11中任意选择7个或7个以上号码。",
          "example": "如：选择05 04 10 11 03 08 09，开奖号码为08 04 11 05 03，即为中奖。",
          "help": "从01-11共11个号码中选择7个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。"
        },
        "11x5_rx_8z5fs": {
          "title": "任选8中5复式",
          "type": "select",
          "param": {
            "titles": [
              "选八中五"
            ],
            "begin": 1,
            "end": 11,
            "row_num_count": 11,
            "selector": 2
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 8,
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从01-11中任意选择8个或8个以上号码。",
          "example": "如：选择05 04 11 03 08 10 09 01，开奖号码为08 04 11 05 03，即为中奖。",
          "help": "从01-11共11个号码中选择8个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。"
        }
      },
      "wf_dt": {
        "title": "任选",
        "11x5_dt_2": {
          "title": "任选二胆拖",
          "type": "select",
          "param": {
            "titles": [
              "胆码",
              "拖码"
            ],
            "begin": 1,
            "end": 11,
            "row_num_count": 11,
            "selector": 2,
            "selector_index": {
              "1": 1
            }
          },
          "calculate": {
            "method": "formula_dt",
            "limit_row": 0,
            "limit_rule": "no_repeat",
            "base_len": 1,
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从01-11中，选取2个及以上的号码进行投注，每注需至少包括1个胆码及1个拖码。",
          "example": "如：选择胆码 08，选择拖码 06，开奖号码为 06 08 11 09 02，即为中奖。",
          "help": "分别从胆码和拖码的01-11中，至少选择1个胆码和1个拖码组成一注，只要当期顺序摇出的5个开奖号码中同时包含所选的1个胆码和1个拖码，所选胆码必须全中，即为中奖。"
        },
        "11x5_dt_3": {
          "title": "任选三胆拖",
          "type": "select",
          "param": {
            "titles": [
              "胆码",
              "拖码"
            ],
            "begin": 1,
            "end": 11,
            "row_num_count": 11,
            "selector": 2,
            "selector_index": {
              "1": 1
            }
          },
          "calculate": {
            "method": "formula_dt",
            "limit_row": 0,
            "limit_rule": "no_repeat",
            "base_len": 2,
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从01-11中，选取3个及以上的号码进行投注，每注需至少包括1个胆码及2个拖码。",
          "example": "如：选择胆码 08，选择拖码 06 11，开奖号码为 06 08 11 09 02，即为中奖。",
          "help": "分别从胆码和拖码的01-11中，至少选择1个胆码和2个拖码组成一注，只要当期顺序摇出的5个开奖号码中同时包含所选的1个胆码和2个拖码，所选胆码必须全中，即为中奖。"
        },
        "11x5_dt_4": {
          "title": "任选四胆拖",
          "type": "select",
          "param": {
            "titles": [
              "胆码",
              "拖码"
            ],
            "begin": 1,
            "end": 11,
            "row_num_count": 11,
            "selector": 2,
            "selector_index": {
              "1": 1
            }
          },
          "calculate": {
            "method": "formula_dt",
            "limit_row": 0,
            "limit_rule": "no_repeat",
            "base_len": 3,
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从01-11中，选取4个及以上的号码进行投注，每注需至少包括1个胆码及3个拖码。",
          "example": "如：选择胆码 08，选择拖码 06 09 11，开奖号码为 06 08 11 09 02，即为中奖。",
          "help": "分别从胆码和拖码的01-11中，至少选择1个胆码和3个拖码组成一注，只要当期顺序摇出的5个开奖号码中同时包含所选的1个胆码和3个拖码，所选胆码必须全中，即为中奖。"
        },
        "11x5_dt_5": {
          "title": "任选五胆拖",
          "type": "select",
          "param": {
            "titles": [
              "胆码",
              "拖码"
            ],
            "begin": 1,
            "end": 11,
            "row_num_count": 11,
            "selector": 2,
            "selector_index": {
              "1": 1
            }
          },
          "calculate": {
            "method": "formula_dt",
            "limit_row": 0,
            "limit_rule": "no_repeat",
            "base_len": 4,
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从01-11中，选取5个及以上的号码进行投注，每注需至少包括1个胆码及4个拖码。",
          "example": "如：选择胆码 08，选择拖码 02 06 09 11，开奖号码为  06 08 11 09 02，即为中奖。",
          "help": "分别从胆码和拖码的01-11中，至少选择1个胆码和4个拖码组成一注，只要当期顺序摇出的5个开奖号码中同时包含所选的1个胆码和4个拖码，所选胆码必须全中，即为中奖。"
        },
        "11x5_dt_6": {
          "title": "任选六胆拖",
          "type": "select",
          "param": {
            "titles": [
              "胆码",
              "拖码"
            ],
            "begin": 1,
            "end": 11,
            "row_num_count": 11,
            "selector": 2,
            "selector_index": {
              "1": 1
            }
          },
          "calculate": {
            "method": "formula_dt",
            "limit_row": 0,
            "limit_rule": "no_repeat",
            "base_len": 5,
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从01-11中，选取6个及以上的号码进行投注，每注需至少包括1个胆码及5个拖码。",
          "example": "如：选择胆码 08，选择拖码 01 02 05 06 09 11，开奖号码为 06 08 11 09 02，即为中奖。",
          "help": "分别从胆码和拖码的01-11中，至少选择1个胆码和5个拖码组成一注，只要当期顺序摇出的5个开奖号码同时存在于胆码和拖码的任意组合中，即为中奖。"
        },
        "11x5_dt_7": {
          "title": "任选七胆拖",
          "type": "select",
          "param": {
            "titles": [
              "胆码",
              "拖码"
            ],
            "begin": 1,
            "end": 11,
            "row_num_count": 11,
            "selector": 2,
            "selector_index": {
              "1": 1
            }
          },
          "calculate": {
            "method": "formula_dt",
            "limit_row": 0,
            "limit_rule": "no_repeat",
            "base_len": 6,
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从01-11中，选取7个及以上的号码进行投注，每注需至少包括1个胆码及6个拖码。",
          "example": "如：选择胆码 08，选择拖码 01 02 05 06 07 09 11，开奖号码为 06 08 11 09 02，即为中奖。",
          "help": "分别从胆码和拖码的01-11中，至少选择1个胆码和6个拖码组成一注，只要当期顺序摇出的5个开奖号码同时存在于胆码和拖码的任意组合中，即为中奖。"
        }
      }
    }
  },
  "k3": {
    "num_min": 1,
    "num_max": 6,
    "num_len": 1,
    "run_num_length": 3,
    "wf_class": {
      "wf_bth": {
        "title": "不同号",
        "k3_2bth_bz": {
          "title": "二不同标准",
          "type": "select",
          "param": {
            "titles": [
              "号码"
            ],
            "begin": 1,
            "end": 6,
            "row_num_count": 6,
            "css": "dice"
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 2,
            "num_separator": ","
          },
          "explain": "从1-6中任意选择2个或2个以上号码。",
          "example": "投注方案：2,5<br>开奖号码中出现：1个2、1个5(顺序不限)，即为中奖。",
          "help": "从1-6中任意选择2个号码组成一注，顺序不限。开奖号码中出现所选的两个号码即为中奖。"
        },
        "k3_2bth_dt": {
          "title": "二不同胆拖",
          "type": "select",
          "param": {
            "titles": [
              "胆码",
              "拖码"
            ],
            "begin": 1,
            "end": 6,
            "row_num_count": 6,
            "css": "dice"
          },
          "calculate": {
            "method": "formula_dt",
            "limit_row": 0,
            "limit_rule": "no_repeat",
            "base_len": 1,
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从1-6中任意选择1个胆码以及1个以上的号码作为拖码。",
          "example": "二不同胆拖",
          "help": "从1-6中选择一个胆码和至少一个拖码，如果开奖号码中不重复数字至少包含胆码所选号码即为中奖。"
        },
        "k3_3bth_bz": {
          "title": "三不同标准",
          "type": "select",
          "param": {
            "titles": [
              "号码"
            ],
            "begin": 1,
            "end": 6,
            "row_num_count": 6,
            "css": "dice"
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 3,
            "num_separator": ","
          },
          "explain": "选择任意三个或以上的号码进行投注。",
          "example": "投注方案：2,5,6<br>开奖号码中出现：256,562,625(顺序不限)即中奖。",
          "help": "从1-6中任意选择3个(或以上)不相同号码组成一注，顺序不限，若其中三位与开奖号码相同即为中奖。"
        },
        "k3_3bth_dt": {
          "title": "三不同胆拖",
          "type": "select",
          "param": {
            "titles": [
              "胆码",
              "拖码"
            ],
            "begin": 1,
            "end": 6,
            "row_num_count": 6,
            "css": "dice"
          },
          "calculate": {
            "method": "formula_dt",
            "limit_row": 0,
            "limit_rule": "no_repeat",
            "base_len": 2,
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从1-6中任意选择1~2个胆码以及1个以上的号码作为拖码。",
          "example": "三不同胆拖",
          "help": "从1-6中选择1~2个胆码和至少一个拖码，如果开奖号码中至少包含胆码所选号码，即为中奖。"
        },
        "k3_3bth_hz": {
          "title": "三不同和值",
          "type": "select",
          "param": {
            "titles": [
              "和值"
            ],
            "begin": 6,
            "end": 15,
            "row_num_count": 10,
            "selector": 2,
            "value": "number"
          },
          "calculate": {
            "method": "formula_value_add",
            "value": "ks_sbt",
            "num_separator": "$"
          },
          "explain": "从6-15中任意选择1个或1个以上号码。",
          "example": "投注方案：和值9<br>开奖号码：234,423,342即为中奖",
          "help": "所选数值等于开奖号码相加之和，即为中奖。"
        }
      },
      "wf_th": {
        "title": "同号",
        "k3_2th_bz": {
          "title": "二同号标准",
          "type": "select",
          "param": {
            "titles": [
              "二同号",
              "不同号"
            ]
          },
          "calculate": {
            "method": "formula_num_multiply",
            "limit_row": 0,
            "limit_rule": "no_repeat",
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "选择1个对子（11,22,33,44,55,66）和1个不同号码(1,2,3,4,5,6)投注。",
          "example": "投注方案：112<br>开奖号码为112,121,211中任意一个，即为中奖。",
          "help": "选择一个对子(11,22,33,44,55,66)和一个不同号码(1,2,3,4,5,6)投注，选号与开奖号码一致即为中奖。"
        },
        "k3_2th_fx": {
          "title": "二同号复选",
          "type": "select",
          "param": {
            "titles": [
              "复选"
            ]
          },
          "calculate": {
            "method": "formula_num_count",
            "num_separator": ","
          },
          "explain": "选择对子(11*,22*,33*,44*,55*,66*)进行投注。",
          "example": "投注方案：11*<br>开奖号码：112,211,121，即中奖。",
          "help": "选择对子(11*,22*,33*,44*,55*,66*)投注，开奖号码中包含选择的对子即中奖。"
        },
        "k3_3th_thtx": {
          "title": "三同号通选",
          "type": "select",
          "param": {
            "titles": [
              "通选"
            ],
            "cs": "ks_sth",
            "css": "dice"
          },
          "calculate": {
            "method": "fixed_one",
            "limit_rule": "for_all",
            "value": "",
            "num_separator": ","
          },
          "explain": "对所有三同号（111,222,333,444,555,666）进行投注。",
          "example": "投注方案：通选<br>开奖号码中出现：222或3个其他数字，即中奖。",
          "help": "投注后，开奖号码为任意数字的三重号，即为中奖。"
        },
        "k3_3th_lhtx": {
          "title": "三连号通选",
          "type": "select",
          "param": {
            "titles": [
              "通选"
            ],
            "cs": "ks_slh",
            "css": "dice"
          },
          "calculate": {
            "method": "fixed_one",
            "limit_rule": "for_all",
            "value": "",
            "num_separator": ","
          },
          "explain": "对所有三个相连的号码进行投注。",
          "example": "投注方案：三连号通选<br>开奖号码：123或324或345或456即中奖。",
          "help": "开奖号码为三连号(123,234,345,456)即为中奖。"
        },
        "k3_3th_dx": {
          "title": "三同号单选",
          "type": "select",
          "param": {
            "titles": [
              "单选"
            ]
          },
          "calculate": {
            "method": "formula_num_count",
            "num_separator": ","
          },
          "explain": "选择任意一组以上三位相同的号码。",
          "example": "投注方案：222<br>开奖号码为222，即为中奖。",
          "help": "从111,222,333,444,555,666中选择任意一组或一组以上号码进行投注，选号与开奖号码一致即为中奖。"
        }
      },
      "wf_hz": {
        "title": "和值",
        "k3_hz_hz": {
          "title": "和值",
          "type": "select",
          "param": {
            "titles": [
              "和值"
            ],
            "begin": 3,
            "end": 18,
            "row_num_count": 8,
            "selector": 2,
            "value": "number"
          },
          "calculate": {
            "method": "formula_num_count",
            "num_separator": "$"
          },
          "explain": "从3-18中任意选择1个或1个以上号码。",
          "example": "投注方案：和值4<br>开奖号码：112，即为中奖。",
          "help": "所选数值等于开奖号码三个数字相加之和，即为中奖。"
        }
      }
    }
  },
  "pk10": {
    "num_min": 1,
    "num_max": 10,
    "num_len": 2,
    "wf_class": {
      "wf_cq1": {
        "title": "猜第一",
        "pk10_cq1_d1": {
          "title": "猜第一",
          "type": "select",
          "param": {
            "titles": [
              "冠军"
            ],
            "begin": 1,
            "end": 10,
            "row_num_count": 10,
            "selector": 2,
            "value": "number"
          },
          "calculate": {
            "method": "formula_num_count",
            "num_separator": ","
          },
          "explain": "猜冠军",
          "example": "猜冠军",
          "help": "猜冠军"
        }
      },
      "wf_cq2": {
        "title": "猜前二名",
        "pk10_cq2_d2": {
          "title": "第二名",
          "type": "select",
          "param": {
            "titles": [
              "亚军"
            ],
            "begin": 1,
            "end": 10,
            "row_num_count": 10,
            "selector": 2,
            "value": "number"
          },
          "calculate": {
            "method": "formula_num_count",
            "num_separator": ","
          },
          "explain": "猜亚军",
          "example": "猜亚军",
          "help": "猜亚军"
        },
        "pk10_cq2_q2": {
          "title": "猜前二",
          "type": "select",
          "param": {
            "titles": [
              "冠军",
              "亚军"
            ],
            "begin": 1,
            "end": 10,
            "row_num_count": 10,
            "selector": 2,
            "value": "number"
          },
          "calculate": {
            "method": "formula_count_no_repeat",
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "猜前二名",
          "example": "猜前二名",
          "help": "猜前二名"
        }
      },
      "wf_cq3": {
        "title": "猜前三名",
        "pk10_cq3_d3": {
          "title": "第三名",
          "type": "select",
          "param": {
            "titles": [
              "季军"
            ],
            "begin": 1,
            "end": 10,
            "row_num_count": 10,
            "selector": 2,
            "value": "number"
          },
          "calculate": {
            "method": "formula_num_count",
            "num_separator": ","
          },
          "explain": "猜季军",
          "example": "猜季军",
          "help": "猜季军"
        },
        "pk10_cq3_q3": {
          "title": "猜前三",
          "type": "select",
          "param": {
            "titles": [
              "冠军",
              "亚军",
              "季军"
            ],
            "begin": 1,
            "end": 10,
            "row_num_count": 10,
            "selector": 2,
            "value": "number"
          },
          "calculate": {
            "method": "formula_count_no_repeat",
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "猜前三名",
          "example": "猜前三名",
          "help": "猜前三名"
        }
      },
      "wf_cq4": {
        "title": "猜前四名",
        "pk10_cq4_d4": {
          "title": "第四名",
          "type": "select",
          "param": {
            "titles": [
              "第四名"
            ],
            "begin": 1,
            "end": 10,
            "row_num_count": 10,
            "selector": 2,
            "value": "number"
          },
          "calculate": {
            "method": "formula_num_count",
            "num_separator": ","
          },
          "explain": "猜第四名",
          "example": "猜第四名",
          "help": "猜第四名"
        },
        "pk10_cq4_q4": {
          "title": "猜前四",
          "type": "select",
          "param": {
            "titles": [
              "冠军",
              "亚军",
              "季军",
              "第四名"
            ],
            "begin": 1,
            "end": 10,
            "row_num_count": 10,
            "selector": 2,
            "value": "number"
          },
          "calculate": {
            "method": "formula_count_no_repeat",
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "猜前四名",
          "example": "猜前四名",
          "help": "猜前四名"
        }
      },
      "wf_cq5": {
        "title": "猜前五名",
        "pk10_cq5_d5": {
          "title": "第五名",
          "type": "select",
          "param": {
            "titles": [
              "第五名"
            ],
            "begin": 1,
            "end": 10,
            "row_num_count": 10,
            "selector": 2,
            "value": "number"
          },
          "calculate": {
            "method": "formula_num_count",
            "num_separator": ","
          },
          "explain": "猜第五名",
          "example": "猜第五名",
          "help": "猜第五名"
        },
        "pk10_cq5_q5": {
          "title": "猜前五",
          "type": "select",
          "param": {
            "titles": [
              "冠军",
              "亚军",
              "季军",
              "第四名",
              "第五名"
            ],
            "begin": 1,
            "end": 10,
            "row_num_count": 10,
            "selector": 2,
            "value": "number"
          },
          "calculate": {
            "method": "formula_count_no_repeat",
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "猜前五名",
          "example": "猜前五名",
          "help": "猜前五名"
        }
      },
      "wf_cq6": {
        "title": "猜前六名",
        "pk10_cq6_d6": {
          "title": "第六名",
          "type": "select",
          "param": {
            "titles": [
              "第六名"
            ],
            "begin": 1,
            "end": 10,
            "row_num_count": 10,
            "selector": 2,
            "value": "number"
          },
          "calculate": {
            "method": "formula_num_count",
            "num_separator": ","
          },
          "explain": "猜第六名",
          "example": "猜第六名",
          "help": "猜第六名"
        },
        "pk10_cq6_q6": {
          "title": "猜前六",
          "type": "select",
          "param": {
            "titles": [
              "冠军",
              "亚军",
              "季军",
              "第四名",
              "第五名",
              "第六名"
            ],
            "begin": 1,
            "end": 10,
            "row_num_count": 10,
            "selector": 2,
            "value": "number"
          },
          "calculate": {
            "method": "formula_count_no_repeat",
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "猜前六名",
          "example": "猜前六名",
          "help": "猜前六名"
        }
      },
      "wf_cq7": {
        "title": "猜前七名",
        "pk10_cq7_d7": {
          "title": "第七名",
          "type": "select",
          "param": {
            "titles": [
              "第七名"
            ],
            "begin": 1,
            "end": 10,
            "row_num_count": 10,
            "selector": 2,
            "value": "number"
          },
          "calculate": {
            "method": "formula_num_count",
            "num_separator": ","
          },
          "explain": "猜第七名",
          "example": "猜第七名",
          "help": "猜第七名"
        },
        "pk10_cq7_q7": {
          "title": "猜前七",
          "type": "select",
          "param": {
            "titles": [
              "冠军",
              "亚军",
              "季军",
              "第四名",
              "第五名",
              "第六名",
              "第七名"
            ],
            "begin": 1,
            "end": 10,
            "row_num_count": 10,
            "selector": 2,
            "value": "number"
          },
          "calculate": {
            "method": "formula_count_no_repeat",
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "猜前七名",
          "example": "猜前七名",
          "help": "猜前七名"
        }
      },
      "wf_cq8": {
        "title": "猜前八名",
        "pk10_cq8_d8": {
          "title": "第八名",
          "type": "select",
          "param": {
            "titles": [
              "第八名"
            ],
            "begin": 1,
            "end": 10,
            "row_num_count": 10,
            "selector": 2,
            "value": "number"
          },
          "calculate": {
            "method": "formula_num_count",
            "num_separator": ","
          },
          "explain": "猜第八名",
          "example": "猜第八名",
          "help": "猜第八名"
        },
        "pk10_cq8_q8": {
          "title": "猜前八",
          "type": "select",
          "param": {
            "titles": [
              "冠军",
              "亚军",
              "季军",
              "第四名",
              "第五名",
              "第六名",
              "第七名",
              "第八名"
            ],
            "begin": 1,
            "end": 10,
            "row_num_count": 10,
            "selector": 2,
            "value": "number"
          },
          "calculate": {
            "method": "formula_count_no_repeat",
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "猜前八名",
          "example": "猜前八名",
          "help": "猜前八名"
        }
      },
      "wf_cq9": {
        "title": "猜前九名",
        "pk10_cq9_d9": {
          "title": "第九名",
          "type": "select",
          "param": {
            "titles": [
              "第九名"
            ],
            "begin": 1,
            "end": 10,
            "row_num_count": 10,
            "selector": 2,
            "value": "number"
          },
          "calculate": {
            "method": "formula_num_count",
            "num_separator": ","
          },
          "explain": "猜第九名",
          "example": "猜第九名",
          "help": "猜第九名"
        },
        "pk10_cq9_q9": {
          "title": "猜前九",
          "type": "select",
          "param": {
            "titles": [
              "冠军",
              "亚军",
              "季军",
              "第四名",
              "第五名",
              "第六名",
              "第七名",
              "第八名",
              "第九名"
            ],
            "begin": 1,
            "end": 10,
            "row_num_count": 10,
            "selector": 2,
            "value": "number"
          },
          "calculate": {
            "method": "formula_count_no_repeat",
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "猜前九名",
          "example": "猜前九名",
          "help": "猜前九名"
        }
      },
      "wf_cq10": {
        "title": "猜前十名",
        "pk10_cq10_d10": {
          "title": "第十名",
          "type": "select",
          "param": {
            "titles": [
              "第十名"
            ],
            "begin": 1,
            "end": 10,
            "row_num_count": 10,
            "selector": 2,
            "value": "number"
          },
          "calculate": {
            "method": "formula_num_count",
            "num_separator": ","
          },
          "explain": "猜第十名",
          "example": "猜第十名",
          "help": "猜第十名"
        },
        "pk10_cq10_q10": {
          "title": "猜前十",
          "type": "select",
          "param": {
            "titles": [
              "冠军",
              "亚军",
              "季军",
              "第四名",
              "第五名",
              "第六名",
              "第七名",
              "第八名",
              "第九名",
              "第十名"
            ],
            "begin": 1,
            "end": 10,
            "row_num_count": 10,
            "selector": 2,
            "value": "number"
          },
          "calculate": {
            "method": "formula_count_no_repeat",
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "猜前十名",
          "example": "猜前十名",
          "help": "猜前十名"
        }
      },
      "wf_dwd": {
        "title": "定位胆",
        "pk10_gp_dwd_child": {
          "title": "定位胆",
          "type": "select",
          "param": {
            "titles": [
              "第一",
              "第二",
              "第三",
              "第四",
              "第五",
              "第六",
              "第七",
              "第八",
              "第九",
              "第十"
            ],
            "begin": 1,
            "end": 10,
            "row_num_count": 10,
            "selector": 2
          },
          "calculate": {
            "method": "formula_num_count",
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "定位胆",
          "example": "定位胆",
          "help": "定位胆"
        }
      },
      "wf_hz": {
        "title": "和值",
        "pk10_hz_gy": {
          "title": "冠亚和值",
          "type": "select",
          "param": {
            "titles": [
              "和值"
            ],
            "begin": 3,
            "end": 19,
            "row_num_count": 11,
            "selector": 1,
            "num_len": 1
          },
          "calculate": {
            "method": "formula_num_count",
            "num_separator": ","
          },
          "explain": "从3-19中任意选择1个或1个以上号码。",
          "example": "投注号码为14，比赛结果的冠军车号为8，亚军车号为6，冠、亚军车号相加的和值为14，与投注的号码相符合时视为中奖",
          "help": "投注号码为14，比赛结果的冠军车号为8，亚军车号为6，冠、亚军车号相加的和值为14，与投注的号码相符合时视为中奖"
        },
        "pk10_hz_gyj": {
          "title": "冠亚季和值",
          "type": "select",
          "param": {
            "titles": [
              "和值"
            ],
            "begin": 6,
            "end": 27,
            "row_num_count": 11,
            "selector": 1,
            "num_len": 1
          },
          "calculate": {
            "method": "formula_num_count",
            "num_separator": ","
          },
          "explain": "从6-27中任意选择1个或1个以上号码。",
          "example": "投注号码为8，比赛结果的冠军车号为1，亚军车号为2，季军车号为5，冠、亚、季军车号相加的和值为8，与投注的号码相符合时视为中奖",
          "help": "投注号码为8，比赛结果的冠军车号为1，亚军车号为2，季军车号为5，冠、亚、季军车号相加的和值为8，与投注的号码相符合时视为中奖"
        }
      },
      "wf_pk10_lhd": {
        "title": "龙虎斗",
        "pk10_lhd": {
          "title": "龙虎斗",
          "type": "select",
          "param": {
            "titles": [
              "一VS十",
              "二VS九",
              "三VS八",
              "四VS七",
              "五VS六"
            ],
            "cs": "pk_lhd",
            "selector": 1
          },
          "calculate": {
            "method": "formula_num_count",
            "value": "pk_lhd",
            "num_separator": ",",
            "group": "all_num"
          },
          "explain": "任意选择一个号码组成一注。",
          "example": "龙虎是由两两名次进行号码PK，第一名VS第十名、第二名VS第九名、第三名VS第八名、第四名VS第七名、第五名VS第六名",
          "help": "第一名、第二名、第三名、第四名、第五名为龙，第六名、第七名、第八名、第九名、第十名为虎。 假设:投注第二名:[龙]，比赛结果第二名为5，第九名为4，即为中奖。 假设:投注第五名:[龙]，比赛结果第五名为1，第六名为9，则为不中奖"
        }
      },
      "wf_dxds": {
        "title": "大小",
        "pk10_dxds_gj": {
          "title": "冠军大小单双",
          "type": "select",
          "param": {
            "titles": [
              "冠军"
            ],
            "cs": "dx_ds",
            "selector": 1
          },
          "calculate": {
            "method": "formula_num_multiply"
          },
          "explain": "冠军大小单双",
          "example": "冠军大小单双",
          "help": "冠军大小单双"
        },
        "pk10_dxds_yj": {
          "title": "亚军大小单双",
          "type": "select",
          "param": {
            "titles": [
              "亚军"
            ],
            "cs": "dx_ds",
            "selector": 1
          },
          "calculate": {
            "method": "formula_num_multiply"
          },
          "explain": "亚军大小单双",
          "example": "亚军大小单双",
          "help": "亚军大小单双"
        },
        "pk10_dxds_jj": {
          "title": "季军大小单双",
          "type": "select",
          "param": {
            "titles": [
              "季军"
            ],
            "cs": "dx_ds",
            "selector": 1
          },
          "calculate": {
            "method": "formula_num_multiply"
          },
          "explain": "季军大小单双",
          "example": "季军大小单双",
          "help": "季军大小单双"
        }
      }
    }
  },
  "kl10f": {
    "num_min": 1,
    "num_max": 20,
    "num_len": 2,
    "run_num_length": 8,
    "wf_class": {
      "wf_hz": {
        "title": "首快乐十分",
        "kl10f_10_swst": {
          "title": "首位数投",
          "type": "select",
          "param": {
            "titles": [
              "首位"
            ],
            "begin": 1,
            "end": 18,
            "row_num_count": 10,
            "selector": 2
          },
          "calculate": {
            "method": "formula_num_count",
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从01至18中任选1个,投注号码与开奖号码第一位相同即中奖。",
          "example": "从01至18中任选1个,投注号码与开奖号码第一位相同即中奖。",
          "help": "从01至18中任选1个,投注号码与开奖号码第一位相同即中奖。"
        },
        "kl10f_10_swht": {
          "title": "首位红投",
          "type": "select",
          "param": {
            "titles": [
              "首位"
            ],
            "begin": 19,
            "end": 20,
            "row_num_count": 10,
            "selector": 0
          },
          "calculate": {
            "method": "formula_num_count",
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "19，20为红号，从这两个号码任选一个投注，开奖号码第一位是红号（19或20）即中奖。",
          "example": "19，20为红号，从这两个号码任选一个投注，开奖号码第一位是红号（19或20）即中奖。",
          "help": "19，20为红号，从这两个号码任选一个投注，开奖号码第一位是红号（19或20）即中奖。"
        },
        "kl10f_10_2lzhi": {
          "title": "二连直",
          "type": "select",
          "param": {
            "titles": [
              "前位",
              "后位"
            ],
            "begin": 1,
            "end": 20,
            "row_num_count": 10,
            "selector": 2
          },
          "calculate": {
            "method": "formula_count_no_repeat",
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从20个号码中任选连续两位,投注号码与开奖号码任意连续两位数字、顺序均相同即中奖。",
          "example": "从20个号码中任选连续两位,投注号码与开奖号码任意连续两位数字、顺序均相同即中奖。",
          "help": "从20个号码中任选连续两位,投注号码与开奖号码任意连续两位数字、顺序均相同即中奖。"
        },
        "kl10f_10_2lzu": {
          "title": "二连组",
          "type": "select",
          "param": {
            "titles": [
              "二连组"
            ],
            "begin": 1,
            "end": 20,
            "row_num_count": 10,
            "selector": 2
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 2,
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从20个号码中任选2个,投注号与开奖号任意连续两位数字相同(顺序不限)即中。",
          "example": "从20个号码中任选2个,投注号与开奖号任意连续两位数字相同(顺序不限)即中。",
          "help": "从20个号码中任选2个,投注号与开奖号任意连续两位数字相同(顺序不限)即中。"
        },
        "kl10f_10_q3zhi": {
          "title": "前三直",
          "type": "select",
          "param": {
            "titles": [
              "第一位",
              "第二位",
              "第三位"
            ],
            "begin": 1,
            "end": 20,
            "row_num_count": 10,
            "selector": 2
          },
          "calculate": {
            "method": "formula_count_no_repeat",
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从20个号码中猜开奖号码前三位,投注号码与开奖号码前三位数字、顺序均相同即中奖。",
          "example": "从20个号码中猜开奖号码前三位,投注号码与开奖号码前三位数字、顺序均相同即中奖。",
          "help": "从20个号码中猜开奖号码前三位,投注号码与开奖号码前三位数字、顺序均相同即中奖。"
        },
        "kl10f_10_q3zu": {
          "title": "前三组",
          "type": "select",
          "param": {
            "titles": [
              "前三组"
            ],
            "begin": 1,
            "end": 20,
            "row_num_count": 10,
            "selector": 2
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 3,
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从20个号码中猜开奖号码的前三位,投注号与开奖号前三位数字相同(顺序不限)即中。",
          "example": "从20个号码中猜开奖号码的前三位,投注号与开奖号前三位数字相同(顺序不限)即中。",
          "help": "从20个号码中猜开奖号码的前三位,投注号与开奖号前三位数字相同(顺序不限)即中。"
        },
        "kl10f_10_kl2": {
          "title": "快乐二",
          "type": "select",
          "param": {
            "titles": [
              "快乐二"
            ],
            "begin": 1,
            "end": 20,
            "row_num_count": 10,
            "selector": 2
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 2,
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从20个号码中任选2个,投注号码与开奖号码任意两位相同即中奖。",
          "example": "从20个号码中任选2个,投注号码与开奖号码任意两位相同即中奖。",
          "help": "从20个号码中任选2个,投注号码与开奖号码任意两位相同即中奖。"
        },
        "kl10f_10_kl3": {
          "title": "快乐三",
          "type": "select",
          "param": {
            "titles": [
              "快乐三"
            ],
            "begin": 1,
            "end": 20,
            "row_num_count": 10,
            "selector": 2
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 3,
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从20个号码中任选3个,投注号码与开奖号码任意三位相同即中奖。",
          "example": "从20个号码中任选3个,投注号码与开奖号码任意三位相同即中奖。",
          "help": "从20个号码中任选3个,投注号码与开奖号码任意三位相同即中奖。"
        },
        "kl10f_10_kl4": {
          "title": "快乐四",
          "type": "select",
          "param": {
            "titles": [
              "快乐四"
            ],
            "begin": 1,
            "end": 20,
            "row_num_count": 10,
            "selector": 2
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 4,
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从20个号码中任选4个,投注号码与开奖号码任意四位相同即中奖。",
          "example": "从20个号码中任选4个,投注号码与开奖号码任意四位相同即中奖。",
          "help": "从20个号码中任选4个,投注号码与开奖号码任意四位相同即中奖。"
        },
        "kl10f_10_kl5": {
          "title": "快乐五",
          "type": "select",
          "param": {
            "titles": [
              "快乐五"
            ],
            "begin": 1,
            "end": 20,
            "row_num_count": 10,
            "selector": 2
          },
          "calculate": {
            "method": "formula_zx_fs",
            "base_len": 5,
            "num_separator": ",",
            "row_separator": "-"
          },
          "explain": "从20个号码中任选5个,投注号码与开奖号码任意五位相同即中奖。",
          "example": "从20个号码中任选5个,投注号码与开奖号码任意五位相同即中奖。",
          "help": "从20个号码中任选5个,投注号码与开奖号码任意五位相同即中奖。"
        }
      }
    }
  },
  "xy28": {
    "28_qt_csz": {
      "title": "猜数字",
      "special": "!0",
      "param": {
        "begin": 0,
        "end": 27,
        "row_num_count": 28
      },
      "calculate": {
        "method": "formula_zx_one_more",
        "oneRow": 0,
        "moreRow": 1,
        "base_len": 1
      },
      "explain": "和值为购买数字",
      "example": "和值为购买数字",
      "help": "和值为购买数字"
    }
  }
}