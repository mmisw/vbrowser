module.exports = {

    voc: {
        uri:     'http://mmisw.org/ont/cf/areatype',
        prefix:  'http://mmisw.org/ont/cf/areatype/'
    },

    termList: {
        fields: [{
            name: 'name'
        }, {
            name: 'definition'
        }]
    },

    orr: {
        name:           'MMI ORR',
        website:        'https://mmisw.org/',
        sparqlEndpoint: 'https://mmisw.org/sparql',

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
            "select distinct ?name ?definition\n" +
            "where {\n" +
            "  vocb:areatype skos:narrower ?name.\n" +
            "  OPTIONAL { ?name skos:definition      ?definition }\n" +
            "} order by ?name",

        termQueryTemplate:
            "prefix vocb: <{{voc.prefix}}>\n" +
            "prefix skos: <http://www.w3.org/2004/02/skos/core#>\n" +
            "select distinct ?definition where {\n" +
            "  vocb:areatype skos:narrower {{name}}.\n" +
            "  OPTIONAL { {{name}} skos:definition      ?definition }\n" +
            "}"
    }

};
