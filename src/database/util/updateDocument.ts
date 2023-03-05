import {getModel} from '../model';
export const updateDocument = async ({collection, schema, query, update = {}}: any) => {
    const model = getModel({collection, schema});
    try {
        return await model.findOneAndUpdate(query, update);
    }
    catch (err) {
        throw (err);
    }
};