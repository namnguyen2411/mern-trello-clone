import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useConfirm } from 'material-ui-confirm'
import { Card as MuiCard, CardContent, CardMedia, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { BoardType } from 'src/types/board.type'
import { CardType } from 'src/types/card.type'
import cardAPI from 'src/apis/card.api'

type CardProps = {
  card: CardType
}

export default function Card({ card }: CardProps) {
  const [hoveringCard, setHoveringCard] = useState(false)

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

      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 }, display: 'flex', justifyContent: 'space-between' }}>
        <Typography>{card.title}</Typography>
        {hoveringCard && (
          <Close
            sx={{ cursor: 'pointer', '&:hover': { color: 'error.main' } }}
            fontSize='small'
            onClick={handleDeleteCard}
          />
        )}
      </CardContent>
    </MuiCard>
  )
}
