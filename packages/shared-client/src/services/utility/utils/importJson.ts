export function importJson<T>() {
  return new Promise<T | undefined>((resolve, reject) => {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = ".json";

    input.oncancel = (e) => {
      resolve(undefined);
    };

    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;

      if (target.files != null && target.files.length > 0) {
        const file = target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          const json = e.target?.result as string;

          if (!json) {
            reject(new Error("File is not a valid JSON."));
          } else {
            const data = JSON.parse(json);
            resolve(data as T);
          }
        };

        reader.readAsText(file, "UTF-8");
      }
    };

    input.click();
  });
}
