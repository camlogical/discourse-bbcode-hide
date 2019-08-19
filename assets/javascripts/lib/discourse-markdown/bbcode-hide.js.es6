function ContentHide(state, silent) {
   // standard markdown it inline extension goes here.
    md.block.bbcode.ruler.push('hideto', {
      tag: 'hideto',
      wrap: function(token, tagInfo) {
         token.attrs = [['class','hideto '+ tagInfo.attrs['_default']]];
         return true;
      }
   });
}

export function setup(helper) {
  if(!helper.markdownIt) { return; }
  helper.registerOptions((opts,siteSettings)=>{
      opts.features.bbcode_hide = !!siteSettings.bbcode_hide_enabled;
   });
  helper.whiteList(['div[class]']);
  helper.whiteList(['div.hideto', 'div.guest', 'div.hideto.guest']);
  helper.whiteList({
    custom(tag, name, value) {
      if (tag === "div" && name === "class") {
        return /^hideto ?[a-zA-Z0-9]+$/.exec(value);
      }
    }
  });

  helper.registerPlugin( md => {
    md.block.push("hideto", ContentHide);
  });
}
