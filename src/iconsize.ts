const style = document.getElementById("icon_size_style")!;

function setIconSize(size: string) {
  style.innerHTML = `:root { --icon_preview_size: ${size} !important; }`;
}

export function setupIconSize() {
  const defaultTheme = localStorage.getItem("icon_size") ?? "10rem";

  setIconSize(
    defaultTheme,
  );

  window.addEventListener("load", () => {
    const defaultInput = document.querySelector(
      `input[value="${defaultTheme}"][name="icon_size"]`,
    ) as
      | HTMLInputElement
      | null;

    if (defaultInput) defaultInput.checked = true;

    const fieldset = document.getElementById("icon_size_field")!;

    fieldset.addEventListener("change", (e) => {
      if (!(e.target instanceof HTMLInputElement)) return;
      const value = e.target.value;
      console.log(value);
      setIconSize(value);
      localStorage.setItem("icon_size", value);
    });
  });
}
