import React from 'react';

export default function SummaryCard({ title, value }) {
  return (
    <div className="summary-card-item p-2">
      <small>{title}</small>
      <div className="h5 mb-0">{value}</div>
    </div>
  );
}
