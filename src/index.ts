
import type { Component } from 'vue'
import { h, defineComponent } from 'vue'
import { sliceText } from 'slice-text'
import type { ComponentProps } from '../types'

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
      default: false
    },
    caseSensitive: {
      default: true,
    },
    markedTag: {
      default: `mark`
    },
    unmarkedTag: {
      default: `span`
    },
    containerTag: {
      default: `div`,
    },
    match: {}
  },
  setup(props: Required<ComponentProps<Component>>) {
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
          matched ? props.markedTag : props.unmarkedTag,
          {
            class: props.classNames?.[matched ? `marked` : `unmarked`],
          },
          text,
        )
      }))
    }
  }
})