import type { EmptyStateProps } from '../../interfaces/props/shared/shared'
import './EmptyState.scss'

export default function EmptyState({ children }: EmptyStateProps) {
    return <p className='empty-state'>{children}</p>
}

