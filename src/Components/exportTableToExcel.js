import * as XLSX from 'xlsx';

export const exportTableToExcel = (tableId, fileName) => {
  const table = document.getElementById(tableId);
  const workbook = XLSX.utils.table_to_book(table, { sheet: fileName });
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
