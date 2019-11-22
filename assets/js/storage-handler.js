class StorageHandler {
    /**
     * 
     * @param {string} key 
     * @param {array} data optional
     */
    constructor(key, data = []) {
        this.KEY = key;
        this._data = data;
        this.load();
    }

    /**
     * getter function for this._data
     * @return {array} data
     */
    get data() {
        return this._data ? this._data : [];
    }

    /**
     * setter function for this._data
     * @param {array} data
     */
    set data(data) {
        if (data instanceof Array) {
            this._data = data;
            this.save();
        } else {
            console.log("Error in storing data: invalid data type");
        }
    }


    /**
     * load data from the localStorage to data
     */
    load() {
        if (localStorage[this.KEY]) {
            // if data in local storage. load the data
            this._data = JSON.parse(localStorage[this.KEY]);
        }
    }
    /**
     *  save data to the localStorage.
     */
    save() {
        if ($.isEmptyObject(this._data) && localStorage[this.KEY]) {
            //if no data and there is data in storage, delete that data. 
            localStorage.removeItem(this.KEY);
            return;
        }
        localStorage.setItem(this.KEY, JSON.stringify(this._data));
    }

}