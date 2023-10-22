import twemoji from "https://esm.run/twemoji@14.0.2";
import emojis from "./assets/emojis.json" assert { type: "json" };

const dummyImage =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const h = (
  name: string,
  attr: Record<string, any>,
  ...children: (Node | string)[]
) => {
  const e = document.createElement(name);

  for (const k in attr) {
    if (k.startsWith("on")) {
      const ev = k.slice(2).replace(/^./, (x) => x.toLowerCase());

      e.addEventListener(ev, attr[ev]);
    }

    e.setAttribute(k, attr[k]);
  }

  e.append(...children);

  return e;
};

function replaceChildren(node: Node, ...children: Node[]) {
  while (node.childNodes.length) {
    const child = node.childNodes[0];
    node.removeChild(child);
  }

  for (const newChild of children) {
    node.appendChild(newChild);
  }
}

function Preview(icon: string, decoration: string) {
  return (
    h(
      "div",
      { class: "icon_preview_wrapper" },
      h("img", { src: icon, class: "icon" }),
      h("img", { src: decoration, class: "decoration" }),
    )
  );
}

function dummyIconURL() {
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];

  return `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${
    twemoji.convert.toCodePoint(emoji, "-")
  }.svg`;
}

function main() {
  const iconImageElm = <HTMLInputElement> document.getElementById(
    "icon_image",
  )!;
  const decorationImageElm = <HTMLInputElement> document.getElementById(
    "decoration_image",
  )!;
  const redrawButton = <HTMLButtonElement> document.getElementById(
    "redraw_button",
  )!;

  const drawPreview = () => {
    const iconFile = iconImageElm.files![0];
    const decorationFile = decorationImageElm.files![0];

    const iconImage = iconFile ? URL.createObjectURL(iconFile) : dummyIconURL();
    const decorationImage = decorationFile
      ? URL.createObjectURL(decorationFile)
      : dummyImage;

    replaceChildren(
      document.getElementById("preview")!,
      Preview(iconImage, decorationImage),
    );
  };

  iconImageElm.addEventListener("change", drawPreview);
  decorationImageElm.addEventListener("change", drawPreview);
  redrawButton.addEventListener("click", drawPreview);

  drawPreview();
}

window.addEventListener("load", () => {
  main();
});
