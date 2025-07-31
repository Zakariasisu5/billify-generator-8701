import React from 'react';
import { format } from 'date-fns';
import BaseTemplate2 from './BaseTemplate2';
import { calculateSubTotal, calculateTaxAmount, calculateGrandTotal } from '../../utils/invoiceCalculations';
import { formatCurrency } from '../../utils/formatCurrency';

const Receipt2 = ({ data, isPrint = false }) => {
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
          fontFamily: "'Consolas', monospace",
          whiteSpace: "pre-wrap",
          lineHeight: "1.2",
        }}
      >
        <div className="flex-grow">
          <div className="text-center font-bold mb-2">CUSTOMER RECEIPT</div>
          <div className="text-center mb-2">******************************</div>
          <div className="mb-2 flex justify-between">
            <div>Invoice: {invoice.number || "N/A"}</div>
            <div className="text-right">
              Date:{" "}
              {invoice.date
                ? format(new Date(invoice.date), "MM/dd/yyyy")
                : "N/A"}
            </div>
          </div>
          <div className="text-center mb-2">******************************</div>
          <div className="mb-2 text-center">
            <div>{yourCompany.name || "N/A"}</div>
            <div>{yourCompany.address || "N/A"}</div>
            {yourCompany.phone && <div>{yourCompany.phone}</div>}
          </div>
          <div className="mb-2">Customer: {billTo || "N/A"}</div>
          <div className="mb-2">Cashier: {cashier || "N/A"}</div>
          <div className="text-center mb-2">******************************</div>
          <div className="py-2 mb-2">
            <div className="flex justify-between font-bold mb-2">
              <span>Item</span>
              <span>Total</span>
            </div>
            {items.map((item, index) => (
              <div key={index} className="flex justify-between mb-2">
                <div>
                  <span>
                    {item.name || "N/A"} X {item.quantity || 0}
                  </span>
                  <div className="text-sm text-gray-600">
                    {item.description || ""}
                  </div>
                </div>
                <span>
                  {formatCurrency((item.quantity || 0) * (item.amount || 0), selectedCurrency)}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center mb-2">******************************</div>
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{formatCurrency(subTotal, selectedCurrency)}</span>
          </div>
          {taxPercentage > 0 && (
            <div className="flex justify-between">
              <span>Tax ({taxPercentage}%):</span>
              <span>{formatCurrency(taxAmount, selectedCurrency)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold mt-2">
            <span>Total:</span>
            <span>{formatCurrency(total, selectedCurrency)}</span>
          </div>
          {notes && (
            <div className="mt-4">
              <div>{notes}</div>
            </div>
          )}
        </div>
        <div className="text-center mt-4">{footer || ""}</div>
      </div>
    </BaseTemplate2>
  );
};

export default Receipt2;
