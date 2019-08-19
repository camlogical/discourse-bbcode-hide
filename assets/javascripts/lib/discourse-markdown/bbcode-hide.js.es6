import { registerOption } from "pretty-text/pretty-text";

registerOption(
  (siteSettings, opts) => (opts.features["bbcode-hide"] = true)
);

function wrap(tag, attr, callback) {
  return function(startToken, finishToken, tagInfo) {
    startToken.tag = finishToken.tag = tag;
    startToken.content = finishToken.content = "";

    startToken.type = "bbcode_open";
    finishToken.type = "bbcode_close";

    startToken.nesting = 1;
    finishToken.nesting = -1;

    startToken.attrs = [
      [attr, callback ? callback(tagInfo) : tagInfo.attrs._default]
    ];
  };
}

function setupMarkdownIt(md) {
  const ruler = md.inline.bbcode.ruler;

  ruler.push("hideto", {
    tag: "hideto",
    wrap: "div.hideto"
  });
}

export function setup(helper) {
  helper.whiteList([
    "div.hideto"
  ]);

  helper.whiteList({
    custom(tag, name, value) {
      if (tag === "div" && name === "class") {
        return /^hideto ?[a-zA-Z0-9]+$/.exec(value);
      }

      if (tag === "span" && name === "class") {
        return /^hideto $/.exec(value);
      }
    }
  });

  if (helper.markdownIt) {
    helper.registerPlugin(setupMarkdownIt);
    return;
  }
  replaceBBCode("hideto", contents =>
    ["div", { class: "hideto guest" }].concat(contents)
  );
}
