var __ = require('underscore');
var s = require('underscore.string');
var sprintf = require('sprintf-js').sprintf;
var request = require('request');
var cheerio = require('cheerio');
var htt = require('html-to-text');
var clc = require('cli-color');

var url = '...';

var self = this;

// ---

self.get = function() {
  request(url, function(err, res, body) {
    
    var $ = cheerio.load(body);
    var html = $('div.app').html();
    var data  = htt.fromString(html);

    self.parse(data);    
  });
};

//---

self.parse = function(data) {
  var resList = [];
  var lineList = s.lines(data);

  lineList = __.filter(lineList, function(element) { 
    // filter blank lines
    return !s.isBlank(element);
  });

  lineList.splice(0, 2); // delete first two

  var year = 2016;
  var month, date, weight;

  __.each(lineList, function(element, index, list) {
    if (s.startsWith(element, '##')) {
      month = Number.parseInt(element.split(' ')[1].charAt(0));
    }
    else {
      date = Number.parseInt(element.substring(0, 2));
      weight = Number.parseFloat(element.split(' ')[2]);

      resList.push({
        year: year,
        month: month,
        date: date,
        weight: weight
      });
    }
  });

  var maxLog = __.max(resList, function(log) { return log.weight; });
  var maxWeight = maxLog.weight;

  var relativeLogList = __.map(resList, function(value, index, list) {
    var newValue = JSON.parse(JSON.stringify(value));
    newValue.weight = value.weight - maxWeight;
    return newValue;
  });

  console.log('first kg: weight diff from max weight\n' +
    'second kg: weight diff from yesterday weight');

  var weightBefore = relativeLogList[0].weight;

  __.each(relativeLogList, function(e, index, list) {
    if (e.date === 1) {
      console.log('-----\n');
    }
    var weightDiff = e.weight - weightBefore;
    var md = sprintf('%+.2f kg', e.weight);
    var yd = sprintf('%+.2f kg', weightDiff);

    e.weight >= 0 ? md = clc.green(md) : md = clc.red(md);
    weightDiff >= 0 ? yd = clc.green(yd) : yd = clc.red(yd);
    var s = sprintf('%d/%02d/%02d ... %s ... %s', 
      e.year, e.month, e.date, md, yd);
    // var s = sprintf('%d/%02d/%02d ... %.2f kg /// %s ... %s', 
    // e.year, e.month, e.date, resList[index].weight, md, yd);
    
    console.log(s);
    weightBefore = e.weight;
  });
};

self.get();