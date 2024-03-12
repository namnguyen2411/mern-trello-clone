import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card as MuiCard, CardContent, CardMedia, Typography } from '@mui/material'
import { CardType } from 'src/types/card.type'

type CardProps = {
  card: CardType
}

export default function Card({ card }: CardProps) {
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
      sx={{
        cursor: 'pointer',
        overflow: 'unset',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        border: '2px solid transparent',
        '&:hover': {
          borderColor: 'primary.main'
        }
      }}
    >
      {card.cover && (
        <CardMedia
          sx={{ height: 140, boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)' }}
          image={card.cover}
          title={card.title}
        />
      )}

      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>{card.title}</Typography>
      </CardContent>
    </MuiCard>
  )
}
