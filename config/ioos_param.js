module.exports = {

    voc: {
        uri:     'http://mmisw.org/ont/ioos/parameter',
        prefix:  'http://mmisw.org/ont/ioos/parameter/'
    },

    termList: {
        fields: [{
            name: 'term'
        }, {
            name: 'definition'
        }, {
            name: 'reference'
        }, {
            name: 'units'
        }]
    },

    orr: {
        name:           'MMI ORR',
        website:        'http://mmisw.org/',
        sparqlEndpoint: 'http://mmisw.org/sparql',

        generalInfoQuery:
            "prefix omvmmi: <http://mmisw.org/ont/mmi/20081020/ontologyMetadata/>\n" +
            "prefix omv: <http://omv.ontoware.org/2005/05/ontology#>\n" +
            "select distinct ?name ?version\n" +
            "where {\n" +
            "  OPTIONAL { <{{voc.uri}}> omv:name      ?name}\n" +
            "  OPTIONAL { <{{voc.uri}}> omv:version   ?version}\n" +
            "}",

        termListQuery:
            "prefix vocb: <{{voc.prefix}}>\n" +
            "prefix skos: <http://www.w3.org/2004/02/skos/core#>\n" +
            "select distinct ?term ?definition ?reference ?units\n" +
            "where {\n" +
            "  ?term a vocb:Parameter.\n" +
            "  OPTIONAL { ?term vocb:Definition      ?definition }\n" +
            "  OPTIONAL { ?term vocb:Reference       ?reference }\n" +
            "  OPTIONAL { ?term vocb:Units           ?units }\n" +
            "} order by ?term",

        termQueryTemplate:
            "prefix vocb: <{{voc.prefix}}>\n" +
            "select distinct ?definition ?reference ?units where {\n" +
            "  {{name}} a vocb:Parameter.\n" +
            "  OPTIONAL { {{name}} vocb:Definition      ?definition }\n" +
            "  OPTIONAL { {{name}} vocb:Reference       ?reference }\n" +
            "  OPTIONAL { {{name}} vocb:Units           ?units }\n" +
            "}"
    },

    categoryFilter: {

        //onlyOnTermName: true,  // false by default

        categories: [{
            label:        'Surface',
            searchString: 'surface'
        }, {
            label:        'Wave',
            searchString: 'wave'
        }]
    }

};
