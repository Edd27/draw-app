import { useSyncDemo } from "@tldraw/sync";
import { useState } from "react";
import {
  Tldraw,
  uniqueId,
  useTldrawUser,
  type TLUserPreferences,
} from "tldraw";
import UsernameForm from "./username-form";
import { USER_COLORS } from "../constants/user-colors";

interface Props {
  roomId: string;
}

export default function Canvas({ roomId }: Props) {
  const [userPreferences, setUserPreferences] = useState<TLUserPreferences>({
    id: uniqueId(),
    name: "",
    colorScheme: "system",
    locale: window.navigator.language.split("-")[0],
    color: `#${USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)]}`,
  });

  const store = useSyncDemo({
    roomId: `room-${roomId}`,
    userInfo: userPreferences,
  });

  const user = useTldrawUser({ userPreferences, setUserPreferences });

  return (
    <div className="h-screen w-screen">
      <UsernameForm
        setUserPreferences={setUserPreferences}
        show={!userPreferences.name}
      />
      <div style={{ position: "fixed", inset: 0 }}>
        <Tldraw store={store} user={user} deepLinks />
      </div>
    </div>
  );
}
