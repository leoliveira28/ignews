
import { render, screen } from '@testing-library/react'
import { SignInButton } from '.'
import { useSession } from 'next-auth/react'
import { mocked } from 'jest-mock'

jest.mock('next-auth/react', () => {
    return {
        useSession() {
            return [null, false]
        }
    }
})

describe('SignInButton component', () => {
    it('renders correctly when use is not authenticated', () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" })

        render(<SignInButton/>)
        expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
    })
    it('renders correctly when user is authenticated', () => {

        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce({ data: {name: 'John Doe', email: 'john@doe.com'}, status: "loading" })

        render(<SignInButton/>)
        expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
    })

   
})