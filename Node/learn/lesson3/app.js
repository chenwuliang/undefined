var cheerio = require('cheerio');
var superagent = require('superagent');
var fs = require('fs')


superagent.get('https://cnodejs.org/')
  .end(function (err, sres) {
    if (err) {
      return next(err);
    }
    var $ = cheerio.load(sres.text);
    var items = [];
    $('#topic_list .topic_title').each(function (idx, element) {
      var $element = $(element);
      items.push({
        title: $element.attr('title'),
        href: $element.attr('href'),
        idx: idx
      });
    });
    writeFile("cnode.json", JSON.stringify(items))
    writeFile("cnode.html", sres.text)
  });

function writeFile(filename, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, (err, ...args) => {
      // reject(new Error("test"))
      if (err) {
        reject(err)
      }
      else resolve(...args)
    })
  })
  .then(() => {
    console.log(filename + " done.")
  })
  .catch(err => {
    console.log("发生错误" + filename, err)
  })
}

