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

    // Scroll to top to ensure clean element capture
    const currentScrollY = window.scrollY;
    window.scrollTo(0, 0);

    // Capture element canvas at high resolution
    const canvas = await html2canvas(element, {
      scale: 1.5,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    // Restore scroll position
    window.scrollTo(0, currentScrollY);

    const imgData = canvas.toDataURL("image/jpeg", 0.92);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Calculate aspect ratio fit for A4 page
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

    // Primary Download Method
    pdf.save(filename);

    // Fallback Anchor Blob Download (ensures mobile/desktop browser triggers download)
    try {
      const blob = pdf.output("blob");
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
    } catch {}

    return true;
  } catch (error) {
    console.error("Failed to generate PDF, falling back to print:", error);
    // Fallback: Trigger browser print-to-pdf dialog
    window.print();
    return false;
  }
}
