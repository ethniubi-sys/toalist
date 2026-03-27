/**
 * 深圳地铁各线路厕所分布数据
 * 数据来源：深圳地铁官方厕所分布表（1/2/3/4/5/6/8号线）
 */

export interface ToiletEntry {
  gate: "闸内" | "闸外" | "无";
  location: string;
  note: string;
}

export interface StationToilet {
  station: string;
  line: string;
  toilets: ToiletEntry[];
}

function t(gate: "闸内" | "闸外" | "无", location: string, note = ""): ToiletEntry {
  return { gate, location, note };
}

// ─── 1号线 ──────────────────────────────────────────────────────────────────

const LINE_1: StationToilet[] = [
  { station: "罗湖", line: "1号线", toilets: [t("闸外", "近B出入口（罗湖站交通层）")] },
  { station: "国贸", line: "1号线", toilets: [t("无", "无")] },
  { station: "老街", line: "1号线", toilets: [t("无", "无")] },
  { station: "大剧院", line: "1号线", toilets: [
    t("闸内", "5号线站台（往赤湾方向尾端）"),
    t("闸外", "5号线站厅（近G出入口）；1号线站厅（近B出入口）；2号线站厅（近F出入口）", "B口仅男女卫生间，F口仅无障碍卫生间"),
  ]},
  { station: "科学馆", line: "1号线", toilets: [
    t("闸外", "1号线站厅（A出入口通道内）；6号线站厅（近E出入口）"),
    t("闸内", "6号线站台（往科学馆方向头端）"),
  ]},
  { station: "华强路", line: "1号线", toilets: [t("闸外", "站厅（B出入口通道内）")] },
  { station: "岗厦", line: "1号线", toilets: [
    t("闸外", "站厅（G出入口通道内）"),
    t("闸内", "10号线站台（往福田口岸方向头端）"),
  ]},
  { station: "会展中心", line: "1号线", toilets: [t("闸外", "站厅（E出入口通道内）")] },
  { station: "购物公园", line: "1号线", toilets: [t("闸外", "3号线站厅（近H出入口）", "需步行约400米")] },
  { station: "香蜜湖", line: "1号线", toilets: [t("闸外", "站厅（B出入口通道内）")] },
  { station: "车公庙", line: "1号线", toilets: [
    t("闸内", "11号线站台（往红岭南方向尾端）；7/9号线站台（往深大丽湖方向尾端）；7/9号线站台（往文锦方向尾端）"),
    t("闸外", "1号线站厅（B出入口通道内）"),
  ]},
  { station: "竹子林", line: "1号线", toilets: [t("无", "无")] },
  { station: "侨城东", line: "1号线", toilets: [t("闸外", "站厅（A出入口通道内）")] },
  { station: "华侨城", line: "1号线", toilets: [t("闸外", "站厅（B出入口通道内）")] },
  { station: "世界之窗", line: "1号线", toilets: [t("闸外", "站厅（C出入口通道内）")] },
  { station: "白石洲", line: "1号线", toilets: [t("闸外", "站厅（A出入口通道内）", "因新线施工，已关闭")] },
  { station: "高新园", line: "1号线", toilets: [t("闸外", "站厅（D出入口通道内）", "因新线施工，已关闭")] },
  { station: "深大", line: "1号线", toilets: [
    t("闸内", "13号线站台（往李松蓢方向头端）"),
    t("闸外", "1号线站厅（A出入口通道内）；13号线站厅（J出入口通道内）"),
  ]},
  { station: "桃园", line: "1号线", toilets: [
    t("闸内", "12号线站厅中部（闸机内）"),
    t("闸外", "1号线站厅（C出入口通道内）"),
  ]},
  { station: "大新", line: "1号线", toilets: [t("闸外", "站厅（D出入口通道内）")] },
  { station: "鲤鱼门", line: "1号线", toilets: [t("闸外", "站厅（C出入口通道内）")] },
  { station: "前海湾", line: "1号线", toilets: [t("闸外", "站厅（B出入口通道内）")] },
  { station: "新安", line: "1号线", toilets: [t("闸外", "站厅（B出入口通道内）")] },
  { station: "宝安中心", line: "1号线", toilets: [t("闸外", "站厅（A出入口通道内）")] },
  { station: "宝体", line: "1号线", toilets: [t("闸外", "站厅（A出入口通道内）")] },
  { station: "坪洲", line: "1号线", toilets: [t("闸外", "站厅（A出入口通道内）")] },
  { station: "西乡", line: "1号线", toilets: [t("无", "无")] },
  { station: "固戍", line: "1号线", toilets: [t("闸外", "站厅（A出入口通道内）")] },
  { station: "后瑞", line: "1号线", toilets: [t("闸外", "站厅（B/C出入口通道内）")] },
  { station: "机场东", line: "1号线", toilets: [
    t("闸内", "1号线站厅地面层（近A出入口）；12号线站台（往松岗方向头端）"),
    t("闸外", "12号线站厅（D出入口通道内）"),
  ]},
];

