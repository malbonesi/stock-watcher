import { h } from 'preact'
import Scale from './scale'
import round from '../helpers/round'
import Arrow from './arrow'
import cn from 'classnames'

export default (props) => {

	const { 
    name, 
    symbol, 
    price,
    open,
    high,
    low,
    previousClose 
  
  } = props.stock

  let change = price - previousClose
  let percentage = (change / previousClose) * 100

	let positive = change > 0 ? true : false

  let changeClass = cn(
    "mr-1", 
    {
      "text-green": positive, 
      "text-red": !positive
    })

  let arrowClass = cn(
    "fill-current inline w-3 mr-1 svg-fix", 
    {
    'rotate-180': !positive
    })

  let percentClass = cn({
    "text-green-light": positive, 
    'text-red-light': !positive 
    })

  let scaleClass = cn(
    "sm:inline-block hidden flex relative p-4 w-28 h-50 lg:h-44 align-top",
    {
      "positive-gradient": positive, 
      "negative-gradient": !positive 
    })
    
  let priceList = ['open', 'high', 'low'].map(key => {
   
   let label = ['high', 'low'].includes(key) ? key.slice(0,2) : key

    return( 
      <div class="inline-block">
        <span class="text-gray-light mr-1">{label.toUpperCase()}</span>
        <span class="text-gray-400 mr-2 font-bold">{round(props.stock[key],2)}</span> 
      </div>
    )
  })

  return(
    <div class="mb-3 sm:mr-2 relative">
      <Scale 
        class={scaleClass}
        high={round(high,2)} 
        low={round(low,2)} 
        value={round(price,2)}
        fadeDown={positive}
      />
      <div class="sm:inline-block sm:w-58 lg:w-80 w-full h-full p-3 bg-white">
        <div class="sm:block flex sm:flex-wrap items-baseline justify-between relative">
          <div class="sm:block truncate">
            <span class="block pr-4 font-bold text-xl truncate sm:text-2xl">
              { name }
            </span>
            <span class="block text-gray-light">
              { symbol }
            </span>
          </div>
          <div class="relative right-0 text-right sm:mb-2 sm:text-left">
            <span class="block text-2xl sm:inline-block sm:text-3xl sm:mr-2">
              { round(price,2) }
            </span>
            <span class="block sm:inline-block w-32">
              <span class={changeClass}>
                <Arrow class={arrowClass}/> 
                { round(change, 2) }
              </span> 
              <span class={percentClass}>
                ({ round(percentage, 2) }%)
              </span>
            </span>
          </div>
          <div class="hidden sm:flex flex-wrap">
						{ priceList }
          </div>
        </div>
      </div>
    </div>
  )
}
