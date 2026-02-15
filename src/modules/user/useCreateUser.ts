import type { CreateUserFormData } from "./schema";

export function useCreateUser() {

  async function execute(data: CreateUserFormData) {
    // Aqui seria chamada real de API
    // await api.post("/users", data)

    console.log("Enviando para backend: ", JSON.stringify(data, null, 3));

    return { success: true };
  }

  return { execute };
}