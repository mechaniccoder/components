import { createContext, forwardRef, useContext, useEffect, useMemo, useRef, useState } from 'react'

type UseAccordionProps = {
  allowMultiple?: boolean
  defaultIndex?: number
}
const useAccordion = (props: UseAccordionProps) => {
  const { allowMultiple = false, defaultIndex = 0 } = props

  const [openIndex, setOpenIndex] = useState(defaultIndex)

  const accordionRef = useRef<HTMLDivElement | null>(null)
  return { allowMultiple, defaultIndex, accordionRef, openIndex, setOpenIndex }
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
  return (
    <AccordionContext.Provider value={ctx}>
      <div ref={context.accordionRef}>{children}</div>
    </AccordionContext.Provider>
  )
}

type UseAccordionItemProps = {
  isDisabled?: boolean
}
const useAccordionItem = (props: UseAccordionItemProps) => {
  const { isDisabled = false } = props

  const [index, setIndex] = useState<number | null>(null)

  const accordionItemRef = useRef<HTMLDivElement | null>(null)

  const [isOpen, setIsOpen] = useState(false)
  const { setOpenIndex } = useAccordionContext()

  const onOpen = () => {
    console.log(index)
    setOpenIndex(index ?? 0)
  }

  const onClose = () => {
    setOpenIndex(0)
  }

  const onToggle = () => {
    setIsOpen(!isOpen)
  }

  const onSetIndex = (idx: number) => {
    setIndex(idx)
  }

  return {
    index,
    isOpen,
    isDisabled,
    onOpen,
    onClose,
    onToggle,
    onSetIndex,
    accordionItemRef,
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
} & UseAccordionItemProps &
  React.ComponentPropsWithoutRef<'div'>
export const AccordionItem: React.FC<AccordionItemProps> = (props) => {
  const { children, ...accordionItemProps } = props
  const { accordionRef } = useAccordionContext()
  const context = useAccordionItem({ ...accordionItemProps })
  const ctx = useMemo(() => context, [context])

  useEffect(() => {
    const childrenEl = Array.from(accordionRef?.current?.children ?? [])
    const index = childrenEl.findIndex((node) => node === context.accordionItemRef.current)
    context.onSetIndex(index)
  }, [])

  return (
    <AccordionItemContext.Provider value={ctx}>
      <div ref={context.accordionItemRef} style={{ maxWidth: 600 }}>
        {children}
      </div>
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

  const { onOpen } = useAccordionItemContext()

  const handleClick = () => {
    onOpen()
  }

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    border: '1px solid gray',
    backgroundColor: 'transparent',
    outline: 'none',
  }

  return (
    <button ref={ref} style={buttonStyle} onClick={handleClick}>
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

  const { openIndex } = useAccordionContext()
  const { index } = useAccordionItemContext()

  console.log(openIndex, index, height, children)

  const isOpen = openIndex === index

  const panelStyle: React.CSSProperties = useMemo(
    () => ({
      opacity: isOpen ? 1 : 0,
      overflow: 'hidden',
      maxHeight: isOpen ? height : 0,
      // height: isOpen ? height : 0,
      transition: 'all 0.3s',
    }),
    [isOpen, height]
  )

  return (
    <div ref={panelRef} style={panelStyle}>
      {children}
    </div>
  )
}
