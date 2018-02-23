function showLSDetail(currentRow)
{
    var tableLSEffect = document.getElementById("tableLSEffect");
    var colN = currentRow.cells.length;
    var valuedColN = 0;
    
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
    NewRow = "<tr class=\"trLSDetail\"><td colspan=\"3\">禮裝內容</td></tr>";
    $("#tableLSEffect").append(NewRow);

    for(var i = 0; i < colN; i++)
    {
        if(currentRow.cells[i].innerHTML != "null")
        {
            NewRow = "<tr class=\"trLSDetail\">";
            if(i > 2)
            {
                NewRow = NewRow + "<td class=\"tdLSDetailCheckBox\">";
                NewRow = NewRow + "<input type=\"checkbox\">";
                NewRow = NewRow + "</td>";
                NewRow = NewRow + "<td class=\"tdLSDetail\">" + getValueFromTable("tableLSList", 2, i) + "</td>";
            }
            else
            {
                NewRow = NewRow + "<td class=\"tdLSDetailCheckBox\"></td>";
                NewRow = NewRow + "<td class=\"tdLSDetail\">" + getValueFromTable("tableLSList", 2, i) + "</td>";
            }
            NewRow = NewRow + "<td class=\"tdLSDetail\">" + currentRow.cells[i].innerHTML + "</td>";
            NewRow = NewRow + "<td class=\"tdLSDetailID\">" + getValueFromTable("tableLSList", 1, i) + "</td>";
            NewRow = NewRow + "</tr>";
            $("#tableLSEffect").append(NewRow);
        }
    }
}