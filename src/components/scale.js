import { h } from 'preact'
import cn from 'classnames'

export default (props) => {
  const { 
    high, 
    low,
    value,
    fadeDown
  } = props

  let height = window.innerWidth < 1024 ? 176 : 144

  let distance = (1 - (value - low) / (high - low)) * height

  let boxClass = cn("border-3 border-solid border-r-none w-16 h-full ml-4 pl-2 text-white font-bold relative flex flex-col justify-between", {"border-gradient-down": fadeDown, "border-gradient-up": !fadeDown})

  return(
    <div class={props.class}>
        <svg class="absolute w-8 h-8" transform={`translate(-8,${distance})`}>
          <polygon points="6,0 6,16 23,8" style="fill:white;" />
        </svg>
      <div class={boxClass}>
        <span class="relative top--5">{high}</span>
        <span class="relative bottom--5">{low}</span>
      </div>
    </div>
  )
}
