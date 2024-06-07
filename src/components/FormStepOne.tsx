import { Button, Flex, FormControl } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormMultStepDTO, GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";
import { Input } from "./Input";



export default function FormStepOne () {
  const {setForm, setFormSteps, form, formSteps} = useContext(GlobalContext)
  const SignInSchema = yup.object().shape({
    username: yup.string().required("Campo Obrigatório"),
    password: yup.string().required("Senha Obrigatória"),
    mail:  yup.string().required("E-mail Obrigatória").email(),

  });

  const {register, reset, handleSubmit, formState: { errors }} = useForm(
    {resolver: yupResolver(SignInSchema)  }
  )

  const handleSubmitForm: SubmitHandler<any> = async (
    values: FormMultStepDTO
  ) => {
    const data = {
      username: values.username,
      password: values.password,
      mail:  values.mail,
    };
    setForm({...form, username: data.username, password: data.password, mail: data.mail })
    setFormSteps(formSteps +1)

    reset()
 
    }

  return (
    <FormControl as="form" onSubmit={handleSubmit(handleSubmitForm)}>
    <Flex direction="column" align="center" justify="center">
        <Input error={errors.username} {...register("username")} name="username" label="Nome de usuário"/>
        <Input error={errors.password}  {...register("password")} name="password" label="Senha" type="password"/>
        <Input error={errors.mail}  {...register("mail")} name="mail" label="E-mail" type="email" />

        <Button mt="4" colorScheme="linkedin" type="submit" >Salvar</Button>
    </Flex>
    </FormControl>
  )
}