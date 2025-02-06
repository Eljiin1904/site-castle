import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounceCallback } from "usehooks-ts";
import { useErrorToast } from "@client/hooks/toasts/useErrorToast";
import { Chat } from "#app/services/chat";

export function useUsernames(text: string) {
  const [input, setInput] = useState(text);

  const debounced = useDebounceCallback(setInput, 500);

  useEffect(() => debounced(text), [text]);

  const query = useQuery({
    queryKey: [input],
    queryFn: async () => {
      const mentions = Chat.parseMentions(input);

      if (mentions.length === 0) {
        return { usernames: [] };
      }

      const searchText = mentions[mentions.length - 1];

      const res = await Chat.getUsernames({
        searchText,
        limit: 6,
      });

      return res;
    },
    placeholderData: (prev) => prev,
  });

  useErrorToast(query.error);

  const usernames = query.data?.usernames || [];

  return usernames;
}
