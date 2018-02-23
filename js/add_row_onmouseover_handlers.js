function addRowOnMouseOverHandlers(tableID)
{
    const ROW_VALUE_START = 5;

    var table = document.getElementById(tableID);

    for (i = ROW_VALUE_START; i < table.rows.length; i++)
    {
        var currentRow = table.rows[i];
        var createMouseOverHandler = 
            function(currentRow) 
            {
                return function()
                {
                    var textBoxSelectedLSListRow = document.getElementById("selectedLSListRow");
                    
                    if(textBoxSelectedLSListRow.value == "")
                    {
                        showLSDetail(this);
                    }
                };
            };

        currentRow.onmouseover = createMouseOverHandler(currentRow);
    }
}
