import './style.css'

const INITIAL_STATE = {
  isLoading: false,
  shortLink: undefined,
}

const submitButton = document.querySelector(
  '#submit-button',
) as HTMLButtonElement
const shortlinkBlock: HTMLDivElement = document.querySelector(
  '#shortlink-block',
) as HTMLDivElement
const output = document.querySelector('#output') as HTMLPreElement
const input = document.querySelector('#link') as HTMLInputElement

let state: State = {
  isLoading: false,
  shortLink: undefined,
}

interface State {
  isLoading: boolean
  shortLink?: string
}

interface ResetAction {
  type: 'reset'
}
interface SendAction {
  type: 'send'
}
interface LoadedAction {
  type: 'loaded'
  shortLink: string
}

const reducer = (
  state: State = { isLoading: false },
  action: SendAction | LoadedAction | ResetAction,
) => {
  switch (action.type) {
    case 'reset':
      return INITIAL_STATE
    case 'loaded':
      return {
        ...state,
        isLoading: false,
        shortLink: action.shortLink,
      }
    case 'send':
      return {
        ...state,
        isLoading: true,
        shortLink: undefined,
      }
    default:
      return state
  }
}

const applyState = (newState: State) => {
  state = newState
  submitButton.disabled = state.isLoading
  output.innerHTML = import.meta.env.VITE_PUBLIC_HOST + state.shortLink || ''
  if (state.shortLink) {
    shortlinkBlock.classList.remove('hidden')
  } else {
    shortlinkBlock.classList.add('hidden')
  }
}

document.querySelector('#form')!.addEventListener('submit', async (e) => {
  e.preventDefault()
  applyState(reducer(state, { type: 'send' }))

  const response = await fetch('/api/create/', {
    method: 'post',
    body: JSON.stringify({ link: input.value }),
  })

  if (response.ok) {
    const json = await response.json()
    applyState(reducer(state, { type: 'loaded', shortLink: json.link }))
  } else {
    applyState(reducer(state, { type: 'reset' }))
  }
})
