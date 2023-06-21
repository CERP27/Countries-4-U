import React, { useState,useEffect } from 'react';
import {  useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../redux/countrySlice';

import CountryCard from './countryCard'
import style from './homePage.module.css'

const countriesPerPage = 10
const visiblePageButtons = 5;

const HomePage = ()=>{
    const dispatch = useDispatch();

    const allcountries = useSelector(state=>state.country.allCountries)
    
    const currentPage = useSelector(state=>state.country.currentPage)

    const [totalPages,setTotalPages] = useState(0)
    
    useEffect(()=>{
        setTotalPages(Math.ceil(allcountries.length/countriesPerPage))
    },[allcountries])

    if(allcountries.length === 0) return <h1 className={style.loading}>Loading Countries ...</h1>
    
    const renderPageButtons = () => {
        const startPage = Math.max(0, Math.min(currentPage - Math.floor(visiblePageButtons / 2), totalPages - visiblePageButtons));
        const endPage = Math.min(startPage + visiblePageButtons, totalPages);
   
        return Array.from({ length: endPage - startPage }).map((_, i) => {
            const pageNumber = startPage + i;
            const buttonClass = pageNumber === currentPage ? style.selectedPageButton : style.pageButton;
            return (
                <button className={buttonClass} key={pageNumber} onClick={() => dispatch(setCurrentPage(pageNumber))}>{pageNumber + 1}</button>
            );
        });
    };

    return (
        <div>
            <div className={style.pagination}>
                {currentPage > 0 && (
                    <div>
                        <button key={'<<'} className={style.pageButton} type="" onClick={() => dispatch(setCurrentPage(0))}>{'<<'}</button>
                        
                    </div>
                )}
                {renderPageButtons()}
                {currentPage < totalPages - 1 && (
                    <div>
                        
                        <button key={'>>'} className={style.pageButton} type="" onClick={() => dispatch(setCurrentPage(totalPages -1))}>{'>>'}</button>
                    </div>
                )}
            </div>

            <div className={style.container}>
                {
                    allcountries.slice(0 + (currentPage * countriesPerPage), countriesPerPage + (currentPage * countriesPerPage)).map(({id,name,continents,flags})=>{
                        return(
                            <>
                                <CountryCard
                                    id={id}
                                    key={id+' '+name}
                                    name={name}
                                    continents={continents}
                                    flags={flags}
                                />
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default HomePage