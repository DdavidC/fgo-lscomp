function setQueryListString(func)
{
    const COL_COST = 3;
    const COL_COST_ID = "D";

    var tableLSList = document.getElementById("tableLSList");
    var tableLSEffect = document.getElementById("tableLSEffect");
    var rowNTableLSEffect = tableLSEffect.rows.length;
    var textBoxSelectedLSListRow = document.getElementById("selectedLSListRow");
    var queryListString = "select *";            
    var uncheckCost = false;

    if(func != 0)
    {
        if(textBoxSelectedLSListRow.value != "")
        {
            var checkedCheckBoxs = $(tableLSEffect).find("input[type='checkbox']:checked");
            var checkedN = checkedCheckBoxs.length;

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
                var effectId = tableLSEffect.rows[rowNumber].cells[3].innerHTML;
                var effectValue = tableLSEffect.rows[rowNumber].cells[2].innerHTML;
                var effectSmallerOrLarger = Number(tableLSEffect.rows[rowNumber].cells[4].innerHTML);

                if(uncheckCost && effectId == COL_COST_ID)
                {
                    continue;
                }
                queryListString += " " + effectId;
                // Smaller of larger is better
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

                if(i != checkedCheckBoxs.length - 1)
                {
                    queryListString += " and";
                }
                else
                {
                    queryListString += ")";
                }
            }
        }
    }
    queryListString = encodeURIComponent(queryListString);
    window.location.replace("fgo-lscomp.html?queryListString=" + queryListString);
}
