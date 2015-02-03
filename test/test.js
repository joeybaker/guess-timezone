'use strict';

var test = require('prova')
  , lib = require('../index.js')
  , sinon = require('sinon')

test('#calc', function calcTest(t){
  t.plan(1)

  t.equal(
    typeof lib.calc()
    , 'string'
    , 'returns a string'
  )
})

test('#setWhitelist', function setWhitelistTest(t){
  t.plan(2)

  lib.setWhitelist()
  t.equal(
    lib.internals.whitelist
    , lib.internals.defaultTimezoneWhiteList
    , 'returns the default list if no arguments are passed'
  )

  t.throws(
    lib.setWhitelist.bind(lib, 1)
    , 'throws if a non-array is passed'
  )

})

test('#internals.getFromIntl', function getFromIntlTest(t){
  var aTimezone = 'mytimezone'

  if (!Intl){
    t.plan(2)
    global.Intl = {
      DateTimeFormat: function DateTimeFormat(){
        return {}
      }
    }

    t.equal(
      lib.internals.getFromIntl()
      , undefined
      , 'returns undefined if Intl.DateTimeFormat does not return `resolvedOptions`'
    )

    global.Intl = {
      DateTimeFormat: function DateTimeFormat(){
        return {
          resolvedOptions: function resolvedOptions(){
            return {
              timeZone: aTimezone
            }
          }
        }
      }
    }
  }
  else {
    t.plan(1)
  }

  t.equal(
    lib.internals.getFromIntl()
    , aTimezone
    , 'returns a string if Intl is defined'
  )

  if (!Intl) delete global.Intl
})

test('#internals.getFromMoment', function getFromMomentTest(t){
  t.plan(1)

  var getCurrentOffset = sinon.stub(lib.internals, 'getCurrentOffset').returns(640)

  t.deepEqual(
    lib.internals.getFromMoment()
    , ['Pacific/Kiritimati']
    , 'gets an array of timezones from a zone file based on the offset'
  )

  getCurrentOffset.restore()
})

test('#internals.getCurrentOffset', function getCurrentOffsetTest(t){
  t.plan(1)

  t.equal(
    typeof lib.internals.getCurrentOffset()
    , 'number'
    , 'returns a number if no date is passed'
  )
})

test('#internals.whitelistMoment', function whitelistMomentTest(t){
  var tzs = ['America/Los_Angeles', 'PST', 'Pacific']
  t.plan(2)

  lib.unsetWhitelist()

  t.equal(
    lib.internals.whiteListMoment(tzs)
    , tzs[0]
    , 'returns the first timezone if no whitelist is defined'
  )

  lib.setWhitelist(['PST'])
  t.equal(
    lib.internals.whiteListMoment(tzs)
    , tzs[1]
    , 'returns the first whitelisted timezone if a whitelist is defined'
  )
})
