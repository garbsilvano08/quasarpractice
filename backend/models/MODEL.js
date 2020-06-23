const MONGOOSE  = require('../config/mongo');

module.exports = class MODEL {
    constructor(collection, schema) {
        this.collection = collection;
        this.schema     = schema
        this.Model      = MONGOOSE.con.model(collection, schema, collection);
    }

    async doc (id) {

        try {
            const Model     = this.Model;
            const res       = await Model.findById(id);

            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async docs () {
        try {
            const Model     = this.Model;
            const res       = await Model.find();

            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async add(options = {}) {
        try {
            const Model     = this.Model;
            // sets object to insert
            const modelObj  = new Model(options);

            // confirms the insertion
            const modelRes  = await modelObj.save();

            return modelRes;
            
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async update(_id, options = {}) {
        try {
            const Model     = this.Model;
            
            const modelRes  = await Model.findByIdAndUpdate({_id}, options, {new: true});

            return modelRes;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}