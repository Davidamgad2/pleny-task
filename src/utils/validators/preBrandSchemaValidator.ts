import Brand from "../../models/Brand";
import { faker } from "@faker-js/faker";

const validateBrandName = (brandName: string) => {
  const brand = new Brand({ brandName });
  const validationError = brand.validateSync(["brandName"], {
    ValidationError: false,
  });
  if (validationError) {
    if (validationError.errors.brandName.kind === "required") {
      brandName = faker.company.name();
      return { validated: false, brandName: brandName, key: "brandName" };
    }
  } else {
    if (brandName === "") {
      brandName = faker.company.name();
      return { validated: false, brandName: brandName, key: "brandName" };
    }
    return { validated: true, brandName: brandName, key: "brandName" };
  }
};

const validateYearFounded = (yearFounded: number) => {
  const brand = new Brand({ yearFounded });
  let validationError;
  try {
    validationError = brand.validateSync(["yearFounded"], {
      ValidationError: false,
    });
  } catch (e) {}
  if (validationError) {
    if (validationError.errors.yearFounded.kind === "required") {
      yearFounded = faker.date.recent().getFullYear();
      return { validated: false, yearFounded: yearFounded, key: "yearFounded" };
    } else if (validationError.errors.yearFounded.kind === "min") {
      yearFounded = faker.date
        .between({ from: 1600, to: new Date() })
        .getFullYear();
      return { validated: false, yearFounded: yearFounded, key: "yearFounded" };
    } else if (validationError.errors.yearFounded.kind === "Number") {
      try {
        yearFounded = parseInt(yearFounded.toString());
        if (isNaN(yearFounded)) {
          throw new Error("yearFounded is not a number");
        }
        return {
          validated: false,
          yearFounded: yearFounded,
          key: "yearFounded",
        };
      } catch (e) {
        yearFounded = faker.date
          .between({ from: 1600, to: new Date() })
          .getFullYear();
      }
      return { validated: false, yearFounded: yearFounded, key: "yearFounded" };
    }
  } else {
    return { validated: true, yearFounded: yearFounded, key: "yearFounded" };
  }
};

const validateHeadquarters = (headquarters: string) => {
  const brand = new Brand({ headquarters });
  let validationError;
  try {
    validationError = brand.validateSync(["headquarters"], {
      ValidationError: false,
    });
  } catch (e) {}
  if (validationError) {
    if (validationError.errors.headquarters.kind === "required") {
      headquarters = faker.location.city();
      return {
        validated: false,
        headquarters: headquarters,
        key: "headquarters",
      };
    }
  } else {
    return { validated: true, headquarters: headquarters, key: "headquarters" };
  }
};

const validateNumberOfLocations = (numberOfLocations: number) => {
  const brand = new Brand({ numberOfLocations });
  let validationError;
  try {
    validationError = brand.validateSync(["numberOfLocations"], {
      ValidationError: false,
    });
  } catch (e) {}
  if (validationError) {
    if (validationError.errors.numberOfLocations.kind === "required") {
      numberOfLocations = faker.number.int({ min: 1, max: 1000 });
      return {
        validated: false,
        numberOfLocations: numberOfLocations,
        key: "numberOfLocations",
      };
    } else if (validationError.errors.numberOfLocations.kind === "min") {
      numberOfLocations = faker.number.int({ min: 1, max: 1000 });
      return {
        validated: false,
        numberOfLocations: numberOfLocations,
        key: "numberOfLocations",
      };
    } else if (validationError.errors.numberOfLocations.kind === "Number") {
      try {
        numberOfLocations = parseInt(numberOfLocations.toString());
        if (isNaN(numberOfLocations)) {
          throw new Error("numberOfLocations is not a number");
        }
        return {
          validated: false,
          numberOfLocations: numberOfLocations,
          key: "numberOfLocations",
        };
      } catch (e) {
        numberOfLocations = faker.number.int({ min: 1, max: 1000 });
      }
      return {
        validated: false,
        numberOfLocations: numberOfLocations,
        key: "numberOfLocations",
      };
    }
  } else {
    return {
      validated: true,
      numberOfLocations: numberOfLocations,
      key: "numberOfLocations",
    };
  }
};

export {
  validateBrandName,
  validateYearFounded,
  validateHeadquarters,
  validateNumberOfLocations,
};
