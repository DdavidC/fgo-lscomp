function queryList(queryListString)
{
    var URL = "https://spreadsheets.google.com/tq?key=";
    var googleSheetKey = document.getElementById("googleSheetKey").value;

    if(googleSheetKey == "")
    {
        googleSheetKey = "1zSn8a5H8MucOkk7b4g-xVNCl-u2YQea6VyhIypVEayw";
    }
    URL += googleSheetKey;

    var query = new google.visualization.Query(URL);
    query.setQuery(queryListString);
    query.send(handleQueryListResponse);
}

function handleQueryListResponse(response)
{
    if(!response.isError())
    {
        const COL_NO = 0;
        const COL_IMG = 1;
        const COL_NAME = 2;
        const COL_MAX = 3;
        const COL_COST = 4;
        const COL_VISIABLE_N_LIST = 5;
        const COL_EFFECT_START = 5;

        const ROW_VALUE_START = 2;
        const ROW_EFFECT_VALUE_N = 0;

        var data = response.getDataTable();
        var colN = data.getNumberOfColumns();
        var rowN = data.getNumberOfRows();

        // Row 0: Table title
        NewRow = "<tr class=\"trLSList\"><td colspan=\"" + COL_VISIABLE_N_LIST + "\">禮裝列表</td></tr>";
        $("#tableLSList").append(NewRow);

        // Row 1: Column IDs
        NewRow = "<tr class=\"trLSListColID\">";
        for(var j = 0; j < colN; j++)
        {
            NewRow += "<td class=\"tdLSListOthers\">" + data.getColumnId(j) + "</td>";
        }
        NewRow += "</tr>";
        $("#tableLSList").append(NewRow);

        // Row 2: Column names
        NewRow = "<tr class=\"trLSList\">";
        for(var j = 0; j < colN; j++)
        {
            NewRow += "<td";
            if(j >= COL_VISIABLE_N_LIST)
            {
                NewRow += " class=\"tdLSListOthers\"";
            }
            NewRow += ">" + data.getColumnLabel(j) + "</td>";
        }
        NewRow += "</tr>";
        $("#tableLSList").append(NewRow);

        // Row 3: Effect information
        for(var i = 0; i < ROW_VALUE_START; i++)
        {
            NewRow = "<tr class=\"trLSListEffectInfo\">";
            for(var j = 0; j < colN; j++)
            {
                NewRow += "<td class=\"tdLSListOthers\">" + data.getValue(i, j) + "</td>";
            }
            NewRow += "</tr>";
            $("#tableLSList").append(NewRow);
        }

        for(var i = ROW_VALUE_START; i < rowN; i++)
        {
            NewRow = "<tr class=\"trLSList\">";
            for(var j = 0; j < colN; j++)
            {
                switch(j)
                {
                    case COL_NO:
                        NewRow += "<td class=\"tdLSListNo\">" + data.getValue(i, j) + "</td>";
                        break;

                    case COL_IMG:
                        NewRow += "<td class=\"tdLSListImg\"><img class=\"imgLSSmall\" src=\"img/" + data.getValue(i, COL_NO) + "s.png\"></td>";
                        break;

                    case COL_NAME:
                        NewRow += "<td class=\"tdLSListName\">" + data.getValue(i, j) + "</td>";
                        break;

                    case COL_MAX:
                        NewRow += "<td class=\"tdLSListMax\">" + data.getValue(i, j) + "</td>";
                        break;
                            
                    case COL_COST:
                        NewRow += "<td class=\"tdLSListCost\">" + data.getValue(i, j) + "</td>";
                        break;
                            
                    default:
                        NewRow += "<td class=\"tdLSListOthers\">" + data.getValue(i, j) + "</td>";
                }
            }
            NewRow += "</tr>";
            $("#tableLSList").append(NewRow);
        }
        addRowOnMouseOverHandlers("tableLSList");
        addRowOnClickHandlers("tableLSList");

        // Click last target LS
        var targetLS = decodeURIComponent($.getUrlVar("targetLS"));

        if(targetLS != "undefined")
        {
            var textBoxSelectedLSListRow = document.getElementById("selectedLSListRow");
            var table = document.getElementById("tableLSList"); 
            var currentRow;
    
            for(var i = ROW_VALUE_START; i < table.rows.length; i++)
            {
                if(table.rows[i].cells[COL_NO].innerHTML == targetLS)
                {
                    break;
                }
            }
            currentRow = table.rows[i];
            currentRow.onclick();
        }

        // Set selectEffect options
        var newOption;

        for(var j = COL_EFFECT_START; j < colN; j++)
        {
            newOption = "<option value=\"" + data.getColumnId(j) + "\">" + data.getColumnLabel(j);
            if(data.getValue(ROW_EFFECT_VALUE_N, j) > 1)
            {
                newOption += "（";
                for(var k = data.getValue(ROW_EFFECT_VALUE_N, j) - 1; k >= 1; k--, j++)
                {
                    newOption += data.getColumnLabel(j + 1);
                    if(k != 1)
                    {
                        newOption += "、";
                    }
                }
                newOption += "）";
            }
            newOption += "</option>";
            $("#selectEffect").append(newOption);
        }
    }
    else
    {
        alert("Error");
    }
}
