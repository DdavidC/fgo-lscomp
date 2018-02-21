function addRowOnMouseOverHandlers(tableID)
{
    var table = document.getElementById(tableID);

    for (i = 2; i < table.rows.length; i++)
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
                        setQueryDetailString(this);
                    }
                };
            };

        currentRow.onmouseover = createMouseOverHandler(currentRow);
    }
}
