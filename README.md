<h1 align="center">🎨 Figma Icon Component Generator</h1>

## ✏️ Procedure

### 1. Get Personal Access Token(`FIGMA_TOKEN`)

`Settings > Account > Personal Access Token`

### 2. Get Copy(`*_FILE_ID`)

- [Bootstrap Icons](https://www.figma.com/community/file/1042482994486402696)
- [Untitled UI Icons](https://www.figma.com/community/file/1114001199549197320)
- [css.gg](https://www.figma.com/community/file/834587122842084475)

```
https://www.figma.com/file/**********************/
```

Copy the asterisked portion (fileId)

### 3. Set Environment Variables

**`.zshrc`**

```zsh
...
export FIGMA_TOKEN='**********************'
export FIGMA_UI_FILE_ID='**********************'
export BOOTSTRAP_FILE_ID='**********************'
export CSS_GG_FILE_ID='**********************'
```

## Usage

```zsh
$ npm install --global figma-icon-component-generator
$ icon
```
