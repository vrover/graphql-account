import {getModel} from '../model';
export const addDocument = async ({collection, schema, query}: any) => {
    const model = getModel({collection, schema});
    try {
        return await model.create(query);
    }
    catch (err) {
        throw (err);
    }
};