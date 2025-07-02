import "tldraw/tldraw.css";
import Canvas from "./components/canvas";
import { ThemeProvider } from "@/components/theme-provider";

export default function App() {
  const roomId = Math.floor(Date.now() / (5 * 60 * 1000)).toFixed(0);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div>
        <Canvas roomId={roomId} />
      </div>
    </ThemeProvider>
  );
}
