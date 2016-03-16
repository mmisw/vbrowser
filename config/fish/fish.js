module.exports = {

  voc: {
    uri:     'http://mmisw.org/ont/test/fish',
    prefix:  'http://mmisw.org/ont/test/fish/'
  },

  termList: {
    fields: [{
      name: 'term'
    }, {
      name: 'DBPediaRef'
    }, {
      name: 'DBPediaDef'
    }, {
      name: 'EOLRef'
    }, {
      name: 'EOLDef'
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
      "select distinct ?term ?DBPediaRef ?DBPediaDef ?EOLRef ?EOLDef\n" +
      "from <{{voc.uri}}>\n" +
      "where {\n" +
      "  OPTIONAL { ?term vocb:dbpediaRef  ?DBPediaRef }\n" +
      "  OPTIONAL { ?term vocb:dbpediaDef  ?DBPediaDef }\n" +
      "  OPTIONAL { ?term vocb:eolRef      ?EOLRef }\n" +
      "  OPTIONAL { ?term vocb:eolDef      ?EOLDef }\n" +
      "} order by ?term",

    termQueryTemplate:
      "prefix vocb: <{{voc.prefix}}>\n" +
      "select distinct ?term ?DBPediaRef ?DBPediaDef ?EOLRef ?EOLDef\n" +
      "from <{{voc.uri}}>\n" +
      "where {\n" +
      "  OPTIONAL { {{name}} vocb:dbpediaRef  ?DBPediaRef }\n" +
      "  OPTIONAL { {{name}} vocb:dbpediaDef  ?DBPediaDef }\n" +
      "  OPTIONAL { {{name}} vocb:eolRef      ?EOLRef }\n" +
      "  OPTIONAL { {{name}} vocb:eolDef      ?EOLDef }\n" +
      "}"
  }
};
