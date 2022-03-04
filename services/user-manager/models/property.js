let propertyList = [];

class Property {
    static async getAll() {
        return propertyList
    }

    static async add() {
        return "property added"
    }

    static async remove() {
        return "property deleted"
    }

    static async update() {
        return "property updated"
    }
}

module.exports = Property;