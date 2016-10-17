(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {

    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {

    };

    tableau.registerConnector(myConnector);
})();
