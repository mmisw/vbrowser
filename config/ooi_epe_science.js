module.exports = {

    voc: {
        uri:     'http://mmisw.org/ont/ooi_epe/science',
        prefix:  'http://mmisw.org/ont/ooi_epe/science/'
    },

    termList: {
        fields: [{
            name: 'name'
        }, {
            name: 'Definition'
        }, {
            name: 'Title'
        }, {
            name: 'Images'
        }],

        pageSize: 60
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
            "select distinct ?name ?Definition ?Title ?Images\n" +
            "where {\n" +
            "  ?name a vocb:Science.\n" +
            "  OPTIONAL { ?name vocb:Definition      ?Definition }\n" +
            "  OPTIONAL { ?name vocb:Title           ?Title }\n" +
            "  OPTIONAL { ?name vocb:Images          ?Images }\n" +
            "} order by ?name",

        termQueryTemplate:
            "prefix vocb: <{{voc.prefix}}>\n" +
            "select distinct ?Definition ?Title ?Images where {\n" +
            "  {{name}} a vocb:Science.\n" +
            "  OPTIONAL { {{name}} vocb:Definition      ?Definition }\n" +
            "  OPTIONAL { {{name}} vocb:Title           ?Title }\n" +
            "  OPTIONAL { {{name}} vocb:Images          ?Images }\n" +
            "}"
    }

};
