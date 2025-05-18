import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// Exporter un élément DOM en PDF
export const exportToPDF = async (elementId, fileName = "export.pdf") => {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`Element with ID "${elementId}" not found`);
    return;
  }

  try {
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // Créer un PDF au format paysage avec une marge de 10mm
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // Calculer les dimensions pour ajuster l'image au PDF
    const imgWidth = 277; // Largeur disponible sur une page A4 en paysage avec marges
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Ajouter l'image au PDF
    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

    // Télécharger le PDF
    pdf.save(fileName);

    return true;
  } catch (error) {
    console.error("Error exporting to PDF:", error);
    return false;
  }
};

// Exporter un élément DOM en image
export const exportToImage = async (elementId, fileName = "export.png") => {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`Element with ID "${elementId}" not found`);
    return;
  }

  try {
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // Créer un lien pour télécharger l'image
    const link = document.createElement("a");
    link.href = imgData;
    link.download = fileName;
    link.click();

    return true;
  } catch (error) {
    console.error("Error exporting to image:", error);
    return false;
  }
};

// Générer un identifiant unique
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Convertir un objet Date en chaîne formatée
export const formatDate = (date) => {
  if (!date) return "";

  const d = new Date(date);
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
