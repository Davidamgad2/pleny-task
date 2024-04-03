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
import * as fs from "fs";
import { dirname } from "path";

export const intializeBrands = async (client: MongoClient) => {
  const db = client.db("pleny");
  const brands = await db.collection("brands").find().toArray();
  for (let brand of brands) {
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
        if (results.some(async(result) => !result.valid)) {
          let finalBrand = {...brand};
          const resultBrandName = results[0];
          const resultYearFounded = results[1];
          const resultHeadQuarters = results[2];
          const resultNumberOfLocations = results[3];
          if (!resultBrandName.valid){
            finalBrand = resultBrandName.brand.branName;
          }
          if (!resultYearFounded.valid){
            finalBrand = resultBrandName.brand.yearFounded;
          }
          if (!resultHeadQuarters.valid){
            finalBrand = resultBrandName.brand.headquarters;
          }
          if (!resultNumberOfLocations.valid){
            finalBrand = resultBrandName.brand.numberOfLocations;
          }
          await db
            .collection("brand")
            .replaceOne({ _id: brand._id }, {...finalBrand});
        }
        })
      .catch((error) => {
        console.error("Error validating brand", error);
      });
  }
  console.log(`Processed brands`);
};
