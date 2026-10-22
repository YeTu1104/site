/** ================================================
 *  复古像素作品集配置文件 (works.js)
 *  本文件由「作品集管理工作台」自动生成。
 *  建议以后都用工作台维护，不要手动改这里。
 * ================================================ */

const DEBUG = false;
const HOME_URL = "../../../../index.html";
const SECRET_VIDEO = "assets/Never Gonna Give You Up-h264.mp4";

function generatePlaceholder(text, bgColor, textColor) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="${bgColor}"/>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="${textColor}" stroke-width="0.5" opacity="0.15"/></pattern>
    <rect width="400" height="300" fill="url(#grid)"/>
    <circle cx="200" cy="130" r="45" fill="none" stroke="${textColor}" stroke-width="3"/>
    <text x="200" y="135" font-family="monospace" font-size="20" font-weight="bold" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>
    <text x="200" y="220" font-family="sans-serif" font-size="12" fill="${textColor}" opacity="0.7" text-anchor="middle">点击查看详情</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

const WORKS = {
  "LIVE2D": [
    // LIVE2D-01
    {
      thumb: "assets/live2d/s1.webp",
      full: "assets/live2d/01.mp4",
      note: "模型师：玥"
    },
    // LIVE2D-02
    {
      thumb: "assets/live2d/suolue-02.webp",
      full: "assets/live2d/02.mp4",
      note: "模型师：不具名"
    },
    // LIVE2D-03
    {
      thumb: "assets/live2d/suolue-03.webp",
      full: "assets/live2d/03.mp4",
      note: "模型师：玥"
    },
    // LIVE2D-04
    {
      thumb: "assets/live2d/suolue-04.webp",
      full: "assets/live2d/04.mp4",
      note: "模型师：西豆籽"
    },
    // LIVE2D-05
    {
      thumb: "assets/live2d/suolue-07.webp",
      full: "assets/live2d/07.mp4",
      note: "模型师：鱼紫"
    },
    // LIVE2D-06
    {
      thumb: "assets/live2d/suolue-05.webp",
      full: "assets/live2d/05.mp4",
      note: "模型师：缘青青青"
    },
    // LIVE2D-07
    {
      thumb: "assets/live2d/suolue-08.webp",
      full: "assets/live2d/08.mp4",
      note: "模型师：南岸瑠花"
    }
  ],
  "立绘": [
    // 立绘-01
    {
      thumb: "assets/立绘/suolue-3.webp",
      full: "assets/立绘/3.webp"
    },
    // 立绘-02
    {
      thumb: "assets/立绘/suolue-4.webp",
      full: "assets/立绘/4.webp"
    },
    // 立绘-03
    {
      thumb: "assets/立绘/suolue-1.webp",
      full: "assets/立绘/1.webp"
    },
    // 立绘-04
    {
      thumb: "assets/立绘/suolue-2.webp",
      full: "assets/立绘/2.webp"
    },
    // 立绘-05
    {
      thumb: "assets/立绘/suolue-5.webp",
      full: "assets/立绘/5.webp"
    },
    // 立绘-06
    {
      thumb: "assets/立绘/suolue-06.webp",
      full: "assets/立绘/06.webp"
    },
    // 立绘-07
    {
      thumb: "assets/立绘/suolue-07.webp",
      full: "assets/立绘/07.webp"
    },
    // 立绘-08
    {
      thumb: "assets/立绘/suolue-08.webp",
      full: "assets/立绘/08.webp"
    },
    // 立绘-09
    {
      thumb: "assets/立绘/suolue-13.webp",
      full: "assets/立绘/13.webp"
    },
    // 立绘-10
    {
      thumb: "assets/立绘/suolue-09.webp",
      full: "assets/立绘/09.webp"
    },
    // 立绘-11
    {
      thumb: "assets/立绘/suolue-10.webp",
      full: "assets/立绘/10.webp"
    },
    // 立绘-12
    {
      thumb: "assets/立绘/suolue-11.webp",
      full: "assets/立绘/11.webp"
    }
  ],
  "插画": [
    // 插画-01
    {
      thumb: "assets/插画/suolue-01.webp",
      full: "assets/插画/01.webp"
    },
    // 插画-02
    {
      thumb: "assets/插画/suolue-02.webp",
      full: "assets/插画/02.webp"
    },
    // 插画-03
    {
      thumb: "assets/插画/suolue-03.webp",
      full: "assets/插画/03.webp"
    },
    // 插画-04
    {
      thumb: "assets/插画/suolue-04.webp",
      full: "assets/插画/04.webp"
    },
    // 插画-05
    {
      thumb: "assets/插画/suolue-05.webp",
      full: "assets/插画/05.webp"
    },
    // 插画-06
    {
      thumb: "assets/插画/suolue-06.webp",
      full: "assets/插画/06.webp"
    },
    // 插画-07
    {
      thumb: "assets/插画/suolue-07.webp",
      full: "assets/插画/07.webp"
    },
    // 插画-08
    {
      thumb: "assets/插画/suolue-08.webp",
      full: "assets/插画/08.webp"
    },
    // 插画-09
    {
      thumb: "assets/插画/suolue-09.webp",
      full: "assets/插画/09.webp"
    },
    // 插画-10
    {
      thumb: "assets/插画/suolue-10.webp",
      full: "assets/插画/10.webp"
    },
    // 插画-11
    {
      thumb: "assets/插画/suolue-11.webp",
      full: "assets/插画/11.webp"
    },
    // 插画-12
    {
      thumb: "assets/插画/suolue-12.webp",
      full: "assets/插画/12.webp"
    },
    // 插画-13
    {
      thumb: "assets/插画/suolue-13.webp",
      full: "assets/插画/13.webp"
    },
    // 插画-14
    {
      thumb: "assets/插画/suolue-14.webp",
      full: "assets/插画/14.webp"
    },
    // 插画-15
    {
      thumb: "assets/插画/suolue-15.webp",
      full: "assets/插画/15.webp"
    },
    // 插画-16
    {
      thumb: "assets/插画/suolue-16.webp",
      full: "assets/插画/16.webp"
    },
    // 插画-17
    {
      thumb: "assets/插画/suolue-17.webp",
      full: "assets/插画/17.webp"
    },
    // 插画-18
    {
      thumb: "assets/插画/suolue-18.webp",
      full: "assets/插画/18.webp"
    },
    // 插画-19
    {
      thumb: "assets/插画/suolue-19.webp",
      full: "assets/插画/19.webp"
    },
    // 插画-20
    {
      thumb: "assets/插画/suolue-20.webp",
      full: "assets/插画/20.webp"
    },
    // 插画-21
    {
      thumb: "assets/插画/suolue-21.webp",
      full: "assets/插画/21.webp"
    },
    // 插画-22
    {
      thumb: "assets/插画/suolue-22.webp",
      full: "assets/插画/22.webp"
    }
  ],
  "Q版": [
    // Q版-01
    {
      thumb: "assets/Q版/suolue-03.webp",
      full: "assets/Q版/03.webp"
    },
    // Q版-02
    {
      thumb: "assets/Q版/suolue-01.webp",
      full: "assets/Q版/01.webp"
    },
    // Q版-03
    {
      thumb: "assets/Q版/suolue-02.webp",
      full: "assets/Q版/02.webp"
    },
    // Q版-04
    {
      thumb: "assets/Q版/suolue-04.webp",
      full: "assets/Q版/04.webp"
    },
    // Q版-05
    {
      thumb: "assets/Q版/suolue-05.webp",
      full: "assets/Q版/05.webp"
    },
    // Q版-06
    {
      thumb: "assets/Q版/suolue-06.webp",
      full: "assets/Q版/06.webp"
    },
    // Q版-07
    {
      thumb: "assets/Q版/suolue-07.webp",
      full: "assets/Q版/07.webp"
    },
    // Q版-08
    {
      thumb: "assets/Q版/suolue-08.webp",
      full: "assets/Q版/08.webp"
    },
    // Q版-09
    {
      thumb: "assets/Q版/suolue-09.webp",
      full: "assets/Q版/09.webp"
    }
  ],
  "角色设计": [
    // 角色设计-01
    {
      thumb: "assets/角色设计/suolue-01.webp",
      full: "assets/角色设计/01.webp"
    },
    // 角色设计-02
    {
      thumb: "assets/角色设计/suolue-02.webp",
      full: "assets/角色设计/02.webp"
    },
    // 角色设计-03
    {
      thumb: "assets/角色设计/suolue-12.webp",
      full: "assets/角色设计/12.webp"
    },
    // 角色设计-04
    {
      thumb: "assets/角色设计/suolue-03.webp",
      full: "assets/角色设计/03.webp"
    },
    // 角色设计-05
    {
      thumb: "assets/角色设计/suolue-04.webp",
      full: "assets/角色设计/04.webp"
    },
    // 角色设计-06
    {
      thumb: "assets/角色设计/suolue-05.webp",
      full: "assets/角色设计/05.webp"
    },
    // 角色设计-07
    {
      thumb: "assets/角色设计/suolue-06.webp",
      full: "assets/角色设计/06.webp"
    },
    // 角色设计-08
    {
      thumb: "assets/角色设计/suolue-07.webp",
      full: "assets/角色设计/07.webp"
    },
    // 角色设计-09
    {
      thumb: "assets/角色设计/suolue-08.webp",
      full: "assets/角色设计/08.webp"
    },
    // 角色设计-10
    {
      thumb: "assets/角色设计/suolue-09.webp",
      full: "assets/角色设计/09.webp"
    },
    // 角色设计-11
    {
      thumb: "assets/角色设计/suolue-10.webp",
      full: "assets/角色设计/10.webp"
    },
    // 角色设计-12
    {
      thumb: "assets/角色设计/suolue-11.webp",
      full: "assets/角色设计/11.webp"
    }
  ]
};