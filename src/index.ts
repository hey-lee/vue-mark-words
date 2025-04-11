
import type { Component } from 'vue'
import { h, defineComponent } from 'vue'
import { sliceText } from 'slice-text'
import type { ComponentProps, ComponentType, Optional } from '../types'

export type MarkWordsProps = Optional<ComponentProps<Component>, 'match'>

export default defineComponent({
  name: `MarkWords`,
  props: {
    text: {
      default: ``,
    },
    words: {
      default: () => [] as string[],
    },
    class: {
      default: ``,
    },
    classNames: {
      default: () => ({
        marked: `marked`,
        unmarked: `unmarked`,
        container: `mark-words-container`,
      }),
    },
    escape: {
      default: true,
    },
    boundary: {
      type: [Boolean, String],
      default: false
    },
    caseSensitive: {
      default: true,
    },
    markedTag: {
      type: [String],
      default: `mark`
    },
    unmarkedTag: {
      type: [String],
      default: `span`
    },
    containerTag: {
      type: [String],
      default: `div`,
    },
    match: {
      type: Function,
    }
  },
  setup(props: MarkWordsProps) {
    const optionsOrMatch = typeof props.match === `function` ? props.match : {
      escape: props.escape,
      boundary: props.boundary,
      caseSensitive: props.caseSensitive,
    }
    const slices = sliceText(props.text, props.words, optionsOrMatch)

    return () => {
      return h(props.containerTag as string, {
        class: props.classNames?.container,
      }, slices.map(({ start, end, matched }) => {
        const text = props.text.slice(start, end)
        return h(
          (matched ? props.markedTag : props.unmarkedTag) as ComponentType,
          {
            class: props.classNames?.[matched ? `marked` : `unmarked`],
          },
          text,
        )
      }))
    }
  }
})