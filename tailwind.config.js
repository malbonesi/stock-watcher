module.exports = {
  theme: {
    colors: {
      white: '#ffffff',
      blue: {
        'default': '#274bc8', //button
        '100': '#6781d8',
        '200': '#526ed3',
        '300': '#3c5dcd',
      },
      red: {
        default: '#bb0606', //negative change
        light: '#d11e1e' //negative percent
      },
      green: {
        default: '#299e00', //positive change
        light: '#37bd07' //positive percent
      },
      gray: {
        default: '#3e5769', //main font
        light: '#919aa0', //stock symbols, labels, placeholder
        '100': '#fbfbfb', //input background
        '200': '#fafafa', //background
        '300': '#e5e5e5', //input border
        '400': '#607f96' //hi lo values
      }
    },
    extend: {
      spacing: {
        '28': '7rem',
        '44': '11rem',
        '50': '13rem',
        '58': '15rem',
        '80': '20rem',
        '86': '22rem'
      }
    }
  }
}
