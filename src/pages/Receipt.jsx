
import React, { useState } from 'react';
import './Receipt.css';
import { jsPDF } from 'jspdf';
import axios from 'axios'; // Import axios for API requests
import xml2js from 'xml2js'; // Import xml2js to convert XML to JSON

const Receipt = () => {
  const [poNumber, setPoNumber] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('AUTO12345');
  const [supplierName, setSupplierName] = useState('');
  const [poDate, setPoDate] = useState('');
  const [poDetails, setPoDetails] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const [expandAllOuter, setExpandAllOuter] = useState(false);

  const handlePoNumberChange = (e) => setPoNumber(e.target.value);

  // Function to convert XML to JSON
  const parseXML = async (xml) => {
    try {
      const parser = new xml2js.Parser({ explicitArray: false });
      const result = await parser.parseStringPromise(xml);
      return result;
    } catch (error) {
      console.error('Error parsing XML:', error);
    }
  };

  // Function to fetch PO details from the Sage API
  const fetchPoDetails = async () => {
    try {
      const response = await axios.post('SAGE_API_URL', {
        poNumber: poNumber, // Add required body parameters
        // Include other necessary request headers or body if required
      });

      const xmlData = response.data; // API will return data in XML format
      const jsonData = await parseXML(xmlData); // Convert XML to JSON

      // Assuming the JSON structure contains the relevant PO details
      const poData = jsonData?.PurchaseOrderDetails?.PO || [];
      
      // Set PO details and other relevant fields from the JSON
      setPoDetails(poData);
      setSupplierName(jsonData?.PurchaseOrderDetails?.SupplierName || 'N/A');
      setPoDate(jsonData?.PurchaseOrderDetails?.PODate || 'N/A');
    } catch (error) {
      console.error('Error fetching PO details:', error);
    }
  };

  const handlePreview = () => {
    const doc = new jsPDF();
    let yOffset = 10;

    doc.text('Purchase Order Details', 10, yOffset);
    yOffset += 10;

    poDetails.forEach((detail) => {
      doc.text(`Product Code: ${detail.productCode}`, 10, yOffset);
      doc.text(`Product Description: ${detail.productDescription}`, 100, yOffset);
      yOffset += 10;

      doc.text(`Order Qty: ${detail.purchaseQty}`, 10, yOffset);
      doc.text(`Purchase Units: ${detail.purchaseUnits}`, 100, yOffset);
      yOffset += 10;

      detail.lineRecords.forEach((line) => {
        doc.text(`Lot No: ${line.lot}`, 20, yOffset);
        doc.text(`Pallet No: ${line.palletNumber}`, 100, yOffset);
        yOffset += 10;

        doc.text(`Receive Qty: ${line.quantity}`, 20, yOffset);
        doc.text(`UOM: ${line.uom}`, 100, yOffset);
        yOffset += 10;
      });

      yOffset += 10;

      if (yOffset > 270) {
        doc.addPage();
        yOffset = 10;
      }
    });

    doc.save('purchase_order_details.pdf');
  };

  const toggleRowExpansion = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleExpandAllOuter = () => {
    const newExpandAllOuter = !expandAllOuter;
    setExpandAllOuter(newExpandAllOuter);
    setExpandedRows((prev) => {
      const newExpandedRows = {};
      poDetails.forEach((_, index) => {
        newExpandedRows[index] = newExpandAllOuter;
      });
      return newExpandedRows;
    });
  };

  const deleteRow = (index) => {
    setPoDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index].lineRecords = [];
      return updatedDetails;
    });
  };

  const deleteLineRecord = (productIndex, lineIndex) => {
    setPoDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[productIndex].lineRecords = updatedDetails[productIndex].lineRecords.filter(
        (_, i) => i !== lineIndex
      );
      return updatedDetails;
    });
  };

  const handleSubmit = () => {
    alert('Receipt submitted successfully!');
  };

  return (
    <div className="receipt-container">
      <h4 className='head'>Receipt Entry</h4>
      <div className="info-box">
        <div className="info-header">
          <input
            type="text"
            value={poNumber}
            onChange={handlePoNumberChange}
            className="po-number-input"
            placeholder="Enter PO Number"
          />
          <button onClick={fetchPoDetails} className="btn-fetch">Fetch PO Details</button>
        </div>
        <div className="info-content">
          <div>Supplier : {supplierName}</div>
          <div>PO Date : {poDate}</div>
        </div>
      </div>

      {poDetails.length > 0 && (
        <div className="po-details-table-container">
          <div className='po-details-header'>
            <h3>Purchase Order Details</h3>
            <div className="button-container-top">
              <button onClick={() => handlePreview()} className="btn-action">Preview</button>
              <button onClick={() => alert('Save for Later')} className="btn-action">Save for Later</button>
              <button onClick={handleSubmit} className="btn-action">Submit Receipt</button>
            </div>
            <div className="table-scroll">
              <table className="po-details-table">
                <thead>
                  <tr>
                    <th>
                      <button onClick={toggleExpandAllOuter} className="arrow-icon">
                        {expandAllOuter ? '⬆' : '⬇'}
                      </button>
                    </th>
                    <th>Product Code</th>
                    <th>Product Description</th>
                    <th>Order Qty</th>
                    <th>Purchase Units</th>
                    <th>Remaining Qty</th>
                    <th>Available Stock</th>
                    <th>Package Qty</th>
                    <th>Total Stock Qty</th>
                    <th className="reference-col">Reference</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {poDetails.map((detail, index) => (
                    <React.Fragment key={index}>
                      <tr className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                        <td>
                          <button onClick={() => toggleRowExpansion(index)} className="arrow-icon">
                            {expandedRows[index] ? '⬆' : '⬇'}
                          </button>
                        </td>
                        <td>{detail.productCode}</td>
                        <td>{detail.productDescription}</td>
                        <td>{detail.purchaseQty}</td>
                        <td>{detail.purchaseUnits}</td>
                        <td>{detail.remainingQty}</td>
                        <td>{detail.availableStock}</td>
                        <td>{detail.packageQty}</td>
                        <td>{detail.totalStockQty}</td>
                        <td className="reference-col">{detail.reference}</td>
                        <td>
                          <button onClick={() => deleteRow(index)} className="delete-icon">🗑</button>
                        </td>
                      </tr>
                      {expandedRows[index] && (
                        <tr className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                          <td colSpan="11">
                            <div className="line-records-table-container">
                              <div className="table-scroll">
                                <table className="line-records-table">
                                  <thead>
                                    <tr>
                                      <th>Lot No</th>
                                      <th>Expiry Date</th>
                                      <th>Pallet No</th>
                                      <th>Receive Qty</th>
                                      <th>UOM</th>
                                      <th>Package Qty</th>
                                      <th></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {detail.lineRecords.map((line, lineIndex) => (
                                      <tr key={lineIndex} className={lineIndex % 2 === 0 ? 'even-row' : 'odd-row'}>
                                        <td>{line.lot}</td>
                                        <td>{line.expiryDate}</td>
                                        <td>{line.palletNumber}</td>
                                        <td>{line.quantity}</td>
                                        <td>{line.uom}</td>
                                        <td>{line.packageQty}</td>
                                        <td>
                                          <button onClick={() => deleteLineRecord(index, lineIndex)} className="delete-icon">🗑</button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Receipt;