function ContentHide(state, silent) {
   // standard markdown it inline extension goes here.
    md.block.bbcode.ruler.push('hideto', {
      tag: 'hideto',
      wrap: function(token, tagInfo) {
         token.attrs = [['class', tagInfo.attrs['_default']]];
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

  helper.registerPlugin( md => {
    md.block.bbcode.ruler.push("hideto", ContentHide);
  });
}
