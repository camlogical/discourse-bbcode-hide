import { registerOption } from 'pretty-text/pretty-text';

registerOption((siteSettings, opts) => {
  opts.features["bbcode-hide"] = true;
});

function replaceHide(text) {
  text = text || "";
  while (text !== (text = text.replace(/\[hide=([^\]]+)\]((?:(?!\[hide=[^\]]+\]|\[\/hide\])[\S\s])*)\[\/hide\]/ig, function (match, p1, p2) {
    return `<div class='hide ${p1}'>${p2}</div>`;
  })));
  return text;
}

export function setup(helper) {
  helper.whiteList([
    'div[class]'
  ]);

  if (helper.markdownIt) {
    helper.registerPlugin(md => {
      const ruler = md.block.bbcode.ruler;

      ruler.push("hide", {
        tag: "hide",
        wrap: function(token, endToken, tagInfo) {
          token.type = "div_open";
          token.tag = "div";
          token.attrs = [
            ["class", "hide " + tagInfo.attrs['_default']]
          ];
          token.content = "";
          token.nesting = 1;

          endToken.type = "div_close";
          endToken.tag = "div";
          endToken.nesting = -1;
          endToken.content = "";
        }
      });

  helper.addPreProcessor(text => replaceHide(text));
}
