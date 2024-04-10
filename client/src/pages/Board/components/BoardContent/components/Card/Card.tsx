import { ChangeEvent, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useConfirm } from 'material-ui-confirm'
import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material'
import { Close, Edit, CheckBox } from '@mui/icons-material'
import { BoardType } from 'src/types/board.type'
import { CardType } from 'src/types/card.type'
import cardAPI from 'src/apis/card.api'
import EditorMenuBar from './EditorMenuBar'

const extensions = [StarterKit]

type CardProps = {
  card: CardType
}

export default function Card({ card }: CardProps) {
  const [hoveringCard, setHoveringCard] = useState(false)
  const [openCardId, setOpenCardId] = useState('')
  const [openEditCardTitle, setOpenEditCardTitle] = useState(false)
  const [cardTitle, setCardTitle] = useState(card.title)
  const [cardDescription, setCardDescription] = useState(card.description)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card }
  })

  const dndKitCardStyle = {
    // Nếu sử dụng CSS.Transform như docs thì gặp lỗi kiểu co giãn
    // https://github.com/clauderic/dnd-kit/issues/117
    // Fix => CSS.Translate
    transform: CSS.Translate.toString(transform),
    transition,
    touchAction: 'none',
    opacity: isDragging ? 0.5 : 1
  }

  const queryClient = useQueryClient()
  const deleteCardMutation = useMutation({
    mutationFn: cardAPI.deleteCard,
    onSuccess: (data, deletedCardId) => {
      queryClient.setQueryData(['board', card.boardId], (oldData: BoardType) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          columns: oldData.columns.map((col) => {
            if (col._id !== data._id) return col
            return {
              ...col,
              cards: col.cards.filter((card) => card._id !== deletedCardId),
              cardOrderIds: data.cardOrderIds
            }
          })
        }
      })
    }
  })

  const updateCardMutation = useMutation({
    mutationFn: cardAPI.updateCard,
    onSuccess: (data) => {
      queryClient.setQueryData(['board', card.boardId], (oldData: BoardType) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          columns: oldData.columns.map((col) => {
            if (col._id !== data.columnId) return col
            return {
              ...col,
              cards: col.cards.map((card) => {
                if (card._id !== data._id) return card
                return {
                  ...card,
                  title: data.title,
                  description: data.description
                }
              })
            }
          })
        }
      })
    }
  })

  const confirm = useConfirm()
  const handleDeleteCard = () => {
    confirm({
      title: 'Delete card',
      description: 'This action will permanently delete this card. Are you sure?',
      confirmationButtonProps: {
        color: 'error',
        variant: 'contained'
      },
      cancellationButtonProps: {
        variant: 'contained'
      }
    })
      .then(() => {
        deleteCardMutation.mutate(card._id)
      })
      .catch(() => {})
  }

  const handleOpen = (cardId: string) => {
    setOpenCardId(cardId)
    setHoveringCard(false)
  }

  const handleClose = () => {
    setOpenCardId('')
    setOpenEditCardTitle(false)
    setHoveringCard(false)
    setCardTitle(card.title)
    setCardDescription(card.description)
  }

  const handleUpdateCardTitle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    setOpenEditCardTitle(false)
    setCardTitle(() => {
      if (e.target.value) return e.target.value
      return card.title
    })
  }

  const handleSubmitUpdateCard = () => {
    const cardTitleTrimmed = cardTitle.trim()
    let cardDescriptionTrimmed = (cardDescription as string).trim()
    if (cardDescriptionTrimmed === '<p></p>') cardDescriptionTrimmed = ''
    if ((cardTitleTrimmed && cardTitleTrimmed !== card.title) || cardDescriptionTrimmed !== card.description)
      updateCardMutation.mutate({
        _id: card._id,
        title: cardTitleTrimmed,
        description: cardDescriptionTrimmed
      })
  }

  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitCardStyle}
      {...attributes}
      {...listeners}
      onMouseOver={() => setHoveringCard(true)}
      onMouseLeave={() => setHoveringCard(false)}
      sx={
        card.FE_placeHolderCard
          ? {
              cursor: 'default',
              height: '1px',
              border: 'none',
              bgcolor: (theme) => theme.palette.cardBg
            }
          : {
              cursor: 'pointer',
              overflow: 'unset',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              border: '2px solid transparent',
              '&:hover': {
                borderColor: 'primary.main'
              }
            }
      }
    >
      {card.cover && (
        <CardMedia
          sx={{ height: 140, boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)' }}
          image={card.cover}
          title={card.title}
        />
      )}

      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Box display='flex' justifyContent='space-between' alignItems='center' minHeight='24px'>
          <Typography>{card.title}</Typography>
          {hoveringCard && (
            <Box display='flex' alignItems='center' gap={0.5}>
              <Edit
                sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                fontSize='small'
                onClick={() => handleOpen(card._id)}
              />
              <Close
                sx={{ cursor: 'pointer', '&:hover': { color: 'error.main' } }}
                fontSize='medium'
                onClick={handleDeleteCard}
              />
            </Box>
          )}
        </Box>
        {card.description && (
          <Box display='flex' alignItems='end' gap={0.5} mt={1} fontSize={'14px'}>
            <CheckBox fontSize='small' /> Description
          </Box>
        )}
      </CardContent>

      {/* Edit card dialog */}
      <Dialog open={openCardId !== ''} onClose={handleClose} data-no-dnd='true' maxWidth='xl'>
        {/* Edit card title */}
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            position: 'relative'
          }}
        >
          Title:
          {!openEditCardTitle && (
            <Typography variant='body2' fontSize={'20px'} onClick={() => setOpenEditCardTitle(true)}>
              {cardTitle}
            </Typography>
          )}
          {openEditCardTitle && (
            <TextField
              autoFocus
              variant='standard'
              value={cardTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCardTitle(e.target.value)}
              onBlur={handleUpdateCardTitle}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '20px'
                }
              }}
            />
          )}
          <Close
            fontSize='large'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: '16px',
              right: '24px',
              p: 0.5,
              cursor: 'pointer',
              borderRadius: '50%',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.08)'
              }
            }}
          />
        </DialogTitle>

        {/* Edit card description */}
        <DialogContent
          sx={{
            width: '700px',
            position: 'relative'
          }}
        >
          <Typography variant='body2' fontSize={'20px'}>
            Description
          </Typography>
          <EditorProvider
            slotBefore={<EditorMenuBar />}
            extensions={extensions}
            content={cardDescription}
            children={undefined}
            onUpdate={({ editor }) => {
              setCardDescription(editor.getHTML())
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              mr: 1
            }}
          >
            Cancel
          </Button>
          <Button type='submit' variant='contained' onClick={handleSubmitUpdateCard}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </MuiCard>
  )
}
