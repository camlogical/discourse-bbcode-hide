function ContentHide(state, silent) {
   // standard markdown it inline extension goes here.
  md.block.bbcode.ruler.push('hideto', {
    tag: 'hideto',
    before: function(state, tagInfo, token) {
        state.push('div_open', 'div', 1);
       token.attrs.push = ([['class', tagInfo.attrs['_default']]]);
    },
    after: function(state) {
        state.push('div_close', 'div', -1);
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
