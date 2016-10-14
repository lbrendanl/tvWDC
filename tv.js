(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        $.getJSON( "./schema.json" )
        .done(function( schemaJson ) {
            schemaCallback(schemaJson);
        })
        .fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
        });
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        theMovieDb.tv.getTopRated({}, function(data) {
            console.log("Success callback: " + data); 
            var toRet = [];
            var jsonData = $.parseJSON(data); 
            _.each(jsonData.results, function(record) {               
                entry = {
                    "poster_path": record.poster_path,
                    "popularity": record.popularity,
                    "id": record.id,
                    "backdrop_path": record.backdrop_path,
                    "vote_average": record.vote_average,
                    "overview": record.overview,
                    "first_air_date": record.first_air_date,
                    "origin_country": record.origin_country,
                    "genre_id1": record.genre_ids[0],
                    "genre_id2": record.genre_ids[1],
                    "original_language": record.original_language,
                    "vote_count": record.vote_count,
                    "name": record.name,
                    "original_name": record.original_name
                };

                toRet.push(entry)
            });

            table.appendRows(toRet);
            doneCallback();  

        }, function(data) {
            console.log("Error callback: " + data);
        });
    };

    tableau.registerConnector(myConnector);

    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "TVDB Data";
            tableau.submit();
        });
    });
})();
