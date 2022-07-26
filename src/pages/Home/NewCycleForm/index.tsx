import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'

import { MinutesAmountInput } from './styles';
import { FormContainer, TaskInput } from './styles';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number()
    .min(1, 'A tarefa deve ter no minimo um intervalo de 5 min.')
    .max(60, 'A tarefa deve ter no maximo um intervalo de 60 min.'),
})

interface NewCycleFormData {
  task: string
  minutesAmount: number
}

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        type="text"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        list="task-suggestions"
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1"></option>
        <option value="comer"></option>
        <option value="roger melo"></option>
        <option value="praticar"></option>
        <option value="Ócio"></option>
      </datalist>

      <label htmlFor="minutesAmount">Durante</label>
      <MinutesAmountInput
        id="minutesAmount"
        type="number"
        placeholder="00"
        step={5}
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}