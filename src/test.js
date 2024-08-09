const obj = {

    _check: 5,

    get check() {
        return this._check;
    },

    addCheck() {
        this._check++;
    }
}

export {obj}