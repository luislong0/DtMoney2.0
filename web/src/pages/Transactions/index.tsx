import { CalendarBlank, Cards } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { AuthContext } from "../../contexts/AuthContext";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { api } from "../../lib/axios";

import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { SearchForm } from "./components/SearchForm";
import {
  CategoryWithPriceContainer,
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";

export function Transactions() {
  const { user } = useContext(AuthContext);
  const { fetchTransactions, transactions } = useContext(TransactionsContext);

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === "outcome" && "- "}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                  <td>
                    <CategoryWithPriceContainer>
                      <span>
                        <Cards size={18} />
                        {transaction.category}
                      </span>
                      <span>
                        <CalendarBlank size={18} />
                        {dateFormatter.format(new Date(transaction.createdAt))}
                      </span>
                    </CategoryWithPriceContainer>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
