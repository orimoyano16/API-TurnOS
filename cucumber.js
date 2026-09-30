module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: ['tests/step_definitions/**/*.ts'],
    format: ['progress-bar', 'html:cucumber-report.html'],
    language: 'es'
  }
}