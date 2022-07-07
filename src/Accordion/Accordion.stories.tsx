import { ComponentMeta } from '@storybook/react'
import { Accordion, AccordionButton, AccordionItem, AccordionPanel } from './Accordion'

export default {
  title: 'Accordion',
  component: Accordion,
} as ComponentMeta<typeof Accordion>

export const Default = () => {
  return (
    <Accordion defaultIndex={0}>
      <AccordionItem id="accordion-item-1">
        <AccordionButton>
          <h2>Section1 title</h2>
        </AccordionButton>
        <AccordionPanel>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad asperiores
            dolores nulla quibusdam rerum sit ullam voluptates. Quam, vel!
          </p>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem id="accordion-item-2">
        <AccordionButton>
          <h2>Section2 title</h2>
        </AccordionButton>
        <AccordionPanel>
          <p>
            seunghwan ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad asperiores
            dolores nulla quibusdam rerum sit ullam voluptates. Quam, vel!
          </p>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
