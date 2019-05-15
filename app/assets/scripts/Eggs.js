import Apicall from './API';
import Storage from './LocalStorage';

/**
 * Egg that appear on the page
 * * */
export default class Eggs {

    /**
     * Check if container and init egg
     */
    constructor() {
        /** Element where th Egg will appear */
        const container = document.querySelector('.structure_content-main');
        if (container) {
            /** @private */
            this.container = container;
            this.init();
        }
    }

    /** Initialize the Egg */
    async init () {
        let that = this;
        let container = this.container;
        /** define delay before show egg */
        let delay = this.getDelay();
         /** get data from api */
        let eggData = await this.getData();
        /** Add img egg to eggData */
        eggData.img = "http://prettypoun.p.r.pic.centerblog.net/o/b36ba9ca.png";
         /** create egg item */
        let eggItem = this.setItemEgg(eggData);
         /** insert eggItem */
        container.insertAdjacentHTML( 'afterbegin', eggItem.outerHTML );
         /** handle apparition */
        eggItem = container.querySelector('.egg');
        setTimeout( () => {
            eggItem.classList.add('active');
        }, delay);
         /** handle click */
        eggItem.onclick = (e) => {
            e.preventDefault();
            container.removeChild(eggItem);
            window.open(eggData.lienRedirect, '_blank');
            that.init();
        }

    }
    /**
     * Return a delay between 1s et 4s.
     * @return 'number' The delay value in ms.
     */
    getDelay ()   {
        let min = 1000;
        let max = 4000;
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    /**
     * Get egg's data from the API or from Local Storage
     * @return {data} The egg's data.
     */
    async getData ()  {
        let Store = new Storage();
        let storageData = Store.getData('egg');
        if ( storageData ) {
            return storageData;
        } else {
            let API = new Apicall();
            let result = await API.getData("https://www.mocky.io/v2/5cdc323e2d00008f14f5a63d");
            Store.register('egg',result);
            return result;
        }
    }

    /**
     * Create the DOM element for Egg
     * @param {object} 'egg', The egg's data from the API + The src image for Egg
     * @return {object} 'link', The DOM element of the Egg
     */
    setItemEgg(egg)  {
        // link item
        let link = document.createElement('a');
        link.classList.add('egg');
        link.setAttribute('href',egg.lienRedirect);
        link.setAttribute('target','_blank');
        link.style.top = egg.positionY+"px";
        link.style.right = egg.positionX+"px";
        // image item
        let image = document.createElement('img');
        image.setAttribute('src',egg.img);
        image.setAttribute('alt',egg.Name);
        link.append(image);
        return link;
    }


}

