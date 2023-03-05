import {getModel} from '../model';

export const deleteDocument = async ({collection, schema, query}: any) => {
    const model = getModel({collection, schema});
    try {
        return await model.remove(query);
    }
    catch (err) {
        throw (err);
    }
};