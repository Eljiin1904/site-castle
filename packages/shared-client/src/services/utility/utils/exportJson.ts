import saveAs from "file-saver";

export function exportJson(fileName: string, data: any) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "text/plain;charset=utf-8" });

  saveAs(blob, `${fileName}.json`);
}
