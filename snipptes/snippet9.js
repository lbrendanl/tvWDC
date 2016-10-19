var toRet = [];
_.each(data.results, function(record) {               
    entry = {
        "popularity": record.popularity,
        "name": record.name
    };

    toRet.push(entry)
});