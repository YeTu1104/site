// map-date.js 完整代码
// 坐标单位：背景图原始像素，背景图尺寸：1820 × 1820
window.GAME_ZONES = [
  {
    "id": "PC",
    "name": "电脑桌",
    "trigger": "click",
    "points": [
      [75, 992],
      [500, 766],
      [730, 890],
      [275, 1130]
    ],
    "stand": {
      "x": 590,
      "y": 1192
    }
  },
  {
    "id": "art_1",
    "name": "作品集",
    "trigger": "click",
    "points": [
      [924, 666],
      [941, 245],
      [1324, 421],
      [1320, 653],
      [1198, 594],
      [1196, 651],
      [1047, 592],
      [1045, 675],
      [945, 636]
    ],
    "stand": {
      "x": 1005,
      "y": 1005
    }
  },
  {
    "id": "wyy_1",
    "name": "歌单",
    "trigger": "click",
    "points": [
      [928, 745],
      [1169, 868],
      [1269, 809],
      [1035, 700]
    ],
    "stand": {
      "x": 1069,
      "y": 1047
    }
  },
  {
    "id": "boot_1",
    "name": "备忘板",
    "trigger": "click",
    "points": [
      [106, 600],
      [456, 439],
      [464, 700],
      [447, 679],
      [275, 754],
      [277, 785],
      [111, 854]
    ],
    "stand": {
      "x": 588,
      "y": 1181
    }
  },
  {
    "id": "stop_1",
    "name": "活动区域",
    "trigger": "block",
    "points": [
      [253, 1347],
      [928, 949],
      [1614, 1320],
      [1264, 1509],
      [932, 1686],
      [896, 1703],
      [866, 1677],
      [636, 1552]
    ],
    "stand": {
      "x": 934,
      "y": 1713
    }
  }
];

// 地图数据转换逻辑
(function transformMapData() {
  if (!window.GAME_ZONES || !Array.isArray(window.GAME_ZONES)) {
    console.error("window.GAME_ZONES 未定义或格式错误");
    window.MAP_DATA = null;
    return;
  }

  let movableArea = null;
  const interactiveZones = [];

  window.GAME_ZONES.forEach(function (zone) {
    const formattedZone = {
      id: zone.id,
      name: zone.name,
      trigger: zone.trigger,
      points: zone.points,
      stand: zone.stand ? { x: zone.stand.x, y: zone.stand.y } : null
    };

    if (zone.id === 'stop_1' || zone.trigger === 'block') {
      movableArea = formattedZone;
    } else {
      interactiveZones.push(formattedZone);
    }
  });

  window.MAP_DATA = {
    movableArea: movableArea,
    interactiveZones: interactiveZones,
    rawZones: window.GAME_ZONES
  };
})();