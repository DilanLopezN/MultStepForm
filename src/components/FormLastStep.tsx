import { Button, Flex, FormControl, Toast, useToast } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormMultStepDTO, GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";
import { Input } from "./Input";



export default function FormLastStep () {
  const toast = useToast()
  const {setForm, form, storageForm} = useContext(GlobalContext)
  const SignInSchema = yup.object().shape({
    sex: yup.string().required("Sexo Obrigatório"),
    age: yup.string().required("Idade Obrigatória"),
  
  });

  const {register, reset, handleSubmit, formState: { errors }} = useForm(
    {resolver: yupResolver(SignInSchema)  }
  )

  const handleSubmitForm: SubmitHandler<any> = async (
    values: FormMultStepDTO
  ) => {
    const data = {
      age: values.age,
      sex: values.sex,

    };
    setForm({...form, age: data.age, sex: data.sex, })
    
    try {

      const data = {
        ...storageForm,
        age: Number(storageForm.age)
      }

      console.log(data)

      toast({
        title: 'Fórmulario enviado.',
        description: "Seu fórmulario foi enviado com successo",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })

      // USAR AXIOS
      await fetch('/rota-da-sua-api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' // Tipo de conteúdo do corpo da requisição
          },
          body: JSON.stringify(data)
      })

    
    } catch (error) {
      toast({
        title: 'Falha ao enviar fórmulario.',
        description: "Consulte os campos de envio",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
 
    }

  return (
    <FormControl as="form" onSubmit={handleSubmit(handleSubmitForm)}>
    <Flex direction="column" align="center" justify="center">
    <Input error={errors.sex} {...register("sex")} name="sex" label="Sexo"/>
            <Input error={errors.age}  {...register("age")} name="age" label="Idade" type="number" />
        
        <Button mt="4" colorScheme="linkedin" type="submit" >Enviar</Button>
    </Flex>
    </FormControl>
  )
}