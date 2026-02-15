import "./styles/global.css";
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Form } from '../../components/forms/index';
import { createUserFormSchema, type CreateUserFormData } from "./schema";
import { useCreateUser } from './useCreateUser';


function UserForm() {
  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      techs: []
    }
  });

  const createUser = useCreateUser().execute;

  const { 
    handleSubmit,
    formState: {errors, isSubmitted},
    control
  } = form;

  const {
    fields: fieldsTech, 
    append: appendTech, 
    remove: removeTech
    } = useFieldArray({
    control,
    name: 'techs'
  })

  function addNewTech(){
    appendTech({title: "", knowledge: 0})
  }


  return (
    <FormProvider {...form}>
        <form onSubmit={handleSubmit(createUser)} className="flex flex-col gap-4 w-full max-w-xs">

            <Form.Field>
                <Form.Label htmlFor="name">Nome</Form.Label>
                <Form.Input 
                    type="text"
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
                    fieldsTech.map((field, index) => {
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
  )
}

export default UserForm
