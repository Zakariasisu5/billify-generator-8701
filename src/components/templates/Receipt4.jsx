import React from 'react';

const Receipt4 = ({ data }) => {
  const { billTo, invoice, yourCompany, items, taxPercentage, footer, cashier, selectedCurrency } = data;
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const currencySymbol = selectedCurrency === 'USD' ? '$' : '₹';

  return (
    <div className="p-4 font-['Courier_New',_monospace]">
      <h2 className="text-center font-bold">{yourCompany.name}</h2>
      <p className="text-center">{yourCompany.address}</p>
      <p className="text-center">Phone Number: {yourCompany.phone}</p>
      {yourCompany.gst && (
        <p className="text-center">GST No: {yourCompany.gst.toUpperCase()}</p>
      )}
      <hr className="my-4" />
      <div>
        <p>Invoice Number: {invoice.number}</p>
        <p>Created By: {data.cashier}</p>
        <p>
          Date & Time: {invoice.date} {currentTime}
        </p>
      </div>
      <hr className="my-4" />
      <div>
        <h3>Bill to:</h3>
        <p>{billTo}</p>
        <span>Place of supply: Chhattisgarh-22</span>
      </div>
      <hr className="my-4" />
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Item</th>
            <th className="text-right">Qty</th>
            <th className="text-right">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <tr className="align-bottom">
                <td>{item.name}</td>
                <td className="text-right text-sm">{item.quantity}</td>
                <td className="text-right text-sm">{item.amount}</td>
              </tr>
              <tr className="align-top">
                <td colSpan="2" className="text-left text-sm pb-2">
                  HSN Code: {item.description}
                </td>
                <td className="text-right pb-2">Total: {item.total}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <hr className="my-4" />
      <div className="flex justify-between">
        <span>Sub Total:</span>
        <span>
          {currencySymbol} {items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between">
        <span>Tax ({taxPercentage}%):</span>
        <span>
          {currencySymbol}{" "}
          {(
            items.reduce((sum, item) => sum + item.total, 0) *
            (taxPercentage / 100)
          ).toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between font-bold">
        <span>TOTAL:</span>
        <span>
          {currencySymbol}{" "}
          {(
            items.reduce((sum, item) => sum + item.total, 0) *
            (1 + taxPercentage / 100)
          ).toFixed(2)}
        </span>
      </div>
      <hr className="my-4" />
      <div>
        <h3 className="mb-2">Tax Summary</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left font-normal">Type</th>
              <th className="text-right font-normal">Rate</th>
              <th className="text-right font-normal">Total Amt</th>
              <th className="text-right font-normal">Tax Amt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CGST</td>
              <td className="text-right">{(taxPercentage / 2).toFixed(2)}%</td>
              <td className="text-right">
                {items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
              </td>
              <td className="text-right">
                {(
                  items.reduce((sum, item) => sum + item.total, 0) *
                  (taxPercentage / 200)
                ).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td>SGST</td>
              <td className="text-right">{(taxPercentage / 2).toFixed(2)}%</td>
              <td className="text-right">
                {items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
              </td>
              <td className="text-right">
                {(
                  items.reduce((sum, item) => sum + item.total, 0) *
                  (taxPercentage / 200)
                ).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr className="my-4" />
      <p className="text-center">{footer}</p>
    </div>
  );
};

export default Receipt4;
