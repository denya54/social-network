import React from 'react';
import styles from "./Paginator.module.css";

type propsPaginatorType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

export const Paginator = (props: propsPaginatorType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            {pages.map(page => {
                return <span onClick={() => {props.onPageChanged(page)}}
                             className={props.currentPage === page ? styles.selectPage : ''}>{page} </span>
            })}
        </div>
    )
}