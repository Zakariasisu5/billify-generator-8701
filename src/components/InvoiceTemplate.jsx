import React from 'react';
import { getTemplate } from '../utils/templateRegistry';

const InvoiceTemplate = ({ data, templateNumber }) => {
  const Template = getTemplate(templateNumber);
  return <Template data={data} />;
};

export default InvoiceTemplate;
