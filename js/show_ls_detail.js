function showLSDetail(currentRow)
{
    const ROW_ID = 1
    const ROW_NAME = 2;
    const ROW_UNIT_NAME = 3;
    const ROW_SMALLER_OR_LARGER = 4;

    const COL_COMPARABLE_START = 3;

    var tableLSEffect = document.getElementById("tableLSEffect");
    var colN = currentRow.cells.length;
    var valuedColN = 0;
    var NewRow;

    tableLSEffect.innerHTML = "";

    // Calculate valued column number
    for(var i = 0; i < colN; i++)
    {
        if(currentRow.cells[i].innerHTML != "")
        {
            valuedColN++;
        }
    }

    // Row 0: Table title
    NewRow = "<tr class=\"trLSDetail\"><td class=\"tdLSDetailTitle\" colspan=\"3\">禮裝內容</td></tr>";
    $("#tableLSEffect").append(NewRow);

    for(var i = 0; i < colN; i++)
    {
        if(currentRow.cells[i].innerHTML != "null")
        {
            NewRow = "<tr class=\"trLSDetail\"";
            if(Number(getValueFromTable("tableLSList", 3, i)) < 2)
            {
                NewRow += " style=\"border-bottom-style: solid;\"";
            }
            NewRow += ">";

            if(i >= COL_COMPARABLE_START)
            {
                NewRow += "<td class=\"tdLSDetailCheckBox\">";
                NewRow += "<input type=\"checkbox\">";
                NewRow += "</td>";
                NewRow += "<td class=\"tdLSDetailEffect\">" + getValueFromTable("tableLSList", 2, i) + "</td>";
                NewRow += "<td class=\"tdLSDetailEffect\">" + currentRow.cells[i].innerHTML + "</td>";
            }
            else
            {
                NewRow += "<td class=\"tdLSDetailCheckBox\"></td>";
                NewRow += "<td class=\"tdLSDetail\">" + getValueFromTable("tableLSList", 2, i) + "</td>";
                NewRow += "<td class=\"tdLSDetail\">" + currentRow.cells[i].innerHTML + "</td>";
            }
            NewRow += "<td class=\"tdLSDetailHiddenInfo\">" + getValueFromTable("tableLSList", ROW_ID, i) + "</td>";
            NewRow += "<td class=\"tdLSDetailHiddenInfo\">" + getValueFromTable("tableLSList", ROW_SMALLER_OR_LARGER, i) + "</td>";

            NewRow += "</tr>";
            $("#tableLSEffect").append(NewRow);
        }
    }
}