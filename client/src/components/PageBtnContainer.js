import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";

const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useContext(AppContext);
  let pageNumbersArr = [];
  for (let i = 1; i <= numOfPages; i++) {
    pageNumbersArr.push(i);
  }
  const pageNumbers = pageNumbersArr.map((num) => {
    return (
      <button
        type="button"
        key={num}
        className={num === page ? "pageBtn active" : "pageBtn"}
        onClick={() => changePage(num)}
      >
        {num}
      </button>
    )
  })

  const prevPage = () => {
    changePage('prev')
  }
  const nextPage = () => {
    changePage('next')
  }
  return (
    <Wrapper>
      <button 
      className="prev-btn"
      onClick={prevPage}
      disabled={page === 1}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">{pageNumbers}</div>
      <button 
      className="next-btn"
      onClick={nextPage}
      disabled={page === numOfPages}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
