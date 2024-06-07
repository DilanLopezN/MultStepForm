import  {useContext, createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect} from 'react'


export interface FormMultStepDTO {
    username: string
    password: string
    adress: string
    cep: string
    sex: string
    age: number
    mail: string
    number: string
}
type GlobalProvider = {
  children: ReactNode
}

type GlobalContextProps = {
 setForm: Dispatch<SetStateAction<FormMultStepDTO>>
 form: FormMultStepDTO
 formSteps: number
 setFormSteps: Dispatch<SetStateAction<number>>
 storageForm: FormMultStepDTO
}

export const GlobalContext = createContext({} as GlobalContextProps);

export const useGlobalContext = () => useContext(GlobalContext);

export function GlobalProvider ({children}: GlobalProvider)  {
  const [formSteps, setFormSteps] = useState(0)
  const  [form, setForm] = useState({} as FormMultStepDTO)
  const [storageForm, setStorageForm] = useState({} as FormMultStepDTO)


  useEffect(() => {
    localStorage.setItem("form", JSON.stringify(form))
    setStorageForm({...form})
    console.log(form)
  }, [form])

    return (
     <GlobalContext.Provider value={{form, setForm, formSteps, setFormSteps, storageForm}}>
      {children}
     </GlobalContext.Provider>
    )
}
