(function() {
    function HideContent(text) {
  text = text || "";
  while (
    text !==
    (text = text.replace(
      /\[hideto=([^\]]+)\]((?:(?!\[hideto=[^\]]+\]|\[\/hideto\])[\S\s])*)\[\/hideto\]/gi,
      function(match, p1, p2) {
        return `<div class='hideto ${p1}'>${p2}</div>`;
      }
    ))
  );
  return text;
}
    Discourse.Dialect.addPreProcessor(HideContent);
    Discourse.Markdown.whiteListTag('div', 'class', '*');
})();
