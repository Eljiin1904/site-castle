import { useMount } from "@client/hooks/system/useMount";

export function useConsoleWarning() {
  useMount(() => {
    console.log(
      `%c` + `Stop!`,

      `color:red; font-size:40px; font-weight:bold;`,
    );
    console.log(
      `%c` +
        `This is a browser feature intended for developers. ` +
        `If someone told you to copy and paste something here to enable a feature or "hack", ` +
        `it is a scam and will give them access to your account.`,

      `font-size:14px; font-weight:bold;`,
    );
  });

  return null;
}
