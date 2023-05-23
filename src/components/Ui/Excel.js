import * as XLSX from 'xlsx';

export function UiExcel(users) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(users);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "users.xlsx");
}