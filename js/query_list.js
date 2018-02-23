function queryList(queryListString)
{
    var URL = "http://spreadsheets.google.com/tq?key=1zSn8a5H8MucOkk7b4g-xVNCl-u2YQea6VyhIypVEayw";
    var query = new google.visualization.Query(URL);
    
    query.setQuery(queryListString);
    query.send(handleQueryListResponse);
}

function handleQueryListResponse(response)
{
    if(!response.isError())
    {
        const COL_NO = 0
        const COL_NAME = 1;
        const COL_MAX = 2
        const COL_COST = 3;
        const COL_VISIABLE_N_LIST = 4;

        var data = response.getDataTable();
        var colN = data.getNumberOfColumns();
        var rowN = data.getNumberOfRows();

        // Row 0: Table title
        NewRow = "<tr class=\"trLSList\"><td colspan=\"" + COL_VISIABLE_N_LIST + "\">禮裝列表</td></tr>";
        $("#tableLSList").append(NewRow);

        // Row 1: Column IDs
        NewRow = "<tr class=\"trLSList\" style=\"display: none\">";
        for(var j = 0; j < colN; j++)
        {
            NewRow = NewRow + "<td style=\"display: none\">" + data.getColumnId(j) + "</td>";
        }
        NewRow = NewRow + "</tr>";
        $("#tableLSList").append(NewRow);

        // Row 2: Column names
        NewRow = "<tr class=\"trLSList\">";
        for(var j = 0; j < colN; j++)
        {
            NewRow = NewRow + "<td";
            if(j >= COL_VISIABLE_N_LIST)
            {
                NewRow = NewRow + " style=\"display: none\"";
            }
            NewRow = NewRow + ">" + data.getColumnLabel(j) + "</td>";
        }
        NewRow = NewRow + "</tr>";
        $("#tableLSList").append(NewRow);

        for(var i = 0; i < rowN; i++)
        {
            NewRow = "<tr class=\"trLSList\">";
            for(var j = 0; j < colN; j++)
            {
                switch(j)
                {
                    case COL_NO:
                        NewRow = NewRow + "<td class=\"tdLSListNo\">" + data.getValue(i, j) + "</td>";
                        break;

                    case COL_NAME:
                        NewRow = NewRow + "<td class=\"tdLSListName\">" + data.getValue(i, j) + "</td>";
                        break;

                    case COL_MAX:
                        NewRow = NewRow + "<td class=\"tdLSListMax\">" + data.getValue(i, j) + "</td>";
                        break;
                            
                    case COL_COST:
                        NewRow = NewRow + "<td class=\"tdLSListCost\">" + data.getValue(i, j) + "</td>";
                        break;
                            
                    default:
                        NewRow = NewRow + "<td class=\"tdLSListOthers\">" + data.getValue(i, j) + "</td>";
                    }
            }
            NewRow = NewRow + "</tr>";
            $("#tableLSList").append(NewRow);
        }
        addRowOnMouseOverHandlers("tableLSList");
        addRowOnClickHandlers("tableLSList");
    }
    else
    {
        alert("Error");
    }
}
