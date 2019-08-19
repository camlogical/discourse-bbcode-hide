function ContentHide(state, silent) {
   // standard markdown it inline extension goes here.
  md.block.bbcode.ruler.push('money', {
   tag: 'money',
   wrap: function(token, tagInfo) {
      token.attrs = [['data-money', tagInfo.attrs['_default']]];
   }
  });
}

export function setup(helper) {
  if(!helper.markdownIt) { return; }
  helper.registerOptions((opts,siteSettings)=>{
      opts.features.['bbcode-hide'] = !!siteSettings.bbcode_hide_enabled;
   });
  helper.whiteList(['div[class]']);
  helper.whiteList(['div.hideto', 'div.guest', 'div.hideto.guest']);

  helper.registerPlugin( md => {
    md.block.bbcode.ruler.push("hideto", ContentHide);
  });
}
