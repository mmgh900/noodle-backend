class Property {
    name;
    assignedTo;
    id;

    constructor(id, name, assignedTo) {
        this.id = id
        this.name = name
        this.assignedTo = assignedTo
    }

    static async getAll() {
        return 'all'
    }

    static async add(property) {
        return "property added"
    }

    static async remove(id) {
        return "property deleted"
    }

    static async update(property) {
        return "property updated"
    }

    static async get(id) {
        return new Property(1, "Keyboard", "mmgh900")
    }
}

module.exports = Property;