import { registerOption } from "pretty-text/pretty-text";

registerOption((siteSettings, opts) => {
  opts.features["bbcode-hideto"] = true;
});

const ContentHide = {
  tag: 'hideto',
  before: function(state, tagInfo) {
    let token = state.push('div_open', 'div', 1);
    token.attrs = [];
    token.attrs.push(['class','hideto']);
  },
  after: function(state) {
    state.push('div_close', 'div', -1);
  }
};

export function setup(helper) {
  if(!helper.markdownIt) { return; }
  helper.whiteList(['div[class]']);
  helper.whiteList(['div.hideto', 'div.guest', 'div.hideto.guest']);

  helper.registerPlugin( md => {
    md.block.bbcode.ruler.push("hideto", ContentHide);
  });
}
