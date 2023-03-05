const mongoose = require("mongoose");
export const getModel = ({collection, schema}: any) => {
    return mongoose.model(collection, schema);
};

