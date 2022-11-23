class Bands {
    constructor() {
        this.bands = [];
    }

    addBand(band = new Band()) {
        this.bands.push(band);
    }

    getBands() {
        return this.bands;
    }

    deleteBand(id = "") {
        this.bands = this.bands.filter((b) => b.id !== id);
    }

    voteBand(id = "") {
        this.bands = this.bands.map((mapBand) => {
            if (mapBand.id === id) {
                mapBand.votes++;
                return mapBand;
            } else {
                return mapBand;
            }
        });
    }
}

module.exports = Bands;