import { createContext, forwardRef, useContext, useMemo, useRef, useState } from 'react'

type UseAccordionProps = {
  allowMultiple?: boolean
  defaultIndex?: number
}
const useAccordion = (props: UseAccordionProps) => {
  const { allowMultiple = false, defaultIndex = 0 } = props
  return { allowMultiple, defaultIndex }
}

const AccordionContext = createContext<ReturnType<typeof useAccordion> | null>(null)
const useAccordionContext = () => {
  const context = useContext(AccordionContext)
  if (context === null) throw new Error(`AccordionContext's value not found`)
  return context
}

type AccordionProps = {
  children: React.ReactNode
} & UseAccordionProps
export const Accordion: React.FC<AccordionProps> = (props) => {
  const { children, ...accordionProps } = props
  const context = useAccordion({ ...accordionProps })
  const ctx = useMemo(() => context, [context])
  return <AccordionContext.Provider value={ctx}>{children}</AccordionContext.Provider>
}

type UseAccordionItemProps = {
  isDisabled?: boolean
}
const useAccordionItem = (props: UseAccordionItemProps) => {
  const { isDisabled = false } = props

  const [isOpen, setIsOpen] = useState(false)

  const onOpen = () => {
    setIsOpen(true)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const onToggle = () => {
    setIsOpen(!isOpen)
  }

  return {
    isOpen,
    isDisabled,
    onOpen,
    onClose,
    onToggle,
  }
}

const AccordionItemContext = createContext<ReturnType<typeof useAccordionItem> | null>(null)
const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext)
  if (context === null) throw new Error(`AccordionItemContext's value not found`)
  return context
}

type AccordionItemProps = {
  children: React.ReactNode
} & UseAccordionItemProps
export const AccordionItem: React.FC<AccordionItemProps> = (props) => {
  const { children, ...accordionItemProps } = props
  const context = useAccordionItem({ ...accordionItemProps })
  const ctx = useMemo(() => context, [context])

  return (
    <AccordionItemContext.Provider value={ctx}>
      <div style={{ maxWidth: 600 }}>{children}</div>
    </AccordionItemContext.Provider>
  )
}

type UseAccordionButtonProps = {}
const useAccordionButton = (props: UseAccordionButtonProps) => {
  const itemContext = useAccordionItemContext()
  return {
    ...itemContext,
  }
}
type AccordionButtonProps = {
  children: React.ReactNode
} & React.ComponentPropsWithRef<'button'>
export const AccordionButton = forwardRef<HTMLButtonElement, AccordionButtonProps>((props, ref) => {
  const { children } = props

  const { onToggle } = useAccordionButton({})

  return (
    <button ref={ref} onClick={onToggle}>
      {children}
    </button>
  )
})

type UseAccordionPanelProps = {}
const useAccordionPanel = (props: UseAccordionPanelProps) => {
  const itemContext = useAccordionItemContext()
  return { ...itemContext }
}
type AccordionPanelProps = {
  children: React.ReactNode
} & UseAccordionPanelProps
export const AccordionPanel: React.FC<AccordionPanelProps> = (props) => {
  const { children } = props

  const panelRef = useRef<HTMLDivElement>(null)
  const { current: panelContainer } = panelRef

  let height: number = 0
  if (panelContainer) {
    height = panelContainer.scrollHeight
  }

  const { isOpen } = useAccordionPanel({})

  const panelStyle: React.CSSProperties = useMemo(
    () => ({
      opacity: isOpen ? 1 : 0,
      overflow: 'hidden',
      maxHeight: isOpen ? height : 0,
      // height: isOpen ? height : 0,
      transition: 'all 0.3s',
    }),
    [isOpen]
  )

  return (
    <div ref={panelRef} style={panelStyle}>
      {children}
    </div>
  )
}
