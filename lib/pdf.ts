import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/**
 * Render the on-page WhiteCardPreview to a single-page A4 PDF Blob.
 *
 * Approach: clone the preview into a hidden A4-sized container so the capture
 * uses true A4 dimensions instead of whatever screen width happens to be set
 * (max-width: 760px on screen vs ~794px for A4 at 96dpi).
 */
export async function generateWhiteCardPdf(): Promise<Blob> {
  const live = document.querySelector<HTMLElement>(".print-page");
  if (!live) throw new Error("Preview element not found");

  // Clone the preview into an off-screen A4-sized container
  const clone = live.cloneNode(true) as HTMLElement;
  const wrapper = document.createElement("div");
  wrapper.style.cssText = [
    "position: fixed",
    "top: 0",
    "left: -10000px", // off-screen
    "width: 794px", // A4 width @ 96dpi
    "background: #ffffff",
    "z-index: -1",
  ].join("; ");
  // Reset the clone's screen-only constraints
  clone.style.maxWidth = "794px";
  clone.style.width = "794px";
  clone.style.boxShadow = "none";
  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  try {
    const canvas = await html2canvas(clone, {
      scale: 2, // 2x for crisp text
      backgroundColor: "#ffffff",
      logging: false,
      useCORS: true,
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth(); // 210
    const pageHeight = pdf.internal.pageSize.getHeight(); // 297

    // Fit canvas → A4 preserving aspect ratio
    const canvasRatio = canvas.height / canvas.width;
    const pageRatio = pageHeight / pageWidth;
    let imgW: number;
    let imgH: number;
    if (canvasRatio > pageRatio) {
      imgH = pageHeight;
      imgW = pageHeight / canvasRatio;
    } else {
      imgW = pageWidth;
      imgH = pageWidth * canvasRatio;
    }
    const x = (pageWidth - imgW) / 2;
    const y = (pageHeight - imgH) / 2;

    pdf.addImage(
      canvas.toDataURL("image/jpeg", 0.95),
      "JPEG",
      x,
      y,
      imgW,
      imgH,
    );

    return pdf.output("blob");
  } finally {
    document.body.removeChild(wrapper);
  }
}

