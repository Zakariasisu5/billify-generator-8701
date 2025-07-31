import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const compressImage = (canvas, quality = 0.7) => {
  return canvas.toDataURL('image/jpeg', quality);
};

export const generateReceiptPDF = async (receiptElement) => {
  try {
    const canvas = await html2canvas(receiptElement, {
      scale: 2, // Increase scale for better quality
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png'); // Use PNG for better quality
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [canvas.width * 0.264583, canvas.height * 0.264583], // Convert px to mm
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width * 0.264583, canvas.height * 0.264583);

    const timestamp = new Date().getTime();
    const fileName = `Receipt_${timestamp}.pdf`;

    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
