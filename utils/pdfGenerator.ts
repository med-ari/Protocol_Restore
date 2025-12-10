
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generateSectorPDF = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) return false;

  try {
    // Prevent scrolling issues during capture
    window.scrollTo(0, 0);

    // Create canvas from the element
    const canvas = await html2canvas(element, {
      scale: 3, // Higher scale for crisp pixel art
      backgroundColor: '#020408', // Match the dark theme
      logging: false,
      useCORS: true, // Handle external images if any
      allowTaint: true,
    });

    const imgData = canvas.toDataURL('image/png');
    
    // A4 Dimensions in mm
    const pdfWidth = 210;
    const pdfHeight = 297;
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgProps = pdf.getImageProperties(imgData);
    const pdfImgHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfImgHeight);
    
    pdf.save(`${filename}.pdf`);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};
