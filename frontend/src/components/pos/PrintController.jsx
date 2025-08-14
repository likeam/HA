import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import UrduBillPreview from "./UrduBillPreview";
import { FaPrint } from "react-icons/fa";
import { useAppSelector } from "../../app/hooks";
import UrduText from "../common/UrduText";

const PrintController = () => {
  const billRef = useRef();
  const cart = useAppSelector((state) => state.pos.cart);

  const handlePrint = useReactToPrint({
    content: () => billRef.current,
    documentTitle: `رسید_${Date.now()}`,
  });

  if (cart.length === 0) return null;

  return (
    <div className="mt-4">
      <div className="hidden">
        <div ref={billRef}>
          <UrduBillPreview />
        </div>
      </div>

      <button
        onClick={handlePrint}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded flex items-center justify-center"
      >
        <FaPrint className="mr-2" />
        <UrduText>پرنٹ کریں</UrduText>
      </button>
    </div>
  );
};

export default PrintController;
