import { FC } from "react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import style from "./style.module.css";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const Paginate: FC<ReactPaginateProps> = ({ ...props }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      previousLabel={<GrFormPrevious />}
      nextLabel={<GrFormNext />}
      pageRangeDisplayed={5}
      renderOnZeroPageCount={null}
      containerClassName={style.containerClassName}
      activeLinkClassName={style.activeLinkClassName}
      pageLinkClassName={style.pageLinkClassName}
      previousLinkClassName={style.pageLinkClassName}
      nextLinkClassName={style.pageLinkClassName}
      disabledLinkClassName={style.disabledLinkClassName}
      {...props}
    />
  );
};

export default Paginate;
