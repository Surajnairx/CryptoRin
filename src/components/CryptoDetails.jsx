import { useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { CryptoContext } from "../context/CryptoContext";
function CryptoDetails() {
  const { coinId } = useParams();
  const navigate = useNavigate();
  const { coinData, getCoinData } = useContext(CryptoContext);

  const close = () => {
    navigate("..");
  };

  useEffect(() => {
    getCoinData(coinId);
  }, [coinId]);

  return createPortal(
    <div
      onClick={close}
      className="fixed top-0 w-full h-full bg-gray-600/5 backdrop-blur-sm flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[65%] h-[75%] bg-gray-300/20 rounded-lg text-white relative"
      >
        {coinData ? <h1>{coinData.id}</h1> : null}
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default CryptoDetails;
