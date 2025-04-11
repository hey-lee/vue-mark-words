
![MarkWords](/mark-words.svg)

A Vue component for mark and highlighting words within text with flexible word boundary matching and customizable styling.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://raw.githubusercontent.com/hey-lee/vue-mark-words/refs/heads/main/LICENSE) [![size](https://img.shields.io/bundlephobia/min/vue-mark-words)](https://bundlephobia.com/package/vue-mark-words)


## Features

- 🎯 Precise word boundary matching (whole word, start, end)
- 🎨 Customizable styling and components
- 🛡️ Special characters escaping
- 🔧 Custom match function support

## Installation

```bash
npm i vue-mark-words
```

## Examples

### Basic Usage

```vue
<template>
  <MarkWords
    text="Hello World! This is a demo text."
    :words="['Hello', 'demo']"
  />
</template>
```

### Case Insensitive Search

```vue
<template>
  <MarkWords
    text="Hello World! This is a demo text."
    :words="['Hello', 'demo']"
    :caseSensitive="true"
  />
</template>
```

### Word Boundaries

```vue
<template>
  <MarkWords
    text="test retest tests"
    :words="['test']"
    :boundary="true" // match "test"
    boundary="start" // match "tests"
    boundary="end" // match "retest"
  />
</template>
```

### Custom Tags

```vue
<template>
  <MarkWords
    text="Hello World! This is a demo text."
    :words="['Hello', 'demo']"
    markedTag="strong"
    unmarkedTag="span"
    containerTag="p"
  />
</template>
```

### Custom Matching Function

```vue
<template>
  <MarkWords
    text="Hello World! This is a demo text."
    :words="['Hello', 'demo']"
    :match="(word: string) => new RegExp(`\\b${word}\\b`, 'gi')"
  />
</template>
```

### Custom Styling

```vue
<template>
  <MarkWords
    text="Hello World! This is a demo text."
    :words="['Hello', 'demo']"
    :classNames="{
      marked: 'custom-marked',
      unmarked: 'custom-unmarked',
      container: 'mark-words-container',
    }"
  />
</template>

<style>
.custom-marked {
  background-color: yellow;
  font-weight: bold;
}
.unmarked {
  color: #333;
}
.mark-words-container {
  padding: 10px;
}
</style>
```

## API

### `MarkWords({ text, words, ... })`

The main component for marking words within text.

#### `text`

Type: `string`
The text content to be processed

#### `words`

Type: `string[]`
Array of words or phrases to be marked

#### `className`

Type: `string?`
Optional className for the container element

#### `classNames`

Type: `{ marked: string, unmarked: string, container: string }?`
Optional classNames for marked and unmarked text segments

#### `escape`

Type: `boolean?`
Whether to escape special RegExp characters in search words. Default: `true`

#### `caseSensitive`

Type: `boolean?`
Whether the search should be case-sensitive. Default: `false`

#### `boundary`

Type: `(boolean | 'start' | 'end')?`
Word boundary matching behavior. Default: `true`

#### `markedTag`

Type: `(string | Component)?`
Custom component or HTML tag for marked text. Default:'mark'

#### `unmarkedTag`

Type: `(string | Component)?`
Custom component or HTML tag for unmarked text. Default: text-only component

#### `containerTag`

Type: `(string | Component)?`
Container element tag or component. Default: 'div'

#### `match`

Type: `(word: string) => RegExp?`
Optional custom matching function

## License

MIT © [Lee](https://github.com/hey-lee)