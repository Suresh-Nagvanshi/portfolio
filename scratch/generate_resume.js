import fs from "fs";
import PDFDocument from "pdfkit";

// Ensure public directory exists
if (!fs.existsSync("public")) {
  fs.mkdirSync("public");
}

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 40, bottom: 40, left: 45, right: 45 },
});

const writeStream = fs.createWriteStream("public/resume.pdf");
doc.pipe(writeStream);

// Helper for horizontal line
function drawLine() {
  doc.moveDown(0.4);
  doc.strokeColor("#D1D5DB").lineWidth(0.5).moveTo(doc.x, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.6);
}

// ─── Header ───
doc.font("Helvetica-Bold").fontSize(22).fillColor("#111827").text("SURESH NAGVANSHI", { align: "center" });
doc.moveDown(0.2);
doc.font("Helvetica").fontSize(9.5).fillColor("#4B5563").text(
  "+91 8090180224   |   iamsureshnagvanshi@gmail.com   |   linkedin.com/in/suresh-nagvanshi",
  { align: "center" }
);
doc.moveDown(1.2);

// ─── Professional Summary ───
doc.font("Helvetica-Bold").fontSize(11).fillColor("#1F2937").text("PROFESSIONAL SUMMARY");
drawLine();
doc.font("Helvetica").fontSize(9.5).fillColor("#374151").lineGap(3);
doc.text(
  "Full-Stack Developer specializing in Java, Spring Boot, and backend development, with experience in Python and MERN stack. " +
  "Architected REST APIs and scalable web applications using MySQL, MongoDB, and PostgreSQL. Proficient in Java (Spring ecosystem) " +
  "and Python for data analysis and machine learning. Delivered projects including AI Forensic Platform, Financial News Detection, " +
  "and PetConnect. Passionate about backend engineering, distributed systems, and AI-driven applications."
);
doc.moveDown(1.2);

// ─── Technical Skills ───
doc.font("Helvetica-Bold").fontSize(11).fillColor("#1F2937").text("TECHNICAL SKILLS");
drawLine();

doc.font("Helvetica-Bold").fontSize(9.5).fillColor("#374151");
const skills = [
  { label: "Languages: ", val: "Java, Python, JavaScript, TypeScript" },
  { label: "Frameworks / Technologies: ", val: "Spring Boot, Spring MVC, Hibernate, NestJS, Express.js, Flask, Maven, MERN" },
  { label: "Database: ", val: "MySQL, MongoDB, PostgreSQL" },
  { label: "Machine Learning / AI: ", val: "TensorFlow, CNN Models, Image Classification, Model Training, Scikit-learn" },
  { label: "Tools & IDEs: ", val: "Git, GitHub, Postman, IntelliJ IDEA, VS Code, Eclipse, Google Colab, Jupyter Notebook" }
];

skills.forEach(s => {
  doc.font("Helvetica-Bold").text(s.label, { continued: true }).font("Helvetica").text(s.val);
  doc.moveDown(0.3);
});
doc.moveDown(0.8);

// ─── Work Experience ───
doc.font("Helvetica-Bold").fontSize(11).fillColor("#1F2937").text("WORK EXPERIENCE");
drawLine();

// Adrelia Role
doc.font("Helvetica-Bold").fontSize(10).fillColor("#1F2937").text("Technical Lead / Backend Developer ", { continued: true });
doc.font("Helvetica").text("– Adrelia", { continued: true });
doc.font("Helvetica").text("   |   May 2026 – Present", { align: "right" });
doc.moveDown(0.3);

doc.font("Helvetica").fontSize(9.5).fillColor("#374151");
const expPoints = [
  "Architected and developed scalable backend modules using NestJS and TypeScript for ERP functionalities including GST invoicing, inventory management, and shipment workflows.",
  "Designed and implemented RESTful APIs with JWT authentication, role-based access control (RBAC), and multi-tenant architecture, ensuring secure enterprise-level access.",
  "Built optimized database models using Prisma ORM and PostgreSQL, reducing query response time through indexing and normalization strategies.",
  "Integrated AI-powered analytics by connecting FastAPI services and Google Gemini APIs, enabling real-time business intelligence and automated reporting.",
  "Led architecture discussions, code reviews, and CI/CD pipeline optimization, improving deployment reliability and reducing production issues."
];

expPoints.forEach(p => {
  doc.text("•  " + p, { paragraphGap: 2.5 });
});
doc.moveDown(1.2);

// ─── Academic Projects ───
doc.font("Helvetica-Bold").fontSize(11).fillColor("#1F2937").text("ACADEMIC PROJECTS");
drawLine();

