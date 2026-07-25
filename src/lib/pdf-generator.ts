import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function generateBrochurePDF(
  elementId: string,
  filename: string = "Brosur-DTA-Nurul-Iman.pdf"
): Promise<boolean> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with id '${elementId}' not found.`);
      return false;
    }

    // Capture element canvas at high DPI scale
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: 1200,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Calculate aspect ratio fit
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 2; // Top margin in mm

    pdf.addImage(
      imgData,
      "JPEG",
      imgX,
      imgY,
      imgWidth * ratio,
      imgHeight * ratio
    );

    // Save directly to user's device Downloads folder
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    return false;
  }
}
