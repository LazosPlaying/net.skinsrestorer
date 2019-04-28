/* eslint-disable no-console */
import axios from 'axios'
import Store from './store'


const functions = {
  
  httpGet: async ({url, params}) => {
    try {
      if (!url) throw new Error('The URL parameter is required!')
      
      const addrAr = url.match(/((https?:\/\/)?([a-z0-9.-]*)\.([a-z0-9]{2,9})(:[0-9]{1,5})?([/#?]?(.*)))/ig)
      const addr = addrAr[2]+addrAr[3]+'.'+addrAr[4]
      
      const res = await axios.get(url, params)
      if (res.status === 200) {
        
        return res
        
      } else {
  
        Store.dispatch('Snacks/addSnack', {
          msg: `Failed to fetch data from: ${addr} - HTTP-${res.status}`,
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
  }
}

export default functions