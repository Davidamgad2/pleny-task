import * as path from 'path';
import * as ExcelJS from 'exceljs';

function exportToExcel(data: any[], fileName:string): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Add headers to the worksheet
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);

    // Add data rows to the worksheet
    data.forEach((obj) => {
        const values = Object.values(obj);
        worksheet.addRow(values);
    });

    // Generate a unique filename based on the current date
    const currentDate = new Date().toISOString().split('T')[0];
    const filename = `${fileName}_${currentDate}.xlsx`;

    // Save the workbook to the "public" directory
    const savePath = path.join(__dirname, '..', '..', '..', 'public', filename);
    workbook.xlsx.writeFile(savePath)
        .then(() => {
            console.log(`Excel file saved as ${filename}`);
        })
        .catch((error) => {
            console.error('Error saving Excel file:', error);
        });
}

export default exportToExcel;