const PROXY_CONFIG = [
  {
    context: [
      "/topic/**"
    ],
    target: "http://localhost:9700",
    secure: false,
    pathRewrite: {
      "^/topic/": ""
    },
  },
  {
    context: [
      "/bucket/**"
    ],
    target: "http://localhost:9701",
    secure: false,
    pathRewrite: {
      "^/bucket/": ""
    },
  },
  {
    context: [
      "/school/**"
    ],
    target: "http://localhost:9702",
    secure: false,
    pathRewrite: {
      "^/school/": ""
    },
  },
  {
    context: [
      "/user/**"
    ],
    target: "http://localhost:9703",
    secure: false,
    pathRewrite: {
      "^/user/": ""
    },
  },
  {
    context: [
      "/message/**"
    ],
    target: "http://localhost:9704",
    secure: false,
    pathRewrite: {
      "^/message/": ""
    },
  }
];

module.exports = PROXY_CONFIG;
