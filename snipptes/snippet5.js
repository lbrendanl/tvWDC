(function() {
    /*
    .....
    */

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        var connectionUrl = base_uri + "tv/popular?api_key=" + api_key + "&page=1";
        
        var xhr = $.ajax({
            url: connectionUrl,
            dataType: 'json',
            success: function(data) {
                var toRet = [];
                _.each(data.results, function(record) {               
                    entry = {
                        "popularity": record.popularity,
                        "name": record.name
                    };

                    toRet.push(entry)
                });

                table.appendRows(toRet);
                doneCallback();  
            },
            error: function(xhr, ajaxOptions, thrownError) {
                tableau.abortWithError(thrownError);
            }
        });
    };

    /*
    .....
    */
})();
