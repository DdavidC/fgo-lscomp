function addRowOnClickHandlers(tableID)
{
    const ROW_VALUE_START = 5;

    var table = document.getElementById(tableID);

    for (i = ROW_VALUE_START; i < table.rows.length; i++)
    {
        var currentRow = table.rows[i];
        var createOnClickHandler = 
            function(currentRow) 
            {
                return function()
                {
                    var tableLSList = document.getElementById("tableLSList");
                    var textBoxSelectedLSListRow = document.getElementById("selectedLSListRow");

                    if(textBoxSelectedLSListRow.value == "")
                    {
                        $(this).css("background", "red");
                        textBoxSelectedLSListRow.value = $(this).index();
                        showLSDetail(this);
                    }
                    else
                    {
                        $(tableLSList.rows[Number(textBoxSelectedLSListRow.value)]).css("background", "white");
                        if(Number(textBoxSelectedLSListRow.value) != $(this).index())
                        {
                            $(this).css("background", "red");
                            textBoxSelectedLSListRow.value = $(this).index();
                            showLSDetail(this);
                        }
                        else
                        {
                            textBoxSelectedLSListRow.value = "";
                        }
                    }
                };
            };
        
        currentRow.onclick = createOnClickHandler(currentRow);
    }
}
