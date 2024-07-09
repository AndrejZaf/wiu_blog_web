import { ChangeEvent } from "react";

export async function getImageData(
  event: ChangeEvent<HTMLInputElement>,
  callback: (result: string | ArrayBuffer | null) => void
) {
  const reader = new FileReader();
  reader.onload = () => {
    callback("");
    callback(reader.result);
  };
  reader.onerror = () => {
    callback("");
    return;
  };
  reader.readAsDataURL(event.target.files![0]);
}
