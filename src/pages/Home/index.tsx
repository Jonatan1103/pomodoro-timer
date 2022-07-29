import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";

import { HandPalm, Play } from 'phosphor-react';

import { useContext } from 'react';

import { NewCycleForm } from './NewCycleForm';
import { Countdown } from './Countdown';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod'
import { CycleContext } from "../../contexts/CycleContext";

interface NewCycleFormData {
  task: string
  minutesAmount: number
}

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CycleContext)

  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(5, 'Informe a tarefa'),
    minutesAmount: zod.number()
      .min(5, 'A tarefa deve ter no minimo um intervalo de 5 min.')
      .max(60, 'A tarefa deve ter no maximo um intervalo de 60 min.'),
  })

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm 

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisable = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisable} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
