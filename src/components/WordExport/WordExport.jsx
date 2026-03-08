import React from "react";
import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
} from "docx";
import styles from "./WordExport.module.css";
import { FaFileWord } from "react-icons/fa";


const WordExport = ({ invoiceData }) => {
  const exportToWord = async () => {
    const totalQuantity = invoiceData.items.reduce(
      (acc, item) => acc + item.quantity,
      0,
    );
    const totalSum = invoiceData.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    );

    const doc = new Document({
      styles: {
        paragraphStyles: [
          {
            id: "normal",
            name: "Normal",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: { font: "Times New Roman", size: 28 },
            paragraph: { spacing: { line: 285 }, alignment: "both" },
          },
        ],
      },
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: "Накладна на замовлення товару",
              bold: true,
              size: 28,
              alignment: "center",
              spacing: { after: 240 },
            }),
            new Paragraph({
              text: `Накладна № ${invoiceData.number}  Дата: ${invoiceData.date}`,
              spacing: { after: 120 },
              alignment: "both",
            }),
            new Paragraph({
              text: `Постачальник: ${invoiceData.supplier}`,
              alignment: "both",
            }),
            new Paragraph({
              text: `Код постачальника: ${invoiceData.code}`,
              alignment: "both",
            }),
            new Paragraph({
              text: `Адреса: ${invoiceData.address}`,
              spacing: { after: 120 },
              alignment: "both",
            }),

            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    "Найменування товару",
                    "Кількість",
                    "Ціна",
                    "Сума",
                    "На товар",
                  ].map(
                    (text) =>
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text,
                                bold: true,
                                font: "Times New Roman",
                                size: 28,
                              }),
                            ],
                            alignment: "both",
                          }),
                        ],
                        margins: {
                          top: 100,
                          bottom: 100,
                          left: 100,
                          right: 100,
                        },
                      }),
                  ),
                }),
                ...invoiceData.items.map(
                  (item) =>
                    new TableRow({
                      children: [
                        item.name,
                        item.quantity.toString(),
                        item.price.toString(),
                        (item.quantity * item.price).toString(),
                        item.code,
                      ].map(
                        (text) =>
                          new TableCell({
                            children: [
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text,
                                    font: "Times New Roman",
                                    size: 28,
                                  }),
                                ],
                                alignment: "both",
                              }),
                            ],
                            margins: {
                              top: 100,
                              bottom: 100,
                              left: 100,
                              right: 100,
                            },
                          }),
                      ),
                    }),
                ),
              ],
            }),

            new Paragraph({
              text: `Загальна кількість: ${totalQuantity}`,
              bold: true,
              spacing: { before: 120 },
              alignment: "both",
            }),
            new Paragraph({
              text: `Загальна сума: ${totalSum} грн`,
              bold: true,
              alignment: "both",
            }),
            new Paragraph({
              text: `Відповідальний: ${invoiceData.responsible}`,
              alignment: "both",
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `Invoice_${invoiceData.number}.docx`);
  };

  return (
    <button onClick={exportToWord} className={styles.exportButton}>
      <FaFileWord size={14} /> Export Word
    </button>
  );
};

export default WordExport;