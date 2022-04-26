import React, {useState} from 'react';
import styles from "./Paginator.module.css";

type propsPaginatorType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize: number
}

export const Paginator = (props: propsPaginatorType) => {

    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    // let portionSize = 10

    let portionCount = Math.ceil(pagesCount/ props.portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * (props.portionSize)
    let rightPortionPageNumber = portionNumber  * props.portionSize

return (
    <div className={styles.paginator}>
        {portionNumber > 1 &&
        <button onClick={() => {setPortionNumber((portionNumber - 1))}}>PREV</button>}
        {pages.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
            .map((page) => {
            return <span
                className={props.currentPage === page ? styles.selectPage : styles.paginator}
                key={page}
                onClick={(e) => props.onPageChanged(page)}>
                {page}
            </span>
        })}

        {portionCount > portionNumber &&
        <button onClick={()=> {setPortionNumber(portionNumber + 1)}}>NEXT</button>}
    </div>
)
}

function cn(paginator: string, selectPage: string): string | undefined {
    throw new Error('Function not implemented.');
}