// ─── 2/8号线 ────────────────────────────────────────────────────────────────

const LINE_2_8: StationToilet[] = [
  { station: "赤湾", line: "2号线", toilets: [t("闸外", "站厅（近C出入口）")] },
  { station: "蛇口港", line: "2号线", toilets: [t("闸外", "站厅（近D出入口）")] },
  { station: "海上世界", line: "2号线", toilets: [
    t("闸外", "2号线站厅（近C出入口）；12号线站厅（近F出入口）"),
    t("闸内", "12号线站台（往海上世界方向头端）"),
  ]},
  { station: "水湾", line: "2号线", toilets: [t("闸外", "站厅（近D出入口）")] },
  { station: "东角头", line: "2号线", toilets: [t("闸外", "站厅（近A出入口）")] },
  { station: "湾厦", line: "2号线", toilets: [t("闸外", "站厅（近A出入口）")] },
  { station: "海月", line: "2号线", toilets: [t("闸外", "站厅（近B出入口）")] },
  { station: "登良", line: "2号线", toilets: [t("闸外", "站厅（近D出入口）")] },
  { station: "后海", line: "2号线", toilets: [
    t("闸外", "2号线站厅（近D2出入口）；13号线站厅（近H出入口）"),
    t("闸内", "11号线站台（往岗厦北方向尾端）"),
  ]},
  { station: "科苑", line: "2号线", toilets: [
    t("闸外", "2号线站厅（近A出入口）；13号线站厅（近E出入口）"),
    t("闸内", "13号线站台（往李松蓢方向头端）"),
  ]},
  { station: "红树湾南", line: "2号线", toilets: [t("闸内", "9/11号线站台（中段）", "换乘站推荐在站台层使用")] },
  { station: "世界之窗", line: "2号线", toilets: [t("闸外", "1号线站厅（近C出入口）")] },
  { station: "侨城北", line: "2号线", toilets: [t("闸外", "站厅（近C出入口）")] },
  { station: "安托山", line: "2号线", toilets: [t("闸外", "7号线站厅（近B出入口）")] },
  { station: "侨香", line: "2号线", toilets: [t("闸外", "站厅（近C出入口）")] },
  { station: "香蜜", line: "2号线", toilets: [t("闸外", "站厅（近D出入口）")] },
  { station: "香梅北", line: "2号线", toilets: [t("闸外", "站厅（近B2出入口）")] },
  { station: "景田", line: "2号线", toilets: [
    t("闸外", "2号线站厅（近D出入口）"),
    t("闸内", "9号线站台（往文锦方向头端）"),
  ]},
  { station: "莲花西", line: "2号线", toilets: [t("闸外", "站厅（近A出入口）")] },
  { station: "福田", line: "2号线", toilets: [
    t("闸外", "2号线站厅（近27出入口）"),
    t("闸内", "11号线站台（往岗厦北方向头端）"),
  ]},
  { station: "市民中心", line: "2号线", toilets: [t("闸外", "4号线站厅（近B出入口）")] },
  { station: "岗厦北", line: "2号线", toilets: [t("闸内", "11/14号线站台（中段）", "枢纽站，各线路汇集点")] },
  { station: "华强北", line: "2号线", toilets: [
    t("闸外", "2号线站厅（近B出入口）"),
    t("闸内", "7号线站台（往太安方向尾端）"),
  ]},
  { station: "燕南", line: "2号线", toilets: [t("闸外", "站厅（近A出入口）")] },
  { station: "大剧院", line: "2号线", toilets: [
    t("闸外", "1号线站厅（近B出入口）；2号线站厅（近F出入口）", "F口仅限无障碍厕所"),
    t("闸内", "5号线站台（往赤湾方向尾端）"),
  ]},
  { station: "湖贝", line: "2号线", toilets: [t("闸外", "站厅（近D出入口）")] },
  { station: "黄贝岭", line: "2号线", toilets: [
    t("闸外", "2号线站厅（近B出入口）"),
    t("闸内", "5号线站台（往赤湾方向头端）"),
  ]},
  // 8号线
  { station: "新秀", line: "8号线", toilets: [t("闸外", "站厅（近B出入口）")] },
  { station: "莲塘口岸", line: "8号线", toilets: [t("闸外", "站厅（近A出入口）")] },
  { station: "仙湖路", line: "8号线", toilets: [t("闸外", "站厅（近C2出入口）")] },
  { station: "莲塘", line: "8号线", toilets: [t("闸外", "站厅（近A出入口）")] },
  { station: "梧桐山南", line: "8号线", toilets: [t("闸内", "站厅中部", "8号线起始段开始，闸内增多")] },
  { station: "沙头角", line: "8号线", toilets: [t("闸内", "站厅中部")] },
  { station: "海山", line: "8号线", toilets: [t("闸内", "站厅中部")] },
  { station: "盐田港西", line: "8号线", toilets: [t("闸内", "站厅中部")] },
  { station: "深外高中", line: "8号线", toilets: [t("闸内", "站厅中部")] },
  { station: "盐田路", line: "8号线", toilets: [t("闸内", "站厅中部")] },
  { station: "鸿安围", line: "8号线", toilets: [t("闸外", "站厅（近C出入口）")] },
  { station: "盐田墟", line: "8号线", toilets: [t("闸外", "站厅（近C出入口）")] },
  { station: "大梅沙", line: "8号线", toilets: [t("闸外", "站厅（近B出入口）")] },
  { station: "小梅沙", line: "8号线", toilets: [t("闸外", "站厅（近C出入口）")] },
  { station: "溪涌", line: "8号线", toilets: [t("闸外", "站厅（近A/B出入口）")] },
];