// Project 1
doc.font("Helvetica-Bold").fontSize(10).fillColor("#1F2937").text("AI Web Forensic System for Detecting Manipulated Images");
doc.font("Helvetica-Oblique").fontSize(8.5).fillColor("#4B5563").text("GitHub: github.com/Suresh-Nagvanshi/AI-Forensic-Project");
doc.moveDown(0.3);
doc.font("Helvetica").fontSize(9.5).fillColor("#374151");
const p1Points = [
  "Engineered a face-level deepfake detection system using YOLOv8 and EfficientNetB0, trained on a 20K image dataset for multi-class classification (real, deepfake, GAN, edited).",
  "Designed a multi-face detection pipeline with automated face extraction and independent per-face inference for robust real-world analysis.",
  "Integrated DeepFace and Grad-CAM to generate emotion insights, heatmaps, and suspicious-region indicators for explainable AI outputs.",
  "Achieved 97.6% validation accuracy (~98% on 4K test set) with strong Precision, Recall, and F1 scores across all classes.",
  "Developed a Flask API backend and Spring Boot (Thymeleaf) frontend delivering structured forensic reports with confidence scores and risk levels."
];
p1Points.forEach(p => doc.text("•  " + p, { paragraphGap: 2 }));
doc.moveDown(0.8);

// Project 2
doc.font("Helvetica-Bold").fontSize(10).fillColor("#1F2937").text("Fake Financial News Detection");
doc.font("Helvetica-Oblique").fontSize(8.5).fillColor("#4B5563").text("GitHub: github.com/Suresh-Nagvanshi/fake-financial-news-prediction");
doc.moveDown(0.3);
doc.font("Helvetica").fontSize(9.5).fillColor("#374151");
const p2Points = [
  "Developed an NLP-based fake news classification system using DistilBERT to detect real vs. fake financial news, trained on a 50K-labeled dataset with transfer learning.",
  "Achieved 94.2% accuracy with strong metrics (Precision: 93.8%, Recall: 94.5%, F1-score: 94.1%, ROC-AUC: 0.96), ensuring reliable predictions.",
  "Performed advanced text preprocessing including tokenization, class balancing with SMOTE, and efficient CPU-based inference for deployment scalability.",
  "Evaluated model robustness using confusion matrix analysis and k-fold cross-validation, improving generalization across unseen data."
];
p2Points.forEach(p => doc.text("•  " + p, { paragraphGap: 2 }));
doc.moveDown(0.8);

// Project 3
doc.font("Helvetica-Bold").fontSize(10).fillColor("#1F2937").text("PetConnect");
doc.font("Helvetica-Oblique").fontSize(8.5).fillColor("#4B5563").text("GitHub: github.com/Suresh-Nagvanshi/PetConnect");
doc.moveDown(0.3);
doc.font("Helvetica").fontSize(9.5).fillColor("#374151");
const p3Points = [
  "Developed a full-stack pet marketplace using the MERN stack (MongoDB, Express.js, React.js, Node.js), enabling users to browse, list, and adopt pets with integrated veterinary service discovery.",
  "Implemented RESTful APIs for pet listings, user authentication, and seller-buyer communication, handling 1,000+ concurrent users during testing.",
  "Designed a responsive React frontend with dynamic filtering, search functionality, and real-time updates, improving user engagement.",
  "Integrated an AI-based symptom analysis feature for preliminary pet health insights, leveraging ML models for actionable recommendations."
];
p3Points.forEach(p => doc.text("•  " + p, { paragraphGap: 2 }));
doc.moveDown(1.2);

// ─── Education ───
doc.font("Helvetica-Bold").fontSize(11).fillColor("#1F2937").text("EDUCATION");
drawLine();

doc.font("Helvetica-Bold").fontSize(9.5).fillColor("#1F2937").text("MCA – Christ University ", { continued: true });
doc.font("Helvetica").text(" |   CGPA: 3.86 / 4.0   |   2025 – Present");
doc.moveDown(0.35);
doc.font("Helvetica-Bold").text("BCA – Babu Banarasi Das University ", { continued: true });
doc.font("Helvetica").text(" |   CGPA: 8.54 / 10   |   2022 – 2025");
doc.moveDown(1.2);

// ─── Certifications / Workshops ───
doc.font("Helvetica-Bold").fontSize(11).fillColor("#1F2937").text("CERTIFICATIONS / WORKSHOPS");
drawLine();

doc.font("Helvetica").fontSize(9.5).fillColor("#374151");
const certs = [
  "AI/ML for Geodata Analysis – ISRO's Indian Institute of Remote Sensing (IIRS) | August 2024",
  "Project Training: Java EE Platform & MySQL Database – Precursor Info Solutions | February 2025 – May 2025",
  "IPR Essentials: Patents, Copyrights, and Academic Integrity – Christ University | February 2026",
  "From Constitution to Code: Understanding Data Privacy in a Digital World – Christ University | February 2026"
];
certs.forEach(c => doc.text("•  " + c, { paragraphGap: 3.5 }));

doc.end();

writeStream.on("finish", () => {
  console.log("PDF Generation completed: public/resume.pdf");
});
