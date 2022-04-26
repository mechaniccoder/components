import { userEvent, within } from '@storybook/testing-library'
import NavBar from './Dropdown'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Dropdown',
  component: NavBar,
} as ComponentMeta<typeof NavBar>

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />

export const Default = Template.bind({})
Default.play = async ({ canvasElement }) => {
  const dropdownRoot = within(canvasElement)

  await userEvent.type(dropdownRoot.getByRole('textbox'), 'hello', {
    delay: 100,
  })
}
