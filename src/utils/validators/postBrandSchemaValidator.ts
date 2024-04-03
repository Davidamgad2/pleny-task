import { de } from "@faker-js/faker";

const postValidateBrandName = async (brand: any, originalBrand: any) => {
  if (brand.validated === true) return { valid: true, brand: originalBrand };

  if (typeof originalBrand.brand === "object") {
    if (originalBrand.brand?.name && originalBrand.brand.name !== '') {
      originalBrand.brandName = originalBrand.brand.name;
      delete originalBrand.brand.name;
      delete originalBrand.brand;
      return { valid: false, brand: originalBrand };
    } else if (
      originalBrand.brand?.brandName &&
      originalBrand.brand.brandName !== ''
    ) {
      originalBrand.brandName = originalBrand.brand.brandName;
      delete originalBrand.brand.brandName;
      delete originalBrand.brand;
      return { valid: false, brand: originalBrand };
    }
    delete originalBrand.brand
  } else if (
    typeof originalBrand.brand === "string" &&
    originalBrand.brand !== ''
  ) {
    originalBrand.brandName = originalBrand.brand;
    delete originalBrand.brand;
    return { valid: false, brand: originalBrand };
  }
  delete originalBrand.brand.name;
  delete originalBrand.brand.brandName;
  delete originalBrand.brand;
  originalBrand[brand.key] = brand[brand.key]
  return { valid: false, brand: originalBrand };
};
const postValidateYearFounded = async (brand: any, originalBrand: any) => {
  if (brand.validated === true) return { valid: true, brand: originalBrand };
  if (originalBrand.yearCreated) {
    let year = originalBrand.yearCreated;
    year = parseInt(year.toString());
    if (!isNaN(year)) {
      originalBrand.yearFounded = year;
      delete originalBrand.yearCreated;
      return { valid: false, brand: originalBrand };
    }
  } else if (originalBrand.yearsFounded) {
    let year = originalBrand.yearsFounded;
    year = parseInt(year.toString());
    if (!isNaN(year)) {
      originalBrand.yearFounded = year;
      delete originalBrand.yearsFounded;
      return { valid: false, brand: originalBrand };
    }
  }
  delete originalBrand.yearCreated;
  delete originalBrand.yearsFounded;
  originalBrand[brand.key] = brand[brand.key]
  return { valid: false, brand: originalBrand };
};
const postValidateHeadQuarters = async (brand: any, originalBrand: any) => {
  if (brand.validated === true) return { valid: true, brand: originalBrand };
  if (originalBrand.hqAdress) {
    let address = originalBrand.hqAdress;
    if (/^[A-Za-z]+$/.test(address)) {
      originalBrand.headquarters = address;
      delete originalBrand.hqAdress;
      return { valid: false, brand: originalBrand };
    }
  }
  delete originalBrand.hqAdress;
  originalBrand[brand.key] = brand[brand.key]
  return { valid: false, brand: originalBrand };
};
const postValidateNumberOfLocations = async (
  brand: any,
  originalBrand: any
) => {
  if (brand.validated === true) return { valid: true, brand: originalBrand };
  originalBrand[brand.key] = brand[brand.key]
  return { valid: false, brand: originalBrand };
};

export { postValidateBrandName, postValidateYearFounded, postValidateHeadQuarters, postValidateNumberOfLocations };