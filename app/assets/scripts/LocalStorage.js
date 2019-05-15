/**
 * Local Storage manager
 * * */
export default class Storage {
    /**
     * Get data from the Local Storage
     * @params {string} 'key' key index to find data in Local Storage
     * @return {boolean} 'false' if there's no data or {object} data.
     */
    getData (key)  {
        if ( localStorage.getItem(key) ) {
            return JSON.parse(localStorage.getItem(key));
        } else {
            return false;
        }
    }

    /**
     * Register data in the Local Storage
     * @params {string} 'key' key index to register data in Local Storage
     * @params {object} 'data' Data to register in the Local Storage
     */
    register (key,data)  {
        console.log(key,data);
        let dataVal = JSON.stringify(data);
        localStorage.setItem(key,dataVal);
    }
}
