/* eslint-disable no-console */
import axios from 'axios'
import Store from './store'


const functions = {
  
  httpGet: async ({url, params}) => {
    try {
      if (!url) throw new Error('The URL parameter is required!')
      
      const addrAr = url.match(/((https?:\/\/)?([a-z0-9.-]*)\.([a-z0-9]{2,9})(:[0-9]{1,5})?([/#?]?(.*)))/i)
      const addr = addrAr[2]+addrAr[3]+'.'+addrAr[4]

      try {
        const res = await axios.get(url, params)
        if (res.status === 200) {
          console.log(res)
          return res
          
        }
        
      } catch (error) {
        Store.dispatch('Snacks/addSnack', {
          msg: `Failed to fetch data from: ${addr} - ${error}`,
          posx: 'left',
          btncolor: 'error'
        })
      }
  
    } catch (error) {
      console.error(error)
      Store.dispatch('Snacks/addSnack', {
        msg: 'An unhandled error occured! Please report this on GitHub <a href="#gotoIssues">issues</a>',
        posx: 'left',
        btncolor: 'error'
      })
    }
  },

  firstCharCapitilize (string) {
    if (!string) { console.error('The string parameter is missing!'); return '' }
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
}

export default functions