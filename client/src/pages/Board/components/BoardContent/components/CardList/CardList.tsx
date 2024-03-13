import Box from '@mui/material/Box'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Card from '../Card'
import { CardType } from 'src/types/card.type'

type CardListProps = {
  cards: CardType[]
}

export default function CardList({ cards }: CardListProps) {
  return (
    <SortableContext items={cards.map((card) => card._id)} strategy={verticalListSortingStrategy}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          p: '0 5px 5px 5px',
          mx: '5px',
          overflow: 'hidden auto',
          maxHeight: (theme) =>
            `calc(100vh - ${theme.trello.headerHeight} - ${theme.trello.boardBarHeight} - ${theme.trello.columnHeaderHeight})`
        }}
      >
        {cards?.map((card) => <Card key={card._id} card={card} />)}
      </Box>
    </SortableContext>
  )
}
