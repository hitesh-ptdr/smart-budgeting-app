import React from 'react';

export default function TransactionList({ transactions, deleteTransaction }) {
  const renderAvatar = (tx) => {
    const ch = (tx.category || 'X').charAt(0).toUpperCase();
    return <div className={`tx-avatar ${tx.type === 'income' ? 'tx-income' : 'tx-expense'}`}>{ch}</div>;
  };

  return (
    <div className="transaction-list">
      {transactions.map((tx) => (
        <div key={tx.id} className="transaction-item">
          <div className="tx-left">
            {renderAvatar(tx)}
            <div className="tx-meta">
              <div className="tx-title">{tx.category}</div>
              <small>{tx.note || '—'}</small>
              <small className="text-muted">{new Date(tx.createdAt).toLocaleString()}</small>
            </div>
          </div>

          <div className="tx-right d-flex align-items-center gap-3">
            <div className={`tx-amount ${tx.type === 'income' ? 'tx-income' : 'tx-expense'}`}>
              {tx.type === 'income' ? '+' : '-'}{Number(tx.amount).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
            </div>
            <button className="btn btn-sm btn-outline-light" onClick={() => deleteTransaction(tx.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}