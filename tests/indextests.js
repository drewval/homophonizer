var assert = require('assert');
var hph = require('../index');
var idmaker = require('idmaker');

suite('Phoneme "sub" module', function phonemeSuite() {
  var homophonizer;

  afterEach(function closeDb(done) {
    homophonizer.shutdown(done);
  });

  test('Verify that you can create a phoneme homophonizer', 
    function testCreatePhonemeHomophonizer() {
      homophonizer = hph.phoneme.createHomophonizer();
      assert.equal(typeof homophonizer, 'object');
      assert.ok('getHomophones' in homophonizer);
      assert.ok('shutdown' in homophonizer);
      assert.equal(typeof homophonizer.getHomophones, 'function');
      assert.equal(typeof homophonizer.shutdown, 'function');
    }
  );

  // See phonemetests.js for more detailed homophone-getting tests.
  test('Verify that you can get homophones', 
    function testGetHomophone(testDone) {
      homophonizer = hph.phoneme.createHomophonizer();
      homophonizer.getImperfectHomophones({
        word: 'shell', 
        varyPhonemesAtPositions: [1]
      },
      function checkResult(error, results) {
        assert.ok(!error, error);
        assert.ok(results.length > 0);
        testDone();
      });
    }
  );

  test('Verify that you can get at the navigator', 
    function testNavigatorAccess() {
      assert.equal(typeof hph.phoneme.navigator, 'object');
      assert.equal(typeof hph.phoneme.navigator.classifyPhoneme, 'function');
      assert.equal(typeof hph.phoneme.navigator.getPhonemesInSameClass, 
        'function');
      assert.equal(typeof hph.phoneme.navigator.stripStressor, 'function');
    }
  );

});

suite('Metaphone "sub" module', function metaphoneSuite() {
  test('Verify that you can create a metaphone homophonizer', 
    function testCreateMetaphoneHomophonizer(testDone) {
      var homophonizer = hph.metaphone.createHomophonizer();
      assert.equal(typeof homophonizer, 'object');
      assert.ok('getHomophones' in homophonizer);
      assert.ok('shutdown' in homophonizer);
      assert.equal(typeof homophonizer.getHomophones, 'function');
      assert.equal(typeof homophonizer.shutdown, 'function');

      homophonizer.shutdown(testDone);
    }
  );

  // See metaphonetests.js for more detailed homophone-getting tests.
  test('Verify that you can get homophones', 
    function testGetHomophone(testDone) {
      var homophonizer = hph.metaphone.createHomophonizer();
      homophonizer.getHomophones('shell', 
      function checkResult(error, results) {
        assert.ok(!error, error);
        assert.ok(results.primary.length > 0);
        assert.ok(results.secondary.length > 0);
        testDone();
      });
    }
  );

});
