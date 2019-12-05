import { h, Component } from 'preact'
import { encode } from 'qss';
import cn from 'classnames'
import scrub from '../helpers/scrub'
import config from '../config'
import StockCard from './stock-card'

const headers = ['open', 'high', 'low', 'price', 'previousClose', 'symbol']

export default class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
			error: '',
      isFetching: false,
      searchText: '',
      stocks: []
    }
  }
	
	getQueryUrl(str, key){

		let query = encode({
			function: str,
      [key]: this.state.searchText,
      apikey: config.apiKey
    })

    return `${config.apiURL}/query?${query}`
	}

  handleSubmitForm = e => {
    e.preventDefault()
		
		const { stocks, searchText } = this.state 
	
		if(stocks.find(stock => stock.symbol === searchText.toUpperCase())){
			return this.setState({
				error: 'Stock has already been added',
				isFetching: false
			})
		} 

    this.setState({ isFetching: true })
    
		fetch(this.getQueryUrl('SYMBOL_SEARCH', 'keywords'))
		.then(res => res.json())
		.then(data => {

			let stock = {}
			let matches = data.bestMatches
			let first 

      if(matches && matches.length > 0){
				first = scrub(matches[0]) 
      }

			if(!first || first.matchScore !== '1.0000'){
				return this.setState({
					error: "Stock symbol not found",
					isFetching: false
				})
			}

      stock.name = first.name

      fetch(this.getQueryUrl('GLOBAL_QUOTE', 'symbol'))
      .then(res => res.json())
      .then(data => {
        let quote = scrub(data['Global Quote'])

        //pick header keys
        Object.keys(quote).forEach(key => {
          if(headers.includes(key)){ 
            stock[key] = quote[key]
          }
        })
        
        this.setState({
          isFetching: false,
          error: '',
          searchText: '',
          stocks: [...this.state.stocks, stock],
        })
      })
		})
	}

  handleUpdateSearch = e => {
    this.setState({
      searchText: e.target.value,
			error: ''
    })
  }

  render(){

    let stockList = this.state.stocks.map(stock => (
			<StockCard stock={stock}/>
		))

    return(
      <div class="p-4">
        <header class="mb-4">
          <h1 class="font-bold text-4xl">Stock Watcher</h1>
        </header>
        <main>
          <form 
            class="flex justify-start"
            onSubmit={this.handleSubmitForm}
          >
            <input 
              class="form-input w-full max-w-sm mr-3 placeholder-gray-light"
              type="text"
              placeholder="Enter stock symbol"
              value={this.state.searchText}
              onInput={this.handleUpdateSearch}
            />
            <input 
              class={cn(
                "btn btn-blue shadow-md", 
                {"bg-gray-light": this.state.isFetching}
              )} 
              type="submit" 
              value={window.innerWidth < 640 ? "ADD" : "ADD STOCK"}
              disabled={this.state.isFetching}
            />
          </form>
          { 
            this.state.error && 
            <p class="text-red-light pl-1 py-3">{this.state.error}</p> 
          }
          <section class="mt-4 sm:flex justify-start flex-wrap">
            { stockList }	
          </section>
        </main>
      </div>
    )
  }
}
