

module.exports = function( criteria, projection, sort, skip, limit, size, err, doc, callback ){
//    console.log("-------------" );
//    console.log("criteria=" + criteria);
//    console.log("projection=" + projection);
//    console.log("sort=" + sort);
//    console.log("skip=" + skip);
//    console.log("limit=" + limit);
//    console.log("size=" + size);
//    console.log("doc=" + doc);
//    console.log("err=" + err);
//    console.log("-------------" );
    callback( {
        criteria : criteria || {},
        projection : projection || {},
        sort : sort ||{},
        skip : skip || {},
        limit : limit || {},
        size : size || {},
        message : { err: err, msg: {} },
        results : doc || []
    } );
};
