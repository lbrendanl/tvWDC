(function() {
    /*
    .....
    */

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [
            { id: "popularity", dataType: tableau.dataTypeEnum.float },
            { id: "name", dataType: tableau.dataTypeEnum.string }
        ];

        var tableSchema = {
            id: "shows",
            alias: "Top Rated TV Shows",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    /*
    .....
    */
})();
