(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();
    var num_pages = 10;

    var api_key = "8922bff85ef645a09730d7c1836c3edf",
        base_uri = "https://api.themoviedb.org/3/",
        images_uri =  "https://image.tmdb.org/t/p/w500";

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [
            { id: "poster_path", dataType: tableau.dataTypeEnum.string },
            { id: "popularity", dataType: tableau.dataTypeEnum.float },
            { id: "id", dataType: tableau.dataTypeEnum.int },
            { id: "backdrop_path", dataType: tableau.dataTypeEnum.string },
            { id: "vote_average", dataType: tableau.dataTypeEnum.float },
            { id: "overview", dataType: tableau.dataTypeEnum.string },
            { id: "first_air_date", dataType: tableau.dataTypeEnum.date },
            { id: "origin_country", dataType: tableau.dataTypeEnum.string },
            { id: "original_language", dataType: tableau.dataTypeEnum.string },
            { id: "vote_count", dataType: tableau.dataTypeEnum.int },
            { id: "name", dataType: tableau.dataTypeEnum.string },
            { id: "original_name", dataType: tableau.dataTypeEnum.string }
        ];

        var tableSchema = {
            id: "shows",
            alias: "Top Rated TV Shows",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        var i;
        var promises = [];

        for (i = 1; i < num_pages; i++) {
            promises.push(getResultsPromise(table, i));    
        }

        var promise = Promise.all(promises);

        promise.then(function(response) {
            doneCallback();
        }, function(error) {
            tableau.abortWithError(error);
        });
    };

    function getResultsPromise(table, pageNum) {
        return new Promise(function(resolve, reject) {
            var connectionUrl = base_uri + "tv/popular?api_key=" + api_key + "&page=" + pageNum;
            
            var xhr = $.ajax({
                url: connectionUrl,
                dataType: 'json',
                success: function(data) {
                    var toRet = [];
                    
                    if (data.results) {
                        _.each(data.results, function(record) {               
                            entry = {
                                "poster_path": images_uri + record.poster_path,
                                "popularity": record.popularity,
                                "id": record.id,
                                "backdrop_path": images_uri + record.backdrop_path,
                                "vote_average": record.vote_average,
                                "overview": record.overview,
                                "first_air_date": record.first_air_date,
                                "origin_country": record.origin_country[0] || null,
                                "original_language": record.original_language,
                                "vote_count": record.vote_count,
                                "name": record.name,
                                "original_name": record.original_name
                            };

                            toRet.push(entry)
                        });

                        table.appendRows(toRet);
                        resolve();
                    } else {
                        Promise.reject("No results found for ticker symbol: " + ticker);
                    }
                 },
                 error: function(xhr, ajaxOptions, thrownError) {
                     Promise.reject("error connecting to the yahoo stock data source: " + thrownError);
                 }
            });
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
