var connectionUrl = "";

var xhr = $.ajax({
    url: connectionUrl,
    dataType: 'json',
    success: function(data) {

    },
    error: function(xhr, ajaxOptions, thrownError) {
        tableau.abortWithError(thrownError);
    }
});