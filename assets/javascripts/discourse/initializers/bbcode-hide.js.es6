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
  md.block.bbcode.ruler.push('hide', {
	   tag: 'hide',
	   wrap: function(token, tagInfo) {
	      token.attrs = [['class', "hide " + tagInfo.attrs['_default']]];
	      return true;
	   }
	});
  }
  else {
  	helper.addPreProcessor(text => replaceHide(text));
	}
}