// ─── 3号线 ──────────────────────────────────────────────────────────────────

const LINE_3: StationToilet[] = [
  { station: "福保", line: "3号线", toilets: [t("闸内", "站厅中部")] },
  { station: "益田", line: "3号线", toilets: [t("闸外", "站厅（近B出入口）")] },
  { station: "购物公园", line: "3号线", toilets: [t("闸外", "3号线站厅（近H出入口）")] },
  { station: "福田", line: "3号线", toilets: [t("闸外", "2号线站厅（近27出入口）", "闸内推荐去11号线站台")] },
  { station: "少年宫", line: "3号线", toilets: [t("闸外", "4号线站厅（近B出入口）")] },
  { station: "莲花村", line: "3号线", toilets: [t("闸外", "站厅（近C出入口）")] },
  { station: "华新", line: "3号线", toilets: [t("闸外", "7号线站厅（近A/B出入口之间）")] },
  { station: "通新岭", line: "3号线", toilets: [t("闸外", "6号线站厅（近E出入口）")] },
  { station: "红岭", line: "3号线", toilets: [t("闸外", "9号线站厅（近G出入口）")] },
  { station: "老街", line: "3号线", toilets: [t("无", "无", "建议去附近商场")] },
  { station: "晒布", line: "3号线", toilets: [t("闸外", "站厅（近A出入口）")] },
  { station: "翠竹", line: "3号线", toilets: [t("闸外", "站厅（近B出入口）")] },
  { station: "田贝", line: "3号线", toilets: [t("闸内", "7号线站台（往西丽湖方向尾端）")] },
  { station: "水贝", line: "3号线", toilets: [t("闸外", "站厅（近A出入口）")] },
  { station: "草埔", line: "3号线", toilets: [t("闸外", "站厅（近D出入口）")] },
  { station: "布吉", line: "3号线", toilets: [t("闸内", "14号线站台（往岗厦北方向头端）", "枢纽站，各层分布较多")] },
  { station: "木棉湾", line: "3号线", toilets: [t("闸外", "站厅（近B出入口）")] },
  { station: "大芬", line: "3号线", toilets: [t("闸外", "站厅（近A1/A2出入口之间）")] },
  { station: "丹竹头", line: "3号线", toilets: [t("闸外", "站厅（近A出入口）")] },
  { station: "六约", line: "3号线", toilets: [t("闸外", "站厅（近A出入口）")] },
  { station: "塘坑", line: "3号线", toilets: [t("闸内", "站厅中部")] },
  { station: "横岗", line: "3号线", toilets: [t("闸外", "站厅（近B出入口）")] },
  { station: "永湖", line: "3号线", toilets: [t("闸外", "站厅（近A2出入口）")] },
  { station: "荷坳", line: "3号线", toilets: [t("闸外", "站厅（近B出入口）")] },
  { station: "大运", line: "3号线", toilets: [t("闸内", "14/16号线站台（中段）", "综合枢纽")] },
  { station: "爱联", line: "3号线", toilets: [t("闸外", "站厅（近B/C出入口之间）")] },
  { station: "吉祥", line: "3号线", toilets: [t("闸外", "站厅（近A/B出入口之间）")] },
  { station: "龙城广场", line: "3号线", toilets: [t("闸外", "站厅（近C出入口）")] },
  { station: "南联", line: "3号线", toilets: [t("闸外", "站厅（近B1/B2出入口之间）")] },
  { station: "双龙", line: "3号线", toilets: [t("闸外", "站厅（近A出入口）")] },
  { station: "梨园", line: "3号线", toilets: [t("闸外", "站厅（近B/C出入口之间）")] },
  { station: "新生", line: "3号线", toilets: [
    t("闸内", "站台（往坪地六联方向头端）；站台（往福保方向尾端）"),
    t("闸外", "站厅（近C出入口）"),
  ]},
  { station: "坪西", line: "3号线", toilets: [t("闸外", "站厅（近D出入口）")] },
  { station: "低碳城", line: "3号线", toilets: [t("闸外", "站厅（近B出入口）")] },
  { station: "白石塘", line: "3号线", toilets: [t("闸外", "站厅（近D出入口）")] },
  { station: "富坪", line: "3号线", toilets: [t("闸外", "站厅（近D出入口）")] },
  { station: "坪地六联", line: "3号线", toilets: [t("闸外", "站厅（近D出入口）")] },
];

