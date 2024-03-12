import Stack from '@mui/material/Stack'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Card from '../Card'
import { CardType } from 'src/types/card.type'

type CardListProps = {
  cards: CardType[]
}

export default function CardList({ cards }: CardListProps) {
  return (
    <SortableContext items={cards.map((card) => card._id)} strategy={verticalListSortingStrategy}>
      <Stack
        flexDirection={'column'}
        gap={1}
        mx={'5px'}
        padding={'0 5px 5px 5px'}
        overflow={'hidden auto'}
        maxHeight={(theme) =>
          `calc(100vh - ${theme.trello.headerHeight}px - ${theme.trello.boardBarHeight}px - ${theme.spacing(8)})`
        }
      >
        {cards?.map((card) => <Card key={card._id} card={card} />)}
      </Stack>
    </SortableContext>
  )
}
