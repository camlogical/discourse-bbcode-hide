import { registerOption } from "pretty-text/pretty-text";

registerOption((siteSettings, opts) => {
  opts.features["bbcode-hide"] = true;
});

function replaceContentHide(text) {
  text = text || "";
  while (
    text !==
    (text = text.replace(
      /\[hide=([^\]]+)\]((?:(?!\[hide=[^\]]+\]|\[\/hide\])[\S\s])*)\[\/hide\]/gi,
      function(match, p1, p2) {
        return `<div class='hide ${p1}'>${p2}</div>`;
      }
    ))
  );
  return text;
}

export function setup(helper) {
  helper.whiteList({
    custom(tag, name, value) {
      if (tag === "div" && name === "class") {
        return "hide" +/^?[a-zA-Z0-9]+$/.exec(value);
      }
    }
  });

  if (helper.markdownIt) {
    helper.registerPlugin(md => {
      const ruler = md.inline.bbcode.ruler;

      ruler.push("hide", {
        tag: "hide",
        wrap: function(token, endToken, tagInfo) {
          token.type = "div_open";
          token.tag = "div";
          token.attrs = [["hide", "hide" + tagInfo.attrs._default]];
          token.content = "";
          token.nesting = 1;

          endToken.type = "div_close";
          endToken.tag = "div";
          endToken.nesting = -1;
          endToken.content = "";
        }
      });
    });
  } else {
    helper.addPreProcessor(text => replaceContentHide(text));
  }
}
