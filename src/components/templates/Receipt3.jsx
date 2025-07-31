import React from 'react';
import { format } from 'date-fns';
import BaseTemplate2 from './BaseTemplate2';
import { calculateSubTotal, calculateTaxAmount, calculateGrandTotal } from '../../utils/invoiceCalculations';
import { formatCurrency } from '../../utils/formatCurrency';

const Receipt3 = ({ data, isPrint = false }) => {
  const { billTo = {}, invoice = {}, yourCompany = {}, cashier = '', items = [], taxPercentage = 0, notes = '', footer = '', selectedCurrency } = data || {};

  const subTotal = calculateSubTotal(items);
  const taxAmount = calculateTaxAmount(subTotal, taxPercentage);
  const total = calculateGrandTotal(subTotal, taxAmount);

  return (
    <BaseTemplate2
      width="80mm"
      height="auto"
      className="p-2"
      data={data}
      isPrint={isPrint}
    >
      <div
        className="bg-white flex flex-col min-h-full"
        style={{
          fontSize: isPrint ? "8px" : "14px",
          fontFamily: "'Monaco', monospace",
          whiteSpace: "pre-wrap",
          lineHeight: "1.2",
        }}
      >
        <div className="flex-grow">
          <div className="text-center font-bold mb-2 pb-2 border-b-2 border-dashed">
            CASH RECEIPT
            {yourCompany.name && <div className="mt-2">{yourCompany.name}</div>}
            {yourCompany.address && <div>{yourCompany.address}</div>}
            {yourCompany.phone && <div>{yourCompany.phone}</div>}
          </div>
          <div className="mb-2 text-right">
            <div><strong>Invoice#:</strong> {invoice.number || "N/A"}</div>
            <div>
              <strong>Date:</strong>{" "}
              {invoice.date
                ? format(new Date(invoice.date), "MM/dd/yyyy")
                : "N/A"}
            </div>
          </div>
          <div className="mb-2"><strong>Customer:</strong> {billTo || "N/A"}</div>
          <div className="mb-2 pb-2 border-b-2 border-dashed">
            <strong>Cashier:</strong> {cashier || "N/A"}
          </div>
          <div className="py-2 mb-2">
            <div className="flex justify-between font-extrabold mb-2">
              <span>Item</span>
              <span>Qty</span>
              <span>Amt</span>
              <span>Total</span>
            </div>
            {items.map((item, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between">
                  <span>{`${index + 1}. ${item.name || "N/A"}`}</span>
                </div>
                <div className="grid grid-cols-3 text-right">
                  <span>{item.quantity || 0}</span>
                  <span>{formatCurrency(item.amount || 0, selectedCurrency)}</span>
                  <span>{formatCurrency((item.quantity || 0) * (item.amount || 0), selectedCurrency)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <span>SubTotal:</span>
            <span>{formatCurrency(subTotal, selectedCurrency)}</span>
          </div>
          {taxPercentage > 0 && (
            <div className="flex justify-between">
              <span>Tax ({taxPercentage}%):</span>
              <span>{formatCurrency(taxAmount, selectedCurrency)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold mt-2 pb-2 border-t-2 pt-2 border-b-2 border-dashed">
            <span>{`${items.length} Items`}</span>
            <span>Total: {formatCurrency(total, selectedCurrency)}</span>
          </div>
          {notes && (
            <div className="mt-4">
              <div>{notes}</div>
            </div>
          )}
        </div>
        <div className="text-center mt-20 text-gray-500">{footer || ""}</div>
      </div>
    </BaseTemplate2>
  );
};

export default Receipt3;
