
/**
 * API call manager
 * * */
export default class Apicall {

    /**
     * Make API call with both Fetch or Xhr depending on browser support
     * @param  {string} 'url' API endpoint
     * @return {object} 'data' from API
     */
    getData(url)  {
        return new Promise(resolve => {
            /** if brower support fetch api */
            if (window.fetch) {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        resolve(data);
                    })
            } else {
                let req = new XMLHttpRequest();
                req.overrideMimeType("application/json");
                req.open('GET', url, true);
                req.onload  = () => {
                    let data = JSON.parse(req.responseText);
                    resolve(data);
                };
                req.send(null);
            }
        });
    }
}
