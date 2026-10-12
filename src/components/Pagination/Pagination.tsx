import styles from "./styles.module.css";

interface PaginationProps {
 totalPages: number;
 currentPage: number;
 handleNextPage: () => void;
 handlePrevPage: () => void;
 handlePageClick: (pageNumber: number) => void;
}

const Pagination = ({
 totalPages,
 currentPage,
 handleNextPage,
 handlePrevPage,
 handlePageClick,
}: PaginationProps) => {
 return (
  <div className={styles.pagination}>
   <button 
     disabled={currentPage <= 1} 
     className={styles.arrow} 
     onClick={handlePrevPage}
   >
     {"<"}
   </button>

   <div className={styles.list}>
    {[...Array(totalPages)].map((_, index) => {
     const pageNumber = index + 1;
     return (
      <button 
        key={index} 
        className={`${styles.pageNumber} ${currentPage === pageNumber ? styles.active : ""}`} 
        disabled={currentPage === pageNumber}
        onClick={() => handlePageClick(pageNumber)}
      >
       {pageNumber}
      </button>
     );
    })}
   </div>

   <button 
     disabled={currentPage >= totalPages} 
     className={styles.arrow} 
     onClick={handleNextPage}
   >
     {">"}
   </button>
  </div>
 );
};

export default Pagination;
