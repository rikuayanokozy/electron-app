module.exports = {
  "presets": [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": 10
        }
      }
    ],
    "@babel/typescript",
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    ["@babel/plugin-proposal-decorators", {"legacy": true}],
    ["@babel/plugin-proposal-class-properties", {"loose": true}]
  ]
}
