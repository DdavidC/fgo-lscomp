function setQueryListString(queryListString)
{
    const COL_COST = 3;

    var tableLSList = document.getElementById("tableLSList");
    var tableLSEffect = document.getElementById("tableLSEffect");
    var rowNTableLSEffect = tableLSEffect.rows.length;
    var textBoxSelectedLSListRow = document.getElementById("selectedLSListRow");
                    
    if(queryListString == "undefined" || queryListString == "reset")
    {
        queryListString = "select *";
    }

    if(textBoxSelectedLSListRow.value != "")
    {
        var checkedCheckBoxs = $(tableLSEffect).find("input[type='checkbox']:checked");

        queryListString = "select *";

        if(checkedCheckBoxs.length > 0)
        {
            queryListString = queryListString + " where";
            
            for(var i = 0; i < checkedCheckBoxs.length; i++)
            {
                var rowNumber = $(checkedCheckBoxs[i]).parent().parent().index();
                var attId = tableLSEffect.rows[rowNumber].cells[3].innerHTML;
                var attValue = tableLSEffect.rows[rowNumber].cells[2].innerHTML;

                queryListString = queryListString + " " + attId;
                // Special cases
                if(i == COL_COST) // Always try to find better cost
                {
                    queryListString = queryListString + " <= ";
                }
                else
                {
                    queryListString = queryListString + " <= ";
                }
                queryListString = queryListString + attValue + " and " + attId + " is not null";

                if(i != checkedCheckBoxs.length - 1)
                {
                    queryListString = queryListString + " and";
                }
            }
        }
    }
    queryListString = encodeURIComponent(queryListString);
    window.location.replace("fgo-lscomp.html?queryListString=" + queryListString);
}
