import { PropsWithChildren } from 'react'
import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

interface Props extends PropsWithChildren {
    selected: Date | undefined
    onSelect: (value: Date | undefined) => void
    disabled?: boolean
}
export function DatePicker({ selected, onSelect, children }: Props) {
    return (
        <Popover modal={true}>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={selected} onSelect={onSelect} captionLayout="dropdown" />
            </PopoverContent>
        </Popover>
    )
}
