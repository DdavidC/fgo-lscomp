function queryDetail(queryDetailString)
{
    var URL = "http://spreadsheets.google.com/tq?key=1zSn8a5H8MucOkk7b4g-xVNCl-u2YQea6VyhIypVEayw";
    var query = new google.visualization.Query(URL);
    
    query.setQuery(queryDetailString);
    query.send(handleQueryDetailResponse);
}

function handleQueryDetailResponse(response)
{
    if(!response.isError())
    {
        var table = document.getElementById("tableLSEffect");
        var data = response.getDataTable();
        var colN = data.getNumberOfColumns();
        var rowN = data.getNumberOfRows();
        var valuedColN = 0;

        if(rowN != 1)
        {
            alert("Error: the number of rows > 2");
            return;
        }
        
        table.innerHTML = "";

        for(var i = 0; i < colN; i++)
        {
            if(data.getValue(0, i) != null)
            {
                valuedColN++;
            }
        }

        NewRow = "<tr class=\"trLSDetail\"><td colspan=\"3\">禮裝內容</td></tr>";
        $("#tableLSEffect").append(NewRow);

        for(var i = 0; i < colN; i++)
        {
            if(data.getValue(0, i) != null)
            {
                NewRow = "<tr class=\"trLSDetail\">";
                if(i > 2)
                {
                    NewRow = NewRow + "<td class=\"tdLSDetailCheckBox\">";
                    NewRow = NewRow + "<input type=\"checkbox\">";
                    NewRow = NewRow + "</td>";
                    NewRow = NewRow + "<td class=\"tdLSDetail\">" + data.getColumnLabel(i) + "</td>";
                }
                else
                {
                    NewRow = NewRow + "<td class=\"tdLSDetailCheckBox\"></td>";
                    NewRow = NewRow + "<td class=\"tdLSDetail\">" + data.getColumnLabel(i) + "</td>";
                }
                NewRow = NewRow + "<td class=\"tdLSDetail\">" + data.getValue(0, i) + "</td>";
                NewRow = NewRow + "<td class=\"tdLSDetail\" style=\"display: none\">" + data.getColumnId(i) + "</td>";
                NewRow = NewRow + "</tr>";
                $("#tableLSEffect").append(NewRow);
            }
        }
    }
    else
    {
        alert("Error");
    }
}
