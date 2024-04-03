import { MongoClient } from 'mongodb';
import Brand from '../../models/Brand'; // Import the Brand model from Mongoose
import exportToExcel from './excelHelper';
async function exportBrandsToExcel(filePath: string,client:MongoClient): Promise<void> {
    client = await client.connect();
    const brands = await client.db('pleny').collection('brands').find().toArray();
    exportToExcel(brands, filePath);

}

export default exportBrandsToExcel;