var toRet = [];
var i;
var record;

for (i = 0; i < data.results.length; i++) {
    record = data.results[i];
    entry = {
        "popularity": record.popularity,
        "name": record.name
    };

    toRet.push(entry)
};