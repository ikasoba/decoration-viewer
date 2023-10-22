const themes = {
  "light": {
    "--bg-color": "#f9f9f9",
    "--fg-color": "#676767",
    "--accent-color": "rgb(134, 179, 0)",
    "--button-bg": "var(--accent-color)",
    "--button-fg": "white",
  },
  "dark": {
    "--bg-color": "#232323",
    "--fg-color": "rgb(199, 209, 216)",
    "--accent-color": "rgb(134, 179, 0)",
    "--button-bg": "var(--accent-color)",
    "--button-fg": "white",
  },
};

const keyof = <O extends {}>(value: any, obj: O): value is keyof O =>
  value in obj;

const style = document.getElementById("bg_color_style")!;

export const setBgColor = (name: keyof typeof themes) => {
  const theme = themes[name];

  style.innerHTML = `:root { ${
    Object.entries(theme).map((entry) => entry.join(":")).join(";")
  } }`;
};

export function bgColor() {
  const fieldset = document.getElementById("bg_color_field")!;

  fieldset.addEventListener("change", (e) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    const value = e.target.value;
    if (!keyof(value, themes)) return;

    setBgColor(value);
  });
}