// ─── 4号线 ──────────────────────────────────────────────────────────────────

const LINE_4: StationToilet[] = [
  { station: "福田口岸", line: "4号线", toilets: [t("闸外", "站厅（近A出入口）")] },
  { station: "福民", line: "4号线", toilets: [t("闸内", "7/10号线站台（中段）")] },
  { station: "会展中心", line: "4号线", toilets: [t("闸外", "站厅（近E出入口）")] },
  { station: "市民中心", line: "4号线", toilets: [t("闸外", "4号线站厅（近B出入口）")] },
  { station: "少年宫", line: "4号线", toilets: [t("闸外", "4号线站厅（近B出入口）")] },
  { station: "莲花北", line: "4号线", toilets: [t("闸外", "站厅（近A出入口）")] },
  { station: "上梅林", line: "4号线", toilets: [t("闸内", "9号线站台（往文锦方向头端）")] },
  { station: "民乐", line: "4号线", toilets: [t("闸外", "站厅（近B出入口）")] },
  { station: "白石龙", line: "4号线", toilets: [t("闸内", "站厅中部")] },
  { station: "深圳北", line: "4号线", toilets: [t("闸内", "站厅中部")] },
  { station: "红山", line: "4号线", toilets: [t("闸内", "站厅中部")] },
  { station: "上塘", line: "4号线", toilets: [t("闸外", "站厅（近A1/A2出入口之间）")] },
  { station: "龙胜", line: "4号线", toilets: [t("闸外", "站厅（近A1/A2出入口之间）")] },
  { station: "龙华", line: "4号线", toilets: [t("闸外", "站厅（近A出入口）")] },
  { station: "清湖", line: "4号线", toilets: [t("闸内", "站厅中部")] },
  { station: "清湖北", line: "4号线", toilets: [t("闸内", "站厅中部")] },
  { station: "竹村", line: "4号线", toilets: [t("闸内", "站厅中部")] },
  { station: "茜坑", line: "4号线", toilets: [t("闸内", "站厅中部")] },
  { station: "长湖", line: "4号线", toilets: [t("闸内", "站厅中部")] },
  { station: "观澜", line: "4号线", toilets: [t("闸内", "站厅中部")] },
  { station: "松元厦", line: "4号线", toilets: [t("闸内", "站厅中部")] },
  { station: "观澜湖", line: "4号线", toilets: [t("闸内", "站厅中部")] },
  { station: "牛湖", line: "4号线", toilets: [t("闸内", "站厅中部")] },
];

