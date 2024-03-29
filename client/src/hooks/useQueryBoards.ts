import { useQuery } from '@tanstack/react-query'
import boardAPI from 'src/apis/board.api'

const useQueryBoards = (userId: string) => {
  const { data } = useQuery({
    queryKey: ['boards', 'userId', userId],
    queryFn: () => boardAPI.getBoardsByOwnerId(userId)
  })

  return data || []
}

export default useQueryBoards
