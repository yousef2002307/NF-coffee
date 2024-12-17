import React from 'react';
import { IoMdClose } from 'react-icons/io';
import Delivery from './Delivery';

export default function Order({ selectedProduct, quantity, closeModal }) {
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 max-w-5xl">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-[#6B4226]">Order {selectedProduct.name}</h2>
              <p className="text-[#577260]">Fill the following form</p>
            </div>
            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
              <IoMdClose size={24} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-5 justify-between w-full">
            <Delivery selectedProduct={selectedProduct} quantity={quantity} closeModal={closeModal} />

            <div className="h-full">
              <div className="pt-4 text-right font-medium">
                <div className="flex justify-between items-center gap-3">
                  <p className="mb-2">Subtotal:* {quantity} </p>
                  <span className="text-[#086169]">L.E {selectedProduct.price * quantity} </span>
                </div>

               

                <div className="flex justify-between items-center gap-3">
                  <p className="text-lg font-bold">Total: </p>
                  <span className="text-[#086169] font-bold">L.E {selectedProduct.price * quantity }</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