// ─── 5号线 ──────────────────────────────────────────────────────────────────

const LINE_5: StationToilet[] = [
  { station: "赤湾", line: "5号线", toilets: [t("闸外", "5号线站厅（近E出入口）；2号线站厅（近C出入口）")] },
  { station: "荔湾", line: "5号线", toilets: [t("闸外", "站厅（近B出入口）")] },
  { station: "铁路公园", line: "5号线", toilets: [t("闸外", "站厅（近B出入口）")] },
  { station: "妈湾", line: "5号线", toilets: [t("闸外", "站厅（近C出入口）")] },
  { station: "前湾公园", line: "5号线", toilets: [t("闸外", "站厅（近C出入口）")] },
  { station: "前湾", line: "5号线", toilets: [t("闸内", "5号线站台（往赤湾方向头端）"), t("闸外", "站厅（近B出入口）")] },
  { station: "桂湾", line: "5号线", toilets: [t("闸外", "站厅（近B出入口）")] },
  { station: "前海湾", line: "5号线", toilets: [t("闸外", "1号线站厅（近B出入口）")] },
  { station: "临海", line: "5号线", toilets: [t("闸外", "站厅（近B出入口）", "暂未启用")] },
  { station: "宝华", line: "5号线", toilets: [t("闸外", "站厅（近D出入口）")] },
  { station: "宝安中心", line: "5号线", toilets: [t("闸外", "站厅（近A出入口）")] },
  { station: "翻身", line: "5号线", toilets: [t("闸外", "站厅（近C出入口）")] },
  { station: "灵芝", line: "5号线", toilets: [
    t("闸内", "12号线站台（往松岗方向头端）；12号线站台（往左炮台东方向尾端）"),
    t("闸外", "站厅（近B出入口）"),
  ]},
  { station: "洪浪北", line: "5号线", toilets: [t("闸外", "站厅（近C出入口）")] },
  { station: "兴东", line: "5号线", toilets: [t("闸外", "站厅（近B出入口）")] },
  { station: "留仙洞", line: "5号线", toilets: [
    t("闸内", "13号线站台（往李松蓢方向尾端）"),
    t("闸外", "5号线站厅（近C出入口）；13号线站厅（近F出入口）"),
  ]},
  { station: "西丽", line: "5号线", toilets: [
    t("闸内", "7号线站台（往深大丽湖方向头端）；7号线站台（往太安方向尾端）"),
    t("闸外", "5号线站厅（近F出入口）"),
  ]},
  { station: "大学城", line: "5号线", toilets: [t("闸外", "站厅（近C出入口）")] },
  { station: "塘朗", line: "5号线", toilets: [t("闸外", "站厅（近C出入口）")] },
  { station: "长岭陂", line: "5号线", toilets: [t("闸外", "站厅（近A出入口）")] },
  { station: "深圳北", line: "5号线", toilets: [t("闸内", "4号线站厅中部")] },
  { station: "民治", line: "5号线", toilets: [t("闸外", "站厅（近B出入口）")] },
  { station: "五和", line: "5号线", toilets: [
    t("闸内", "10号线站台（往福田口岸方向头端）"),
    t("闸外", "站厅（近A出入口）"),
  ]},
  { station: "坂田", line: "5号线", toilets: [t("闸外", "站厅（近A出入口）")] },
  { station: "杨美", line: "5号线", toilets: [t("闸外", "站厅（近D出入口）")] },
  { station: "上水径", line: "5号线", toilets: [t("闸外", "站厅（近C出入口）")] },
  { station: "下水径", line: "5号线", toilets: [t("闸外", "站厅（近A出入口）")] },
  { station: "长龙", line: "5号线", toilets: [t("闸外", "站厅（近A出入口）")] },
  { station: "布吉", line: "5号线", toilets: [
    t("闸内", "14号线站台（往沙田方向头端）"),
    t("闸外", "14号线站厅（近D出入口）"),
  ]},
  { station: "百鸽笼", line: "5号线", toilets: [t("闸外", "站厅（近D出入口）")] },
  { station: "布心", line: "5号线", toilets: [t("闸外", "站厅（近B出入口）")] },
  { station: "太安", line: "5号线", toilets: [t("闸外", "站厅（近C出入口）")] },
  { station: "怡景", line: "5号线", toilets: [t("闸外", "站厅（近C出入口）")] },
  { station: "黄贝岭", line: "5号线", toilets: [t("闸外", "站厅（近B出入口）")] },
  { station: "湖贝", line: "5号线", toilets: [t("闸外", "站厅（近G出入口）")] },
  { station: "东门", line: "5号线", toilets: [t("闸外", "站厅（下沉广场）")] },
  { station: "大剧院", line: "5号线", toilets: [
    t("闸内", "5号线站台（往赤湾方向尾端）"),
    t("闸外", "5号线站厅（近G出入口）；2号线站厅（近F出入口）；1号线站厅（近B出入口）"),
  ]},
];

