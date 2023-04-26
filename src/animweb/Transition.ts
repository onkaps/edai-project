/*
This interface simply describes what kind of props a Transition Function (FadeIn, Create, etc.) can accept.

The transition has a format similar to: Create(Point, { duration: 1 })
The structure of the second argument is given by this interface
*/

import AnimObject from './AnimObject'
import Create from './transitions/Create'
import FadeIn from './transitions/FadeIn'
import FadeOut from './transitions/FadeOut'

export default interface TransitionProps {
  duration?: number // how long the transition should last (in seconds)
}

// Similar to the lines enum, this enum is used to pass a transition to an AnimObject (if we aren't applying it externally)
export enum Transitions {
  FadeIn = 'FadeIn',
  FadeOut = 'FadeOut',
  Create = 'Create',
  None = 'None',
}

type TrasitionReturnType = <Object extends AnimObject>(
  obj: Object,
  config: any
) => Object

export const Transition = (type: Transitions): TrasitionReturnType => {
  switch (type) {
    case Transitions.FadeIn:
      return <Object extends AnimObject>(obj: Object, config: any) =>
        FadeIn<Object>(obj, config)
    case Transitions.FadeOut:
      return <Object extends AnimObject>(obj: Object, config: any) =>
        FadeOut<Object>(obj, config)
    case Transitions.Create:
      return <Object extends AnimObject>(obj: Object, config: any) =>
        Create<Object>(obj, config)
    default:
      return <Object extends AnimObject>(object: Object, config: any) => object
  }
}

export interface TransitionQueueItem {
  id: string
  object?: AnimObject
}

export enum TransitionTypes {
  single = 'single',
  group = 'group',
}
