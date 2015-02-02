'use strict'

// a blend of picking things out of moment-timezone and
// https://bitbucket.org/pellepim/jstimezonedetect
// we really could just use that script, but it's got it's own olson db backed in
// which makes it _HUGE_, we already have moment on the page, so let's use that,
// albeit in a stupider way. This is just a guess that we expect the user to
// correct, so… meh.

var _ = require('lodash')
  , moment = require('moment-timezone')
  , zones = _.values(require('moment-timezone').tz._zones)
  , internals = {
    whitelist: []
    , defaultTimezoneWhiteList: [
      'America/New_York'
      , 'America/Los_Angeles'
      , 'America/Chicago'
      , 'America/Denver'
      , 'America/Anchorage'
      , 'Pacific/Honolulu'
    ]
  }

internals.getCurrentOffset = function getCurrentOffset(date){
  date || (date = new Date())
  var offset = date.getTimezoneOffset()
  // if in DST, add back the 60 minutes that we lost
  return moment(date).isDST() ? offset + 60 : offset
}

internals.whiteListMoment = function whiteListMoment(timezoneNames){
  if (!internals.whitelist.length) return _.first(timezoneNames)

  return _.find(internals.whitelist, function findWhiteListedTimezone(timezoneName){
    if (timezoneNames.indexOf(timezoneName) > -1) return timezoneName
  })
}

internals.getFromMoment = function getFromMoment(date){
  return zones.reduce(function reduceTZData(out, zone){
    if (zone.offsets.indexOf(internals.getCurrentOffset(date)) > -1)
      out.push(zone.name)
    return out
  }, [])
}

internals.getFromIntl = function getFromIntl(){
  var format

  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
    return
  }

  format = Intl.DateTimeFormat()
  if (typeof format === 'undefined' || typeof format.resolvedOptions === 'undefined') {
    return
  }

  return format.resolvedOptions().timeZone
}

exports.setWhitelist = function setWhitelist(whitelist){
  if (_.isUndefined(whitelist)) {
    internals.whitelist = internals.defaultTimezoneWhiteList
    return
  }
  if (!_.isArray(whitelist)) throw new Error('whitelist must be an array')
  internals.whitelist = _(whitelist).compact().uniq().value()
}

exports.unsetWhitelist = function unsetWhitelist(){
  internals.whitelist = []
}

exports.calc = function calc(date){
  date || (date = new Date())
  return internals.getFromIntl() || internals.whiteListMoment(internals.getFromMoment(date))
}

// export internals for testing
exports.internals = internals
