function pageInit()
{
    const COL_NO = 0;
    const ROW_VALUE_START = 5;

    // Last queryListString
    var queryListString = decodeURIComponent($.getUrlVar("queryListString"));
        
    if(queryListString == "undefined")
    {
        queryListString = "select *";
    }

    document.getElementById("textBoxQueryListString").value = queryListString;

    // Query by last queryListString
    queryList(queryListString);
}
