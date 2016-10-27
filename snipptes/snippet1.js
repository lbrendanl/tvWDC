$(document).ready(function() {
    $("#submitButton").click(function() {
        tableau.connectionName = "TVDB Data";
        tableau.submit();
    });
});
