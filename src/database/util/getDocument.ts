import {getModel} from '../model';

export const getDocument = async ({collection, schema, query, refs = []}: any) => {
  const model = await getModel({collection, schema});
  try {
    return await model.find(query)
      .populate((refs || [])
        .map(({path, refCollection, refSchema, fields}: any) => {
          const refModel = getModel({collection: refCollection, schema: refSchema});
          return {path, model: refModel, select: fields};
        }));
  }
  catch (err) {
    return err;
  }
};