import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { uniqueId, type TLUserPreferences } from "tldraw";
import { z } from "zod";
import { USER_COLORS } from "../constants/user-colors";

const formSchema = z.object({
  username: z
    .string()
    .min(2, "Mínimo 2 caracteres")
    .max(15, "Máximo 15 caracteres")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Solo se permiten letras, números y guiones bajos"
    ),
});

export default function UsernameForm({
  setUserPreferences,
  show = true,
}: {
  setUserPreferences: (prefs: TLUserPreferences) => void;
  show?: boolean;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const username = values.username.trim();
    setUserPreferences({
      id: uniqueId(),
      name: username,
      colorScheme: "system",
      locale: window.navigator.language.split("-")[0],
      color: `#${USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)]}`,
    });
  }

  return (
    <div
      className={`transition-all z-50 fixed top-0 left-0 w-screen h-screen p-4 backdrop-blur flex items-center justify-center ${
        !show ? "scale-0" : "scale-100"
      }`}
    >
      <Card>
        <CardHeader>
          <CardTitle>Ingresar a la sala</CardTitle>
          <CardDescription>
            Elige un nombre de usuario para mostrar a los demás dentro de la
            sala.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Edgar" {...field} />
                    </FormControl>
                    <FormDescription>
                      Este es tu nombre de usuario dentro de la sala.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full cursor-pointer">
                Entrar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
