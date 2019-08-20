import { registerOption } from "pretty-text/pretty-text";

registerOption((siteSettings, opts) => {
  opts.features["bbcode-hideto"] = true;
});

function HideContent() {
   // standard markdown it inline extension goes here.
  md.block.bbcode.ruler.push('hideto', {
   tag: 'hideto',
   wrap: function(token, tagInfo) {
      token.attrs = [['class', 'hideto ' +tagInfo.attrs['_default']]];
   }
  });
}


export function setup(helper) {
  if(!helper.markdownIt) { return; }
  helper.whiteList(
    ['div.hideto', 'div.guest']
  });
  helper.whiteList(['div[class]']);
  helper.registerPlugin(md=>{
      md.inline.push('hideto', HideContent);
   });
}
