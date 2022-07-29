import { produce } from 'immer'
import { date } from 'zod'
import { actionTypes } from "./action"

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CycleState, action: any) {

  switch(action.type) {
    case actionTypes.ADD_NEW_CYCLE: 
      return produce(state, draft => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCycleId: action.payload.newCycle.id,
      // }
    case actionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCyleIndex = state.cycles.findIndex(cycle => {
        return cycle.id === state.activeCycleId
      })

      if (currentCyleIndex < 0) {
        return state
      }

      return produce(state, draft => {
        draft.activeCycleId = null
        draft.cycles[currentCyleIndex].interruptedDate = new Date()
      })
    }
      // return {
      //   ...state,
      //   cycles: state.cycles.map(cycle => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, interruptedDate: new Date() }
      //     } else {
      //       return cycle
      //     }
      //   }),
      //   activeCycleId: null,
      // }
    case actionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      const currentCyleIndex = state.cycles.findIndex(cycle => {
        return cycle.id === state.activeCycleId
      })

      if (currentCyleIndex < 0) {
        return state
      }

      return produce(state, draft => {
        draft.activeCycleId = null
        draft.cycles[currentCyleIndex].finishedDate = new Date()
      })

      // return {
      //   ...state,
      //   cycles: state.cycles.map(cycle => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, finishedDate: new Date() }
      //     } else {
      //       return cycle
      //     }
      //   }),
      //   activeCycleId: null,
      // } 
    default: 
      return state
  }
}