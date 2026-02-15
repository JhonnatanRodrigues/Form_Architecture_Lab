import { useState } from "react";
import "./styles/global.css";
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Form } from './components/forms/index';


const createUserFormSchema = z.object({
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
    knowledge: z.coerce.number()
      .min(1, 'O mínimo é 1.')
      .max(100, 'O máximo é 100.')
  })).min(2, 'Insira pelo menos 2 tecnologias')
})


function App() {
  const [ output, setOutput ] = useState<string>('');

  const createUseForm = useForm({
    resolver: zodResolver(createUserFormSchema)
  });

  const { 
    handleSubmit,
    formState: {errors, isSubmitted},
    control
  } = createUseForm;

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'techs'
  })

  function createUser(data: any){
    setOutput(JSON.stringify(data, null, 3))
  }

  function addNewTech(){
    append({title: "", knowledge: 0})
  }

  function removeTech(index: number){
    remove(index)
  }


  return (
    <main className="h-screen bg-zinc-50 flex flex-col gap-2 items-center justify-center">
      <FormProvider {...createUseForm}>
        <form onSubmit={handleSubmit(createUser)} className="flex flex-col gap-4 w-full max-w-xs">

          <Form.Field>
            <Form.Label htmlFor="name">Nome</Form.Label>
            <Form.Input 
              name="name"
              required={errors.name && isSubmitted}
            />
            <Form.ErrorMessage field="name"/>
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="email">E-mail</Form.Label>
            <Form.Input
              type="email"
              name="email"
              required={errors.email && isSubmitted}
            />
            <Form.ErrorMessage field="email"/>
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="password">Senha</Form.Label>
            <Form.Input
              type="password"
              name="password"
              required={errors.password && isSubmitted}
            />
            <Form.ErrorMessage field="password"/>
          </Form.Field>

          <Form.Field>
            <Form.Label className="flex items-center justify-between">
              Tecnologias

              <button 
                type="button"
                className="text-emerald-600 text-sm font-semibold cursor-pointer transition duration-300 ease-in-out 
                              hover:scale-110 
                              active:scale-100"
                onClick={addNewTech}
              >
                Adicionar
              </button>
            </Form.Label>

            {
              fields.map((field, index) => {
                const fieldTitleName = `techs.${index}.title`
                const fieldKnowledgeName = `techs.${index}.knowledge`

                return (
                  <Form.Field key={field.id} className="flex gap-2 justify-center items-center">
                    <Form.Field>
                      <Form.Input type="text" name={fieldTitleName}/>
                      <Form.ErrorMessage field={fieldTitleName} />
                    </Form.Field>

                    <Form.Field>
                      <Form.Input 
                        type="number" 
                        name={fieldKnowledgeName}
                        className="w-17.5"
                      />
                      <Form.ErrorMessage field={fieldKnowledgeName} />
                    </Form.Field>

                    <button 
                      type="button"
                      className="flex text-red-600 text-sm font-semibold cursor-pointer transition duration-300 ease-in-out h-6.25 w-6.25 rounded-full items-center justify-center
                                    hover:scale-120 hover:bg-red-500 hover:text-zinc-50
                                    active:scale-100"
                      onClick={() => {removeTech(index)}}
                    >
                      <RiDeleteBin6Fill size={15} />
                    </button>

                  </Form.Field>
                )
              })
            }
            
            <Form.ErrorMessage field="techs" />
          </Form.Field>
          
          <button 
            type="submit"
            className="bg-emerald-500 rounded font-semibold text-white h-10 
                        hover:bg-emerald-600 cursor-pointer"
          >
            Salvar
          </button>
        </form>
      </FormProvider>

      <pre className="">
        {output}
      </pre>
    </main>
  )
}

export default App
