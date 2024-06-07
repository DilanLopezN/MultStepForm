import { useContext, ReactNode } from 'react'
import {  Flex,  } from '@chakra-ui/react'
import {  GlobalContext } from './context/GlobalContext'
import FormStepOne from './components/FormStepOne'
import FormStepTwo from './components/FormStepTwo'
import FormLastStep from './components/FormLastStep'

function App() {
  const { formSteps} = useContext(GlobalContext)

  let formRender: ReactNode

  switch(true) {
    case formSteps === 0:
      formRender = (<>
         <FormStepOne/>
      </>)
    break;
    case formSteps === 1:
      formRender = (<>
          <FormStepTwo />
      </>)
    break;
    
    case formSteps === 2:
      formRender = (<>
        <FormLastStep />
      </>)
    break;
    default: 
    formRender = (<>
     <FormLastStep />
    </>)
    break
  }
   



  return (
    <Flex w="100%" h="100%" align="center" justify="center">
      <Flex w="400px" h="600px" align="center">
      {formRender}
      </Flex>
     
    </Flex>
  )
}

export default App
