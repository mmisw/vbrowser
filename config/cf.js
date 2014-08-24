module.exports = {

    voc: {
        uri:     'http://mmisw.org/ont/cf/parameter',
        prefix:  'http://mmisw.org/ont/cf/parameter/'
    },

    termList: {
        fields: [{
            name: 'name'
        }, {
            name: 'definition'
        }, {
            name: 'canonicalUnits'
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
            "select distinct ?name ?definition ?canonicalUnits\n" +
            "where {\n" +
            "  vocb:parameter skos:narrower ?name.\n" +
            "  OPTIONAL { ?name skos:definition      ?definition }\n" +
            "  OPTIONAL { ?name vocb:canonical_units ?canonicalUnits }\n" +
            "} order by ?name",

        termQueryTemplate:
            "prefix vocb: <{{voc.prefix}}>\n" +
            "prefix skos: <http://www.w3.org/2004/02/skos/core#>\n" +
            "select distinct ?definition ?canonicalUnits where {\n" +
            "  vocb:parameter skos:narrower {{name}}.\n" +
            "  OPTIONAL { {{name}} skos:definition      ?definition }\n" +
            "  OPTIONAL { {{name}} vocb:canonical_units ?canonicalUnits }\n" +
            "}"
    },

    categoryFilter: {

        onlyOnTermName: true,

        // according to http://cfconventions.org/Data/cf-standard-names/27/build/cf-standard-name-table.html as of 2014-07-25
        categories: [
            {
                label: 'Atmospheric Chemistry',
                searchString: 'aerosol dry.*deposition wet.*deposition production emission mole'
            },
            {
                label: 'Atmospheric Dynamics',
                searchString: 'air_pressure atmosphere.*vorticity atmosphere.*streamfunction wind momentum.*in_air gravity_wave ertel geopotential omega atmosphere.*dissipation atmosphere.*energy atmosphere.*drag atmosphere.*stress surface.*stress'
            },
            {
                label: 'Carbon Cycle',
                searchString: 'carbon leaf vegetation'
            },
            {
                label: 'Cloud',
                searchString: 'cloud'
            },
            {
                label: 'Hydrology',
                searchString: 'atmosphere_water canopy_water precipitation rain snow moisture freshwater runoff root humidity transpiration evaporation water_vapour river'
            },
            {
                label: 'Ocean Dynamics',
                searchString: 'ocean.*streamfunction sea_water_velocity ocean.*vorticity'
            },
            {
                label: 'Radiation',
                searchString: 'radiative longwave shortwave brightness radiance albedo'
            },
            {
                label: 'Sea Ice',
                searchString: 'sea_ice'
            },
            {
                label: 'Surface',
                searchString: 'surface'
            }
        ]
    }

};
