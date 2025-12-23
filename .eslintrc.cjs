const { configure, presets } = require('eslint-kit')

module.exports = configure({
  presets: [
    presets.react(),
    presets.prettier(),
    presets.imports({ sort: { newline: true } }),
  ],
})
