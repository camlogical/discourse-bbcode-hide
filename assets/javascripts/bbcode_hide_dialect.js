(function() {
  function replaceFontBgColor (text) {
      while (text !== (text = text.replace(/\[hide=([^\]]+)\]((?:(?!\[hide=[^\]]+\]|\[\/hide\])[\S\s])*)\[\/hide\]/ig, function (match, p1, p2) {
        return "<div class='hide " + p1 + "'>" + p2 + "</div>";
      })));
      return text;
    }
    Discourse.Dialect.addPreProcessor(replaceContentHide);
    Discourse.Markdown.whiteListTag('div', 'class', /^hide .*$/i);
})();
