<script setup lang="ts">
import { ref, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "vue-sonner";

const router = useRouter();
const authStore = useAuthStore();

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const showPassword = ref(false);

// Formulario reactivo
const dni = ref("");
const password = ref("");
const errorMessage = ref<string | null>(null);

// Manejo de submit
const onSubmit = async () => {
  errorMessage.value = null;

  try {
    await authStore.login({ dni: dni.value, password: password.value });

    if (authStore.token) {
      // usar un timer para mostrar el toast
      toast.success("Sesión iniciada con éxito", {
        duration: 3000,
        position: "top-right",
      });
      setTimeout(() => {
        router.push("/dashboard");
      }, 4000);
    }
  } catch (err) {
    // Este bloque solo se activa si `login()` lanza un error
    toast.error("Error de conexión", {
      description: "Verifica tu conexión a internet",
      duration: 3000,
      position: "top-right",
    });
  }

  // Mostrar errores de validación si existen
  if (authStore.error) {
    const error = authStore.error;

    // Mostrar error general si existe
    const nonFieldError = error?.non_field_errors?.[0];
    if (nonFieldError) {
      toast.error("Error de validación", {
        description: nonFieldError,
        duration: 4000,
        position: "top-right",
      });
      return;
    }

    // Recolectar y mostrar errores por campo
    const descriptions: string[] = [];

    Object.entries(error).forEach(([field, messages]) => {
      if (Array.isArray(messages)) {
        messages.forEach((msg: string) => {
          descriptions.push(`${field.toUpperCase()}: ${msg}`);
        });
      }
    });

    if (descriptions.length > 0) {
      toast.error("Errores de validación", {
        description: descriptions.join("\n"),
        duration: 4000,
        position: "top-right",
      });
    }
  }
};
</script>

<template>
  <Toaster />
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card class="overflow-hidden p-0">
      <CardContent class="grid p-0 md:grid-cols-2">
        <form class="p-6 md:p-8">
          <div class="flex flex-col gap-6">
            <div class="flex flex-col items-center text-center">
              <h1 class="text-2xl font-bold">Bienvenido</h1>
              <p class="text-muted-foreground text-balance">
                Inicia sesión en tu cuenta para continuar
              </p>
            </div>

            <div class="grid gap-3">
              <Label for="dni">DNI</Label>
              <Input
                id="dni"
                type="text"
                placeholder="Ingresa tu DNI"
                v-model="dni"
                required
              />
            </div>

            <div class="grid gap-3">
              <Label for="password">Contraseña</Label>
              <div class="relative">
                <Input
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  v-model="password"
                  required
                  class="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  class="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  @click="showPassword = !showPassword"
                >
                  <component
                    :is="showPassword ? EyeOff : Eye"
                    class="h-4 w-4"
                  />
                </Button>
              </div>
              <div class="text-right">
                <a href="#" class="text-sm underline-offset-2 hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <Button
              type="button"
              class="w-full"
              :onclick="onSubmit"
              :disabled="authStore.isLoading"
            >
              Iniciar sesión
            </Button>

            <div
              class="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"
            ></div>

            <div class="text-center text-sm">
              ¿No tienes una cuenta?
              <a href="#" class="underline underline-offset-4"> Regístrate </a>
            </div>
          </div>
        </form>

        <div class="bg-muted relative hidden md:block">
          <img
            src="/img/login.jpg"
            alt="Imagen de inicio de sesión"
            class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </CardContent>
    </Card>

    <div
      class="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4"
    >
      Al continuar, aceptas nuestros
      <a href="#">Términos de servicio</a> y
      <a href="#">Política de privacidad</a>.
    </div>
  </div>
</template>
