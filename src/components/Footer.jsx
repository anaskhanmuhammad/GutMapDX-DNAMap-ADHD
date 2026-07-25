import React from 'react'

function Footer({ sampleId, page, totalPages, color, bg, nopagereq }) {
  return (
    <div
      className="w-full absolute bottom-0 flex justify-between items-center border-t border-gray-200 px-5 py-2 h-[55px] box-border text-[13px]"
      style={{ backgroundColor: bg, color: color, fontFamily: 'Poppins, sans-serif' }}
    >
      <span>Sample ID: {sampleId}</span>
      {!nopagereq && (
        <span className="text-[12px] text-[#444]">Page: {page} - {totalPages}</span>
      )}
    </div>
  )
}

export default Footer;
