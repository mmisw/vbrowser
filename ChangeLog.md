2016-03-16
- add `fish.{n3,js}` to illustrate how #1 could be addressed.
    - `fish.n3` registered at the ORR: http://mmisw.org/ont/test/fish
    - `fish.js` as the configuration with the 1+4 columns
    - distribution created with:
      `$ gulp dist --config  ./config/fish/fish.js`
    - deployed at https://mmisw.org/experimental/vbrowser/fish/

- adjust template replacements
- avoid initial temporary display of unresolved `{{...}}` angular expressions
- other minor adjustments

2014-02-05
- run well when served with https

2014-08-14
- initial skeleton based on [cfsn@f4dfbd](https://github.com/mmisw/cfsn/commits/f4dfbd11b191)
