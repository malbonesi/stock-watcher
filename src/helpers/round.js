export default (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)
