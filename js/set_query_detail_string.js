function setQueryDetailString(currentRow)
{
    var lsNo = currentRow.cells[0].innerHTML;
    var lsM = currentRow.cells[2].innerHTML;
    var queryDetailString = "where A = " + lsNo + " and C = '" + lsM + "'";
    
    var textBoxSelectedLSListRow = document.getElementById("selectedLSListRow");

    queryDetail(queryDetailString);
}
