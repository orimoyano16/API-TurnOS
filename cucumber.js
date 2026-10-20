module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['tests/step_definitions/**/*.ts'],
    format: ['progress-bar', 'html:cucumber-report.html'],
    language: 'es'
  }
}