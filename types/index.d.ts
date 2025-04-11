
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type ComponentType<T=any> = keyof HTMLElementTagNameMap | T

export interface ComponentProps<T = any> {
  /** The text content to be processed */
  text: string
  /** Array of words or phrases to be marked */
  words: string[]
  /** Optional classNames for marked and unmarked text segments */
  classNames?: {
    /** Class name for marked text segments */
    marked?: string
    /** Class name for unmarked text segments */
    unmarked?: string
    /** Class name for the container element */
    container?: string
  }
  /** Whether to escape special RegExp characters in search words. Default: true */
  escape?: boolean
  /** Word boundary matching behavior. Default: true */
  boundary?: boolean | 'start' | 'end'
  /** Whether the search should be case-sensitive. Default: false */
  caseSensitive?: boolean
  /** Custom component or HTML tag for marked text. Default: 'mark' */
  markedTag?: ComponentType<T>
  /** Custom component or HTML tag for unmarked text. Default: text-only component */
  unmarkedTag?: ComponentType<T>
  /** Container element tag or component. Default: 'div' */
  containerTag?: ComponentType<T>
  /** Custom matching function */
  match?: (word: string) => RegExp
}
