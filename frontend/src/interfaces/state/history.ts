interface HistoryItem {
    id: number
    workoutId: number
    completedAt: string
    workout: {
        name: string
        description: string
    }
    createdAt: string
}

export interface HistoryState {
    history: HistoryItem[]
}

export interface HistoryItemProps {
    historyItem: HistoryItem
}

