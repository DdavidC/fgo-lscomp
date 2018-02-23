function getValueFromTable(tableID, x, y)
{
    var table = document.getElementById(tableID);

    return table.rows[x].cells[y].innerHTML;
}