import { useTheme } from "@/shared/hooks/useTheme";
import { QueryProvider, RouterProvider } from "@/app/providers";
import { Toaster } from "@/shared/components/ui/sonner";

export default function App() {
  useTheme();


  return (
    <QueryProvider>
      <RouterProvider />
      <Toaster position="top-right" richColors closeButton />
    </QueryProvider>
  );
}
