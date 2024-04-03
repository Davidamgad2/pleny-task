import { MongoClient } from "mongodb";
import {
  validateBrandName,
  validateHeadquarters,
  validateNumberOfLocations,
  validateYearFounded,
} from "./preBrandSchemaValidator";
import {
  postValidateBrandName,
  postValidateHeadQuarters,
  postValidateNumberOfLocations,
  postValidateYearFounded,
} from "./postBrandSchemaValidator";

export const intializeBrands = async (client: MongoClient) => {
  const db = client.db("pleny");
  const brands = await db.collection("brand").find().toArray();
  let counter = 0;
  for (const brand of brands) {
    Promise.all([
      validateBrandName(brand.brandName),
      validateYearFounded(brand.yearFounded),
      validateHeadquarters(brand.headquarters),
      validateNumberOfLocations(brand.numberOfLocations),
    ])
      .then((results) => {
        return Promise.all([
          postValidateBrandName(results[0], brand),
          postValidateYearFounded(results[1], brand),
          postValidateHeadQuarters(results[2], brand),
          postValidateNumberOfLocations(results[3], brand),
        ]);
      })
      .then(async (results) => {
        const result = results[0];
        delete result.brand.brand;
        await db
          .collection("brand")
          .replaceOne({ _id: result.brand._id }, result.brand);
      })
      .catch((error) => {
        console.error("Error validating brand", error);
      });
  }
  console.log(`Processed brands`);
};
