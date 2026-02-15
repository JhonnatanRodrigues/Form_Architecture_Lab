import z from "zod"

export const createUserFormSchema = z.object({
  name: z.string()
    .nonempty("O nome é obrigatório")
    .transform(value => {
      return value.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      }).join(' ')
    }),
  email: z.string()
    .nonempty("O e-mail é obrigatório!")
    .endsWith("@yellow.com", {
      error: "Formato do email inválido. (exemplo@yellow.com)"
    }),
  password: z.string()
    .min(6, 'A senha precisa de no minimo 6 caracteres'),
  techs: z.array(z.object({
    title: z.string().nonempty('O titulo é obrigatório.'),
    knowledge: z.number()
      .min(1, 'O mínimo é 1.')
      .max(100, 'O máximo é 100.')
  })).min(2, 'Insira pelo menos 2 tecnologias')
})

export type CreateUserFormData = z.infer<typeof createUserFormSchema>;