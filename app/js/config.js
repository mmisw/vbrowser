var scvConfig = {
  "voc": {
    "uri": "http://mmisw.org/ont/ooi_epe/science",
    "prefix": "http://mmisw.org/ont/ooi_epe/science/"
  },
  "termList": {
    "fields": [
      {
        "name": "name"
      },
      {
        "name": "Definition"
      },
      {
        "name": "Title"
      },
      {
        "name": "Images"
      }
    ],
    "pageSize": 60
  },
  "orr": {
    "name": "MMI ORR",
    "website": "http://mmisw.org/",
    "sparqlEndpoint": "http://mmisw.org/sparql",
    "generalInfoQuery": "prefix omvmmi: <http://mmisw.org/ont/mmi/20081020/ontologyMetadata/>\nprefix omv: <http://omv.ontoware.org/2005/05/ontology#>\nselect distinct ?name ?version\nwhere {\n  OPTIONAL { <{{voc.uri}}> omv:name      ?name}\n  OPTIONAL { <{{voc.uri}}> omv:version   ?version}\n}",
    "termListQuery": "prefix vocb: <{{voc.prefix}}>\nprefix skos: <http://www.w3.org/2004/02/skos/core#>\nselect distinct ?name ?Definition ?Title ?Images\nwhere {\n  ?name a vocb:Science.\n  OPTIONAL { ?name vocb:Definition      ?Definition }\n  OPTIONAL { ?name vocb:Title           ?Title }\n  OPTIONAL { ?name vocb:Images          ?Images }\n} order by ?name",
    "termQueryTemplate": "prefix vocb: <{{voc.prefix}}>\nselect distinct ?Definition ?Title ?Images where {\n  {{name}} a vocb:Science.\n  OPTIONAL { {{name}} vocb:Definition      ?Definition }\n  OPTIONAL { {{name}} vocb:Title           ?Title }\n  OPTIONAL { {{name}} vocb:Images          ?Images }\n}"
  },
  "categories": [],
  "mapping": {
    "predicates": [
      {
        "label": "skos:exactMatch",
        "predicate": "http://www.w3.org/2004/02/skos/core#exactMatch",
        "queryTemplate": "prefix skos: <http://www.w3.org/2004/02/skos/core#>\nselect distinct ?object where {\n { {{termUri}} skos:exactMatch ?object     } UNION\n { ?object     skos:exactMatch {{termUri}} } \n} order by ?object"
      },
      {
        "label": "skos:broadMatch",
        "predicate": "http://www.w3.org/2004/02/skos/core#broadMatch",
        "queryTemplate": "prefix skos: <http://www.w3.org/2004/02/skos/core#>\nselect distinct ?object where {\n { {{termUri}} skos:broadMatch  ?object     } UNION\n { ?object     skos:narrowMatch {{termUri}} }\n} order by ?object"
      },
      {
        "label": "skos:narrowMatch",
        "predicate": "http://www.w3.org/2004/02/skos/core#narrowMatch",
        "queryTemplate": "prefix skos: <http://www.w3.org/2004/02/skos/core#>\nselect distinct ?object where {\n { {{termUri}} skos:narrowMatch ?object     } UNION \n { ?object     skos:broadMatch  {{termUri}} }\n} order by ?object"
      },
      {
        "label": "skos:relatedMatch",
        "predicate": "http://www.w3.org/2004/02/skos/core#relatedMatch",
        "queryTemplate": "prefix skos: <http://www.w3.org/2004/02/skos/core#>\nselect distinct ?object where {\n { {{termUri}} skos:relatedMatch ?object     } UNION \n { ?object     skos:relatedMatch {{termUri}} }\n} order by ?object"
      },
      {
        "label": "skos:narrower",
        "predicate": "http://www.w3.org/2004/02/skos/core#narrower",
        "queryTemplate": "prefix skos: <http://www.w3.org/2004/02/skos/core#>\nselect distinct ?object where {\n { {{termUri}} skos:narrower ?object     } UNION \n { ?object     skos:broader  {{termUri}} }\n} order by ?object"
      },
      {
        "label": "skos:broader",
        "predicate": "http://www.w3.org/2004/02/skos/core#broader",
        "queryTemplate": "prefix skos: <http://www.w3.org/2004/02/skos/core#>\nselect distinct ?object where {\n { {{termUri}} skos:broader ?object     } UNION \n { ?object     skos:narrower  {{termUri}} }\n} order by ?object"
      },
      {
        "label": "skos:related",
        "predicate": "http://www.w3.org/2004/02/skos/core#related",
        "queryTemplate": "prefix skos: <http://www.w3.org/2004/02/skos/core#>\nselect distinct ?object where {\n { {{termUri}} skos:related ?object     } UNION \n { ?object     skos:related  {{termUri}} }\n} order by ?object"
      },
      {
        "label": "owl:sameAs",
        "predicate": "http://www.w3.org/2002/07/owl#sameAs",
        "queryTemplate": "prefix owl: <http://www.w3.org/2002/07/owl#>\nselect distinct ?object where {\n { {{termUri}} owl:sameAs ?object     } UNION \n { ?object     owl:sameAs  {{termUri}} }\n} order by ?object"
      }
    ]
  }
}