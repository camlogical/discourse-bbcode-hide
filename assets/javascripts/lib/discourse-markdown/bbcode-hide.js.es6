import { registerOption } from "pretty-text/pretty-text";

registerOption((siteSettings, opts) => {
  opts.features["bbcode-hideto"] = true;
});

function ContentHide(state, silent) {
   // standard markdown it inline extension goes here.
  md.block.bbcode.ruler.push('hideto', {
     tag: 'hideto',
     wrap: function(token, tagInfo) {
        token.attrs = [['class', 'hideto '+ tagInfo.attrs['_default']]];
        return true;
     }
  });
   return false;
}

export function setup(helper) {
  if(!helper.markdownIt) { return; }
  helper.whiteList(['div[class]']);
  helper.whiteList(['div.hideto', 'div.guest', 'div.hideto.guest']);

  helper.registerPlugin( md => {
    md.inline.push('hideto', ContentHide);
  });
}
