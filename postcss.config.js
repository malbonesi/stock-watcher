const purgecss = require('@fullhuman/postcss-purgecss')

let opts = {
  plugins: [
    require('tailwindcss')
  ]
}

if (process.env.NODE_ENV === 'prod'){
  opts.plugins.push(purgecss({
      content: [
        'src/**/*.js'
      ]
    })
  )
}
module.exports = opts
