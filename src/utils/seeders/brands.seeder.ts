import { connect, disconnect } from 'mongoose';
import Brand from '../../models/Brand'; // Update with the path to your Brand model
import { faker } from '@faker-js/faker';
import exportToExcel from '../helpers/excelHelper';
export const seedBrands = async (db:any) => {
  try {
    await db.collection('brands')
    let seededBrands: any[] = []
    const brandPromises = Array.from({ length: 10 }, async () => {
      const brandName = faker.company.name();
      const yearFounded = faker.date.between({from: '1600-01-01',to: new Date().getFullYear().toString()}).getFullYear();
      const headquarters = `${faker.location.city()}, ${faker.location.country()}`;
      const numberOfLocations = faker.number.int({ min: 1, max: 1000 });
      
      const brand = new Brand({
        brandName,
        yearFounded,
        headquarters,
        numberOfLocations
      });
      seededBrands.push(brand);
      return brand.save();
    });

    // Save all the new brands
    await Promise.all(brandPromises);
    await exportToExcel(seededBrands, 'seeded');
    console.log('Successfully seeded brands.');
  } catch (error) {
    console.error('Error seeding brands:', error);
  }
};