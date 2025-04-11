import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MarkWords from '..'

describe('MarkWords Component', () => {
  // Test default text prop
  it('should render empty text by default', () => {
    const wrapper = mount(MarkWords)
    expect(wrapper.text()).toBe('')
  })

  // Test text prop
  it('should render given text', () => {
    const wrapper = mount(MarkWords, {
      props: {
        text: 'Hello World'
      }
    })
    expect(wrapper.text()).toBe('Hello World')
  })

  // Test words prop
  it('should mark specified words', () => {
    const wrapper = mount(MarkWords, {
      props: {
        text: 'Hello World',
        words: ['Hello']
      }
    })
    expect(wrapper.find('mark').text()).toBe('Hello')
  })

  // Test classNames prop
  it('should apply custom classNames', () => {
    const wrapper = mount(MarkWords, {
      props: {
        text: 'Hello World',
        words: ['Hello'],
        classNames: {
          marked: 'custom-marked',
          unmarked: 'custom-unmarked',
          container: 'custom-container'
        }
      }
    })

    expect(wrapper.find('.custom-container').exists()).toBe(true)
    expect(wrapper.find('.custom-marked').exists()).toBe(true)
    expect(wrapper.find('.custom-unmarked').exists()).toBe(true)
  })

  // Test escape prop
  it('should handle escape prop correctly', () => {
    const wrapper = mount(MarkWords, {
      props: {
        text: 'Hello (World)',
        words: ['(World)'],
        escape: false
      }
    })
    
    expect(wrapper.find('mark').text()).toBe('World')
  })

  // Test boundary prop
  it('should respect word boundaries when boundary is true', () => {
    const wrapper = mount(MarkWords, {
      props: {
        text: 'testing test tests',
        words: ['test'],
        boundary: true
      }
    })
    const marks = wrapper.findAll('mark')
    expect(marks.length).toBe(1)
    expect(marks[0].text()).toBe('test')
  })

  it('should respect word boundaries when boundary is "start"', () => {
    const wrapper = mount(MarkWords, {
      props: {
        text: 'testing test tests',
        words: ['test'],
        boundary: `start`
      }
    })
    const marks = wrapper.findAll('mark')
    expect(marks.length).toBe(2)
    expect(marks[0].text()).toBe('testing')
    expect(marks[1].text()).toBe('tests')
  })

  it('should respect word boundaries when boundary is "end"', () => {
    const wrapper = mount(MarkWords, {
      props: {
        text: 'testing test tests retest',
        words: ['test'],
        boundary: `end`
      }
    })
    const marks = wrapper.findAll('mark')
    expect(marks.length).toBe(1)
    expect(marks[0].text()).toBe('retest')
  })

  // Test caseSensitive prop
  it('should handle case sensitivity', () => {
    const wrapper = mount(MarkWords, {
      props: {
        text: 'Hello HELLO hello',
        words: ['hello'],
        caseSensitive: false
      }
    })
    const marks = wrapper.findAll('mark')
    expect(marks.length).toBe(3)
  })

  // Test markedTag prop
  it('should use custom marked tag', () => {
    const wrapper = mount(MarkWords, {
      props: {
        text: 'Hello World',
        words: ['Hello'],
        markedTag: 'span'
      }
    })
    expect(wrapper.find('span').exists()).toBe(true)
  })

  // Test unmarkedTag prop
  it('should use custom unmarked tag', () => {
    const wrapper = mount(MarkWords, {
      props: {
        text: 'Hello World',
        words: ['Hello'],
        unmarkedTag: 'div'
      }
    })
    expect(wrapper.find('div').exists()).toBe(true)
  })

  // Test containerTag prop
  it('should use custom container tag', () => {
    const wrapper = mount(MarkWords, {
      props: {
        text: 'Hello World',
        containerTag: 'section'
      }
    })
    expect(wrapper.find('section').exists()).toBe(true)
  })

  // Test match prop with function
  it('should use custom match function', () => {
    const wrapper = mount(MarkWords, {
      props: {
        text: 'Hello World',
        words: ['hello'],
        match: (word: string) => new RegExp(word, 'gi')
      }
    })
    expect(wrapper.find('mark').exists()).toBe(true)
    expect(wrapper.find('mark').text()).toBe('Hello')
  })
})