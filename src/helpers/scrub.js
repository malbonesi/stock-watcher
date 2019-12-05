import toCamelCase from './toCamelCase'

export default (data) => {
  let obj = {}

  Object.keys(data).forEach(key => {
    //take off numbers from key names
    obj[toCamelCase(key.replace(/^\d+\.\s/, ''))] = data[key]
  })
  
  return obj
}
