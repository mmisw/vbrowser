/**
 * Common configuration elements.
 */
module.exports = {

    mapping: {
        /*
         * Note: we do UNIONs below to not necessarily rely on inference
         * being enabled on the SPARQL endpoint.
         */
        predicates: [{
            label:          'skos:exactMatch',
            predicate:      'http://www.w3.org/2004/02/skos/core#exactMatch',
            queryTemplate:
                "prefix skos: <http://www.w3.org/2004/02/skos/core#>\n" +
                "select distinct ?object where {\n" +
                " { {{termUri}} skos:exactMatch ?object     } UNION\n" +
                " { ?object     skos:exactMatch {{termUri}} } \n" +
                "} order by ?object"
        }, {
            label:          'skos:broadMatch',
            predicate:      'http://www.w3.org/2004/02/skos/core#broadMatch',
            queryTemplate:
                "prefix skos: <http://www.w3.org/2004/02/skos/core#>\n" +
                "select distinct ?object where {\n" +
                " { {{termUri}} skos:broadMatch  ?object     } UNION\n" +
                " { ?object     skos:narrowMatch {{termUri}} }\n" +
                "} order by ?object"
        }, {
            label:          'skos:narrowMatch',
            predicate:      'http://www.w3.org/2004/02/skos/core#narrowMatch',
            queryTemplate:
                "prefix skos: <http://www.w3.org/2004/02/skos/core#>\n" +
                "select distinct ?object where {\n" +
                " { {{termUri}} skos:narrowMatch ?object     } UNION \n" +
                " { ?object     skos:broadMatch  {{termUri}} }\n" +
                "} order by ?object"
        }, {
            label:        'skos:relatedMatch',
            predicate:      'http://www.w3.org/2004/02/skos/core#relatedMatch',
            queryTemplate:
                "prefix skos: <http://www.w3.org/2004/02/skos/core#>\n" +
                "select distinct ?object where {\n" +
                " { {{termUri}} skos:relatedMatch ?object     } UNION \n" +
                " { ?object     skos:relatedMatch {{termUri}} }\n" +
                "} order by ?object"
        }, {
            label:          'skos:narrower',
            predicate:      'http://www.w3.org/2004/02/skos/core#narrower',
            queryTemplate:
                "prefix skos: <http://www.w3.org/2004/02/skos/core#>\n" +
                "select distinct ?object where {\n" +
                " { {{termUri}} skos:narrower ?object     } UNION \n" +
                " { ?object     skos:broader  {{termUri}} }\n" +
                "} order by ?object"
        }, {
            label:          'skos:broader',
            predicate:      'http://www.w3.org/2004/02/skos/core#broader',
            queryTemplate:
                "prefix skos: <http://www.w3.org/2004/02/skos/core#>\n" +
                "select distinct ?object where {\n" +
                " { {{termUri}} skos:broader ?object     } UNION \n" +
                " { ?object     skos:narrower  {{termUri}} }\n" +
                "} order by ?object"
        }, {
            label:          'skos:related',
            predicate:      'http://www.w3.org/2004/02/skos/core#related',
            queryTemplate:
                "prefix skos: <http://www.w3.org/2004/02/skos/core#>\n" +
                "select distinct ?object where {\n" +
                " { {{termUri}} skos:related ?object     } UNION \n" +
                " { ?object     skos:related  {{termUri}} }\n" +
                "} order by ?object"
        }, {
            label:          'owl:sameAs',
            predicate:      'http://www.w3.org/2002/07/owl#sameAs',
            queryTemplate:
                "prefix owl: <http://www.w3.org/2002/07/owl#>\n" +
                "select distinct ?object where {\n" +
                " { {{termUri}} owl:sameAs ?object     } UNION \n" +
                " { ?object     owl:sameAs  {{termUri}} }\n" +
                "} order by ?object"
        }]
    }

};
