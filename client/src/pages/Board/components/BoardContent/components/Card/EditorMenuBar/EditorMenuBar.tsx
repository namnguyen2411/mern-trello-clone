import { useCurrentEditor } from '@tiptap/react'
import { Box, Divider } from '@mui/material'
import {
  FormatBold,
  FormatItalic,
  StrikethroughS,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  HorizontalRule,
  Undo,
  Redo
} from '@mui/icons-material'

export default function EditorMenuBar() {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <Box
      width='649px'
      display='flex'
      justifyContent={'space-between'}
      alignItems='center'
      position='absolute'
      top='31px'
      left='26px'
      overflow='hidden'
      borderBottom='1px solid rgb(128, 128, 128)'
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          zIndex: 1,
          '> button': {
            height: '30px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#f0f0f0',
            border: 'none'
          },
          '.is-active': {
            color: 'primary.dark'
          }
        }}
      >
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <FormatBold fontSize='small' />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <FormatItalic fontSize='small' />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <StrikethroughS fontSize='small' />
        </button>
        <Divider orientation='vertical' flexItem />
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          style={{ fontWeight: 'bold' }}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          style={{ fontWeight: 'bold' }}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          style={{ fontWeight: 'bold' }}
        >
          H3
        </button>
        <Divider orientation='vertical' flexItem />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <FormatListBulleted fontSize='small' />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <FormatListNumbered fontSize='small' />
        </button>
        <Divider orientation='vertical' flexItem />
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          <FormatQuote fontSize='small' />
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <HorizontalRule fontSize='small' />
        </button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          zIndex: 1,
          '> button': {
            height: '30px',
            cursor: 'pointer',
            border: 'none'
          }
        }}
      >
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo fontSize='small' />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo fontSize='small' />
        </button>
      </Box>
    </Box>
  )
}