// ─── 6号线 ──────────────────────────────────────────────────────────────────

const LINE_6: StationToilet[] = [
  { station: "科学馆", line: "6号线", toilets: [
    t("闸内", "6号线站台（往科学馆方向头端）"),
    t("闸外", "6号线站厅（近E出入口）；1号线站厅（A出入口通道内）"),
  ]},
  { station: "通新岭", line: "6号线", toilets: [
    t("闸内", "6号线站台（往松岗方向头端）"),
    t("闸外", "3号线站厅（近C出入口）"),
  ]},
  { station: "体育中心", line: "6号线", toilets: [t("闸外", "站厅（近B出入口）")] },
  { station: "八卦岭", line: "6号线", toilets: [
    t("闸内", "6号线站台（往科学馆方向尾端）；7号线站台（往深大丽湖方向尾端）"),
    t("闸外", "6号线站厅（近E出入口）；7号线站厅（近B出入口）"),
  ]},
  { station: "银湖", line: "6号线", toilets: [t("闸内", "6号线站台（往科学馆方向尾端）"), t("闸外", "站厅（近B出入口）")] },
  { station: "翰岭", line: "6号线", toilets: [t("闸外", "站厅（近B出入口）")] },
  { station: "梅林关", line: "6号线", toilets: [t("闸外", "站厅（近A出入口）")] },
  { station: "深圳北", line: "6号线", toilets: [t("闸内", "4号线站厅中部")] },
  { station: "红山", line: "6号线", toilets: [t("闸内", "6号线站厅中部；4号线站厅中部")] },
  { station: "上芬", line: "6号线", toilets: [t("闸外", "站厅（A/D出入口之间）")] },
  { station: "元芬", line: "6号线", toilets: [t("闸外", "站厅（近D出入口）")] },
  { station: "阳台山东", line: "6号线", toilets: [t("闸外", "站厅（近B出入口）")] },
  { station: "官田", line: "6号线", toilets: [t("闸外", "站厅（近D出入口）")] },
  { station: "上屋", line: "6号线", toilets: [t("闸内", "13号线站台（往李松蓢方向尾端）"), t("闸外", "6号线站厅（近D出入口）；13号线站厅（近E出入口）")] },
  { station: "长圳", line: "6号线", toilets: [t("闸外", "站厅（近D出入口垂梯旁）")] },
  { station: "凤凰城", line: "6号线", toilets: [t("闸外", "站厅（近C出入口）")] },
  { station: "光明大街", line: "6号线", toilets: [t("闸外", "站厅（A/D出入口之间）")] },
  { station: "光明", line: "6号线", toilets: [t("闸外", "站厅（近C出入口）")] },
  { station: "科学公园", line: "6号线", toilets: [t("闸外", "站厅（近C出入口）")] },
  { station: "楼村", line: "6号线", toilets: [t("闸外", "站厅（近C出入口）")] },
  { station: "红花山", line: "6号线", toilets: [t("闸外", "站厅（近D出入口）")] },
  { station: "公明广场", line: "6号线", toilets: [t("闸外", "站厅（近B出入口）")] },
  { station: "合水口", line: "6号线", toilets: [t("闸外", "站厅（近C出入口）")] },
  { station: "薯田埔", line: "6号线", toilets: [t("闸外", "站厅（近C出入口）")] },
  { station: "松岗公园", line: "6号线", toilets: [t("闸外", "站厅（近B出入口）")] },
  { station: "溪头", line: "6号线", toilets: [t("闸外", "站厅（近D出入口）")] },
  { station: "松岗", line: "6号线", toilets: [
    t("闸内", "6号线站台（往松岗方向中部）；6号线站台（往科学馆方向中部）；11号线站台（往碧头方向头端）"),
    t("闸外", "6/11号线站厅（近F出入口）"),
  ]},
];

