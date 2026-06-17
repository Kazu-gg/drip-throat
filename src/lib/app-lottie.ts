/** Minimal gold-themed Lottie animations for the app phone mockup */

const gold = [0.831, 0.686, 0.216, 1] as const;
const goldSoft = [0.831, 0.686, 0.216, 0.35] as const;

function pulseRing(name: string, size = 100) {
  return {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 90,
    w: 280,
    h: 280,
    nm: name,
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Ring",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: {
            a: 1,
            k: [
              { t: 0, s: [0], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
              { t: 90, s: [360] },
            ],
          },
          p: { a: 0, k: [140, 140, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: {
            a: 1,
            k: [
              { t: 0, s: [100, 100, 100], i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] } },
              { t: 45, s: [112, 112, 100], i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] } },
              { t: 90, s: [100, 100, 100] },
            ],
          },
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "el",
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [size, size] },
                nm: "Ellipse",
                d: 1,
              },
              {
                ty: "st",
                c: { a: 0, k: [...gold] },
                o: { a: 0, k: 100 },
                w: { a: 0, k: 3 },
                lc: 1,
                lj: 1,
                ml: 4,
                nm: "Stroke",
              },
              {
                ty: "tr",
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 },
                sk: { a: 0, k: 0 },
                sa: { a: 0, k: 0 },
                nm: "Transform",
              },
            ],
            nm: "Group",
            np: 2,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: "ADBE Vector Group",
            hd: false,
          },
        ],
        ip: 0,
        op: 90,
        st: 0,
        bm: 0,
      },
    ],
  };
}

function dotGrid(name: string) {
  const positions = [
    [-40, -40],
    [0, -40],
    [40, -40],
    [-40, 0],
    [0, 0],
    [40, 0],
    [-40, 40],
    [0, 40],
    [40, 40],
  ];

  const layers = positions.map(([x, y], i) => ({
    ddd: 0,
    ind: i + 1,
    ty: 4,
    nm: `Dot ${i}`,
    sr: 1,
    ks: {
      o: {
        a: 1,
        k: [
          { t: 0, s: [30], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
          { t: 15 + i * 4, s: [100], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
          { t: 45 + i * 4, s: [30] },
        ],
      },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [140 + x, 120 + y, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] },
    },
    ao: 0,
    shapes: [
      {
        ty: "gr",
        it: [
          {
            ty: "el",
            p: { a: 0, k: [0, 0] },
            s: { a: 0, k: [14, 14] },
            nm: "Ellipse",
            d: 1,
          },
          {
            ty: "fl",
            c: { a: 0, k: [...gold] },
            o: { a: 0, k: 100 },
            nm: "Fill",
          },
          {
            ty: "tr",
            p: { a: 0, k: [0, 0] },
            a: { a: 0, k: [0, 0] },
            s: { a: 0, k: [100, 100] },
            r: { a: 0, k: 0 },
            o: { a: 0, k: 100 },
            sk: { a: 0, k: 0 },
            sa: { a: 0, k: 0 },
            nm: "Transform",
          },
        ],
        nm: "Group",
        np: 2,
        cix: 2,
        bm: 0,
        ix: 1,
        mn: "ADBE Vector Group",
        hd: false,
      },
    ],
    ip: 0,
    op: 90,
    st: 0,
    bm: 0,
  }));

  return {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 90,
    w: 280,
    h: 240,
    nm: name,
    ddd: 0,
    assets: [],
    layers,
  };
}

function checkmark(name: string) {
  return {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 90,
    w: 280,
    h: 240,
    nm: name,
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Check",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [140, 120, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] },
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "sh",
                ks: {
                  a: 0,
                  k: {
                    i: [[0, 0], [0, 0], [0, 0]],
                    o: [[0, 0], [0, 0], [0, 0]],
                    v: [[-30, 0], [-8, 28], [36, -24]],
                    c: false,
                  },
                },
                nm: "Path",
              },
              {
                ty: "st",
                c: { a: 0, k: [...gold] },
                o: { a: 0, k: 100 },
                w: { a: 0, k: 6 },
                lc: 2,
                lj: 2,
                ml: 4,
                nm: "Stroke",
                d: [
                  { n: "d", nm: "dash", v: { a: 0, k: 120 } },
                  {
                    n: "o",
                    nm: "offset",
                    v: {
                      a: 1,
                      k: [
                        { t: 0, s: [120], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
                        { t: 60, s: [0] },
                      ],
                    },
                  },
                ],
              },
              {
                ty: "tr",
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 },
                sk: { a: 0, k: 0 },
                sa: { a: 0, k: 0 },
                nm: "Transform",
              },
            ],
            nm: "Group",
            np: 2,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: "ADBE Vector Group",
            hd: false,
          },
        ],
        ip: 0,
        op: 90,
        st: 0,
        bm: 0,
      },
    ],
  };
}

function deliveryTrack(name: string) {
  return {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 90,
    w: 280,
    h: 240,
    nm: name,
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Line",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [140, 130, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] },
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "sh",
                ks: {
                  a: 0,
                  k: {
                    i: [[0, 0], [0, 0]],
                    o: [[0, 0], [0, 0]],
                    v: [[-90, 0], [90, 0]],
                    c: false,
                  },
                },
                nm: "Path",
              },
              {
                ty: "st",
                c: { a: 0, k: [...goldSoft] },
                o: { a: 0, k: 100 },
                w: { a: 0, k: 3 },
                lc: 2,
                lj: 1,
                ml: 4,
                nm: "Stroke",
              },
              {
                ty: "tr",
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 },
                sk: { a: 0, k: 0 },
                sa: { a: 0, k: 0 },
                nm: "Transform",
              },
            ],
            nm: "Group",
            np: 2,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: "ADBE Vector Group",
            hd: false,
          },
        ],
        ip: 0,
        op: 90,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 2,
        ty: 4,
        nm: "Dot",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 0, k: 0 },
          p: {
            a: 1,
            k: [
              { t: 0, s: [50, 130, 0], i: { x: 0.5, y: 1 }, o: { x: 0.5, y: 0 } },
              { t: 75, s: [230, 130, 0] },
            ],
          },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] },
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "el",
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [16, 16] },
                nm: "Ellipse",
                d: 1,
              },
              {
                ty: "fl",
                c: { a: 0, k: [...gold] },
                o: { a: 0, k: 100 },
                nm: "Fill",
              },
              {
                ty: "tr",
                p: { a: 0, k: [0, 0] },
                a: { a: 0, k: [0, 0] },
                s: { a: 0, k: [100, 100] },
                r: { a: 0, k: 0 },
                o: { a: 0, k: 100 },
                sk: { a: 0, k: 0 },
                sa: { a: 0, k: 0 },
                nm: "Transform",
              },
            ],
            nm: "Group",
            np: 2,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: "ADBE Vector Group",
            hd: false,
          },
        ],
        ip: 0,
        op: 90,
        st: 0,
        bm: 0,
      },
    ],
  };
}

export const appLottieSteps = [
  dotGrid("Browse Categories"),
  pulseRing("Product Detail", 110),
  pulseRing("Shopping Cart", 85),
  checkmark("Secure Checkout"),
  deliveryTrack("Order Tracking"),
] as const;

export function getAppLottieForStep(step: number) {
  return appLottieSteps[step] ?? appLottieSteps[0];
}

export const appFlowStepDurationMs = 3800;
