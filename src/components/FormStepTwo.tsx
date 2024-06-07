import { Button, Flex, FormControl } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormMultStepDTO, GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";
import { Input } from "./Input";



export default function FormStepTwo () {
  const {setForm, setFormSteps, form, formSteps} = useContext(GlobalContext)
  const SignInSchema = yup.object().shape({
    adress: yup.string().required("Endereço Obrigatório"),
    cep: yup.string().required("Cep Obrigatório"),
    number:  yup.number().required("Número Obrigatório"),

  });

  const {register, reset, handleSubmit, formState: { errors }} = useForm(
    {resolver: yupResolver(SignInSchema)  }
  )

  const handleSubmitForm: SubmitHandler<any> = async (
    values: FormMultStepDTO
  ) => {
    const data = {
      adress: values.adress,
      cep: values.cep,
      number:  values.number,
    };
    setForm({...form, adress: data.adress, cep: data.cep, number: data.number })
    setFormSteps(formSteps +1)

    reset()
 
    }

  return (
    <FormControl as="form" onSubmit={handleSubmit(handleSubmitForm)}>
    <Flex direction="column" align="center" justify="center">
          <Input error={errors.adress} {...register("adress")} name="adress" label="Endereço"/>
            <Input error={errors.cep}  {...register("cep")} name="cep" label="Cep" />
            <Input error={errors.number}  {...register("number")} name="number" label="Número"  />

        <Button mt="4" type="submit" colorScheme="linkedin" >Salvar</Button>
    </Flex>
    </FormControl>
  )
}