// ─── 全部数据导出 ───────────────────────────────────────────────────────────

export const ALL_METRO_TOILETS: StationToilet[] = [
  ...LINE_1,
  ...LINE_2_8,
  ...LINE_3,
  ...LINE_4,
  ...LINE_5,
  ...LINE_6,
];

/** 按线路分组获取 */
export function getToiletsByLine(line: string): StationToilet[] {
  const normalized = line.replace(/[号线地铁\s]/g, "");
  return ALL_METRO_TOILETS.filter((s) => {
    const sNorm = s.line.replace(/[号线地铁\s]/g, "");
    return sNorm === normalized;
  });
}

/** 检测搜索词是否为地铁线路查询，返回匹配的线号或 null */
export function detectLineSearch(query: string): string | null {
  const CN_NUM: Record<string, string> = {
    "一": "1", "二": "2", "三": "3", "四": "4", "五": "5",
    "六": "6", "七": "7", "八": "8", "九": "9", "十": "10",
  };
  let q = query.trim();
  for (const [cn, num] of Object.entries(CN_NUM)) {
    q = q.replace(cn, num);
  }
  const m = q.match(/(\d{1,2})\s*号?\s*线/);
  if (m) return `${m[1]}号线`;
  if (/^地铁\s*(\d{1,2})$/.test(q)) return `${q.match(/(\d{1,2})/)?.[1]}号线`;
  return null;
}

/** 获取所有有数据的线路列表 */
export function getAvailableLines(): string[] {
  return [...new Set(ALL_METRO_TOILETS.map((s) => s.line))].sort((a, b) => {
    const na = parseInt(a);
    const nb = parseInt(b);
    return na - nb;
  });
}
