import React from 'react';
import { format } from 'date-fns';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';

const Template5 = ({ data = {} }) => {
  const { billTo = {}, shipTo = {}, invoice = {}, yourCompany = {}, items = [], taxPercentage = 0, taxAmount = 0, subTotal = 0, grandTotal = 0, notes = '', selectedCurrency } = data;

  return (
    <BaseTemplate data={data}>
      <div className="bg-white max-w-4xl mx-auto flex flex-col h-full overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-green-600">Invoice</h1>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold">
                {yourCompany.name || "Company Name"}
              </h2>
              <p>{yourCompany.address || "Company Address"}</p>
              <p>{yourCompany.phone || "Company Phone"}</p>
            </div>
          </div>

          <div className="flex justify-between mb-8 mt-4">
            <div className="text-left w-1/2">
              <h3 className="text-lg font-semibold text-green-600 mb-2">
                Billed to
              </h3>
              <p className="font-bold">{billTo.name || "Client Name"}</p>
              <p>{billTo.address || "Client Address"}</p>
              <p>{billTo.phone || "Client Phone"}</p>
            </div>
            <div className="text-right w-1/3">
              <h3 className="text-lg font-semibold text-green-600 mb-2 text-left">
                Invoice Details
              </h3>
              <p className="flex justify-between">
                <span className="font-semibold">Invoice #:</span>
                <span>{invoice.number || "N/A"}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Invoice Date:</span>
                <span>
                  {invoice.date
                    ? format(new Date(invoice.date), "MMM dd, yyyy")
                    : "N/A"}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Due Date:</span>
                <span>
                  {invoice.paymentDate
                    ? format(new Date(invoice.paymentDate), "MMM dd, yyyy")
                    : "N/A"}
                </span>
              </p>
            </div>
          </div>

          <table className="w-full mb-8 border border-green-600">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-2 text-left">Item #/Item description</th>
                <th className="p-2 text-right">Qty.</th>
                <th className="p-2 text-right">Rate</th>
                <th className="p-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-green-50" : ""}
                >
                  <td className="p-2">{item.name || "Item Name"}</td>
                  <td className="p-2 text-right">{item.quantity || 0}</td>
                  <td className="p-2 text-right">
                    {formatCurrency(item.amount || 0, selectedCurrency)}
                  </td>
                  <td className="p-2 text-right">
                    {formatCurrency((item.quantity || 0) * (item.amount || 0), selectedCurrency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mb-8">
            <div className="w-1/3">
              <p className="flex justify-between">
                <span>Sub Total:</span> <span>{formatCurrency(subTotal, selectedCurrency)}</span>
              </p>
              {taxPercentage > 0 && (
                <p className="flex justify-between">
                  <span>Tax ({taxPercentage}%):</span>{" "}
                  <span>{formatCurrency(taxAmount, selectedCurrency)}</span>
                </p>
              )}
              <p className="flex justify-between font-bold text-lg mt-2">
                <span>Total Due:</span>{" "}
                <span className="text-green-600">
                  {formatCurrency(grandTotal, selectedCurrency)}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex-grow bg-green-50 overflow-auto">
          {notes && (
            <div className="p-4">
              <h3 className="text-lg font-semibold text-green-600 mb-2">
                Additional Notes
              </h3>
              <p>{notes}</p>
            </div>
          )}
        </div>
        <div className="p-4 text-center text-sm text-gray-600 bg-green-50">
          This is a computer-generated invoice and doesn't require a signature.
        </div>
      </div>
    </BaseTemplate>
  );
};

export default Template5;
