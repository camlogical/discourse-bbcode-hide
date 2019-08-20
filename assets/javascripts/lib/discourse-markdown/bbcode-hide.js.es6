import { registerOption } from "pretty-text/pretty-text";

registerOption((siteSettings, opts) => {
  opts.features["bbcode-hideto"] = true;
});

function HideContent(state, silent) {
   // standard markdown it inline extension goes here.
  md.block.bbcode.ruler.push('hideto', {
   tag: 'hideto',
   wrap: function(token, tagInfo) {
      token.attrs = [['class', 'hideto ' +tagInfo.attrs['_default']]];
      return true;
   }
});
   return false;
}


export function setup(helper) {
  if(!helper.markdownIt) { return; }
  helper.whiteList({
    custom(tag, name, value) {
      if (tag === "div" && name === "class") {
        return /^hideto ?[a-zA-Z0-9]+$/.exec(value);
      }
    }
  });
helper.registerPlugin(md=>{
      md.inline.push('hideto', HideContent);
   });
  
}
