import { useRoute } from "vue-router";
import { computed } from "vue";

export function useBreadcrumb() {
  const route = useRoute();

  // Creamos una propiedad computada para acceder a las rutas de los breadcrumbs
  const breadcrumbItems = computed(() => {
    // Aquí mapearás las rutas y devolverás el breadcrumb que tiene la metadata 'breadcrumb'
    return route.matched.map((routeRecord) => ({
      name: routeRecord.meta.breadcrumb || routeRecord.name, // Usa el breadcrumb si existe, si no el nombre de la ruta
      href: routeRecord.path, // Aquí tomas la ruta para construir el enlace
    }));
  });

  return { breadcrumbItems };
}
