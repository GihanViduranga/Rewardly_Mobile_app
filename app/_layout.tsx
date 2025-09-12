import { Slot, Stack } from "expo-router";
import "./../global.css"
import { LoaderProvider } from "@/context/LoaderContext";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout() {
  return (
    <LoaderProvider>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </LoaderProvider>
  );
}