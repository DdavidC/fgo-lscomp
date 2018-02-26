function setQueryListString(func)
{
    const COL_ID = 0;
    const COL_COST = 4;
    const COL_COST_ID = "E";

    const COL_EFFECT_ID = 3;
    const COL_EFFECT_VALUE = 2;
    const COL_EFFECT_S_OR_L = 4;

    var tableLSList = document.getElementById("tableLSList");
    var tableLSEffect = document.getElementById("tableLSEffect");
    var rowNTableLSEffect = tableLSEffect.rows.length;
    var textBoxSelectedLSListRow = document.getElementById("selectedLSListRow");
    var queryListString = "select *";            
    var uncheckCost = false;

    var newURL = "fgo-lscomp.html";

    if(func != 0 && textBoxSelectedLSListRow.value != "")
    {
        var checkedCheckBoxs = $(tableLSEffect).find("input[type='checkbox']:checked");
        var checkedN = checkedCheckBoxs.length;

        newURL += "?queryListString=";

        queryListString += " where (A = 0) or (";

        if(checkedN == 0)
        {
            // Check all
            checkedCheckBoxs = $(tableLSEffect).find("input[type='checkbox']");
            checkedN = checkedCheckBoxs.length;
            // But uncheck the cost
            uncheckCost = true;
        }
        for(var i = 0; i < checkedN; i++)
        {
            var rowNumber = $(checkedCheckBoxs[i]).parent().parent().index();
            var effectId = tableLSEffect.rows[rowNumber].cells[COL_EFFECT_ID].innerHTML;
            var effectValue = tableLSEffect.rows[rowNumber].cells[COL_EFFECT_VALUE].innerHTML;
            var effectSmallerOrLarger = Number(tableLSEffect.rows[rowNumber].cells[COL_EFFECT_S_OR_L].innerHTML);

            if(uncheckCost && effectId == COL_COST_ID)
            {
                continue;
            }
            queryListString += " " + effectId;

            if(func == 1 || func == 2)
            {
                // Smaller(1) or larger(2) is better
                if(effectSmallerOrLarger == func)
                {
                    // Smaller is better
                    queryListString += " >= ";
                }
                else
                {
                    // Larger is better
                    queryListString += " <= ";
                }
                queryListString += effectValue + " and " + effectId + " is not null";
            }
            else if(func == 3)
            {
                // Similar effect
                queryListString += " is not null";
            }

            if(i != checkedCheckBoxs.length - 1)
            {
                queryListString += " and";
            }
            else
            {
                queryListString += ")";
            }
        }
        newURL += encodeURIComponent(queryListString);
        newURL += "&targetLS=" + tableLSList.rows[Number(textBoxSelectedLSListRow.value)].cells[COL_ID].innerHTML;
    }

    window.location.replace(newURL);
}
