import { useState, useEffect } from 'react';
import { Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CustomPagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={handlePageChange}
      renderItem={(item) => (
        <PaginationItem
          component="button"
          onClick={() => handlePageChange(null, item.page)}
          {...item}
          slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
        />
      )}
    />
  );
};

export default CustomPagination;
