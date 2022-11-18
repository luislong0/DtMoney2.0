import styled from 'styled-components'
import { mediaQueries } from '../../styles/mediaQueries'

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background-color: ${(props) => props.theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;

      ${mediaQueries('md')`
        width: 100%;

      `}
    }

    &:nth-child(2) {
      ${mediaQueries('md')`
        width: 100%;
      `}
    }

    &:nth-child(3) {
      ${mediaQueries('md')`
        display: none;
      `}
    }

    &:nth-child(4) {
      ${mediaQueries('md')`
        display: none;
      `}
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    ${mediaQueries('md')`
        display: flex;
        flex-direction: column;

        padding: 1.25rem 2rem 0 2rem;
    `}
  }
`

interface PriceHighlightProps {
  variant: 'income' | 'outcome'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};

  ${mediaQueries('md')`
        font-size: 1.5rem;
        font-weight: 700;
  `}
`

export const CategoryWithPriceContainer = styled.div`
  display: none;

  background-color: ${(props) => props.theme['gray-700']};
  color: ${(props) => props.theme['gray-500']};

  span {
    display: flex;
    gap: 0.35rem;
  }

  ${mediaQueries('md')`
        display: flex;
        padding: 0rem 0 1rem 0;
        
        justify-content: space-between;
        align-items: center;
  `}
`
