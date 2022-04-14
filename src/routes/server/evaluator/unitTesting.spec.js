// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'
import {insertEvaluation} from '$lib/dbFunctions';


import {render, fireEvent} from '@testing-library/svelte'

import Comp from '../Comp'

test('submits an evaluation', () => {
    const evalution = {
        "numOfPages":50,"numOfFemales":2,"numOfMales":3,"numOfNonSpecific":2,"toneOfPlay":"comedy","synopsis":"afadsfasdfasd","evaluatorComments":"asdfsdfasdfa","rating":3,"title":"testing","evaluatorID":"621fd2293b7b9950f92cc0c2"
    };
  const result = insertEvaluation(evalution).then(res => {  expect(result).toEqual(1); })

})

// Note: This is as an async test as we are using `fireEvent`
// test('changes button text on click', async () => {
//   const {getByText} = render(Comp, {name: 'World'})
//   const button = getByText('Button')

//   // Using await when firing events is unique to the svelte testing library because
//   // we have to wait for the next `tick` so that Svelte flushes all pending state changes.
//   await fireEvent.click(button)

//   expect(button).toHaveTextContent('Button Clicked')
// })